const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const fs = require("fs");
const config = require("config");
const serve = require("koa-static");
const mount = require("koa-mount");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackBaseConfig = require("../../webpack.client.config.base");

const publicPath = `${config.get("www.assetUrl")}/`;

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

const buildViewForPageUrl = (pageName, pageUrl = config.get("www.publishUrl")) => {
    const packageJson = require("./package.json");
    const {buildPugLocals} = require("@randy.tarampi/views");

    return new HtmlWebpackPlugin({
        filename: `${pageName}.html`,
        template: "node_modules/@randy.tarampi/views/templates/index.pug",
        templateParameters: buildPugLocals({
            bundleName: config.get("www.bundle.name"),
            // esmBundleName: `${config.get("www.bundle.name")}.esm`, // NOTE-RT: Not quite ready for primetime yet.
            serviceWorkerInstallerBundleName: config.get("www.bundle.swInstaller"),
            packageJson,
            pageUrl,
            injectedScript: [
                `<script>window.$crisp=[];window.CRISP_WEBSITE_ID="${config.get("crisp.app.id")}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>`
            ].join("")
        }),
        alwaysWriteToDisk: true,
        excludeChunks: [
            "styles",
            "vendor",
            config.get("www.bundle.name"),
            `${config.get("www.bundle.swInstaller")}`,
            "vendor.esm",
            `${config.get("www.bundle.name")}.esm`,
            `${config.get("www.bundle.swInstaller")}.esm`
        ]
    });
};
const views = [
    ["index"],
    ["404"],
    ["blog", `${config.get("www.publishUrl")}${config.get("www.postsUrl")}`],
    ["photos", `${config.get("www.publishUrl")}${config.get("www.photosUrl")}`],
    ["words", `${config.get("www.publishUrl")}${config.get("www.wordsUrl")}`],
    ["resume", `${config.get("www.publishUrl")}${config.get("www.resumeUrl")}`],
    ["letter", `${config.get("www.publishUrl")}${config.get("www.letterUrl")}`]
];

module.exports = ({plugins, ...overrides}) => webpackBaseConfig({
    publicPath: publicPath,
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "dist"),
    webpackServeMiddleware: [
        mount("/api/resume", serve(path.join(__dirname, "../resume/src/resumes"))),
        mount("/api/letter", serve(path.join(__dirname, "../letter/src/letters")))
    ],
    plugins: plugins
        .concat(new CopyWebpackPlugin(sources.map(source => {
            return {from: source, flatten: true};
        })))
        .concat(views.map(([pageName, pageUrl]) => buildViewForPageUrl(pageName, pageUrl))),
    ...overrides
});
