```
                                         _|                    _|
 _|_|_|  _|_|      _|_|        _|_|_|    _|_|_|      _|_|    _|_|_|_|    _|_|      _|_|_|
 _|    _|    _|  _|_|_|_|      _|    _|  _|    _|  _|    _|    _|      _|    _|  _|_|
 _|    _|    _|  _|            _|    _|  _|    _|  _|    _|    _|      _|    _|      _|_|
 _|    _|    _|    _|_|_|  _|  _|_|_|    _|    _|    _|_|        _|_|    _|_|    _|_|_|
                               _|
                               _|
```

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
