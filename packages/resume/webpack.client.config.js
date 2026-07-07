import {createRequire} from "module";
import path from "path";
import util from "../../util.js";
import webpackBaseConfig from "../../webpack.client.config.base.js";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const fs = require("fs");
const config = require("config");
const express = require("express");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const {buildPugLocals} = require("@randy.tarampi/views");

const {isDevelopment} = util;

// NOTE-RT: the web build is ESM-only (see `babel.config.js`'s "client.esm.webpack" case); this
// bundle name mirrors `packages/www/webpack.client.config.esm.js`'s own `.esm`-suffixed entry so
// `packages/views/templates/layout.pug`'s (now unconditional) `type="module"` script tags find
// the actual emitted files.
const bundleName = `${config.get("resume.bundle.name")}.esm`;

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
    babelEnv: "client.esm.webpack",
    webpackDevServerMiddleware: [
        (app) => app.use("/api/resume", express.static("./src/resumes")),
    ],
    entry: {
        [bundleName]: ["raf/polyfill", "materialize-css", path.join(__dirname, "./src/public/views/index.jsx")],
        styles: path.join(__dirname, "./styles/style.scss")
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: util.webpackVendorInclusions,
                    name: "vendor",
                    filename: "vendor.esm.js",
                    chunks: "all"
                }
            }
        },
        minimizer:
            isDevelopment
                ? []
                : [
                    new TerserPlugin({
                        parallel: true,
                        terserOptions: {
                            sourceMap: true
                        }
                    }),
                    new OptimizeCSSAssetsPlugin()
                ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: sources.map(source => ({
                from: source,
                to: "[name][ext]",
                context: source.match(/^node_modules/)
                    ? "../../"
                    : undefined
            }))
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(path.dirname(require.resolve("@randy.tarampi/views/package.json")), "templates/index.pug"),
            templateParameters: buildPugLocals({
                bundleName: config.get("resume.bundle.name"),
                esmBundleName: bundleName
            }),
            alwaysWriteToDisk: true,
            excludeChunks: [
                "styles",
                config.get("resume.bundle.name"),
                `${config.get("resume.bundle.swInstaller")}`,
                "vendor.esm",
                bundleName,
                `${config.get("resume.bundle.swInstaller")}.esm`
            ]
        })
    ]
});
