const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const webpackBaseConfig = require("../../webpack.client.config.base");
const serve = require("koa-static");
const mount = require("koa-mount");

const publicPath = `${config.get("www.assetUrl")}/`;

module.exports = overrides => webpackBaseConfig({
    publicPath: publicPath,
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "dist"),
    webpackServeMiddleware: [
        mount("/api/resume", serve(path.join(__dirname, "../resume/src/resumes"))),
        mount("/api/letter", serve(path.join(__dirname, "../letter/src/letters")))
    ],
    ...overrides
});
