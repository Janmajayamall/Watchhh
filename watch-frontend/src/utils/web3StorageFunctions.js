import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';

export async function uploadTweet(tweetObj, fileName, web3StorageObj) {
  const web3Client = new Web3Storage({
    token: web3StorageObj.token,
  });
  const blob = new Blob([JSON.stringify(tweetObj)], {
    type: 'application/json',
  });
  console.log(blob, ' blob');
  const files = [new File([blob], `${fileName}.json`)];
  const cid = await web3Client.put(files);
  console.log(cid, ' blob cid');
  return cid;
}
