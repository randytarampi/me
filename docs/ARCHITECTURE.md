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
- `NODE_ENV=production` is still an explicit, required part of every package's `build:babel:es5`/`build:babel:esm` (library-transpile) scripts and most packages' `build`/`build:gulp` scripts, set via `cross-env-shell`/an inline env var assignment - mirroring the existing `NODE_ENV=test` convention already used by `test`/`pretest`/`cover`. Its original justification (avoiding a `react-refresh/babel` crash on a missing env var) no longer applies now that development-mode gating is opt-in and fail-safe (see below), so it's kept there purely for consistency/explicitness - but it is **not** cost-free as previously documented here: `config/` has no `production.yml`/`.cjs` file (only `dev.yml`/`prd.yml`/`test.yml`/`printable.yml`), so a bare `NODE_ENV=production` on its own causes `config` to load only `default.cjs`+`local.cjs`, printing a `WARNING: NODE_ENV value of 'production' did not match any deployment config file names.` and silently baking incorrect fallback values into `config.get(...)`-driven build-time literals (e.g. `babel.config.js`'s `__RESUME_SERVICE_URL__`/`__LETTER_SERVICE_URL__` `minify-replace` substitutions). The fix: every build script that sets `NODE_ENV=production` also sets `NODE_CONFIG_ENV=prd` alongside it - `config@5`'s own supported mechanism for decoupling "which config file to load" from `NODE_ENV` itself - leaving `NODE_ENV` itself untouched so React/Terser/webpack's own ecosystem-standard `"production"` behavior isn't regressed. `util.cjs`'s `productionEnvs = ["production", "prd"]` array documents these same two values.
- `resume`/`letter`/`www` are the deliberate exception: their `build:gulp` (`resume`/`letter`) and `build` (`www`) scripts - the ones that invoke webpack and call `packages/views/src/lib/buildPugLocals.js` (`environment: process.env.NODE_ENV || "local"`) to bake the `environment` tag (Sentry/GA/GTM) into the deployed `docs/index.html` - no longer hardcode `NODE_ENV=production`. Hardcoding it there used to unconditionally clobber the deploy workflows' already-correct job-level `NODE_ENV` (`dev`/`prd`, set by `deploy.pages.reusable.yml`'s "Set variables" step from the `deployment_environment` input) before it could ever reach `buildPugLocals()`, so every deployed build - `dev` or `prd` alike - was mistagged `environment: "production"`. Now that clobbering is removed, the job-level `NODE_ENV` flows straight through, and a plain local `build` (no env vars at all) correctly falls back to `buildPugLocals.js`'s own `"local"` default instead. `packages/printables/src/lib/buildPugLocals.js` is unaffected either way, since it always hard-codes `environment: "printable"`. `jsonresume-theme`'s own `resume`/`docs` scripts are also unaffected, since they intentionally hardcode `NODE_ENV=printable` for the same reason.
- The workflows' former explicit "Build packages" steps (in `test.yml` and `deploy.pages.reusable.yml`) have been removed entirely - `nx.json`'s `dependsOn: ["^build", "build"]` wiring for `test`/`cover`/`docs`/`resume`/`letter` (see below) is trusted as the sole ordering guarantee, per the project's preference to fail loudly if that wiring is ever wrong rather than silently mask it with a redundant manual step.
- Development-mode tooling (react-refresh, HMR, `eval-source-map`) is **opt-in**, not opt-out: `util.cjs`'s `isNodeEnvDevelopment`/`isBabelEnvDevelopment` only resolve to `true` when `NODE_ENV`/`BABEL_ENV` is explicitly set to the literal string `"development"`. Every package's `dev`/`dev:client` script (and `packages/service`'s `dev:serverless`) sets `NODE_ENV=development` explicitly for this reason. A missing/unexpected env var now always fails safe toward production-like output, instead of silently enabling development-only behavior - this is also why a plain `build` invocation (any `NODE_ENV` other than the literal `"development"`) is always safe by construction, with no special-casing needed in `babel.config.js` itself.
- Nx's `targetDefaults` (`nx.json`) declare `test`, `cover`, `job-application`, `job-applications`, `docs`, `resume`, and `letter` as `dependsOn: ["^build", "build"]`, so `yarn lerna run test`/`job-applications`/`docs`/`resume`/`letter` (locally or in CI) always builds a package and its dependencies first - the task graph is responsible for build ordering, not the developer or a manual CI step. This restores, at the task-graph level, the ordering the removed `.travis.yml` used to provide implicitly via its own sequential script.
- `start` and `dev` are also wired in `nx.json`'s `targetDefaults`, but with the narrower `dependsOn: ["^build"]` shape (upstream workspace dependencies' builds only, not the package's own) - `start`/`dev` serve a package's own code fresh via `webpack serve`/`serverless-offline`, so they never need the package's own `build` output, only a workspace dependency's (e.g. `www` bare-imports `@randy.tarampi/jsx` via its `"main"`/`"module"` fields, which only exist after `jsx`'s own `build` has run). This is what makes `yarn run start:www`/`start:service`/`start:web` work correctly straight after `yarn lerna run clean`, with no manual `yarn run build` in between.
- `packages/jsx/src/lib/reactRouter.cjs` (a Node-only dynamic-`require()` hack reaching into `react-router`'s installed dist files, originally added to work around `require("react-router")` crashing Mocha) has been deleted entirely: it could never work in a real browser bundle (no `require`/`require.resolve` at runtime there), and the original Mocha-crash justification is obsolete now that Node natively supports synchronously `require()`-ing a genuine ES module. Its 6 first-party consumers now import directly from `"react-router"`.
- `webpack.client.config.base.js` (shared by `letter`/`resume`/`www`'s client bundles) adds an `"immutable$": require.resolve("immutable")` `resolve.alias` entry, forcing every consumer in the bundle - our own source and third-party pre-compiled CJS code (`redux-immutable`) alike - to resolve the bare `"immutable"` specifier to its CJS/UMD build rather than webpack's default `mainFields`-driven real-ESM build (which has no default export, breaking any default-import-shaped consumer). `webpack.publish.config.base.js` already does the equivalent via `mainFields: ["main", "module"]`, unaffected by this addition.
- `packages/www/test/integration/dist/browserBundle.js` is a headless, `jsdom`-based smoke test that boots a local static server for `packages/www/dist`, loads the built ES5 bundle via `JSDOM.fromURL`, and asserts zero uncaught runtime errors plus real rendered content - closing the gap where the last several `www` dev-server regressions (ESM/CommonJS module-wrapper mismatches, `immutable` default-import interop) could only ever be caught by a human opening a real browser. It targets the ES5 (`nomodule`) bundle specifically, since jsdom doesn't implement `<script type="module">` and the bug class it guards against is resolution-based, not syntax-based, so it reproduces identically in both bundles.
- Files across the repo that derive `__dirname`/`__filename` in ESM now use the native `import.meta.dirname`/`import.meta.filename` built-ins (stable since Node 20.11/21.2, well within this repo's Node 24 baseline) instead of the older `fileURLToPath(import.meta.url)` + `dirname()` boilerplate. `createRequire(import.meta.url)` is untouched wherever a file also calls `require(...)` elsewhere, since `import.meta` has no equivalent for synchronous CJS `require`.

## Config layer
- `config/` provides `node-config` (`config@^5.0.0-alpha.2`) runtime settings, cascade-merging `config/default.cjs` + `config/{dev,prd,test,printable}.yml` + `config/local.cjs` + a `config/me` override folder.
- Every file under `config/` (`default.cjs`, `local.cjs`, and everything under `config/me/**`) uses the `.cjs` extension, not `.js`: `config@5`'s real ESM entry point (`config/lib/config.mjs`) loads these files as native ES modules based on the nearest `package.json`'s `"type"` field (the repo root's `"type": "module"`), and Node evaluates a bare `.js` file under a `"type": "module"` package as ESM regardless of its actual CommonJS-style content (`module.exports`) - crashing with `ReferenceError: module is not defined in ES module scope`. The explicit `.cjs` extension keeps these files unambiguously CommonJS, which is what config's parser expects for this whole directory.
- Genuine, non-bundled ESM call sites that import the bare `config` package directly (`buildPugLocals.js`, `packages/service/src/serverless/util/loadConfig.cjs` - see below) use the explicit ESM subpath `config/lib/config.mjs` where relevant, since `config@5.0.0-alpha.2` doesn't declare an `"exports"` map yet (a plain `import config from "config"` would still silently resolve the package's CJS `"main"` field instead). `server.js`/`gulpfile.js` files that access `config` via a local `createRequire()`-based `require("config")` correctly keep resolving to that same CJS `"main"` field on purpose - no subpath needed there. Webpack-bundled contexts keep the bare `import "config"` specifier too, since webpack already resolves the package's `"module"` field automatically.
- `packages/service` is now `"type": "module"` too, completing the CJS→ESM migration for every workspace package. Its config loader (`src/serverless/util/loadConfig.js`) is the one deliberate exception kept as CommonJS, renamed to `loadConfig.cjs`: it's invoked directly by the Serverless Framework's own `${file(...)}` variable-resolution syntax in `serverless.yml`/`env.yml`, a mechanism that loads `file()`-referenced scripts via a synchronous internal `require()`, not `import()` - so it stays `.cjs` and keeps its plain `require("config")` (resolving config's CJS `"main"` field, unaffected by the rest of the package's ESM conversion).
- `babel.config.js` centralizes JS transpilation.
- `webpack.client.config.base.js` is the shared client bundle base; the rest of the webpack configs layer on top.

## Test infrastructure
- Tests run on Mocha, usually through `gulp-mocha`.
- Package-level `mocha.config.cjs` files keep test config CommonJS-friendly in an ESM repo.
- Test runs merge package-level `test-results.xml` files into repo-level reports.
- `packages/service` uses `esmock` (not the old `require.cache`-deleting `freshRequire` helper, now removed) to mock ES module dependencies in tests - Node caches native ESM module instances internally with no public API to bust that cache, so the old CommonJS-era "delete from `require.cache` and reload" trick silently stops applying stubs once a package is genuinely ESM. One known, documented exception: `esmock` can't intercept `@randy.tarampi/serverless`'s doubly-nested dynamic re-export pattern in its built `es5/index.js` output, so the handful of tests that need it exercise the real function's computed output instead of a stub.

## CI/CD Pipeline
- `.github/workflows/ci.yml` runs lint + test on PRs on Node 24 / `ubuntu-latest`.
- `.github/workflows/install.yml` verifies dependency installation.
- `.github/workflows/test.yml` runs the full suite with coverage and affected builds via `--since`.
- `.github/workflows/release.yml` does master-branch `lerna version` + publish with OIDC trusted publishing.
- `.github/workflows/deploy.pages.yml` publishes `www` to GitHub Pages: dev on branch pushes, prd on `v*` tags.
- `.github/workflows/deploy.service.yml` deploys `service` to AWS Lambda on `v*` tags.
