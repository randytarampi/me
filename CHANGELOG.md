# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
