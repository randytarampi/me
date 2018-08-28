# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
