```
          ____
        ,'  , `.
     ,-+-,.' _ |                  .---.         .---.         .---.
  ,-+-. ;   , ||                 /. ./|        /. ./|        /. ./|
 ,--.'|'   |  || ,---.        .-'-. ' |     .-'-. ' |     .-'-. ' |
|   |  ,', |  |,/     \      /___/ \: |    /___/ \: |    /___/ \: |
|   | /  | |--'/    /  |  .-'.. '   ' . .-'.. '   ' . .-'.. '   ' .
|   : |  | ,  .    ' / | /___/ \:     '/___/ \:     '/___/ \:     '
|   : |  |/   '   ;   /| .   \  ' .\   .   \  ' .\   .   \  ' .\
|   | |`-'    '   |  / |__\   \   ' \ | \   \   ' \ | \   \   ' \ |
|   ;/        |   :    /  .\   \  |--"   \   \  |--"   \   \  |--"
'---'          \   \  /\  ; \   \ |       \   \ |       \   \ |
                `----'  `--" '---"         '---"         '---"
```

The front-end to [`me`](../../), available in both [production](https://www.randytarampi.ca) and [development](http://www.dev.randytarampi.ca) environments.

### *This package has been consolidated into the [`randytarampi/me`](https://github.com/randytarampi/me/tree/master/packages/www) monorepo and is force pushed to [randytarampi/randytarampi.github.io](https://github.com/randytarampi/randytarampi.github.io) as a testing stage*

# Dependencies

See the [`me` dependencies](https://github.com/randytarampi/me/tree/master/README.md#Dependencies).

# Installation

See the [`me` installation instructions](https://github.com/randytarampi/me/tree/master/README.md#Installation).

# Usage

```
# From the `me` monorepo root
yarn lerna run start --scope=@randy.tarampi/views

# Or use the convenience `start:www` from the `me` monorepo root
yarn run start:www

# Or use the convenience `start:web` from the `me` monorepo root, which will run `me.www` and `me.service` in parallel
yarn run start:web
```

# Testing

```
# From the `me` monorepo root
yarn lerna run test --scope=@randy.tarampi/www
```

# Deployment

```
git push origin HEAD:gh-pages
```
