// const { createCeramic } = require("./utils/ceramic");
// const { getProvider } = require("./utils/wallet");

// const body = document.getElementsByTagName("body");

// const snowflakesContainer = document.createElement("div");
// snowflakesContainer.className = "snowflakes";
// snowflakesContainer.setAttribute("aria-hidden", "true");

// const snowflake = document.createElement("div");
// snowflake.className = "snowflake";
// snowflake.innerHTML = "❆";

// for (let i = 0; i < 12; i++) {
//   snowflakesContainer.appendChild(snowflake.cloneNode(true));
// }


// async function authenticate() {
//     console.log("triggered")
//     const [ceramic, provider] = await Promise.all([createCeramic(),getProvider()])
//     const did = new DID({
//         provider,
//         resolver: { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) },
//     })
//     await did.authenticate()
//     // window.did = did
//     ceramic.did = did
//     const idx = createIDX(ceramic)
//     console.log(did, idx, "this is here")
//     return idx.id
// }

// document.getElementsByClassName("css-18t94o4 css-1dbjc4n r-urgr8i r-42olwf r-sdzlij r-1phboty r-rs99b7 r-19u6a5r r-ero68b r-vkv6oe r-1ny4l3l r-1fneopy r-o7ynqc r-6416eg r-lrvibr").on


// console.log(window.ethereum, "here I am")
// setTimeout(authenticate, 10000)
// authenticate()


// let snowing = false;
// chrome.runtime.onMessage.addListener((message) => {
//   switch (message.type) {
//     case "SNOW_STATUS":
//       if (message.snowing) {
//         if (!snowing) {
//           body[0]?.prepend(snowflakesContainer);
//         }
//       } else {
//         snowflakesContainer.parentNode?.removeChild(snowflakesContainer);
//       }
//       snowing = message.snowing;
//       break;
//     default:
//       break;
//   }
// });
