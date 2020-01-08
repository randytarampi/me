```
                               _                                  _        _
                              | |                                | |      (_)
 _ __ ___   ___   _ __ ___  __| |_   ___  ________ _ __ ___   ___| |_ _ __ _  ___ ___
| '_ ` _ \ / _ \ | '__/ _ \/ _` | | | \ \/ /______| '_ ` _ \ / _ \ __| '__| |/ __/ __|
| | | | | |  __/_| | |  __/ (_| | |_| |>  <       | | | | | |  __/ |_| |  | | (__\__ \
|_| |_| |_|\___(_)_|  \___|\__,_|\__,_/_/\_\      |_| |_| |_|\___|\__|_|  |_|\___|___/


```

[![npm versions](https://img.shields.io/npm/v/@randy.tarampi/redux-metrics.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/redux-metrics) [![npm downloads](https://img.shields.io/npm/dt/@randy.tarampi/redux-metrics.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/redux-metrics) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@randy.tarampi/redux-metrics.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/redux-metrics) [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@randy.tarampi/redux-metrics.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/redux-metrics) [![npm license](https://img.shields.io/npm/l/@randy.tarampi/redux-metrics.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com&style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/redux-metrics) [![Analytics](https://ga-beacon.appspot.com/UA-50921068-1/beacon/github/randytarampi/me/tree/master/packages/redux-metrics?flat&useReferrer)](https://github.com/igrigorik/ga-beacon)

[![Install @randy.tarampi/redux-metrics](https://nodeico.herokuapp.com/@randy.tarampi/redux-metrics.svg)](https://www.npmjs.com/package/@randy.tarampi/redux-metrics)

A client-side, GTM focused metrics library for redux backed applications like [www](../www).

# Dependencies

See the [`me` dependencies](../../README.md#Dependencies).

# Installation

See the [`me` installation instructions](../../README.md#Installation).

# Configuration
You'll want to hook up some [metrics middleware](https://github.com/randytarampi/me/blob/master/packages/jsx/src/lib/middleware/metrics.js) [like this](https://github.com/randytarampi/me/blob/b00290d5ebba49595c461a587fa762f268f3c1f5/packages/jsx/src/lib/store/configureStore.js#L16).

# Testing

```
# From the `me` monorepo root
npx lerna run test --scope=@randy.tarampi/redux-metrics
```
