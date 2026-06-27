import {createRequire} from "module";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import util from "./util.js";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
process.env.NODE_CONFIG_DIR = join(__dirname, "config");

const config = require("config");
const SentryPlugin = require("webpack-sentry-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PostCssPresetEnv = require("postcss-preset-env");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

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

export default ({
                      sourceDirectoryPath,
                      compliationDirectoryPath,
                      webpackDevServerMiddleware,
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
                                postcssOptions: {
                                    ident: "postcss",
                                    plugins: [PostCssPresetEnv()]
                                }
                            }
                        },
                        "resolve-url-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    includePaths: [
                                        path.join(sourceDirectoryPath, "node_modules"),
                                        path.join(sourceDirectoryPath, "../css/node_modules"),
                                        path.join(sourceDirectoryPath, "../../node_modules")
                                    ]
                                },
                                additionalData: `$asset-url: "${config.get("www.assetUrl")}";\n`
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
        devServer: {
            setupMiddlewares: (middlewares, devServer) => {
                if (webpackDevServerMiddleware) {
                    webpackDevServerMiddleware.forEach(middleware => middleware(devServer.app, devServer.server, devServer.compiler));
                }

                return middlewares;
            },
            bonjour: true,
            client: {
                logging: "trace",
                overlay: true
            },
            compress: true,
            static: {
                directory: compliationDirectoryPath
            },
            devMiddleware: {
                publicPath
            },
            port: 8080,
            stats: "normal"
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
                            parallel: true,
                            terserOptions: {
                                sourceMap: true
                            }
                        }),
                        new OptimizeCSSAssetsPlugin()
                    ]
        },
        ...configOverrides
    };
};
