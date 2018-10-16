/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");

importScripts(
  "/precache-manifest.38b6f95fc2fd9b34716167bd9935e6cd.js"
);

workbox.core.setCacheNameDetails({prefix: "@randy.tarampi/www"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/");

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|eot|ttf|woff|woff2|svg|gif|ico)$|.*(fonts\.googleapis|fonts\.gstatic|googletagmanager)\.com/, workbox.strategies.staleWhileRevalidate({ "cacheName":"assets", plugins: [] }), 'GET');
workbox.routing.registerRoute(/.*(?:flickr|instagram|tumblr|unsplash|gravatar)\.com|.*(shields)\.io/, workbox.strategies.staleWhileRevalidate({ "cacheName":"external", plugins: [new workbox.expiration.Plugin({"maxEntries":100,"purgeOnQuotaError":true})] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/posts.randytarampi.ca\/posts/, workbox.strategies.staleWhileRevalidate({ "cacheName":"posts", plugins: [] }), 'GET');

workbox.googleAnalytics.initialize({});
