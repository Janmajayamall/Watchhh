const { IDX } = require("@ceramicstudio/idx");
const Ceramic = require("@ceramicnetwork/http-client");
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import KeyDidResolver from "key-did-resolver";
const { DID } = require("dids");

let global_idx = null;

chrome.runtime.onMessageExternal.addListener(async function (
	request,
	sender,
	sendResponse
) {
	console.log(request.idx, "received did");
	const did = new DID({
		_client: request.idx._client,
		_resolver: request.idx._resolver,
		_id: request.idx._id,
	});

	const ceramic = new Ceramic.default("https://ceramic-clay.3boxlabs.com");
	await ceramic.setDID(did);
	console.log(ceramic.did, " ceramic");
	const config = {
		profile:
			"kjzl6cwe1jw14b053lm14tuq9k09cazc49edescc760vxj80qwmu5th4dsr6irv",
	};
	const idx = new IDX({ ceramic, aliases: config });
	console.log(idx.authenticated, idx.id, ceramic.did.id);
	try {
		const d = await idx.set("basicProfile", { name: "jmall" });
		console.log(d);
		// await idx.set("profile", {
		// 	name: "new name",
		// });
		// console.log("did set");
		// const pro = await idx.get("profile");
		// console.log(pro, " yay profile is here");
	} catch (e) {
		console.log(e);
	}

	// chrome.storage.local.set({ idx: request.idx }, async function () {
	// 	// const provider = request.idx;

	// 	// const keyDidResolver = KeyDidResolver.getResolver();
	// 	// const threeIdResolver = ThreeIdResolver.getResolver(ceramic);
	// 	// const resolverRegistry = {
	// 	// 	...threeIdResolver,
	// 	// 	...keyDidResolver,
	// 	// };

	// 	// const did = new DID({
	// 	// 	provider: provider,
	// 	// 	resolver: resolverRegistry,
	// 	// });

	// 	// try {
	// 	// 	await did.authenticate();
	// 	// } catch (e) {
	// 	// 	console.log(e);
	// 	// }

	// 	// // global_idx = idx;
	// 	// try {
	// 	// 	await idx.set("profile", {
	// 	// 		name: "new name",
	// 	// 	});
	// 	// 	console.log("did set");
	// 	// 	const pro = await idx.get("profile");
	// 	// 	console.log(pro, " yay profile is here");
	// 	// } catch (e) {
	// 	// 	console.log(e);
	// 	// }
	// });
});

// chrome.webRequest.onBeforeRequest.addListener(
// 	(details) => {
// 		console.log(details.requestBody);
// 		if (details.requestBody.raw && details.requestBody.raw[0].bytes) {
// 			var arr = new Uint8Array(details.requestBody.raw[0].bytes);
// 			var str = String.fromCharCode.apply(String, arr);
// 			if (/[\u0080-\uffff]/.test(str)) {
// 				console.log(
// 					"this string seems to contain (still encoded) multibytes"
// 				);
// 			}
// 			console.log(str);
// 			const { variables } = JSON.parse(str);
// 			const values = JSON.parse(variables);
// 			console.log(values);
// 		}
// 	},
// 	{ urls: ["*://*.twitter.com/*"] },
// 	["requestBody"]
// );

// chrome.webRequest.onCompleted.addListener(
// 	(details) => {
// 		console.log(details.responseHeaders);
// 	},
// 	{ urls: ["*://*.twitter.com/*"] },
// 	["responseHeaders"]
// );

// var currentTab;

// chrome.tabs.query({ url: "https://twitter.com/*" }, function (tabArray) {
// 	console.log("It got here");
// 	currentTab = tabArray[0];
// 	chrome.debugger.attach(
// 		{
// 			//debug at current tab
// 			tabId: currentTab.id,
// 		},
// 		"1.0",
// 		() => {
// 			chrome.debugger.sendCommand(
// 				{
// 					//first enable the Network
// 					tabId: currentTab.id,
// 				},
// 				"Network.enable"
// 			);
// 			chrome.debugger.onEvent.addListener(
// 				(debuggeeId, message, params) => {
// 					if (currentTab.id != debuggeeId.tabId) {
// 						return;
// 					}

// 					if (message == "Network.responseReceived") {
// 						//response return
// 						chrome.debugger.sendCommand(
// 							{
// 								tabId: debuggeeId.tabId,
// 							},
// 							"Network.getResponseBody",
// 							{
// 								requestId: params.requestId,
// 							},
// 							function (response) {
// 								// you get the response body here!
// 								try {
// 									const responseObj = JSON.parse(
// 										response.body
// 									);
// 									if (
// 										responseObj.data &&
// 										responseObj.data.create_tweet
// 									) {
// 										console.log(responseObj);
// 									}
// 								} catch (e) {}
// 								// you can close the debugger tips by:
// 								// chrome.debugger.detach(debuggeeId);
// 							}
// 						);
// 					}
// 				}
// 			);
// 		}
// 	);
// });
