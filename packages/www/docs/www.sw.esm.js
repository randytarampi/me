/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./www.sw.esm.js",['./workbox-46c88108'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  workbox.setCacheNameDetails({
    prefix: "@randy.tarampi/www"
  });
  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "/CHANGELOG.md",
    "revision": "6f1e22337c535996396377d4277d0fa7"
  }, {
    "url": "/README.md",
    "revision": "a9450dcc3b643316938526a8d84d94af"
  }, {
    "url": "/android-chrome-144x144.png",
    "revision": "8012a431dfbff61eddf6adbb4ec6a862"
  }, {
    "url": "/android-chrome-192x192.png",
    "revision": "3f8c92ac02f8f2b3084fa0a7779d53c8"
  }, {
    "url": "/android-chrome-256x256.png",
    "revision": "943fc65cad22e5ac330435796d6f9dde"
  }, {
    "url": "/android-chrome-36x36.png",
    "revision": "1fc91ed51fea8f70c7cdd99a1c16c468"
  }, {
    "url": "/android-chrome-384x384.png",
    "revision": "66e72e8143f83c45fca826caefad99b6"
  }, {
    "url": "/android-chrome-48x48.png",
    "revision": "8781abfc4f28ea20acf53f7d9af7a468"
  }, {
    "url": "/android-chrome-512x512.png",
    "revision": "ee7d9a9a7b6b94b8e45d0385b3a77ad1"
  }, {
    "url": "/android-chrome-72x72.png",
    "revision": "59eeac0c3ba35721d1ae1354cb1ca195"
  }, {
    "url": "/android-chrome-96x96.png",
    "revision": "bd3dc313c4b00e5f24bf24f853d8d205"
  }, {
    "url": "/apple-touch-icon-114x114-precomposed.png",
    "revision": "dba3d2de2aeb01601d76a8144397d090"
  }, {
    "url": "/apple-touch-icon-114x114.png",
    "revision": "9c28fe9dd473fdae614661177020dd0d"
  }, {
    "url": "/apple-touch-icon-120x120-precomposed.png",
    "revision": "c302672967aeca4a97f6c2f28f782258"
  }, {
    "url": "/apple-touch-icon-120x120.png",
    "revision": "ac88c0377ec2743d834b2ed8f84334da"
  }, {
    "url": "/apple-touch-icon-144x144-precomposed.png",
    "revision": "0554ecfcfd609575b74c1299d36abe80"
  }, {
    "url": "/apple-touch-icon-144x144.png",
    "revision": "7498fa70f2731ac7122257be0df047a8"
  }, {
    "url": "/apple-touch-icon-152x152-precomposed.png",
    "revision": "d3be2a20482af8b0e29ef956f4c8189b"
  }, {
    "url": "/apple-touch-icon-152x152.png",
    "revision": "8b685dda7e70be8a7b70016a66b31f8c"
  }, {
    "url": "/apple-touch-icon-180x180-precomposed.png",
    "revision": "23cecbdd4890a605dde90cb143e4521e"
  }, {
    "url": "/apple-touch-icon-180x180.png",
    "revision": "782c5ff97a5057645955e931f983bdab"
  }, {
    "url": "/apple-touch-icon-57x57-precomposed.png",
    "revision": "69ac82ad66860df028754735ed4de794"
  }, {
    "url": "/apple-touch-icon-57x57.png",
    "revision": "3a80c23d600439db14cd82572e55b0fe"
  }, {
    "url": "/apple-touch-icon-60x60-precomposed.png",
    "revision": "58e7a31c16dbd89fa5d06c3f8f07f803"
  }, {
    "url": "/apple-touch-icon-60x60.png",
    "revision": "c9315ba4d20ba3be852ec414d33b70f1"
  }, {
    "url": "/apple-touch-icon-72x72-precomposed.png",
    "revision": "6899076f762b1119ab613acd53b42e8c"
  }, {
    "url": "/apple-touch-icon-72x72.png",
    "revision": "9a2010082ef3774e97f0469a15f9ec18"
  }, {
    "url": "/apple-touch-icon-76x76-precomposed.png",
    "revision": "b0b9868b6f3be0fe0c7e70ae8972d46c"
  }, {
    "url": "/apple-touch-icon-76x76.png",
    "revision": "c06b3783090f8fa6b13efb96d1fdf826"
  }, {
    "url": "/apple-touch-icon-precomposed.png",
    "revision": "23cecbdd4890a605dde90cb143e4521e"
  }, {
    "url": "/apple-touch-icon.png",
    "revision": "782c5ff97a5057645955e931f983bdab"
  }, {
    "url": "/browserconfig.xml",
    "revision": "e43b4aa7ff024e5dffcec725b36e0703"
  }, {
    "url": "/dist/fa-brands-400.eot",
    "revision": "e2ca6541bff3a3e9f4799ee327b28c58"
  }, {
    "url": "/dist/fa-brands-400.svg",
    "revision": "2f12242375edd68e9013ecfb59c672e9"
  }, {
    "url": "/dist/fa-brands-400.ttf",
    "revision": "8300bd7f30e0a313c1d772b49d96cb8e"
  }, {
    "url": "/dist/fa-brands-400.woff",
    "revision": "ad527cc5ec23d6da66e8a1d6772ea6d3"
  }, {
    "url": "/dist/fa-brands-400.woff2",
    "revision": "f075c50f89795e4cdb4d45b51f1a6800"
  }, {
    "url": "/dist/fa-regular-400.eot",
    "revision": "b01516c1808be557667befec76cd6318"
  }, {
    "url": "/dist/fa-regular-400.svg",
    "revision": "3602b7e8b2cb1462b0bef9738757ef8a"
  }, {
    "url": "/dist/fa-regular-400.ttf",
    "revision": "49f00693b0e5d45097832ef5ea1bc541"
  }, {
    "url": "/dist/fa-regular-400.woff",
    "revision": "3c6879c4f342203d099bdd66dce6d396"
  }, {
    "url": "/dist/fa-regular-400.woff2",
    "revision": "4a74738e7728e93c4394b8604081da62"
  }, {
    "url": "/dist/fa-solid-900.eot",
    "revision": "8ac3167427b1d5d2967646bd8f7a0587"
  }, {
    "url": "/dist/fa-solid-900.svg",
    "revision": "664de3932dd6291b4b8a8c0ddbcb4c61"
  }, {
    "url": "/dist/fa-solid-900.ttf",
    "revision": "205f07b3883c484f27f40d21a92950d4"
  }, {
    "url": "/dist/fa-solid-900.woff",
    "revision": "4451e1d86df7491dd874f2c41eee1053"
  }, {
    "url": "/dist/fa-solid-900.woff2",
    "revision": "8e1ed89b6ccb8ce41faf5cb672677105"
  }, {
    "url": "/fa-brands-400.eot",
    "revision": "e2ca6541bff3a3e9f4799ee327b28c58"
  }, {
    "url": "/fa-brands-400.svg",
    "revision": "2f12242375edd68e9013ecfb59c672e9"
  }, {
    "url": "/fa-brands-400.ttf",
    "revision": "8300bd7f30e0a313c1d772b49d96cb8e"
  }, {
    "url": "/fa-brands-400.woff",
    "revision": "ad527cc5ec23d6da66e8a1d6772ea6d3"
  }, {
    "url": "/fa-brands-400.woff2",
    "revision": "f075c50f89795e4cdb4d45b51f1a6800"
  }, {
    "url": "/fa-regular-400.eot",
    "revision": "b01516c1808be557667befec76cd6318"
  }, {
    "url": "/fa-regular-400.svg",
    "revision": "3602b7e8b2cb1462b0bef9738757ef8a"
  }, {
    "url": "/fa-regular-400.ttf",
    "revision": "49f00693b0e5d45097832ef5ea1bc541"
  }, {
    "url": "/fa-regular-400.woff",
    "revision": "3c6879c4f342203d099bdd66dce6d396"
  }, {
    "url": "/fa-regular-400.woff2",
    "revision": "4a74738e7728e93c4394b8604081da62"
  }, {
    "url": "/fa-solid-900.eot",
    "revision": "8ac3167427b1d5d2967646bd8f7a0587"
  }, {
    "url": "/fa-solid-900.svg",
    "revision": "664de3932dd6291b4b8a8c0ddbcb4c61"
  }, {
    "url": "/fa-solid-900.ttf",
    "revision": "205f07b3883c484f27f40d21a92950d4"
  }, {
    "url": "/fa-solid-900.woff",
    "revision": "4451e1d86df7491dd874f2c41eee1053"
  }, {
    "url": "/fa-solid-900.woff2",
    "revision": "8e1ed89b6ccb8ce41faf5cb672677105"
  }, {
    "url": "/favicon-16x16.png",
    "revision": "c2b34f7c6bc6bf8400f5f3677d28edc9"
  }, {
    "url": "/favicon-194x194.png",
    "revision": "f86e14b8862822648a9b0e316ac67716"
  }, {
    "url": "/favicon-32x32.png",
    "revision": "07a9ee9bc3b688d67eb38e466e04b2c1"
  }, {
    "url": "/favicon.ico",
    "revision": "b22ef66e6c3634238d14bba613e47b34"
  }, {
    "url": "/ipad_splash-landscape.png",
    "revision": "5364723066954a9b9e29eefd29445210"
  }, {
    "url": "/ipad_splash.png",
    "revision": "9a93a57cf8490f1e9d58f5ef3a54170c"
  }, {
    "url": "/ipadpro1_splash-landscape.png",
    "revision": "4f9748f437a514bb5fa457a553a2a67d"
  }, {
    "url": "/ipadpro1_splash.png",
    "revision": "373a5af7e00ef4e4722c575b3ffce02c"
  }, {
    "url": "/ipadpro2_splash-landscape.png",
    "revision": "cec283c2184d587462874a2a558fccb0"
  }, {
    "url": "/ipadpro2_splash.png",
    "revision": "4e7765c4a87b0ca8816b74fb421efbde"
  }, {
    "url": "/iphone5_splash-landscape.png",
    "revision": "ca68e5b8826983ded92cbf42c5e0d501"
  }, {
    "url": "/iphone5_splash.png",
    "revision": "7a2564f020009a96c1b5e85a68fdb851"
  }, {
    "url": "/iphone6_splash-landscape.png",
    "revision": "e7de3db2a11c5ca3cac8987a8e1dcf6c"
  }, {
    "url": "/iphone6_splash.png",
    "revision": "27b2274eda7f1b15dceec38792bef5ce"
  }, {
    "url": "/iphoneplus_splash-landscape.png",
    "revision": "3ffe992b886e7613980f75a491439ef1"
  }, {
    "url": "/iphoneplus_splash.png",
    "revision": "05147f69f91c7681ac8e7cd896d69649"
  }, {
    "url": "/iphonex_splash-landscape.png",
    "revision": "0408349cb85fdc9bbc2ae289a8831406"
  }, {
    "url": "/iphonex_splash.png",
    "revision": "2e8c4487a09b5125b9410ab1ff6c619a"
  }, {
    "url": "/manifest.json",
    "revision": "6c60aacb82585d7cd304d2f3cfa8d8f5"
  }, {
    "url": "/mstile-144x144.png",
    "revision": "e2d363054f15eba9ee4c24a67b313c17"
  }, {
    "url": "/mstile-150x150.png",
    "revision": "9f497311cc6bb165e00b1eac83764a19"
  }, {
    "url": "/mstile-310x150.png",
    "revision": "07f95c0f3d0b3cef0abf77dd716dbbf0"
  }, {
    "url": "/mstile-310x310.png",
    "revision": "94baccbe0be40a4368a2a2d52d50f940"
  }, {
    "url": "/mstile-70x70.png",
    "revision": "d861bf166b57b68e529f6c92c31524b2"
  }, {
    "url": "/safari-pinned-tab.svg",
    "revision": "a65e6a5595231726e365c618da0fbf8c"
  }, {
    "url": "/signature.svg",
    "revision": "41317dcbb1b860fcf88f240a0117f3d5"
  }, {
    "url": "/styles.css",
    "revision": "784634fc9d16386032741bf34e2dd7b3"
  }, {
    "url": "/styles.js",
    "revision": "a24c70d9fdcdf48f91df540076c0f28e"
  }, {
    "url": "/www.sw.installer.esm.js",
    "revision": "d23b6f0d0fe035ecf0ab2326c572c816"
  }, {
    "url": "/ʕつ•ᴥ•ʔつ-square-knockout-black.png",
    "revision": "ae9aa18ba3c0e31fbe133c7ac60b33b3"
  }, {
    "url": "/ʕつ•ᴥ•ʔつ-square-knockout-orange.png",
    "revision": "5cf48d734a98973a22e67a4ec68d5d12"
  }, {
    "url": "/ʕつ•ᴥ•ʔつ-square-solid.png",
    "revision": "c8a25e2e13cf4b445d7a61addc26a0fd"
  }, {
    "url": "/ʕつ•ᴥ•ʔつ.svg",
    "revision": "ea1067fc26b93a6bef6223778fe00271"
  }], {});
  workbox.registerRoute(/.*(?:flickr|instagram|tumblr|unsplash|gravatar)\.com|.*(shields)\.io|.*(crisp)\.chat/, new workbox.StaleWhileRevalidate({
    "cacheName": "external",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 100,
      purgeOnQuotaError: true
    })]
  }), 'GET');

});
//# sourceMappingURL=www.sw.esm.js.map
