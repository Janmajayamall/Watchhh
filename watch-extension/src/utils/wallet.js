import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect'
// import Web3Modal from 'web3modal'
// import WalletConnectProvider from "@walletconnect/web3-provider";

export const threeID = new ThreeIdConnect()

// export const web3Modal = new Web3Modal({
//   network: 'mainnet',
//   cacheProvider: true,
//   providerOptions: {
//      walletconnect: {
//       package: WalletConnectProvider, // required
//         options: {
//           infuraId: "6746c90a47504838893b04c1585bb81c" // required
//         }
//       }
//     },
// })

// export async function metamask(){
//   const { ethereum } = window;
//   const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//   console.log(accounts)
//   return 
// }

export async function getProvider()  {
  // const ethProvider = await web3Modal.connect()
  // const addresses = await ethProvider.enable()
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  console.log(accounts, " got the accounts")
  await threeID.connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
  return threeID.getDidProvider()
}

  // "content_scripts": [
  //   {
  //     "matches": [
  //       "*://*.twitter.com/*"
  //     ],
  //     "js": [
  //       "content.js"
  //     ]
  //   }
  // ],