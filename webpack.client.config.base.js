import {createRequire} from "module";
import {dirname, join} from "path";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import util from "./util.js";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
const __filename = import.meta.filename;
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
    new HtmlWebpackHarddiskPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin()
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
                      babelEnv = "client",
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
                    loader: "pug-loader"
                },
                {
                    test: /\.jsx?$/,
                    exclude: babelLoaderExclusions,
                    type: babelJsType,
                    // NOTE-RT: needed since `client.esm`'s Babel case (see `babel.config.js`) now
                    // preserves real `import`/`export` syntax instead of transpiling to CommonJS
                    // (required for `react-refresh-webpack-plugin`'s own real-ESM preamble to match
                    // the rest of the module). Once webpack sees genuine ESM syntax originating from
                    // a `"type": "module"` package, it enforces Node's strict "fully specified"
                    // import-specifier rule (an extension is mandatory, even for a bare
                    // `node_modules` subpath import like `lodash/isFunction`) - many existing
                    // relative/bare imports in this repo predate that rule. Disabling it here keeps
                    // resolution loose, matching the behaviour every other Babel env already had
                    // when Babel transpiled ESM to CommonJS `require()` calls (which never enforced
                    // this rule in the first place).
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
                                    // NOTE-RT: `sass-loader@17` only reads `loadPaths` (matching the modern
                                    // Dart Sass JS API) - the legacy `includePaths` name is silently ignored.
                                    // This was previously dead configuration, masked by `sass-loader`'s own
                                    // default webpack-resolver importer already resolving these bare
                                    // `node_modules` specifiers; renamed here for correctness/consistency with
                                    // the `gulpfile.base.js` `styles:dev` task's identical fix.
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
                    // NOTE-RT: previously `loader: "file-loader"` with `options: {name: "[name].[ext]"}`.
                    // `@fortawesome/fontawesome-free`'s own `regular.scss`/`solid.scss` partials (pulled in
                    // via `packages/css/styles/fonts.scss`) declare `@font-face src: url(...)` for these
                    // same font files, which `css-loader`/`mini-css-extract-plugin` resolve as a *module
                    // import* of this same source file, independent of any `file-loader`-produced module for
                    // the identical resource. Mixing a `file-loader`-based rule with that second resolution
                    // path caused webpack to additionally emit a second, corrupted copy of each affected font
                    // under a content-hash filename (e.g. `db5e5ccecfbcc73d03fa.woff2`) as an "auxiliary
                    // asset" of the `styles` chunk - its content was `file-loader`'s own generated JS wrapper
                    // source, not real font bytes, so the URL still 200'd but the browser couldn't parse it
                    // as a font. Using webpack5's native Asset Modules (`type: "asset/resource"`) instead -
                    // the mechanism `css-loader`'s own resolution already expects - makes both paths agree
                    // on a single, correctly-named/contented emitted asset per source file.
                    type: "asset/resource",
                    generator: {
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
                // NOTE-RT: `HtmlWebpackHarddiskPlugin`/`alwaysWriteToDisk: true` (see `plugins` above)
                // and `BundleAnalyzerPlugin` (see `webpack.publish.config.base.js`) both physically
                // write into this same directory on every compile. With the default `watch: true`,
                // webpack-dev-server treats those self-writes as a source change and triggers another
                // compile, ad infinitum - which also re-invokes `WorkboxPlugin.GenerateSW` every time
                // (hence its "called multiple times" warning) against ever-changing dev bundles.
                // Disabling `watch` here stops the self-triggering rebuild loop entirely.
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
                        new OptimizeCSSAssetsPlugin()
                    ]
        },
        ...configOverrides
    };
};
