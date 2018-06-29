```
                                         _|                    _|
 _|_|_|  _|_|      _|_|        _|_|_|    _|_|_|      _|_|    _|_|_|_|    _|_|      _|_|_|
 _|    _|    _|  _|_|_|_|      _|    _|  _|    _|  _|    _|    _|      _|    _|  _|_|
 _|    _|    _|  _|            _|    _|  _|    _|  _|    _|    _|      _|    _|      _|_|
 _|    _|    _|    _|_|_|  _|  _|_|_|    _|    _|    _|_|        _|_|    _|_|    _|_|_|
                               _|
                               _|
```

[![Build Status](https://img.shields.io/travis/randytarampi/me.photos.svg?style=flat-square)](https://travis-ci.org/randytarampi/me.photos) [![Coverage Status](https://img.shields.io/coveralls/randytarampi/me.photos.svg?style=flat-square)](https://coveralls.io/github/randytarampi/me.photos?branch=master) [![Dependency Status](https://img.shields.io/david/randytarampi/me.photos.svg?style=flat-square)](https://david-dm.org/randytarampi/me.photos) [![Ready](https://img.shields.io/waffle/label/randytarampi/me.photos/ready.svg?style=flat-square&label=Ready)](http://waffle.io/randytarampi/me.photos) [![In Progress](https://img.shields.io/waffle/label/randytarampi/me.photos/in%20progress.svg?style=flat-square&label=In%20Progress)](http://waffle.io/randytarampi/me.photos)

A photo aggregator/blog thingy. For some usernames at some popular services, pull their photos and display them nicely.

Currently supports:
- [Unsplash](https://unsplash.com/documentation)
- [500px](https://github.com/500px/api-documentation)
- [Flickr](https://www.flickr.com/services/api/)
- [Instagram](https://www.instagram.com/developer/)
- [Tumblr](https://www.tumblr.com/docs/en/api/v2)
- [Local](https://github.com/randytarampi/me.photos/blob/master/photos/local/photoSource.js)

Scan some photo sources for photos, then display them on a single page.

# Dependencies
```
brew install nvm
nvm install 8
npm install -g gulp-cli
```

# Installation

```
npm install
```

You'll also need to define some variables in a [`env.yml`](https://github.com/randytarampi/me.photos/blob/master/env.yml) file.

```yml
dev: &devConfig
  profile: serverless-dev
  resourceStageBuilder: dev
  domainName: <where you want your service to be served from>
  acmArn: <an ACM ARN so serverless can setup for HTTPS>
  kmsKeyArn: <a KMS ARN so serverless-secrets can pull API keys and other `environmentSecrets` out of the SSM store>
  environment: &environment
    F00PX_USER_NAME:
    FLICKR_USER_NAME:
    UNSPLASH_USER_NAME:
    INSTAGRAM_USER_NAME:
    INSTAGRAM_AUTH_REDIRECT_URI:
    INSTAGRAM_USER_ID:
    TUMBLR_USER_NAME:
  environmentSecrets: &environmentSecrets
    F00PX_API_KEY: f00px-api-key
    F00PX_API_SECRET: f00px-api-secret
    FLICKR_API_KEY: flickr-api-key
    FLICKR_API_SECRET: flickr-api-secret
    UNSPLASH_API_KEY: unsplash-api-key
    UNSPLASH_API_SECRET: unsplash-api-secret
    INSTAGRAM_API_KEY: instagram-api-key
    INSTAGRAM_API_SECRET: instagram-api-secret
    INSTAGRAM_ACCESS_TOKEN: instagram-access-token
    TUMBLR_API_KEY: tumblr-api-key
```

For each key in `environmentSecrets`, you'll want to push a value into an AWS SSM store with `serverless secrets`.

```bash
serverless secrets set -n <key name> -t <secret value> -k <alias/serverless-tst|alias/serverless-prd>
```

# Usage

```
npm start
open ./index.html
```

# Testing

```
npm test
```
