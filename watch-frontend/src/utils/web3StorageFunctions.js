import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';

export async function uploadTweet(tweetObj, fileName, web3StorageObj) {
  const web3Client = new Web3Storage({
    token: web3StorageObj.token,
  });
  const blob = new Blob([JSON.stringify(tweetObj)], {
    type: 'application/json',
  });
  const files = [new File([blob], `${fileName}.json`)];
  const cid = await web3Client.put(files);
  return cid;
}

// export async function getTweetsData(tweets, web3StorageObj) {
//   const web3Client = new Web3Storage({
//     token: web3StorageObj.token,
//   });

//   for (let i = 0; i < tweets.length, i++; ) {
//     const response = await web3Client.get(tweets[i].tweetCID);
//     if (!response.ok) {
//       console.log(
//         `failed to get ${tweets[i].tweetCID} - [${response.status}] ${response.statusText}`,
//       );
//     }

//     const files = await response.files();
//     console.log(files);
//     // for (const file of files) {
//     //   console.log(`${file.cid} -- ${file.path} -- ${file.size}`);
//     // }
//   }
// }
