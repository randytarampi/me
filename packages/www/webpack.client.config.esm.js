const util = require("../../util");

const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const webpackBaseConfig = require("./webpack.client.config.base");
const WorkboxPlugin = require("workbox-webpack-plugin");
const packageJson = require("./package");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const {DefinePlugin} = require("webpack");

const publicPath = `${config.get("www.assetUrl")}/`;
const bundleName = config.get("www.bundle.name");
const swBundleName = config.get("www.bundle.sw");
const swBundleInstallerName = config.get("www.bundle.swInstaller");

const {
    isDevelopment
} = util;

module.exports = webpackBaseConfig({
    babelLoaderExclusions: /\/node_modules\/(?:react|react-dom)\//,
    babelEnv: "client.esm",

    entry: {
        [`${bundleName}.esm`]: ["@babel/polyfill", "raf/polyfill", path.join(__dirname, "src/public/views/index.jsx")]
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
    }
});
