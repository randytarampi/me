const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const webpack = require("webpack");
const SentryPlugin = require("webpack-sentry-plugin");

const isDevelopment = process.env.WEBPACK_SERVE
    || process.env.NODE_ENV !== "production"
    || process.env.NODE_ENV !== "prd"
    || true;

const resolveMode = () => {
    if (isDevelopment) {
        return "development";
    }

    return "production";
};

const plugins = [
    new webpack.DefinePlugin({
        __WORDS_SERVICE_URL__: JSON.stringify(config.get("wordsServiceUrl")),
        __POSTS_SERVICE_URL__: JSON.stringify(config.get("postsServiceUrl")),
        __PHOTOS_SERVICE_URL__: JSON.stringify(config.get("photosServiceUrl")),
        __CODE_APP_URL__: JSON.stringify(config.get("codeAppUrl")),
        __WORDS_APP_URL__: JSON.stringify(config.get("wordsAppUrl")),
        __POSTS_APP_URL__: JSON.stringify(config.get("postsAppUrl")),
        __PHOTOS_APP_URL__: JSON.stringify(config.get("photosAppUrl")),
        __RESUME_APP_URL__: JSON.stringify(config.get("resumeAppUrl")),
        __ASSET_URL__: JSON.stringify(config.get("assetUrl")),
        __PUBLISHED_RESUME_URL__: JSON.stringify(config.get("resume.publishUrl")),
        __CAMPAIGN_SOURCE__: JSON.stringify(config.get("me.campaign.source")),
        __CAMPAIGN_MEDIUM__: JSON.stringify(config.get("me.campaign.medium")),
        __CAMPAIGN_NAME__: JSON.stringify(config.get("me.campaign.name")),
        __CAMPAIGN_TERM__: JSON.stringify(config.get("me.campaign.term")),
        __CAMPAIGN_CONTENT__: JSON.stringify(config.get("me.campaign.content"))
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
    mode: resolveMode(),
    devtool: "source-map",
    entry: {
        resume: ["@babel/polyfill", `${__dirname}/public/views/index.jsx`]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "resume.js",
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules\/(?!(@randy\.tarampi\/|query-string|strict-uri-encode|strip-ansi|ansi-regex))/,
                loader: "babel-loader",
                options: {
                    configFile: path.join(__dirname, "../../babel.config.js"),
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
        content: path.join(__dirname, "dist"),
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
                const watcher = chokidar.watch(__dirname);

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
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    filename: "vendor.js",
                    chunks: "all"
                }
            }
        }
    }
};
