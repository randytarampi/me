import SentryCliPlugin from "@sentry/webpack-plugin";
import config from "config";
import path from "path";
import webpack from "webpack";

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
        __WORDS_APP_URL__: JSON.stringify(config.get("wordsAppUrl")),
        __POSTS_APP_URL__: JSON.stringify(config.get("postsAppUrl")),
        __PHOTOS_APP_URL__: JSON.stringify(config.get("photosAppUrl")),
        __ASSET_URL__: JSON.stringify(config.get("assetUrl")),
    })
];

if (process.env.TRAVIS_TAG) {
    plugins.push(
        new SentryCliPlugin({
            include: ".",
            ignore: ["node_modules", "webpack.config.js"],
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
                import chokidar from "chokidar";
                import stringify from "json-stringify-safe";
                import webSocket from "ws";

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
            import history from "connect-history-api-fallback";
            import compress from "koa-compress";
            import convert from "koa-connect";

            app.use(compress());
            app.use(convert(history({
                verbose: true,
                rewrites: [
                    {from: /\/photos/, to: "/photos.html"},
                    {from: /\/words/, to: "/words.html"},
                    {from: /\/blog/, to: "/blog.html"}
                ]
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
