# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.6.5"></a>
## [0.6.5](https://github.com/randytarampi/me/compare/v0.6.4...v0.6.5) (2018-08-06)

**Note:** Version bump only for package jsonresume-theme-randytarampi





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

* **travis:** Fix broken deploy caused by e812d8a914397280b80406e365f274b8297173cd. ([1c38756](https://github.com/randytarampi/me/commit/1c38756))
* **www:** Hack around the fontawesome font copying issue. ([e812d8a](https://github.com/randytarampi/me/commit/e812d8a)), closes [#21](https://github.com/randytarampi/me/issues/21)
* **www:** More missing fontawesome font diagnosis per 58bd1331292461641c03805be47db84e91f04f51. ([fea25c8](https://github.com/randytarampi/me/commit/fea25c8))
* **www:** More missing fontawesome font diagnosis per 6b7c37f39cd7239ae29e0fedd92ead8074e1fba9. ([58bd133](https://github.com/randytarampi/me/commit/58bd133))





<a name="0.6.0"></a>
# [0.6.0](https://github.com/randytarampi/me/compare/v0.5.1...v0.6.0) (2018-08-03)


### Bug Fixes

* **resume:** Push the `small-screen` breakpoint back `6px` to facilitate printing on A4. ([5141d96](https://github.com/randytarampi/me/commit/5141d96)), closes [#18](https://github.com/randytarampi/me/issues/18)
* **www:** More missing fontawesome font diagnosis per ae8b63d46850ce58cda03381bccd5a4a27f23323. ([6b7c37f](https://github.com/randytarampi/me/commit/6b7c37f))


### Features

* **resume:** Pass some `RESUME_PDF_SIZE` so we can generate US Letter and A4 pdfs on builds. ([79bfdba](https://github.com/randytarampi/me/commit/79bfdba)), closes [#18](https://github.com/randytarampi/me/issues/18)





<a name="0.5.1"></a>
## [0.5.1](https://github.com/randytarampi/me/compare/v0.5.0...v0.5.1) (2018-08-03)


### Bug Fixes

* **resume:** Point people to `http://www.randytarampi.ca/resume`. ([023c0b9](https://github.com/randytarampi/me/commit/023c0b9)), closes [#11](https://github.com/randytarampi/me/issues/11)





<a name="0.5.0"></a>
# [0.5.0](https://github.com/randytarampi/me/compare/v0.4.0...v0.5.0) (2018-08-03)

**Note:** Version bump only for package jsonresume-theme-randytarampi





<a name="0.4.0"></a>
# [0.4.0](https://github.com/randytarampi/me/compare/v0.3.2...v0.4.0) (2018-08-03)


### Bug Fixes

* **resume:** Hack around travis for now and just add index.* assets myself. ([46c3332](https://github.com/randytarampi/me/commit/46c3332))
* **resume:** Make `resume` generate decent `Letter` sized PDFs. ([accdfb0](https://github.com/randytarampi/me/commit/accdfb0))
* **resume:** The `resume` pug template pulls in external fontawesome CSS. ([9db0dc1](https://github.com/randytarampi/me/commit/9db0dc1))


### Features

* **favicon:** Add a variety of favicons. ([0552c1f](https://github.com/randytarampi/me/commit/0552c1f))
* **resume:** Make an actually decent PDF resume. ([7678c86](https://github.com/randytarampi/me/commit/7678c86)), closes [#9](https://github.com/randytarampi/me/issues/9) [#10](https://github.com/randytarampi/me/issues/10) [#5](https://github.com/randytarampi/me/issues/5)
* **resume:** Try and fill in the left hand label columns. ([a8d7eea](https://github.com/randytarampi/me/commit/a8d7eea))





<a name="0.3.2"></a>
## [0.3.2](https://github.com/randytarampi/me/compare/v0.3.1...v0.3.2) (2018-08-01)


### Bug Fixes

* **travis:** Actually do what I wanted in 5399301cad4ec69e56f6052a49efc41ca05a6ba4. ([9bdaa4f](https://github.com/randytarampi/me/commit/9bdaa4f))





<a name="0.3.0"></a>
# [0.3.0](https://github.com/randytarampi/me/compare/v0.2.0...v0.3.0) (2018-08-01)


### Bug Fixes

* **webpack:** Take another shot at fixing webpack HMR. ([12186d6](https://github.com/randytarampi/me/commit/12186d6))


### Features

* **resume:** Use react SSR instead of handlebars. ([c6f6ae6](https://github.com/randytarampi/me/commit/c6f6ae6))





<a name="0.2.0"></a>
# [0.2.0](https://github.com/randytarampi/me/compare/v0.1.11...v0.2.0) (2018-07-30)


### Bug Fixes

* **resume:** Avoid circular dependency by restoring these to be `devDependencies`. ([cd504db](https://github.com/randytarampi/me/commit/cd504db))


### Features

* **css:** Better mobile friendly CSS. ([b34b7c4](https://github.com/randytarampi/me/commit/b34b7c4))
* **css:** Better print friendly CSS. ([20517cf](https://github.com/randytarampi/me/commit/20517cf))
* **css:** Style `resume` with my own `css`. ([cf1c122](https://github.com/randytarampi/me/commit/cf1c122))





<a name="0.1.7"></a>
## [0.1.7](https://github.com/randytarampi/me/compare/v0.1.6...v0.1.7) (2018-07-28)

**Note:** Version bump only for package jsonresume-theme-randytarampi





<a name="0.1.2"></a>
## [0.1.2](https://github.com/randytarampi/me/compare/v0.1.1...v0.1.2) (2018-07-28)

**Note:** Version bump only for package jsonresume-theme-randytarampi





<a name="0.1.0"></a>
# [0.1.0](https://github.com/randytarampi/me/compare/v0.0.11...v0.1.0) (2018-07-28)


### Features

* **resume:** Add the terribly formatted PDF version. ([affba10](https://github.com/randytarampi/me/commit/affba10))
* **resume:** Push `resume` to randytarampi/me.resume. ([134be22](https://github.com/randytarampi/me/commit/134be22))





<a name="0.0.11"></a>
## [0.0.11](https://github.com/randytarampi/me.resume/compare/v0.0.10...v0.0.11) (2018-07-27)

**Note:** Version bump only for package jsonresume-theme-randytarampi





<a name="0.0.10"></a>
## [0.0.10](https://github.com/randytarampi/me.resume/compare/v0.0.9...v0.0.10) (2018-07-27)

**Note:** Version bump only for package jsonresume-theme-randytarampi





<a name="0.0.9"></a>
## [0.0.9](https://github.com/randytarampi/me.resume/compare/v0.0.8...v0.0.9) (2018-07-27)

**Note:** Version bump only for package jsonresume-theme-randytarampi





<a name="0.0.8"></a>
## [0.0.8](https://github.com/randytarampi/me.resume/compare/v0.0.7...v0.0.8) (2018-07-27)

**Note:** Version bump only for package jsonresume-theme-randytarampi





<a name="0.0.7"></a>
## [0.0.7](https://github.com/randytarampi/me.resume/compare/v0.0.6...v0.0.7) (2018-07-27)

**Note:** Version bump only for package jsonresume-theme-randytarampi





<a name="0.0.6"></a>
## 0.0.6 (2018-07-27)

**Note:** Version bump only for package jsonresume-theme-randytarampi
