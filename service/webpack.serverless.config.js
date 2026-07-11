import path from "path";
import util from "../util.js";

import slsw from "serverless-webpack";
import nodeExternals from "webpack-node-externals";
import CopyWebpackPlugin from "copy-webpack-plugin";
import webpack from "webpack";
import SentryPlugin from "webpack-sentry-plugin";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

const __dirname = import.meta.dirname;

const {
    isDevelopment,
    resolveWebpackMode: resolveMode
} = util;

const plugins = [
    new webpack.DefinePlugin({
        "global.GENTLY": false
    }),
    new CopyWebpackPlugin({
        patterns: [
            ".serverless-secrets.json"
        ]
    })
];

if (!isDevelopment || process.env.BUNDLE_ANALYZER) {
    plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        })
    );
}

if (process.env.DEPLOY && process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(
        new SentryPlugin({
            organization: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            apiKey: process.env.SENTRY_AUTH_TOKEN,
            release: process.env.GITHUB_REF_NAME || process.env.GITHUB_SHA,
            releaseBody: (version, projects) => {
                return {
                    version,
                    projects,
                    refs: [
                        {
                            repository: process.env.GITHUB_REPOSITORY,
                            commit: process.env.GITHUB_SHA
                        }
                    ]
                };
            },
            filenameTransform: name => `~/${name.replace(/dist\//g, "docs/")}`,
            suppressConflictError: true
        })
    );
}

export default {
    entry: slsw.lib.entries,
    mode: resolveMode(),
    devtool: isDevelopment ? "eval-source-map" : "nosources-source-map",
    target: "node",
    optimization: {
        minimize: false
    },
    performance: {
        hints: false
    },
    externals: [nodeExternals({
        // NOTE-RT: emit third-party externals as real `import` statements (matching this bundle's
        // own genuine-ESM output below) instead of `require(...)` calls, so the deployed Lambda
        // bundle stays consistently real ESM end-to-end - the `nodejs24.x` runtime resolves these
        // via its own native ESM import of the deployed `node_modules`.
        importType: "module",
        allowlist: [
            "serverless-secrets/client",
            /@randy\.tarampi\/\w+/
        ]
    })],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: util.babelLoaderExclusions,
        // NOTE-RT: `fullySpecified: false` — see docs/CONVENTIONS.md#esm-rules
        resolve: {
            fullySpecified: false
        },
                loader: "babel-loader",
                options: {
                    configFile: path.join(__dirname, "../babel.config.js"),
                    envName: "server"
                }
            }
        ]
    },
    plugins,
    output: {
        // NOTE-RT: `.js` (not `.mjs`) — see docs/CONVENTIONS.md#webpack
        module: true,
        // NOTE-RT: `library.type: "module"` — see docs/CONVENTIONS.md#webpack
        library: {
            type: "module"
        },
        path: path.join(__dirname, ".webpack"),
        filename: "[name].js",
        sourceMapFilename: "[file].map",
        chunkFormat: "module"
    },
    experiments: {
        outputModule: true
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    }
};
