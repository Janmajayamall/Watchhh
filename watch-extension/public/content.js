chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(request, "hey ");
	if (request.identification == "newTweet") {
		console.log(request);
		var actualCode = `
            window.addTweet(${request.tweet});
        `;
		var script = document.createElement("script");
		script.textContent = actualCode;
		(document.head || document.documentElement).appendChild(script);
		script.remove();
	}
});
