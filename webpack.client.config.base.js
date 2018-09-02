const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "config");

const SentryPlugin = require("webpack-sentry-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const util = require("./util");

const isDevelopment = process.env.WEBPACK_SERVE
    || !["production", "prd"].includes(process.env.NODE_ENV)
    || true;

const resolveMode = () => {
    if (isDevelopment) {
        return "development";
    }

    return "production";
};

const plugins = [];

if (process.env.WEBPACK_BUNDLE_ANALYZER) {
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

module.exports = ({sourceDirectoryPath, compliationDirectoryPath, ...configOverrides}) => {
    return {
        node: {
            fs: "empty",
            module: "empty",
            os: "empty",
            stream: "empty"
        },
        mode: resolveMode(),
        devtool: "source-map",
        output: {
            path: compliationDirectoryPath,
            filename: "[name].js",
            publicPath: "/"
        },
        resolve: {
            extensions: [".js", ".jsx", ".json"]
        },
        module: {
            noParse: util.webpackModuleNoParseInclusions,
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: util.babelLoaderExclusions,
                    loader: "babel-loader",
                    options: {
                        configFile: path.join(sourceDirectoryPath, "../../babel.config.js"),
                        envName: "client"
                    }
                },
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                }
            ]
        },
        plugins,
        serve: {
            clipboard: false,
            content: compliationDirectoryPath,
            host: "localhost",
            port: 8080,
            hotClient: {
                host: "localhost",
                port: 8090,
                allEntries: true,
                logLevel: "trace",
                logTime: true
            },
            devMiddleware: {
                publicPath: "/",
                logLevel: "trace",
                logTime: true
            },
            on: {
                listening: ({server}) => {
                    const chokidar = require("chokidar");
                    const stringify = require("json-stringify-safe");
                    const webSocket = require("ws");

                    const socket = new webSocket("ws://localhost:8090");
                    const watcher = chokidar.watch(sourceDirectoryPath);

                    watcher.on("change", () => {
                        const data = {
                            type: "broadcast",
                            data: {
                                type: "window-reload",
                                data: {},
                            },
                        };

                        socket.send(stringify(data));
                    });

                    server.on("close", () => {
                        watcher.close();
                    });
                },
            },
            add: (app, middleware) => {
                const history = require("connect-history-api-fallback");
                const compress = require("koa-compress");
                const convert = require("koa-connect");

                app.use(compress());
                app.use(convert(history({
                    verbose: true
                })));
                middleware.webpack();
                middleware.content();
            },
            logLevel: "trace",
            logTime: true
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: util.webpackVendorInclusions,
                        name: "vendor",
                        filename: "vendor.js",
                        chunks: "all"
                    }
                }
            }
        },
        ...configOverrides
    };
};
