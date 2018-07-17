const path = require("path");
const webpack = require("webpack");
const config = require("config");
const SentryCliPlugin = require("@sentry/webpack-plugin");

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
        __POSTS_URL__: JSON.stringify(config.get("postsUrl")),
        __APP_URL__: JSON.stringify(config.get("appUrl")),
    })
];

if (process.env.TRAVIS_TAG) {
    plugins.push(
        new SentryCliPlugin({
            include: ".",
            ignore: ["node_modules", "webpack.client.config.js"],
            release: process.env.TRAVIS_TAG,
            debug: true
        })
    );
}

module.exports = {
    mode: resolveMode(),
    devtool: "source-map",
    entry: ["babel-polyfill", `${__dirname}/public/views/index.jsx`],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "main.js",
        publicPath: "/"
    },
    resolve: {
        alias: {
            react: path.resolve(__dirname, "node_modules/react")
        },
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
    plugins,
    serve: {
        clipboard: false,
        content: "./dist/",
        hot: {
            host: "localhost",
            port: 8090,
        },
        dev: {
            publicPath: "/"
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

            middleware.webpack();
            middleware.content();
            app.use(compress());
            app.use(convert(history({
                verbose: true
            })));
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
