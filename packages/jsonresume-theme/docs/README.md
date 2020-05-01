```plaintext
                                                                                                                   /$$     /$$
                                                                                                                  | $$    | $$
       /$$  /$$$$$$$  /$$$$$$  /$$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$$ /$$   /$$ /$$$$$$/$$$$   /$$$$$$          /$$$$$$  | $$$$$$$   /$$$$$$  /$$$$$$/$$$$   /$$$$$$
      |__/ /$$_____/ /$$__  $$| $$__  $$ /$$__  $$ /$$__  $$ /$$_____/| $$  | $$| $$_  $$_  $$ /$$__  $$ /$$$$$$|_  $$_/  | $$__  $$ /$$__  $$| $$_  $$_  $$ /$$__  $$
       /$$|  $$$$$$ | $$  \ $$| $$  \ $$| $$  \__/| $$$$$$$$|  $$$$$$ | $$  | $$| $$ \ $$ \ $$| $$$$$$$$|______/  | $$    | $$  \ $$| $$$$$$$$| $$ \ $$ \ $$| $$$$$$$$
      | $$ \____  $$| $$  | $$| $$  | $$| $$      | $$_____/ \____  $$| $$  | $$| $$ | $$ | $$| $$_____/          | $$ /$$| $$  | $$| $$_____/| $$ | $$ | $$| $$_____/
      | $$ /$$$$$$$/|  $$$$$$/| $$  | $$| $$      |  $$$$$$$ /$$$$$$$/|  $$$$$$/| $$ | $$ | $$|  $$$$$$$          |  $$$$/| $$  | $$|  $$$$$$$| $$ | $$ | $$|  $$$$$$$
      | $$|_______/  \______/ |__/  |__/|__/       \_______/|_______/  \______/ |__/ |__/ |__/ \_______/           \___/  |__/  |__/ \_______/|__/ |__/ |__/ \_______/
 /$$  | $$
|  $$$$$$/
 \______/
```

[![npm versions](https://img.shields.io/npm/v/jsonresume-theme-randytarampi.svg?style=flat-square)](https://www.npmjs.com/package/jsonresume-theme-randytarampi) [![npm downloads](https://img.shields.io/npm/dt/jsonresume-theme-randytarampi.svg?style=flat-square)](https://www.npmjs.com/package/jsonresume-theme-randytarampi) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/jsonresume-theme-randytarampi.svg?style=flat-square)](https://www.npmjs.com/package/jsonresume-theme-randytarampi) [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/jsonresume-theme-randytarampi.svg?style=flat-square)](https://www.npmjs.com/package/jsonresume-theme-randytarampi) [![npm license](https://img.shields.io/npm/l/jsonresume-theme-randytarampi.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com&style=flat-square)](https://www.npmjs.com/package/jsonresume-theme-randytarampi) [![Analytics](https://ga-beacon.appspot.com/UA-50921068-1/beacon/github/randytarampi/me/tree/master/packages/jsonresume-theme?flat&useReferrer)](https://github.com/igrigorik/ga-beacon)

[![Install jsonresume-theme-randytarampi](https://nodeico.herokuapp.com/jsonresume-theme-randytarampi.svg)](https://www.npmjs.com/package/jsonresume-theme-randytarampi)

My resume [online](https://www.randytarampi.ca/resume) and in print on [A4](https://github.com/randytarampi/me.resume/blob/master/a4.pdf), [US Letter](https://github.com/randytarampi/me.resume/blob/master/letter.pdf) and [US Legal](https://github.com/randytarampi/me.resume/blob/master/legal.pdf).

It's really just another generic [JSON resume theme](http://themes.jsonresume.org/theme/randytarampi). [Try it out here!](http://registry.jsonresume.org/#randytarampi)

# Dependencies

See the [`me` dependencies](../../README.md#Dependencies).

# Installation

See the [`me` installation instructions](../../README.md#Installation).

# Usage

```
# From the `me` monorepo root
yarn lerna run start --scope=@randy.tarampi/jsonresume-theme-randytarampi
```

# Testing

```
# From the `me` monorepo root
yarn lerna run test --scope=@randy.tarampi/jsonresume-theme-randytarampi
```

# Generation

```
# From the `me` monorepo root
yarn lerna run build --scope=@randy.tarampi/jsonresume-theme-randytarampi
yarn lerna run resume --scope=@randy.tarampi/jsonresume-theme-randytarampi
```

# Publishing

```
npx resume register
npx resume login
npx resume publish
```
