const path = require("path");
const webpackBaseConfig = require("../../webpack.publish.config.base");

module.exports = webpackBaseConfig({
    babelEnv: "client.es5",
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "es5"),
    entry: {
        index: ["@babel/polyfill", "raf/polyfill", path.join(__dirname, "./src/index.js")]
    },
    node: false,
    target: "node"
});
