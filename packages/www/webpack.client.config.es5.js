const util = require("../../util");

const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const webpackBaseConfig = require("./webpack.client.config.base");
const WorkboxPlugin = require("workbox-webpack-plugin");
const packageJson = require("./package");
const {DefinePlugin} = require("webpack");

const publicPath = `${config.get("www.assetUrl")}/`;
const bundleName = config.get("www.bundle.name");
const swBundleName = config.get("www.bundle.sw");
const swBundleInstallerName = config.get("www.bundle.swInstaller");

const {
    isDevelopment
} = util;

const plugins = [];

if (!isDevelopment || process.env.BUNDLE_ANALYZER) {
    plugins.push(
        new BundleAnalyzerPlugin({
            reportFilename: "report.es5.html",
            analyzerMode: "static",
            openAnalyzer: false
        })
    );
}

module.exports = webpackBaseConfig({
    babelEnv: "client.es5",
    entry: {
        [bundleName]: ["raf/polyfill", "materialize-css", path.join(__dirname, "src/public/views/index.jsx")],
        [swBundleInstallerName]: ["raf/polyfill", "materialize-css", path.join(__dirname, "src/public/sw/installer.js")],
        styles: path.join(__dirname, "./styles/style.scss")
    },
    plugins: plugins.concat([
        new WorkboxPlugin.GenerateSW({
            swDest: `${swBundleName}.js`,
            offlineGoogleAnalytics: false,
            cacheId: packageJson.name,
            navigateFallback: "/index.html",
            runtimeCaching: [
                {
                    urlPattern: /.*(?:flickr|instagram|tumblr|unsplash|gravatar)\.com|.*(shields)\.io|.*(crisp)\.chat/,
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
        }),
        new DefinePlugin({
            __SW_BUNDLE_PATH__: JSON.stringify(path.join(publicPath, `${swBundleName}.js`))
        })
    ])
});
