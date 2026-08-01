```
                  _____
_______ ________  ____/|_
__  __ `__ \  _ \ _|    /
_  / / / / /  __/_/_ __|
/_/ /_/ /_/\___/_(_)/

```

[![Is www.randytarampi.ca up?](https://img.shields.io/website-up-down-green-red/https/www.randytarampi.ca.svg?label=www.randytarampi.ca&style=flat-square)](https://www.randytarampi.ca)
[![30 day uptime](https://img.shields.io/uptimerobot/ratio/m780949566-9b1b7cc0bdd3be425a9e6ac8.svg?style=flat-square)](https://uptime.randytarampi.ca)
[![CI](https://github.com/randytarampi/me/actions/workflows/ci.yml/badge.svg)](https://github.com/randytarampi/me/actions/workflows/ci.yml)
[![Coverage status](https://img.shields.io/coveralls/randytarampi/me.svg?style=flat-square)](https://coveralls.io/github/randytarampi/me?branch=master)
[![Maintained with Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg?style=flat-square)](https://lerna.js.org/)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/randytarampi/me.svg?style=flat-square)
![GitHub repo size in bytes](https://img.shields.io/github/repo-size/randytarampi/me.svg?style=flat-square)

A monorepo for everything that goes into [www.randytarampi.ca](https://www.randytarampi.ca).

- [job-application](packages/job-application) (which ties together my [resume](resume) and a personalized [cover letter](letter))
- [jsonresume-theme-randytarampi](packages/jsonresume-theme) (a [JSON resume theme](http://themes.jsonresume.org/theme/randytarampi), built for me but shared for all)
- [service](service) and [www](www)
- Shared packages: [assets](packages/assets), [browser-logger](packages/browser-logger), [css](packages/css), [js](packages/js), [jsx](packages/jsx), [lambda-logger](packages/lambda-logger), [letter](letter), [printables](packages/printables), [react-dimensions](packages/react-dimensions), [redux-metrics](packages/redux-metrics), [resume](resume), [serverless](packages/serverless), [views](packages/views)

# Dependencies
```
brew install nvm
nvm install 24
corepack enable
```

# Installation

```
yarn bootstrap
```

# Configuration, Usage, Deployment, etc.

You'll want to read each package's README.

# Testing

```
yarn test

# or, for one package
npx lerna run test --scope @randy.tarampi/www
```


## License
