```
                  _____  
_______ ________  ____/|_
__  __ `__ \  _ \ _|    /
_  / / / / /  __/_/_ __| 
/_/ /_/ /_/\___/_(_)/    
                         
```

[![Is www.randytarampi.ca up?](https://img.shields.io/website-up-down-green-red/https/www.randytarampi.ca.svg?label=www.randytarampi.ca&style=flat-square)](https://www.randytarampi.ca) [![30 day uptime](https://img.shields.io/uptimerobot/ratio/m780949566-9b1b7cc0bdd3be425a9e6ac8.svg?style=flat-square)](https://uptime.randytarampi.ca) [![Build status](https://img.shields.io/travis/randytarampi/me.svg?style=flat-square)](https://travis-ci.org/randytarampi/me)  [![Coverage status](https://img.shields.io/coveralls/randytarampi/me.svg?style=flat-square)](https://coveralls.io/github/randytarampi/me?branch=master) [![Maintainability status](https://img.shields.io/codeclimate/maintainability-percentage/randytarampi/me.svg?style=flat-square)](https://codeclimate.com/github/randytarampi/me/maintainability) [![Greenkeeper status](https://badges.greenkeeper.io/randytarampi/me.svg?style=flat-square)](https://greenkeeper.io/) [![Maintained with Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=flat-square)](https://lernajs.io/) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/randytarampi/me.svg?style=flat-square) ![GitHub repo size in bytes](https://img.shields.io/github/repo-size/randytarampi/me.svg?style=flat-square) [![Waffle.io board](https://badge.waffle.io/randytarampi/randytarampi.github.io.svg?columns=all&style=flat-square)](https://waffle.io/randytarampi/randytarampi.github.io) [![Analytics](https://ga-beacon.appspot.com/UA-50921068-1/beacon/github/randytarampi/me?flat&useReferrer)](https://github.com/igrigorik/ga-beacon)

A monorepo for everything that goes into [www.randytarampi.ca](https://www.randytarampi.ca).

- [job-applications](packages/job-applications) (which ties together my [resume](packages/resume) and a personalized [cover letter](packages/letter))
- [jsonresume-theme-randytarampi](packages/jsonresume-theme) (A JSON resume theme, just for me)
- [posts](packages/posts)
- [www](packages/www)

And also a couple semi-related modules I wrote a couple years back that I'm planning on using at some point to build out an internationalized resume template.

- [pseudoimage](packages/pseudoimage)
- [pseudolocalize](packages/pseudolocalize)

# Dependencies
```
brew install nvm
nvm install 8
npm install -g npm
```

# Installation

```
npm install
```

# Configuration, Usage, Deployment, etc.

You'll want to read each package's README.

# Testing

```
npm test
```
