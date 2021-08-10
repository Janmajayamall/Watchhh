import logo from './logo.svg';
import './App.css';
import { createIDX } from './utils/idx';
import { DID } from 'dids';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import KeyDidResolver from 'key-did-resolver';
import { createCeramic } from './utils/ceramic';
import { getProvider } from './utils/wallet';
import { definitions } from './utils/constants';
import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Profile from './components/Profile';
import { uploadTweet } from './utils/web3StorageFunctions';

function App() {
  const [appState, setAppState] = useState(0);

  const [profile, setProfile] = useState(null);
  const [web3StorageObj, setWeb3StorageObj] = useState(null);

  const [syncInProgress, setSyncInProgress] = useState(false);

  useEffect(() => {
    authenticate();
  }, []);

  async function authenticate() {
    const [ceramic, provider] = await Promise.all([
      createCeramic(),
      getProvider(),
    ]);
    window.provider = provider;
    const keyDidResolver = KeyDidResolver.getResolver();
    const threeIdResolver = ThreeIdResolver.getResolver(ceramic);
    const resolverRegistry = {
      ...threeIdResolver,
      ...keyDidResolver,
    };
    const did = new DID({
      provider: provider,
      resolver: resolverRegistry,
    });
    await did.authenticate();
    window.did = did;
    await ceramic.setDID(did);
    const idx = createIDX(ceramic);
    checkState();
  }

  async function checkState() {
    if (!window.idx) {
      authenticate();
      return;
    }

    if (await checkBaseSetup()) {
      setAppState(1);
      return;
    }
    setupTweetsFeed();
    setAppState(2);
  }

  async function checkBaseSetup() {
    const [profile, encryptedWeb3Storage] = await Promise.all([
      window.idx?.get(definitions.TWITTER_PROFILE),
      window.idx?.get(definitions.WEB3_STORAGE),
    ]);
    if (profile) {
      setProfile(profile);
    }
    if (encryptedWeb3Storage) {
      const decryptedWeb3Storage = await window.did?.decryptDagJWE(
        encryptedWeb3Storage,
      );
      console.log(decryptedWeb3Storage, ' decrypted key');
      setWeb3StorageObj(decryptedWeb3Storage);
    }
    console.log(profile, encryptedWeb3Storage, ' this is here');
    return !profile || !encryptedWeb3Storage;
  }

  async function updateBaseSetup(profile, web3StorageObj) {
    // update profile
    await window.idx?.set(definitions.TWITTER_PROFILE, profile);

    // update web3 storage
    const encryptedWeb3StorageObj = await window.did?.createDagJWE(
      web3StorageObj,
      [window.did?.id],
    );
    await window.idx?.set(definitions.WEB3_STORAGE, encryptedWeb3StorageObj);

    checkState();
  }

  async function addTweet(tweetObj) {
    console.log('Sync started');
    setSyncInProgress(true);
    const tweetId = tweetObj.data.create_tweet.tweet_results.result.rest_id;
    const tweetCID = await uploadTweet(tweetObj, tweetId, web3StorageObj);

    var tweetsObj = await getTweetsObj();
    tweetsObj.tweets.push({ tweetCID: tweetCID });
    await window.idx?.set(definitions.TWITTER_TWEETS_LIST, tweetsObj);

    await setupTweetsFeed();

    setSyncInProgress(false);
    console.log('Sync finished');
  }
  window.addTweet = addTweet;

  async function setupTweetsFeed() {
    const tweetsObj = await getTweetsObj();
    console.log('setting up the tweets ', tweetsObj.tweets);
  }

  async function getTweetsObj() {
    const tweetsObj = await window.idx?.get(definitions.TWITTER_TWEETS_LIST);
    return tweetsObj ? tweetsObj : { tweets: [] };
  }

  if (appState === 2) {
    return (
      <div className="App" style={{ backgroundColor: '#000000' }}>
        <button
          onClick={() => {
            uploadTweet(JSON.stringify({ you: 'me' }), web3StorageObj);
          }}
        >
          Click here
        </button>
      </div>
    );
  }

  return (
    <div className="App" style={{ backgroundColor: '#000000' }}>
      {appState === 1 ? (
        <Profile
          updateBaseSetup={updateBaseSetup}
          userProfile={profile}
          userWeb3StorageObj={web3StorageObj}
        />
      ) : (
        <div />
      )}
    </div>
  );
}

export default App;

// <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <button onClick={()=>{authenticate()}}>
//           Auth
//         </button>
//       </header>
