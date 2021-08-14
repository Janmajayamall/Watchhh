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
import { getTweetsData, uploadTweet } from './utils/web3StorageFunctions';
import { Typography } from '@material-ui/core';
import WelcomeHeader from './components/WelcomeHeader';
import MainDashboard from './components/MainDashboard';

function App() {
  const [appState, setAppState] = useState(0);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const [profile, setProfile] = useState(null);
  const [web3StorageObj, setWeb3StorageObj] = useState(null);
  const [directMessages, setDirectMessages] = useState([]);
  const [tweets, setTweets] = useState([]);

  const [syncInProgress, setSyncInProgress] = useState(false);
  const [directMessagesUpdateInProgress, setDirectMessagesUpdateInProgress] =
    useState(false);
  const [updatingBaseSetupState, setUpdatingBaseSetupState] = useState(false);

  useEffect(() => {
    // authenticate();
  }, []);

  useEffect(() => {
    checkBaseSetup();
  }, [userAuthenticated]);

  useEffect(() => {
    if (!profile || !web3StorageObj) {
      return;
    }
    setupTweetsFeed();
    getDirectMessages();
  }, [profile, web3StorageObj]);

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
    setUserAuthenticated(true);
  }

  async function checkBaseSetup() {
    if (!window.idx) {
      authenticate();
      return;
    }

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

      setWeb3StorageObj(decryptedWeb3Storage);
    }

    if (profile && encryptedWeb3Storage) {
      setAppState(2);
    } else {
      setAppState(1);
    }
  }

  async function updateBaseSetup(profile, web3StorageObj) {
    setUpdatingBaseSetupState(true);

    // update profile
    await window.idx?.set(definitions.TWITTER_PROFILE, profile);

    // update web3 storage
    const encryptedWeb3StorageObj = await window.did?.createDagJWE(
      web3StorageObj,
      [window.did?.id],
    );
    await window.idx?.set(definitions.WEB3_STORAGE, encryptedWeb3StorageObj);

    checkBaseSetup();

    setUpdatingBaseSetupState(false);
  }

  async function addTweet(tweetObj) {
    setSyncInProgress(true);
    const tweetData = tweetObj.data.create_tweet.tweet_results.result.legacy;
    const tweetCID = await uploadTweet(
      { ...tweetData, id: tweetData.id_str },
      tweetData.id_str,
      web3StorageObj,
    );

    var tweetsObj = await getTweetsObj();
    tweetsObj.tweets = [
      { tweetCID: tweetCID, tweetId: tweetData.id_str },
      ...tweetsObj.tweets,
    ];
    await window.idx?.set(definitions.TWITTER_TWEETS_LIST, tweetsObj);

    await setupTweetsFeed();

    setSyncInProgress(false);
  }
  window.addTweet = addTweet;

  async function addTweetsInBatch(tweetBatch) {
    setSyncInProgress(true);

    const tweets = [];
    for (let i = 0; i < tweetBatch.length; i++) {
      const tweetCID = await uploadTweet(
        tweetBatch[i],
        tweetBatch[i].id_str,
        web3StorageObj,
      );
      tweets.push({ tweetCID: tweetCID, tweetId: tweetBatch[i].id_str });
    }
    var tweetsObj = await getTweetsObj();
    tweetsObj.tweets = [...tweetsObj.tweets, ...tweets];
    await window.idx?.set(definitions.TWITTER_TWEETS_LIST, tweetsObj);

    await setupTweetsFeed();

    setSyncInProgress(false);
  }

  async function setupTweetsFeed() {
    const tweetsObj = await getTweetsObj();
    // console.log(tweetsObj, ' tweetsObj', web3StorageObj);
    // await getTweetsData(tweetsObj.tweets, web3StorageObj);
    setTweets(tweetsObj.tweets);
  }

  async function getTweetsObj() {
    const tweetsObj = await window.idx?.get(definitions.TWITTER_TWEETS_LIST);
    return tweetsObj ? tweetsObj : { tweets: [] };
  }

  async function getDirectMessages() {
    var encryptedDirectMessages = await window.idx?.get(
      definitions.TWITTER_DIRECT_MESSAGES,
    );

    encryptedDirectMessages = encryptedDirectMessages
      ? encryptedDirectMessages
      : { messages: [] };

    let messages = [];
    for (let i = 0; i < encryptedDirectMessages.messages.length; i++) {
      messages.push(
        await window.did?.decryptDagJWE(encryptedDirectMessages.messages[i]),
      );
    }

    setDirectMessages(messages);
  }

  async function updateDirectMessages(messages) {
    setDirectMessagesUpdateInProgress(true);

    var encryptMessages = [];
    for (let i = 0; i < messages.length; i++) {
      const encryptedMessage = await window.did?.createDagJWE(messages[i], [
        window.did?.id,
      ]);
      encryptMessages.push(encryptedMessage);
    }

    await window.idx?.set(definitions.TWITTER_DIRECT_MESSAGES, {
      messages: encryptMessages,
    });

    await getDirectMessages();

    setDirectMessagesUpdateInProgress(false);
  }

  if (appState === 2) {
    return (
      <div className="App" style={{ backgroundColor: '#000000' }}>
        <MainDashboard
          tweets={tweets}
          addTweetsInBatch={addTweetsInBatch}
          syncInProgress={syncInProgress}
          directMessages={directMessages}
          updateDirectMessages={updateDirectMessages}
          directMessagesUpdateInProgress={directMessagesUpdateInProgress}
        />
      </div>
    );
  }

  if (appState === 1) {
    return (
      <div className="App" style={{ backgroundColor: '#000000' }}>
        <Profile
          updateBaseSetup={updateBaseSetup}
          userProfile={profile}
          userWeb3StorageObj={web3StorageObj}
          updatingBaseSetupState={updatingBaseSetupState}
        />
      </div>
    );
  }

  return (
    <div className="App" style={{ backgroundColor: '#000000' }}>
      <WelcomeHeader />
    </div>
  );
}

export default App;
