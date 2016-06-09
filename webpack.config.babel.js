import path from "path";
import webpack from "webpack";

export default {
	entry: [
		"./app/index.js"
	],
	externals: {
		"jquery": "jQuery",
		"moment": "moment",
		"react": "React"
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
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};
