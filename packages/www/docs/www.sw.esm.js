if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,t)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const n={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return n;default:return e(r)}})).then(e=>{const r=t(...e);return s.default||(s.default=r),s})}))}}define("./www.sw.esm.js",["./workbox-47dfa1d9"],(function(e){"use strict";e.setCacheNameDetails({prefix:"@randy.tarampi/www"}),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/styles.css",revision:"5cc523c2fed83c423cf5996bde018b39"},{url:"/styles.js",revision:"285c2759697012d89910cb9798ff631d"},{url:"/vendor.esm.js",revision:"cbb9435d7d1f9808f6d22f5905777fce"},{url:"/vendor.esm.js.LICENSE.txt",revision:"39e433d8a12070c7bcc54790d263f5de"},{url:"/www.esm.js",revision:"01bf1872ce4f82f849db559b0cd12e2b"},{url:"/www.sw.installer.esm.js",revision:"f6a1e4571aa952d5cf5dbc305f15886a"}],{}),e.registerRoute(/.*(?:flickr|instagram|tumblr|unsplash|gravatar)\.com|.*(shields)\.io|.*(crisp)\.chat/,new e.StaleWhileRevalidate({cacheName:"external",plugins:[new e.ExpirationPlugin({maxEntries:100,purgeOnQuotaError:!0})]}),"GET")}));
//# sourceMappingURL=www.sw.esm.js.map
