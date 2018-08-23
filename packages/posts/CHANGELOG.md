# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.17.0"></a>
# [0.17.0](https://github.com/randytarampi/me/compare/v0.16.5...v0.17.0) (2018-08-23)


### Bug Fixes

* **posts:** Fix Unsplash API query parameters. ([602c37f](https://github.com/randytarampi/me/commit/602c37f))
* **posts:** Header parsing should be case-insensitive. ([6d5a22d](https://github.com/randytarampi/me/commit/6d5a22d))
* **posts:** Make `SearchParams.orderBy` more explicit. ([618e7dd](https://github.com/randytarampi/me/commit/618e7dd))


### Features

* **posts:** Add a version 2 `get(Posts|Photos|Words)` response. ([b771479](https://github.com/randytarampi/me/commit/b771479)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15) [randytarampi/me.photos#11](https://github.com/randytarampi/me.photos/issues/11) [randytarampi/me.words#1](https://github.com/randytarampi/me.words/issues/1)
* **www:** Rework `Post` fetching and state management. ([#51](https://github.com/randytarampi/me/issues/51)) ([620be7d](https://github.com/randytarampi/me/commit/620be7d)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15) [randytarampi/me.photos#11](https://github.com/randytarampi/me.photos/issues/11) [randytarampi/me.words#1](https://github.com/randytarampi/me.words/issues/1) [#23](https://github.com/randytarampi/me/issues/23) [#12](https://github.com/randytarampi/me/issues/12)





<a name="0.16.4"></a>
## [0.16.4](https://github.com/randytarampi/me/compare/v0.16.3...v0.16.4) (2018-08-23)


### Bug Fixes

* **www:** Load `query-string` and other modules using babel. ([41ec9b4](https://github.com/randytarampi/me/commit/41ec9b4))





<a name="0.16.2"></a>
## [0.16.2](https://github.com/randytarampi/me/compare/v0.16.1...v0.16.2) (2018-08-21)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.16.1"></a>
## [0.16.1](https://github.com/randytarampi/me/compare/v0.16.0...v0.16.1) (2018-08-20)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.16.0"></a>
# [0.16.0](https://github.com/randytarampi/me/compare/v0.15.0...v0.16.0) (2018-08-20)


### Bug Fixes

* **posts:** `getPosts` actually returns the `limit`ed number of `Post`s. ([b7c43f1](https://github.com/randytarampi/me/commit/b7c43f1)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15)
* **posts:** `orderCompartor` -> `orderComparator`. ([370fc99](https://github.com/randytarampi/me/commit/370fc99))
* **posts:** `Post` model queries support `limit`s. ([c0794ef](https://github.com/randytarampi/me/commit/c0794ef)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15)
* **posts:** `posts` depends on `immutable`. ([dba7db9](https://github.com/randytarampi/me/commit/dba7db9)), closes [#23](https://github.com/randytarampi/me/issues/23)
* **posts:** Fix `cachedPostsGetter` and `cachedPostGetter` implementations. ([0bded4e](https://github.com/randytarampi/me/commit/0bded4e))
* **posts:** Pull results out of the cache in descending order. ([48242e8](https://github.com/randytarampi/me/commit/48242e8))
* **posts:** Use a separate `POSTS_DYNAMODB_TABLE` per my note in [#49](https://github.com/randytarampi/me/issues/49). ([ad3c88d](https://github.com/randytarampi/me/commit/ad3c88d))


### Features

* **posts:** `DataSource`s now assume `getPost` is passed `SearchParams`. ([092e0bb](https://github.com/randytarampi/me/commit/092e0bb))
* **posts:** `get(Photos|Posts|Words)` lambdas pull directly from the cache. ([7d678ec](https://github.com/randytarampi/me/commit/7d678ec))
* **posts:** Add some HTTP triggers to populate the cache. ([a6fad56](https://github.com/randytarampi/me/commit/a6fad56))
* **posts:** Fix Dynamoose ranged `SearchParams`. ([3c51a15](https://github.com/randytarampi/me/commit/3c51a15)), closes [randytarampi/me.photos#11](https://github.com/randytarampi/me.photos/issues/11) [randytarampi/me.words#1](https://github.com/randytarampi/me.words/issues/1)
* **posts:** If we can't create a Dynamoose query object, just assume it's a filter object for a scan. ([d24859f](https://github.com/randytarampi/me/commit/d24859f))


### Reverts

* feat(posts): Add some HTTP triggers to populate the cache. ([6b4d643](https://github.com/randytarampi/me/commit/6b4d643))





<a name="0.15.0"></a>
# [0.15.0](https://github.com/randytarampi/me/compare/v0.14.3...v0.15.0) (2018-08-19)


### Features

* **sentry:** Upload sentry artifacts for `dev` builds. ([508cff4](https://github.com/randytarampi/me/commit/508cff4))





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

* **posts:** `getPosts` lambda should handle errors in `configureEnvironment`. ([9af7dfe](https://github.com/randytarampi/me/commit/9af7dfe))





<a name="0.12.0"></a>
# [0.12.0](https://github.com/randytarampi/me/compare/v0.11.3...v0.12.0) (2018-08-17)


### Bug Fixes

* **ci:** Just use `lerna run` to run `cover` and `test` where appropriate. ([81be267](https://github.com/randytarampi/me/commit/81be267))
* **posts:** `npm run pretest:dynamodb-local` right before `cover`/`test`. ([d87fe02](https://github.com/randytarampi/me/commit/d87fe02))
* **posts:** Pull Instagram photos at full(er) size. ([408e8ea](https://github.com/randytarampi/me/commit/408e8ea)), closes [randytarampi/me.photos#12](https://github.com/randytarampi/me.photos/issues/12)
* **posts:** Restore other non-Instagram `PhotoSource`s. ([66a8dd7](https://github.com/randytarampi/me/commit/66a8dd7))





<a name="0.11.3"></a>
## [0.11.3](https://github.com/randytarampi/me/compare/v0.11.2...v0.11.3) (2018-08-15)


### Bug Fixes

* **posts:** Use a 24 hour TTL on the Posts table until I push the cron task to refresh the cache. ([2b8b1e9](https://github.com/randytarampi/me/commit/2b8b1e9))





<a name="0.11.2"></a>
## [0.11.2](https://github.com/randytarampi/me/compare/v0.11.1...v0.11.2) (2018-08-15)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.11.1"></a>
## [0.11.1](https://github.com/randytarampi/me/compare/v0.11.0...v0.11.1) (2018-08-15)


### Bug Fixes

* **posts:** `me.service.client` throws when it receives unexpected responses. ([b86f8e2](https://github.com/randytarampi/me/commit/b86f8e2)), closes [#39](https://github.com/randytarampi/me/issues/39)
* **posts:** Give the lambda role permissions on the subresources of the `POSTS_DYNAMODB_TABLE` ([1d8ea47](https://github.com/randytarampi/me/commit/1d8ea47)), closes [#38](https://github.com/randytarampi/me/issues/38)
* **posts:** Use serverless-dynamodb-local@0.2.30. ([8d5468d](https://github.com/randytarampi/me/commit/8d5468d)), closes [#36](https://github.com/randytarampi/me/issues/36)





<a name="0.11.0"></a>
# [0.11.0](https://github.com/randytarampi/me/compare/v0.10.9...v0.11.0) (2018-08-14)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.10.7"></a>
## [0.10.7](https://github.com/randytarampi/me/compare/v0.10.6...v0.10.7) (2018-08-11)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.10.0"></a>
# [0.10.0](https://github.com/randytarampi/me/compare/v0.9.1...v0.10.0) (2018-08-10)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.9.0"></a>
# [0.9.0](https://github.com/randytarampi/me/compare/v0.8.2...v0.9.0) (2018-08-10)


### Bug Fixes

* **posts:** `${self:provider.service}` -> `${self:service}`. ([027e3a4](https://github.com/randytarampi/me/commit/027e3a4))
* **posts:** `kill` should send `TERM` not `-9`. ([a3b88e0](https://github.com/randytarampi/me/commit/a3b88e0))
* **posts:** `Post` model integration tests timeout after 60s. ([0dcbbd4](https://github.com/randytarampi/me/commit/0dcbbd4))
* **posts:** `sleep 3` before/after starting `dynamodb-local` if we're in a CI environment. ([2da0612](https://github.com/randytarampi/me/commit/2da0612))
* **posts:** Actually set values for the  `stage` and `service_name` tags in Sentry logs. ([34fe591](https://github.com/randytarampi/me/commit/34fe591))
* **posts:** Actually use the `dynamodb-local` installed by `posts`. ([11904d1](https://github.com/randytarampi/me/commit/11904d1))
* **posts:** Add dummy AWS credentials for `dynamoose` in `NODE_ENV=test`. ([1dda518](https://github.com/randytarampi/me/commit/1dda518))
* **posts:** Add test coverage for the `PhotoSource`s. ([e0e50ec](https://github.com/randytarampi/me/commit/e0e50ec)), closes [#12](https://github.com/randytarampi/me/issues/12)
* **posts:** Add test coverage for the `S3` and `Tumblr` `WordSource`s. ([f703f60](https://github.com/randytarampi/me/commit/f703f60)), closes [#12](https://github.com/randytarampi/me/issues/12)
* **posts:** Bleh. Remove extraneous `-` from the `kill` command. ([94dc454](https://github.com/randytarampi/me/commit/94dc454))
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


### Features

* **posts:** `CachedDataSource`s only hit the service when they miss the cache. ([901755c](https://github.com/randytarampi/me/commit/901755c))
* **posts:** Actually hook up `(Photo|Word)Source`s to the cache. ([dc0935d](https://github.com/randytarampi/me/commit/dc0935d))
* **posts:** Actually make sure we're returning `Post`s from the cache. ([f278d9b](https://github.com/randytarampi/me/commit/f278d9b))
* **posts:** Add a `CachedDataSource` to be used by `PhotoSource` and `WordSource`. ([4b34388](https://github.com/randytarampi/me/commit/4b34388))
* **posts:** Add in a DynamoDB persistence (caching) layer for `Post`s. ([44538c3](https://github.com/randytarampi/me/commit/44538c3)), closes [randytarampi/me.photos#15](https://github.com/randytarampi/me.photos/issues/15) [randytarampi/me.photos#11](https://github.com/randytarampi/me.photos/issues/11) [randytarampi/me.words#1](https://github.com/randytarampi/me.words/issues/1)


### Reverts

* fix(posts): `kill` should send `TERM` not `-9`. ([8e86a15](https://github.com/randytarampi/me/commit/8e86a15))
* fix(posts): `sleep 3` before/after starting `dynamodb-local` if we're in a CI environment. ([9be4c00](https://github.com/randytarampi/me/commit/9be4c00))





<a name="0.8.2"></a>
## [0.8.2](https://github.com/randytarampi/me/compare/v0.8.1...v0.8.2) (2018-08-08)


### Bug Fixes

* **jsx:** `.post-body` should infer `p` children. ([6c8d072](https://github.com/randytarampi/me/commit/6c8d072))





<a name="0.8.0"></a>
# [0.8.0](https://github.com/randytarampi/me/compare/v0.7.0...v0.8.0) (2018-08-08)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.7.0"></a>
# [0.7.0](https://github.com/randytarampi/me/compare/v0.6.8...v0.7.0) (2018-08-08)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.6.4"></a>
## [0.6.4](https://github.com/randytarampi/me/compare/v0.6.3...v0.6.4) (2018-08-04)


### Bug Fixes

* **posts:** Fix bad `INSTAGRAM_AUTH_REDIRECT_URI` configuration. ([afe5d99](https://github.com/randytarampi/me/commit/afe5d99))





<a name="0.6.0"></a>
# [0.6.0](https://github.com/randytarampi/me/compare/v0.5.1...v0.6.0) (2018-08-03)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.5.0"></a>
# [0.5.0](https://github.com/randytarampi/me/compare/v0.4.0...v0.5.0) (2018-08-03)


### Features

* **jsx:** Handle the HTML returned in tumblr photo captions. ([177a9d9](https://github.com/randytarampi/me/commit/177a9d9)), closes [#12](https://github.com/randytarampi/me/issues/12) [randytarampi/me.photos#17](https://github.com/randytarampi/me.photos/issues/17)





<a name="0.4.0"></a>
# [0.4.0](https://github.com/randytarampi/me/compare/v0.3.2...v0.4.0) (2018-08-03)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.3.0"></a>
# [0.3.0](https://github.com/randytarampi/me/compare/v0.2.0...v0.3.0) (2018-08-01)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.2.0"></a>
# [0.2.0](https://github.com/randytarampi/me/compare/v0.1.11...v0.2.0) (2018-07-30)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.1.11"></a>
## [0.1.11](https://github.com/randytarampi/me/compare/v0.1.10...v0.1.11) (2018-07-28)


### Bug Fixes

* **webpack:** The commit env variable in Travis land is `TRAVIS_COMMIT`. ([e32f8ea](https://github.com/randytarampi/me/commit/e32f8ea))





<a name="0.1.10"></a>
## [0.1.10](https://github.com/randytarampi/me/compare/v0.1.9...v0.1.10) (2018-07-28)


### Bug Fixes

* Use `webpack-sentry-plugin` instead of `[@sentry](https://github.com/sentry)/webpack-plugin`. ([5522bab](https://github.com/randytarampi/me/commit/5522bab))





<a name="0.1.9"></a>
## [0.1.9](https://github.com/randytarampi/me/compare/v0.1.8...v0.1.9) (2018-07-28)


### Bug Fixes

* **posts:** Don't require babel to parse `webpack.serverless.config.js`. ([211934c](https://github.com/randytarampi/me/commit/211934c))





<a name="0.1.8"></a>
## [0.1.8](https://github.com/randytarampi/me/compare/v0.1.7...v0.1.8) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.1.7"></a>
## [0.1.7](https://github.com/randytarampi/me/compare/v0.1.6...v0.1.7) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.1.5"></a>
## [0.1.5](https://github.com/randytarampi/me/compare/v0.1.4...v0.1.5) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.1.0"></a>
# [0.1.0](https://github.com/randytarampi/me/compare/v0.0.11...v0.1.0) (2018-07-28)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.0.11"></a>
## [0.0.11](https://github.com/randytarampi/me/compare/v0.0.10...v0.0.11) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.0.10"></a>
## [0.0.10](https://github.com/randytarampi/me/compare/v0.0.9...v0.0.10) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.0.9"></a>
## [0.0.9](https://github.com/randytarampi/me/compare/v0.0.8...v0.0.9) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.0.8"></a>
## [0.0.8](https://github.com/randytarampi/me/compare/v0.0.7...v0.0.8) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.0.7"></a>
## [0.0.7](https://github.com/randytarampi/me/compare/v0.0.6...v0.0.7) (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/posts





<a name="0.0.6"></a>
## 0.0.6 (2018-07-27)

**Note:** Version bump only for package @randy.tarampi/posts
