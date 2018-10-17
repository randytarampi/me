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
  "/precache-manifest.82e10e14231c26cfdab6bdf4cae4b94a.js"
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
    "revision": "0c4c92e80df77ed6ab56a6700d395ecd"
  },
  {
    "url": "/android-chrome-144x144.png",
    "revision": "01b8b85593f788bd2ce1fae0175cf6c5"
  },
  {
    "url": "/android-chrome-192x192.png",
    "revision": "5f091d78751565bc05383f3f525322d4"
  },
  {
    "url": "/android-chrome-256x256.png",
    "revision": "e651d83e654f08fe68f4971ee97a8862"
  },
  {
    "url": "/android-chrome-36x36.png",
    "revision": "37a2399f3a8b31e985a201e3bd425ce6"
  },
  {
    "url": "/android-chrome-384x384.png",
    "revision": "3d13dd1d0cb65d2bb23e85d2b67135b0"
  },
  {
    "url": "/android-chrome-48x48.png",
    "revision": "b496348ed3a940856c0f7ffd06730a78"
  },
  {
    "url": "/android-chrome-512x512.png",
    "revision": "758ab9bdebeb3303a0d540f5cdaa1951"
  },
  {
    "url": "/android-chrome-72x72.png",
    "revision": "9573f7f8ebea917c01e8b0c3513b2ce3"
  },
  {
    "url": "/android-chrome-96x96.png",
    "revision": "3625465b32704e032f829e1415f7ef03"
  },
  {
    "url": "/apple-touch-icon-114x114-precomposed.png",
    "revision": "10a7b4058983d290457b2d36d3279a91"
  },
  {
    "url": "/apple-touch-icon-114x114.png",
    "revision": "6b405ace2f952098d8bc0e2af5558963"
  },
  {
    "url": "/apple-touch-icon-120x120-precomposed.png",
    "revision": "abef0f8a637037d962bd1ebacf158672"
  },
  {
    "url": "/apple-touch-icon-120x120.png",
    "revision": "672702a38f92d47a14cd348a238661f4"
  },
  {
    "url": "/apple-touch-icon-144x144-precomposed.png",
    "revision": "316b890c79bb1d71c0679effed86252f"
  },
  {
    "url": "/apple-touch-icon-144x144.png",
    "revision": "4ddce02f47346d0660da9a32261578a3"
  },
  {
    "url": "/apple-touch-icon-152x152-precomposed.png",
    "revision": "0d4f6c7dffb088f939fe1d15389dca36"
  },
  {
    "url": "/apple-touch-icon-152x152.png",
    "revision": "de50f516c73f14d8935d3572846672c8"
  },
  {
    "url": "/apple-touch-icon-180x180-precomposed.png",
    "revision": "a7e0f203aa5992d7afd69b96c4d60b7f"
  },
  {
    "url": "/apple-touch-icon-180x180.png",
    "revision": "0a64aff7e67085b6b7b1bfbdd3ab5dde"
  },
  {
    "url": "/apple-touch-icon-57x57-precomposed.png",
    "revision": "ca6446bd6f2be9c3281dba511481acb3"
  },
  {
    "url": "/apple-touch-icon-57x57.png",
    "revision": "7021e9d3e6cc15f4a0eee7aabb7398ed"
  },
  {
    "url": "/apple-touch-icon-60x60-precomposed.png",
    "revision": "58450ea730f1b4fe98a200a17d99b5a3"
  },
  {
    "url": "/apple-touch-icon-60x60.png",
    "revision": "091e605aea5fe83e055b7892d49e6141"
  },
  {
    "url": "/apple-touch-icon-72x72-precomposed.png",
    "revision": "07f1fa49d5798f1a5deb3f4e33bc2406"
  },
  {
    "url": "/apple-touch-icon-72x72.png",
    "revision": "b77625a64d809567fac81d1f6bf5de68"
  },
  {
    "url": "/apple-touch-icon-76x76-precomposed.png",
    "revision": "dbcffa25bb9c9ce546c8c36b3c58a66d"
  },
  {
    "url": "/apple-touch-icon-76x76.png",
    "revision": "efff3aefac78a65aa63ecaa7fd5bc488"
  },
  {
    "url": "/apple-touch-icon-precomposed.png",
    "revision": "b4e812f1f78b9a4addf86145557dd92c"
  },
  {
    "url": "/apple-touch-icon.png",
    "revision": "0a64aff7e67085b6b7b1bfbdd3ab5dde"
  },
  {
    "url": "/blog.html",
    "revision": "fe1c6f1cbba1d7ce1bf036e064241725"
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
    "revision": "717a413a448921310dd5b9de278a1851"
  },
  {
    "url": "/favicon-194x194.png",
    "revision": "98bb27de96f08cfc93fa8710d6dbd44e"
  },
  {
    "url": "/favicon-32x32.png",
    "revision": "1846bc0a4fb7b384cf26d7b214f8a3d0"
  },
  {
    "url": "/favicon.ico",
    "revision": "7402f3409515307eb033da8a44e0c64b"
  },
  {
    "url": "/index.html",
    "revision": "0c4c92e80df77ed6ab56a6700d395ecd"
  },
  {
    "url": "/ipad_splash.png",
    "revision": "911437b1cffb5136afcab52ef9ab9f76"
  },
  {
    "url": "/ipadpro1_splash.png",
    "revision": "b7aa309efcde8a6c91dc7352e8c9ddda"
  },
  {
    "url": "/ipadpro2_splash.png",
    "revision": "08baf1771baa1c226417df98c2c983e6"
  },
  {
    "url": "/iphone5_splash.png",
    "revision": "e326927b5f07588e5cb23c20bcd1e2d3"
  },
  {
    "url": "/iphone6_splash.png",
    "revision": "dd5bb7e0040bb851431856016c516bb4"
  },
  {
    "url": "/iphoneplus_splash.png",
    "revision": "35bf85964576e1f8629f79944a906593"
  },
  {
    "url": "/iphonex_splash.png",
    "revision": "7765b89d44a6dc246eef16cb40726332"
  },
  {
    "url": "/letter.html",
    "revision": "c0dbd69525514e7e22e67b37b0d63122"
  },
  {
    "url": "/mstile-144x144.png",
    "revision": "e28c1a4ee62b93224f99ad85d464985a"
  },
  {
    "url": "/mstile-150x150.png",
    "revision": "38366ed39dc776e26059f0eb867c4dd7"
  },
  {
    "url": "/mstile-310x150.png",
    "revision": "961e8df48c96d54efe701c8d0f98fa52"
  },
  {
    "url": "/mstile-310x310.png",
    "revision": "50e531e2838ff4b889138ccd826515c8"
  },
  {
    "url": "/mstile-70x70.png",
    "revision": "714976f7105f5a312e95f0b07c84fae8"
  },
  {
    "url": "/photos.html",
    "revision": "f6c6dd0c74472fde8179b62e560c889c"
  },
  {
    "url": "/resume.html",
    "revision": "a9d47f17d474cf952048200fcd4a1a6b"
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
    "revision": "d67bd3ef5427e6edcb51c56dc354817d"
  },
  {
    "url": "/signature.svg",
    "revision": "41317dcbb1b860fcf88f240a0117f3d5"
  },
  {
    "url": "/words.html",
    "revision": "7398e9c2c3c1d5084c44fa706f14f2d8"
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
    "url": "/ʕつ•ᴥ•ʔつ-square-knockout.svg",
    "revision": "43abb66ade6c0e58740dcbeb0c02a5e7"
  },
  {
    "url": "/ʕつ•ᴥ•ʔつ-square.svg",
    "revision": "f4e4c6f94f37684e75ff62e0e0b9fa18"
  },
  {
    "url": "/ʕつ•ᴥ•ʔつ.svg",
    "revision": "8a14bd86204e93ed5ffd6b75f29b91da"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/");

workbox.routing.registerRoute(/.*(?:flickr|instagram|tumblr|unsplash|gravatar)\.com|.*(shields)\.io|.*(crisp)\.chat/, workbox.strategies.staleWhileRevalidate({ "cacheName":"external", plugins: [new workbox.expiration.Plugin({"maxEntries":100,"purgeOnQuotaError":true})] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/posts.randytarampi.ca\/posts/, workbox.strategies.staleWhileRevalidate({ "cacheName":"posts", plugins: [] }), 'GET');

workbox.googleAnalytics.initialize({});
