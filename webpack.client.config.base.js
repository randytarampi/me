const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "config");

const config = require("config");
const SentryPlugin = require("webpack-sentry-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PostCssPresetEnv = require("postcss-preset-env");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const util = require("./util");

const {
    isDevelopment,
    resolveWebpackMode: resolveMode
} = util;

const plugins = [
    new MiniCssExtractPlugin(),
    new HtmlWebpackHarddiskPlugin()
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

module.exports = ({
                      sourceDirectoryPath,
                      compliationDirectoryPath,
                      webpackServeMiddleware,
                      rules: otherRules = [],
                      plugins: otherPlugins = [],
                      publicPath = "/",
                      babelEnv = "client.es5",
                      babelLoaderExclusions = util.babelLoaderExclusions,
                      babelJsType = "javascript/auto",
                      ...configOverrides
                  }) => {
    return {
        target: "web",
        mode: resolveMode(),
        devtool: isDevelopment ? "eval-source-map" : "nosources-source-map",
        output: {
            path: compliationDirectoryPath,
            filename: "[name].js",
            publicPath
        },
        resolve: {
            extensions: [".js", ".jsx", ".json"]
        },
        module: {
            rules: [
                ...otherRules,
                {
                    test: /\.pug$/,
                    loader: "pug-loader"
                },
                {
                    test: /\.jsx?$/,
                    exclude: babelLoaderExclusions,
                    type: babelJsType,
                    loader: "babel-loader",
                    options: {
                        configFile: path.join(sourceDirectoryPath, "../../babel.config.js"),
                        envName: babelEnv
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: "postcss",
                                plugins: () => [PostCssPresetEnv()]
                            }
                        },
                        "resolve-url-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: [
                                    path.join(sourceDirectoryPath, "node_modules"),
                                    path.join(sourceDirectoryPath, "../css/node_modules"),
                                    path.join(sourceDirectoryPath, "../../node_modules")
                                ],
                                data: `$asset-url: "${config.get("www.assetUrl")}";\n`
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|ttf|woff|woff2|svg|gif|png|ico)$/,
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "dist/"
                    }
                }
            ]
        },
        plugins: otherPlugins.concat(plugins),
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
                publicPath,
                logLevel: "trace",
                logTime: true
            },
            on: {
                listening: ({server}) => {
                    const chokidar = require("chokidar");
                    const stringify = require("json-stringify-safe");
                    const webSocket = require("ws");

                    const socket = new webSocket("ws://localhost:8090");
                    const watcher = chokidar.watch(sourceDirectoryPath, {
                        ignored: /\/\.dynamodb|\.idea|\.nyc_output|\.serverless|\.webpack|coverage|dist|docs|es5|esm|node_modules\//
                    });

                    watcher.on("change", () => {
                        const data = {
                            type: "broadcast",
                            data: {
                                type: "window-reload",
                                data: {}
                            }
                        };

                        socket.send(stringify(data));
                    });

                    server.on("close", () => {
                        watcher.close();
                    });
                }
            },
            add: (app, middleware) => {
                const history = require("connect-history-api-fallback");
                const compress = require("koa-compress");
                const convert = require("koa-connect");

                app.use(compress());
                app.use(convert(history({
                    verbose: true
                })));

                if (webpackServeMiddleware) {
                    webpackServeMiddleware.forEach(middleware => {
                        app.use(middleware);
                    });
                }

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
            },
            minimizer:
                isDevelopment
                    ? []
                    : [
                        new TerserPlugin({
                            cache: true,
                            parallel: true,
                            sourceMap: true
                        }),
                        new OptimizeCSSAssetsPlugin()
                    ]
        },
        ...configOverrides
    };
};
