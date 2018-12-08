# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.4.1](https://github.com/randytarampi/me/compare/v2.4.0...v2.4.1) (2018-12-08)

**Note:** Version bump only for package @randy.tarampi/js





# [2.4.0](https://github.com/randytarampi/me/compare/v2.3.0...v2.4.0) (2018-12-08)


### Features

* **js:** Add a `Gallery` `Post` type, per [#133](https://github.com/randytarampi/me/issues/133). ([18e6338](https://github.com/randytarampi/me/commit/18e6338))





# [2.3.0](https://github.com/randytarampi/me/compare/v2.2.3...v2.3.0) (2018-12-06)

**Note:** Version bump only for package @randy.tarampi/js





## [2.2.3](https://github.com/randytarampi/me/compare/v2.2.2...v2.2.3) (2018-12-02)

**Note:** Version bump only for package @randy.tarampi/js





## [2.2.2](https://github.com/randytarampi/me/compare/v2.2.1...v2.2.2) (2018-11-28)


### Bug Fixes

* **js:** Consistently use `Photo.name` and `Post.name` as keys instead of hardcoded strings. ([fb41257](https://github.com/randytarampi/me/commit/fb41257)), closes [/github.com/randytarampi/me/commit/2266e2252f5d1a6e82e36eefce655ee855d38cf5#diff-32607347f8126e6534ebc7ebaec4853](https://github.com//github.com/randytarampi/me/commit/2266e2252f5d1a6e82e36eefce655ee855d38cf5/issues/diff-32607347f8126e6534ebc7ebaec4853)
* **js:** Explicitly give `Post` and `Photo` classes a `type` so we can rely on that instead of the `class`'s `name`, which seems to get rekt in the minification process. ([113058b](https://github.com/randytarampi/me/commit/113058b)), closes [/github.com/randytarampi/me/commit/2266e2252f5d1a6e82e36eefce655ee855d38cf5#diff-32607347f8126e6534ebc7ebaec4853](https://github.com//github.com/randytarampi/me/commit/2266e2252f5d1a6e82e36eefce655ee855d38cf5/issues/diff-32607347f8126e6534ebc7ebaec4853)





## [2.2.1](https://github.com/randytarampi/me/compare/v2.2.0...v2.2.1) (2018-11-28)

**Note:** Version bump only for package @randy.tarampi/js





# [2.2.0](https://github.com/randytarampi/me/compare/v2.1.4...v2.2.0) (2018-11-27)

**Note:** Version bump only for package @randy.tarampi/js





## [2.1.4](https://github.com/randytarampi/me/compare/v2.1.3...v2.1.4) (2018-11-27)

**Note:** Version bump only for package @randy.tarampi/js





## [2.1.3](https://github.com/randytarampi/me/compare/v2.1.2...v2.1.3) (2018-11-26)

**Note:** Version bump only for package @randy.tarampi/js





## [2.1.2](https://github.com/randytarampi/me/compare/v2.1.1...v2.1.2) (2018-11-26)

**Note:** Version bump only for package @randy.tarampi/js





## [2.1.1](https://github.com/randytarampi/me/compare/v2.1.0...v2.1.1) (2018-11-25)

**Note:** Version bump only for package @randy.tarampi/js





# [2.1.0](https://github.com/randytarampi/me/compare/v2.0.7...v2.1.0) (2018-11-25)

**Note:** Version bump only for package @randy.tarampi/js





## [2.0.7](https://github.com/randytarampi/me/compare/v2.0.6...v2.0.7) (2018-11-25)

**Note:** Version bump only for package @randy.tarampi/js





## [2.0.6](https://github.com/randytarampi/me/compare/v2.0.5...v2.0.6) (2018-11-24)

**Note:** Version bump only for package @randy.tarampi/js





## [2.0.5](https://github.com/randytarampi/me/compare/v2.0.4...v2.0.5) (2018-11-23)

**Note:** Version bump only for package @randy.tarampi/js





## [2.0.4](https://github.com/randytarampi/me/compare/v2.0.3...v2.0.4) (2018-11-22)

**Note:** Version bump only for package @randy.tarampi/js





## [2.0.3](https://github.com/randytarampi/me/compare/v2.0.2...v2.0.3) (2018-11-22)

**Note:** Version bump only for package @randy.tarampi/js





## [2.0.2](https://github.com/randytarampi/me/compare/v2.0.1...v2.0.2) (2018-11-20)

**Note:** Version bump only for package @randy.tarampi/js





## [2.0.1](https://github.com/randytarampi/me/compare/v2.0.0...v2.0.1) (2018-11-20)

**Note:** Version bump only for package @randy.tarampi/js





# [2.0.0](https://github.com/randytarampi/me/compare/v1.7.2...v2.0.0) (2018-11-20)


### Features

* **js:** `Post.tags` can override `lat`, `long` and `geohash`, per randytarampi/me.photos[#13](https://github.com/randytarampi/me/issues/13). ([546d793](https://github.com/randytarampi/me/commit/546d793))
* **js:** `Post.tags` can override certain API returned values, per randytarampi/me.photos[#13](https://github.com/randytarampi/me/issues/13). ([b863797](https://github.com/randytarampi/me/commit/b863797))
* **js:** Add `Post.lat`, `Post.long` and `Post.geohash`. ([30b8a1b](https://github.com/randytarampi/me/commit/30b8a1b))
* **js:** Give `Post` some `tags` per [#76](https://github.com/randytarampi/me/issues/76). ([d017847](https://github.com/randytarampi/me/commit/d017847))
* **posts:** Just store the raw `Post` response in the DB. ([b1e48cc](https://github.com/randytarampi/me/commit/b1e48cc)), closes [#77](https://github.com/randytarampi/me/issues/77)
* **service:** `SearchParams.dynamoDb` supports `lat`, `lng` and `geohashPrecision`. ([50b07f7](https://github.com/randytarampi/me/commit/50b07f7))





## [1.7.2](https://github.com/randytarampi/me/compare/v1.7.1...v1.7.2) (2018-11-19)

**Note:** Version bump only for package @randy.tarampi/js





## [1.7.1](https://github.com/randytarampi/me/compare/v1.7.0...v1.7.1) (2018-11-17)

**Note:** Version bump only for package @randy.tarampi/js





# [1.7.0](https://github.com/randytarampi/me/compare/v1.6.3...v1.7.0) (2018-11-17)

**Note:** Version bump only for package @randy.tarampi/js





## [1.6.3](https://github.com/randytarampi/me/compare/v1.6.2...v1.6.3) (2018-11-16)

**Note:** Version bump only for package @randy.tarampi/js





## [1.6.2](https://github.com/randytarampi/me/compare/v1.6.1...v1.6.2) (2018-11-16)

**Note:** Version bump only for package @randy.tarampi/js





## [1.6.1](https://github.com/randytarampi/me/compare/v1.6.0...v1.6.1) (2018-11-16)

**Note:** Version bump only for package @randy.tarampi/js





# [1.6.0](https://github.com/randytarampi/me/compare/v1.5.3...v1.6.0) (2018-11-16)

**Note:** Version bump only for package @randy.tarampi/js





## [1.5.3](https://github.com/randytarampi/me/compare/v1.5.2...v1.5.3) (2018-11-15)


### Bug Fixes

* **js:** `Post.toRss().author` returns a naked URL. ([91b89a0](https://github.com/randytarampi/me/commit/91b89a0))





## [1.5.2](https://github.com/randytarampi/me/compare/v1.5.1...v1.5.2) (2018-11-15)

**Note:** Version bump only for package @randy.tarampi/js





## [1.5.1](https://github.com/randytarampi/me/compare/v1.5.0...v1.5.1) (2018-11-14)

**Note:** Version bump only for package @randy.tarampi/js





# [1.5.0](https://github.com/randytarampi/me/compare/v1.4.0...v1.5.0) (2018-11-14)


### Bug Fixes

* **posts:** `enclosure.url` shouldn't have any query parameters. ([95e4bea](https://github.com/randytarampi/me/commit/95e4bea))





# [1.4.0](https://github.com/randytarampi/me/compare/v1.3.9...v1.4.0) (2018-11-14)

**Note:** Version bump only for package @randy.tarampi/js





## [1.3.9](https://github.com/randytarampi/me/compare/v1.3.8...v1.3.9) (2018-11-10)


### Bug Fixes

* **js:** `Person` parses phone numbers according to their `countryCode`. ([f8601cf](https://github.com/randytarampi/me/commit/f8601cf))
* **js:** Generate correct `Language` Schema.org JSON. ([6279baf](https://github.com/randytarampi/me/commit/6279baf))





## [1.3.8](https://github.com/randytarampi/me/compare/v1.3.7...v1.3.8) (2018-11-10)


### Bug Fixes

* **posts:** `getPostsRss` actually `augmentUrlWithTrackingParams`. ([644fd7e](https://github.com/randytarampi/me/commit/644fd7e))





## [1.3.7](https://github.com/randytarampi/me/compare/v1.3.6...v1.3.7) (2018-11-08)

**Note:** Version bump only for package @randy.tarampi/js





## [1.3.6](https://github.com/randytarampi/me/compare/v1.3.5...v1.3.6) (2018-11-07)

**Note:** Version bump only for package @randy.tarampi/js





## [1.3.5](https://github.com/randytarampi/me/compare/v1.3.4...v1.3.5) (2018-11-07)

**Note:** Version bump only for package @randy.tarampi/js





## [1.3.4](https://github.com/randytarampi/me/compare/v1.3.3...v1.3.4) (2018-11-07)

**Note:** Version bump only for package @randy.tarampi/js





## [1.3.3](https://github.com/randytarampi/me/compare/v1.3.2...v1.3.3) (2018-11-07)

**Note:** Version bump only for package @randy.tarampi/js





## [1.3.2](https://github.com/randytarampi/me/compare/v1.3.1...v1.3.2) (2018-11-06)

**Note:** Version bump only for package @randy.tarampi/js





## [1.3.1](https://github.com/randytarampi/me/compare/v1.3.0...v1.3.1) (2018-11-06)

**Note:** Version bump only for package @randy.tarampi/js





# [1.3.0](https://github.com/randytarampi/me/compare/v1.2.5...v1.3.0) (2018-11-06)

**Note:** Version bump only for package @randy.tarampi/js





## [1.2.5](https://github.com/randytarampi/me/compare/v1.2.4...v1.2.5) (2018-11-06)

**Note:** Version bump only for package @randy.tarampi/js





## [1.2.4](https://github.com/randytarampi/me/compare/v1.2.3...v1.2.4) (2018-11-05)


### Bug Fixes

* **package:** `lib` now lives in `src/lib`. ([84cced2](https://github.com/randytarampi/me/commit/84cced2))





## [1.2.3](https://github.com/randytarampi/me/compare/v1.2.2...v1.2.3) (2018-11-05)

**Note:** Version bump only for package @randy.tarampi/js





## [1.2.2](https://github.com/randytarampi/me/compare/v1.2.1...v1.2.2) (2018-11-05)

**Note:** Version bump only for package @randy.tarampi/js





## [1.2.1](https://github.com/randytarampi/me/compare/v1.2.0...v1.2.1) (2018-11-05)

**Note:** Version bump only for package @randy.tarampi/js





# [1.2.0](https://github.com/randytarampi/me/compare/v1.1.8...v1.2.0) (2018-11-04)

**Note:** Version bump only for package @randy.tarampi/js





## [1.1.8](https://github.com/randytarampi/me/compare/v1.1.7...v1.1.8) (2018-11-04)

**Note:** Version bump only for package @randy.tarampi/js





## [1.1.7](https://github.com/randytarampi/me/compare/v1.1.6...v1.1.7) (2018-11-04)

**Note:** Version bump only for package @randy.tarampi/js





## [1.1.6](https://github.com/randytarampi/me/compare/v1.1.5...v1.1.6) (2018-11-04)

**Note:** Version bump only for package @randy.tarampi/js





## [1.1.5](https://github.com/randytarampi/me/compare/v1.1.4...v1.1.5) (2018-11-03)

**Note:** Version bump only for package @randy.tarampi/js





## [1.1.4](https://github.com/randytarampi/me/compare/v1.1.3...v1.1.4) (2018-11-03)


### Bug Fixes

* **js:** Fix tests broken in 2f3ac10b80f086e812e66ae85262bebdaec5dff3. ([7882012](https://github.com/randytarampi/me/commit/7882012))
* **letter:** Recipient section renders `PostalAddress#postOfficeBoxNumber` ([2f3ac10](https://github.com/randytarampi/me/commit/2f3ac10)), closes [PostalAddress#address2](https://github.com/PostalAddress/issues/address2)





## [1.1.3](https://github.com/randytarampi/me/compare/v1.1.2...v1.1.3) (2018-11-02)

**Note:** Version bump only for package @randy.tarampi/js





## [1.1.2](https://github.com/randytarampi/me/compare/v1.1.1...v1.1.2) (2018-11-02)

**Note:** Version bump only for package @randy.tarampi/js





## [1.1.1](https://github.com/randytarampi/me/compare/v1.1.0...v1.1.1) (2018-11-02)

**Note:** Version bump only for package @randy.tarampi/js





# [1.1.0](https://github.com/randytarampi/me/compare/v1.0.2...v1.1.0) (2018-11-01)


### Bug Fixes

* **jsx:** `augmentUrlWithTrackingParams` shouldn't append empty query parameters. ([8f7c93b](https://github.com/randytarampi/me/commit/8f7c93b))





## [1.0.2](https://github.com/randytarampi/me/compare/v1.0.0...v1.0.2) (2018-11-01)


### Bug Fixes

* **package:** Packages don't `build` on `prepare` when `$IS_PUBLISHING`. ([44f196e](https://github.com/randytarampi/me/commit/44f196e))





## [1.0.1](https://github.com/randytarampi/me/compare/v1.0.0...v1.0.1) (2018-11-01)

**Note:** Version bump only for package @randy.tarampi/js





# [1.0.0](https://github.com/randytarampi/me/compare/v0.48.0...v1.0.0) (2018-10-31)

**Note:** Version bump only for package @randy.tarampi/js





# [0.48.0](https://github.com/randytarampi/me/compare/v0.47.22...v0.48.0) (2018-10-31)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.22](https://github.com/randytarampi/me/compare/v0.47.21...v0.47.22) (2018-10-31)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.21](https://github.com/randytarampi/me/compare/v0.47.20...v0.47.21) (2018-10-31)


### Bug Fixes

* **travis:** Don't `build` on `prepare` when `$IS_PUBLISHING`. ([6cbf3c8](https://github.com/randytarampi/me/commit/6cbf3c8))





## [0.47.20](https://github.com/randytarampi/me/compare/v0.47.19...v0.47.20) (2018-10-31)


### Bug Fixes

* **travis:** Only rebuild on `prepack` when `$RELEASE` and `$CI`. ([f76a911](https://github.com/randytarampi/me/commit/f76a911))





## [0.47.19](https://github.com/randytarampi/me/compare/v0.47.18...v0.47.19) (2018-10-31)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.18](https://github.com/randytarampi/me/compare/v0.47.17...v0.47.18) (2018-10-31)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.17](https://github.com/randytarampi/me/compare/v0.47.16...v0.47.17) (2018-10-31)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.16](https://github.com/randytarampi/me/compare/v0.47.15...v0.47.16) (2018-10-30)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.15](https://github.com/randytarampi/me/compare/v0.47.14...v0.47.15) (2018-10-30)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.14](https://github.com/randytarampi/me/compare/v0.47.13...v0.47.14) (2018-10-30)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.13](https://github.com/randytarampi/me/compare/v0.47.12...v0.47.13) (2018-10-30)


### Bug Fixes

* **package:** Fix inverted logic in 2bbe750e51d43f389ca8fb688fd8db8ab78ec9d0. ([118b1a2](https://github.com/randytarampi/me/commit/118b1a2))
* **posts:** Build `prd` assets for release once. ([2bbe750](https://github.com/randytarampi/me/commit/2bbe750))
* Remove `package-lock`s. ([b2bf2db](https://github.com/randytarampi/me/commit/b2bf2db))
* **travis:** Turns out Travis uses `sh` instead of `bash`, so make these standard conditionals. ([76fef6b](https://github.com/randytarampi/me/commit/76fef6b))





## [0.47.12](https://github.com/randytarampi/me/compare/v0.47.11...v0.47.12) (2018-10-30)

**Note:** Version bump only for package @randy.tarampi/js







**Note:** Version bump only for package @randy.tarampi/js





## [0.47.10](https://github.com/randytarampi/me/compare/v0.47.9...v0.47.10) (2018-10-29)


### Bug Fixes

* **package:** Just nuke all these `package-lock`s for now. ([a6c7d72](https://github.com/randytarampi/me/commit/a6c7d72))





## [0.47.9](https://github.com/randytarampi/me/compare/v0.47.8...v0.47.9) (2018-10-29)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.8](https://github.com/randytarampi/me/compare/v0.47.7...v0.47.8) (2018-10-29)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.7](https://github.com/randytarampi/me/compare/v0.47.6...v0.47.7) (2018-10-29)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.6](https://github.com/randytarampi/me/compare/v0.47.5...v0.47.6) (2018-10-29)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.5](https://github.com/randytarampi/me/compare/v0.47.4...v0.47.5) (2018-10-29)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.4](https://github.com/randytarampi/me/compare/v0.47.3...v0.47.4) (2018-10-29)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.3](https://github.com/randytarampi/me/compare/v0.47.2...v0.47.3) (2018-10-28)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.2](https://github.com/randytarampi/me/compare/v0.47.1...v0.47.2) (2018-10-28)

**Note:** Version bump only for package @randy.tarampi/js





## [0.47.1](https://github.com/randytarampi/me/compare/v0.47.0...v0.47.1) (2018-10-28)

**Note:** Version bump only for package @randy.tarampi/js





# [0.47.0](https://github.com/randytarampi/me/compare/v0.46.1...v0.47.0) (2018-10-28)


### Bug Fixes

* Lock down `immutable@4.0.0-rc.10`. ([fc34855](https://github.com/randytarampi/me/commit/fc34855))


### Features

* **js:** Allow ourselves to turn `Post`s and `Photo`s `toRss()`. ([616c35d](https://github.com/randytarampi/me/commit/616c35d)), closes [randytarampi/me.blog#3](https://github.com/randytarampi/me.blog/issues/3)
* **posts:** `augmentUrlWithTrackingParams` for each RSS link. ([e5b2083](https://github.com/randytarampi/me/commit/e5b2083))





## [0.46.1](https://github.com/randytarampi/me/compare/v0.46.0...v0.46.1) (2018-10-26)

**Note:** Version bump only for package @randy.tarampi/js





# [0.46.0](https://github.com/randytarampi/me/compare/v0.45.8...v0.46.0) (2018-10-26)


### Features

* **www:** `redux-offline` persists `Person`s properly. ([7adff23](https://github.com/randytarampi/me/commit/7adff23))
* **www:** `redux-offline` persists `Post`s properly. ([2e08933](https://github.com/randytarampi/me/commit/2e08933))





## [0.45.8](https://github.com/randytarampi/me/compare/v0.45.7...v0.45.8) (2018-10-24)

**Note:** Version bump only for package @randy.tarampi/js





## [0.45.7](https://github.com/randytarampi/me/compare/v0.45.6...v0.45.7) (2018-10-22)

**Note:** Version bump only for package @randy.tarampi/js





## [0.45.6](https://github.com/randytarampi/me/compare/v0.45.5...v0.45.6) (2018-10-21)

**Note:** Version bump only for package @randy.tarampi/js





## [0.45.5](https://github.com/randytarampi/me/compare/v0.45.4...v0.45.5) (2018-10-21)

**Note:** Version bump only for package @randy.tarampi/js





## [0.45.4](https://github.com/randytarampi/me/compare/v0.45.3...v0.45.4) (2018-10-20)

**Note:** Version bump only for package @randy.tarampi/js





## [0.45.3](https://github.com/randytarampi/me/compare/v0.45.2...v0.45.3) (2018-10-20)

**Note:** Version bump only for package @randy.tarampi/js





## [0.45.2](https://github.com/randytarampi/me/compare/v0.45.1...v0.45.2) (2018-10-20)

**Note:** Version bump only for package @randy.tarampi/js





## [0.45.1](https://github.com/randytarampi/me/compare/v0.45.0...v0.45.1) (2018-10-20)

**Note:** Version bump only for package @randy.tarampi/js





# [0.45.0](https://github.com/randytarampi/me/compare/v0.44.0...v0.45.0) (2018-10-20)

**Note:** Version bump only for package @randy.tarampi/js





# [0.44.0](https://github.com/randytarampi/me/compare/v0.43.13...v0.44.0) (2018-10-19)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.13](https://github.com/randytarampi/me/compare/v0.43.12...v0.43.13) (2018-10-18)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.12](https://github.com/randytarampi/me/compare/v0.43.11...v0.43.12) (2018-10-18)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.11](https://github.com/randytarampi/me/compare/v0.43.10...v0.43.11) (2018-10-18)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.10](https://github.com/randytarampi/me/compare/v0.43.9...v0.43.10) (2018-10-18)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.9](https://github.com/randytarampi/me/compare/v0.43.8...v0.43.9) (2018-10-17)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.8](https://github.com/randytarampi/me/compare/v0.43.7...v0.43.8) (2018-10-17)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.7](https://github.com/randytarampi/me/compare/v0.43.6...v0.43.7) (2018-10-17)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.6](https://github.com/randytarampi/me/compare/v0.43.5...v0.43.6) (2018-10-17)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.5](https://github.com/randytarampi/me/compare/v0.43.4...v0.43.5) (2018-10-17)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.4](https://github.com/randytarampi/me/compare/v0.43.3...v0.43.4) (2018-10-17)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.3](https://github.com/randytarampi/me/compare/v0.43.2...v0.43.3) (2018-10-17)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.2](https://github.com/randytarampi/me/compare/v0.43.1...v0.43.2) (2018-10-16)

**Note:** Version bump only for package @randy.tarampi/js





## [0.43.1](https://github.com/randytarampi/me/compare/v0.43.0...v0.43.1) (2018-10-16)

**Note:** Version bump only for package @randy.tarampi/js





# [0.43.0](https://github.com/randytarampi/me/compare/v0.42.2...v0.43.0) (2018-10-16)

**Note:** Version bump only for package @randy.tarampi/js





## [0.42.2](https://github.com/randytarampi/me/compare/v0.42.1...v0.42.2) (2018-10-16)

**Note:** Version bump only for package @randy.tarampi/js





## [0.42.1](https://github.com/randytarampi/me/compare/v0.42.0...v0.42.1) (2018-10-16)

**Note:** Version bump only for package @randy.tarampi/js





# [0.42.0](https://github.com/randytarampi/me/compare/v0.41.7...v0.42.0) (2018-10-15)

**Note:** Version bump only for package @randy.tarampi/js





## [0.41.7](https://github.com/randytarampi/me/compare/v0.41.6...v0.41.7) (2018-10-15)

**Note:** Version bump only for package @randy.tarampi/js





## [0.41.6](https://github.com/randytarampi/me/compare/v0.41.5...v0.41.6) (2018-10-15)

**Note:** Version bump only for package @randy.tarampi/js





## [0.41.5](https://github.com/randytarampi/me/compare/v0.41.4...v0.41.5) (2018-10-15)

**Note:** Version bump only for package @randy.tarampi/js





## [0.41.4](https://github.com/randytarampi/me/compare/v0.41.3...v0.41.4) (2018-10-15)

**Note:** Version bump only for package @randy.tarampi/js





## [0.41.3](https://github.com/randytarampi/me/compare/v0.41.2...v0.41.3) (2018-10-15)

**Note:** Version bump only for package @randy.tarampi/js





## [0.41.2](https://github.com/randytarampi/me/compare/v0.41.1...v0.41.2) (2018-10-14)

**Note:** Version bump only for package @randy.tarampi/js





## [0.41.1](https://github.com/randytarampi/me/compare/v0.41.0...v0.41.1) (2018-10-13)

**Note:** Version bump only for package @randy.tarampi/js





# [0.41.0](https://github.com/randytarampi/me/compare/v0.40.19...v0.41.0) (2018-10-13)

**Note:** Version bump only for package @randy.tarampi/js





## [0.40.19](https://github.com/randytarampi/me/compare/v0.40.18...v0.40.19) (2018-10-10)

**Note:** Version bump only for package @randy.tarampi/js





## [0.40.18](https://github.com/randytarampi/me/compare/v0.40.17...v0.40.18) (2018-10-10)

**Note:** Version bump only for package @randy.tarampi/js





## [0.40.17](https://github.com/randytarampi/me/compare/v0.40.16...v0.40.17) (2018-10-10)

**Note:** Version bump only for package @randy.tarampi/js





## [0.40.16](https://github.com/randytarampi/me/compare/v0.40.15...v0.40.16) (2018-10-09)

**Note:** Version bump only for package @randy.tarampi/js





## [0.40.15](https://github.com/randytarampi/me/compare/v0.40.14...v0.40.15) (2018-10-05)

**Note:** Version bump only for package @randy.tarampi/js





## [0.40.14](https://github.com/randytarampi/me/compare/v0.40.13...v0.40.14) (2018-10-04)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.13"></a>
## [0.40.13](https://github.com/randytarampi/me/compare/v0.40.12...v0.40.13) (2018-09-30)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.12"></a>
## [0.40.12](https://github.com/randytarampi/me/compare/v0.40.11...v0.40.12) (2018-09-30)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.11"></a>
## [0.40.11](https://github.com/randytarampi/me/compare/v0.40.10...v0.40.11) (2018-09-27)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.10"></a>
## [0.40.10](https://github.com/randytarampi/me/compare/v0.40.9...v0.40.10) (2018-09-26)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.9"></a>
## [0.40.9](https://github.com/randytarampi/me/compare/v0.40.8...v0.40.9) (2018-09-26)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.8"></a>
## [0.40.8](https://github.com/randytarampi/me/compare/v0.40.7...v0.40.8) (2018-09-26)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.7"></a>
## [0.40.7](https://github.com/randytarampi/me/compare/v0.40.6...v0.40.7) (2018-09-26)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.6"></a>
## [0.40.6](https://github.com/randytarampi/me/compare/v0.40.5...v0.40.6) (2018-09-26)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.5"></a>
## [0.40.5](https://github.com/randytarampi/me/compare/v0.40.4...v0.40.5) (2018-09-25)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.4"></a>
## [0.40.4](https://github.com/randytarampi/me/compare/v0.40.3...v0.40.4) (2018-09-25)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.3"></a>
## [0.40.3](https://github.com/randytarampi/me/compare/v0.40.2...v0.40.3) (2018-09-24)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.2"></a>
## [0.40.2](https://github.com/randytarampi/me/compare/v0.40.1...v0.40.2) (2018-09-24)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.1"></a>
## [0.40.1](https://github.com/randytarampi/me/compare/v0.40.0...v0.40.1) (2018-09-24)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.40.0"></a>
# [0.40.0](https://github.com/randytarampi/me/compare/v0.39.13...v0.40.0) (2018-09-24)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.39.13"></a>
## [0.39.13](https://github.com/randytarampi/me/compare/v0.39.12...v0.39.13) (2018-09-24)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.39.12"></a>
## [0.39.12](https://github.com/randytarampi/me/compare/v0.39.11...v0.39.12) (2018-09-24)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.39.11"></a>
## [0.39.11](https://github.com/randytarampi/me/compare/v0.39.10...v0.39.11) (2018-09-23)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.39.10"></a>
## [0.39.10](https://github.com/randytarampi/me/compare/v0.39.9...v0.39.10) (2018-09-23)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.39.9"></a>
## [0.39.9](https://github.com/randytarampi/me/compare/v0.39.8...v0.39.9) (2018-09-23)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.39.8"></a>
## [0.39.8](https://github.com/randytarampi/me/compare/v0.39.7...v0.39.8) (2018-09-23)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.39.7"></a>
## [0.39.7](https://github.com/randytarampi/me/compare/v0.39.6...v0.39.7) (2018-09-23)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.39.6"></a>
## [0.39.6](https://github.com/randytarampi/me/compare/v0.39.5...v0.39.6) (2018-09-23)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.39.5"></a>
## [0.39.5](https://github.com/randytarampi/me/compare/v0.39.4...v0.39.5) (2018-09-22)


### Bug Fixes

* **docs:** Better namespace the `ga-beacon` path. ([803878a](https://github.com/randytarampi/me/commit/803878a))
* **resume:** Split out `jsonresume-theme` from `[@randy](https://github.com/randy).tarampi/resume`. ([abf0005](https://github.com/randytarampi/me/commit/abf0005))





<a name="0.39.4"></a>
## [0.39.4](https://github.com/randytarampi/me/compare/v0.39.3...v0.39.4) (2018-09-22)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.39.3"></a>
## [0.39.3](https://github.com/randytarampi/me/compare/v0.39.2...v0.39.3) (2018-09-22)


### Bug Fixes

* Rely on `prepack` to `NODE_ENV=prd npm run build`. ([6438959](https://github.com/randytarampi/me/commit/6438959))





<a name="0.39.2"></a>
## [0.39.2](https://github.com/randytarampi/me/compare/v0.39.1...v0.39.2) (2018-09-22)


### Bug Fixes

* **docs:** `https://nodei.co/npm` -> `https://nodeico.herokuapp.com`. ([25a8929](https://github.com/randytarampi/me/commit/25a8929))





<a name="0.39.1"></a>
## [0.39.1](https://github.com/randytarampi/me/compare/v0.39.0...v0.39.1) (2018-09-22)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.39.0"></a>
# [0.39.0](https://github.com/randytarampi/me/compare/v0.35.0...v0.39.0) (2018-09-22)


### Features

* **resume:** Make `resume` publishable per [#67](https://github.com/randytarampi/me/issues/67). ([7686d58](https://github.com/randytarampi/me/commit/7686d58))





<a name="0.38.0"></a>
# [0.38.0](https://github.com/randytarampi/me/compare/v0.35.0...v0.38.0) (2018-09-22)


### Features

* **resume:** Make `resume` publishable per [#67](https://github.com/randytarampi/me/issues/67). ([7686d58](https://github.com/randytarampi/me/commit/7686d58))





<a name="0.37.0"></a>
# [0.37.0](https://github.com/randytarampi/me/compare/v0.35.0...v0.37.0) (2018-09-22)


### Features

* **resume:** Make `resume` publishable per [#67](https://github.com/randytarampi/me/issues/67). ([7686d58](https://github.com/randytarampi/me/commit/7686d58))





<a name="0.36.0"></a>
# [0.36.0](https://github.com/randytarampi/me/compare/v0.35.0...v0.36.0) (2018-09-21)


### Features

* **resume:** Make `resume` publishable per [#67](https://github.com/randytarampi/me/issues/67). ([7686d58](https://github.com/randytarampi/me/commit/7686d58))





<a name="0.35.0"></a>
# [0.35.0](https://github.com/randytarampi/me/compare/v0.34.3...v0.35.0) (2018-09-20)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.34.3"></a>
## [0.34.3](https://github.com/randytarampi/me/compare/v0.34.1...v0.34.3) (2018-09-20)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.34.2"></a>
## [0.34.2](https://github.com/randytarampi/me/compare/v0.34.1...v0.34.2) (2018-09-20)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.34.1"></a>
## [0.34.1](https://github.com/randytarampi/me/compare/v0.34.0...v0.34.1) (2018-09-19)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.34.0"></a>
# [0.34.0](https://github.com/randytarampi/me/compare/v0.33.2...v0.34.0) (2018-09-18)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.33.2"></a>
## [0.33.2](https://github.com/randytarampi/me/compare/v0.33.1...v0.33.2) (2018-09-18)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.33.1"></a>
## [0.33.1](https://github.com/randytarampi/me/compare/v0.33.0...v0.33.1) (2018-09-18)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.33.0"></a>
# [0.33.0](https://github.com/randytarampi/me/compare/v0.32.1...v0.33.0) (2018-09-18)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.32.1"></a>
## [0.32.1](https://github.com/randytarampi/me/compare/v0.32.0...v0.32.1) (2018-09-17)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.32.0"></a>
# [0.32.0](https://github.com/randytarampi/me/compare/v0.31.7...v0.32.0) (2018-09-17)


### Bug Fixes

* Try fixing iOS 6 Safari and IE<=10 brokenness by adding `[@babel](https://github.com/babel)/plugin-transform-proto-to-assign`. ([59b4cc7](https://github.com/randytarampi/me/commit/59b4cc7))


### Features

* Add some basic structured data to our pages per [#25](https://github.com/randytarampi/me/issues/25). ([a513c63](https://github.com/randytarampi/me/commit/a513c63))





<a name="0.31.7"></a>
## [0.31.7](https://github.com/randytarampi/me/compare/v0.31.6...v0.31.7) (2018-09-16)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.31.6"></a>
## [0.31.6](https://github.com/randytarampi/me/compare/v0.31.5...v0.31.6) (2018-09-16)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.31.5"></a>
## [0.31.5](https://github.com/randytarampi/me/compare/v0.31.4...v0.31.5) (2018-09-16)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.31.4"></a>
## [0.31.4](https://github.com/randytarampi/me/compare/v0.31.3...v0.31.4) (2018-09-16)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.31.3"></a>
## [0.31.3](https://github.com/randytarampi/me/compare/v0.31.2...v0.31.3) (2018-09-15)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.31.2"></a>
## [0.31.2](https://github.com/randytarampi/me/compare/v0.31.1...v0.31.2) (2018-09-15)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.31.1"></a>
## [0.31.1](https://github.com/randytarampi/me/compare/v0.31.0...v0.31.1) (2018-09-15)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.30.0"></a>
# [0.30.0](https://github.com/randytarampi/me/compare/v0.29.1...v0.30.0) (2018-09-15)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.29.1"></a>
## [0.29.1](https://github.com/randytarampi/me/compare/v0.29.0...v0.29.1) (2018-09-14)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.29.0"></a>
# [0.29.0](https://github.com/randytarampi/me/compare/v0.28.0...v0.29.0) (2018-09-14)


### Features

* **config:** Pull more details about `me` into the config, per [#54](https://github.com/randytarampi/me/issues/54). ([c198fdd](https://github.com/randytarampi/me/commit/c198fdd)), closes [#25](https://github.com/randytarampi/me/issues/25)
* **js:** `Person` and `PostalAddress` look more like `Schema.org` entities. ([1c91b8b](https://github.com/randytarampi/me/commit/1c91b8b))
* **js:** Format phone numbers on `Person`. ([6f66508](https://github.com/randytarampi/me/commit/6f66508))
* **resume:** Parse `resume.json` into a Immutable `Record`. ([6b0f4b2](https://github.com/randytarampi/me/commit/6b0f4b2)), closes [#67](https://github.com/randytarampi/me/issues/67) [#25](https://github.com/randytarampi/me/issues/25)





<a name="0.28.0"></a>
# [0.28.0](https://github.com/randytarampi/me/compare/v0.27.1...v0.28.0) (2018-09-13)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.27.1"></a>
## [0.27.1](https://github.com/randytarampi/me/compare/v0.27.0...v0.27.1) (2018-09-13)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.27.0"></a>
# [0.27.0](https://github.com/randytarampi/me/compare/v0.26.1...v0.27.0) (2018-09-13)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.26.1"></a>
## [0.26.1](https://github.com/randytarampi/me/compare/v0.26.0...v0.26.1) (2018-09-12)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.26.0"></a>
# [0.26.0](https://github.com/randytarampi/me/compare/v0.25.4...v0.26.0) (2018-09-12)


### Features

* Close [#24](https://github.com/randytarampi/me/issues/24) and fully flesh out module's public interfaces. ([0042eda](https://github.com/randytarampi/me/commit/0042eda)), closes [#67](https://github.com/randytarampi/me/issues/67)





<a name="0.25.4"></a>
## [0.25.4](https://github.com/randytarampi/me/compare/v0.25.3...v0.25.4) (2018-09-12)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.25.3"></a>
## [0.25.3](https://github.com/randytarampi/me/compare/v0.25.2...v0.25.3) (2018-09-11)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.25.2"></a>
## [0.25.2](https://github.com/randytarampi/me/compare/v0.25.1...v0.25.2) (2018-09-11)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.25.1"></a>
## [0.25.1](https://github.com/randytarampi/me/compare/v0.25.0...v0.25.1) (2018-09-11)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.25.0"></a>
# [0.25.0](https://github.com/randytarampi/me/compare/v0.24.7...v0.25.0) (2018-09-11)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.24.2"></a>
## [0.24.2](https://github.com/randytarampi/me/compare/v0.24.1...v0.24.2) (2018-09-09)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.24.0"></a>
# [0.24.0](https://github.com/randytarampi/me/compare/v0.23.12...v0.24.0) (2018-09-06)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.23.9"></a>
## [0.23.9](https://github.com/randytarampi/me/compare/v0.23.8...v0.23.9) (2018-09-05)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.23.5"></a>
## [0.23.5](https://github.com/randytarampi/me/compare/v0.23.4...v0.23.5) (2018-09-04)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.23.0"></a>
# [0.23.0](https://github.com/randytarampi/me/compare/v0.22.9...v0.23.0) (2018-09-02)


### Features

* Use bunyan for logging per [#78](https://github.com/randytarampi/me/issues/78). ([d03610b](https://github.com/randytarampi/me/commit/d03610b)), closes [#81](https://github.com/randytarampi/me/issues/81) [#81](https://github.com/randytarampi/me/issues/81)





<a name="0.22.5"></a>
## [0.22.5](https://github.com/randytarampi/me/compare/v0.22.4...v0.22.5) (2018-09-01)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.22.2"></a>
## [0.22.2](https://github.com/randytarampi/me/compare/v0.22.1...v0.22.2) (2018-08-31)


### Bug Fixes

* **js:** `Photo#getSizedPhoto` -> `Photo#getSizedPhotoForDisplay`. ([01d270f](https://github.com/randytarampi/me/commit/01d270f))





<a name="0.22.0"></a>
# [0.22.0](https://github.com/randytarampi/me/compare/v0.21.0...v0.22.0) (2018-08-31)


### Bug Fixes

* **js:** `SizedPhoto.fromJSON` needs to deserialize `width` and `height` back into numbers. ([439c728](https://github.com/randytarampi/me/commit/439c728))


### Features

* **jsx:** Add some low rent progressive image loading. ([ed43977](https://github.com/randytarampi/me/commit/ed43977))





<a name="0.21.0"></a>
# [0.21.0](https://github.com/randytarampi/me/compare/v0.20.6...v0.21.0) (2018-08-31)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.20.0"></a>
# [0.20.0](https://github.com/randytarampi/me/compare/v0.19.6...v0.20.0) (2018-08-28)


### Features

* **jsx:** Reduxify `ʕ•ᴥ•ʔ`s. ([8726f68](https://github.com/randytarampi/me/commit/8726f68)), closes [#16](https://github.com/randytarampi/me/issues/16)





<a name="0.19.4"></a>
## [0.19.4](https://github.com/randytarampi/me/compare/v0.19.3...v0.19.4) (2018-08-27)


### Bug Fixes

* **js:** Remove logging from 4929399324197924b18f52085043607c8365a84f. ([4c62e5c](https://github.com/randytarampi/me/commit/4c62e5c))





<a name="0.19.3"></a>
## [0.19.3](https://github.com/randytarampi/me/compare/v0.19.2...v0.19.3) (2018-08-27)


### Bug Fixes

* **js:** `getEntityForType` shouldn't rely on class names in the switch/case. ([4929399](https://github.com/randytarampi/me/commit/4929399))





<a name="0.19.1"></a>
## [0.19.1](https://github.com/randytarampi/me/compare/v0.19.0...v0.19.1) (2018-08-27)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.19.0"></a>
# [0.19.0](https://github.com/randytarampi/me/compare/v0.18.4...v0.19.0) (2018-08-27)


### Bug Fixes

* **jsx:** Prioritize `Post.datePublished` over `Post.dateCreated`. ([539d54e](https://github.com/randytarampi/me/commit/539d54e))





<a name="0.18.1"></a>
## [0.18.1](https://github.com/randytarampi/me/compare/v0.18.0...v0.18.1) (2018-08-24)


### Bug Fixes

* User facing URLs should be `https`, and rooted at `www.randytarampi.ca`. ([f3ee4ea](https://github.com/randytarampi/me/commit/f3ee4ea))





<a name="0.18.0"></a>
# [0.18.0](https://github.com/randytarampi/me/compare/v0.17.1...v0.18.0) (2018-08-24)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.17.0"></a>
# [0.17.0](https://github.com/randytarampi/me/compare/v0.16.5...v0.17.0) (2018-08-23)


### Features

* **jsx:** Use the version 2 `get(Posts|Photos|Words)` API. ([ee00df7](https://github.com/randytarampi/me/commit/ee00df7)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15) [randytarampi/me.photos#11](https://github.com/randytarampi/me.photos/issues/11) [randytarampi/me.words#1](https://github.com/randytarampi/me.words/issues/1)





<a name="0.16.0"></a>
# [0.16.0](https://github.com/randytarampi/me/compare/v0.15.0...v0.16.0) (2018-08-20)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.15.0"></a>
# [0.15.0](https://github.com/randytarampi/me/compare/v0.14.3...v0.15.0) (2018-08-19)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.14.0"></a>
# [0.14.0](https://github.com/randytarampi/me/compare/v0.13.1...v0.14.0) (2018-08-18)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.13.0"></a>
# [0.13.0](https://github.com/randytarampi/me/compare/v0.12.1...v0.13.0) (2018-08-17)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.12.0"></a>
# [0.12.0](https://github.com/randytarampi/me/compare/v0.11.3...v0.12.0) (2018-08-17)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.11.0"></a>
# [0.11.0](https://github.com/randytarampi/me/compare/v0.10.9...v0.11.0) (2018-08-14)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.10.7"></a>
## [0.10.7](https://github.com/randytarampi/me/compare/v0.10.6...v0.10.7) (2018-08-11)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.10.0"></a>
# [0.10.0](https://github.com/randytarampi/me/compare/v0.9.1...v0.10.0) (2018-08-10)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.9.0"></a>
# [0.9.0](https://github.com/randytarampi/me/compare/v0.8.2...v0.9.0) (2018-08-10)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.8.0"></a>
# [0.8.0](https://github.com/randytarampi/me/compare/v0.7.0...v0.8.0) (2018-08-08)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.7.0"></a>
# [0.7.0](https://github.com/randytarampi/me/compare/v0.6.8...v0.7.0) (2018-08-08)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.6.0"></a>
# [0.6.0](https://github.com/randytarampi/me/compare/v0.5.1...v0.6.0) (2018-08-03)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.5.0"></a>
# [0.5.0](https://github.com/randytarampi/me/compare/v0.4.0...v0.5.0) (2018-08-03)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.4.0"></a>
# [0.4.0](https://github.com/randytarampi/me/compare/v0.3.2...v0.4.0) (2018-08-03)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.3.0"></a>
# [0.3.0](https://github.com/randytarampi/me/compare/v0.2.0...v0.3.0) (2018-08-01)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.2.0"></a>
# [0.2.0](https://github.com/randytarampi/me/compare/v0.1.11...v0.2.0) (2018-07-30)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.1.8"></a>
## [0.1.8](https://github.com/randytarampi/me/compare/v0.1.7...v0.1.8) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.1.7"></a>
## [0.1.7](https://github.com/randytarampi/me/compare/v0.1.6...v0.1.7) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.1.0"></a>
# [0.1.0](https://github.com/randytarampi/me/compare/v0.0.11...v0.1.0) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.0.11"></a>
## [0.0.11](https://github.com/randytarampi/me/compare/v0.0.10...v0.0.11) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.0.10"></a>
## [0.0.10](https://github.com/randytarampi/me/compare/v0.0.9...v0.0.10) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.0.9"></a>
## [0.0.9](https://github.com/randytarampi/me/compare/v0.0.8...v0.0.9) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.0.8"></a>
## [0.0.8](https://github.com/randytarampi/me/compare/v0.0.7...v0.0.8) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.0.7"></a>
## [0.0.7](https://github.com/randytarampi/me/compare/v0.0.6...v0.0.7) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/js





<a name="0.0.6"></a>
## 0.0.6 (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/js
