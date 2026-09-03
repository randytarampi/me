import {createRequire} from "module";
import {dirname, join} from "path";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import util from "./util.js";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
process.env.NODE_CONFIG_DIR = join(__dirname, "config");

const config = require("config");
const {sentryWebpackPlugin} = require("@sentry/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PostCssPresetEnv = require("postcss-preset-env");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

const {
    isDevelopment,
    resolveWebpackMode: resolveMode
} = util;

const plugins = [
    new MiniCssExtractPlugin(),
    new HtmlWebpackHarddiskPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin()
];

// NOTE-RT: this was `webpack-sentry-plugin`, unmaintained since 2019 and written against a
// Sentry API generation that predates debug IDs - which is why it needed a `filenameTransform`
// to rewrite `dist/` to `docs/`. `@sentry/webpack-plugin` matches sourcemaps to frames by
// embedded debug ID, so no path rewriting is required.
//
// Still inert until `SENTRY_AUTH_TOKEN` exists as a repository secret; nothing uploads today.
if (process.env.DEPLOY && process.env.SENTRY_AUTH_TOKEN) {
    plugins.push(
        sentryWebpackPlugin({
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
            release: {
                name: process.env.GITHUB_REF_NAME || process.env.GITHUB_SHA,
                setCommits: {
                    repo: process.env.GITHUB_REPOSITORY,
                    commit: process.env.GITHUB_SHA
                }
            },
            sourcemaps: {
                assets: "./dist/**"
            }
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
                      babelEnv = "client",
                      babelLoaderExclusions = util.babelLoaderExclusions,
                      babelJsType = "javascript/auto",
                      inlineFonts = false,
                      ...configOverrides
                  }) => {
    return {
        target: "web",
        mode: resolveMode(),
        // NOTE-RT: `@googlemaps/markerclusterer` ships ESM with no default export. The namespace
        // import + runtime fallback in `markerClusterer.jsx` handles both shapes correctly, but
        // webpack's static analysis still warns about the missing `default`. Suppress that
        // specific false-positive so it doesn't pollute build output.
        ignoreWarnings: [
            /export 'default' \(imported as 'MarkerClustererModule'\) was not found in '@googlemaps\/markerclusterer'/
        ],
        devtool: isDevelopment ? "eval-source-map" : "nosources-source-map",
        output: {
            path: compliationDirectoryPath,
            filename: "[name].js",
            publicPath
        },
        resolve: {
            alias: {
                "@randy.tarampi/jsx$": join(dirname(require.resolve("@randy.tarampi/jsx/package.json")), "src/index.client.js"),
                "@randy.tarampi/printables$": join(dirname(require.resolve("@randy.tarampi/printables/package.json")), "src/index.client.js"),
                "@randy.tarampi/resume$": join(dirname(require.resolve("@randy.tarampi/resume/package.json")), "src/index.client.js"),
                "@randy.tarampi/letter$": join(dirname(require.resolve("@randy.tarampi/letter/package.json")), "src/index.client.js"),
                // NOTE-RT: hardens against a reported (but not locally reproducible) resolution error
                // for this package's `esm/package.json` - mirrors the same alias shortcut already used
                // above for `jsx`/`printables`/`resume`/`letter`, bypassing fragile `package.json`
                // field-based resolution for this workspace package too.
                "@randy.tarampi/browser-logger$": join(dirname(require.resolve("@randy.tarampi/browser-logger/package.json")), "src/index.js"),
                // NOTE-RT: `immutable@5` ships no `"exports"`/`"browser"` field, so webpack's default
                // `target: "web"` `mainFields` (`["browser", "module", "main"]`) resolves the bare
                // `"immutable"` specifier to its real-ESM build (`dist/immutable.es.js`, no default
                // export) for EVERY consumer in the bundle - including third-party, unmodifiable
                // pre-compiled CJS code like `redux-immutable`, which does
                // `_interopRequireDefault(require("immutable")).default.Map` internally. Against a
                // genuine ESM module with no default export, that `.default` access resolves to
                // `undefined`, crashing at runtime (`_immutable2.default.Map` is not an object).
                // Forcing `immutable` to resolve to its CJS/UMD build here fixes this for every
                // consumer at once, matching what `webpack.publish.config.base.js`'s
                // `mainFields: ["main", "module"]` already does for the PDF-generation bundles.
                "immutable$": require.resolve("immutable")
            },
            extensions: [".js", ".jsx", ".json"]
        },
        module: {
            rules: [
                ...otherRules,
                {
                    test: /\.pug$/,
                    // NOTE-RT: @webdiscus/pug-loader (the maintained fork) self-references its own
                    // package name internally, so it cannot be installed under an `npm:` alias of
                    // `pug-loader` — depend on it by real name and reference it directly here.
                    loader: "@webdiscus/pug-loader"
                },
                {
                    test: /\.jsx?$/,
                    exclude: babelLoaderExclusions,
                    type: babelJsType,
                    // NOTE-RT: `fullySpecified: false` — see docs/CONVENTIONS.md#esm-rules
                    resolve: {
                        fullySpecified: false
                    },
                    loader: "babel-loader",
                    options: {
                        configFile: join(sourceDirectoryPath, "../babel.config.js"),
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
                                // NOTE-RT: `loadPaths` (not `includePaths`) — see docs/CONVENTIONS.md#building
                                loadPaths: [
                                        join(sourceDirectoryPath, "node_modules"),
                                        join(sourceDirectoryPath, "../css/node_modules"),
                                        join(sourceDirectoryPath, "../../node_modules")
                                    ]
                                },
                                additionalData: `$asset-url: "${config.get("www.assetUrl")}";\n`
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|ttf|woff|woff2|svg|gif|png|ico)$/,
                    // NOTE-RT: printable builds opt into `asset/inline` so their CSS is self-contained
                    // for puppeteer's `page.setContent()`; web builds retain `asset/resource` so the
                    // preloaded font files remain separately deployable.
                    // Previously this was `loader: "file-loader"` with `options: {name: "[name].[ext]"}`.
                    // `@fortawesome/fontawesome-free`'s own `regular.scss`/`solid.scss` partials (pulled in
                    // via `packages/css/styles/fonts.scss`) declare `@font-face src: url(...)` for these
                    // same font files, which `css-loader`/`mini-css-extract-plugin` resolve as a *module
                    // import* of this same source file, independent of any `file-loader`-produced module for
                    // the identical resource. Mixing a `file-loader`-based rule with that second resolution
                    // path caused webpack to additionally emit a second, corrupted copy of each affected font
                    // under a content-hash filename (e.g. `db5e5ccecfbcc73d03fa.woff2`) as an "auxiliary
                    // asset" of the `styles` chunk - its content was `file-loader`'s own generated JS wrapper
                    // source, not real font bytes, so the URL still 200'd but the browser couldn't parse it
                    // as a font. Using webpack5's native Asset Modules instead - the mechanism
                    // `css-loader`'s own resolution already expects - makes both paths agree on a
                    // single, correctly-handled asset per source file.
                    type: inlineFonts ? "asset/inline" : "asset/resource",
                    generator: inlineFonts ? {} : {
                        filename: "[name][ext]"
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
                // NOTE-RT: `webpack-dev-server@5` only accepts none/error/warn/info/log/verbose here;
                // `"trace"` fails devServer schema validation before Babel/react-refresh is ever reached.
                logging: "verbose",
                overlay: true
            },
            compress: true,
            static: {
                directory: compliationDirectoryPath,
                // NOTE-RT: `watch: false` — see docs/CONVENTIONS.md#webpack
                watch: false
            },
            // NOTE-RT: top-level `devServer.stats` was removed in the webpack-dev-server v4->v5
            // migration; `stats` now lives under `devMiddleware.stats`.
            devMiddleware: {
                publicPath,
                stats: "normal"
            },
            port: 8080
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
                        new CssMinimizerPlugin()
                    ]
        },
        ...configOverrides
    };
};
