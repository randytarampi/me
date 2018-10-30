# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.47.16](https://github.com/randytarampi/me/compare/v0.47.15...v0.47.16) (2018-10-30)

**Note:** Version bump only for package me





## [0.47.15](https://github.com/randytarampi/me/compare/v0.47.14...v0.47.15) (2018-10-30)


### Bug Fixes

* **letter:** Add misplaced line at end of file. ([efcb372](https://github.com/randytarampi/me/commit/efcb372))
* **resume:** Fix `customContent` regression from 80c912a3402422413059c3c256a01afc77d100fe. ([c53913b](https://github.com/randytarampi/me/commit/c53913b))





## [0.47.14](https://github.com/randytarampi/me/compare/v0.47.13...v0.47.14) (2018-10-30)


### Bug Fixes

* **job-applications:** Build PDFs with `CAMPAIGN_MEDIUM` set. ([8fc76de](https://github.com/randytarampi/me/commit/8fc76de))
* **job-applications:** Make `me` and `you` more flexible in terms of `contentConfiguration`. ([39876f4](https://github.com/randytarampi/me/commit/39876f4))
* **job-applications:** Support assigning random `customContent` ad-hoc. ([db585e0](https://github.com/randytarampi/me/commit/db585e0))
* **resume:** Consolidate custom content exports. ([80c912a](https://github.com/randytarampi/me/commit/80c912a))
* **travis:** Fix badly moved/consolidated command. ([d6b4004](https://github.com/randytarampi/me/commit/d6b4004))





## [0.47.13](https://github.com/randytarampi/me/compare/v0.47.12...v0.47.13) (2018-10-30)


### Bug Fixes

* **css:** Don't bother with `node-sass-tilde-importer`. ([31e9361](https://github.com/randytarampi/me/commit/31e9361))
* **letter:** `PrintableRecipient` address should require a city & region. ([4a4c477](https://github.com/randytarampi/me/commit/4a4c477))
* **letter:** Give `LetterSection` some `sectionProps`. ([97505a6](https://github.com/randytarampi/me/commit/97505a6))
* **package:** Fix inverted logic in 2bbe750e51d43f389ca8fb688fd8db8ab78ec9d0. ([118b1a2](https://github.com/randytarampi/me/commit/118b1a2))
* **posts:** Build `prd` assets for release once. ([2bbe750](https://github.com/randytarampi/me/commit/2bbe750))
* **posts:** Remove `serverless-aws-alias` for now. ([072c134](https://github.com/randytarampi/me/commit/072c134))
* **posts:** See if plugin order changes things here? ([9a26498](https://github.com/randytarampi/me/commit/9a26498))
* **travis:** Add missing semi-colons. ([174156b](https://github.com/randytarampi/me/commit/174156b))
* **travis:** Publish with `${CPUS_COUNT}` concurrency. ([41bc90b](https://github.com/randytarampi/me/commit/41bc90b))
* **travis:** Separate the building of `prd` assets from versioning them. ([32451cf](https://github.com/randytarampi/me/commit/32451cf))
* **travis:** Turns out Travis uses `sh` instead of `bash`, so make these standard conditionals. ([76fef6b](https://github.com/randytarampi/me/commit/76fef6b))
* Remove `package-lock`s. ([b2bf2db](https://github.com/randytarampi/me/commit/b2bf2db))


### Reverts

* chore: Webpack should `babel` everything in `production` mode. ([c0f793b](https://github.com/randytarampi/me/commit/c0f793b))
* fix(posts): Disable `serverless-plugin-tracing` for now. ([de52187](https://github.com/randytarampi/me/commit/de52187))
* fix(posts): Don't webpack in `production` mode. ([eb1dc2f](https://github.com/randytarampi/me/commit/eb1dc2f))
* fix(posts): Remove `serverless-plugin-tracing`. ([a9efa93](https://github.com/randytarampi/me/commit/a9efa93))
* fix(posts): See if plugin order changes things here? ([2ac726c](https://github.com/randytarampi/me/commit/2ac726c))





## [0.47.12](https://github.com/randytarampi/me/compare/v0.47.11...v0.47.12) (2018-10-30)


### Bug Fixes

* **package:** Restore deleted `pretest` script. ([2870ba9](https://github.com/randytarampi/me/commit/2870ba9))
* **package:** Run monorepo `lerna` scripts with the proper concurrency. ([3273280](https://github.com/randytarampi/me/commit/3273280))
* **posts:** Remove `serverless-plugin-tracing`. ([0135a5e](https://github.com/randytarampi/me/commit/0135a5e))
* **travis:** Consistently `--hoist --no-ci` on deploy, even for `posts`. ([5850d17](https://github.com/randytarampi/me/commit/5850d17))
* **travis:** Don't `--ignore-scripts` on deploy. ([6edaf17](https://github.com/randytarampi/me/commit/6edaf17))
* **travis:** Don't `--ignore-scripts` on release. ([4790b10](https://github.com/randytarampi/me/commit/4790b10))
* **travis:** Fix Lerna's concurrency to 2 on the Travis boxes. ([4bc154f](https://github.com/randytarampi/me/commit/4bc154f))
* **travis:** Need to `bootstrap --ignore-scripts`, not `--production`. ([8eecc0c](https://github.com/randytarampi/me/commit/8eecc0c))







**Note:** Version bump only for package me





## [0.47.10](https://github.com/randytarampi/me/compare/v0.47.9...v0.47.10) (2018-10-29)


### Bug Fixes

* **css:** Bring in `node-sass-tilde-importer` per a3cd53bf685bf6fd5a3ed7996f19510bb276f257. ([2605402](https://github.com/randytarampi/me/commit/2605402))
* **css:** Fix `materialize-css` to `0.100.2`. ([815c6f5](https://github.com/randytarampi/me/commit/815c6f5))
* **jsx:** Explicitly depend on `query-string`. ([f6a3729](https://github.com/randytarampi/me/commit/f6a3729))
* **package:** Just nuke all these `package-lock`s for now. ([a6c7d72](https://github.com/randytarampi/me/commit/a6c7d72))
* **package:** Prefer to `prepare` my dev dependencies instead of `postinstall`. ([8dfb0dd](https://github.com/randytarampi/me/commit/8dfb0dd))
* **travis:** If `HAS_PUBLISHABLE_CHANGES`, then `version` and `install`. ([b9dcfb0](https://github.com/randytarampi/me/commit/b9dcfb0))
* **www:** `workbox-webpack-plugin` is actually a `devDependency`. ([f676871](https://github.com/randytarampi/me/commit/f676871))
* **www:** Pull `react-router-sitemap` dependencies up to the root. ([051b018](https://github.com/randytarampi/me/commit/051b018))


### Reverts

* fix(travis): If `HAS_PUBLISHABLE_CHANGES`, then `version` and `install`. ([d20c2ec](https://github.com/randytarampi/me/commit/d20c2ec))





## [0.47.9](https://github.com/randytarampi/me/compare/v0.47.8...v0.47.9) (2018-10-29)


### Reverts

* chore(travis): Need to `bootstrap --no-ci` on deploy. ([45f5279](https://github.com/randytarampi/me/commit/45f5279))
* chore(travis): Scope our `bootstrap` to the package we're deploying. ([565886f](https://github.com/randytarampi/me/commit/565886f))





## [0.47.8](https://github.com/randytarampi/me/compare/v0.47.7...v0.47.8) (2018-10-29)


### Bug Fixes

* **posts:** Don't webpack in `production` mode. ([e15494e](https://github.com/randytarampi/me/commit/e15494e))





## [0.47.7](https://github.com/randytarampi/me/compare/v0.47.6...v0.47.7) (2018-10-29)


### Bug Fixes

* **posts:** I don't know how this isn't creating a `Promise` in `ca-central-1`, but try this. ([56348a3](https://github.com/randytarampi/me/commit/56348a3))
* **posts:** Webpack explicitly targets `node`. ([c205b93](https://github.com/randytarampi/me/commit/c205b93))


### Reverts

* chore(posts): Don't use `console` when logging failed raven pushes. ([720b400](https://github.com/randytarampi/me/commit/720b400))





## [0.47.6](https://github.com/randytarampi/me/compare/v0.47.5...v0.47.6) (2018-10-29)


### Bug Fixes

* **posts:** Correct `*_URL` environment variables. ([92ca171](https://github.com/randytarampi/me/commit/92ca171))
* Actually we must `lerna bootstrap --no-ci` since how would hoisted dependencies even work with lockfiles? ([4166fd6](https://github.com/randytarampi/me/commit/4166fd6))
* Don't delete `package-lock`s on `clean` and always `lerna bootstrap --ci`. ([b9c7801](https://github.com/randytarampi/me/commit/b9c7801))





## [0.47.5](https://github.com/randytarampi/me/compare/v0.47.4...v0.47.5) (2018-10-29)


### Bug Fixes

* **www:** RSS Feed link should actually open in a new tab. ([d0ba7a0](https://github.com/randytarampi/me/commit/d0ba7a0))





## [0.47.4](https://github.com/randytarampi/me/compare/v0.47.3...v0.47.4) (2018-10-29)


### Bug Fixes

* **posts:** Enable `serverless-plugin-tracing`. ([2ee492d](https://github.com/randytarampi/me/commit/2ee492d))





## [0.47.3](https://github.com/randytarampi/me/compare/v0.47.2...v0.47.3) (2018-10-28)


### Bug Fixes

* **posts:** `XRayedAwsSdk.dynamoDB` -> `XRayedAwsSdk.DynamoDB`. ([7068d17](https://github.com/randytarampi/me/commit/7068d17))





## [0.47.2](https://github.com/randytarampi/me/compare/v0.47.1...v0.47.2) (2018-10-28)


### Bug Fixes

* **package:** Use `materialize@0.100.2`. ([f737259](https://github.com/randytarampi/me/commit/f737259))





## [0.47.1](https://github.com/randytarampi/me/compare/v0.47.0...v0.47.1) (2018-10-28)


### Bug Fixes

* **posts:** RSS file is served with `Content-Disposition: attachment`. ([9bbbb8b](https://github.com/randytarampi/me/commit/9bbbb8b))





# [0.47.0](https://github.com/randytarampi/me/compare/v0.46.1...v0.47.0) (2018-10-28)


### Bug Fixes

* **posts:** `parseQuerystringParameters` should always return an object. ([85f0dab](https://github.com/randytarampi/me/commit/85f0dab))
* Lock down `immutable@4.0.0-rc.10`. ([fc34855](https://github.com/randytarampi/me/commit/fc34855))


### Features

* **js:** Allow ourselves to turn `Post`s and `Photo`s `toRss()`. ([616c35d](https://github.com/randytarampi/me/commit/616c35d)), closes [randytarampi/me.blog#3](https://github.com/randytarampi/me.blog/issues/3)
* **posts:** `augmentUrlWithTrackingParams` for each RSS link. ([e5b2083](https://github.com/randytarampi/me/commit/e5b2083))
* **posts:** Add RSS support. ([7ed77dd](https://github.com/randytarampi/me/commit/7ed77dd)), closes [randytarampi/me.blog#3](https://github.com/randytarampi/me.blog/issues/3)
* **www:** Shill my RSS feed on `/`. ([f386e05](https://github.com/randytarampi/me/commit/f386e05)), closes [randytarampi/me.blog#3](https://github.com/randytarampi/me.blog/issues/3)





## [0.46.1](https://github.com/randytarampi/me/compare/v0.46.0...v0.46.1) (2018-10-26)


### Bug Fixes

* **jsx:** `persistAutoRehydrate` should only log when `__BUILD_IS_DEVELOPMENT__`. ([836374f](https://github.com/randytarampi/me/commit/836374f))





# [0.46.0](https://github.com/randytarampi/me/compare/v0.45.8...v0.46.0) (2018-10-26)


### Bug Fixes

* **babel:** Whoops, didn't want a `loose` `[@babel](https://github.com/babel)/preset-env`. ([7015a90](https://github.com/randytarampi/me/commit/7015a90))
* **jsx:** `fetchPosts` follows `fetchResume` in its failure handling. ([d91be33](https://github.com/randytarampi/me/commit/d91be33))
* **jsx:** `fetchPosts` graceful error handling dispatches a `FETCHING_POSTS_FAILURE_RECOVERY`. ([5cf4ca3](https://github.com/randytarampi/me/commit/5cf4ca3)), closes [/github.com/redux-offline/redux-offline#3](https://github.com//github.com/redux-offline/redux-offline/issues/3)
* **jsx:** ESLint. ([76084bd](https://github.com/randytarampi/me/commit/76084bd))
* **jsx:** ESLint. ([3d96ce9](https://github.com/randytarampi/me/commit/3d96ce9))
* **jsx:** Revive `DateTime` `posts` metadata on `REHYDRATE`. ([e90d503](https://github.com/randytarampi/me/commit/e90d503))
* **letter:** `fetchLetter` graceful error handling dispatches a `FETCHING_LETTER_FAILURE_RECOVERY`. ([4d5c59c](https://github.com/randytarampi/me/commit/4d5c59c))
* **letter:** Always attempt to fetch a `Letter` variant. ([55baecf](https://github.com/randytarampi/me/commit/55baecf))
* **resume:** `fetchResume` graceful error handling dispatches a `FETCHING_RESUME_FAILURE_RECOVERY`. ([8144d12](https://github.com/randytarampi/me/commit/8144d12))
* **resume:** Always attempt to fetch a `Resume` variant. ([a0eb3e2](https://github.com/randytarampi/me/commit/a0eb3e2))
* **www:** `redux-offline` also needs to know things about `LetterSection`s. ([e82ca73](https://github.com/randytarampi/me/commit/e82ca73))
* **www:** Don't cache API responses. ([9747ef9](https://github.com/randytarampi/me/commit/9747ef9))
* Actually add the files mentioned in 24eff7edf9b2f4f7cad912e03d1b1efacf4022cb. ([12285ad](https://github.com/randytarampi/me/commit/12285ad))
* ESLint. ([f60cddf](https://github.com/randytarampi/me/commit/f60cddf))
* Rename `default` resume, letter and job-application files as `resume`, `letter` and `job-application` respectively. ([24eff7e](https://github.com/randytarampi/me/commit/24eff7e))


### Features

* **posts:** `SearchParams` buys into `castDatePropertyToDateTime`. ([e97465f](https://github.com/randytarampi/me/commit/e97465f))
* **www:** `redux-offline` persists `Person`s properly. ([7adff23](https://github.com/randytarampi/me/commit/7adff23))
* **www:** `redux-offline` persists `Post`s properly. ([2e08933](https://github.com/randytarampi/me/commit/2e08933))
* **www:** `redux-offline` persists `Resume` sub-entities properly. ([5e90b41](https://github.com/randytarampi/me/commit/5e90b41))
* **www:** Initial work integrating `redux-offline`. ([24e93f2](https://github.com/randytarampi/me/commit/24e93f2))
* Buy into `castDatePropertyToDateTime` everywhere. ([e40b777](https://github.com/randytarampi/me/commit/e40b777))





## [0.45.8](https://github.com/randytarampi/me/compare/v0.45.7...v0.45.8) (2018-10-24)


### Bug Fixes

* **www:** Run builds with `CAMPAIGN_SOURCE` and `CAMPAIGN_CONTENT`. ([5bd93ec](https://github.com/randytarampi/me/commit/5bd93ec))


### Reverts

* chore(build): `lwip` -> `[@mcph](https://github.com/mcph)/lwip`. ([beb251c](https://github.com/randytarampi/me/commit/beb251c))
* fix(travis): Install `giflib-dbg` and `giflib-tools`. ([35ba132](https://github.com/randytarampi/me/commit/35ba132))
* fix(travis): Install `giflib` as we do `language-pack-ja`, etc. ([7420564](https://github.com/randytarampi/me/commit/7420564))
* fix(travis): Install `libgif-dev` as we do `language-pack-ja`, etc. ([a872e3d](https://github.com/randytarampi/me/commit/a872e3d))
* fix(travis): Install `libgif4` as we do `language-pack-ja`, etc. ([200425e](https://github.com/randytarampi/me/commit/200425e))
* fix(travis): Just gamble that we already have `giflib` (and `libgif7`). ([63510c4](https://github.com/randytarampi/me/commit/63510c4))





## [0.45.7](https://github.com/randytarampi/me/compare/v0.45.6...v0.45.7) (2018-10-22)


### Bug Fixes

* **resume:** Fix `.resume-profiles__profile` regression introduced in 88119fa6deb2274986612b0c95d7ad09a88a3691. ([bdd7d08](https://github.com/randytarampi/me/commit/bdd7d08))
* Load resumes and cover letters from the right folder in GitHub. ([902cfdb](https://github.com/randytarampi/me/commit/902cfdb))





## [0.45.6](https://github.com/randytarampi/me/compare/v0.45.5...v0.45.6) (2018-10-21)


### Bug Fixes

* **css:** Correctly align `Post` and `Photo` text body content. ([e23d05d](https://github.com/randytarampi/me/commit/e23d05d))
* **jsx:** Mitigate jittery loading on `/blog` by increasing the number of available `Post`s. ([c3fc674](https://github.com/randytarampi/me/commit/c3fc674))
* **www:** Service worker caches consistently `purgeOnQuotaError`. ([9982f79](https://github.com/randytarampi/me/commit/9982f79))





## [0.45.5](https://github.com/randytarampi/me/compare/v0.45.4...v0.45.5) (2018-10-21)


### Bug Fixes

* **posts:** Forcibly exclude `aws-sdk` from webpacked bundles. ([71d8425](https://github.com/randytarampi/me/commit/71d8425))
* **www:** Remove `$WWW_PACKAGE_DIR/docs/precache-manifest.*.js` on build. ([bc05c70](https://github.com/randytarampi/me/commit/bc05c70))





## [0.45.4](https://github.com/randytarampi/me/compare/v0.45.3...v0.45.4) (2018-10-20)


### Bug Fixes

* **assets:** Bring back `ʕつ•ᴥ•ʔつ.svg` for link previews. ([8e5de71](https://github.com/randytarampi/me/commit/8e5de71))
* **views:** Explicitly set `apple-mobile-web-app-status-bar-style` to black. ([7aaea9c](https://github.com/randytarampi/me/commit/7aaea9c))
* **views:** iOS splash screens explicitly target device orientations. ([42c9e6e](https://github.com/randytarampi/me/commit/42c9e6e))





## [0.45.3](https://github.com/randytarampi/me/compare/v0.45.2...v0.45.3) (2018-10-20)

**Note:** Version bump only for package me





## [0.45.2](https://github.com/randytarampi/me/compare/v0.45.1...v0.45.2) (2018-10-20)

**Note:** Version bump only for package me





## [0.45.1](https://github.com/randytarampi/me/compare/v0.45.0...v0.45.1) (2018-10-20)


### Bug Fixes

* **views:** Bring `views` GTM `app` data layer variable into line with the changes in d4a7141bfef999e256c2cea1f69d1a2613ade979. ([6984956](https://github.com/randytarampi/me/commit/6984956))





# [0.45.0](https://github.com/randytarampi/me/compare/v0.44.0...v0.45.0) (2018-10-20)


### Bug Fixes

* Remove unnecessary reference to `resume-cli`. ([a4f4ff3](https://github.com/randytarampi/me/commit/a4f4ff3))


### Features

* **assets:** Use separate favicons and splash screens for each environment. ([e1b799e](https://github.com/randytarampi/me/commit/e1b799e))
* **jsx:** Push info into the GTM data layer for `CRISP_CHAT_CLOSED`, `CRISP_CHAT_OPENED` and `CRISP_WEBSITE_AVAILABILITY_CHANGED`. ([d4a7141](https://github.com/randytarampi/me/commit/d4a7141))





# [0.44.0](https://github.com/randytarampi/me/compare/v0.43.13...v0.44.0) (2018-10-19)


### Bug Fixes

* **jsonresume-theme:** Remove mistakenly committed `node_modules`. ([559565c](https://github.com/randytarampi/me/commit/559565c))
* **jsx:** Fix bad file references from 875ad4bcb837c7a1ae77911ff185d1c37c3716d8. ([af84c83](https://github.com/randytarampi/me/commit/af84c83))
* **www:** Only precache my signature, everything else can just get cached when it comes down. ([c0438ff](https://github.com/randytarampi/me/commit/c0438ff))


### Features

* **www:** `$crisp` callbacks dispatch redux actions. ([90ad97d](https://github.com/randytarampi/me/commit/90ad97d))
* **www:** `$crisp` callbacks get picked up by metrics middleware. ([d3f01df](https://github.com/randytarampi/me/commit/d3f01df))





## [0.43.13](https://github.com/randytarampi/me/compare/v0.43.12...v0.43.13) (2018-10-18)


### Bug Fixes

* **posts:** `processCaptionHtml` also works on `ol` and `ul` elements. ([8450eff](https://github.com/randytarampi/me/commit/8450eff))
* **posts:** Only `processCaptionHtml` for Tumblr `Photo`s. ([41deda7](https://github.com/randytarampi/me/commit/41deda7))





## [0.43.12](https://github.com/randytarampi/me/compare/v0.43.11...v0.43.12) (2018-10-18)

**Note:** Version bump only for package me





## [0.43.11](https://github.com/randytarampi/me/compare/v0.43.10...v0.43.11) (2018-10-18)


### Bug Fixes

* **css:** Force ligature support. ([4ae8531](https://github.com/randytarampi/me/commit/4ae8531))





## [0.43.10](https://github.com/randytarampi/me/compare/v0.43.9...v0.43.10) (2018-10-18)


### Bug Fixes

* **css:** Nudge over `.post-html` by `$blockPadding` as `.post-text` is. ([15803f7](https://github.com/randytarampi/me/commit/15803f7))
* **travis:** Add `jsonresume-theme` and `letter` PDFs to releases. ([916449f](https://github.com/randytarampi/me/commit/916449f))





## [0.43.9](https://github.com/randytarampi/me/compare/v0.43.8...v0.43.9) (2018-10-17)


### Bug Fixes

* **css:** Ugh. Just hardcode the `orange` here to be `#ec7500`. ([a9d473f](https://github.com/randytarampi/me/commit/a9d473f)), closes [#ec7500](https://github.com/randytarampi/me/issues/ec7500)





## [0.43.8](https://github.com/randytarampi/me/compare/v0.43.7...v0.43.8) (2018-10-17)

**Note:** Version bump only for package me





## [0.43.7](https://github.com/randytarampi/me/compare/v0.43.6...v0.43.7) (2018-10-17)


### Bug Fixes

* **www:** Fix hardcoded references to `/docs/**` ([ff26f77](https://github.com/randytarampi/me/commit/ff26f77))





## [0.43.6](https://github.com/randytarampi/me/compare/v0.43.5...v0.43.6) (2018-10-17)


### Bug Fixes

* **www:** Also cache the Crisp chat JS file. ([6b233d6](https://github.com/randytarampi/me/commit/6b233d6))
* **www:** Also need to copy the CNAME to `/docs` on release. ([283a870](https://github.com/randytarampi/me/commit/283a870))





## [0.43.5](https://github.com/randytarampi/me/compare/v0.43.4...v0.43.5) (2018-10-17)


### Bug Fixes

* **jsonresume-theme:** Don't assume that `dist` will exist on build. ([742540d](https://github.com/randytarampi/me/commit/742540d))
* **jsonresume-theme:** Push `jsonresume-theme/docs` on `github-pages` deploy. ([290f7d6](https://github.com/randytarampi/me/commit/290f7d6))
* **jsx:** Fix tests added in 1bf8b9dbc0f26c55e808f3a8fb02d6ce58264cee. ([62b8ba4](https://github.com/randytarampi/me/commit/62b8ba4))
* **resume:** Retain `$RESUME_PACKAGE_DIR/docs` in VCS. ([2dda63c](https://github.com/randytarampi/me/commit/2dda63c))
* **www:** Add the CNAME to `$WWW_PACKAGE_DIR/docs/CNAME`. ([c56d57a](https://github.com/randytarampi/me/commit/c56d57a))
* **www:** Throw in the towel and just serve everything out of `/docs`. ([91a09fe](https://github.com/randytarampi/me/commit/91a09fe))


### Reverts

* fix(www): Turns out the manifest `start_url` is relative to the manifest? ([700ff29](https://github.com/randytarampi/me/commit/700ff29))





## [0.43.4](https://github.com/randytarampi/me/compare/v0.43.3...v0.43.4) (2018-10-17)


### Bug Fixes

* **www:** Turns out the manifest `start_url` is relative to the manifest? ([6ffb680](https://github.com/randytarampi/me/commit/6ffb680))





## [0.43.3](https://github.com/randytarampi/me/compare/v0.43.2...v0.43.3) (2018-10-17)


### Bug Fixes

* **assets:** Update iOS PWA splash screens. ([b7ad6f8](https://github.com/randytarampi/me/commit/b7ad6f8))
* **travis:** `jsonresume-theme` doesn't rely on a `manifest.json`, so don't try to commit one. ([d5d3003](https://github.com/randytarampi/me/commit/d5d3003))
* **www:** Don't include `unsupportedPath` in the sitemap. ([3b04ab5](https://github.com/randytarampi/me/commit/3b04ab5))
* **www:** Explicitly define manifest `scope` to be the root. ([9645d3d](https://github.com/randytarampi/me/commit/9645d3d))
* **www:** Just precache all my `assets`. ([721d86c](https://github.com/randytarampi/me/commit/721d86c))
* **www:** Precache `html` files correctly. ([8f7d381](https://github.com/randytarampi/me/commit/8f7d381))
* **www:** Precache `html` files explicitly out of `/`. ([f2bc410](https://github.com/randytarampi/me/commit/f2bc410))
* **www:** Properly define a webpack `publicPath`. ([68e33f5](https://github.com/randytarampi/me/commit/68e33f5)), closes [/github.com/GoogleChrome/workbox/issues/1227#issuecomment-428277030](https://github.com//github.com/GoogleChrome/workbox/issues/1227/issues/issuecomment-428277030)
* **www:** Serve the `manifest.json` alongside `index.html`. ([fb71364](https://github.com/randytarampi/me/commit/fb71364))





## [0.43.2](https://github.com/randytarampi/me/compare/v0.43.1...v0.43.2) (2018-10-16)


### Bug Fixes

* **views:** Add apple specific splash screens. ([91a5765](https://github.com/randytarampi/me/commit/91a5765))
* **www:** Add a `start_url` to the `manifest.json`. ([a31a471](https://github.com/randytarampi/me/commit/a31a471))
* **www:** Consolidate the service worker caches. ([1d73a0d](https://github.com/randytarampi/me/commit/1d73a0d))
* **www:** Install the service worker before loading anything else. ([2cc951a](https://github.com/randytarampi/me/commit/2cc951a))
* **www:** Make `Sitemap` absolute in `robots.txt`. ([0cdd1c1](https://github.com/randytarampi/me/commit/0cdd1c1))
* **www:** Service worker needs `navigateFallback` defined. ([4bb211c](https://github.com/randytarampi/me/commit/4bb211c))





## [0.43.1](https://github.com/randytarampi/me/compare/v0.43.0...v0.43.1) (2018-10-16)


### Bug Fixes

* **travis:** `git rm --ignore-unmatch` files that may not exist yet. ([32969d0](https://github.com/randytarampi/me/commit/32969d0))
* **travis:** `git rm --verbose` -> `git rm --force`. ([085b966](https://github.com/randytarampi/me/commit/085b966))
* **www:** Also cache `html` files. ([7421d3d](https://github.com/randytarampi/me/commit/7421d3d))
* **www:** We need to copy the `precache-manifest` to the root directory. ([e5d3245](https://github.com/randytarampi/me/commit/e5d3245))





# [0.43.0](https://github.com/randytarampi/me/compare/v0.42.2...v0.43.0) (2018-10-16)


### Bug Fixes

* **jsx:** Make `.nav-header__tabs` sticky. ([0c03512](https://github.com/randytarampi/me/commit/0c03512))
* **www:** `ConnectedSwipeableRoutes` is bound to keyboard arrows. ([d635233](https://github.com/randytarampi/me/commit/d635233))
* **www:** `external` cache has 100 `maxEntries`. ([9667f65](https://github.com/randytarampi/me/commit/9667f65))
* **www:** `external` cache will `purgeOnQuotaError`. ([035a720](https://github.com/randytarampi/me/commit/035a720))
* **www:** Need to copy Roboto fonts 'cause of `materialize-css@0.100.2`. ([b82782b](https://github.com/randytarampi/me/commit/b82782b))


### Features

* **www:** Add a basic service worker that caches some assets. ([f1e8ab7](https://github.com/randytarampi/me/commit/f1e8ab7))
* **www:** Also see if we can cache `posts.postsUrl` responses. ([90966c6](https://github.com/randytarampi/me/commit/90966c6))





## [0.42.2](https://github.com/randytarampi/me/compare/v0.42.1...v0.42.2) (2018-10-16)


### Bug Fixes

* **css:** `li` `list-style-position` is `inside`. ([b4e3e33](https://github.com/randytarampi/me/commit/b4e3e33))
* **jsx:** Only render `swipeableRoutes` under `ConnectedSwipeableRoutes`. ([8d571f4](https://github.com/randytarampi/me/commit/8d571f4))





## [0.42.1](https://github.com/randytarampi/me/compare/v0.42.0...v0.42.1) (2018-10-16)


### Bug Fixes

* **jsx:** `ConnectedSwipeableTabs` grabs `Tab`s off the `routes`. ([6c71e1f](https://github.com/randytarampi/me/commit/6c71e1f))
* **jsx:** Couple `indexedRoutes` to the idea of "routes with tabs". ([1d79d88](https://github.com/randytarampi/me/commit/1d79d88))
* **jsx:** Mask the slow renders of the next slide with longer animations. ([3cf2af4](https://github.com/randytarampi/me/commit/3cf2af4))





# [0.42.0](https://github.com/randytarampi/me/compare/v0.41.7...v0.42.0) (2018-10-15)


### Bug Fixes

* **jsx:** `renderSwipeableRoutes` only renders the best matching route. ([6ed752c](https://github.com/randytarampi/me/commit/6ed752c))


### Features

* **www:** `/(photos|words)` -> `/blog`. ([5c83275](https://github.com/randytarampi/me/commit/5c83275))


### Reverts

* fix(jsx): Only render routes with defined `path`s. ([f328672](https://github.com/randytarampi/me/commit/f328672))





## [0.41.7](https://github.com/randytarampi/me/compare/v0.41.6...v0.41.7) (2018-10-15)


### Bug Fixes

* **travis:** Always add `packages/*/CHANGELOG.md` on release. ([7e1ca72](https://github.com/randytarampi/me/commit/7e1ca72))
* **travis:** Need to `build` `www` again after the version bump. ([2aabdb3](https://github.com/randytarampi/me/commit/2aabdb3))





## [0.41.6](https://github.com/randytarampi/me/compare/v0.41.5...v0.41.6) (2018-10-15)


### Bug Fixes

* **views:** Burn the `.loading-spinner` into the HTML. ([ed317ed](https://github.com/randytarampi/me/commit/ed317ed))





## [0.41.5](https://github.com/randytarampi/me/compare/v0.41.4...v0.41.5) (2018-10-15)


### Bug Fixes

* **resume:** Extract my custom `ResumeFooter` content. ([acd56b6](https://github.com/randytarampi/me/commit/acd56b6))





## [0.41.4](https://github.com/randytarampi/me/compare/v0.41.3...v0.41.4) (2018-10-15)

**Note:** Version bump only for package me





## [0.41.3](https://github.com/randytarampi/me/compare/v0.41.2...v0.41.3) (2018-10-15)


### Bug Fixes

* **jsx:** Fix tests for 02634515f0009dffce2e330dda3663a3dde6f78e. ([ca87a38](https://github.com/randytarampi/me/commit/ca87a38))
* **jsx:** Show the correct `swipeableTabs` state on load. ([0263451](https://github.com/randytarampi/me/commit/0263451))
* **www:** Add more test coverage to get over the 80% threshold. ([dfd187d](https://github.com/randytarampi/me/commit/dfd187d))





## [0.41.2](https://github.com/randytarampi/me/compare/v0.41.1...v0.41.2) (2018-10-14)


### Bug Fixes

* Use the `—` consistently. ([66f5e0a](https://github.com/randytarampi/me/commit/66f5e0a))





## [0.41.1](https://github.com/randytarampi/me/compare/v0.41.0...v0.41.1) (2018-10-13)


### Bug Fixes

* **jsx:** Only render routes with defined `path`s. ([35ea87b](https://github.com/randytarampi/me/commit/35ea87b))
* **letter:** Ensure that we have an actual `<title>`. ([66ccaba](https://github.com/randytarampi/me/commit/66ccaba))
* **resume:** Ensure that we have an actual `<title>`. ([a7db700](https://github.com/randytarampi/me/commit/a7db700))
* **www:** Change manifest display from `minimal-ui` to `fullscreen`. ([22a7f6f](https://github.com/randytarampi/me/commit/22a7f6f))





# [0.41.0](https://github.com/randytarampi/me/compare/v0.40.19...v0.41.0) (2018-10-13)


### Features

* **www:** Use `react-swipeable-views` to knock off [#145](https://github.com/randytarampi/me/issues/145). ([c79241c](https://github.com/randytarampi/me/commit/c79241c))


### Reverts

* chore(package): update materialize-css to version 1.0.0 ([a5768c6](https://github.com/randytarampi/me/commit/a5768c6))





## [0.40.19](https://github.com/randytarampi/me/compare/v0.40.18...v0.40.19) (2018-10-10)


### Bug Fixes

* **package:** `mkdir .nyc_output/` -> `mkdir -p .nyc_output/`. ([b31acea](https://github.com/randytarampi/me/commit/b31acea))
* **resume:** Don't include my custom content when publishing modules. ([09abcd6](https://github.com/randytarampi/me/commit/09abcd6))





## [0.40.18](https://github.com/randytarampi/me/compare/v0.40.17...v0.40.18) (2018-10-10)


### Bug Fixes

* **package:** update dynamoose to version 1.0.0 ([47f719e](https://github.com/randytarampi/me/commit/47f719e))





## [0.40.17](https://github.com/randytarampi/me/compare/v0.40.16...v0.40.17) (2018-10-10)


### Bug Fixes

* **jsonresume-theme:** Don't use fancy ES6 template string syntax. ([88f08a4](https://github.com/randytarampi/me/commit/88f08a4))





## [0.40.16](https://github.com/randytarampi/me/compare/v0.40.15...v0.40.16) (2018-10-09)


### Bug Fixes

* **views:** Explicitly look for `layout.pug` from `index.pug`. ([43263f6](https://github.com/randytarampi/me/commit/43263f6))





## [0.40.15](https://github.com/randytarampi/me/compare/v0.40.14...v0.40.15) (2018-10-05)


### Bug Fixes

* **jsonresume-theme:** Also copy over `layout` from `views`. ([636957c](https://github.com/randytarampi/me/commit/636957c))





## [0.40.14](https://github.com/randytarampi/me/compare/v0.40.13...v0.40.14) (2018-10-04)


### Bug Fixes

* **jsonresume-theme:** Copy assets from dependent node_modules on build. ([dfbaba7](https://github.com/randytarampi/me/commit/dfbaba7))





<a name="0.40.13"></a>
## [0.40.13](https://github.com/randytarampi/me/compare/v0.40.12...v0.40.13) (2018-09-30)


### Bug Fixes

* **package:** update reselect to version 4.0.0 ([15eb958](https://github.com/randytarampi/me/commit/15eb958))
* **package:** update reselect to version 4.0.0 ([a57af7c](https://github.com/randytarampi/me/commit/a57af7c))





<a name="0.40.12"></a>
## [0.40.12](https://github.com/randytarampi/me/compare/v0.40.11...v0.40.12) (2018-09-30)


### Bug Fixes

* **css:** Give `.post-text` some `.z-depth-*`. ([cc0d271](https://github.com/randytarampi/me/commit/cc0d271))
* **css:** Give `.post`s some `.z-depth-*`. ([d4eb61e](https://github.com/randytarampi/me/commit/d4eb61e))





<a name="0.40.11"></a>
## [0.40.11](https://github.com/randytarampi/me/compare/v0.40.10...v0.40.11) (2018-09-27)

**Note:** Version bump only for package me





<a name="0.40.10"></a>
## [0.40.10](https://github.com/randytarampi/me/compare/v0.40.9...v0.40.10) (2018-09-26)

**Note:** Version bump only for package me





<a name="0.40.9"></a>
## [0.40.9](https://github.com/randytarampi/me/compare/v0.40.8...v0.40.9) (2018-09-26)


### Bug Fixes

* Babel-ize a bunch more modules. ([09f2130](https://github.com/randytarampi/me/commit/09f2130))
* Don't push the `react-hot-loader` plugin during production builds. ([21e2282](https://github.com/randytarampi/me/commit/21e2282))
* **jsx:** Add the `raf/polyfill` while I'm in here. ([f970386](https://github.com/randytarampi/me/commit/f970386))





<a name="0.40.8"></a>
## [0.40.8](https://github.com/randytarampi/me/compare/v0.40.7...v0.40.8) (2018-09-26)


### Bug Fixes

* Don't push the `react-hot-loader` plugin during production builds. ([5a162e2](https://github.com/randytarampi/me/commit/5a162e2))





<a name="0.40.7"></a>
## [0.40.7](https://github.com/randytarampi/me/compare/v0.40.6...v0.40.7) (2018-09-26)


### Bug Fixes

* Also babel-ize `react-hot-loader`. ([527ba48](https://github.com/randytarampi/me/commit/527ba48))


### Reverts

* fix: `babel` _everything_ to support as many old browsers as possible. ([3215a12](https://github.com/randytarampi/me/commit/3215a12))





<a name="0.40.6"></a>
## [0.40.6](https://github.com/randytarampi/me/compare/v0.40.5...v0.40.6) (2018-09-26)


### Bug Fixes

* **css:** Restore `.z-depth-*` on `.text` and other block-y elements. ([9b106ac](https://github.com/randytarampi/me/commit/9b106ac))
* `babel` _everything_ to support as many old browsers as possible. ([acb762b](https://github.com/randytarampi/me/commit/acb762b))





<a name="0.40.5"></a>
## [0.40.5](https://github.com/randytarampi/me/compare/v0.40.4...v0.40.5) (2018-09-25)


### Bug Fixes

* **resume:** GrammarLint. ([9ab52c0](https://github.com/randytarampi/me/commit/9ab52c0))





<a name="0.40.4"></a>
## [0.40.4](https://github.com/randytarampi/me/compare/v0.40.3...v0.40.4) (2018-09-25)


### Bug Fixes

* **css:** `blockquote` trim colour should be `$link-color`. ([036cac6](https://github.com/randytarampi/me/commit/036cac6))
* **css:** Add more `BrandedLink` styles. ([f0e9b42](https://github.com/randytarampi/me/commit/f0e9b42))
* **jsonresume-theme:** Don't rely on `postinstall`ed styles. ([a0ab2a1](https://github.com/randytarampi/me/commit/a0ab2a1))
* **jsonresume-theme:** Fix forgotten reference from a0ab2a1262752b7e5f5581c7d93d50ab2329b4a5. ([8b542b8](https://github.com/randytarampi/me/commit/8b542b8))
* **resume:** Give `.resume-profiles__profile`s more room to breathe. ([88119fa](https://github.com/randytarampi/me/commit/88119fa))
* **resume:** Resume referees' names don't need to be `.text`. ([6c33acc](https://github.com/randytarampi/me/commit/6c33acc))
* **resume:** Support a `SoundCloudLink` from `[@randy](https://github.com/randy).tarampi/jsx`. ([0fa9d93](https://github.com/randytarampi/me/commit/0fa9d93))





<a name="0.40.3"></a>
## [0.40.3](https://github.com/randytarampi/me/compare/v0.40.2...v0.40.3) (2018-09-24)


### Bug Fixes

* **package:** update react-progressive-image to version 0.6.0 ([84283ad](https://github.com/randytarampi/me/commit/84283ad))





<a name="0.40.2"></a>
## [0.40.2](https://github.com/randytarampi/me/compare/v0.40.1...v0.40.2) (2018-09-24)

**Note:** Version bump only for package me





<a name="0.40.1"></a>
## [0.40.1](https://github.com/randytarampi/me/compare/v0.40.0...v0.40.1) (2018-09-24)


### Bug Fixes

* **job-applications:** Don't rely on harcoded package version in tests. ([957ab77](https://github.com/randytarampi/me/commit/957ab77))
* **jsonresume-theme:** Get this working on my local `theme-manager`. ([145c581](https://github.com/randytarampi/me/commit/145c581))





<a name="0.40.0"></a>
# [0.40.0](https://github.com/randytarampi/me/compare/v0.39.13...v0.40.0) (2018-09-24)


### Bug Fixes

* **jsonresume-theme:** Just assume the box is running *nix and hardcode paths here. ([58bac39](https://github.com/randytarampi/me/commit/58bac39))
* **jsonresume-theme:** Remove mistakenly placed comma. ([531c855](https://github.com/randytarampi/me/commit/531c855))


### Features

* **job-applications:** Add the resume/cover letter generator I've been using for the last couple of days now. ([a0d8f09](https://github.com/randytarampi/me/commit/a0d8f09))





<a name="0.39.13"></a>
## [0.39.13](https://github.com/randytarampi/me/compare/v0.39.12...v0.39.13) (2018-09-24)


### Bug Fixes

* **jsonresume-theme:** Only let `__dirname` fallback for webpacked code. ([3d0c18f](https://github.com/randytarampi/me/commit/3d0c18f))





<a name="0.39.12"></a>
## [0.39.12](https://github.com/randytarampi/me/compare/v0.39.11...v0.39.12) (2018-09-24)


### Bug Fixes

* **config:** Use the correct `puppeteer` env `assetUrl`s. ([b32d016](https://github.com/randytarampi/me/commit/b32d016))
* **jsonresume-theme:** Make sure webpack doesn't mangle `__dirname`. ([26e9b4b](https://github.com/randytarampi/me/commit/26e9b4b))
* **resume:** ESLint. ([3718983](https://github.com/randytarampi/me/commit/3718983))
* **views:** Don't include `scripts` when `environment` is `puppeteer` or `printable`. ([e9b093a](https://github.com/randytarampi/me/commit/e9b093a))





<a name="0.39.11"></a>
## [0.39.11](https://github.com/randytarampi/me/compare/v0.39.10...v0.39.11) (2018-09-23)

**Note:** Version bump only for package me





<a name="0.39.10"></a>
## [0.39.10](https://github.com/randytarampi/me/compare/v0.39.9...v0.39.10) (2018-09-23)

**Note:** Version bump only for package me





<a name="0.39.9"></a>
## [0.39.9](https://github.com/randytarampi/me/compare/v0.39.8...v0.39.9) (2018-09-23)


### Bug Fixes

* **jsonresume-theme:** Explicitly depend on core-js^2.5.7. ([33d25ed](https://github.com/randytarampi/me/commit/33d25ed))





<a name="0.39.8"></a>
## [0.39.8](https://github.com/randytarampi/me/compare/v0.39.7...v0.39.8) (2018-09-23)


### Bug Fixes

* **jsx:** `utm_name` -> `utm_campaign`. ([fb2d041](https://github.com/randytarampi/me/commit/fb2d041))
* **letter:** ESLint. ([9924810](https://github.com/randytarampi/me/commit/9924810))





<a name="0.39.7"></a>
## [0.39.7](https://github.com/randytarampi/me/compare/v0.39.6...v0.39.7) (2018-09-23)


### Bug Fixes

* **letter:** Include `index.client` and `index.server` on `publish`. ([9ce8db4](https://github.com/randytarampi/me/commit/9ce8db4))
* **resume:** Include `index.client` and `index.server` on `publish`. ([bf9c7cf](https://github.com/randytarampi/me/commit/bf9c7cf))





<a name="0.39.6"></a>
## [0.39.6](https://github.com/randytarampi/me/compare/v0.39.5...v0.39.6) (2018-09-23)


### Bug Fixes

* **jsonresume-theme:** Need `resume-cli` in `devDependencies`. ([4871e33](https://github.com/randytarampi/me/commit/4871e33))
* **jsonresume-theme:** Need `resume-cli` in `devDependencies`. Again. ([fd6346d](https://github.com/randytarampi/me/commit/fd6346d))
* **jsx:** Resolve `PostsComponent` `DimensionsHOC` `ref` warning. ([f47ed77](https://github.com/randytarampi/me/commit/f47ed77))
* **www:** Try supporting IE8 and other ES3 environments. ([e5bfb11](https://github.com/randytarampi/me/commit/e5bfb11))


### Reverts

* fix(jsonresume-theme): Need `resume-cli` in `devDependencies`. ([bdaaa12](https://github.com/randytarampi/me/commit/bdaaa12))





<a name="0.39.5"></a>
## [0.39.5](https://github.com/randytarampi/me/compare/v0.39.4...v0.39.5) (2018-09-22)


### Bug Fixes

* **docs:** Better namespace the `ga-beacon` path. ([803878a](https://github.com/randytarampi/me/commit/803878a))
* **resume:** Split out `jsonresume-theme` from `[@randy](https://github.com/randy).tarampi/resume`. ([abf0005](https://github.com/randytarampi/me/commit/abf0005))
* **travis:** Pull `resume.*.pdf` assets from the correct package. ([b5d03f2](https://github.com/randytarampi/me/commit/b5d03f2))


### Reverts

* chore(www): Bring polyfills in before `vendor`. ([03e0d8c](https://github.com/randytarampi/me/commit/03e0d8c))





<a name="0.39.4"></a>
## [0.39.4](https://github.com/randytarampi/me/compare/v0.39.3...v0.39.4) (2018-09-22)


### Bug Fixes

* **resume:** Include `[@babel](https://github.com/babel)/polyfill` in the `resume-cli` index. ([ef85c30](https://github.com/randytarampi/me/commit/ef85c30))
* **resume:** Per ef85c30c5b2713e791e956ad408aa0d46bde53ef, `[@babel](https://github.com/babel)/polyfill` needs to be a dependency. ([93a8c70](https://github.com/randytarampi/me/commit/93a8c70))





<a name="0.39.3"></a>
## [0.39.3](https://github.com/randytarampi/me/compare/v0.39.2...v0.39.3) (2018-09-22)


### Bug Fixes

* **resume:** Add more `files` for publishing. ([9566a1b](https://github.com/randytarampi/me/commit/9566a1b))
* Rely on `prepack` to `NODE_ENV=prd npm run build`. ([6438959](https://github.com/randytarampi/me/commit/6438959))
* **resume:** Only `pack` `dist/styles.css`. ([2e5918c](https://github.com/randytarampi/me/commit/2e5918c))
* **resume:** Remove references to `config` so `jsonresume/theme-manager` can actually render `jsonresume-theme-randytarampi`. ([f5e7120](https://github.com/randytarampi/me/commit/f5e7120))





<a name="0.39.2"></a>
## [0.39.2](https://github.com/randytarampi/me/compare/v0.39.1...v0.39.2) (2018-09-22)


### Bug Fixes

* **docs:** `https://nodei.co/npm` -> `https://nodeico.herokuapp.com`. ([25a8929](https://github.com/randytarampi/me/commit/25a8929))
* **resume:** Add my own `resume-custom-content`. ([fdf5dea](https://github.com/randytarampi/me/commit/fdf5dea))
* **resume:** Don't require `config` when we're building a default resume. ([58e90d9](https://github.com/randytarampi/me/commit/58e90d9))





<a name="0.39.1"></a>
## [0.39.1](https://github.com/randytarampi/me/compare/v0.39.0...v0.39.1) (2018-09-22)

**Note:** Version bump only for package me





<a name="0.39.0"></a>
# [0.39.0](https://github.com/randytarampi/me/compare/v0.35.0...v0.39.0) (2018-09-22)


### Bug Fixes

* **letters:** Fix copy/pasta'd `letters` source directory. ([8efe337](https://github.com/randytarampi/me/commit/8efe337))
* **resume:** `ConnectedResume` only propagates `customContent` if it exists. ([3ff73ec](https://github.com/randytarampi/me/commit/3ff73ec))


### Features

* **resume:** Make `resume` publishable per [#67](https://github.com/randytarampi/me/issues/67). ([7686d58](https://github.com/randytarampi/me/commit/7686d58))





<a name="0.38.0"></a>
# [0.38.0](https://github.com/randytarampi/me/compare/v0.35.0...v0.38.0) (2018-09-22)


### Bug Fixes

* **letters:** Fix copy/pasta'd `letters` source directory. ([8efe337](https://github.com/randytarampi/me/commit/8efe337))
* **resume:** `ConnectedResume` only propagates `customContent` if it exists. ([3ff73ec](https://github.com/randytarampi/me/commit/3ff73ec))


### Features

* **resume:** Make `resume` publishable per [#67](https://github.com/randytarampi/me/issues/67). ([7686d58](https://github.com/randytarampi/me/commit/7686d58))





<a name="0.37.0"></a>
# [0.37.0](https://github.com/randytarampi/me/compare/v0.35.0...v0.37.0) (2018-09-22)


### Bug Fixes

* **letters:** Fix copy/pasta'd `letters` source directory. ([8efe337](https://github.com/randytarampi/me/commit/8efe337))
* **resume:** `ConnectedResume` only propagates `customContent` if it exists. ([3ff73ec](https://github.com/randytarampi/me/commit/3ff73ec))


### Features

* **resume:** Make `resume` publishable per [#67](https://github.com/randytarampi/me/issues/67). ([7686d58](https://github.com/randytarampi/me/commit/7686d58))





<a name="0.36.0"></a>
# [0.36.0](https://github.com/randytarampi/me/compare/v0.35.0...v0.36.0) (2018-09-21)


### Bug Fixes

* **letters:** Fix copy/pasta'd `letters` source directory. ([8efe337](https://github.com/randytarampi/me/commit/8efe337))
* **resume:** `ConnectedResume` only propagates `customContent` if it exists. ([3ff73ec](https://github.com/randytarampi/me/commit/3ff73ec))


### Features

* **resume:** Make `resume` publishable per [#67](https://github.com/randytarampi/me/issues/67). ([7686d58](https://github.com/randytarampi/me/commit/7686d58))





<a name="0.35.0"></a>
# [0.35.0](https://github.com/randytarampi/me/compare/v0.34.3...v0.35.0) (2018-09-20)


### Bug Fixes

* **package:** update react-progressive-image to version 0.5.0 ([6519622](https://github.com/randytarampi/me/commit/6519622))
* **printables:** Fix test for CI environments. ([55083f9](https://github.com/randytarampi/me/commit/55083f9))
* **resume:** Fix bad copy/replace. ([76f559b](https://github.com/randytarampi/me/commit/76f559b))
* **resume:** Restore compatibility with `resume-cli`. ([f16f759](https://github.com/randytarampi/me/commit/f16f759))
* **travis:** `IS_FORCED_RELEASE` should swallow regex test errors. ([6e07c11](https://github.com/randytarampi/me/commit/6e07c11))
* **travis:** Do the same thing when `HAS_PUBLISHABLE_CHANGES` or `IS_FORCED_RELEASE`. ([d184e73](https://github.com/randytarampi/me/commit/d184e73)), closes [#134](https://github.com/randytarampi/me/issues/134)


### Features

* **printables:** `letter` relies on `printables` to generate PDFs. ([839cfe4](https://github.com/randytarampi/me/commit/839cfe4))
* **printables:** `resume` relies on `printables` to generate PDFs. ([1fb57c4](https://github.com/randytarampi/me/commit/1fb57c4))
* **printables:** Actually add these tests. ([7dcbe63](https://github.com/randytarampi/me/commit/7dcbe63))





<a name="0.34.3"></a>
## [0.34.3](https://github.com/randytarampi/me/compare/v0.34.1...v0.34.3) (2018-09-20)

**Note:** Version bump only for package me





<a name="0.34.2"></a>
## [0.34.2](https://github.com/randytarampi/me/compare/v0.34.1...v0.34.2) (2018-09-20)

**Note:** Version bump only for package me





<a name="0.34.1"></a>
## [0.34.1](https://github.com/randytarampi/me/compare/v0.34.0...v0.34.1) (2018-09-19)


### Bug Fixes

* **posts:** Only show the first photo in a gallery, per [#133](https://github.com/randytarampi/me/issues/133). ([e2f0292](https://github.com/randytarampi/me/commit/e2f0292))
* **style:** Only bump `.post-html ul` over a bit to the right. ([11936d2](https://github.com/randytarampi/me/commit/11936d2))





<a name="0.34.0"></a>
# [0.34.0](https://github.com/randytarampi/me/compare/v0.33.2...v0.34.0) (2018-09-18)


### Features

* **posts:** Remove the long unused `local` source. ([6049a9a](https://github.com/randytarampi/me/commit/6049a9a))


### Reverts

* chore(posts): Add a `build` script. ([04e1b8e](https://github.com/randytarampi/me/commit/04e1b8e))





<a name="0.33.2"></a>
## [0.33.2](https://github.com/randytarampi/me/compare/v0.33.1...v0.33.2) (2018-09-18)


### Bug Fixes

* **css:** `words` `.post-body__text` shouldn't have any background. ([570582b](https://github.com/randytarampi/me/commit/570582b))
* **jsx:** `Post` and `Photo` dates should be on separate lines. ([b043a92](https://github.com/randytarampi/me/commit/b043a92))
* **jsx:** Display `dateCreated` as a `DATETIME_FULL`, not `DATETIME_MED`. ([7d26456](https://github.com/randytarampi/me/commit/7d26456))
* **jsx:** Display `datePublished` as a `DATE_MED`, not `DATETIME_MED`. ([c9d21c9](https://github.com/randytarampi/me/commit/c9d21c9))
* **jsx:** Display `datePublished` before `dateCreated`. ([e859651](https://github.com/randytarampi/me/commit/e859651))
* **jsx:** Fix test for change made in 94aa5e781caebbf5514130c404bd76af7dc8ff14. ([ae069c4](https://github.com/randytarampi/me/commit/ae069c4))
* **jsx:** Photo `.post-source` link points to the image page at the source. ([94aa5e7](https://github.com/randytarampi/me/commit/94aa5e7))
* **jsx:** Walk back my `dateCreated` formatting change in 7d26456b5ecd689b197fb6f209706d4eede70b91. ([afa0664](https://github.com/randytarampi/me/commit/afa0664))
* **jsx:** Words `Post`s raw HTML content should be well contained. ([c652ef4](https://github.com/randytarampi/me/commit/c652ef4))
* **posts:** Reduce `words` post text in as a string, even when it's an array. ([b554a7f](https://github.com/randytarampi/me/commit/b554a7f))





<a name="0.33.1"></a>
## [0.33.1](https://github.com/randytarampi/me/compare/v0.33.0...v0.33.1) (2018-09-18)


### Bug Fixes

* **views:** Set canonical URLs correctly. ([178d3eb](https://github.com/randytarampi/me/commit/178d3eb))





<a name="0.33.0"></a>
# [0.33.0](https://github.com/randytarampi/me/compare/v0.32.1...v0.33.0) (2018-09-18)


### Bug Fixes

* **config:** Fix bad yaml indentation. ([b76d0f7](https://github.com/randytarampi/me/commit/b76d0f7))
* Also remove these `robots.txt` references per f0049204940cc8f2b5f981397877e01739ddef07. ([47b3166](https://github.com/randytarampi/me/commit/47b3166))
* No `robots.txt` file in `resume` or `letter` after de88eec7b542bcfae3d9b89c207ae627bd27c69c. ([f004920](https://github.com/randytarampi/me/commit/f004920))
* **jsx:** Fix bad `clean` task. ([185d804](https://github.com/randytarampi/me/commit/185d804))
* **jsx:** Restore files accidentally deleted in de017fd50409f071f7dbbebf31f64b5edc33d05f. ([70c6466](https://github.com/randytarampi/me/commit/70c6466))
* **travis:** `$GITHUB_TOKEN` -> `$GH_TOKEN`. ([591083b](https://github.com/randytarampi/me/commit/591083b))
* **travis:** `local-dir` is forcibly relative, so act like it. ([2406c0a](https://github.com/randytarampi/me/commit/2406c0a)), closes [/travis-ci.org/randytarampi/me/jobs/429837240#L8963](https://github.com//travis-ci.org/randytarampi/me/jobs/429837240/issues/L8963)
* **travis:** Don't bother with `git subtree split`, just let Travis figure it out. ([277d1ea](https://github.com/randytarampi/me/commit/277d1ea))
* **travis:** Restore mistakenly deleted line in 33e294483f69f48dae1494582a812da6efdb2197. ([121f8c1](https://github.com/randytarampi/me/commit/121f8c1))


### Features

* **www:** Build sitemaps. ([b3e4823](https://github.com/randytarampi/me/commit/b3e4823))


### Reverts

* chore: Use `react-materialize@3.0.0-beta.0`. ([62289f0](https://github.com/randytarampi/me/commit/62289f0))





<a name="0.32.1"></a>
## [0.32.1](https://github.com/randytarampi/me/compare/v0.32.0...v0.32.1) (2018-09-17)


### Bug Fixes

* Try fixing iOS 6 Safari and IE<=10 brokenness by `babel`ing `libphonenumber-js`. ([9efbd31](https://github.com/randytarampi/me/commit/9efbd31))





<a name="0.32.0"></a>
# [0.32.0](https://github.com/randytarampi/me/compare/v0.31.7...v0.32.0) (2018-09-17)


### Bug Fixes

* **jsx:** `Posts` shouldn't assume we have any `posts` loaded. ([13b9e06](https://github.com/randytarampi/me/commit/13b9e06))
* Try fixing iOS 6 Safari and IE<=10 brokenness by adding `[@babel](https://github.com/babel)/plugin-transform-proto-to-assign`. ([59b4cc7](https://github.com/randytarampi/me/commit/59b4cc7))


### Features

* Add some basic structured data to our pages per [#25](https://github.com/randytarampi/me/issues/25). ([a513c63](https://github.com/randytarampi/me/commit/a513c63))





<a name="0.31.7"></a>
## [0.31.7](https://github.com/randytarampi/me/compare/v0.31.6...v0.31.7) (2018-09-16)


### Bug Fixes

* **posts:** Remove errant `"` on the `INSTAGRAM_USER_ID` definition. ([0cf85f3](https://github.com/randytarampi/me/commit/0cf85f3))





<a name="0.31.6"></a>
## [0.31.6](https://github.com/randytarampi/me/compare/v0.31.5...v0.31.6) (2018-09-16)

**Note:** Version bump only for package me





<a name="0.31.5"></a>
## [0.31.5](https://github.com/randytarampi/me/compare/v0.31.4...v0.31.5) (2018-09-16)

**Note:** Version bump only for package me





<a name="0.31.4"></a>
## [0.31.4](https://github.com/randytarampi/me/compare/v0.31.3...v0.31.4) (2018-09-16)


### Bug Fixes

* **package:** update react-progressive-image to version 0.4.0 ([6e4fb47](https://github.com/randytarampi/me/commit/6e4fb47))





<a name="0.31.3"></a>
## [0.31.3](https://github.com/randytarampi/me/compare/v0.31.2...v0.31.3) (2018-09-15)


### Bug Fixes

* **jsx:** Fix tests. ([c995543](https://github.com/randytarampi/me/commit/c995543))
* **www:** Encapsulate `Main` content in a `Container`. ([3829891](https://github.com/randytarampi/me/commit/3829891))





<a name="0.31.2"></a>
## [0.31.2](https://github.com/randytarampi/me/compare/v0.31.1...v0.31.2) (2018-09-15)


### Bug Fixes

* **jsx:** Fix bad Photo creator link. ([a7e04da](https://github.com/randytarampi/me/commit/a7e04da))





<a name="0.31.1"></a>
## [0.31.1](https://github.com/randytarampi/me/compare/v0.31.0...v0.31.1) (2018-09-15)


### Bug Fixes

* **travis:** Actually add the updated files and tag the version. ([d5c97a0](https://github.com/randytarampi/me/commit/d5c97a0))





<a name="0.30.0"></a>
# [0.30.0](https://github.com/randytarampi/me/compare/v0.29.1...v0.30.0) (2018-09-15)


### Bug Fixes

* **travis:** Prefer `git commit` instead of `npx lerna version`. ([66fd205](https://github.com/randytarampi/me/commit/66fd205))


### Features

* **letter:** Add PDF metadata per [#114](https://github.com/randytarampi/me/issues/114) and randytarampi/resume-cli#f6f8e73bed15a9817fbc4a3a22fa77affcf43fd6. ([13a1d0a](https://github.com/randytarampi/me/commit/13a1d0a)), closes [randytarampi/resume-cli#f6f8e73bed15a9817fbc4a3a22fa77affcf43fd6](https://github.com/randytarampi/resume-cli/issues/f6f8e73bed15a9817fbc4a3a22fa77affcf43fd6)
* Assert that generated PDFs actually exist. ([8e1d56b](https://github.com/randytarampi/me/commit/8e1d56b)), closes [#110](https://github.com/randytarampi/me/issues/110) [randytarampi/resume-cli#11d0b4ff48d68781addb8237faa1464d4d1a9d22](https://github.com/randytarampi/resume-cli/issues/11d0b4ff48d68781addb8237faa1464d4d1a9d22) [#110](https://github.com/randytarampi/me/issues/110)
* Assert that generated PDFs are to our expectations. ([13a81f8](https://github.com/randytarampi/me/commit/13a81f8)), closes [#106](https://github.com/randytarampi/me/issues/106) [randytarampi/resume-cli#8c1db9cdb16444eafdfc1889adb4989d0f2fe6](https://github.com/randytarampi/resume-cli/issues/8c1db9cdb16444eafdfc1889adb4989d0f2fe6) [#106](https://github.com/randytarampi/me/issues/106)





<a name="0.29.1"></a>
## [0.29.1](https://github.com/randytarampi/me/compare/v0.29.0...v0.29.1) (2018-09-14)


### Bug Fixes

* Fix tests for changes in dd64c995231941c67b1782baebc895d3e5942079. ([45b94dc](https://github.com/randytarampi/me/commit/45b94dc))
* **travis:** Explicitly define a `Test` job for each `node_js` version. ([074fb94](https://github.com/randytarampi/me/commit/074fb94))
* **travis:** Try defining the `Test` stage explicitly. ([a0acd81](https://github.com/randytarampi/me/commit/a0acd81))


### Reverts

* chore(travis): Explicitly define a `Test` stage job. ([cc313a3](https://github.com/randytarampi/me/commit/cc313a3))
* fix: Fix `.travis.yml` after f1a250f989c51373254320d46281f8d452a71992. ([c69c0bd](https://github.com/randytarampi/me/commit/c69c0bd))





<a name="0.29.0"></a>
# [0.29.0](https://github.com/randytarampi/me/compare/v0.28.0...v0.29.0) (2018-09-14)


### Features

* **config:** Pull more details about `me` into the config, per [#54](https://github.com/randytarampi/me/issues/54). ([c198fdd](https://github.com/randytarampi/me/commit/c198fdd)), closes [#25](https://github.com/randytarampi/me/issues/25)
* **config:** Rework how we configure `me.profiles`. ([6af3bed](https://github.com/randytarampi/me/commit/6af3bed)), closes [#54](https://github.com/randytarampi/me/issues/54)
* **js:** `Person` and `PostalAddress` look more like `Schema.org` entities. ([1c91b8b](https://github.com/randytarampi/me/commit/1c91b8b))
* **js:** Format phone numbers on `Person`. ([6f66508](https://github.com/randytarampi/me/commit/6f66508))
* **jsx:** Put my full mailing address in my `PrintableHeader`. ([843a959](https://github.com/randytarampi/me/commit/843a959))
* **posts:** Pull these usernames out of the top level configuration. ([d2a105e](https://github.com/randytarampi/me/commit/d2a105e)), closes [#54](https://github.com/randytarampi/me/issues/54)
* **resume:** Parse `resume.json` into a Immutable `Record`. ([6b0f4b2](https://github.com/randytarampi/me/commit/6b0f4b2)), closes [#67](https://github.com/randytarampi/me/issues/67) [#25](https://github.com/randytarampi/me/issues/25)





<a name="0.28.0"></a>
# [0.28.0](https://github.com/randytarampi/me/compare/v0.27.1...v0.28.0) (2018-09-13)


### Features

* **letter:** Redux `letter` per [#68](https://github.com/randytarampi/me/issues/68). ([1faf9f2](https://github.com/randytarampi/me/commit/1faf9f2)), closes [#69](https://github.com/randytarampi/me/issues/69) [#55](https://github.com/randytarampi/me/issues/55)





<a name="0.27.1"></a>
## [0.27.1](https://github.com/randytarampi/me/compare/v0.27.0...v0.27.1) (2018-09-13)


### Bug Fixes

* **resume:** The resume templates actually live in `/resumes`, not `/`. ([cea4edf](https://github.com/randytarampi/me/commit/cea4edf))





<a name="0.27.0"></a>
# [0.27.0](https://github.com/randytarampi/me/compare/v0.26.1...v0.27.0) (2018-09-13)


### Features

* **resume:** Redux `resume` per [#69](https://github.com/randytarampi/me/issues/69). ([10544a4](https://github.com/randytarampi/me/commit/10544a4)), closes [#67](https://github.com/randytarampi/me/issues/67) [#68](https://github.com/randytarampi/me/issues/68)





<a name="0.26.1"></a>
## [0.26.1](https://github.com/randytarampi/me/compare/v0.26.0...v0.26.1) (2018-09-12)


### Bug Fixes

* **resume:** Retain reference to `index.js` as required by `resume-cli`. ([14f9e74](https://github.com/randytarampi/me/commit/14f9e74))





<a name="0.26.0"></a>
# [0.26.0](https://github.com/randytarampi/me/compare/v0.25.4...v0.26.0) (2018-09-12)


### Bug Fixes

* **pseudoimage:** `main` should refer to the correct file. ([1c3b3da](https://github.com/randytarampi/me/commit/1c3b3da))
* **pseudolocalize:** `main` should refer to the correct file. ([f5625e7](https://github.com/randytarampi/me/commit/f5625e7))


### Features

* Close [#24](https://github.com/randytarampi/me/issues/24) and fully flesh out module's public interfaces. ([0042eda](https://github.com/randytarampi/me/commit/0042eda)), closes [#67](https://github.com/randytarampi/me/issues/67)





<a name="0.25.4"></a>
## [0.25.4](https://github.com/randytarampi/me/compare/v0.25.3...v0.25.4) (2018-09-12)


### Bug Fixes

* Travis runners need Japanese language support to render `ʕ•ᴥ•ʔﾉ゛`. ([108502b](https://github.com/randytarampi/me/commit/108502b)), closes [#107](https://github.com/randytarampi/me/issues/107) [#107](https://github.com/randytarampi/me/issues/107)
* Webpack config defers to `NODE_ENV` for `mode` definition. ([0306f1a](https://github.com/randytarampi/me/commit/0306f1a))
* **assets:** Use the same font stack from `css` for our `ʕつ•ᴥ•ʔつ`s. ([2034ba7](https://github.com/randytarampi/me/commit/2034ba7)), closes [#107](https://github.com/randytarampi/me/issues/107)
* **letter:** Give the footer a bit of room to breathe on `letter`s. ([bfbde6d](https://github.com/randytarampi/me/commit/bfbde6d)), closes [#107](https://github.com/randytarampi/me/issues/107)





<a name="0.25.3"></a>
## [0.25.3](https://github.com/randytarampi/me/compare/v0.25.2...v0.25.3) (2018-09-11)


### Bug Fixes

* **jsx:** `PrintableSection` should just be full width on mobile. ([7fa18f6](https://github.com/randytarampi/me/commit/7fa18f6))
* **resume:** Don't create a `index.html` that contains content. ([ad3344d](https://github.com/randytarampi/me/commit/ad3344d))
* **www:** Fix reference broken in a8f9a049680397e577b969b2ae5f94debf1f9237. ([4cd20ee](https://github.com/randytarampi/me/commit/4cd20ee))
* `renderJsx` before we `getRenderedHelmet` to fix [#22](https://github.com/randytarampi/me/issues/22). ([00958cd](https://github.com/randytarampi/me/commit/00958cd))
* Actually minify assets. ([19971a5](https://github.com/randytarampi/me/commit/19971a5))





<a name="0.25.2"></a>
## [0.25.2](https://github.com/randytarampi/me/compare/v0.25.1...v0.25.2) (2018-09-11)


### Bug Fixes

* **www:** Also add `letter.html` file so we don't fall on the `404.html`. ([54f5af7](https://github.com/randytarampi/me/commit/54f5af7))





<a name="0.25.1"></a>
## [0.25.1](https://github.com/randytarampi/me/compare/v0.25.0...v0.25.1) (2018-09-11)


### Bug Fixes

* **travis:** Actually build `letter` assets before running the `release`. ([3790eb3](https://github.com/randytarampi/me/commit/3790eb3))





<a name="0.25.0"></a>
# [0.25.0](https://github.com/randytarampi/me/compare/v0.24.7...v0.25.0) (2018-09-11)


### Bug Fixes

* **letter:** `puppeteer` waits for 0 network I/O before PDFing. ([edac2a4](https://github.com/randytarampi/me/commit/edac2a4))
* **letter:** Add a test for changes in f084d0153903344a4fbf1f2450fb0f098f92dc4d. ([07f07e2](https://github.com/randytarampi/me/commit/07f07e2))
* **letter:** Better default letter content. ([ef687ed](https://github.com/randytarampi/me/commit/ef687ed))
* **letter:** Fix tests for changes in f084d0153903344a4fbf1f2450fb0f098f92dc4d. ([9d0cf26](https://github.com/randytarampi/me/commit/9d0cf26))
* **resume:** Don't explode if we can't `cp` a file that doesn't exist yet. ([d74e1fb](https://github.com/randytarampi/me/commit/d74e1fb))


### Features

* **letter:** Boast about code quality per [#91](https://github.com/randytarampi/me/issues/91). ([f084d01](https://github.com/randytarampi/me/commit/f084d01))
* **letter:** Bring back the `LetterFooter`. ([118757e](https://github.com/randytarampi/me/commit/118757e))
* **www:** Start serving up a generic `letter`. ([aecbd51](https://github.com/randytarampi/me/commit/aecbd51)), closes [#55](https://github.com/randytarampi/me/issues/55) [#68](https://github.com/randytarampi/me/issues/68)





<a name="0.24.7"></a>
## [0.24.7](https://github.com/randytarampi/me/compare/v0.24.6...v0.24.7) (2018-09-10)


### Bug Fixes

* Use the proper `version` string in deployed assets. ([a23cd7b](https://github.com/randytarampi/me/commit/a23cd7b))





<a name="0.24.6"></a>
## [0.24.6](https://github.com/randytarampi/me/compare/v0.24.5...v0.24.6) (2018-09-10)


### Bug Fixes

* **css:** Fix `.printable`s for the return of Roboto. ([7386eed](https://github.com/randytarampi/me/commit/7386eed))
* **jsx:** Fix test due to change in `assetUrl`. ([d32ed7b](https://github.com/randytarampi/me/commit/d32ed7b))
* **www:** Add pages for `blog`, `photos`, `words` and `resume`. ([516f37d](https://github.com/randytarampi/me/commit/516f37d))





<a name="0.24.5"></a>
## [0.24.5](https://github.com/randytarampi/me/compare/v0.24.4...v0.24.5) (2018-09-10)


### Bug Fixes

* **package:** update materialize-css to version 1.0.0 ([5cefe80](https://github.com/randytarampi/me/commit/5cefe80))
* **package:** update materialize-css to version 1.0.0 ([f1811cb](https://github.com/randytarampi/me/commit/f1811cb))
* **package:** update materialize-css to version 1.0.0 ([5047277](https://github.com/randytarampi/me/commit/5047277))
* **styles:** Fix build for https://github.com/Dogfalo/materialize/commit/3bb2847f679b0e42f3adf4b30c04c6eb0adbbe28. ([18ad26a](https://github.com/randytarampi/me/commit/18ad26a))





<a name="0.24.4"></a>
## [0.24.4](https://github.com/randytarampi/me/compare/v0.24.3...v0.24.4) (2018-09-09)

**Note:** Version bump only for package me





<a name="0.24.3"></a>
## [0.24.3](https://github.com/randytarampi/me/compare/v0.24.2...v0.24.3) (2018-09-09)

**Note:** Version bump only for package me





<a name="0.24.2"></a>
## [0.24.2](https://github.com/randytarampi/me/compare/v0.24.1...v0.24.2) (2018-09-09)


### Bug Fixes

* **jsx:** Actually export `util` as I wanted in d09c6637d1703cc98b00297b339d2ad9faa5a5e6. ([5a9eebf](https://github.com/randytarampi/me/commit/5a9eebf))
* **letter:** Fix letter size styling. ([1d0c8de](https://github.com/randytarampi/me/commit/1d0c8de))
* **posts:** `test` (and related) scripts should fail fast, per [#59](https://github.com/randytarampi/me/issues/59). ([9099db5](https://github.com/randytarampi/me/commit/9099db5))
* **resume:** Fix legal page overflow. ([b1def0b](https://github.com/randytarampi/me/commit/b1def0b))


### Reverts

* chore(jsx): Export store decorated `shallow` and `mount`. ([027be89](https://github.com/randytarampi/me/commit/027be89))





<a name="0.24.1"></a>
## [0.24.1](https://github.com/randytarampi/me/compare/v0.24.0...v0.24.1) (2018-09-07)


### Bug Fixes

* **jsx:** Also babel-ize `bunyan-sentry-stream` for IE11 users. ([156e373](https://github.com/randytarampi/me/commit/156e373))





<a name="0.24.0"></a>
# [0.24.0](https://github.com/randytarampi/me/compare/v0.23.12...v0.24.0) (2018-09-06)


### Bug Fixes

* **resume:** Actually inline styles for resume & letter HTML. ([1e2883b](https://github.com/randytarampi/me/commit/1e2883b)), closes [#67](https://github.com/randytarampi/me/issues/67)


### Features

* **jsx:** Add more flavour to my browser logger messages. ([a730d1c](https://github.com/randytarampi/me/commit/a730d1c))





<a name="0.23.12"></a>
## [0.23.12](https://github.com/randytarampi/me/compare/v0.23.11...v0.23.12) (2018-09-06)

**Note:** Version bump only for package me





<a name="0.23.11"></a>
## [0.23.11](https://github.com/randytarampi/me/compare/v0.23.10...v0.23.11) (2018-09-05)

**Note:** Version bump only for package me





<a name="0.23.10"></a>
## [0.23.10](https://github.com/randytarampi/me/compare/v0.23.9...v0.23.10) (2018-09-05)

**Note:** Version bump only for package me





<a name="0.23.9"></a>
## [0.23.9](https://github.com/randytarampi/me/compare/v0.23.8...v0.23.9) (2018-09-05)

**Note:** Version bump only for package me





<a name="0.23.8"></a>
## [0.23.8](https://github.com/randytarampi/me/compare/v0.23.7...v0.23.8) (2018-09-04)


### Bug Fixes

* **jsx:** Add tests for some mostly stable components. Per [#12](https://github.com/randytarampi/me/issues/12). ([88abca3](https://github.com/randytarampi/me/commit/88abca3))





<a name="0.23.7"></a>
## [0.23.7](https://github.com/randytarampi/me/compare/v0.23.6...v0.23.7) (2018-09-04)

**Note:** Version bump only for package me





<a name="0.23.6"></a>
## [0.23.6](https://github.com/randytarampi/me/compare/v0.23.5...v0.23.6) (2018-09-04)


### Bug Fixes

* **jsx:** Don't overload references to `action` here. ([bca0fb3](https://github.com/randytarampi/me/commit/bca0fb3))





<a name="0.23.5"></a>
## [0.23.5](https://github.com/randytarampi/me/compare/v0.23.4...v0.23.5) (2018-09-04)


### Bug Fixes

* **jsx:** `configureLogger` should always return some kind of configuration. ([a95b896](https://github.com/randytarampi/me/commit/a95b896))





<a name="0.23.4"></a>
## [0.23.4](https://github.com/randytarampi/me/compare/v0.23.3...v0.23.4) (2018-09-03)


### Bug Fixes

* **css:** `.photo` is really just `.post--photo`. ([18dc56e](https://github.com/randytarampi/me/commit/18dc56e))
* **css:** These font urls should be in `"`s. ([731257a](https://github.com/randytarampi/me/commit/731257a))
* **views:** Don't load resources already loaded by the stylesheets twice. ([48064f3](https://github.com/randytarampi/me/commit/48064f3))





<a name="0.23.3"></a>
## [0.23.3](https://github.com/randytarampi/me/compare/v0.23.2...v0.23.3) (2018-09-03)


### Bug Fixes

* **jsx:** Fix the current location reference on the 404 page. ([0389089](https://github.com/randytarampi/me/commit/0389089))
* **jsx:** Fix these duplicated `intro-hello-bear`s in the DOM. ([5abb866](https://github.com/randytarampi/me/commit/5abb866))
* **views:** Set the `lang` on `html` to be `en`. ([a6deea4](https://github.com/randytarampi/me/commit/a6deea4)), closes [#8](https://github.com/randytarampi/me/issues/8) [#7](https://github.com/randytarampi/me/issues/7)





<a name="0.23.2"></a>
## [0.23.2](https://github.com/randytarampi/me/compare/v0.23.1...v0.23.2) (2018-09-02)


### Bug Fixes

* **jsx:** Colorize the log output. ([5722d80](https://github.com/randytarampi/me/commit/5722d80))





<a name="0.23.1"></a>
## [0.23.1](https://github.com/randytarampi/me/compare/v0.23.0...v0.23.1) (2018-09-02)


### Bug Fixes

* **posts:** `instagramAuthReturn` shouldn't be `private`. ([5b0adaf](https://github.com/randytarampi/me/commit/5b0adaf))
* **posts:** `instagramAuthReturn` shouldn't throw a 500 if you don't have a `code` in your querystring. ([8d3f7e1](https://github.com/randytarampi/me/commit/8d3f7e1))





<a name="0.23.0"></a>
# [0.23.0](https://github.com/randytarampi/me/compare/v0.22.9...v0.23.0) (2018-09-02)


### Bug Fixes

* **jsx:** Only `raven.install()` when `window.LOGGER.streams.sentry` is true. ([7551524](https://github.com/randytarampi/me/commit/7551524))


### Features

* Use bunyan for logging per [#78](https://github.com/randytarampi/me/issues/78). ([d03610b](https://github.com/randytarampi/me/commit/d03610b)), closes [#81](https://github.com/randytarampi/me/issues/81) [#81](https://github.com/randytarampi/me/issues/81)





<a name="0.22.9"></a>
## [0.22.9](https://github.com/randytarampi/me/compare/v0.22.8...v0.22.9) (2018-09-01)

**Note:** Version bump only for package me





<a name="0.22.8"></a>
## [0.22.8](https://github.com/randytarampi/me/compare/v0.22.7...v0.22.8) (2018-09-01)


### Bug Fixes

* **posts:** `initializeSources` actually calls `Object.values(sources)`. ([92a02a8](https://github.com/randytarampi/me/commit/92a02a8))





<a name="0.22.7"></a>
## [0.22.7](https://github.com/randytarampi/me/compare/v0.22.6...v0.22.7) (2018-09-01)


### Bug Fixes

* **posts:** Explicitly `initializeSources()` in order to pick up the injected secrets. ([bf6d67f](https://github.com/randytarampi/me/commit/bf6d67f))





<a name="0.22.6"></a>
## [0.22.6](https://github.com/randytarampi/me/compare/v0.22.5...v0.22.6) (2018-09-01)

**Note:** Version bump only for package me





<a name="0.22.5"></a>
## [0.22.5](https://github.com/randytarampi/me/compare/v0.22.4...v0.22.5) (2018-09-01)


### Bug Fixes

* **posts:** `initializedSources` is actually a Promised array. ([30dd336](https://github.com/randytarampi/me/commit/30dd336))





<a name="0.22.4"></a>
## [0.22.4](https://github.com/randytarampi/me/compare/v0.22.3...v0.22.4) (2018-08-31)

**Note:** Version bump only for package me





<a name="0.22.3"></a>
## [0.22.3](https://github.com/randytarampi/me/compare/v0.22.2...v0.22.3) (2018-08-31)


### Bug Fixes

* **jsx:** Forgotten reference to `getSizedPhoto`. ([f65b3bf](https://github.com/randytarampi/me/commit/f65b3bf))
* **jsx:** I actually meant `getSizedPhotoForDisplay` here. ([9b10a4c](https://github.com/randytarampi/me/commit/9b10a4c))





<a name="0.22.2"></a>
## [0.22.2](https://github.com/randytarampi/me/compare/v0.22.1...v0.22.2) (2018-08-31)


### Bug Fixes

* **js:** `Photo#getSizedPhoto` -> `Photo#getSizedPhotoForDisplay`. ([01d270f](https://github.com/randytarampi/me/commit/01d270f))
* **www:** Make the `.loading` state greyer. ([2f249bd](https://github.com/randytarampi/me/commit/2f249bd))
* **www:** Seems like scrolling is a lot smoother if we load a bunch more photos. ([0d2178e](https://github.com/randytarampi/me/commit/0d2178e))





<a name="0.22.1"></a>
## [0.22.1](https://github.com/randytarampi/me/compare/v0.22.0...v0.22.1) (2018-08-31)


### Bug Fixes

* **posts:** Increase posts table read/write capacity to 4 units. ([140cc3d](https://github.com/randytarampi/me/commit/140cc3d))
* **posts:** It's totally unnecessary for these cron tasks to fail and post to the DLQ. ([fba81d0](https://github.com/randytarampi/me/commit/fba81d0))


### Reverts

* fix(posts): It's totally unnecessary for these cron tasks to fail and post to the DLQ. ([2dc1306](https://github.com/randytarampi/me/commit/2dc1306))





<a name="0.22.0"></a>
# [0.22.0](https://github.com/randytarampi/me/compare/v0.21.0...v0.22.0) (2018-08-31)


### Bug Fixes

* **js:** `SizedPhoto.fromJSON` needs to deserialize `width` and `height` back into numbers. ([439c728](https://github.com/randytarampi/me/commit/439c728))
* **posts:** `createPosts` returns `Post`s via a scan instead of `batchGet`. ([ac2f74d](https://github.com/randytarampi/me/commit/ac2f74d))
* **posts:** `parseQueryStringParametersIntoSearchParams` should call `SearchParams.fromJSON`. ([dec61fb](https://github.com/randytarampi/me/commit/dec61fb))
* **posts:** Bump the DynamoDB throughput since we're running up against the limit during caching operations. ([c01064b](https://github.com/randytarampi/me/commit/c01064b))
* **posts:** Instagram `allPostsGetter` passes an id into `beforeId`. ([5c10ac6](https://github.com/randytarampi/me/commit/5c10ac6))
* **posts:** Reduce posts table read/write capacity units to 1 and 4 respectively. ([b9b9940](https://github.com/randytarampi/me/commit/b9b9940))
* **posts:** Unsplash `sizedPhotos` don't actually specify a height, only a max width. ([9edd69c](https://github.com/randytarampi/me/commit/9edd69c))


### Features

* **jsx:** Add some low rent progressive image loading. ([ed43977](https://github.com/randytarampi/me/commit/ed43977))





<a name="0.21.0"></a>
# [0.21.0](https://github.com/randytarampi/me/compare/v0.20.6...v0.21.0) (2018-08-31)


### Bug Fixes

* **posts:** Actually load *all* Posts from each service. ([6e7511f](https://github.com/randytarampi/me/commit/6e7511f)), closes [#73](https://github.com/randytarampi/me/issues/73)


### Features

* **posts:** Sketch out a generic solution to pulling *all* posts at once. ([9491412](https://github.com/randytarampi/me/commit/9491412)), closes [#73](https://github.com/randytarampi/me/issues/73)





<a name="0.20.6"></a>
## [0.20.6](https://github.com/randytarampi/me/compare/v0.20.5...v0.20.6) (2018-08-31)


### Bug Fixes

* **jsx:** More working around jankiness loading `Post`s. ([184b88c](https://github.com/randytarampi/me/commit/184b88c))





<a name="0.20.5"></a>
## [0.20.5](https://github.com/randytarampi/me/compare/v0.20.4...v0.20.5) (2018-08-30)


### Bug Fixes

* **jsx:** Work around jankiness loading `Post`s. ([f13cdca](https://github.com/randytarampi/me/commit/f13cdca)), closes [#70](https://github.com/randytarampi/me/issues/70)





<a name="0.20.4"></a>
## [0.20.4](https://github.com/randytarampi/me/compare/v0.20.3...v0.20.4) (2018-08-29)


### Bug Fixes

* **jsx:** Load `Posts` in a smoother fashion. ([1086499](https://github.com/randytarampi/me/commit/1086499)), closes [#70](https://github.com/randytarampi/me/issues/70)
* **jsx:** Try closing [#70](https://github.com/randytarampi/me/issues/70) again by setting a hardcoded `infiniteLoadBeginEdgeOffset`. ([9093bb1](https://github.com/randytarampi/me/commit/9093bb1))


### Reverts

* revert: fix(jsx): Use my fork of `react-dimensions` to close [#70](https://github.com/randytarampi/me/issues/70). ([77a6726](https://github.com/randytarampi/me/commit/77a6726))





<a name="0.20.3"></a>
## [0.20.3](https://github.com/randytarampi/me/compare/v0.20.2...v0.20.3) (2018-08-29)


### Reverts

* fix(jsx): Use my fork of `react-dimensions` to close [#70](https://github.com/randytarampi/me/issues/70). ([f257166](https://github.com/randytarampi/me/commit/f257166))





<a name="0.20.2"></a>
## [0.20.2](https://github.com/randytarampi/me/compare/v0.20.1...v0.20.2) (2018-08-29)


### Bug Fixes

* **jsx:** Suppress `data-metrics-value` value type warning. ([b983743](https://github.com/randytarampi/me/commit/b983743)), closes [#70](https://github.com/randytarampi/me/issues/70)
* **jsx:** Suppress `div` inside `p` warning. ([9877b67](https://github.com/randytarampi/me/commit/9877b67)), closes [#70](https://github.com/randytarampi/me/issues/70)
* **jsx:** Use my fork of `react-dimensions` to close [#70](https://github.com/randytarampi/me/issues/70). ([97d5c53](https://github.com/randytarampi/me/commit/97d5c53))





<a name="0.20.1"></a>
## [0.20.1](https://github.com/randytarampi/me/compare/v0.20.0...v0.20.1) (2018-08-28)


### Bug Fixes

* **jsx:** `ʕ•ᴥ•ʔ nose bonking` composes an email in the same window. ([cdf4c8f](https://github.com/randytarampi/me/commit/cdf4c8f)), closes [#17](https://github.com/randytarampi/me/issues/17)





<a name="0.20.0"></a>
# [0.20.0](https://github.com/randytarampi/me/compare/v0.19.6...v0.20.0) (2018-08-28)


### Bug Fixes

* **config:** Use the correct GTM container ID in `dev`. ([5187475](https://github.com/randytarampi/me/commit/5187475))
* **jsx:** `Emoji` opt-in to `react-metrics` declarative tracking. ([dab0748](https://github.com/randytarampi/me/commit/dab0748))
* **jsx:** JSX tests also define a JSDOM `global.document`. ([fbd50d7](https://github.com/randytarampi/me/commit/fbd50d7))
* **jsx:** Resolve install warning about not having "sinon" in "devDependencies". ([76d4a75](https://github.com/randytarampi/me/commit/76d4a75))
* **posts:** Resolve forgotten reference to `widthSorter`. ([1f34c90](https://github.com/randytarampi/me/commit/1f34c90))
* **www:** Fix copy/pasta on the home page. ([1ad1a03](https://github.com/randytarampi/me/commit/1ad1a03))


### Features

* **jsx:** Reduxify `ʕ•ᴥ•ʔ`s. ([8726f68](https://github.com/randytarampi/me/commit/8726f68)), closes [#16](https://github.com/randytarampi/me/issues/16)
* **www:** Also link to merch. ([f160d0d](https://github.com/randytarampi/me/commit/f160d0d))





<a name="0.19.6"></a>
## [0.19.6](https://github.com/randytarampi/me/compare/v0.19.5...v0.19.6) (2018-08-28)

**Note:** Version bump only for package me





<a name="0.19.5"></a>
## [0.19.5](https://github.com/randytarampi/me/compare/v0.19.4...v0.19.5) (2018-08-27)

**Note:** Version bump only for package me





<a name="0.19.4"></a>
## [0.19.4](https://github.com/randytarampi/me/compare/v0.19.3...v0.19.4) (2018-08-27)


### Bug Fixes

* **js:** Remove logging from 4929399324197924b18f52085043607c8365a84f. ([4c62e5c](https://github.com/randytarampi/me/commit/4c62e5c))





<a name="0.19.3"></a>
## [0.19.3](https://github.com/randytarampi/me/compare/v0.19.2...v0.19.3) (2018-08-27)


### Bug Fixes

* **js:** `getEntityForType` shouldn't rely on class names in the switch/case. ([4929399](https://github.com/randytarampi/me/commit/4929399))





<a name="0.19.2"></a>
## [0.19.2](https://github.com/randytarampi/me/compare/v0.19.1...v0.19.2) (2018-08-27)


### Bug Fixes

* **posts:** Build a new `POSTS_DYNAMODB_TABLE` for the schema changes in [#62](https://github.com/randytarampi/me/issues/62). ([0bb2412](https://github.com/randytarampi/me/commit/0bb2412))





<a name="0.19.1"></a>
## [0.19.1](https://github.com/randytarampi/me/compare/v0.19.0...v0.19.1) (2018-08-27)


### Bug Fixes

* **pseudoimage:** ESLint. ([4f6892b](https://github.com/randytarampi/me/commit/4f6892b))
* **pseudoimage:** Fix broken `p7eImage` and `p7eImages` bin scripts. ([2957d75](https://github.com/randytarampi/me/commit/2957d75)), closes [#12](https://github.com/randytarampi/me/issues/12)
* **pseudolocalize:** Fix broken `p7e` bin script. ([5368926](https://github.com/randytarampi/me/commit/5368926)), closes [#12](https://github.com/randytarampi/me/issues/12)





<a name="0.19.0"></a>
# [0.19.0](https://github.com/randytarampi/me/compare/v0.18.4...v0.19.0) (2018-08-27)


### Bug Fixes

* Correct the `babelLoaderExclusions` to include the trailing `/`. ([02f87ab](https://github.com/randytarampi/me/commit/02f87ab))
* Fix babel compilation error introduced in fa27adc5979eb8f9194a6e0e69becf7be909808e. ([6f3f865](https://github.com/randytarampi/me/commit/6f3f865))
* Prefer babel's `minify-replace` over webpack's `DefinePlugin`. ([fa27adc](https://github.com/randytarampi/me/commit/fa27adc))
* **jsx:** Fix broken 404 pages. ([18847d0](https://github.com/randytarampi/me/commit/18847d0))
* **jsx:** Fix broken navigation introduced with 595b9ca9931f59043cf7b7e634d5309f2c3c7daf ([a7f4d23](https://github.com/randytarampi/me/commit/a7f4d23))
* **jsx:** Fix tests broken in 595b9ca9931f59043cf7b7e634d5309f2c3c7daf and 7b1e95342ee61fe33c972bb6090f446429eb84b3. ([b353a00](https://github.com/randytarampi/me/commit/b353a00))
* **jsx:** Prioritize `Post.datePublished` over `Post.dateCreated`. ([539d54e](https://github.com/randytarampi/me/commit/539d54e))
* **jsx:** Reduce immutables into the `routing` state's subtree. ([ffb399c](https://github.com/randytarampi/me/commit/ffb399c))
* **posts:** Parse flickr response's `datetaken` property properly. ([ecdb1ea](https://github.com/randytarampi/me/commit/ecdb1ea))


### Features

* **jsx:** Automagically show the error page when we encounter an error. ([7b1e953](https://github.com/randytarampi/me/commit/7b1e953))





<a name="0.18.4"></a>
## [0.18.4](https://github.com/randytarampi/me/compare/v0.18.3...v0.18.4) (2018-08-26)

**Note:** Version bump only for package me





<a name="0.18.3"></a>
## [0.18.3](https://github.com/randytarampi/me/compare/v0.18.2...v0.18.3) (2018-08-25)


### Bug Fixes

* **jsx:** Actually hookup `react-metrics` for pageview and link tracking. ([cb0c774](https://github.com/randytarampi/me/commit/cb0c774))





<a name="0.18.2"></a>
## [0.18.2](https://github.com/randytarampi/me/compare/v0.18.1...v0.18.2) (2018-08-24)


### Bug Fixes

* **posts:** Update the `dynamodb` install directory for `dynamodb-localhost`. ([749097e](https://github.com/randytarampi/me/commit/749097e))





<a name="0.18.1"></a>
## [0.18.1](https://github.com/randytarampi/me/compare/v0.18.0...v0.18.1) (2018-08-24)


### Bug Fixes

* User facing URLs should be `https`, and rooted at `www.randytarampi.ca`. ([f3ee4ea](https://github.com/randytarampi/me/commit/f3ee4ea))
* **jsx:** Fix dangling `?` on `CampaignLink` when there are no query parameters. ([e3ab68d](https://github.com/randytarampi/me/commit/e3ab68d))
* **posts:** Fix the `cover` script. ([129efe6](https://github.com/randytarampi/me/commit/129efe6)), closes [#53](https://github.com/randytarampi/me/issues/53)
* **resume:** `manipulaion` -> `manipulation`. ([86954f2](https://github.com/randytarampi/me/commit/86954f2))
* **travis:** Also `git add $RESUME_PACKAGE_DIR/resume.json`. ([f9ea71c](https://github.com/randytarampi/me/commit/f9ea71c))
* **travis:** Run `git status` before we `lerna version`. ([6074cb3](https://github.com/randytarampi/me/commit/6074cb3)), closes [/travis-ci.org/randytarampi/me/jobs/420159417#L8233](https://github.com//travis-ci.org/randytarampi/me/jobs/420159417/issues/L8233)





<a name="0.18.0"></a>
# [0.18.0](https://github.com/randytarampi/me/compare/v0.17.1...v0.18.0) (2018-08-24)


### Bug Fixes

* **jsx:** `InternalLink`s' `onClick` calls `e.preventDefault()`. ([a9465e2](https://github.com/randytarampi/me/commit/a9465e2))
* **jsx:** 404 page gives you the option to click through to `redirectionLocation`. ([71aa676](https://github.com/randytarampi/me/commit/71aa676))
* **jsx:** Address `InternalLink` prop types warning. ([5d0b868](https://github.com/randytarampi/me/commit/5d0b868))
* **resume:** `.resume-section__label`s should be a bit bigger. ([d4ef2f1](https://github.com/randytarampi/me/commit/d4ef2f1))
* **resume:** `.resume-section`s should expand on mobile. ([9070599](https://github.com/randytarampi/me/commit/9070599))
* **resume:** `Volunteer` -> `Volunteering` ([282f3ab](https://github.com/randytarampi/me/commit/282f3ab))
* Also `[@babel](https://github.com/babel)/register` query-string, strip-ansi, ansi-regex, etc. ([bcde2ad](https://github.com/randytarampi/me/commit/bcde2ad))
* Centralize most of the webpack configuration. ([9e44bb4](https://github.com/randytarampi/me/commit/9e44bb4))
* **resume:** Fix style building regression introduced in 02a3e11b1cd92b965d74d4a1dfaf0900d8771938. ([a8c7442](https://github.com/randytarampi/me/commit/a8c7442))
* **resume:** Give the Volunteering section a description. ([b19e81d](https://github.com/randytarampi/me/commit/b19e81d))
* **resume:** Need to `npx resume export --force`. ([2e81e1e](https://github.com/randytarampi/me/commit/2e81e1e)), closes [#46](https://github.com/randytarampi/me/issues/46) [jsonresume/resume-schema#v1](https://github.com/jsonresume/resume-schema/issues/v1)
* **resume:** Polish off the Project section. ([02a3e11](https://github.com/randytarampi/me/commit/02a3e11)), closes [#25](https://github.com/randytarampi/me/issues/25)


### Features

* **resume:** Add a `Projects` section. ([35e66a7](https://github.com/randytarampi/me/commit/35e66a7)), closes [#46](https://github.com/randytarampi/me/issues/46)
* **resume:** Add a `volunteer` section, if only for [#12](https://github.com/randytarampi/me/issues/12). ([ce647f5](https://github.com/randytarampi/me/commit/ce647f5))
* **resume:** Add PDF resume link tracking via a `CampaignLink`. ([0547bd5](https://github.com/randytarampi/me/commit/0547bd5)), closes [#19](https://github.com/randytarampi/me/issues/19)





<a name="0.17.1"></a>
## [0.17.1](https://github.com/randytarampi/me/compare/v0.17.0...v0.17.1) (2018-08-23)


### Bug Fixes

* **posts:** Fix naked the `*` in the serverless configuration yaml. ([c6d16d2](https://github.com/randytarampi/me/commit/c6d16d2))
* **posts:** Fix the CORS configuration for the `ME-API-VERSION` header. ([e279233](https://github.com/randytarampi/me/commit/e279233))





<a name="0.17.0"></a>
# [0.17.0](https://github.com/randytarampi/me/compare/v0.16.5...v0.17.0) (2018-08-23)


### Bug Fixes

* **posts:** Fix Unsplash API query parameters. ([602c37f](https://github.com/randytarampi/me/commit/602c37f))
* **posts:** Header parsing should be case-insensitive. ([6d5a22d](https://github.com/randytarampi/me/commit/6d5a22d))
* **posts:** Make `SearchParams.orderBy` more explicit. ([618e7dd](https://github.com/randytarampi/me/commit/618e7dd))
* **views:** Actually pass GTM the correct data layer variable name. ([4efb0da](https://github.com/randytarampi/me/commit/4efb0da))


### Features

* **jsx:** Use the version 2 `get(Posts|Photos|Words)` API. ([ee00df7](https://github.com/randytarampi/me/commit/ee00df7)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15) [randytarampi/me.photos#11](https://github.com/randytarampi/me.photos/issues/11) [randytarampi/me.words#1](https://github.com/randytarampi/me.words/issues/1)
* **posts:** Add a version 2 `get(Posts|Photos|Words)` response. ([b771479](https://github.com/randytarampi/me/commit/b771479)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15) [randytarampi/me.photos#11](https://github.com/randytarampi/me.photos/issues/11) [randytarampi/me.words#1](https://github.com/randytarampi/me.words/issues/1)





<a name="0.16.5"></a>
## [0.16.5](https://github.com/randytarampi/me/compare/v0.16.4...v0.16.5) (2018-08-23)


### Bug Fixes

* **resume:** `resume-section__content` uses all 9 available columns on medium and large screens. ([5f331ab](https://github.com/randytarampi/me/commit/5f331ab))
* **resume:** Don't dangle a second, blank page when printed on US Letter. ([9272476](https://github.com/randytarampi/me/commit/9272476))





<a name="0.16.4"></a>
## [0.16.4](https://github.com/randytarampi/me/compare/v0.16.3...v0.16.4) (2018-08-23)


### Bug Fixes

* **www:** Load `query-string` and other modules using babel. ([41ec9b4](https://github.com/randytarampi/me/commit/41ec9b4))





<a name="0.16.3"></a>
## [0.16.3](https://github.com/randytarampi/me/compare/v0.16.2...v0.16.3) (2018-08-23)


### Bug Fixes

* **views:** Actually pass GTM the correct data layer variable name. ([b786c97](https://github.com/randytarampi/me/commit/b786c97))





<a name="0.16.2"></a>
## [0.16.2](https://github.com/randytarampi/me/compare/v0.16.1...v0.16.2) (2018-08-21)

**Note:** Version bump only for package me





<a name="0.16.1"></a>
## [0.16.1](https://github.com/randytarampi/me/compare/v0.16.0...v0.16.1) (2018-08-20)


### Bug Fixes

* **bin:** Fix location references in `bin/` scripts. ([ee7e35c](https://github.com/randytarampi/me/commit/ee7e35c))
* **jsx:** `clearError` on `@[@router](https://github.com/router)/LOCATION_CHANGE`. ([730d75e](https://github.com/randytarampi/me/commit/730d75e))
* **jsx:** Don't pass `InternalLinkInternal` an `href` otherwise it gets propagated down to the `<a/>`. ([2523308](https://github.com/randytarampi/me/commit/2523308))
* **jsx:** Fix the link to my resume off the main page. ([7e598bf](https://github.com/randytarampi/me/commit/7e598bf))
* **travis:** Just cache all the `packages/**/node_modules` directories. ([7496f4d](https://github.com/randytarampi/me/commit/7496f4d)), closes [/travis-ci.org/randytarampi/me/jobs/418342476#L518](https://github.com//travis-ci.org/randytarampi/me/jobs/418342476/issues/L518)
* **travis:** Just cache nothing and always run `postinstall`. ([2763235](https://github.com/randytarampi/me/commit/2763235))


### Features

* **bin:** Pull out the `clean` script into an actual shell script. ([46d1db8](https://github.com/randytarampi/me/commit/46d1db8))


### Performance Improvements

* **travis:** Modularize `bin/bootstrap.sh` and only call the necessary bits for speed. ([579e225](https://github.com/randytarampi/me/commit/579e225))





<a name="0.16.0"></a>
# [0.16.0](https://github.com/randytarampi/me/compare/v0.15.0...v0.16.0) (2018-08-20)


### Bug Fixes

* **jsx:** `.bear`s should be sized in `rem`s, not `pt`. ([19bc067](https://github.com/randytarampi/me/commit/19bc067))
* **jsx:** `clearError` on the `timedRedirect`. ([d71eb7a](https://github.com/randytarampi/me/commit/d71eb7a))
* **jsx:** Fix `.loading-spinner` regression introduced in 4876717388754113e12cbfa4f1239b77e54601cd. ([e067f2d](https://github.com/randytarampi/me/commit/e067f2d))
* **jsx:** Make `.error__message--header`s look like headers. ([e1a8923](https://github.com/randytarampi/me/commit/e1a8923))
* **jsx:** Per 3ddb39d855a34a9b756091c6b90286465ab2db89, fix `.loading-spinner` centering. ([4876717](https://github.com/randytarampi/me/commit/4876717))
* **posts:** `getPosts` actually returns the `limit`ed number of `Post`s. ([b7c43f1](https://github.com/randytarampi/me/commit/b7c43f1)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15)
* **posts:** `orderCompartor` -> `orderComparator`. ([370fc99](https://github.com/randytarampi/me/commit/370fc99))
* **posts:** `Post` model queries support `limit`s. ([c0794ef](https://github.com/randytarampi/me/commit/c0794ef)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15)
* **posts:** `posts` depends on `immutable`. ([dba7db9](https://github.com/randytarampi/me/commit/dba7db9)), closes [#23](https://github.com/randytarampi/me/issues/23)
* **posts:** Fix `cachedPostsGetter` and `cachedPostGetter` implementations. ([0bded4e](https://github.com/randytarampi/me/commit/0bded4e))
* **posts:** Pull results out of the cache in descending order. ([48242e8](https://github.com/randytarampi/me/commit/48242e8))
* **posts:** Use a separate `POSTS_DYNAMODB_TABLE` per my note in [#49](https://github.com/randytarampi/me/issues/49). ([ad3c88d](https://github.com/randytarampi/me/commit/ad3c88d))
* **travis:** `www` `dev` job still needs to build assets. ([9745993](https://github.com/randytarampi/me/commit/9745993))
* **travis:** Need one last force push to `resume` before we can stop. ([cb1d41d](https://github.com/randytarampi/me/commit/cb1d41d))
* **www:** Fix error centering on mobile. ([3ddb39d](https://github.com/randytarampi/me/commit/3ddb39d))


### Features

* **posts:** `DataSource`s now assume `getPost` is passed `SearchParams`. ([092e0bb](https://github.com/randytarampi/me/commit/092e0bb))
* **posts:** `get(Photos|Posts|Words)` lambdas pull directly from the cache. ([7d678ec](https://github.com/randytarampi/me/commit/7d678ec))
* **posts:** Add some HTTP triggers to populate the cache. ([a6fad56](https://github.com/randytarampi/me/commit/a6fad56))
* **posts:** Fix Dynamoose ranged `SearchParams`. ([3c51a15](https://github.com/randytarampi/me/commit/3c51a15)), closes [randytarampi/me.photos#11](https://github.com/randytarampi/me.photos/issues/11) [randytarampi/me.words#1](https://github.com/randytarampi/me.words/issues/1)
* **posts:** If we can't create a Dynamoose query object, just assume it's a filter object for a scan. ([d24859f](https://github.com/randytarampi/me/commit/d24859f))
* **www:** Add a 500 page while I'm here. ([5effd9d](https://github.com/randytarampi/me/commit/5effd9d)), closes [#49](https://github.com/randytarampi/me/issues/49)
* **www:** If we try and load posts but don't have any, serve up a nice message telling them to come back later. ([c4769fe](https://github.com/randytarampi/me/commit/c4769fe)), closes [#49](https://github.com/randytarampi/me/issues/49)


### Reverts

* feat(posts): Add some HTTP triggers to populate the cache. ([6b4d643](https://github.com/randytarampi/me/commit/6b4d643))





<a name="0.15.0"></a>
# [0.15.0](https://github.com/randytarampi/me/compare/v0.14.3...v0.15.0) (2018-08-19)


### Bug Fixes

* **travis:** Commit release artifacts before running `lerna version`. ([d1b3784](https://github.com/randytarampi/me/commit/d1b3784))
* **travis:** Need to run `resume` to build resume assets. ([f7ad7aa](https://github.com/randytarampi/me/commit/f7ad7aa)), closes [/travis-ci.org/randytarampi/me/jobs/417992648#L8059](https://github.com//travis-ci.org/randytarampi/me/jobs/417992648/issues/L8059)


### Features

* **sentry:** Upload sentry artifacts for `dev` builds. ([508cff4](https://github.com/randytarampi/me/commit/508cff4))





<a name="0.14.3"></a>
## [0.14.3](https://github.com/randytarampi/me/compare/v0.14.2...v0.14.3) (2018-08-19)


### Bug Fixes

* **letter:** Set the `renderHtml` test timeout at 60 seconds. ([e251059](https://github.com/randytarampi/me/commit/e251059))
* **resume:** Set the `renderHtml` test timeout at 60 seconds. ([be4c8fa](https://github.com/randytarampi/me/commit/be4c8fa))





<a name="0.14.2"></a>
## [0.14.2](https://github.com/randytarampi/me/compare/v0.14.1...v0.14.2) (2018-08-18)


### Bug Fixes

* **posts:** Caching functions have 60 second timeouts. ([dc61d81](https://github.com/randytarampi/me/commit/dc61d81))
* **posts:** Don't warm the caching functions. ([c3cc53c](https://github.com/randytarampi/me/commit/c3cc53c))





<a name="0.14.1"></a>
## [0.14.1](https://github.com/randytarampi/me/compare/v0.14.0...v0.14.1) (2018-08-18)


### Performance Improvements

* **posts:** Don't waste time sorting photos we're caching. ([3d5bf96](https://github.com/randytarampi/me/commit/3d5bf96))





<a name="0.14.0"></a>
# [0.14.0](https://github.com/randytarampi/me/compare/v0.13.1...v0.14.0) (2018-08-18)


### Features

* **posts:** Keep the cache warm – pull once every hour. ([41729f1](https://github.com/randytarampi/me/commit/41729f1))





<a name="0.13.1"></a>
## [0.13.1](https://github.com/randytarampi/me/compare/v0.13.0...v0.13.1) (2018-08-18)


### Bug Fixes

* **posts:** Fix lambda execution role permissions. ([1a0be84](https://github.com/randytarampi/me/commit/1a0be84))





<a name="0.13.0"></a>
# [0.13.0](https://github.com/randytarampi/me/compare/v0.12.1...v0.13.0) (2018-08-17)


### Bug Fixes

* **posts:** Remove an errant `'` from `serverless.yml`. ([eea5899](https://github.com/randytarampi/me/commit/eea5899))


### Features

* **posts:** Use `serverless-plugin-warmup` for the `get*` lambdas. ([1646ace](https://github.com/randytarampi/me/commit/1646ace))





<a name="0.12.1"></a>
## [0.12.1](https://github.com/randytarampi/me/compare/v0.12.0...v0.12.1) (2018-08-17)


### Bug Fixes

* `clean` script should also clean the monorepo root. ([685674e](https://github.com/randytarampi/me/commit/685674e))
* **ci:** `lerna changed` returns an error code if there are no changes, so just swallow that and proceed. ([7d4df26](https://github.com/randytarampi/me/commit/7d4df26))
* **posts:** `getPosts` lambda should handle errors in `configureEnvironment`. ([9af7dfe](https://github.com/randytarampi/me/commit/9af7dfe))
* **travis:** Fix release versioning where lerna doesn't detect changes. ([a477437](https://github.com/randytarampi/me/commit/a477437)), closes [#40](https://github.com/randytarampi/me/issues/40)





<a name="0.12.0"></a>
# [0.12.0](https://github.com/randytarampi/me/compare/v0.11.3...v0.12.0) (2018-08-17)


### Bug Fixes

* **ci:** Just use `lerna run` to run `cover` and `test` where appropriate. ([81be267](https://github.com/randytarampi/me/commit/81be267))
* **letter:** ESLint. ([d4190c9](https://github.com/randytarampi/me/commit/d4190c9))
* **posts:** `npm run pretest:dynamodb-local` right before `cover`/`test`. ([d87fe02](https://github.com/randytarampi/me/commit/d87fe02))
* **posts:** Pull Instagram photos at full(er) size. ([408e8ea](https://github.com/randytarampi/me/commit/408e8ea)), closes [randytarampi/me.photos#12](https://github.com/randytarampi/me.photos/issues/12)
* **posts:** Restore other non-Instagram `PhotoSource`s. ([66a8dd7](https://github.com/randytarampi/me/commit/66a8dd7))
* **resume:** Need to use express to serve static assets for puppeteer. ([467d142](https://github.com/randytarampi/me/commit/467d142)), closes [/github.com/GoogleChrome/puppeteer/issues/1643#issuecomment-353387148](https://github.com//github.com/GoogleChrome/puppeteer/issues/1643/issues/issuecomment-353387148)


### Features

* **letter:** Copy/pasta from `resume` to build `letter`s. ([f31bdf7](https://github.com/randytarampi/me/commit/f31bdf7))
* **letter:** Support multiple letters. ([8fb717a](https://github.com/randytarampi/me/commit/8fb717a)), closes [#23](https://github.com/randytarampi/me/issues/23) [#25](https://github.com/randytarampi/me/issues/25)
* **letter:** The `Letter` configuration supports random JSX content sections. ([cf2558f](https://github.com/randytarampi/me/commit/cf2558f))
* **views:** Add `[@randy](https://github.com/randy).tarampi/views` because all this pug duplication is gross. ([0309dd4](https://github.com/randytarampi/me/commit/0309dd4))





<a name="0.11.3"></a>
## [0.11.3](https://github.com/randytarampi/me/compare/v0.11.2...v0.11.3) (2018-08-15)


### Bug Fixes

* **jsx:** `Error` should actually respect the `redirectionTimeout`. ([194a806](https://github.com/randytarampi/me/commit/194a806))
* **posts:** Use a 24 hour TTL on the Posts table until I push the cron task to refresh the cache. ([2b8b1e9](https://github.com/randytarampi/me/commit/2b8b1e9))





<a name="0.11.2"></a>
## [0.11.2](https://github.com/randytarampi/me/compare/v0.11.1...v0.11.2) (2018-08-15)


### Bug Fixes

* **www:** Link on the home page sends a text instead of trying to call. ([1f014bd](https://github.com/randytarampi/me/commit/1f014bd))
* **www:** Link on the home page sends an email with some text content. ([fc3d306](https://github.com/randytarampi/me/commit/fc3d306))





<a name="0.11.1"></a>
## [0.11.1](https://github.com/randytarampi/me/compare/v0.11.0...v0.11.1) (2018-08-15)


### Bug Fixes

* **posts:** `me.service.client` throws when it receives unexpected responses. ([b86f8e2](https://github.com/randytarampi/me/commit/b86f8e2)), closes [#39](https://github.com/randytarampi/me/issues/39)
* **posts:** Give the lambda role permissions on the subresources of the `POSTS_DYNAMODB_TABLE` ([1d8ea47](https://github.com/randytarampi/me/commit/1d8ea47)), closes [#38](https://github.com/randytarampi/me/issues/38)
* **posts:** Use serverless-dynamodb-local@0.2.30. ([8d5468d](https://github.com/randytarampi/me/commit/8d5468d)), closes [#36](https://github.com/randytarampi/me/issues/36)





<a name="0.11.0"></a>
# [0.11.0](https://github.com/randytarampi/me/compare/v0.10.9...v0.11.0) (2018-08-14)


### Bug Fixes

* **resume:** Make the page breaks on A4 and Letter consistent. ([ac5ba1d](https://github.com/randytarampi/me/commit/ac5ba1d))


### Features

* **resume:** Show at least 3 bullet points under work on all pages. ([9d0d75b](https://github.com/randytarampi/me/commit/9d0d75b))





<a name="0.10.9"></a>
## [0.10.9](https://github.com/randytarampi/me/compare/v0.10.8...v0.10.9) (2018-08-12)


### Bug Fixes

* **resume:** Add a link to the US Legal size resume. ([635f635](https://github.com/randytarampi/me/commit/635f635))





<a name="0.10.8"></a>
## [0.10.8](https://github.com/randytarampi/me/compare/v0.10.7...v0.10.8) (2018-08-12)


### Bug Fixes

* **resume:** Fix the font loading issue outlined in [#32](https://github.com/randytarampi/me/issues/32). ([2c49c8c](https://github.com/randytarampi/me/commit/2c49c8c)), closes [/github.com/jsonresume/resume-cli/pull/275/files#diff-823940eea875d5b77bcbe2aa2595b14bR84](https://github.com//github.com/jsonresume/resume-cli/pull/275/files/issues/diff-823940eea875d5b77bcbe2aa2595b14bR84)


### Reverts

* fix(resume): Effectively walk back the change in fbb5a85af94ec3e25c5efed9b16b6d64bcc11dcf. ([317f3c1](https://github.com/randytarampi/me/commit/317f3c1))





<a name="0.10.7"></a>
## [0.10.7](https://github.com/randytarampi/me/compare/v0.10.6...v0.10.7) (2018-08-11)


### Bug Fixes

* **resume:** Remove extra `resume.json` schema configuration. ([03b6aec](https://github.com/randytarampi/me/commit/03b6aec)), closes [#5](https://github.com/randytarampi/me/issues/5)





<a name="0.10.6"></a>
## [0.10.6](https://github.com/randytarampi/me/compare/v0.10.5...v0.10.6) (2018-08-11)


### Bug Fixes

* **resume:** Effectively walk back the change in fbb5a85af94ec3e25c5efed9b16b6d64bcc11dcf. ([9d77b78](https://github.com/randytarampi/me/commit/9d77b78))





<a name="0.10.5"></a>
## [0.10.5](https://github.com/randytarampi/me/compare/v0.10.4...v0.10.5) (2018-08-11)


### Bug Fixes

* **resume:** See if these responsive print styles render on the Travis boxes. ([fbb5a85](https://github.com/randytarampi/me/commit/fbb5a85))





<a name="0.10.4"></a>
## [0.10.4](https://github.com/randytarampi/me/compare/v0.10.3...v0.10.4) (2018-08-11)


### Bug Fixes

* **www:** Fix `Intro` styles. ([f68225f](https://github.com/randytarampi/me/commit/f68225f))





<a name="0.10.3"></a>
## [0.10.3](https://github.com/randytarampi/me/compare/v0.10.2...v0.10.3) (2018-08-11)


### Bug Fixes

* **jsx:** Actually pass `props` through to the `renderRoutes` call. ([1398ea8](https://github.com/randytarampi/me/commit/1398ea8))
* **resume:** Fix `ResumeSection`'s `id` attribute. ([9564b9d](https://github.com/randytarampi/me/commit/9564b9d))
* **resume:** Fix `ResumeWork` section description. ([d6851e7](https://github.com/randytarampi/me/commit/d6851e7))





<a name="0.10.2"></a>
## [0.10.2](https://github.com/randytarampi/me/compare/v0.10.1...v0.10.2) (2018-08-11)


### Bug Fixes

* **resume:** Fix mangled Pulse Energy summary. ([167ca53](https://github.com/randytarampi/me/commit/167ca53))





<a name="0.10.1"></a>
## [0.10.1](https://github.com/randytarampi/me/compare/v0.10.0...v0.10.1) (2018-08-10)


### Bug Fixes

* **resume:** Fix the alignment on `.resume-header__address`. ([6a078bc](https://github.com/randytarampi/me/commit/6a078bc))





<a name="0.10.0"></a>
# [0.10.0](https://github.com/randytarampi/me/compare/v0.9.1...v0.10.0) (2018-08-10)


### Bug Fixes

* **jsx:** Correct the `AngelList` link `serviceUrl`. ([a53f6e7](https://github.com/randytarampi/me/commit/a53f6e7))


### Features

* **resume:** Add a couple more profile links to my resume. ([667a63f](https://github.com/randytarampi/me/commit/667a63f))





<a name="0.9.1"></a>
## [0.9.1](https://github.com/randytarampi/me/compare/v0.9.0...v0.9.1) (2018-08-10)


### Bug Fixes

* **www:** `.loading-spinner` should be centered. ([3edede9](https://github.com/randytarampi/me/commit/3edede9))





<a name="0.9.0"></a>
# [0.9.0](https://github.com/randytarampi/me/compare/v0.8.2...v0.9.0) (2018-08-10)


### Bug Fixes

* **js:** Add `[@randy](https://github.com/randy).tarampi/js` as a dependency of `www`. ([6629226](https://github.com/randytarampi/me/commit/6629226))
* **posts:** `${self:provider.service}` -> `${self:service}`. ([027e3a4](https://github.com/randytarampi/me/commit/027e3a4))
* **posts:** `kill` should send `TERM` not `-9`. ([a3b88e0](https://github.com/randytarampi/me/commit/a3b88e0))
* **posts:** `npx lerna run pretest` -> `npx lerna exec -- npm run pretest`. ([0e55b95](https://github.com/randytarampi/me/commit/0e55b95))
* **posts:** `Post` model integration tests timeout after 60s. ([0dcbbd4](https://github.com/randytarampi/me/commit/0dcbbd4))
* **posts:** `sleep 3` before/after starting `dynamodb-local` if we're in a CI environment. ([2da0612](https://github.com/randytarampi/me/commit/2da0612))
* **posts:** Actually set values for the  `stage` and `service_name` tags in Sentry logs. ([34fe591](https://github.com/randytarampi/me/commit/34fe591))
* **posts:** Actually use the `dynamodb-local` installed by `posts`. ([11904d1](https://github.com/randytarampi/me/commit/11904d1))
* **posts:** Add dummy AWS credentials for `dynamoose` in `NODE_ENV=test`. ([1dda518](https://github.com/randytarampi/me/commit/1dda518))
* **posts:** Add test coverage for the `PhotoSource`s. ([e0e50ec](https://github.com/randytarampi/me/commit/e0e50ec)), closes [#12](https://github.com/randytarampi/me/issues/12)
* **posts:** Add test coverage for the `S3` and `Tumblr` `WordSource`s. ([f703f60](https://github.com/randytarampi/me/commit/f703f60)), closes [#12](https://github.com/randytarampi/me/issues/12)
* **posts:** And also symlink `dynamodb-localhost` into `posts`. ([825e393](https://github.com/randytarampi/me/commit/825e393))
* **posts:** Bleh. Remove extraneous `-` from the `kill` command. ([94dc454](https://github.com/randytarampi/me/commit/94dc454))
* **posts:** Does `java` exist at all? ([a9b64d6](https://github.com/randytarampi/me/commit/a9b64d6))
* **posts:** Don't kill the entire `dynamodb-local` process group. ([f8b4869](https://github.com/randytarampi/me/commit/f8b4869))
* **posts:** Don't log `info` and `debug` events to Sentry. ([988b2a8](https://github.com/randytarampi/me/commit/988b2a8))
* **posts:** Don't wait for `dynamodb-local` to start. ([84e1657](https://github.com/randytarampi/me/commit/84e1657))
* **posts:** Ensure that we're always `configureEnvironment` before running lambdas. ([5cbd9a0](https://github.com/randytarampi/me/commit/5cbd9a0))
* **posts:** Fix bad bash expression. ([ee530a3](https://github.com/randytarampi/me/commit/ee530a3))
* **posts:** Fix the individual packaging of our serverless functions. ([cdc0c12](https://github.com/randytarampi/me/commit/cdc0c12))
* **posts:** Give the serverless role `dynamodb:*` permissions on `POSTS_DYNAMODB_TABLE`. ([9afc298](https://github.com/randytarampi/me/commit/9afc298))
* **posts:** Make the `(Post|Word)Source` tests integration tests. ([67479b1](https://github.com/randytarampi/me/commit/67479b1))
* **posts:** Maybe dynamodb-local needs a bit of time to spin up? ([1c62357](https://github.com/randytarampi/me/commit/1c62357))
* **posts:** Prefix this path to a jar with `./`. ([cc3cafd](https://github.com/randytarampi/me/commit/cc3cafd))
* **posts:** Troubleshoot Travis build failure. ([77dbbc8](https://github.com/randytarampi/me/commit/77dbbc8))
* **resume:** Push my resume into line with my LinkedIn and other profiles. ([0fae1a4](https://github.com/randytarampi/me/commit/0fae1a4))
* **travis:** Add `addons.hosts[0] = "dynamodb-local"` to `.travis.yml`. ([cba139f](https://github.com/randytarampi/me/commit/cba139f)), closes [/github.com/4front/dynamodb/blob/master/.travis.yml#L14](https://github.com//github.com/4front/dynamodb/blob/master/.travis.yml/issues/L14)
* **travis:** Avoid `lerna run` and use `lerna exec -- npm run` instead. ([5cd4ec7](https://github.com/randytarampi/me/commit/5cd4ec7))


### Features

* **ci:** Deploy branch work to `dev`. ([d52113f](https://github.com/randytarampi/me/commit/d52113f))
* **posts:** `CachedDataSource`s only hit the service when they miss the cache. ([901755c](https://github.com/randytarampi/me/commit/901755c))
* **posts:** Actually hook up `(Photo|Word)Source`s to the cache. ([dc0935d](https://github.com/randytarampi/me/commit/dc0935d))
* **posts:** Actually make sure we're returning `Post`s from the cache. ([f278d9b](https://github.com/randytarampi/me/commit/f278d9b))
* **posts:** Add a `CachedDataSource` to be used by `PhotoSource` and `WordSource`. ([4b34388](https://github.com/randytarampi/me/commit/4b34388))
* **posts:** Add in a DynamoDB persistence (caching) layer for `Post`s. ([44538c3](https://github.com/randytarampi/me/commit/44538c3)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15) [randytarampi/me.photos#11](https://github.com/randytarampi/me.photos/issues/11) [randytarampi/me.words#1](https://github.com/randytarampi/me.words/issues/1)
* **www:** Add a 404 page. ([ecd0a00](https://github.com/randytarampi/me/commit/ecd0a00)), closes [#28](https://github.com/randytarampi/me/issues/28)


### Reverts

* fix(posts): `kill` should send `TERM` not `-9`. ([8e86a15](https://github.com/randytarampi/me/commit/8e86a15))
* fix(posts): `sleep 3` before/after starting `dynamodb-local` if we're in a CI environment. ([9be4c00](https://github.com/randytarampi/me/commit/9be4c00))
* fix(posts): Does `java` exist at all? ([1336d4b](https://github.com/randytarampi/me/commit/1336d4b))





<a name="0.8.2"></a>
## [0.8.2](https://github.com/randytarampi/me/compare/v0.8.1...v0.8.2) (2018-08-08)


### Bug Fixes

* **jsx:** `.post-body` should infer `p` children. ([6c8d072](https://github.com/randytarampi/me/commit/6c8d072))
* **jsx:** Don't duplicate `Post.body` text when `Post.body` is an `Array`. ([0d10271](https://github.com/randytarampi/me/commit/0d10271))





<a name="0.8.1"></a>
## [0.8.1](https://github.com/randytarampi/me/compare/v0.8.0...v0.8.1) (2018-08-08)

**Note:** Version bump only for package me





<a name="0.8.0"></a>
# [0.8.0](https://github.com/randytarampi/me/compare/v0.7.0...v0.8.0) (2018-08-08)


### Bug Fixes

* **resume:** Resume footer full screen on tablets. ([1e53d97](https://github.com/randytarampi/me/commit/1e53d97))
* **resume:** Use `é`s consistently. ([0626d60](https://github.com/randytarampi/me/commit/0626d60))
* **www:** No `overflow-x: hidden` on `.block__bear`. ([b1ce86b](https://github.com/randytarampi/me/commit/b1ce86b))


### Features

* **www:** Cleanup responsive styles per random tourist feedback. ([cfad368](https://github.com/randytarampi/me/commit/cfad368))
* **www:** Do the whole SEO thing because a random CV writer told me to. ([ece11fd](https://github.com/randytarampi/me/commit/ece11fd))





<a name="0.7.0"></a>
# [0.7.0](https://github.com/randytarampi/me/compare/v0.6.8...v0.7.0) (2018-08-08)


### Features

* **resume:** Add print instructions on the web version of the Resume. ([7fa9e74](https://github.com/randytarampi/me/commit/7fa9e74))





<a name="0.6.8"></a>
## [0.6.8](https://github.com/randytarampi/me/compare/v0.6.7...v0.6.8) (2018-08-07)


### Bug Fixes

* **resume:** Replace `&emdash;` with `&mdash;`. ([1c75ab7](https://github.com/randytarampi/me/commit/1c75ab7))





<a name="0.6.7"></a>
## [0.6.7](https://github.com/randytarampi/me/compare/v0.6.6...v0.6.7) (2018-08-07)


### Bug Fixes

* **resume:** Actually turn `&mdash;` into an `–`. ([42ab42b](https://github.com/randytarampi/me/commit/42ab42b))





<a name="0.6.6"></a>
## [0.6.6](https://github.com/randytarampi/me/compare/v0.6.5...v0.6.6) (2018-08-07)


### Bug Fixes

* **resume:** `preferrably` -> `preferably` ([a37c6cc](https://github.com/randytarampi/me/commit/a37c6cc))





<a name="0.6.5"></a>
## [0.6.5](https://github.com/randytarampi/me/compare/v0.6.4...v0.6.5) (2018-08-06)


### Bug Fixes

* **resume:** Disable puppeteer's sandbox on the Travis boxes. ([7c7dc37](https://github.com/randytarampi/me/commit/7c7dc37))


### Reverts

* fix(resume): Enable `puppeteer` to run on the Travis boxes. ([6937694](https://github.com/randytarampi/me/commit/6937694)), closes [randytarampi/resume-cli#bcae057aa7864e688c14902d980fb1ae14cca9](https://github.com/randytarampi/resume-cli/issues/bcae057aa7864e688c14902d980fb1ae14cca9)





<a name="0.6.4"></a>
## [0.6.4](https://github.com/randytarampi/me/compare/v0.6.3...v0.6.4) (2018-08-04)


### Bug Fixes

* **posts:** Fix bad `INSTAGRAM_AUTH_REDIRECT_URI` configuration. ([afe5d99](https://github.com/randytarampi/me/commit/afe5d99))
* **resume:** Enable `puppeteer` to run on the Travis boxes. ([eea60ff](https://github.com/randytarampi/me/commit/eea60ff)), closes [/github.com/GoogleChrome/puppeteer/issues/2674#issuecomment-394678881](https://github.com//github.com/GoogleChrome/puppeteer/issues/2674/issues/issuecomment-394678881)





<a name="0.6.3"></a>
## [0.6.3](https://github.com/randytarampi/me/compare/v0.6.2...v0.6.3) (2018-08-04)


### Bug Fixes

* **resume:** Fix `resume` deployment steps by copying over the correct files. ([f92e9d8](https://github.com/randytarampi/me/commit/f92e9d8))
* **resume:** Hide the `.row` containing `.resume-section__description`. ([dc34cc3](https://github.com/randytarampi/me/commit/dc34cc3))





<a name="0.6.2"></a>
## [0.6.2](https://github.com/randytarampi/me/compare/v0.6.1...v0.6.2) (2018-08-04)


### Bug Fixes

* **www:** Fix client side page titles. ([946b7d3](https://github.com/randytarampi/me/commit/946b7d3)), closes [#22](https://github.com/randytarampi/me/issues/22)





<a name="0.6.1"></a>
## [0.6.1](https://github.com/randytarampi/me/compare/v0.6.0...v0.6.1) (2018-08-04)


### Bug Fixes

* **css:** Give `css` an npm `build` script. ([32aeb9b](https://github.com/randytarampi/me/commit/32aeb9b))
* **travis:** `after_install` is actually `before_script`. ([29d2711](https://github.com/randytarampi/me/commit/29d2711))
* **travis:** Fix broken deploy caused by e812d8a914397280b80406e365f274b8297173cd. ([1c38756](https://github.com/randytarampi/me/commit/1c38756))
* **www:** Hack around the fontawesome font copying issue. ([e812d8a](https://github.com/randytarampi/me/commit/e812d8a)), closes [#21](https://github.com/randytarampi/me/issues/21)
* **www:** More missing fontawesome font diagnosis per 58bd1331292461641c03805be47db84e91f04f51. ([fea25c8](https://github.com/randytarampi/me/commit/fea25c8))
* **www:** More missing fontawesome font diagnosis per 6b7c37f39cd7239ae29e0fedd92ead8074e1fba9. ([58bd133](https://github.com/randytarampi/me/commit/58bd133))





<a name="0.6.0"></a>
# [0.6.0](https://github.com/randytarampi/me/compare/v0.5.1...v0.6.0) (2018-08-03)


### Bug Fixes

* **config:** `*AppUrl`s are just relative in `prd` and `dev`. ([4302ee6](https://github.com/randytarampi/me/commit/4302ee6))
* **config:** Actually point to `dev.randytarampi.ca` in `dev`. ([e6b84bb](https://github.com/randytarampi/me/commit/e6b84bb))
* **resume:** Push the `small-screen` breakpoint back `6px` to facilitate printing on A4. ([5141d96](https://github.com/randytarampi/me/commit/5141d96)), closes [#18](https://github.com/randytarampi/me/issues/18)
* **travis:** Attempt to diagnose the missing fontawesome files in `www/docs`. ([9ecc5fa](https://github.com/randytarampi/me/commit/9ecc5fa))
* **travis:** More fontawesome diagnosis per e8c886bbc5d3b1d959ec84088c3d0604cf40137a. ([beb9d65](https://github.com/randytarampi/me/commit/beb9d65))
* **www:** `dev` deploy sets the `CNAME` to `dev.randytarampi.ca`. ([a6bf3fc](https://github.com/randytarampi/me/commit/a6bf3fc))
* **www:** More missing fontawesome font diagnosis per 9ecc5fabca9151ca8564e7c0f55411861c4f8486. ([e8c886b](https://github.com/randytarampi/me/commit/e8c886b))
* **www:** More missing fontawesome font diagnosis per ae8b63d46850ce58cda03381bccd5a4a27f23323. ([6b7c37f](https://github.com/randytarampi/me/commit/6b7c37f))
* **www:** More missing fontawesome font diagnosis per beb9d65dace168f7a207d7e9442e449339dbf844. ([ae8b63d](https://github.com/randytarampi/me/commit/ae8b63d))


### Features

* **resume:** Pass some `RESUME_PDF_SIZE` so we can generate US Letter and A4 pdfs on builds. ([79bfdba](https://github.com/randytarampi/me/commit/79bfdba)), closes [#18](https://github.com/randytarampi/me/issues/18)





<a name="0.5.1"></a>
## [0.5.1](https://github.com/randytarampi/me/compare/v0.5.0...v0.5.1) (2018-08-03)


### Bug Fixes

* **resume:** Point people to `http://www.randytarampi.ca/resume`. ([023c0b9](https://github.com/randytarampi/me/commit/023c0b9)), closes [#11](https://github.com/randytarampi/me/issues/11)


### Features

* **travis:** Also need to change the travis stage names on the jobs. ([1d80079](https://github.com/randytarampi/me/commit/1d80079))
* **travis:** Do what I wanted in 13ac4c3a00775c9112bb6ec12ec38df8b3ca1808. ([bf39d05](https://github.com/randytarampi/me/commit/bf39d05))
* **travis:** Try and push to a `dev` environment on `Deploy` off `master.` ([13ac4c3](https://github.com/randytarampi/me/commit/13ac4c3)), closes [#14](https://github.com/randytarampi/me/issues/14)





<a name="0.5.0"></a>
# [0.5.0](https://github.com/randytarampi/me/compare/v0.4.0...v0.5.0) (2018-08-03)


### Bug Fixes

* **travis:** Fix the `resume` deploy issue I thought I addressed in 9bdaa4f4f0adb6d0c3beca183cc52b478ceb6e07. ([6f27c3d](https://github.com/randytarampi/me/commit/6f27c3d))


### Features

* **jsx:** Handle the HTML returned in tumblr photo captions. ([177a9d9](https://github.com/randytarampi/me/commit/177a9d9)), closes [#12](https://github.com/randytarampi/me/issues/12) [randytarampi/me.photos#17](https://github.com/randytarampi/me.photos/issues/17)
* **jsx:** Make all links open in new windows. ([6df20cd](https://github.com/randytarampi/me/commit/6df20cd)), closes [randytarampi/me.photos#8](https://github.com/randytarampi/me.photos/issues/8)





<a name="0.4.0"></a>
# [0.4.0](https://github.com/randytarampi/me/compare/v0.3.2...v0.4.0) (2018-08-03)


### Bug Fixes

* **resume:** Hack around travis for now and just add index.* assets myself. ([46c3332](https://github.com/randytarampi/me/commit/46c3332))
* **resume:** Make `resume` generate decent `Letter` sized PDFs. ([accdfb0](https://github.com/randytarampi/me/commit/accdfb0))
* **resume:** The `resume` pug template pulls in external fontawesome CSS. ([9db0dc1](https://github.com/randytarampi/me/commit/9db0dc1))
* **travis:** Actually copy assets to the `www` and `resume` root directories on deploy. ([28f4421](https://github.com/randytarampi/me/commit/28f4421))
* **travis:** Attempt to fix the `jsonresume-theme` linking issue. ([9ee9021](https://github.com/randytarampi/me/commit/9ee9021)), closes [/travis-ci.org/randytarampi/me/jobs/411045659#L610](https://github.com//travis-ci.org/randytarampi/me/jobs/411045659/issues/L610)


### Features

* **favicon:** Add a variety of favicons. ([0552c1f](https://github.com/randytarampi/me/commit/0552c1f))
* **resume:** Try and fill in the left hand label columns. ([a8d7eea](https://github.com/randytarampi/me/commit/a8d7eea))





<a name="0.3.2"></a>
## [0.3.2](https://github.com/randytarampi/me/compare/v0.3.1...v0.3.2) (2018-08-01)


### Bug Fixes

* **travis:** Actually do what I wanted in 5399301cad4ec69e56f6052a49efc41ca05a6ba4. ([9bdaa4f](https://github.com/randytarampi/me/commit/9bdaa4f))





<a name="0.3.1"></a>
## [0.3.1](https://github.com/randytarampi/me/compare/v0.3.0...v0.3.1) (2018-08-01)


### Bug Fixes

* **travis:** Actually copy assets to the `www` and `resume` root directories on deploy. ([5399301](https://github.com/randytarampi/me/commit/5399301))





<a name="0.3.0"></a>
# [0.3.0](https://github.com/randytarampi/me/compare/v0.2.0...v0.3.0) (2018-08-01)


### Bug Fixes

* **webpack:** Take another shot at fixing webpack HMR. ([12186d6](https://github.com/randytarampi/me/commit/12186d6))
* **www:** Fix Webpack HMR configuration. ([8184b02](https://github.com/randytarampi/me/commit/8184b02))


### Features

* **jsx:** Add a `ServerReduxRoot` that mirrors `ClientReduxRoot`. ([fb04cc1](https://github.com/randytarampi/me/commit/fb04cc1))
* **resume:** Use react SSR instead of handlebars. ([c6f6ae6](https://github.com/randytarampi/me/commit/c6f6ae6))
* **www:** Make `resume` available at https://www.randytarampi.ca/resume. ([faf278c](https://github.com/randytarampi/me/commit/faf278c))


### Performance Improvements

* **ci:** Only `npm rebuild lwip` when we need to. ([ae933e7](https://github.com/randytarampi/me/commit/ae933e7))





<a name="0.2.0"></a>
# [0.2.0](https://github.com/randytarampi/me/compare/v0.1.11...v0.2.0) (2018-07-30)


### Bug Fixes

* **css:** Fix the pulling in of `css` assets during builds. ([d3c270d](https://github.com/randytarampi/me/commit/d3c270d))
* **resume:** Avoid circular dependency by restoring these to be `devDependencies`. ([cd504db](https://github.com/randytarampi/me/commit/cd504db))


### Features

* **css:** Better mobile friendly CSS. ([b34b7c4](https://github.com/randytarampi/me/commit/b34b7c4))
* **css:** Better print friendly CSS. ([20517cf](https://github.com/randytarampi/me/commit/20517cf))
* **css:** Style `resume` with my own `css`. ([cf1c122](https://github.com/randytarampi/me/commit/cf1c122))





<a name="0.1.11"></a>
## [0.1.11](https://github.com/randytarampi/me/compare/v0.1.10...v0.1.11) (2018-07-28)


### Bug Fixes

* **travis:** Only release if the type of build is a `push`. ([6cc775f](https://github.com/randytarampi/me/commit/6cc775f))
* **webpack:** The commit env variable in Travis land is `TRAVIS_COMMIT`. ([e32f8ea](https://github.com/randytarampi/me/commit/e32f8ea))
* **www:** Don't require babel to parse `webpack.config.js`. ([3a778c6](https://github.com/randytarampi/me/commit/3a778c6))





<a name="0.1.10"></a>
## [0.1.10](https://github.com/randytarampi/me/compare/v0.1.9...v0.1.10) (2018-07-28)


### Bug Fixes

* Use `webpack-sentry-plugin` instead of `[@sentry](https://github.com/sentry)/webpack-plugin`. ([5522bab](https://github.com/randytarampi/me/commit/5522bab))
* **travis:** Actually commit updated html templates from `docs` in `www`. ([a424b05](https://github.com/randytarampi/me/commit/a424b05))
* **travis:** Only build `docs` for `www` on deploy. ([e7146ff](https://github.com/randytarampi/me/commit/e7146ff))





<a name="0.1.9"></a>
## [0.1.9](https://github.com/randytarampi/me/compare/v0.1.8...v0.1.9) (2018-07-28)


### Bug Fixes

* **posts:** Don't require babel to parse `webpack.serverless.config.js`. ([211934c](https://github.com/randytarampi/me/commit/211934c))





<a name="0.1.8"></a>
## [0.1.8](https://github.com/randytarampi/me/compare/v0.1.7...v0.1.8) (2018-07-28)


### Bug Fixes

* **www:** Actually move the built `html` files into the root directory. ([36da20f](https://github.com/randytarampi/me/commit/36da20f))





<a name="0.1.7"></a>
## [0.1.7](https://github.com/randytarampi/me/compare/v0.1.6...v0.1.7) (2018-07-28)


### Bug Fixes

* **travis:** `web` deploy shouldn't push the tag but the current HEAD. ([c9b5ad6](https://github.com/randytarampi/me/commit/c9b5ad6))
* ESLint. ([c123802](https://github.com/randytarampi/me/commit/c123802))





<a name="0.1.6"></a>
## [0.1.6](https://github.com/randytarampi/me/compare/v0.1.5...v0.1.6) (2018-07-28)


### Bug Fixes

* **travis:** Actually force push to `randytarampi/me#gh-pages`. ([4be6ff0](https://github.com/randytarampi/me/commit/4be6ff0))





<a name="0.1.5"></a>
## [0.1.5](https://github.com/randytarampi/me/compare/v0.1.4...v0.1.5) (2018-07-28)


### Bug Fixes

* **split:** Define `MONOREPO_ROOT` correctly. ([a904edd](https://github.com/randytarampi/me/commit/a904edd))
* **travis:** Need to chain a `git subtree split` to a `git push` for `--force`. ([af392e1](https://github.com/randytarampi/me/commit/af392e1))





<a name="0.1.4"></a>
## [0.1.4](https://github.com/randytarampi/me/compare/v0.1.3...v0.1.4) (2018-07-28)


### Bug Fixes

* **travis:** `git subtree push` doesn't support `--force`. ([35a2d05](https://github.com/randytarampi/me/commit/35a2d05))
* **travis:** Only `Add assets for $TRAVIS_TAG.` when there are changes. ([ae9feb5](https://github.com/randytarampi/me/commit/ae9feb5))





<a name="0.1.3"></a>
## [0.1.3](https://github.com/randytarampi/me/compare/v0.1.2...v0.1.3) (2018-07-28)


### Bug Fixes

* **travis:** `npm run coveralls` `after_script`. ([acad55e](https://github.com/randytarampi/me/commit/acad55e))
* **travis:** Don't include `$TRAVIS_BUILD_DIR` in the `subtree push --prefix`. ([34f8f83](https://github.com/randytarampi/me/commit/34f8f83))
* **travis:** Only `Add assets for $TRAVIS_TAG.` when there are changes. ([a776ed4](https://github.com/randytarampi/me/commit/a776ed4))





<a name="0.1.2"></a>
## [0.1.2](https://github.com/randytarampi/me/compare/v0.1.1...v0.1.2) (2018-07-28)


### Bug Fixes

* **travis:** Force push `www` to `gh-pages`. ([03ba8d6](https://github.com/randytarampi/me/commit/03ba8d6))
* **travis:** Only add `resume/index.html` and `resume/index.pdf` on Deploy. ([85820e3](https://github.com/randytarampi/me/commit/85820e3))





<a name="0.1.1"></a>
## [0.1.1](https://github.com/randytarampi/me/compare/v0.1.0...v0.1.1) (2018-07-28)


### Bug Fixes

* **travis:** Push to `gh-pages`, not `HEAD:gh-pages`. ([a5fd5a3](https://github.com/randytarampi/me/commit/a5fd5a3))
* **travis:** Refer to the correct, `split.sh` script on `resume` deploy. ([918f931](https://github.com/randytarampi/me/commit/918f931))





<a name="0.1.0"></a>
# [0.1.0](https://github.com/randytarampi/me/compare/v0.0.11...v0.1.0) (2018-07-28)


### Features

* **resume:** Add the terribly formatted PDF version. ([affba10](https://github.com/randytarampi/me/commit/affba10))
* **resume:** Push `resume` to randytarampi/me.resume. ([134be22](https://github.com/randytarampi/me/commit/134be22))
* **www:** Push `www` to randytarampi/me#gh-pages instead of randytarampi/randytarampi.github.io. ([81fd36a](https://github.com/randytarampi/me/commit/81fd36a))





<a name="0.0.11"></a>
## [0.0.11](https://github.com/randytarampi/me/compare/v0.0.10...v0.0.11) (2018-07-27)


### Bug Fixes

* **Travis:** Add the correct `www` assets. ([3be8101](https://github.com/randytarampi/me/commit/3be8101))





<a name="0.0.10"></a>
## [0.0.10](https://github.com/randytarampi/me/compare/v0.0.9...v0.0.10) (2018-07-27)


### Bug Fixes

* **www:** Only build and add assets on `Deploy`. ([0131302](https://github.com/randytarampi/me/commit/0131302))
* **www:** This is actually `[@randy](https://github.com/randy).tarampi/www`. ([7a7991b](https://github.com/randytarampi/me/commit/7a7991b))





<a name="0.0.9"></a>
## [0.0.9](https://github.com/randytarampi/me/compare/v0.0.8...v0.0.9) (2018-07-27)


### Bug Fixes

* **Travis:** Need Sentry credentials to push build artifacts. ([7757b57](https://github.com/randytarampi/me/commit/7757b57))





<a name="0.0.8"></a>
## [0.0.8](https://github.com/randytarampi/me/compare/v0.0.7...v0.0.8) (2018-07-27)


### Bug Fixes

* **bootstrap:** Link `resume` at the top level in order to fix `npm run build`. ([964fecd](https://github.com/randytarampi/me/commit/964fecd))
* **Travis:** Need AWS credentials to push lambda releases. ([eb6091f](https://github.com/randytarampi/me/commit/eb6091f))





<a name="0.0.7"></a>
## [0.0.7](https://github.com/randytarampi/me/compare/v0.0.6...v0.0.7) (2018-07-27)

**Note:** Version bump only for package me





<a name="0.0.6"></a>
## 0.0.6 (2018-07-27)

**Note:** Version bump only for package me
