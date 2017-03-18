const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: [
		"./public/views/index.js"
	],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "main.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules\/(?!(?:(?:me\.common\.js)|(?:me\.common\.jsx))(?!\/node_modules))/,
				loader: "babel-loader",
				query: {
					presets: [
						"react",
						"es2015",
						"stage-0"
					]
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
	]
};
