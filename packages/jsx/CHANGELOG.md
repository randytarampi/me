# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.18.3"></a>
## [0.18.3](https://github.com/randytarampi/me/compare/v0.18.2...v0.18.3) (2018-08-25)


### Bug Fixes

* **jsx:** Actually hookup `react-metrics` for pageview and link tracking. ([cb0c774](https://github.com/randytarampi/me/commit/cb0c774))





<a name="0.18.1"></a>
## [0.18.1](https://github.com/randytarampi/me/compare/v0.18.0...v0.18.1) (2018-08-24)


### Bug Fixes

* User facing URLs should be `https`, and rooted at `www.randytarampi.ca`. ([f3ee4ea](https://github.com/randytarampi/me/commit/f3ee4ea))
* **jsx:** Fix dangling `?` on `CampaignLink` when there are no query parameters. ([e3ab68d](https://github.com/randytarampi/me/commit/e3ab68d))





<a name="0.18.0"></a>
# [0.18.0](https://github.com/randytarampi/me/compare/v0.17.1...v0.18.0) (2018-08-24)


### Bug Fixes

* **jsx:** `InternalLink`s' `onClick` calls `e.preventDefault()`. ([a9465e2](https://github.com/randytarampi/me/commit/a9465e2))
* **jsx:** 404 page gives you the option to click through to `redirectionLocation`. ([71aa676](https://github.com/randytarampi/me/commit/71aa676))
* **jsx:** Address `InternalLink` prop types warning. ([5d0b868](https://github.com/randytarampi/me/commit/5d0b868))
* Centralize most of the webpack configuration. ([9e44bb4](https://github.com/randytarampi/me/commit/9e44bb4))


### Features

* **resume:** Add PDF resume link tracking via a `CampaignLink`. ([0547bd5](https://github.com/randytarampi/me/commit/0547bd5)), closes [#19](https://github.com/randytarampi/me/issues/19)





<a name="0.17.0"></a>
# [0.17.0](https://github.com/randytarampi/me/compare/v0.16.5...v0.17.0) (2018-08-23)


### Features

* **jsx:** Use the version 2 `get(Posts|Photos|Words)` API. ([ee00df7](https://github.com/randytarampi/me/commit/ee00df7)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15) [randytarampi/me.photos#11](https://github.com/randytarampi/me.photos/issues/11) [randytarampi/me.words#1](https://github.com/randytarampi/me.words/issues/1)
* **www:** Rework `Post` fetching and state management. ([#51](https://github.com/randytarampi/me/issues/51)) ([620be7d](https://github.com/randytarampi/me/commit/620be7d)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15) [randytarampi/me.photos#11](https://github.com/randytarampi/me.photos/issues/11) [randytarampi/me.words#1](https://github.com/randytarampi/me.words/issues/1) [#23](https://github.com/randytarampi/me/issues/23) [#12](https://github.com/randytarampi/me/issues/12)





<a name="0.16.4"></a>
## [0.16.4](https://github.com/randytarampi/me/compare/v0.16.3...v0.16.4) (2018-08-23)


### Bug Fixes

* **www:** Load `query-string` and other modules using babel. ([41ec9b4](https://github.com/randytarampi/me/commit/41ec9b4))





<a name="0.16.1"></a>
## [0.16.1](https://github.com/randytarampi/me/compare/v0.16.0...v0.16.1) (2018-08-20)


### Bug Fixes

* **jsx:** `clearError` on `@[@router](https://github.com/router)/LOCATION_CHANGE`. ([730d75e](https://github.com/randytarampi/me/commit/730d75e))
* **jsx:** Don't pass `InternalLinkInternal` an `href` otherwise it gets propagated down to the `<a/>`. ([2523308](https://github.com/randytarampi/me/commit/2523308))
* **jsx:** Fix the link to my resume off the main page. ([7e598bf](https://github.com/randytarampi/me/commit/7e598bf))





<a name="0.16.0"></a>
# [0.16.0](https://github.com/randytarampi/me/compare/v0.15.0...v0.16.0) (2018-08-20)


### Bug Fixes

* **jsx:** `clearError` on the `timedRedirect`. ([d71eb7a](https://github.com/randytarampi/me/commit/d71eb7a))
* **jsx:** Fix `.loading-spinner` regression introduced in 4876717388754113e12cbfa4f1239b77e54601cd. ([e067f2d](https://github.com/randytarampi/me/commit/e067f2d))
* **jsx:** Make `.error__message--header`s look like headers. ([e1a8923](https://github.com/randytarampi/me/commit/e1a8923))
* **jsx:** Per 3ddb39d855a34a9b756091c6b90286465ab2db89, fix `.loading-spinner` centering. ([4876717](https://github.com/randytarampi/me/commit/4876717))
* **www:** Fix error centering on mobile. ([3ddb39d](https://github.com/randytarampi/me/commit/3ddb39d))


### Features

* **www:** Add a 500 page while I'm here. ([5effd9d](https://github.com/randytarampi/me/commit/5effd9d)), closes [#49](https://github.com/randytarampi/me/issues/49)
* **www:** If we try and load posts but don't have any, serve up a nice message telling them to come back later. ([c4769fe](https://github.com/randytarampi/me/commit/c4769fe)), closes [#49](https://github.com/randytarampi/me/issues/49)





<a name="0.15.0"></a>
# [0.15.0](https://github.com/randytarampi/me/compare/v0.14.3...v0.15.0) (2018-08-19)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.14.0"></a>
# [0.14.0](https://github.com/randytarampi/me/compare/v0.13.1...v0.14.0) (2018-08-18)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.13.0"></a>
# [0.13.0](https://github.com/randytarampi/me/compare/v0.12.1...v0.13.0) (2018-08-17)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.12.0"></a>
# [0.12.0](https://github.com/randytarampi/me/compare/v0.11.3...v0.12.0) (2018-08-17)


### Features

* **letter:** Copy/pasta from `resume` to build `letter`s. ([f31bdf7](https://github.com/randytarampi/me/commit/f31bdf7))





<a name="0.11.3"></a>
## [0.11.3](https://github.com/randytarampi/me/compare/v0.11.2...v0.11.3) (2018-08-15)


### Bug Fixes

* **jsx:** `Error` should actually respect the `redirectionTimeout`. ([194a806](https://github.com/randytarampi/me/commit/194a806))





<a name="0.11.2"></a>
## [0.11.2](https://github.com/randytarampi/me/compare/v0.11.1...v0.11.2) (2018-08-15)


### Bug Fixes

* **www:** Link on the home page sends a text instead of trying to call. ([1f014bd](https://github.com/randytarampi/me/commit/1f014bd))
* **www:** Link on the home page sends an email with some text content. ([fc3d306](https://github.com/randytarampi/me/commit/fc3d306))





<a name="0.11.0"></a>
# [0.11.0](https://github.com/randytarampi/me/compare/v0.10.9...v0.11.0) (2018-08-14)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.10.8"></a>
## [0.10.8](https://github.com/randytarampi/me/compare/v0.10.7...v0.10.8) (2018-08-12)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.10.7"></a>
## [0.10.7](https://github.com/randytarampi/me/compare/v0.10.6...v0.10.7) (2018-08-11)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.10.6"></a>
## [0.10.6](https://github.com/randytarampi/me/compare/v0.10.5...v0.10.6) (2018-08-11)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.10.5"></a>
## [0.10.5](https://github.com/randytarampi/me/compare/v0.10.4...v0.10.5) (2018-08-11)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.10.3"></a>
## [0.10.3](https://github.com/randytarampi/me/compare/v0.10.2...v0.10.3) (2018-08-11)


### Bug Fixes

* **jsx:** Actually pass `props` through to the `renderRoutes` call. ([1398ea8](https://github.com/randytarampi/me/commit/1398ea8))





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


### Features

* **www:** Add a 404 page. ([ecd0a00](https://github.com/randytarampi/me/commit/ecd0a00)), closes [#28](https://github.com/randytarampi/me/issues/28)





<a name="0.8.2"></a>
## [0.8.2](https://github.com/randytarampi/me/compare/v0.8.1...v0.8.2) (2018-08-08)


### Bug Fixes

* **jsx:** `.post-body` should infer `p` children. ([6c8d072](https://github.com/randytarampi/me/commit/6c8d072))
* **jsx:** Don't duplicate `Post.body` text when `Post.body` is an `Array`. ([0d10271](https://github.com/randytarampi/me/commit/0d10271))





<a name="0.8.1"></a>
## [0.8.1](https://github.com/randytarampi/me/compare/v0.8.0...v0.8.1) (2018-08-08)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.8.0"></a>
# [0.8.0](https://github.com/randytarampi/me/compare/v0.7.0...v0.8.0) (2018-08-08)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.7.0"></a>
# [0.7.0](https://github.com/randytarampi/me/compare/v0.6.8...v0.7.0) (2018-08-08)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.6.1"></a>
## [0.6.1](https://github.com/randytarampi/me/compare/v0.6.0...v0.6.1) (2018-08-04)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.6.0"></a>
# [0.6.0](https://github.com/randytarampi/me/compare/v0.5.1...v0.6.0) (2018-08-03)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.5.0"></a>
# [0.5.0](https://github.com/randytarampi/me/compare/v0.4.0...v0.5.0) (2018-08-03)


### Features

* **jsx:** Handle the HTML returned in tumblr photo captions. ([177a9d9](https://github.com/randytarampi/me/commit/177a9d9)), closes [#12](https://github.com/randytarampi/me/issues/12) [randytarampi/me.photos#17](https://github.com/randytarampi/me.photos/issues/17)
* **jsx:** Make all links open in new windows. ([6df20cd](https://github.com/randytarampi/me/commit/6df20cd)), closes [randytarampi/me.photos#8](https://github.com/randytarampi/me.photos/issues/8)





<a name="0.4.0"></a>
# [0.4.0](https://github.com/randytarampi/me/compare/v0.3.2...v0.4.0) (2018-08-03)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.3.0"></a>
# [0.3.0](https://github.com/randytarampi/me/compare/v0.2.0...v0.3.0) (2018-08-01)


### Features

* **jsx:** Add a `ServerReduxRoot` that mirrors `ClientReduxRoot`. ([fb04cc1](https://github.com/randytarampi/me/commit/fb04cc1))
* **resume:** Use react SSR instead of handlebars. ([c6f6ae6](https://github.com/randytarampi/me/commit/c6f6ae6))





<a name="0.2.0"></a>
# [0.2.0](https://github.com/randytarampi/me/compare/v0.1.11...v0.2.0) (2018-07-30)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.1.8"></a>
## [0.1.8](https://github.com/randytarampi/me/compare/v0.1.7...v0.1.8) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.1.7"></a>
## [0.1.7](https://github.com/randytarampi/me/compare/v0.1.6...v0.1.7) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.1.0"></a>
# [0.1.0](https://github.com/randytarampi/me/compare/v0.0.11...v0.1.0) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.0.11"></a>
## [0.0.11](https://github.com/randytarampi/me/compare/v0.0.10...v0.0.11) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.0.10"></a>
## [0.0.10](https://github.com/randytarampi/me/compare/v0.0.9...v0.0.10) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.0.9"></a>
## [0.0.9](https://github.com/randytarampi/me/compare/v0.0.8...v0.0.9) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.0.8"></a>
## [0.0.8](https://github.com/randytarampi/me/compare/v0.0.7...v0.0.8) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.0.7"></a>
## [0.0.7](https://github.com/randytarampi/me/compare/v0.0.6...v0.0.7) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/jsx





<a name="0.0.6"></a>
## 0.0.6 (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/jsx
