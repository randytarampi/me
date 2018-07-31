import path from "path";

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: [
        "babel-polyfill",
        "./test/build/views/index.jsx"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "jsx.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules\/(?!(@randy\.tarampi\/\w+)\/)/,
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
