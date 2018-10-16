const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const webpackBaseConfig = require("../../webpack.client.config.base");
const serve = require("koa-static");
const mount = require("koa-mount");
const WorkboxPlugin = require("workbox-webpack-plugin");
const packageJson = require("./package");

module.exports = webpackBaseConfig({
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "dist"),
    webpackServeMiddleware: [
        mount("/api/resume", serve(path.join(__dirname, "../resume/src/resumes"))),
        mount("/api/letter", serve(path.join(__dirname, "../letter/src/letters")))
    ],
    entry: {
        www: ["@babel/polyfill", "raf/polyfill", path.join(__dirname, "./public/views/index.jsx")],
        styles: path.join(__dirname, "./styles/style.scss")
    },
    plugins: [
        new WorkboxPlugin.GenerateSW({
            swDest: "www.sw.js",
            skipWaiting: true,
            clientsClaim: true,
            offlineGoogleAnalytics: true,
            maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
            cacheId: packageJson.name,
            navigateFallback: "/",
            runtimeCaching: [
                {
                    urlPattern: /\.(?:png|jpg|jpeg|eot|ttf|woff|woff2|svg|gif|ico)$|.*(fonts\.googleapis|fonts\.gstatic|googletagmanager)\.com/,
                    handler: "staleWhileRevalidate",
                    options: {
                        cacheName: "assets"
                    }
                },
                {
                    urlPattern: /.*(?:flickr|instagram|tumblr|unsplash|gravatar)\.com|.*(shields)\.io/,
                    handler: "staleWhileRevalidate",
                    options: {
                        cacheName: "external",
                        expiration: {
                            maxEntries: 100,
                            purgeOnQuotaError: true
                        }
                    }
                },
                {
                    urlPattern: new RegExp("^" + config.get("posts.postsUrl")),
                    handler: "staleWhileRevalidate",
                    options: {
                        cacheName: "posts"
                    }
                }
            ]
        })
    ]
});
