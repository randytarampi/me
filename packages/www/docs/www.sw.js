if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,t)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const c={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return c;default:return e(r)}})).then(e=>{const r=t(...e);return s.default||(s.default=r),s})}))}}define("./www.sw.js",["./workbox-47dfa1d9"],(function(e){"use strict";e.setCacheNameDetails({prefix:"@randy.tarampi/www"}),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/styles.css",revision:"5cc523c2fed83c423cf5996bde018b39"},{url:"/styles.js",revision:"285c2759697012d89910cb9798ff631d"},{url:"/vendor.js",revision:"7a0d277581bd0547114be3c21c22ca10"},{url:"/vendor.js.LICENSE.txt",revision:"39e433d8a12070c7bcc54790d263f5de"},{url:"/www.js",revision:"421d4b5c9393798165bddf9976c27d13"},{url:"/www.sw.installer.js",revision:"9bc157f1ca26229c5e7769b25936ff9a"}],{}),e.registerRoute(/.*(?:flickr|instagram|tumblr|unsplash|gravatar)\.com|.*(shields)\.io|.*(crisp)\.chat/,new e.StaleWhileRevalidate({cacheName:"external",plugins:[new e.ExpirationPlugin({maxEntries:100,purgeOnQuotaError:!0})]}),"GET")}));
//# sourceMappingURL=www.sw.js.map
