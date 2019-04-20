const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const fs = require("fs");
const config = require("config");
const serve = require("koa-static");
const mount = require("koa-mount");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {buildPugLocals} = require("@randy.tarampi/views");
const webpackBaseConfig = require("../../webpack.client.config.base");

const sources = [
    "*.md",
    "node_modules/@randy.tarampi/css/node_modules/materialize-css/dist/fonts/roboto/**",
    "node_modules/@randy.tarampi/css/node_modules/@fortawesome/fontawesome-free/webfonts/**"
];
if (process.env.NODE_ENV && fs.existsSync(`node_modules/@randy.tarampi/assets/web/${process.env.NODE_ENV}`)) {
    sources.push(`node_modules/@randy.tarampi/assets/web/${process.env.NODE_ENV}/*`);
} else {
    sources.push("node_modules/@randy.tarampi/assets/web/*");
}

module.exports = webpackBaseConfig({
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "dist"),
    webpackServeMiddleware: [
        mount("/api/letter", serve("./src/letters"))
    ],
    entry: {
        letter: ["raf/polyfill", "materialize-css", path.join(__dirname, "./src/public/views/index.jsx")],
        styles: path.join(__dirname, "./styles/style.scss")
    },
    plugins: [
        new CopyWebpackPlugin(sources.map(source => {
            return {from: source, flatten: true};
        })),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "node_modules/@randy.tarampi/views/templates/index.pug",
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
