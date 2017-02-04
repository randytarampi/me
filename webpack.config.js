const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: [
		"./public/views/index.js"
	],
	externals: {
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: "main.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		require("webpack-fail-plugin")
	]
};
