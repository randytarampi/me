const path = require("path");
const webpackBaseConfig = require("../../webpack.client.config.base");
const serve = require("koa-static");
const mount = require("koa-mount");

module.exports = webpackBaseConfig({
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "dist"),
    webpackServeMiddleware: [
        mount("/api/resume", serve(path.join(__dirname, "../resume/resumes")))
    ],
    entry: {
        www: ["@babel/polyfill", path.join(__dirname, "./public/views/index.jsx")],
        styles: path.join(__dirname, "./styles/style.scss")
    }
});
