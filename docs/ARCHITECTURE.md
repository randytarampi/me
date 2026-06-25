# Architecture

`me` is a Yarn workspace monorepo managed with Lerna.

## Layout
- `packages/service` and `packages/www` are the app surfaces.
- Shared workspace packages live in `packages/*` (`assets`, `browser-logger`, `css`, `js`, `jsx`, `lambda-logger`, `letter`, `printables`, `react-dimensions`, `redux-metrics`, `resume`, `serverless`, `views`, `jsonresume-theme`, `job-application`).
- `config/` contains shared configuration.
- Root tooling lives in `bin/`, `babel.config.js`, `eslint.config.js`, `gulpfile.base.js`, `webpack.*.config.base.js`, and `lerna.json`.

## Dependency shape
- Shared packages feed the site packages.
- `service` handles server-side concerns; `www` handles the public client app.
- `config` and the logger/theme packages are reused across the workspace.
