import {createRequire} from "module";
import path from "path";
import {fileURLToPath} from "url";
import util from "../util.js";
import webpackBaseConfig from "./webpack.client.config.base.js";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../config");

const config = require("config");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const WorkboxPlugin = require("workbox-webpack-plugin");
const packageJson = require("./package");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const {DefinePlugin} = require("webpack");

const publicPath = `${config.get("www.assetUrl")}/`;
const bundleName = `${config.get("www.bundle.name")}.esm`;
const swBundleName = `${config.get("www.bundle.sw")}.esm`;
const swBundleInstallerName = `${config.get("www.bundle.swInstaller")}.esm`;

const {
    isDevelopment
} = util;

const plugins = [];

if (!isDevelopment || process.env.BUNDLE_ANALYZER) {
    plugins.push(
        new BundleAnalyzerPlugin({
            reportFilename: "report.esm.html",
            analyzerMode: "static",
            openAnalyzer: false
        })
    );
}

export default webpackBaseConfig({
    // NOTE-RT: every package's own `build:babel:esm` library-transpile script and this webpack
    // dev-server/build bundle now share the same "client.esm" env (both need real ESM
    // `modules: false` output) - see `babel.config.js`'s "client.esm" case for the full explanation.
    babelEnv: "client.esm",
    // babelJsType: "javascript/esm",
    rules: [],

    entry: {
        [bundleName]: ["raf/polyfill", "materialize-css", path.join(__dirname, "src/public/views/index.jsx")],
        [swBundleInstallerName]: ["raf/polyfill", "materialize-css", path.join(__dirname, "src/public/sw/installer.js")],
        styles: path.join(__dirname, "./styles/style.scss")
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: util.webpackVendorInclusions,
                    name: "vendor",
                    filename: "vendor.esm.js",
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
    plugins: plugins.concat([
        // NOTE-RT: precache-manifest generation has no value against unminified dev bundles (it
        // only matters for the real production build) and was the direct source of both the
        // "GenerateSW has been called multiple times" warning (re-triggered by every self-inflicted
        // dev-server recompile - see `devServer.static.watch: false` above) and the "won't be
        // precached" oversized-file warnings (dev bundles are never minified, see
        // `optimization.minimizer` above). Skip it entirely outside of production builds.
        ...(!isDevelopment
            ? [
                new WorkboxPlugin.GenerateSW({
                    swDest: `${swBundleName}.js`,
                    skipWaiting: true,
                    clientsClaim: true,
                    offlineGoogleAnalytics: false,
                    cacheId: packageJson.name,
                    runtimeCaching: [
                        {
                            urlPattern: /.*(?:flickr|tumblr|unsplash|gravatar)\.com|.*(shields)\.io|.*(crisp)\.chat/,
                            handler: "StaleWhileRevalidate",
                            options: {
                                cacheName: "external",
                                expiration: {
                                    maxEntries: 100,
                                    purgeOnQuotaError: true
                                }
                            }
                        }
                    ]
                })
            ]
            : []),
        new DefinePlugin({
            __SW_BUNDLE_PATH__: JSON.stringify(path.join(publicPath, `${swBundleName}.js`))
        })
    ])
});
