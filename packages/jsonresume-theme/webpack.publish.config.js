const path = require("path");
const webpackBaseConfig = require("../../webpack.publish.config.base");

module.exports = webpackBaseConfig({
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "build"),
    entry: {
        index: ["@babel/polyfill", path.join(__dirname, "./src/index.js")]
    },
    node: false,
    target: "node"
});
