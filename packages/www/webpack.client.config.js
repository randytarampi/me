const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const webpackBaseConfig = require("../../webpack.client.config.base");
const serve = require("koa-static");
const mount = require("koa-mount");
const WorkboxPlugin = require("workbox-webpack-plugin");
const packageJson = require("./package");
const {DefinePlugin} = require("webpack");

const publicPath = `${config.get("www.assetUrl")}/`;

const bundleName = config.get("www.bundle.name");
const swBundleName = config.get("www.bundle.sw");
const swBundleInstallerName = config.get("www.bundle.swInstaller");

module.exports = webpackBaseConfig({
    publicPath: publicPath,
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "dist"),
    webpackServeMiddleware: [
        mount("/api/resume", serve(path.join(__dirname, "../resume/src/resumes"))),
        mount("/api/letter", serve(path.join(__dirname, "../letter/src/letters")))
    ],
    entry: {
        [bundleName]: ["@babel/polyfill", "raf/polyfill", path.join(__dirname, "src/public/views/index.jsx")],
        [swBundleInstallerName]: path.join(__dirname, "src/public/sw/installer.js"),
        styles: path.join(__dirname, "./styles/style.scss")
    },
    plugins: [
        new WorkboxPlugin.GenerateSW({
            swDest: `${swBundleName}.js`,
            skipWaiting: true,
            clientsClaim: true,
            offlineGoogleAnalytics: false,
            maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
            cacheId: packageJson.name,
            navigateFallback: "/",
            modifyUrlPrefix: {
                "/": `/${config.get("www.assetUrl")}/`
            },
            globDirectory: "dist/",
            globPatterns: [
                "signature.svg"
            ],
            manifestTransforms: [
                originalManifest => {
                    const manifest = originalManifest.map(entry => {
                        entry.url = `${config.get("www.assetUrl")}/${entry.url}`;
                        return entry;
                    });
                    return {manifest};
                }
            ],
            runtimeCaching: [
                {
                    urlPattern: /.*(?:flickr|instagram|tumblr|unsplash|gravatar)\.com|.*(shields)\.io|.*(crisp)\.chat/,
                    handler: "staleWhileRevalidate",
                    options: {
                        cacheName: "external",
                        expiration: {
                            maxEntries: 100,
                            purgeOnQuotaError: true
                        }
                    }
                }
            ]
        }),
        new DefinePlugin({
            __SW_BUNDLE_PATH__: JSON.stringify(path.join(publicPath, `${swBundleName}.js`))
        })
    ]
});
