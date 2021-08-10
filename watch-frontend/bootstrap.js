const { writeFile } = require('fs').promises;
const Ceramic = require('@ceramicnetwork/http-client').default;
const { createDefinition, publishSchema } = require('@ceramicstudio/idx-tools');
const { Ed25519Provider } = require('key-did-provider-ed25519');
const ThreeIdResolver = require('@ceramicnetwork/3id-did-resolver').default;
const KeyDidResolver = require('key-did-resolver').default;
const { Resolver } = require('did-resolver');
const { DID } = require('dids');
const fromString = require('uint8arrays/from-string');

const CERAMIC_URL = 'https://ceramic-clay.3boxlabs.com';

const TwitterProfileSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'TwitterProfile',
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: 'username',
      maxLength: 4000,
    },
  },
  required: ['username'],
};

const Web3StorageSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Web3StorageToken',
  type: 'object',
  properties: {
    protected: { type: 'string' },
    iv: { type: 'string' },
    ciphertext: { type: 'string' },
    tag: { type: 'string' },
    aad: { type: 'string' },
    recipients: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          header: {
            type: 'object',
            properties: {
              alg: { type: 'string' },
              iv: { type: 'string' },
              tag: { type: 'string' },
              epk: { type: 'object' },
              kid: { type: 'string' },
            },
            required: ['alg', 'iv', 'tag'],
          },
          encrypted_key: { type: 'string' },
        },
        required: ['header', 'encrypted_key'],
      },
    },
  },
  required: ['protected', 'iv', 'ciphertext', 'tag'],
};

const TwitterTweetSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'TwitterTweet',
  type: 'object',
  properties: {
    tweetCID: {
      type: 'string',
      title: 'tweetCID',
      maxLength: 4000,
    },
    date: {
      type: 'string',
      format: 'date-time',
      title: 'date',
      maxLength: 30,
    },
  },
};

const TwitterTweetsListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'TwitterTweetsList',
  type: 'object',
  properties: {
    tweets: {
      type: 'array',
      title: 'tweets',
      items: {
        type: 'object',
        title: 'Tweet',
        properties: {
          tweetCID: {
            type: 'string',
            title: 'tweetCID',
            maxLength: 4000,
          },
          date: {
            type: 'string',
            format: 'date-time',
            title: 'date',
            maxLength: 30,
          },
        },
        required: ['tweetCID'],
      },
    },
  },
};

// const NoteSchema = {
//   $schema: 'http://json-schema.org/draft-07/schema#',
//   title: 'Note',
//   type: 'object',
//   properties: {
//     date: {
//       type: 'string',
//       format: 'date-time',
//       title: 'date',
//       maxLength: 30,
//     },
//     text: {
//       type: 'string',
//       title: 'text',
//       maxLength: 4000,
//     },
//   },
// }

// const NotesListSchema = {
//   $schema: 'http://json-schema.org/draft-07/schema#',
//   title: 'NotesList',
//   type: 'object',
//   properties: {
//     notes: {
//       type: 'array',
//       title: 'notes',
//       items: {
//         type: 'object',
//         title: 'NoteItem',
//         properties: {
//           id: {
//             $ref: '#/definitions/CeramicStreamId',
//           },
//           title: {
//             type: 'string',
//             title: 'title',
//             maxLength: 100,
//           },
//         },
//       },
//     },
//   },
//   definitions: {
//     CeramicStreamId: {
//       type: 'string',
//       pattern: '^ceramic://.+(\\\\?version=.+)?',
//       maxLength: 150,
//     },
//   },
// }

async function run() {
  // The seed must be provided as an environment variable
  const seed = fromString(process.env.SEED, 'base16');
  // Connect to the local Ceramic node
  const ceramic = new Ceramic(CERAMIC_URL);
  // Provide the DID Resolver and Provider to Ceramic
  const resolver = new Resolver({
    ...KeyDidResolver.getResolver(),
    ...ThreeIdResolver.getResolver(ceramic),
  });
  const provider = new Ed25519Provider(seed);
  const did = new DID({ provider, resolver });
  await ceramic.setDID(did);
  // Authenticate the Ceramic instance with the provider
  await ceramic.did.authenticate();

  // Publish the two schemas
  const [twitterProfileSchema, twitterTweetsListSchema, web3StorageSchema] =
    await Promise.all([
      publishSchema(ceramic, { content: TwitterProfileSchema }),
      publishSchema(ceramic, { content: TwitterTweetsListSchema }),
      publishSchema(ceramic, { content: Web3StorageSchema }),
    ]);

  // Create the definition using the created schema ID
  const twitterTweetsListDefinition = await createDefinition(ceramic, {
    name: 'twitterTweetsList',
    description: 'List of tweets',
    schema: twitterTweetsListSchema.commitId.toUrl(),
  });
  const twitterProfileDefinition = await createDefinition(ceramic, {
    name: 'twitterProfile',
    description: 'Twitter Profile',
    schema: twitterProfileSchema.commitId.toUrl(),
  });
  const web3StorageDefinition = await createDefinition(ceramic, {
    name: 'web3Storage',
    description: 'token for web3 storage',
    schema: web3StorageSchema.commitId.toUrl(),
  });

  // Write config to JSON file
  const config = {
    definitions: {
      twitterTweetsList: twitterTweetsListDefinition.id.toString(),
      twitterProfile: twitterProfileDefinition.id.toString(),
      web3Storage: web3StorageDefinition.id.toString(),
    },
    schemas: {
      TwitterTweetsList: twitterTweetsListSchema.commitId.toUrl(),
      TwitterProfile: twitterProfileSchema.commitId.toUrl(),
      Web3Storage: web3StorageSchema.commitId.toUrl(),
    },
  };
  await writeFile('./src/utils/config.json', JSON.stringify(config));

  console.log('Config written to src/config.json file:', config);
  process.exit(0);
}

run().catch(console.error);
