export function formatMessageArray(dms) {
  let messages = [];
  dms.messages.forEach((parentObj) => {
    messages = [...messages, ...parentObj.dmConversation.messages];
  });
  return messages;
}

export function formatOldTweetsArray(oldTweets) {
  let tweets = [];
  oldTweets.tweets.forEach((tweetObj) => {
    tweets = [...tweets, tweetObj.tweet];
  });
  return tweets;
}
