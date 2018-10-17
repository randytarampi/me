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
  "/precache-manifest.d43fe8b0205d0f0540dfff3ab8f6eb67.js"
);

workbox.core.setCacheNameDetails({prefix: "@randy.tarampi/www"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "/404.html",
    "revision": "09765fb11b89c6dfd20cd171416ea63d"
  },
  {
    "url": "/android-chrome-144x144.png",
    "revision": "1c2615a71bfe9133a5a6193e2eff7b28"
  },
  {
    "url": "/android-chrome-192x192.png",
    "revision": "b1579eb66c9831c0fec95105374a0a5a"
  },
  {
    "url": "/android-chrome-256x256.png",
    "revision": "cf6c3d016c35628a3e7a85f3178df79d"
  },
  {
    "url": "/android-chrome-36x36.png",
    "revision": "560d9cfa845633db589743b00818b8b6"
  },
  {
    "url": "/android-chrome-384x384.png",
    "revision": "cb08f94be3171792fe5d2dd3316eac1f"
  },
  {
    "url": "/android-chrome-48x48.png",
    "revision": "82bb8d4cab3c24d1684000c98f456a79"
  },
  {
    "url": "/android-chrome-512x512.png",
    "revision": "ceedeac4c019365e9305e9d593119d61"
  },
  {
    "url": "/android-chrome-72x72.png",
    "revision": "f025e9f2971d2d40c175eb81d0e822f9"
  },
  {
    "url": "/android-chrome-96x96.png",
    "revision": "6aad26168af8a7c04976d476d6898434"
  },
  {
    "url": "/apple-touch-icon-114x114-precomposed.png",
    "revision": "8ec3b345dfda6cb6e5c325cec77dd631"
  },
  {
    "url": "/apple-touch-icon-114x114.png",
    "revision": "daecd7f891271a695125b60f8c4180b3"
  },
  {
    "url": "/apple-touch-icon-120x120-precomposed.png",
    "revision": "1f7ed27155a9911b25f354b5179f9269"
  },
  {
    "url": "/apple-touch-icon-120x120.png",
    "revision": "5c484077d51185f7441e7c67a70c7cd6"
  },
  {
    "url": "/apple-touch-icon-144x144-precomposed.png",
    "revision": "b3be4c0482badff68a54d15c629f04f7"
  },
  {
    "url": "/apple-touch-icon-144x144.png",
    "revision": "48da8745473a8f8d01f581666f4b31d2"
  },
  {
    "url": "/apple-touch-icon-152x152-precomposed.png",
    "revision": "458511fe5d1d34baef3c9c5aa12c6348"
  },
  {
    "url": "/apple-touch-icon-152x152.png",
    "revision": "c67201853ebab7d5e6937469f14cbd1d"
  },
  {
    "url": "/apple-touch-icon-180x180-precomposed.png",
    "revision": "bd237ffa548953d0e4d81384c6a9695b"
  },
  {
    "url": "/apple-touch-icon-180x180.png",
    "revision": "7a5bad260e23600140bf7d18208daade"
  },
  {
    "url": "/apple-touch-icon-57x57-precomposed.png",
    "revision": "43cc1ce815a5bf2f6c4371f71e481b38"
  },
  {
    "url": "/apple-touch-icon-57x57.png",
    "revision": "dceff7dabfd3b9302d7e9eacba7173d4"
  },
  {
    "url": "/apple-touch-icon-60x60-precomposed.png",
    "revision": "69f5d4b1e62b185534456a022767dfaa"
  },
  {
    "url": "/apple-touch-icon-60x60.png",
    "revision": "8ee1fa8ee9a71da3a972a16b89202eda"
  },
  {
    "url": "/apple-touch-icon-72x72-precomposed.png",
    "revision": "8fd85a01a62027360793cb541725f0cc"
  },
  {
    "url": "/apple-touch-icon-72x72.png",
    "revision": "e01b915bbbafe5ab1fcd789d02a1e920"
  },
  {
    "url": "/apple-touch-icon-76x76-precomposed.png",
    "revision": "79bf05e4da17206261f2c30c35c4692d"
  },
  {
    "url": "/apple-touch-icon-76x76.png",
    "revision": "a49b0b8de022af9d53bd975aa135ad1e"
  },
  {
    "url": "/apple-touch-icon-precomposed.png",
    "revision": "bd237ffa548953d0e4d81384c6a9695b"
  },
  {
    "url": "/apple-touch-icon.png",
    "revision": "7a5bad260e23600140bf7d18208daade"
  },
  {
    "url": "/blog.html",
    "revision": "ef5b9829df30972c1e0f2161e14b26cc"
  },
  {
    "url": "/fa-brands-400.eot",
    "revision": "f2594ef62455697f61dc99862c19afba"
  },
  {
    "url": "/fa-brands-400.svg",
    "revision": "c862e94cbef741d18838774587e3c49d"
  },
  {
    "url": "/fa-brands-400.ttf",
    "revision": "ab673bac3a9e36cb1d4e54777c413fe3"
  },
  {
    "url": "/fa-brands-400.woff",
    "revision": "9d56249d09070f656a1c52e566448f0d"
  },
  {
    "url": "/fa-brands-400.woff2",
    "revision": "921f1150167369cf4c400135a4905728"
  },
  {
    "url": "/fa-regular-400.eot",
    "revision": "491a96d8188670aff6f5e8ae4e29ed6a"
  },
  {
    "url": "/fa-regular-400.svg",
    "revision": "b5a61b229c9c92a6ac21f5b0e3c6e9f1"
  },
  {
    "url": "/fa-regular-400.ttf",
    "revision": "e6ff1c5d13b7786272782029310c3615"
  },
  {
    "url": "/fa-regular-400.woff",
    "revision": "4f8bb28722068f7b666582a39c7035b8"
  },
  {
    "url": "/fa-regular-400.woff2",
    "revision": "cf6008d396082c09c3dd4907de9f3941"
  },
  {
    "url": "/fa-solid-900.eot",
    "revision": "20b351a6af2d523589fd193785e7d7f0"
  },
  {
    "url": "/fa-solid-900.svg",
    "revision": "1d220cf9da36861171fa90d3c164f4d3"
  },
  {
    "url": "/fa-solid-900.ttf",
    "revision": "63726a69fa60cb67459140ccaf679f96"
  },
  {
    "url": "/fa-solid-900.woff",
    "revision": "997f6b1819184c54248de33c81b7bb0c"
  },
  {
    "url": "/fa-solid-900.woff2",
    "revision": "1dc5b6dd4bf409a6f919be38603f76a0"
  },
  {
    "url": "/favicon-16x16.png",
    "revision": "e7d643366d865dabdf83d42106255212"
  },
  {
    "url": "/favicon-194x194.png",
    "revision": "a79b42e7c53ad0377a55f00c3a556f45"
  },
  {
    "url": "/favicon-32x32.png",
    "revision": "d22a5189cf87d99f20c7a8aeba55bf2b"
  },
  {
    "url": "/favicon.ico",
    "revision": "ad5366ccf6677362e65d39b49c86ff16"
  },
  {
    "url": "/index.html",
    "revision": "09765fb11b89c6dfd20cd171416ea63d"
  },
  {
    "url": "/ipad_splash.png",
    "revision": "0d88078e3e9820406804902d6564b367"
  },
  {
    "url": "/ipadpro1_splash.png",
    "revision": "1251dc70b2b0abd898328960570c24b9"
  },
  {
    "url": "/ipadpro2_splash.png",
    "revision": "2f433a03b0df3977b4063a4cd2d3b313"
  },
  {
    "url": "/iphone5_splash.png",
    "revision": "cb952b523a034cb4c6af64079f602e8a"
  },
  {
    "url": "/iphone6_splash.png",
    "revision": "16be07a39bf843834ada319d7c4c4170"
  },
  {
    "url": "/iphoneplus_splash.png",
    "revision": "897865fe25cfd1e91cbf64e5603e4207"
  },
  {
    "url": "/iphonex_splash.png",
    "revision": "cd4ba4cb4d0c54dbb6714817517ea54d"
  },
  {
    "url": "/letter.html",
    "revision": "1ea778cddf04b40830471124d907007e"
  },
  {
    "url": "/mstile-144x144.png",
    "revision": "d70df4badef34ac1ba07b22ed186a866"
  },
  {
    "url": "/mstile-150x150.png",
    "revision": "24b8138d276cada90f6593a8c9ce1014"
  },
  {
    "url": "/mstile-310x150.png",
    "revision": "de99bc8366856afa0e63f0c267c2ce96"
  },
  {
    "url": "/mstile-310x310.png",
    "revision": "aaa633a4d1c1ec6512a32cd3fa53d452"
  },
  {
    "url": "/mstile-70x70.png",
    "revision": "a096be8aeed4e47cec35a89168baab17"
  },
  {
    "url": "/photos.html",
    "revision": "8483ea275734b8316534749aa1cc3958"
  },
  {
    "url": "/resume.html",
    "revision": "305b1915f25015f5e243a5baa13961fb"
  },
  {
    "url": "/Roboto-Bold.woff",
    "revision": "eed9aab5449cc9c8430d7d258108f602"
  },
  {
    "url": "/Roboto-Bold.woff2",
    "revision": "c0f1e4a4fdfb8048c72e86aadb2a247d"
  },
  {
    "url": "/Roboto-Light.woff",
    "revision": "ea36cd9a0e9eee97012a67b8a4570d7b"
  },
  {
    "url": "/Roboto-Light.woff2",
    "revision": "3c37aa69cd77e6a53a067170fa8fe2e9"
  },
  {
    "url": "/Roboto-Medium.woff",
    "revision": "cf4d60bc0b1d4b2314085919a00e1724"
  },
  {
    "url": "/Roboto-Medium.woff2",
    "revision": "1561b424aaef2f704bbd89155b3ce514"
  },
  {
    "url": "/Roboto-Regular.woff",
    "revision": "3cf6adf61054c328b1b0ddcd8f9ce24d"
  },
  {
    "url": "/Roboto-Regular.woff2",
    "revision": "5136cbe62a63604402f2fedb97f246f8"
  },
  {
    "url": "/Roboto-Thin.woff",
    "revision": "44b78f142603eb69f593ed4002ed7a4a"
  },
  {
    "url": "/Roboto-Thin.woff2",
    "revision": "1f35e6a11d27d2e10d28946d42332dc5"
  },
  {
    "url": "/safari-pinned-tab.svg",
    "revision": "09f4f61aaa02bbc421587878d70e47cb"
  },
  {
    "url": "/signature.svg",
    "revision": "41317dcbb1b860fcf88f240a0117f3d5"
  },
  {
    "url": "/words.html",
    "revision": "d3296554ab3c35b5bd1a74ebf5c427b9"
  },
  {
    "url": "/ʕつ•ᴥ•ʔつ-30-knockout.svg",
    "revision": "969f5047a7ce5071e0dbc696148694e0"
  },
  {
    "url": "/ʕつ•ᴥ•ʔつ-30.svg",
    "revision": "3f5e39054a5c6306aaee0c2e7091ce87"
  },
  {
    "url": "/ʕつ•ᴥ•ʔつ-45-knockout-black.svg",
    "revision": "5902c0148f278f7ddb4e2e0f7d6d2b80"
  },
  {
    "url": "/ʕつ•ᴥ•ʔつ-45-knockout.svg",
    "revision": "5902c0148f278f7ddb4e2e0f7d6d2b80"
  },
  {
    "url": "/ʕつ•ᴥ•ʔつ-45-white.svg",
    "revision": "5df003d162e35721c35042e36e55cf18"
  },
  {
    "url": "/ʕつ•ᴥ•ʔつ.svg",
    "revision": "8a14bd86204e93ed5ffd6b75f29b91da"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/");

workbox.routing.registerRoute(/.*(?:flickr|instagram|tumblr|unsplash|gravatar)\.com|.*(shields)\.io/, workbox.strategies.staleWhileRevalidate({ "cacheName":"external", plugins: [new workbox.expiration.Plugin({"maxEntries":100,"purgeOnQuotaError":true})] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/posts.randytarampi.ca\/posts/, workbox.strategies.staleWhileRevalidate({ "cacheName":"posts", plugins: [] }), 'GET');

workbox.googleAnalytics.initialize({});
