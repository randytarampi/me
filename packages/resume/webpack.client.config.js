const path = require("path");
const webpackBaseConfig = require("../../webpack.client.config.base");

module.exports = webpackBaseConfig({
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "dist"),
    entry: {
        resume: ["@babel/polyfill", path.join(__dirname, "./public/views/index.jsx")],
        styles: path.join(__dirname, "./styles/style.scss")
    }
});
