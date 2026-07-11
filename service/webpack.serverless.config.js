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
                // NOTE-RT: with `experiments.outputModule: true`, webpack enforces Node's strict
                // "fully specified" import-specifier resolution even for internal, non-external
                // modules - `babel-plugin-lodash` (see `babel.config.js`) rewrites named lodash
                // imports into bare extensionless subpath imports (`lodash/compact`), which then
                // fail to resolve. Matches the identical, already-proven per-rule fix in
                // `webpack.client.config.base.js` for the same reason (a top-level `resolve`
                // override isn't enough - this has to be scoped to the rule matching these files).
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
        // NOTE-RT: intentionally still "[name].js" (not "[name].mjs") - `serverless-webpack`'s
        // `individually: false` packaging (see `serverless.yml`) resolves each function's deployed
        // `handler` path by matching this exact filename against the original handler's basename.
        // Real ESM output still works under a plain `.js` extension here because `nodejs24.x`
        // resolves module format from the nearest `package.json`'s `"type"` field - this package's
        // own `package.json` already declares `"type": "module"`, and `serverless-webpack` copies
        // it alongside the bundled function code.
        module: true,
        // NOTE-RT: without an explicit `library.type: "module"`, webpack's real-ESM output still
        // captures each entry's exports into a local runtime variable internally, but never
        // actually re-exposes them via a real, statically-discoverable top-level `export`
        // statement - so `nodejs24.x` couldn't find the `.default` handler export named in
        // `serverless.yml` even though the bundle itself compiles cleanly. This is what actually
        // emits that top-level `export`.
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
