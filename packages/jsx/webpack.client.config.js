const path = require("path");
const webpackBaseConfig = require("../../webpack.client.config.base");

module.exports = webpackBaseConfig({
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "dist"),
    entry: {
        jsx: ["@babel/polyfill", "raf/polyfill", path.join(__dirname, "./test/build/views/index.jsx")]
    }
});
