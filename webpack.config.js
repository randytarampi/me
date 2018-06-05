const path = require("path");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	devtool: "source-map",
	entry: [
		"babel-polyfill",
		"./public/views/index.jsx"
	],
	output: {
		path: path.join(__dirname, "dist"),
		filename: "main.js"
	},
	resolve: {
		extensions: [".js", ".jsx", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules\/(?!(me\.common\.\w+)\/)/,
				loader: "babel-loader",
				options: {
					forceEnv: "client"
				}
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		inline: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000,
			ignored: [
				/node_modules\/(?!(me\.common\.\w+)\/)/,
				/node_modules\/((me\.common\.\w+)\/node_modules)/
			]
		},
		host: "0.0.0.0",
		publicPath: path.join(__dirname, "dist"),
		stats: {
			colors: true
		}
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					filename: "vendor.js",
					chunks: "all"
				}
			}
		}
	}
};
