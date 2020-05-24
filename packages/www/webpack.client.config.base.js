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
    path.resolve(require.resolve("materialize-css"), "../../fonts/roboto/*"),
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

const buildViewForPageUrl = (pageName, pageUrl = config.get("www.publishUrl")) => {
    const packageJson = require("./package.json");
    const {buildPugLocals} = require("@randy.tarampi/views");

    return new HtmlWebpackPlugin({
        filename: `${pageName}.html`,
        template: path.resolve(require.resolve("@randy.tarampi/views"), "../../templates/index.pug"),
        templateParameters: buildPugLocals({
            bundleName: config.get("www.bundle.name"),
            esmBundleName: `${config.get("www.bundle.name")}.esm`,
            serviceWorkerInstallerBundleName: config.get("www.bundle.swInstaller"),
            packageJson,
            pageUrl,
            injectedScript: [
                `<script>window.$crisp=[];window.CRISP_WEBSITE_ID="${config.get("crisp.app.id")}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>`
            ].join(""),
            injectedNoScript: [
                `<noscript>
                    <div class="error"><div class="row"><div class="col"><div id="error-dis-bear" class="bear bear--ʕಠᴥಠʔ"><span data-metrics-event-name="emoji-component" data-metrics-type="onClick" data-metrics-name="error-dis-bear__leftEar" data-metrics-label="ʕ" data-metrics-value="" class="error-dis-bear__leftEar bear__leftEar bear__leftEar--ʕಠᴥಠʔ">ʕ</span><span data-metrics-event-name="emoji-component" data-metrics-type="onClick" data-metrics-name="error-dis-bear__leftEye" data-metrics-label="ಠ" data-metrics-value="" class="error-dis-bear__leftEye bear__leftEye bear__leftEye--ʕಠᴥಠʔ">ಠ</span><span data-metrics-event-name="emoji-component" data-metrics-type="onClick" data-metrics-name="error-dis-bear__nose" data-metrics-label="ᴥ" data-metrics-value="" class="error-dis-bear__nose bear__nose bear__nose--ʕಠᴥಠʔ">ᴥ</span><span data-metrics-event-name="emoji-component" data-metrics-type="onClick" data-metrics-name="error-dis-bear__rightEye" data-metrics-label="ಠ" data-metrics-value="" class="error-dis-bear__rightEye bear__rightEye bear__rightEye--ʕಠᴥಠʔ">ಠ</span><span data-metrics-event-name="emoji-component" data-metrics-type="onClick" data-metrics-name="error-dis-bear__rightEar" data-metrics-label="ʔ" data-metrics-value="" class="error-dis-bear__rightEar bear__rightEar bear__rightEar--ʕಠᴥಠʔ">ʔ</span><div class="bear__children bear__children--ʕಠᴥಠʔ"><h2 class="error__message--header"><span class="text">Get with the times</span></h2><p class="error__message">You'll need to enable JavaScript to enjoy this page. <a target="_self" rel="noopener noreferrer" data-metrics-event-name="anchor" data-metrics-type="href" data-metrics-name="Shoot me a message" data-metrics-label="Shoot me a message" data-metrics-value="mailto:jobs@randytarampi.ca?subject=Hey%2C%20I%20browse%20with%20JavaScript%20disabled" subject="Hey, I browse with JavaScript disabled" email="jobs@randytarampi.ca" class="link link--email link--no-branding" href="mailto:jobs@randytarampi.ca?subject=Hey%2C%20I%20browse%20with%20JavaScript%20disabled" text="jobs@randytarampi.ca">Shoot me a message</a> if you're super keen or just <a target="__blank" rel="noopener noreferrer" data-metrics-event-name="anchor" data-metrics-type="href" data-metrics-name="download my resume" data-metrics-label="download my resume" data-metrics-value="https://github.com/randytarampi/me.resume/raw/master/a4.pdf?utm_campaign=&amp;utm_content=&amp;utm_medium=referral&amp;utm_source=&amp;utm_term=download%20my%20resume" text="download my resume" class="link link--campaign" href="https://github.com/randytarampi/me.resume/raw/master/a4.pdf?utm_campaign=&amp;utm_content=&amp;utm_medium=referral&amp;utm_source=&amp;utm_term=download%20my%20resume">download my resume</a>.</p></div></div></div></div></div>
                </noscript>`
            ]
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
    ["letter", `${config.get("www.publishUrl")}${config.get("www.letterUrl")}`],
    ["map", `${config.get("www.publishUrl")}${config.get("www.mapUrl")}`]
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
        .concat(new CopyWebpackPlugin({
            patterns: sources.map(source => ({
                from: source,
                flatten: true,
                context: source.match(/^node_modules/)
                    ? "../../"
                    : undefined
            }))
        }))
        .concat(views.map(([pageName, pageUrl]) => buildViewForPageUrl(pageName, pageUrl))),
    ...overrides
});
