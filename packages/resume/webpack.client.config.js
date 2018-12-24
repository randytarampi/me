const path = require("path");
const webpackBaseConfig = require("../../webpack.client.config.base");

const serve = require("koa-static");
const mount = require("koa-mount");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const packageJson = require("./package.json");
const {buildPugLocals} = require("@randy.tarampi/views");

module.exports = webpackBaseConfig({
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "dist"),
    webpackServeMiddleware: [
        mount("/api/resume", serve("./src/resumes"))
    ],
    entry: {
        resume: ["@babel/polyfill", "raf/polyfill", "jquery", "materialize-css", path.join(__dirname, "./src/public/views/index.jsx")],
        styles: path.join(__dirname, "./styles/style.scss")
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "node_modules/@randy.tarampi/views/templates/index.pug",
            templateParameters: buildPugLocals({
                bundleName: "resume",
                packageJson
            }),
            alwaysWriteToDisk: true
        })
    ]
});
