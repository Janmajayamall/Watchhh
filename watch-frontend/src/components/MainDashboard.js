import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import TweetEmbed from 'react-tweet-embed';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  formatMessageArray,
  formatOldTweetsArray,
} from '../utils/helperFunctions';
import Divider from '@material-ui/core/Divider';
import MessagesModal from './MessagesModal';

function MainDashboard({
  tweets,
  addTweetsInBatch,
  syncInProgress,
  directMessages,
  updateDirectMessages,
  directMessagesUpdateInProgress,
}) {
  var uploadDMsFileRef = null;
  var uploadOldTweetsFileRef = null;
  var uploadDMsFileReader = null;
  var uploadOldTweetsReader = null;

  const [messageModalState, setMessageModalState] = useState(false);

  function handleDMsFileContent(e) {
    if (!uploadDMsFileReader) {
      return;
    }

    const userMessages = formatMessageArray(
      JSON.parse(uploadDMsFileReader.result),
    );

    updateDirectMessages(userMessages);

    uploadDMsFileReader = null;
  }

  function handleOldTweetsFileContent(e) {
    if (!uploadOldTweetsReader) {
      return;
    }

    const userOldTweets = formatOldTweetsArray(
      JSON.parse(uploadOldTweetsReader.result),
    );
    addTweetsInBatch(userOldTweets);

    uploadOldTweetsReader = null;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        minWidth: '100vh',
        padding: 10,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <input
            id="fileInput"
            type="file"
            onChange={(e) => {
              uploadDMsFileReader = new FileReader();
              uploadDMsFileReader.onloadend = handleDMsFileContent;
              uploadDMsFileReader.readAsText(e.target.files[0]);
            }}
            ref={(ref) => (uploadDMsFileRef = ref)}
            style={{ display: 'none' }}
          />
          <input
            id="fileInput1"
            type="file"
            onChange={(e) => {
              uploadOldTweetsReader = new FileReader();
              uploadOldTweetsReader.onloadend = handleOldTweetsFileContent;
              uploadOldTweetsReader.readAsText(e.target.files[0]);
            }}
            ref={(ref) => (uploadOldTweetsFileRef = ref)}
            style={{ display: 'none' }}
          />
          <Button
            variant="contained"
            onClick={() => {
              uploadDMsFileRef.click();
            }}
            style={{ margin: 5 }}
          >
            Archive DM
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              uploadOldTweetsFileRef.click();
            }}
            style={{ margin: 5 }}
          >
            Archive Old Tweets
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setMessageModalState(true);
            }}
            style={{ margin: 5 }}
          >
            View DM
          </Button>
        </div>
        {directMessagesUpdateInProgress ? (
          <div style={styles.updateDivs}>
            <Typography
              style={{
                fontSize: 30,
                color: '#ffffff',
              }}
            >
              Your DMs are syncing
            </Typography>
            <LinearProgress color="secondary" style={{ width: '100%' }} />
          </div>
        ) : undefined}
        <div style={styles.updateDivs}>
          <Typography
            style={{
              fontSize: 30,
              color: '#ffffff',
            }}
          >
            {syncInProgress
              ? "Your tweets are syncing fren, DON'T RERESH"
              : 'Your tweets are in sync'}
          </Typography>
          {syncInProgress ? (
            <LinearProgress color="secondary" style={{ width: '100%' }} />
          ) : (
            <Divider
              style={{ width: '100%', height: 3, backgroundColor: '#FF5A5F' }}
            />
          )}
        </div>
        {tweets.length === 0 ? (
          <Typography
            style={{
              fontSize: 50,
              color: '#ffffff',
              alignSelf: 'center',
              marginTop: 50,
            }}
          >
            0 archived tweets
          </Typography>
        ) : undefined}
        {tweets.map((tweet) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 512,
                alignSelf: 'center',
                margin: 10,
              }}
            >
              <TweetEmbed
                id={tweet.tweetId}
                options={{
                  align: 'center',
                  conversation: 'none',
                  theme: 'dark',
                }}
              />
              <Typography
                style={{
                  fontSize: 20,
                  color: '#ffffff',
                  alignSelf: 'flex-end',
                  textDecorationLine: 'underline',
                }}
                onClick={() => {
                  window.open(
                    `https://${tweet.tweetCID}.ipfs.dweb.link/${tweet.tweetId}.json`,
                  );
                }}
              >
                Check this tweet on IPFS
              </Typography>
            </div>
          );
        })}
      </div>
      <MessagesModal
        open={messageModalState}
        handleClose={() => {
          setMessageModalState(false);
        }}
        messages={directMessages}
      />
    </div>
  );
}

const styles = {
  inputBox: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 20,
    borderColor: '#000000',
  },
  textInput: { color: '#ffffff' },
  updateDivs: { display: 'flex', flexDirection: 'column', margin: 5 },
};

export default MainDashboard;
