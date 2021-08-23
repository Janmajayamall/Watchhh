# Watchhh

### _a censorship/takedown resistant archive of your tweets & DMs_

<br />

### What is Watchhh

Watchhh is a censorship / takedown resistant archiving tool for twitter. It helps you store your tweets & DMs on decentralised web, under your decentralised identity, such that your data is stored forever, is under your control, and is take down / censorship resistant. Moreover, I believe a tool like Watchhh is the one of the first few steps towards decentralised social media platforms since it allows an easy migration from web 2 to web 3 platforms.

Watchhh is a combination of two tools (1) Chrome extension (2) Webpage dashboard. The chrome extension takes care of archiving your tweets, the moment you tweet, on the decentralised web, thus automating the archiving process. The webpage dashboard helps you monitor your archived tweets, upload old tweets that aren't archived, and keep your DMs archive in sync.

<br />

### Tech used

Under the hood Watchhh leverages Web3 Storage (IPFS & Filecoin) and Ceramic network for storage of user data. The user data is owned by the user with the help of decentralised identity protocol IDX.

The tool uses 4 different definitions stored under user's IDX index (1) Twitter Profile (2) Web3Storage (3) Twitter Tweets (4) Twitter DMs

To get started with the tool, users will have to create a profile record, mapped to their respective Twitter Profile definition. Plus, to enable web3 storage users will have to obtain a Web3 Storage token from http://web3.storage, which will be stored in encrypted form as a record mapped to their WebStorage definition.

The chrome extension listens to the API calls of the user's twitter. Whenever the extension spots a create tweet API call, it initiates the storage process. The storage process consists of following steps -

1. Tweet data is converted to a json file & stored on web3 storage using the user's web3 storage token.
2. A new tweet object is created containing tweet ID & tweet's json file CID obtained from web3 storage.
3. The new tweet object is added to the existing list of tweets stored as a record mapped to the user's Twitter Tweets definition.

To archive old tweets & DMs users will have to first request their twitter data from twitter. It will take around 24 hours.

After receiving their data from twitter, users can archive their old tweets & DMs by uploading two files (1) tweet.js (consisting of all their tweets & retweets) (2) direct-messages.js (consisting of all their direct messages) to the webpage dashboard.

Storage of old tweets follow the same process as storage of new tweets. For storage of DMs, each direct message is first encrypted and then added to the messages list that is stored as a record mapped to the user's Twitter DMs definition.
