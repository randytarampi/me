const path = require("path");
const webpackBaseConfig = require("../../webpack.client.config.base");

module.exports = webpackBaseConfig({
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "dist"),
    entry: {
        polyfill: "@babel/polyfill",
        jsx: [path.join(__dirname, "./test/build/views/index.jsx")]
    }
});
