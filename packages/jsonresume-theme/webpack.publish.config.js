const path = require("path");
const webpackBaseConfig = require("../../webpack.publish.config.base");
const {webpackNodeExternalsWhitelist} = require("../../util");
const nodeExternals = require("webpack-node-externals");

module.exports = webpackBaseConfig({
    babelEnv: "client.es5",
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "es5"),
    entry: {
        index: ["raf/polyfill", path.join(__dirname, "./src/index.js")]
    },
    node: false,
    target: "node",
    externals: [nodeExternals({
        whitelist: [
            /@randy\.tarampi\//,
            webpackNodeExternalsWhitelist
        ]
    }), "pug"]
});
