# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.13.3](https://github.com/randytarampi/me/compare/v2.13.2...v2.13.3) (2019-01-14)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.13.2](https://github.com/randytarampi/me/compare/v2.13.1...v2.13.2) (2019-01-14)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.13.1](https://github.com/randytarampi/me/compare/v2.13.0...v2.13.1) (2019-01-14)

**Note:** Version bump only for package @randy.tarampi/letter





# 2.13.0 (2019-01-14)


### Bug Fixes

* **package:** update exiftool-vendored to version 7.6.0 ([698e7d7](https://github.com/randytarampi/me/commit/698e7d7))





## [2.12.4](https://github.com/randytarampi/me/compare/v2.12.3...v2.12.4) (2018-12-29)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.12.3](https://github.com/randytarampi/me/compare/v2.12.2...v2.12.3) (2018-12-27)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.12.2](https://github.com/randytarampi/me/compare/v2.12.1...v2.12.2) (2018-12-27)


### Bug Fixes

* Don't include the ESM builds when we webpack the `pug` templates. ([59e7e34](https://github.com/randytarampi/me/commit/59e7e34))





## [2.12.1](https://github.com/randytarampi/me/compare/v2.12.0...v2.12.1) (2018-12-26)


### Bug Fixes

* Only copy the required `[@randy](https://github.com/randy).tarampi/assets/web` for the `NODE_ENV`. ([71bde2a](https://github.com/randytarampi/me/commit/71bde2a))





# [2.12.0](https://github.com/randytarampi/me/compare/v2.11.5...v2.12.0) (2018-12-24)


### Bug Fixes

* `html-webpack-plugin` needs to `excludeChunks` like `vendor` and `styles`. ([916d4ea](https://github.com/randytarampi/me/commit/916d4ea))
* Let `[@babel](https://github.com/babel)/preset-env` figure out which polyfills to load. ([57c2f90](https://github.com/randytarampi/me/commit/57c2f90))





## [2.11.5](https://github.com/randytarampi/me/compare/v2.11.4...v2.11.5) (2018-12-22)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.11.4](https://github.com/randytarampi/me/compare/v2.11.3...v2.11.4) (2018-12-16)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.11.3](https://github.com/randytarampi/me/compare/v2.11.2...v2.11.3) (2018-12-16)


### Bug Fixes

* **jsx:** Rejig `Error` and `ErrorWrapper` so `PostsComponent`, `ResumeComponent` and `LetterComponent` can display _specific_ errors of their own. ([083bfc9](https://github.com/randytarampi/me/commit/083bfc9))


### Performance Improvements

* **jsx:** These `Component`s can actually be `PureComponent`s. ([4cd2fde](https://github.com/randytarampi/me/commit/4cd2fde))





## [2.11.2](https://github.com/randytarampi/me/compare/v2.11.1...v2.11.2) (2018-12-15)


### Bug Fixes

* **printables:** Back to using puppeteer^1.11.0. ([cb4dffb](https://github.com/randytarampi/me/commit/cb4dffb))





## [2.11.1](https://github.com/randytarampi/me/compare/v2.11.0...v2.11.1) (2018-12-15)


### Bug Fixes

* **printables:** Roll back to puppeteer~1.10.0, since PDF generation failed silently with puppeteer^1.11.0. ([f7177cd](https://github.com/randytarampi/me/commit/f7177cd))





# [2.11.0](https://github.com/randytarampi/me/compare/v2.10.6...v2.11.0) (2018-12-14)


### Bug Fixes

* **printable:** Pass along `printableTemplatePath`. ([71f2732](https://github.com/randytarampi/me/commit/71f2732))





## [2.10.6](https://github.com/randytarampi/me/compare/v2.10.5...v2.10.6) (2018-12-13)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.10.5](https://github.com/randytarampi/me/compare/v2.10.4...v2.10.5) (2018-12-13)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.10.4](https://github.com/randytarampi/me/compare/v2.10.3...v2.10.4) (2018-12-13)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.10.3](https://github.com/randytarampi/me/compare/v2.10.2...v2.10.3) (2018-12-13)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.10.2](https://github.com/randytarampi/me/compare/v2.10.1...v2.10.2) (2018-12-12)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.10.1](https://github.com/randytarampi/me/compare/v2.10.0...v2.10.1) (2018-12-12)


### Bug Fixes

* **jsx:** Fix `materialize-css` test setup. ([fbf64ed](https://github.com/randytarampi/me/commit/fbf64ed))





# [2.10.0](https://github.com/randytarampi/me/compare/v2.8.1...v2.10.0) (2018-12-12)


### Bug Fixes

* **jsx:** Expect consumers of `[@randy](https://github.com/randy).tarampi/jsx` to bring their own `jquery` and `materialize-css`. ([f7b989c](https://github.com/randytarampi/me/commit/f7b989c))


### Features

* `build` produces ES modules, not ES5 compatible code. ([9ac0c2f](https://github.com/randytarampi/me/commit/9ac0c2f))
* **www:** Build `esm` and `es5` assets. ([e72e925](https://github.com/randytarampi/me/commit/e72e925))
* **www:** Start tree shaking. ([0ebf7f6](https://github.com/randytarampi/me/commit/0ebf7f6))





# [2.9.0](https://github.com/randytarampi/me/compare/v2.8.1...v2.9.0) (2018-12-12)


### Bug Fixes

* **jsx:** Expect consumers of `[@randy](https://github.com/randy).tarampi/jsx` to bring their own `jquery` and `materialize-css`. ([f7b989c](https://github.com/randytarampi/me/commit/f7b989c))


### Features

* `build` produces ES modules, not ES5 compatible code. ([9ac0c2f](https://github.com/randytarampi/me/commit/9ac0c2f))
* **www:** Build `esm` and `es5` assets. ([e72e925](https://github.com/randytarampi/me/commit/e72e925))
* **www:** Start tree shaking. ([0ebf7f6](https://github.com/randytarampi/me/commit/0ebf7f6))





## [2.8.1](https://github.com/randytarampi/me/compare/v2.8.0...v2.8.1) (2018-12-11)

**Note:** Version bump only for package @randy.tarampi/letter





# [2.8.0](https://github.com/randytarampi/me/compare/v2.7.0...v2.8.0) (2018-12-11)


### Features

* **www:** Page `title` varies with page content, per [#179](https://github.com/randytarampi/me/issues/179). ([3b88bfe](https://github.com/randytarampi/me/commit/3b88bfe))





# [2.7.0](https://github.com/randytarampi/me/compare/v2.6.0...v2.7.0) (2018-12-11)

**Note:** Version bump only for package @randy.tarampi/letter





# [2.6.0](https://github.com/randytarampi/me/compare/v2.4.6...v2.6.0) (2018-12-10)

**Note:** Version bump only for package @randy.tarampi/letter





# [2.5.0](https://github.com/randytarampi/me/compare/v2.4.6...v2.5.0) (2018-12-10)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.4.6](https://github.com/randytarampi/me/compare/v2.4.5...v2.4.6) (2018-12-09)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.4.5](https://github.com/randytarampi/me/compare/v2.4.4...v2.4.5) (2018-12-09)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.4.4](https://github.com/randytarampi/me/compare/v2.4.3...v2.4.4) (2018-12-09)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.4.3](https://github.com/randytarampi/me/compare/v2.4.2...v2.4.3) (2018-12-09)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.4.2](https://github.com/randytarampi/me/compare/v2.4.1...v2.4.2) (2018-12-09)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.4.1](https://github.com/randytarampi/me/compare/v2.4.0...v2.4.1) (2018-12-08)

**Note:** Version bump only for package @randy.tarampi/letter





# [2.4.0](https://github.com/randytarampi/me/compare/v2.3.0...v2.4.0) (2018-12-08)

**Note:** Version bump only for package @randy.tarampi/letter





# [2.3.0](https://github.com/randytarampi/me/compare/v2.2.3...v2.3.0) (2018-12-06)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.2.3](https://github.com/randytarampi/me/compare/v2.2.2...v2.2.3) (2018-12-02)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.2.2](https://github.com/randytarampi/me/compare/v2.2.1...v2.2.2) (2018-11-28)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.2.1](https://github.com/randytarampi/me/compare/v2.2.0...v2.2.1) (2018-11-28)

**Note:** Version bump only for package @randy.tarampi/letter





# [2.2.0](https://github.com/randytarampi/me/compare/v2.1.4...v2.2.0) (2018-11-27)


### Features

* **letter:** Adjust `CampaignLink`s per dfdac6e1890a77f57ccbf78cbb9f189e7fdb7be6. ([4a609f8](https://github.com/randytarampi/me/commit/4a609f8))





## [2.1.4](https://github.com/randytarampi/me/compare/v2.1.3...v2.1.4) (2018-11-27)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.1.3](https://github.com/randytarampi/me/compare/v2.1.2...v2.1.3) (2018-11-26)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.1.2](https://github.com/randytarampi/me/compare/v2.1.1...v2.1.2) (2018-11-26)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.1.1](https://github.com/randytarampi/me/compare/v2.1.0...v2.1.1) (2018-11-25)

**Note:** Version bump only for package @randy.tarampi/letter





# [2.1.0](https://github.com/randytarampi/me/compare/v2.0.7...v2.1.0) (2018-11-25)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.0.7](https://github.com/randytarampi/me/compare/v2.0.6...v2.0.7) (2018-11-25)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.0.6](https://github.com/randytarampi/me/compare/v2.0.5...v2.0.6) (2018-11-24)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.0.5](https://github.com/randytarampi/me/compare/v2.0.4...v2.0.5) (2018-11-23)


### Bug Fixes

* **letter:** Fix very embarrassing spelling error. ([352c56a](https://github.com/randytarampi/me/commit/352c56a))





## [2.0.4](https://github.com/randytarampi/me/compare/v2.0.3...v2.0.4) (2018-11-22)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.0.3](https://github.com/randytarampi/me/compare/v2.0.2...v2.0.3) (2018-11-22)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.0.2](https://github.com/randytarampi/me/compare/v2.0.1...v2.0.2) (2018-11-20)

**Note:** Version bump only for package @randy.tarampi/letter





## [2.0.1](https://github.com/randytarampi/me/compare/v2.0.0...v2.0.1) (2018-11-20)

**Note:** Version bump only for package @randy.tarampi/letter





# [2.0.0](https://github.com/randytarampi/me/compare/v1.7.2...v2.0.0) (2018-11-20)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.7.2](https://github.com/randytarampi/me/compare/v1.7.1...v1.7.2) (2018-11-19)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.7.1](https://github.com/randytarampi/me/compare/v1.7.0...v1.7.1) (2018-11-17)

**Note:** Version bump only for package @randy.tarampi/letter





# [1.7.0](https://github.com/randytarampi/me/compare/v1.6.3...v1.7.0) (2018-11-17)


### Features

* **config:** Just point people to my blog 'cause it's exciting. ([8f39efd](https://github.com/randytarampi/me/commit/8f39efd))





## [1.6.3](https://github.com/randytarampi/me/compare/v1.6.2...v1.6.3) (2018-11-16)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.6.2](https://github.com/randytarampi/me/compare/v1.6.1...v1.6.2) (2018-11-16)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.6.1](https://github.com/randytarampi/me/compare/v1.6.0...v1.6.1) (2018-11-16)

**Note:** Version bump only for package @randy.tarampi/letter





# [1.6.0](https://github.com/randytarampi/me/compare/v1.5.3...v1.6.0) (2018-11-16)


### Bug Fixes

* **resume:** `résumé` -> `resume`. ([91d0834](https://github.com/randytarampi/me/commit/91d0834))


### Features

* **letter:** Make `LetterSalutation` more configurable. ([9e611a6](https://github.com/randytarampi/me/commit/9e611a6))





## [1.5.3](https://github.com/randytarampi/me/compare/v1.5.2...v1.5.3) (2018-11-15)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.5.2](https://github.com/randytarampi/me/compare/v1.5.1...v1.5.2) (2018-11-15)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.5.1](https://github.com/randytarampi/me/compare/v1.5.0...v1.5.1) (2018-11-14)

**Note:** Version bump only for package @randy.tarampi/letter





# [1.5.0](https://github.com/randytarampi/me/compare/v1.4.0...v1.5.0) (2018-11-14)

**Note:** Version bump only for package @randy.tarampi/letter





# [1.4.0](https://github.com/randytarampi/me/compare/v1.3.9...v1.4.0) (2018-11-14)


### Features

* **job-application:** Add `NpmVersionShield`s to `resume` and `letter`. ([5a91eaa](https://github.com/randytarampi/me/commit/5a91eaa))





## [1.3.9](https://github.com/randytarampi/me/compare/v1.3.8...v1.3.9) (2018-11-10)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.3.8](https://github.com/randytarampi/me/compare/v1.3.7...v1.3.8) (2018-11-10)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.3.7](https://github.com/randytarampi/me/compare/v1.3.6...v1.3.7) (2018-11-08)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.3.6](https://github.com/randytarampi/me/compare/v1.3.5...v1.3.6) (2018-11-07)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.3.5](https://github.com/randytarampi/me/compare/v1.3.4...v1.3.5) (2018-11-07)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.3.4](https://github.com/randytarampi/me/compare/v1.3.3...v1.3.4) (2018-11-07)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.3.3](https://github.com/randytarampi/me/compare/v1.3.2...v1.3.3) (2018-11-07)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.3.2](https://github.com/randytarampi/me/compare/v1.3.1...v1.3.2) (2018-11-06)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.3.1](https://github.com/randytarampi/me/compare/v1.3.0...v1.3.1) (2018-11-06)

**Note:** Version bump only for package @randy.tarampi/letter





# [1.3.0](https://github.com/randytarampi/me/compare/v1.2.5...v1.3.0) (2018-11-06)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.2.5](https://github.com/randytarampi/me/compare/v1.2.4...v1.2.5) (2018-11-06)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.2.4](https://github.com/randytarampi/me/compare/v1.2.3...v1.2.4) (2018-11-05)


### Bug Fixes

* **package:** `lib` now lives in `src/lib`. ([84cced2](https://github.com/randytarampi/me/commit/84cced2))





## [1.2.3](https://github.com/randytarampi/me/compare/v1.2.2...v1.2.3) (2018-11-05)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.2.2](https://github.com/randytarampi/me/compare/v1.2.1...v1.2.2) (2018-11-05)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.2.1](https://github.com/randytarampi/me/compare/v1.2.0...v1.2.1) (2018-11-05)

**Note:** Version bump only for package @randy.tarampi/letter





# [1.2.0](https://github.com/randytarampi/me/compare/v1.1.8...v1.2.0) (2018-11-04)


### Features

* **jsx:** `CampaignLink` buys into a `CampaignContext`. ([171fdfb](https://github.com/randytarampi/me/commit/171fdfb))





## [1.1.8](https://github.com/randytarampi/me/compare/v1.1.7...v1.1.8) (2018-11-04)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.1.7](https://github.com/randytarampi/me/compare/v1.1.6...v1.1.7) (2018-11-04)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.1.6](https://github.com/randytarampi/me/compare/v1.1.5...v1.1.6) (2018-11-04)


### Bug Fixes

* **letter:** Don't hardcode `letter.renderOptions.format`. ([73c1a55](https://github.com/randytarampi/me/commit/73c1a55))





## [1.1.5](https://github.com/randytarampi/me/compare/v1.1.4...v1.1.5) (2018-11-03)


### Bug Fixes

* **package:** Fix for `connected-react-router^5.0.0`, per [#183](https://github.com/randytarampi/me/issues/183). ([1119b69](https://github.com/randytarampi/me/commit/1119b69))
* **package:** Fix to `immutable@4.0.0-rc.10`, per [#174](https://github.com/randytarampi/me/issues/174). ([a1bda81](https://github.com/randytarampi/me/commit/a1bda81))
* **package:** Fix to `materialize-css@0.100.2`, for `react-materialize`. ([8aef31f](https://github.com/randytarampi/me/commit/8aef31f))





## [1.1.4](https://github.com/randytarampi/me/compare/v1.1.3...v1.1.4) (2018-11-03)


### Bug Fixes

* **jsx:** `configureStore` -> `configureOfflineStore`, and add plain `configureStore` from [c79241c9df71a1a9da829b3a38573c40e3bc9b48](https://github.com/randytarampi/me/blob/c79241c9df71a1a9da829b3a38573c40e3bc9b48/packages/jsx/src/lib/store/configureStore.js). ([690e21a](https://github.com/randytarampi/me/commit/690e21a))
* **letter:** Recipient section renders `PostalAddress#postOfficeBoxNumber` ([2f3ac10](https://github.com/randytarampi/me/commit/2f3ac10)), closes [PostalAddress#address2](https://github.com/PostalAddress/issues/address2)





## [1.1.3](https://github.com/randytarampi/me/compare/v1.1.2...v1.1.3) (2018-11-02)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.1.2](https://github.com/randytarampi/me/compare/v1.1.1...v1.1.2) (2018-11-02)

**Note:** Version bump only for package @randy.tarampi/letter





## [1.1.1](https://github.com/randytarampi/me/compare/v1.1.0...v1.1.1) (2018-11-02)

**Note:** Version bump only for package @randy.tarampi/letter





# [1.1.0](https://github.com/randytarampi/me/compare/v1.0.2...v1.1.0) (2018-11-01)


### Bug Fixes

* **package:** Don't publish custom `letter` or `resume` content. ([a04f77d](https://github.com/randytarampi/me/commit/a04f77d))





## [1.0.2](https://github.com/randytarampi/me/compare/v1.0.0...v1.0.2) (2018-11-01)


### Bug Fixes

* **package:** Packages don't `build` on `prepare` when `$IS_PUBLISHING`. ([44f196e](https://github.com/randytarampi/me/commit/44f196e))





## [1.0.1](https://github.com/randytarampi/me/compare/v1.0.0...v1.0.1) (2018-11-01)

**Note:** Version bump only for package @randy.tarampi/letter





# [1.0.0](https://github.com/randytarampi/me/compare/v0.48.0...v1.0.0) (2018-10-31)


### chore

* **jsonresume:** Collapse `puppeteer` environment settings into `printable` ([c8e01ab](https://github.com/randytarampi/me/commit/c8e01ab))


### BREAKING CHANGES

* **jsonresume:** Pretty straight forward. Might as well get over the 1.x hump now.





# [0.48.0](https://github.com/randytarampi/me/compare/v0.47.22...v0.48.0) (2018-10-31)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.22](https://github.com/randytarampi/me/compare/v0.47.21...v0.47.22) (2018-10-31)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.21](https://github.com/randytarampi/me/compare/v0.47.20...v0.47.21) (2018-10-31)


### Bug Fixes

* **travis:** Don't `build` on `prepare` when `$IS_PUBLISHING`. ([6cbf3c8](https://github.com/randytarampi/me/commit/6cbf3c8))


### Reverts

* chore(babel): `useBuiltIns: "entry"` -> `useBuiltIns: "usage"`. ([803e94d](https://github.com/randytarampi/me/commit/803e94d))





## [0.47.20](https://github.com/randytarampi/me/compare/v0.47.19...v0.47.20) (2018-10-31)


### Bug Fixes

* **travis:** Only rebuild on `prepack` when `$RELEASE` and `$CI`. ([f76a911](https://github.com/randytarampi/me/commit/f76a911))





## [0.47.19](https://github.com/randytarampi/me/compare/v0.47.18...v0.47.19) (2018-10-31)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.18](https://github.com/randytarampi/me/compare/v0.47.17...v0.47.18) (2018-10-31)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.17](https://github.com/randytarampi/me/compare/v0.47.16...v0.47.17) (2018-10-31)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.16](https://github.com/randytarampi/me/compare/v0.47.15...v0.47.16) (2018-10-30)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.15](https://github.com/randytarampi/me/compare/v0.47.14...v0.47.15) (2018-10-30)


### Bug Fixes

* **letter:** Add misplaced line at end of file. ([efcb372](https://github.com/randytarampi/me/commit/efcb372))





## [0.47.14](https://github.com/randytarampi/me/compare/v0.47.13...v0.47.14) (2018-10-30)


### Bug Fixes

* **job-applications:** Build PDFs with `CAMPAIGN_MEDIUM` set. ([8fc76de](https://github.com/randytarampi/me/commit/8fc76de))
* **job-applications:** Make `me` and `you` more flexible in terms of `contentConfiguration`. ([39876f4](https://github.com/randytarampi/me/commit/39876f4))





## [0.47.13](https://github.com/randytarampi/me/compare/v0.47.12...v0.47.13) (2018-10-30)


### Bug Fixes

* **css:** Don't bother with `node-sass-tilde-importer`. ([31e9361](https://github.com/randytarampi/me/commit/31e9361))
* Remove `package-lock`s. ([b2bf2db](https://github.com/randytarampi/me/commit/b2bf2db))
* **letter:** `PrintableRecipient` address should require a city & region. ([4a4c477](https://github.com/randytarampi/me/commit/4a4c477))
* **letter:** Give `LetterSection` some `sectionProps`. ([97505a6](https://github.com/randytarampi/me/commit/97505a6))
* **package:** Fix inverted logic in 2bbe750e51d43f389ca8fb688fd8db8ab78ec9d0. ([118b1a2](https://github.com/randytarampi/me/commit/118b1a2))
* **posts:** Build `prd` assets for release once. ([2bbe750](https://github.com/randytarampi/me/commit/2bbe750))
* **travis:** Turns out Travis uses `sh` instead of `bash`, so make these standard conditionals. ([76fef6b](https://github.com/randytarampi/me/commit/76fef6b))





## [0.47.12](https://github.com/randytarampi/me/compare/v0.47.11...v0.47.12) (2018-10-30)

**Note:** Version bump only for package @randy.tarampi/letter







**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.10](https://github.com/randytarampi/me/compare/v0.47.9...v0.47.10) (2018-10-29)


### Bug Fixes

* **package:** Just nuke all these `package-lock`s for now. ([a6c7d72](https://github.com/randytarampi/me/commit/a6c7d72))





## [0.47.9](https://github.com/randytarampi/me/compare/v0.47.8...v0.47.9) (2018-10-29)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.8](https://github.com/randytarampi/me/compare/v0.47.7...v0.47.8) (2018-10-29)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.7](https://github.com/randytarampi/me/compare/v0.47.6...v0.47.7) (2018-10-29)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.6](https://github.com/randytarampi/me/compare/v0.47.5...v0.47.6) (2018-10-29)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.5](https://github.com/randytarampi/me/compare/v0.47.4...v0.47.5) (2018-10-29)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.4](https://github.com/randytarampi/me/compare/v0.47.3...v0.47.4) (2018-10-29)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.3](https://github.com/randytarampi/me/compare/v0.47.2...v0.47.3) (2018-10-28)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.47.2](https://github.com/randytarampi/me/compare/v0.47.1...v0.47.2) (2018-10-28)


### Bug Fixes

* **package:** Use `materialize@0.100.2`. ([f737259](https://github.com/randytarampi/me/commit/f737259))





## [0.47.1](https://github.com/randytarampi/me/compare/v0.47.0...v0.47.1) (2018-10-28)

**Note:** Version bump only for package @randy.tarampi/letter





# [0.47.0](https://github.com/randytarampi/me/compare/v0.46.1...v0.47.0) (2018-10-28)


### Bug Fixes

* Lock down `immutable@4.0.0-rc.10`. ([fc34855](https://github.com/randytarampi/me/commit/fc34855))





## [0.46.1](https://github.com/randytarampi/me/compare/v0.46.0...v0.46.1) (2018-10-26)

**Note:** Version bump only for package @randy.tarampi/letter





# [0.46.0](https://github.com/randytarampi/me/compare/v0.45.8...v0.46.0) (2018-10-26)


### Bug Fixes

* **letter:** `fetchLetter` graceful error handling dispatches a `FETCHING_LETTER_FAILURE_RECOVERY`. ([4d5c59c](https://github.com/randytarampi/me/commit/4d5c59c))
* **letter:** Always attempt to fetch a `Letter` variant. ([55baecf](https://github.com/randytarampi/me/commit/55baecf))
* Actually add the files mentioned in 24eff7edf9b2f4f7cad912e03d1b1efacf4022cb. ([12285ad](https://github.com/randytarampi/me/commit/12285ad))
* ESLint. ([f60cddf](https://github.com/randytarampi/me/commit/f60cddf))
* Rename `default` resume, letter and job-application files as `resume`, `letter` and `job-application` respectively. ([24eff7e](https://github.com/randytarampi/me/commit/24eff7e))


### Features

* Buy into `castDatePropertyToDateTime` everywhere. ([e40b777](https://github.com/randytarampi/me/commit/e40b777))





## [0.45.8](https://github.com/randytarampi/me/compare/v0.45.7...v0.45.8) (2018-10-24)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.45.7](https://github.com/randytarampi/me/compare/v0.45.6...v0.45.7) (2018-10-22)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.45.6](https://github.com/randytarampi/me/compare/v0.45.5...v0.45.6) (2018-10-21)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.45.5](https://github.com/randytarampi/me/compare/v0.45.4...v0.45.5) (2018-10-21)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.45.4](https://github.com/randytarampi/me/compare/v0.45.3...v0.45.4) (2018-10-20)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.45.3](https://github.com/randytarampi/me/compare/v0.45.2...v0.45.3) (2018-10-20)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.45.2](https://github.com/randytarampi/me/compare/v0.45.1...v0.45.2) (2018-10-20)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.45.1](https://github.com/randytarampi/me/compare/v0.45.0...v0.45.1) (2018-10-20)

**Note:** Version bump only for package @randy.tarampi/letter





# [0.45.0](https://github.com/randytarampi/me/compare/v0.44.0...v0.45.0) (2018-10-20)


### Features

* **assets:** Use separate favicons and splash screens for each environment. ([e1b799e](https://github.com/randytarampi/me/commit/e1b799e))





# [0.44.0](https://github.com/randytarampi/me/compare/v0.43.13...v0.44.0) (2018-10-19)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.43.13](https://github.com/randytarampi/me/compare/v0.43.12...v0.43.13) (2018-10-18)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.43.12](https://github.com/randytarampi/me/compare/v0.43.11...v0.43.12) (2018-10-18)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.43.11](https://github.com/randytarampi/me/compare/v0.43.10...v0.43.11) (2018-10-18)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.43.10](https://github.com/randytarampi/me/compare/v0.43.9...v0.43.10) (2018-10-18)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.43.9](https://github.com/randytarampi/me/compare/v0.43.8...v0.43.9) (2018-10-17)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.43.8](https://github.com/randytarampi/me/compare/v0.43.7...v0.43.8) (2018-10-17)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.43.7](https://github.com/randytarampi/me/compare/v0.43.6...v0.43.7) (2018-10-17)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.43.6](https://github.com/randytarampi/me/compare/v0.43.5...v0.43.6) (2018-10-17)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.43.5](https://github.com/randytarampi/me/compare/v0.43.4...v0.43.5) (2018-10-17)


### Bug Fixes

* **www:** Throw in the towel and just serve everything out of `/docs`. ([91a09fe](https://github.com/randytarampi/me/commit/91a09fe))





## [0.43.4](https://github.com/randytarampi/me/compare/v0.43.3...v0.43.4) (2018-10-17)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.43.3](https://github.com/randytarampi/me/compare/v0.43.2...v0.43.3) (2018-10-17)


### Bug Fixes

* **www:** Serve the `manifest.json` alongside `index.html`. ([fb71364](https://github.com/randytarampi/me/commit/fb71364))





## [0.43.2](https://github.com/randytarampi/me/compare/v0.43.1...v0.43.2) (2018-10-16)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.43.1](https://github.com/randytarampi/me/compare/v0.43.0...v0.43.1) (2018-10-16)

**Note:** Version bump only for package @randy.tarampi/letter





# [0.43.0](https://github.com/randytarampi/me/compare/v0.42.2...v0.43.0) (2018-10-16)


### Bug Fixes

* **www:** Need to copy Roboto fonts 'cause of `materialize-css@0.100.2`. ([b82782b](https://github.com/randytarampi/me/commit/b82782b))





## [0.42.2](https://github.com/randytarampi/me/compare/v0.42.1...v0.42.2) (2018-10-16)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.42.1](https://github.com/randytarampi/me/compare/v0.42.0...v0.42.1) (2018-10-16)

**Note:** Version bump only for package @randy.tarampi/letter





# [0.42.0](https://github.com/randytarampi/me/compare/v0.41.7...v0.42.0) (2018-10-15)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.41.7](https://github.com/randytarampi/me/compare/v0.41.6...v0.41.7) (2018-10-15)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.41.6](https://github.com/randytarampi/me/compare/v0.41.5...v0.41.6) (2018-10-15)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.41.5](https://github.com/randytarampi/me/compare/v0.41.4...v0.41.5) (2018-10-15)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.41.4](https://github.com/randytarampi/me/compare/v0.41.3...v0.41.4) (2018-10-15)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.41.3](https://github.com/randytarampi/me/compare/v0.41.2...v0.41.3) (2018-10-15)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.41.2](https://github.com/randytarampi/me/compare/v0.41.1...v0.41.2) (2018-10-14)


### Bug Fixes

* Use the `—` consistently. ([66f5e0a](https://github.com/randytarampi/me/commit/66f5e0a))





## [0.41.1](https://github.com/randytarampi/me/compare/v0.41.0...v0.41.1) (2018-10-13)


### Bug Fixes

* **letter:** Ensure that we have an actual `<title>`. ([66ccaba](https://github.com/randytarampi/me/commit/66ccaba))





# [0.41.0](https://github.com/randytarampi/me/compare/v0.40.19...v0.41.0) (2018-10-13)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.40.19](https://github.com/randytarampi/me/compare/v0.40.18...v0.40.19) (2018-10-10)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.40.18](https://github.com/randytarampi/me/compare/v0.40.17...v0.40.18) (2018-10-10)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.40.17](https://github.com/randytarampi/me/compare/v0.40.16...v0.40.17) (2018-10-10)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.40.16](https://github.com/randytarampi/me/compare/v0.40.15...v0.40.16) (2018-10-09)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.40.15](https://github.com/randytarampi/me/compare/v0.40.14...v0.40.15) (2018-10-05)

**Note:** Version bump only for package @randy.tarampi/letter





## [0.40.14](https://github.com/randytarampi/me/compare/v0.40.13...v0.40.14) (2018-10-04)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.40.13"></a>
## [0.40.13](https://github.com/randytarampi/me/compare/v0.40.12...v0.40.13) (2018-09-30)


### Bug Fixes

* **package:** update reselect to version 4.0.0 ([15eb958](https://github.com/randytarampi/me/commit/15eb958))





<a name="0.40.12"></a>
## [0.40.12](https://github.com/randytarampi/me/compare/v0.40.11...v0.40.12) (2018-09-30)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.40.11"></a>
## [0.40.11](https://github.com/randytarampi/me/compare/v0.40.10...v0.40.11) (2018-09-27)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.40.10"></a>
## [0.40.10](https://github.com/randytarampi/me/compare/v0.40.9...v0.40.10) (2018-09-26)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.40.9"></a>
## [0.40.9](https://github.com/randytarampi/me/compare/v0.40.8...v0.40.9) (2018-09-26)


### Bug Fixes

* **jsx:** Add the `raf/polyfill` while I'm in here. ([f970386](https://github.com/randytarampi/me/commit/f970386))





<a name="0.40.8"></a>
## [0.40.8](https://github.com/randytarampi/me/compare/v0.40.7...v0.40.8) (2018-09-26)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.40.7"></a>
## [0.40.7](https://github.com/randytarampi/me/compare/v0.40.6...v0.40.7) (2018-09-26)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.40.6"></a>
## [0.40.6](https://github.com/randytarampi/me/compare/v0.40.5...v0.40.6) (2018-09-26)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.40.5"></a>
## [0.40.5](https://github.com/randytarampi/me/compare/v0.40.4...v0.40.5) (2018-09-25)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.40.4"></a>
## [0.40.4](https://github.com/randytarampi/me/compare/v0.40.3...v0.40.4) (2018-09-25)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.40.3"></a>
## [0.40.3](https://github.com/randytarampi/me/compare/v0.40.2...v0.40.3) (2018-09-24)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.40.2"></a>
## [0.40.2](https://github.com/randytarampi/me/compare/v0.40.1...v0.40.2) (2018-09-24)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.40.1"></a>
## [0.40.1](https://github.com/randytarampi/me/compare/v0.40.0...v0.40.1) (2018-09-24)


### Bug Fixes

* **jsonresume-theme:** Get this working on my local `theme-manager`. ([145c581](https://github.com/randytarampi/me/commit/145c581))





<a name="0.40.0"></a>
# [0.40.0](https://github.com/randytarampi/me/compare/v0.39.13...v0.40.0) (2018-09-24)


### Features

* **job-applications:** Add the resume/cover letter generator I've been using for the last couple of days now. ([a0d8f09](https://github.com/randytarampi/me/commit/a0d8f09))





<a name="0.39.13"></a>
## [0.39.13](https://github.com/randytarampi/me/compare/v0.39.12...v0.39.13) (2018-09-24)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.39.12"></a>
## [0.39.12](https://github.com/randytarampi/me/compare/v0.39.11...v0.39.12) (2018-09-24)


### Bug Fixes

* **config:** Use the correct `puppeteer` env `assetUrl`s. ([b32d016](https://github.com/randytarampi/me/commit/b32d016))





<a name="0.39.11"></a>
## [0.39.11](https://github.com/randytarampi/me/compare/v0.39.10...v0.39.11) (2018-09-23)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.39.10"></a>
## [0.39.10](https://github.com/randytarampi/me/compare/v0.39.9...v0.39.10) (2018-09-23)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.39.9"></a>
## [0.39.9](https://github.com/randytarampi/me/compare/v0.39.8...v0.39.9) (2018-09-23)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.39.8"></a>
## [0.39.8](https://github.com/randytarampi/me/compare/v0.39.7...v0.39.8) (2018-09-23)


### Bug Fixes

* **letter:** ESLint. ([9924810](https://github.com/randytarampi/me/commit/9924810))





<a name="0.39.7"></a>
## [0.39.7](https://github.com/randytarampi/me/compare/v0.39.6...v0.39.7) (2018-09-23)


### Bug Fixes

* **letter:** Include `index.client` and `index.server` on `publish`. ([9ce8db4](https://github.com/randytarampi/me/commit/9ce8db4))





<a name="0.39.6"></a>
## [0.39.6](https://github.com/randytarampi/me/compare/v0.39.5...v0.39.6) (2018-09-23)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.39.5"></a>
## [0.39.5](https://github.com/randytarampi/me/compare/v0.39.4...v0.39.5) (2018-09-22)


### Bug Fixes

* **resume:** Split out `jsonresume-theme` from `[@randy](https://github.com/randy).tarampi/resume`. ([abf0005](https://github.com/randytarampi/me/commit/abf0005))


### Reverts

* chore(www): Bring polyfills in before `vendor`. ([03e0d8c](https://github.com/randytarampi/me/commit/03e0d8c))





<a name="0.39.4"></a>
## [0.39.4](https://github.com/randytarampi/me/compare/v0.39.3...v0.39.4) (2018-09-22)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.39.3"></a>
## [0.39.3](https://github.com/randytarampi/me/compare/v0.39.2...v0.39.3) (2018-09-22)


### Bug Fixes

* Rely on `prepack` to `NODE_ENV=prd npm run build`. ([6438959](https://github.com/randytarampi/me/commit/6438959))





<a name="0.39.2"></a>
## [0.39.2](https://github.com/randytarampi/me/compare/v0.39.1...v0.39.2) (2018-09-22)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.39.1"></a>
## [0.39.1](https://github.com/randytarampi/me/compare/v0.39.0...v0.39.1) (2018-09-22)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.39.0"></a>
# [0.39.0](https://github.com/randytarampi/me/compare/v0.35.0...v0.39.0) (2018-09-22)


### Bug Fixes

* **letters:** Fix copy/pasta'd `letters` source directory. ([8efe337](https://github.com/randytarampi/me/commit/8efe337))


### Features

* **resume:** Make `resume` publishable per [#67](https://github.com/randytarampi/me/issues/67). ([7686d58](https://github.com/randytarampi/me/commit/7686d58))





<a name="0.38.0"></a>
# [0.38.0](https://github.com/randytarampi/me/compare/v0.35.0...v0.38.0) (2018-09-22)


### Bug Fixes

* **letters:** Fix copy/pasta'd `letters` source directory. ([8efe337](https://github.com/randytarampi/me/commit/8efe337))


### Features

* **resume:** Make `resume` publishable per [#67](https://github.com/randytarampi/me/issues/67). ([7686d58](https://github.com/randytarampi/me/commit/7686d58))





<a name="0.37.0"></a>
# [0.37.0](https://github.com/randytarampi/me/compare/v0.35.0...v0.37.0) (2018-09-22)


### Bug Fixes

* **letters:** Fix copy/pasta'd `letters` source directory. ([8efe337](https://github.com/randytarampi/me/commit/8efe337))


### Features

* **resume:** Make `resume` publishable per [#67](https://github.com/randytarampi/me/issues/67). ([7686d58](https://github.com/randytarampi/me/commit/7686d58))





<a name="0.36.0"></a>
# [0.36.0](https://github.com/randytarampi/me/compare/v0.35.0...v0.36.0) (2018-09-21)


### Bug Fixes

* **letters:** Fix copy/pasta'd `letters` source directory. ([8efe337](https://github.com/randytarampi/me/commit/8efe337))


### Features

* **resume:** Make `resume` publishable per [#67](https://github.com/randytarampi/me/issues/67). ([7686d58](https://github.com/randytarampi/me/commit/7686d58))





<a name="0.35.0"></a>
# [0.35.0](https://github.com/randytarampi/me/compare/v0.34.3...v0.35.0) (2018-09-20)


### Features

* **printables:** `letter` relies on `printables` to generate PDFs. ([839cfe4](https://github.com/randytarampi/me/commit/839cfe4))
* **printables:** Actually add these tests. ([7dcbe63](https://github.com/randytarampi/me/commit/7dcbe63))
* **printables:** Add `[@randy](https://github.com/randy).tarampi/printables`. ([#134](https://github.com/randytarampi/me/issues/134)) ([eae7675](https://github.com/randytarampi/me/commit/eae7675))





<a name="0.34.3"></a>
## [0.34.3](https://github.com/randytarampi/me/compare/v0.34.1...v0.34.3) (2018-09-20)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.34.2"></a>
## [0.34.2](https://github.com/randytarampi/me/compare/v0.34.1...v0.34.2) (2018-09-20)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.34.1"></a>
## [0.34.1](https://github.com/randytarampi/me/compare/v0.34.0...v0.34.1) (2018-09-19)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.34.0"></a>
# [0.34.0](https://github.com/randytarampi/me/compare/v0.33.2...v0.34.0) (2018-09-18)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.33.2"></a>
## [0.33.2](https://github.com/randytarampi/me/compare/v0.33.1...v0.33.2) (2018-09-18)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.33.1"></a>
## [0.33.1](https://github.com/randytarampi/me/compare/v0.33.0...v0.33.1) (2018-09-18)


### Bug Fixes

* **views:** Set canonical URLs correctly. ([178d3eb](https://github.com/randytarampi/me/commit/178d3eb))





<a name="0.33.0"></a>
# [0.33.0](https://github.com/randytarampi/me/compare/v0.32.1...v0.33.0) (2018-09-18)


### Bug Fixes

* No `robots.txt` file in `resume` or `letter` after de88eec7b542bcfae3d9b89c207ae627bd27c69c. ([f004920](https://github.com/randytarampi/me/commit/f004920))


### Features

* **www:** Build sitemaps. ([b3e4823](https://github.com/randytarampi/me/commit/b3e4823))


### Reverts

* chore: Use `react-materialize@3.0.0-beta.0`. ([62289f0](https://github.com/randytarampi/me/commit/62289f0))





<a name="0.32.1"></a>
## [0.32.1](https://github.com/randytarampi/me/compare/v0.32.0...v0.32.1) (2018-09-17)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.32.0"></a>
# [0.32.0](https://github.com/randytarampi/me/compare/v0.31.7...v0.32.0) (2018-09-17)


### Features

* Add some basic structured data to our pages per [#25](https://github.com/randytarampi/me/issues/25). ([a513c63](https://github.com/randytarampi/me/commit/a513c63))





<a name="0.31.7"></a>
## [0.31.7](https://github.com/randytarampi/me/compare/v0.31.6...v0.31.7) (2018-09-16)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.31.6"></a>
## [0.31.6](https://github.com/randytarampi/me/compare/v0.31.5...v0.31.6) (2018-09-16)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.31.5"></a>
## [0.31.5](https://github.com/randytarampi/me/compare/v0.31.4...v0.31.5) (2018-09-16)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.31.4"></a>
## [0.31.4](https://github.com/randytarampi/me/compare/v0.31.3...v0.31.4) (2018-09-16)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.31.3"></a>
## [0.31.3](https://github.com/randytarampi/me/compare/v0.31.2...v0.31.3) (2018-09-15)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.31.2"></a>
## [0.31.2](https://github.com/randytarampi/me/compare/v0.31.1...v0.31.2) (2018-09-15)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.31.1"></a>
## [0.31.1](https://github.com/randytarampi/me/compare/v0.31.0...v0.31.1) (2018-09-15)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.30.0"></a>
# [0.30.0](https://github.com/randytarampi/me/compare/v0.29.1...v0.30.0) (2018-09-15)


### Features

* **letter:** Add PDF metadata per [#114](https://github.com/randytarampi/me/issues/114) and randytarampi/resume-cli#f6f8e73bed15a9817fbc4a3a22fa77affcf43fd6. ([13a1d0a](https://github.com/randytarampi/me/commit/13a1d0a)), closes [randytarampi/resume-cli#f6f8e73bed15a9817fbc4a3a22fa77affcf43fd6](https://github.com/randytarampi/resume-cli/issues/f6f8e73bed15a9817fbc4a3a22fa77affcf43fd6)
* Assert that generated PDFs actually exist. ([8e1d56b](https://github.com/randytarampi/me/commit/8e1d56b)), closes [#110](https://github.com/randytarampi/me/issues/110) [randytarampi/resume-cli#11d0b4ff48d68781addb8237faa1464d4d1a9d22](https://github.com/randytarampi/resume-cli/issues/11d0b4ff48d68781addb8237faa1464d4d1a9d22) [#110](https://github.com/randytarampi/me/issues/110)
* Assert that generated PDFs are to our expectations. ([13a81f8](https://github.com/randytarampi/me/commit/13a81f8)), closes [#106](https://github.com/randytarampi/me/issues/106) [randytarampi/resume-cli#8c1db9cdb16444eafdfc1889adb4989d0f2fe6](https://github.com/randytarampi/resume-cli/issues/8c1db9cdb16444eafdfc1889adb4989d0f2fe6) [#106](https://github.com/randytarampi/me/issues/106)





<a name="0.29.1"></a>
## [0.29.1](https://github.com/randytarampi/me/compare/v0.29.0...v0.29.1) (2018-09-14)


### Bug Fixes

* Fix tests for changes in dd64c995231941c67b1782baebc895d3e5942079. ([45b94dc](https://github.com/randytarampi/me/commit/45b94dc))





<a name="0.29.0"></a>
# [0.29.0](https://github.com/randytarampi/me/compare/v0.28.0...v0.29.0) (2018-09-14)


### Features

* **config:** Pull more details about `me` into the config, per [#54](https://github.com/randytarampi/me/issues/54). ([c198fdd](https://github.com/randytarampi/me/commit/c198fdd)), closes [#25](https://github.com/randytarampi/me/issues/25)
* **jsx:** Put my full mailing address in my `PrintableHeader`. ([843a959](https://github.com/randytarampi/me/commit/843a959))





<a name="0.28.0"></a>
# [0.28.0](https://github.com/randytarampi/me/compare/v0.27.1...v0.28.0) (2018-09-13)


### Features

* **letter:** Redux `letter` per [#68](https://github.com/randytarampi/me/issues/68). ([1faf9f2](https://github.com/randytarampi/me/commit/1faf9f2)), closes [#69](https://github.com/randytarampi/me/issues/69) [#55](https://github.com/randytarampi/me/issues/55)





<a name="0.27.1"></a>
## [0.27.1](https://github.com/randytarampi/me/compare/v0.27.0...v0.27.1) (2018-09-13)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.27.0"></a>
# [0.27.0](https://github.com/randytarampi/me/compare/v0.26.1...v0.27.0) (2018-09-13)


### Features

* **resume:** Redux `resume` per [#69](https://github.com/randytarampi/me/issues/69). ([10544a4](https://github.com/randytarampi/me/commit/10544a4)), closes [#67](https://github.com/randytarampi/me/issues/67) [#68](https://github.com/randytarampi/me/issues/68)





<a name="0.26.1"></a>
## [0.26.1](https://github.com/randytarampi/me/compare/v0.26.0...v0.26.1) (2018-09-12)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.26.0"></a>
# [0.26.0](https://github.com/randytarampi/me/compare/v0.25.4...v0.26.0) (2018-09-12)


### Features

* Close [#24](https://github.com/randytarampi/me/issues/24) and fully flesh out module's public interfaces. ([0042eda](https://github.com/randytarampi/me/commit/0042eda)), closes [#67](https://github.com/randytarampi/me/issues/67)





<a name="0.25.4"></a>
## [0.25.4](https://github.com/randytarampi/me/compare/v0.25.3...v0.25.4) (2018-09-12)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.25.3"></a>
## [0.25.3](https://github.com/randytarampi/me/compare/v0.25.2...v0.25.3) (2018-09-11)


### Bug Fixes

* `renderJsx` before we `getRenderedHelmet` to fix [#22](https://github.com/randytarampi/me/issues/22). ([00958cd](https://github.com/randytarampi/me/commit/00958cd))





<a name="0.25.2"></a>
## [0.25.2](https://github.com/randytarampi/me/compare/v0.25.1...v0.25.2) (2018-09-11)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.25.1"></a>
## [0.25.1](https://github.com/randytarampi/me/compare/v0.25.0...v0.25.1) (2018-09-11)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.25.0"></a>
# [0.25.0](https://github.com/randytarampi/me/compare/v0.24.7...v0.25.0) (2018-09-11)


### Bug Fixes

* **letter:** `puppeteer` waits for 0 network I/O before PDFing. ([edac2a4](https://github.com/randytarampi/me/commit/edac2a4))
* **letter:** Add a test for changes in f084d0153903344a4fbf1f2450fb0f098f92dc4d. ([07f07e2](https://github.com/randytarampi/me/commit/07f07e2))
* **letter:** Better default letter content. ([ef687ed](https://github.com/randytarampi/me/commit/ef687ed))
* **letter:** Fix tests for changes in f084d0153903344a4fbf1f2450fb0f098f92dc4d. ([9d0cf26](https://github.com/randytarampi/me/commit/9d0cf26))


### Features

* **letter:** Boast about code quality per [#91](https://github.com/randytarampi/me/issues/91). ([f084d01](https://github.com/randytarampi/me/commit/f084d01))
* **letter:** Bring back the `LetterFooter`. ([118757e](https://github.com/randytarampi/me/commit/118757e))





<a name="0.24.7"></a>
## [0.24.7](https://github.com/randytarampi/me/compare/v0.24.6...v0.24.7) (2018-09-10)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.24.6"></a>
## [0.24.6](https://github.com/randytarampi/me/compare/v0.24.5...v0.24.6) (2018-09-10)


### Bug Fixes

* **css:** Fix `.printable`s for the return of Roboto. ([7386eed](https://github.com/randytarampi/me/commit/7386eed))
* **jsx:** Fix test due to change in `assetUrl`. ([d32ed7b](https://github.com/randytarampi/me/commit/d32ed7b))





<a name="0.24.5"></a>
## [0.24.5](https://github.com/randytarampi/me/compare/v0.24.4...v0.24.5) (2018-09-10)


### Bug Fixes

* **package:** update materialize-css to version 1.0.0 ([5047277](https://github.com/randytarampi/me/commit/5047277))





<a name="0.24.3"></a>
## [0.24.3](https://github.com/randytarampi/me/compare/v0.24.2...v0.24.3) (2018-09-09)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.24.2"></a>
## [0.24.2](https://github.com/randytarampi/me/compare/v0.24.1...v0.24.2) (2018-09-09)


### Bug Fixes

* **letter:** Fix letter size styling. ([1d0c8de](https://github.com/randytarampi/me/commit/1d0c8de))


### Reverts

* chore(jsx): Export store decorated `shallow` and `mount`. ([027be89](https://github.com/randytarampi/me/commit/027be89))





<a name="0.24.1"></a>
## [0.24.1](https://github.com/randytarampi/me/compare/v0.24.0...v0.24.1) (2018-09-07)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.24.0"></a>
# [0.24.0](https://github.com/randytarampi/me/compare/v0.23.12...v0.24.0) (2018-09-06)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.12"></a>
## [0.23.12](https://github.com/randytarampi/me/compare/v0.23.11...v0.23.12) (2018-09-06)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.11"></a>
## [0.23.11](https://github.com/randytarampi/me/compare/v0.23.10...v0.23.11) (2018-09-05)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.10"></a>
## [0.23.10](https://github.com/randytarampi/me/compare/v0.23.9...v0.23.10) (2018-09-05)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.9"></a>
## [0.23.9](https://github.com/randytarampi/me/compare/v0.23.8...v0.23.9) (2018-09-05)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.8"></a>
## [0.23.8](https://github.com/randytarampi/me/compare/v0.23.7...v0.23.8) (2018-09-04)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.7"></a>
## [0.23.7](https://github.com/randytarampi/me/compare/v0.23.6...v0.23.7) (2018-09-04)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.6"></a>
## [0.23.6](https://github.com/randytarampi/me/compare/v0.23.5...v0.23.6) (2018-09-04)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.5"></a>
## [0.23.5](https://github.com/randytarampi/me/compare/v0.23.4...v0.23.5) (2018-09-04)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.4"></a>
## [0.23.4](https://github.com/randytarampi/me/compare/v0.23.3...v0.23.4) (2018-09-03)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.3"></a>
## [0.23.3](https://github.com/randytarampi/me/compare/v0.23.2...v0.23.3) (2018-09-03)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.2"></a>
## [0.23.2](https://github.com/randytarampi/me/compare/v0.23.1...v0.23.2) (2018-09-02)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.1"></a>
## [0.23.1](https://github.com/randytarampi/me/compare/v0.23.0...v0.23.1) (2018-09-02)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.23.0"></a>
# [0.23.0](https://github.com/randytarampi/me/compare/v0.22.9...v0.23.0) (2018-09-02)


### Features

* Use bunyan for logging per [#78](https://github.com/randytarampi/me/issues/78). ([d03610b](https://github.com/randytarampi/me/commit/d03610b)), closes [#81](https://github.com/randytarampi/me/issues/81) [#81](https://github.com/randytarampi/me/issues/81)





<a name="0.22.5"></a>
## [0.22.5](https://github.com/randytarampi/me/compare/v0.22.4...v0.22.5) (2018-09-01)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.22.4"></a>
## [0.22.4](https://github.com/randytarampi/me/compare/v0.22.3...v0.22.4) (2018-08-31)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.22.3"></a>
## [0.22.3](https://github.com/randytarampi/me/compare/v0.22.2...v0.22.3) (2018-08-31)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.22.2"></a>
## [0.22.2](https://github.com/randytarampi/me/compare/v0.22.1...v0.22.2) (2018-08-31)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.22.0"></a>
# [0.22.0](https://github.com/randytarampi/me/compare/v0.21.0...v0.22.0) (2018-08-31)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.21.0"></a>
# [0.21.0](https://github.com/randytarampi/me/compare/v0.20.6...v0.21.0) (2018-08-31)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.20.6"></a>
## [0.20.6](https://github.com/randytarampi/me/compare/v0.20.5...v0.20.6) (2018-08-31)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.20.5"></a>
## [0.20.5](https://github.com/randytarampi/me/compare/v0.20.4...v0.20.5) (2018-08-30)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.20.4"></a>
## [0.20.4](https://github.com/randytarampi/me/compare/v0.20.3...v0.20.4) (2018-08-29)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.20.3"></a>
## [0.20.3](https://github.com/randytarampi/me/compare/v0.20.2...v0.20.3) (2018-08-29)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.20.2"></a>
## [0.20.2](https://github.com/randytarampi/me/compare/v0.20.1...v0.20.2) (2018-08-29)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.20.1"></a>
## [0.20.1](https://github.com/randytarampi/me/compare/v0.20.0...v0.20.1) (2018-08-28)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.20.0"></a>
# [0.20.0](https://github.com/randytarampi/me/compare/v0.19.6...v0.20.0) (2018-08-28)


### Bug Fixes

* **jsx:** JSX tests also define a JSDOM `global.document`. ([fbd50d7](https://github.com/randytarampi/me/commit/fbd50d7))


### Features

* **jsx:** Reduxify `ʕ•ᴥ•ʔ`s. ([8726f68](https://github.com/randytarampi/me/commit/8726f68)), closes [#16](https://github.com/randytarampi/me/issues/16)





<a name="0.19.6"></a>
## [0.19.6](https://github.com/randytarampi/me/compare/v0.19.5...v0.19.6) (2018-08-28)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.19.4"></a>
## [0.19.4](https://github.com/randytarampi/me/compare/v0.19.3...v0.19.4) (2018-08-27)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.19.3"></a>
## [0.19.3](https://github.com/randytarampi/me/compare/v0.19.2...v0.19.3) (2018-08-27)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.19.2"></a>
## [0.19.2](https://github.com/randytarampi/me/compare/v0.19.1...v0.19.2) (2018-08-27)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.19.1"></a>
## [0.19.1](https://github.com/randytarampi/me/compare/v0.19.0...v0.19.1) (2018-08-27)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.19.0"></a>
# [0.19.0](https://github.com/randytarampi/me/compare/v0.18.4...v0.19.0) (2018-08-27)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.18.4"></a>
## [0.18.4](https://github.com/randytarampi/me/compare/v0.18.3...v0.18.4) (2018-08-26)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.18.3"></a>
## [0.18.3](https://github.com/randytarampi/me/compare/v0.18.2...v0.18.3) (2018-08-25)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.18.1"></a>
## [0.18.1](https://github.com/randytarampi/me/compare/v0.18.0...v0.18.1) (2018-08-24)


### Bug Fixes

* User facing URLs should be `https`, and rooted at `www.randytarampi.ca`. ([f3ee4ea](https://github.com/randytarampi/me/commit/f3ee4ea))





<a name="0.18.0"></a>
# [0.18.0](https://github.com/randytarampi/me/compare/v0.17.1...v0.18.0) (2018-08-24)


### Bug Fixes

* Centralize most of the webpack configuration. ([9e44bb4](https://github.com/randytarampi/me/commit/9e44bb4))


### Features

* **resume:** Add PDF resume link tracking via a `CampaignLink`. ([0547bd5](https://github.com/randytarampi/me/commit/0547bd5)), closes [#19](https://github.com/randytarampi/me/issues/19)





<a name="0.17.0"></a>
# [0.17.0](https://github.com/randytarampi/me/compare/v0.16.5...v0.17.0) (2018-08-23)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.16.5"></a>
## [0.16.5](https://github.com/randytarampi/me/compare/v0.16.4...v0.16.5) (2018-08-23)


### Bug Fixes

* **resume:** Don't dangle a second, blank page when printed on US Letter. ([9272476](https://github.com/randytarampi/me/commit/9272476))





<a name="0.16.4"></a>
## [0.16.4](https://github.com/randytarampi/me/compare/v0.16.3...v0.16.4) (2018-08-23)


### Bug Fixes

* **www:** Load `query-string` and other modules using babel. ([41ec9b4](https://github.com/randytarampi/me/commit/41ec9b4))





<a name="0.16.3"></a>
## [0.16.3](https://github.com/randytarampi/me/compare/v0.16.2...v0.16.3) (2018-08-23)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.16.1"></a>
## [0.16.1](https://github.com/randytarampi/me/compare/v0.16.0...v0.16.1) (2018-08-20)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.16.0"></a>
# [0.16.0](https://github.com/randytarampi/me/compare/v0.15.0...v0.16.0) (2018-08-20)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.15.0"></a>
# [0.15.0](https://github.com/randytarampi/me/compare/v0.14.3...v0.15.0) (2018-08-19)


### Features

* **sentry:** Upload sentry artifacts for `dev` builds. ([508cff4](https://github.com/randytarampi/me/commit/508cff4))





<a name="0.14.3"></a>
## [0.14.3](https://github.com/randytarampi/me/compare/v0.14.2...v0.14.3) (2018-08-19)


### Bug Fixes

* **letter:** Set the `renderHtml` test timeout at 60 seconds. ([e251059](https://github.com/randytarampi/me/commit/e251059))





<a name="0.14.0"></a>
# [0.14.0](https://github.com/randytarampi/me/compare/v0.13.1...v0.14.0) (2018-08-18)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.13.0"></a>
# [0.13.0](https://github.com/randytarampi/me/compare/v0.12.1...v0.13.0) (2018-08-17)

**Note:** Version bump only for package @randy.tarampi/letter





<a name="0.12.0"></a>
# [0.12.0](https://github.com/randytarampi/me/compare/v0.11.3...v0.12.0) (2018-08-17)


### Bug Fixes

* **letter:** ESLint. ([d4190c9](https://github.com/randytarampi/me/commit/d4190c9))


### Features

* **letter:** Copy/pasta from `resume` to build `letter`s. ([f31bdf7](https://github.com/randytarampi/me/commit/f31bdf7))
* **letter:** Support multiple letters. ([8fb717a](https://github.com/randytarampi/me/commit/8fb717a)), closes [#23](https://github.com/randytarampi/me/issues/23) [#25](https://github.com/randytarampi/me/issues/25)
* **letter:** The `Letter` configuration supports random JSX content sections. ([cf2558f](https://github.com/randytarampi/me/commit/cf2558f))
