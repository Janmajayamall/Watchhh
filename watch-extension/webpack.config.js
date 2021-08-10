const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
	// mode:"production",
	entry: {
		popup: path.join(__dirname, "src/popup.js"),
		// content: path.join(__dirname, "src/content.js"),
		// background: path.join(__dirname, "src/background.js"),
		options: path.join(__dirname, "src/options.js"),
		"initial-script": path.join(__dirname, "src/initial-script.js"),
	},
	output: { path: path.join(__dirname, "dist"), filename: "[name].js" },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",

				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
				exclude: /\.module\.css$/,
			},
			{
				test: /\.ts(x)?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: true,
						},
					},
				],
				include: /\.module\.css$/,
			},
			{
				test: /\.svg$/,
				use: "file-loader",
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: "url-loader",
						options: {
							mimetype: "image/png",
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".tsx", ".ts"],
		alias: {
			"react-dom": "@hot-loader/react-dom",
		},
		mainFields: ["browser"],
		fallback: {
			events: require.resolve("events/"),
			util: require.resolve("util/"),
			xtend: require.resolve("extend/"),
			"ethereumjs-util": require.resolve("ethereumjs-util/"),
			semaphore: require.resolve("semaphore/"),
			"eth-block-tracker": require.resolve("eth-block-tracker/"),
			"rpc-utils": require.resolve("rpc-utils/"),
			"@walletconnect/window-metadata": require.resolve(
				"@walletconnect/window-metadata/"
			),
			"@walletconnect/window-getters": require.resolve(
				"@walletconnect/window-getters/"
			),
			"@walletconnect/environment": require.resolve(
				"@walletconnect/environment/"
			),
			"xhr2-cookies": require.resolve("xhr2-cookies/"),
			"@walletconnect/encoding": require.resolve(
				"@walletconnect/encoding/"
			),
			"bn.js": require.resolve("bn.js/"),
			"js-sha3": require.resolve("js-sha3/"),
			"@walletconnect/qrcode-modal": require.resolve(
				"@walletconnect/qrcode-modal/"
			),
			"@ceramicnetwork/blockchain-utils-linking": require.resolve(
				"@ceramicnetwork/blockchain-utils-linking/"
			),
			"postmsg-rpc": require.resolve("postmsg-rpc/"),
			caip: require.resolve("caip/"),
			"@ceramicnetwork/http-client": require.resolve(
				"@ceramicnetwork/http-client/"
			),
			web3modal: require.resolve("web3modal/"),
			string_decoder: require.resolve("string_decoder/"),
			url: require.resolve("url/"),
			"@stablelib/sha256": require.resolve("@stablelib/sha256/"),
			"json-rpc-engine": require.resolve("json-rpc-engine/"),
			assert: require.resolve("assert/"),
			rlp: require.resolve("rlp/"),
			cookiejar: require.resolve("cookiejar/"),
			http: require.resolve("stream-http"),
			https: require.resolve("https-browserify"),
			punycode: require.resolve("punycode/"),
			elliptic: require.resolve("elliptic/"),
			"readable-stream": require.resolve("readable-stream/"),
			"@ceramicnetwork/common": require.resolve(
				"@ceramicnetwork/common/"
			),
			"@ceramicnetwork/stream-tile": require.resolve(
				"@ceramicnetwork/stream-tile/"
			),
			"@ceramicnetwork/stream-caip10-link": require.resolve(
				"@ceramicnetwork/stream-caip10-link/"
			),
			"@ceramicnetwork/streamid": require.resolve(
				"@ceramicnetwork/streamid/"
			),
			"@stablelib/binary": require.resolve("@stablelib/binary/"),
			"@stablelib/wipe": require.resolve("@stablelib/wipe/"),
			"typescript-memoize": require.resolve("typescript-memoize/"),
			multibase: require.resolve("multibase/"),
			"@stablelib/int": require.resolve("@stablelib/int/"),
			cids: require.resolve("cids/"),
			"@stablelib/random": require.resolve("@stablelib/random/"),
			"fast-json-patch": require.resolve("fast-json-patch/"),
			multihashes: require.resolve("multihashes/"),
			"@multiformats/base-x": require.resolve("@multiformats/base-x/"),
			multicodec: require.resolve("multicodec/"),
			"core-util-is": require.resolve("core-util-is/"),
			has: require.resolve("has/"),
			"ethjs-util": require.resolve("ethjs-util/"),
			"hash.js": require.resolve("hash.js/"),
			"hmac-drbg": require.resolve("hmac-drbg/"),
			qrcode: require.resolve("qrcode/"),
			dijkstrajs: require.resolve("dijkstrajs/"),
			"minimalistic-crypto-utils": require.resolve(
				"minimalistic-crypto-utils/"
			),
			"is-hex-prefixed": require.resolve("is-hex-prefixed/"),
			"strip-hex-prefix": require.resolve("strip-hex-prefix/"),
			buffer: require.resolve("buffer"),
			"regenerator-runtime": require.resolve("regenerator-runtime/"),
			"@ceramicstudio/idx": require.resolve("@ceramicstudio/idx/"),
			"@ceramicstudio/idx-constants": require.resolve(
				"@ceramicstudio/idx-constants/"
			),
			dids: require.resolve("dids/"),
			"did-resolver": require.resolve("did-resolver/"),
			"did-jwt": require.resolve("did-jwt/"),
			"dag-jose-utils": require.resolve("dag-jose-utils/"),
			canonicalize: require.resolve("canonicalize"),
			"@stablelib/x25519": require.resolve("@stablelib/x25519/"),
			"@stablelib/xchacha20poly1305": require.resolve(
				"@stablelib/xchacha20poly1305/"
			),
			"@stablelib/ed25519": require.resolve("@stablelib/ed25519/"),
			"ipld-dag-cbor": require.resolve("ipld-dag-cbor/"),
			"@stablelib/chacha20poly1305": require.resolve(
				"@stablelib/chacha20poly1305/"
			),
			"@stablelib/xchacha20": require.resolve("@stablelib/xchacha20/"),
			"@stablelib/chacha": require.resolve("@stablelib/chacha/"),
			"@stablelib/poly1305": require.resolve("@stablelib/poly1305/"),
			"@stablelib/constant-time": require.resolve(
				"@stablelib/constant-time/"
			),
			"@stablelib/sha512": require.resolve("@stablelib/sha512/"),
			borc: require.resolve("borc/"),
			"multihashing-async": require.resolve("multihashing-async/"),
			"@ceramicnetwork/3id-did-resolver": require.resolve(
				"@ceramicnetwork/3id-did-resolver/"
			),
			"key-did-resolver": require.resolve("key-did-resolver/"),
			lru_map: require.resolve("lru_map/"),
		},
	},
	devtool: "cheap-module-source-map",
	devServer: {
		contentBase: "./dist",
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: "public", to: "." }],
		}),
		new webpack.ProvidePlugin({
			process: "process/browser",
		}),
	],
};

module.exports = config;
