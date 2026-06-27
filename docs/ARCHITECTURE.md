# Architecture

`me` is a Yarn workspace monorepo managed with Lerna. The site, backend, and generators all share code instead of re-implementing the same sad little helpers 17 times.

## Packages
- `assets` — shared static assets for the site and generators.
- `browser-logger` — client-side logging helper for the public app.
- `css` — shared styles.
- `job-application` — utility for resume + cover-letter bundles.
- `js` — shared JS entities and helpers.
- `jsonresume-theme` — JSON Resume theme.
- `jsx` — shared React/JSX components.
- `lambda-logger` — opinionated AWS Lambda logger.
- `letter` — cover-letter generator.
- `printables` — wrapper for printable-task helpers used by the generators.
- `react-dimensions` — dimension helpers for React components.
- `redux-metrics` — client-side metrics/logging helpers.
- `resume` — resume generator/theme.
- `serverless` — opinionated serverless utilities.
- `service` — backend/service surface.
- `views` — shared Pug templates.
- `www` — public client app.

## Dependency graph
- Core leaf: `js`.
- `browser-logger` → `js`.
- `views` → `js`.
- `serverless` → `js`.
- `lambda-logger` stays standalone and feeds `service`.
- `jsx` → `browser-logger`, `js`, `react-dimensions`, `redux-metrics`.
- `printables` → `views`.
- `resume` → `assets`, `css`, `js`, `jsx`, `printables`, `views`.
- `letter` → `assets`, `css`, `js`, `jsx`, `printables`, `views`.
- `jsonresume-theme` → `resume`, `views`.
- `job-application` → `jsx`, `letter`, `printables`, `resume`, `views`.
- `service` → `js`, `lambda-logger`, `serverless`.
- `www` → `assets`, `browser-logger`, `css`, `js`, `jsx`, `letter`, `resume`, `views`.

## Build pipeline
- Gulp coordinates the multi-package build flow and preprocessing.
- Webpack handles bundling and package/app output generation.
- The build still emits dual-target outputs: ES5 where legacy runtimes need it, ESM where the package expects it.

## Config layer
- `config/` provides `node-config` runtime settings.
- `babel.config.js` centralizes JS transpilation.
- `webpack.client.config.base.js` is the shared client bundle base; the rest of the webpack configs layer on top.

## Test infrastructure
- Tests run on Mocha, usually through `gulp-mocha`.
- Package-level `mocha.config.cjs` files keep test config CommonJS-friendly in an ESM repo.
- Test runs merge package-level `test-results.xml` files into repo-level reports.
