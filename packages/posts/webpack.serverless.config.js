const path = require("path");const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const SentryPlugin = require("webpack-sentry-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const {babelLoaderExclusions, WEBPACK_MODE_DEVELOPMENT} = require("../../util");

const plugins = [
    new webpack.DefinePlugin({
        "global.GENTLY": false
    }),
    new CopyWebpackPlugin([
        {
            from: ".serverless-secrets.json",
            to: ".serverless-secrets.json"
        }
    ]),
    new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false
    })
];

if (process.env.DEPLOY && process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(
        new SentryPlugin({
            organization: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            apiKey: process.env.SENTRY_AUTH_TOKEN,
            release: process.env.TRAVIS_TAG || process.env.TRAVIS_COMMIT,
            releaseBody: (version, projects) => {
                return {
                    version,
                    projects,
                    refs: [
                        {
                            repository: process.env.TRAVIS_REPO_SLUG,
                            commit: process.env.TRAVIS_COMMIT
                        }
                    ]
                };
            },
            filenameTransform: name => `~/${name.replace(/dist\//g, "docs/")}`,
            suppressConflictError: true
        })
    );
}

module.exports = {
    entry: slsw.lib.entries,
    mode: WEBPACK_MODE_DEVELOPMENT, // FIXME-RT: Don't exactly know what `production` mode is bungling [here](https://github.com/randytarampi/me/commit/56348a3c3928a629016c1b5da850cdd8ad000797), but development mode code seems to work just fine when copy/pasted into `ca-central-1`
    target: "node",
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
                exclude: babelLoaderExclusions,
                loader: "babel-loader",
                options: {
                    configFile: path.join(__dirname, "../../babel.config.js"),
                    envName: "server"
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
