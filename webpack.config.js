const path = require("path");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	entry: [
		"babel-polyfill",
		"./lib/posts.js"
	],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "main.js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules\/(?!(me\.common)\/)/,
				loader: "babel-loader",
				options: {
					forceEnv: "client"
				}
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all"
				}
			}
		}
	}
};
