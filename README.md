```
             _   _
 _____ ___  | |_| |___ ___
|     | -_|_| . | | . | . |
|_|_|_|___|_|___|_|___|_  |
                      |___|
```

[![Build Status](https://img.shields.io/travis/randytarampi/me.blog.svg?style=flat-square)](https://travis-ci.org/randytarampi/me.blog) [![Coverage Status](https://img.shields.io/coveralls/randytarampi/me.blog.svg?style=flat-square)](https://coveralls.io/github/randytarampi/me.blog?branch=master) [![Dependency Status](https://img.shields.io/david/randytarampi/me.blog.svg?style=flat-square)](https://david-dm.org/randytarampi/me.blog.svg) [![Ready](https://img.shields.io/waffle/label/randytarampi/me.blog/ready.svg?style=flat-square&label=Ready)](http://waffle.io/randytarampi/me.blog) [![In Progress](https://img.shields.io/waffle/label/randytarampi/me.blog/in%20progress.svg?style=flat-square&label=In%20Progress)](http://waffle.io/randytarampi/me.blog)

Take some posts from [me.words](https://github.com/randytarampi/me.words), [me.photos](https://github.com/randytarampi/me.photos), etc. and display them in a combined feed.

# Dependencies
```
brew install python3
brew install node
npm install -g gulp
```

# Installation

```
virtualenv --no-site-packages --distribute venv && source venv/bin/activate && pip install -r requirements.txt
pip install -r requirements.txt
npm install
```

# Usage

```
source venv/bin/activate
gunicorn wsgi:app
open http://localhost:3004
```

# Testing

```
python -m unittest discover -s ./tests -p "*.py"
gulp test
```
