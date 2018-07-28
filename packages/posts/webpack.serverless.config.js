import CopyWebpackPlugin from "copy-webpack-plugin";
import path from "path";
import slsw from "serverless-webpack";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
// import SentryCliPlugin from "@sentry/webpack-plugin";

const isDevelopment = process.env.WEBPACK_SERVE
    || process.env.NODE_ENV !== "production"
    || process.env.NODE_ENV !== "prd"
    || slsw.lib.webpack.isLocal
    || true;

const resolveMode = () => {
    if (isDevelopment) {
        return "development";
    }

    return "production";
};

const plugins = [
    new webpack.DefinePlugin({
        "global.GENTLY": false
    }),
    new CopyWebpackPlugin([
        {
            from: ".serverless-secrets.json",
            to: ".serverless-secrets.json"
        }
    ])
];

// if (process.env.TRAVIS_TAG) { // NOTE-RT: Bring this back when we switch to using the other sentry webpack plugin
//     plugins.push(
//         new SentryCliPlugin({
//             include: ".",
//             ignore: ["node_modules", "webpack.serverless.config.js"],
//             release: process.env.TRAVIS_TAG,
//             debug: true
//         })
//     );
// }

module.exports = {
    entry: slsw.lib.entries,
    mode: resolveMode(),
    optimization: {
        minimize: false
    },
    performance: {
        hints: false
    },
    devtool: "nosources-source-map",
    externals: [nodeExternals({
        whitelist: [
            "serverless-secrets/client",
            /@randy\.tarampi\/\w+/
        ]
    })],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules\/(?!(@randy\.tarampi\/\w+)\/)/,
                loader: "babel-loader",
                options: {
                    forceEnv: "server"
                }
            }
        ]
    },
    plugins,
    output: {
        libraryTarget: "commonjs2",
        path: path.join(__dirname, ".webpack"),
        filename: "[name].js",
        sourceMapFilename: "[file].map"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    }
};
