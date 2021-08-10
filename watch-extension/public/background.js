var currentTab;

chrome.tabs.query({ url: "https://twitter.com/*" }, function (tabArray) {
	console.log("It got here");
	currentTab = tabArray[0];
	chrome.debugger.attach(
		{
			//debug at current tab
			tabId: currentTab.id,
		},
		"1.0",
		() => {
			chrome.debugger.sendCommand(
				{
					//first enable the Network
					tabId: currentTab.id,
				},
				"Network.enable"
			);
			chrome.debugger.onEvent.addListener(
				(debuggeeId, message, params) => {
					if (currentTab.id != debuggeeId.tabId) {
						return;
					}

					if (message == "Network.responseReceived") {
						//response return
						chrome.debugger.sendCommand(
							{
								tabId: debuggeeId.tabId,
							},
							"Network.getResponseBody",
							{
								requestId: params.requestId,
							},
							function (response) {
								// you get the response body here!
								try {
									const responseObj = JSON.parse(
										response.body
									);
									if (
										responseObj.data &&
										responseObj.data.create_tweet
									) {
										console.log(responseObj);
										chrome.tabs.query(
											{ url: "http://localhost:3000/*" },
											function (tabs) {
												console.log(tabs, " this tab");
												chrome.tabs.sendMessage(
													tabs[0].id,
													{
														tweet: response.body,
														identification:
															"newTweet",
													}
												);
											}
										);
									}
								} catch (e) {}
								// you can close the debugger tips by:
								// chrome.debugger.detach(debuggeeId);
							}
						);
					}
				}
			);
		}
	);
});
