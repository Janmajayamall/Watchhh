const d = {
	name: "Watchh",
	description: "Chrome Extension for making it snow in your browser!",
	manifest_version: 2,
	version: "1.0.0",
	icons: {
		16: "icon16.png",
		32: "icon32.png",
		64: "icon64.png",
		128: "icon128.png",
	},
	page_action: {
		default_icon: "icon128.png",
		default_popup: "popup.html",
	},
	background: {
		scripts: ["background.js"],
		persistent: false,
	},

	content_scripts: [
		{
			matches: ["*://*.twitter.com/*"],
			js: ["content.js"],
		},
	],
	content_security_policy:
		"script-src 'self' 'unsafe-eval' https://ceramic-clay.3boxlabs.com; object-src 'self'",
	options_page: "options.html",
	permissions: ["storage"],
};

// "content_security_policy": {
//   "extension_pages": "script-src 'self'; object-src 'self'",
//     "sandbox": "sandbox allow-scripts; script-src 'self'; object-src 'self'"
// },

// "web_accessible_resources": ["initial-script.js"],

// 	"content_scripts": [
// 	{
// 		"matches": ["*://*.twitter.com/*", "http://localhost:5000/"],
// 		"js": ["content.js"]
// 	}
// ],
