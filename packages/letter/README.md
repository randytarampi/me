```plaintext
                             /$$             /$$     /$$                        
                            | $$            | $$    | $$                        
 /$$$$$$/$$$$   /$$$$$$     | $$  /$$$$$$  /$$$$$$ /$$$$$$    /$$$$$$   /$$$$$$ 
| $$_  $$_  $$ /$$__  $$    | $$ /$$__  $$|_  $$_/|_  $$_/   /$$__  $$ /$$__  $$
| $$ \ $$ \ $$| $$$$$$$$    | $$| $$$$$$$$  | $$    | $$    | $$$$$$$$| $$  \__/
| $$ | $$ | $$| $$_____/    | $$| $$_____/  | $$ /$$| $$ /$$| $$_____/| $$      
| $$ | $$ | $$|  $$$$$$$ /$$| $$|  $$$$$$$  |  $$$$/|  $$$$/|  $$$$$$$| $$      
|__/ |__/ |__/ \_______/|__/|__/ \_______/   \___/   \___/   \_______/|__/      
```

[![npm versions](https://img.shields.io/npm/v/@randy.tarampi/letter.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/letter) [![npm downloads](https://img.shields.io/npm/dt/@randy.tarampi/letter.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/letter) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@randy.tarampi/letter.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/letter) [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@randy.tarampi/letter.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/letter) [![npm license](https://img.shields.io/npm/l/@randy.tarampi/letter.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com&style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/letter) [![Waffle.io board](https://badge.waffle.io/randytarampi/randytarampi.github.io.svg?columns=all&style=flat-square)](https://waffle.io/randytarampi/randytarampi.github.io) [![Analytics](https://ga-beacon.appspot.com/UA-50921068-1/beacon/github/randytarampi/me/tree/master/packages/letter?flat&useReferrer)](https://github.com/igrigorik/ga-beacon)

[![Install @randy.tarampi/letter](https://nodeico.herokuapp.com/@randy.tarampi/letter.svg)](https://www.npmjs.com/package/@randy.tarampi/letter)

The spiritual companion to my [resume](../resume). Just generate some cover letters that match everything else in this monorepo – [online](https://www.randytarampi.ca/letter) and in print on [A4](https://github.com/randytarampi/me/blob/master/packages/letter/docs/letter.a4.pdf), [US Letter](https://github.com/randytarampi/me/blob/master/packages/letter/docs/letter.letter.pdf) and [US Legal](https://github.com/randytarampi/me/blob/master/packages/letter/docs/letter.legal.pdf).

**You probably want to head over to [job-application](../job-application) instead, since it offers some additional features**

1. Place a JS/JSON/JSX file (say [`some-awesome-company.json`](./src/letters/some-awesome-company.json)) that can be parsed into an instance of [`Letter`](./src/lib/letter) in `/src/letters`
2. Generate your letters by running `npm run letter`
3. View it with [`open ./dist/some-awesome-company.pdf`](./dist/some-awesome-company.pdf)

# Dependencies

```
brew install nvm
nvm install 8
```

# Installation

```
npm install
```

# Usage

```
npm start
```

# Testing

```
npm test
```

# Generation

```
npm run build
npm run letter
```
