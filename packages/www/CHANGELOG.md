# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.6.2"></a>
## [0.6.2](https://github.com/randytarampi/me/compare/v0.6.1...v0.6.2) (2018-08-04)


### Bug Fixes

* **www:** Fix client side page titles. ([946b7d3](https://github.com/randytarampi/me/commit/946b7d3)), closes [#22](https://github.com/randytarampi/me/issues/22)





<a name="0.6.1"></a>
## [0.6.1](https://github.com/randytarampi/me/compare/v0.6.0...v0.6.1) (2018-08-04)


### Bug Fixes

* **travis:** Fix broken deploy caused by e812d8a914397280b80406e365f274b8297173cd. ([1c38756](https://github.com/randytarampi/me/commit/1c38756))
* **www:** Hack around the fontawesome font copying issue. ([e812d8a](https://github.com/randytarampi/me/commit/e812d8a)), closes [#21](https://github.com/randytarampi/me/issues/21)
* **www:** More missing fontawesome font diagnosis per 58bd1331292461641c03805be47db84e91f04f51. ([fea25c8](https://github.com/randytarampi/me/commit/fea25c8))
* **www:** More missing fontawesome font diagnosis per 6b7c37f39cd7239ae29e0fedd92ead8074e1fba9. ([58bd133](https://github.com/randytarampi/me/commit/58bd133))





<a name="0.6.0"></a>
# [0.6.0](https://github.com/randytarampi/me/compare/v0.5.1...v0.6.0) (2018-08-03)


### Bug Fixes

* **www:** More missing fontawesome font diagnosis per ae8b63d46850ce58cda03381bccd5a4a27f23323. ([6b7c37f](https://github.com/randytarampi/me/commit/6b7c37f))





<a name="0.5.0"></a>
# [0.5.0](https://github.com/randytarampi/me/compare/v0.4.0...v0.5.0) (2018-08-03)

**Note:** Version bump only for package @randy.tarampi/www





<a name="0.4.0"></a>
# [0.4.0](https://github.com/randytarampi/me/compare/v0.3.2...v0.4.0) (2018-08-03)


### Bug Fixes

* **travis:** Actually copy assets to the `www` and `resume` root directories on deploy. ([28f4421](https://github.com/randytarampi/me/commit/28f4421))


### Features

* **favicon:** Add a variety of favicons. ([0552c1f](https://github.com/randytarampi/me/commit/0552c1f))
* **resume:** Make an actually decent PDF resume. ([7678c86](https://github.com/randytarampi/me/commit/7678c86)), closes [#9](https://github.com/randytarampi/me/issues/9) [#10](https://github.com/randytarampi/me/issues/10) [#5](https://github.com/randytarampi/me/issues/5)





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





<a name="0.2.0"></a>
# [0.2.0](https://github.com/randytarampi/me/compare/v0.1.11...v0.2.0) (2018-07-30)


### Bug Fixes

* **css:** Fix the pulling in of `css` assets during builds. ([d3c270d](https://github.com/randytarampi/me/commit/d3c270d))


### Features

* **resume:** Style `resume` consistently with the rest of the app. ([#2](https://github.com/randytarampi/me/issues/2)) ([9c2fa27](https://github.com/randytarampi/me/commit/9c2fa27))





<a name="0.1.11"></a>
## [0.1.11](https://github.com/randytarampi/me/compare/v0.1.10...v0.1.11) (2018-07-28)


### Bug Fixes

* **webpack:** The commit env variable in Travis land is `TRAVIS_COMMIT`. ([e32f8ea](https://github.com/randytarampi/me/commit/e32f8ea))
* **www:** Don't require babel to parse `webpack.config.js`. ([3a778c6](https://github.com/randytarampi/me/commit/3a778c6))





<a name="0.1.10"></a>
## [0.1.10](https://github.com/randytarampi/me/compare/v0.1.9...v0.1.10) (2018-07-28)


### Bug Fixes

* Use `webpack-sentry-plugin` instead of `[@sentry](https://github.com/sentry)/webpack-plugin`. ([5522bab](https://github.com/randytarampi/me/commit/5522bab))
* **travis:** Only build `docs` for `www` on deploy. ([e7146ff](https://github.com/randytarampi/me/commit/e7146ff))





<a name="0.1.9"></a>
## [0.1.9](https://github.com/randytarampi/me/compare/v0.1.8...v0.1.9) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/www





<a name="0.1.8"></a>
## [0.1.8](https://github.com/randytarampi/me/compare/v0.1.7...v0.1.8) (2018-07-28)


### Bug Fixes

* **www:** Actually move the built `html` files into the root directory. ([36da20f](https://github.com/randytarampi/me/commit/36da20f))





<a name="0.1.7"></a>
## [0.1.7](https://github.com/randytarampi/me/compare/v0.1.6...v0.1.7) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/www





<a name="0.1.6"></a>
## [0.1.6](https://github.com/randytarampi/me/compare/v0.1.5...v0.1.6) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/www





<a name="0.1.5"></a>
## [0.1.5](https://github.com/randytarampi/me/compare/v0.1.4...v0.1.5) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/www





<a name="0.1.4"></a>
## [0.1.4](https://github.com/randytarampi/me/compare/v0.1.3...v0.1.4) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/www





<a name="0.1.3"></a>
## [0.1.3](https://github.com/randytarampi/me/compare/v0.1.2...v0.1.3) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/www





<a name="0.1.2"></a>
## [0.1.2](https://github.com/randytarampi/me/compare/v0.1.1...v0.1.2) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/www





<a name="0.1.1"></a>
## [0.1.1](https://github.com/randytarampi/me/compare/v0.1.0...v0.1.1) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/www





<a name="0.1.0"></a>
# [0.1.0](https://github.com/randytarampi/me/compare/v0.0.11...v0.1.0) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/www





<a name="0.0.11"></a>
## [0.0.11](https://github.com/randytarampi/me/compare/v0.0.10...v0.0.11) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/www





<a name="0.0.10"></a>
## [0.0.10](https://github.com/randytarampi/me/compare/v0.0.9...v0.0.10) (2018-07-27)


### Bug Fixes

* **www:** Only build and add assets on `Deploy`. ([0131302](https://github.com/randytarampi/me/commit/0131302))
* **www:** This is actually `[@randy](https://github.com/randy).tarampi/www`. ([7a7991b](https://github.com/randytarampi/me/commit/7a7991b))





<a name="0.0.9"></a>
## [0.0.9](https://github.com/randytarampi/me/compare/v0.0.8...v0.0.9) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/web





<a name="0.0.8"></a>
## [0.0.8](https://github.com/randytarampi/me/compare/v0.0.7...v0.0.8) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/web





<a name="0.0.7"></a>
## [0.0.7](https://github.com/randytarampi/me/compare/v0.0.6...v0.0.7) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/web





<a name="0.0.6"></a>
## 0.0.6 (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/web
