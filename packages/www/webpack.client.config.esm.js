const util = require("../../util");

const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const webpackBaseConfig = require("./webpack.client.config.base");
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

module.exports = webpackBaseConfig({
    babelEnv: "client.esm",
    // babelJsType: "javascript/esm",
    rules: [],

    entry: {
        [bundleName]: ["raf/polyfill", "materialize-css", path.join(__dirname, "src/public/polyfills.esm.js"), path.join(__dirname, "src/public/views/index.jsx")],
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
                        cache: true,
                        parallel: true,
                        sourceMap: true
                    }),
                    new OptimizeCSSAssetsPlugin()
                ]
    },
    plugins: plugins.concat([
        new WorkboxPlugin.GenerateSW({
            swDest: `${swBundleName}.js`,
            skipWaiting: true,
            clientsClaim: true,
            offlineGoogleAnalytics: false,
            maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
            cacheId: packageJson.name,
            navigateFallback: "/",
            modifyUrlPrefix: {
                "/": `/${config.get("www.assetUrl")}/`
            },
            globDirectory: "dist/",
            globPatterns: [
                "signature.svg"
            ],
            manifestTransforms: [
                originalManifest => {
                    const manifest = originalManifest.map(entry => {
                        entry.url = `${config.get("www.assetUrl")}/${entry.url}`;
                        return entry;
                    });
                    return {manifest};
                }
            ],
            runtimeCaching: [
                {
                    urlPattern: /.*(?:flickr|instagram|tumblr|unsplash|gravatar)\.com|.*(shields)\.io|.*(crisp)\.chat/,
                    handler: "staleWhileRevalidate",
                    options: {
                        cacheName: "external",
                        expiration: {
                            maxEntries: 100,
                            purgeOnQuotaError: true
                        }
                    }
                }
            ]
        }),
        new DefinePlugin({
            __SW_BUNDLE_PATH__: JSON.stringify(path.join(publicPath, `${swBundleName}.js`))
        })
    ])
});
