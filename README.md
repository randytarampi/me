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

Scan some photo sources for photos, then display them on a single page.

# Dependencies
```
brew install nvm
nvm install 6
npm install -g gulp-cli
```

# Installation

```
npm install
```

You'll also need to define some variables in a [`.env`](https://github.com/randytarampi/me.photos/blob/master/.env) file.

```
PORT=3002

# 500px config
500PX_API_KEY=
500PX_API_SECRET=
500PX_USER_NAME=

# Flickr config
FLICKR_API_KEY=
FLICKR_API_SECRET=
FLICKR_USER_NAME=

# Unsplash config
UNSPLASH_API_KEY=
UNSPLASH_API_SECRET=
UNSPLASH_USER_NAME=

# Instagram
INSTAGRAM_API_KEY=
INSTAGRAM_API_SECRET=
INSTAGRAM_AUTH_REDIRECT_URI=<your app's hostname>/auth/instagram/redirect # E.x. http://localhost:3002/auth/instagram/redirect
INSTAGRAM_USER_NAME=
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_USER_ID=
```

# Usage

```
npm start
open http://localhost:3002
```

# Testing

```
npm test
```
