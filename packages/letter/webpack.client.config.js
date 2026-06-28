import {createRequire} from "module";
import path from "path";
import {fileURLToPath} from "url";
import webpackBaseConfig from "../../webpack.client.config.base.js";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const fs = require("fs");
const config = require("config");
const express = require("express");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {buildPugLocals} = require("@randy.tarampi/views");

const sources = [
    "*.md",
    path.resolve(require.resolve("@fortawesome/fontawesome-free"), "../../webfonts/*")
];
if (process.env.NODE_ENV && fs.existsSync(path.resolve(require.resolve("@randy.tarampi/assets"), "../assets/web", process.env.NODE_ENV, "*"))) {
    const environmentAssetsPath = path.resolve(require.resolve("@randy.tarampi/assets"), "../assets/web", process.env.NODE_ENV, "*");

    if (fs.existsSync(environmentAssetsPath)) {
        sources.push(environmentAssetsPath);
    }
} else {
    sources.push(path.resolve(require.resolve("@randy.tarampi/assets"), "../../assets/web/*"));
}

export default webpackBaseConfig({
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "dist"),
    webpackDevServerMiddleware: [
        (app) => app.use("/api/letter", express.static("./src/letters")),
    ],
    entry: {
        letter: ["raf/polyfill", "materialize-css", path.join(__dirname, "./src/public/views/index.jsx")],
        styles: path.join(__dirname, "./styles/style.scss")
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: sources.map(source => ({
                from: source,
                to: "[name].[ext]",
                context: source.match(/^node_modules/)
                    ? "../../"
                    : undefined
            }))
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(path.dirname(require.resolve("@randy.tarampi/views/package.json")), "templates/index.pug"),
            templateParameters: buildPugLocals({
                bundleName: config.get("letter.bundle.name")
            }),
            alwaysWriteToDisk: true,
            excludeChunks: [
                "styles",
                config.get("letter.bundle.name"),
                `${config.get("letter.bundle.swInstaller")}`,
                "vendor.esm",
                `${config.get("letter.bundle.name")}.esm`,
                `${config.get("letter.bundle.swInstaller")}.esm`
            ]
        })
    ]
});
