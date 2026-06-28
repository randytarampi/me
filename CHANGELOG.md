# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [8.0.0](https://github.com/randytarampi/me/compare/v7.0.1...v8.0.0) (2026-06-28)


### Bug Fixes

* **babel:** Use `@babel/preset-env` with `bugfixes` and all `proposals: true`. ([2fdfd3c](https://github.com/randytarampi/me/commit/2fdfd3ca8fe07f2198195d8a86c1120e3c30e1ba))
* **build:** make it actually build. Babel 8 dropped bugfixes, Docker doesn't need a TTY. 🤦‍♂️ ([1823e4f](https://github.com/randytarampi/me/commit/1823e4f9a8599e62eb538de16125108d661fe66e))
* **ci:** add Node 20/22/24/26 test matrix. We say >=20, let's prove it. 🧪 ([d8bd9df](https://github.com/randytarampi/me/commit/d8bd9dfecb3985759afd5246c0bce9de170c0347))
* **ci:** apply review feedback — fix workflow_dispatch schema, add environment: production, complete release.yml, fix deploy workflows. 🤞 ([7255208](https://github.com/randytarampi/me/commit/72552080782f55d1e2b7e5322f59843ed4535fd1))
* **ci:** disable Yarn hardened mode — portal deps need lockfile resolution in PR CI. 🤝 ([b222f88](https://github.com/randytarampi/me/commit/b222f889555976da8777a300357a000f0bbc2b88))
* **ci:** disable yarn hardening and hound eslint ([90c1db5](https://github.com/randytarampi/me/commit/90c1db50b0bc0701f3dc1eddba92ac2f23f83e9e))
* **ci:** regenerate yarn.lock. CI was trying to modify it, now it won't need to. 🔄 ([9466755](https://github.com/randytarampi/me/commit/94667551afbd49373e2615fd4a993cef388a3c01))
* **ci:** relax yarn install flags ([6a6e494](https://github.com/randytarampi/me/commit/6a6e494b787247a09365ca1b05a9bd4693b7b00a))
* **ci:** remove stale yarn config set script-shell. Yarn 4 doesn't need it. 🤦‍♂️ ([5402c42](https://github.com/randytarampi/me/commit/5402c42b1521c46f66c5ed606d8e1e1be154bb9d))
* **css:** Remove `.printable:after` empty content. ([6a3d830](https://github.com/randytarampi/me/commit/6a3d830234087817777824c940199337935dac80))
* **jsx:** stop react-router from blowing up the test harness. Targeted requires instead of the ESM-only root. 🤞 ([1ce4d73](https://github.com/randytarampi/me/commit/1ce4d73006601b19143b129f7982c5561a5ff564))
* package.json to reduce vulnerabilities ([52e0af5](https://github.com/randytarampi/me/commit/52e0af530268024b17c759fc0c61072497f52b4e))
* package.json to reduce vulnerabilities ([1c21a82](https://github.com/randytarampi/me/commit/1c21a82759d5090a3db8d1ef855f557715e2ca19))
* packages/service/package.json to reduce vulnerabilities ([30a21d7](https://github.com/randytarampi/me/commit/30a21d7fe4c0038797511d3625096e4e6fe0ef7c))
* packages/views/package.json to reduce vulnerabilities ([d6ce48f](https://github.com/randytarampi/me/commit/d6ce48f7b64daba81f0d3bf0a6db8d181284ceed))
* **release:** make release actually work. Detached HEAD, wrong trigger, stale PR refs. 🤦‍♂️ ([8449eae](https://github.com/randytarampi/me/commit/8449eaefe9359506a357063d49f730bc9b9438b7))
* **release:** remove --immutable from lerna npmClientArgs. Yarn 4 doesn't allow it with --mode=update-lockfile. 🤦‍♂️ ([44ec13f](https://github.com/randytarampi/me/commit/44ec13f987cc452c9149547d4a1449fd14e4d1c6))
* **release:** set git identity for lerna commits. CI doesn't know who it is. 🤖 ([d5af323](https://github.com/randytarampi/me/commit/d5af32300e2ce09fc9cac5fc85f242281dc1e3ff))
* **resume:** Adjust `resume` content to fit on a single page with `puppeteer@13` ([893b134](https://github.com/randytarampi/me/commit/893b1349e115d86c8e2237ee105deaa5fc9fd440))
* **resume:** Fix to `resume-cli@3.0.5`. ([06c5374](https://github.com/randytarampi/me/commit/06c53744a3e37f6b5901a305c7e870d5892ba620))
* **service:** Whoops. Revert to `unsplash-js@6` 'cause 7 is really breaking ([160987b](https://github.com/randytarampi/me/commit/160987b596a580b57383f0e2f0fef85ceb12b6ca))
* upgrade instagram-graph-sdk from 0.2.1 to 0.3.1 ([fb8df6b](https://github.com/randytarampi/me/commit/fb8df6be02faed92a4a5dbde5bc41b1964f498c8))
* upgrade react-swipeable-views from 0.13.9 to 0.14.0 ([8cab1aa](https://github.com/randytarampi/me/commit/8cab1aae3c70be179f867d0018538bf8b1ff9ef5))
* upgrade react-swipeable-views-utils from 0.13.9 to 0.14.0 ([97f5124](https://github.com/randytarampi/me/commit/97f5124ff60a3496f4852c1229fcbdf57a1c06fa))
* **www,letter,resume:** finish killing react-hot-loader. It's been dying since 2022. Let it go. 🪦 Also: relax engines.node to >=20. ([162a3bc](https://github.com/randytarampi/me/commit/162a3bca5059aa9305dee2a634e876964f20fcb7))


### chore

* **package:** Upgrade :allthethings:. ([533e87e](https://github.com/randytarampi/me/commit/533e87e4f39e13cc5e007b70cb760346c7f7bdad))
* **package:** Upgrade packages for 2020-11-22. ([1d6dc26](https://github.com/randytarampi/me/commit/1d6dc260baf7de78aa571b50830c7f8359b3b1fd))


### Features

* **jsx:** migrate to React 19 + enzyme compat shim + react-router v7 + redux-thunk v3 + immutable v5 ([58b86ed](https://github.com/randytarampi/me/commit/58b86ed3a1d7f2cd80761eba49ea15bafc7cd898))
* **letter:** migrate to React 19 + react-router v7 ([9df6b33](https://github.com/randytarampi/me/commit/9df6b33ad06e68307949edfc425c09b87ba6005f))
* **printables:** update renderPdf for React 19 compatibility ([beccd4f](https://github.com/randytarampi/me/commit/beccd4fa6921bcf39c6f5a1cc70bd55ce7b18a25))
* **resume:** migrate to React 19 + react-router v7 ([0e8b85f](https://github.com/randytarampi/me/commit/0e8b85f018900dbbbf79f6c77ff5ec80a435048e))
* **service:** migrate dynamoose to v4 ([ad763d6](https://github.com/randytarampi/me/commit/ad763d684dfd5b9783bfb26ebcb33938790fde35))
* **service:** migrate flickr-sdk v7 + unsplash-js v7 ([3b6ff5d](https://github.com/randytarampi/me/commit/3b6ff5d96ffd27ca68ce063668b6264556d1445d))
* **service:** migrate serverless to v4 + serverless-dynamodb ([b325f40](https://github.com/randytarampi/me/commit/b325f40bac82f2053ebc2c17294870346de7aada))
* **www:** migrate to React 19 + react-router v7 ([19b0097](https://github.com/randytarampi/me/commit/19b0097008b112ddc703b537ff8074f7707deb4b))


### BREAKING CHANGES

* **package:** Also upgrade packages to support `node^12.22` (dropping support for `node<=10`), which is about to go unsupported this year anyways, but hey...

Signed-off-by: Randy Tarampi <rt@randytarampi.ca>
* **package:** Drop support for node@8
