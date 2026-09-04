# Conventions

## Testing

- Tests use Mocha, usually wired through `gulp-mocha`.
- Mocha config files that need CommonJS should stay `.cjs` (`mocha.config.cjs` is the usual shape).
- Use `sinon` for stubbing/mocking non-module-boundary code. For mocking ES module dependencies (a target module's own imports), use `esmock` — the sanctioned approach, adopted throughout `service`'s test suite, replacing the old `require.cache`-deleting `freshRequire` helper which doesn't work against real ESM module instances. Don't reach for `proxyquire`.
- **esmock must be imported dynamically** (not statically at module top level). `esmock`'s own module graph contains top-level `await`, and Mocha's spec-file loader tries to `require()` each spec file first — Node refuses to synchronously `require()` any ESM graph with top-level `await`, throwing `ERR_REQUIRE_ASYNC_MODULE`. A dynamic `import("esmock")` inside a function sidesteps this: the wrapper module loads via `require()` just fine, and the dynamic import resolves later during async test execution. See `service/test/lib/esmock.js`.
- **Pre-require built ESM artifacts in integration tests** as a regression guard against the real `esm/` output becoming un-`require()`-able (e.g. a stray `.jsx` extension or un-fully-specified bare import). These issues don't surface when testing against `../src` via Babel's live transform alone. See `resume/test/03_import-esm-build.js` and `letter/test/03_import-esm-build.js`.
- **Pre-require packages to avoid `ERR_REQUIRE_ESM_RACE_CONDITION`**: Mocha's `requireOrImport` always tries a dynamic `import()` of a `.js` spec file first. When that spec's import graph includes an unbuilt `.jsx` file, the `import()` partially registers the ESM dep before rejecting, then Mocha falls back to `require()` — which collides with the partial registration. Fully `require()`-ing the package first (with nothing else racing) leaves a complete, cached module instance so both paths resolve to the same instance.

## Building

- Gulp owns the task orchestration.
- Webpack owns bundling and package outputs.
- The build is genuinely ESM end-to-end now - there's no more ES5/CommonJS dual build anywhere (see `docs/ARCHITECTURE.md`'s "Build pipeline" section for the full story and the two remaining, deliberate CJS exceptions).
- **NODE_ENV/NODE_CONFIG_ENV decoupling**: Build scripts set `NODE_ENV=production` (the ecosystem-standard value for React/Terser/webpack `mode` resolution) and `NODE_CONFIG_ENV=prd` alongside it. This decouples "which config file to load" from `NODE_ENV` itself, per `config@5`'s supported mechanism — `config` loads `config/prd.yml` instead of silently falling back to `default.cjs`/`local.cjs`. The production-like values are `"production"` and `"prd"`. See `util.cjs`.
- **Development mode is opt-in, not opt-out**: Development-mode tooling (react-refresh, HMR, eval-source-map) is only enabled when `NODE_ENV`/`BABEL_ENV` is explicitly set to the literal `"development"`. A missing/unexpected env var fails safe (production-like output) instead of silently enabling development-only behavior. See `util.cjs`.
- **Sass `loadPaths` (not `includePaths`)**: `gulp-sass@6` and `sass-loader@17` wrap the modern Dart Sass JS API (`compileString`/`compileStringAsync`), which only understands `loadPaths`. The legacy `includePaths` option is silently ignored. Always use `loadPaths` in sass options. See `gulpfile.base.js` and `webpack.client.config.base.js`.
- **gulp 5 decodes `gulp.src` streams as UTF-8 by default**: copying binary assets (fonts, images, PDFs) through a bare `gulp.src → gulp.dest` mangles them into U+FFFD sequences (this silently corrupted every woff2 in `www/docs` and broke all icons on www.dev.randytarampi.ca). Always pass `{encoding: false}` on any `gulp.src` whose globs can match binary files. The deploy pipeline's CI gate (`deploy.pages.yml`) byte-compares `docs/` against `dist/` as a backstop. See `www/gulpfile.cjs`.
- **`NX_SKIP_NX_CACHE=true` when verifying output correctness**: the Nx cache replays recorded outputs, so a build can "succeed" while serving stale artifacts (bit us during PDF pagination verification — cached builds showed stale page counts and stale font embeddings). Use it whenever the point of the run is to observe fresh output; plain `yarn lerna run <task>` is fine for iteration.
- **React 19 `defaultProps`**: jsx-runtime silently ignores `defaultProps` on plain function components *and* on memo-wrapped function components — which includes react-redux 9's `Connect` wrapper (`React.memo(ConnectFunction)`). Class components are unaffected. Defaults must live in destructured parameter defaults, explicit props at the call site, or `connect()` mapState/mapDispatchToProps closure fallbacks. Enforced by the `no-restricted-syntax` rule in `eslint.config.js`.
- **`show-on-letter`/`show-on-a4`/`show-on-legal` are cumulative, not banded**: page-size media queries (`variables.scss`) are open-ended `min-height` thresholds (letter ≥11in, a4 ≥11.69in, legal ≥14in) — a bigger page shows every smaller tier's content, matching the reference PDFs. Do not "fix" apparent bleed-through by adding `max-height` caps; the 2018 thresholds' odd numbers came from an older renderer with a shrunken print viewport.

## ESM rules

- ESM is the default because the repo is `type: module`.
- Every workspace package is `"type": "module"` with exactly one exception, `infrastructure` (see below). Only specific tooling/config files stay CommonJS via the `.cjs` extension (e.g. `mocha.config.cjs`, `loadConfig.cjs`, `util.cjs`, `config/**/*.cjs`); don’t rename those without checking the build/test fallout.
- Config files that need CommonJS should use `.cjs`.
- **ESM `.default` import pattern**: When `require()`-ing an ESM-built package, the default export may be on `.default` (e.g. `require("vinyl-paths").default`). Always use the fallback pattern: `require("pkg").default || require("pkg")`. This is needed for packages like `vinyl-paths@5`, `gulp-mocha`, `gulp-autoprefixer`, and `gulp-if`.
- **`fullySpecified: false` on webpack babel-loader rules**: When webpack sees genuine ESM syntax from a `"type": "module"` package, it enforces Node's strict "fully specified" import-specifier rule (extension required even for bare `node_modules` subpath imports). Many existing imports predate this rule. Disable it per-rule with `resolve: { fullySpecified: false }` on every babel-loader rule that processes ESM output. See `webpack.client.config.base.js`.
- **Avoid barrel imports in circular dependency chains**: If module A imports from `./util/index.js` and `util/index.js` re-exports a module that imports A back, import directly from the specific file instead (e.g. `from "./util/compositeKeySeparator.js"`). Barrel files (`index.js` that re-export everything) create transitive dependency cycles that cause `ReferenceError: Cannot access 'X' before initialization` (TDZ) at runtime under native ESM. This bit us with `post.js → util/index.js → getEntityForType.js → gallery.js/photo.js → post.js`. If you're adding a new entity or util, import from the specific file, not the barrel. See `packages/js/src/lib/models/` for the corrected pattern.

## The `infrastructure` workspace

`infrastructure/` declares the identity, access and repository configuration this repo depends on — the GitHub Actions OIDC provider and deploy roles, the SSM parameters `service` reads at deploy time, the `master` ruleset, the `dev`/`prd` environments, the Actions secret inventory, and the npm trusted publishers `release.yml` publishes through. It is a leaf: nothing imports from it.

It breaks two repo-wide rules on purpose, and both are contained by that leafness:

- **It is the only `"type": "commonjs"` workspace.** Pulumi's Node language host loads the program's entry point itself and its bundled TypeScript transpilation emits CommonJS. An ESM program would have to be pre-compiled before every `pulumi preview`, turning a read-only drift check into a build.
- **It is the only TypeScript in the repo**, and owns the only `tsconfig.json`. Pulumi's resource surface is large enough that types earn their keep; `eslint.config.js` ignores `**/*.ts` rather than pulling a TypeScript parser into the whole monorepo, so the type check *is* `yarn workspace @randy.tarampi/infrastructure run build` (`tsc --noEmit`).

The boundary that matters: Pulumi owns identity, access and repository configuration. `service/serverless.yml` owns the application — the posts S3 bucket, both DynamoDB tables, the SNS dead-letter topic, the six CloudWatch alarms and the API Gateway custom domain stay there. Moving them would put two tools in a fight over one CloudFormation stack. See `infrastructure/README.md` for the bootstrap ordering and the steps that cannot be automated.

## Build artifacts

The following directories are **build outputs** — regenerated by `yarn build`, gitignored, and never edited by hand. Never `git add -f` any file inside them. If a file you need to edit lives in one of these directories, find and edit the **source** instead.

| Directory | Source | Regenerated by | What it is |
|---|---|---|---|
| `packages/*/esm/` | `src/` | `yarn build` (Babel) | ESM build output for workspace packages |
| `packages/*/dist/` | `src/` | `yarn build` (webpack) | Bundled output |
| `www/docs/` | `www/src/` + `packages/views/templates/` | `yarn build` (webpack + gulp-pug) | Generated HTML pages — fix `layout.pug` or `*.jsx`, not `*.html` |
| `service/.serverless/` | `service/serverless.yml` | `sls package` | Serverless packaging output |
| `**/coverage/` | — | `yarn cover` | nyc/istanbul coverage reports |

Rules:
- **Never `git add -f` a build artifact.** If git is ignoring a file, it's probably a build output. Find the source instead.
- **Never edit generated files directly.** If `www/docs/*.html` has wrong content, fix `layout.pug` or the relevant `*.jsx` view and rebuild.
- **`esm/` is not a source of truth.** Data files like `letter/esm/letters/letter.json` are copies of `letter/src/letters/letter.json` — edit the source, not the copy.
- **`.env` is a local file, not a build artifact.** It's gitignored and should be regenerated from `.env.example` with real values. If `.env` contains shell dump (PWD, OLDPWD, PATH), it's corrupted — delete and regenerate.

## Dependency management

- Use `workspace:*` for internal workspace dependencies.
- Use `portal:` only for cross-repo links when the code really lives in `me`.
- Keep versions aligned with `syncpack`; don’t hand-wave skew.
- Prefer workspace-scoped changes over cross-package edits unless the shared contract changed.

## Baseline

- Yarn 4 (`packageManager`) for installs and scripts.
- Node 24 is the baseline.
- ESLint uses flat config (`eslint.config.js`).
- Follow conventional commits; release automation assumes predictable commit messages.

## Error handling

- **Cache failures should never break the request**: Intentionally swallow caching errors — the service falls back to the origin source. See `service/src/lib/cacheClient.js`.
- **Best-effort side effects must never block state transitions**: Wrap setup/teardown side effects (e.g. Crisp widget, route setup dispatches) in try/finally so an exception never prevents critical state from being set. See `www/src/public/views/hotApp.jsx`.

## Webpack

- **`devServer.static.watch: false`**: `HtmlWebpackHarddiskPlugin` and `BundleAnalyzerPlugin` both physically write into the dev server's static directory on every compile. With the default `watch: true`, webpack-dev-server treats those self-writes as source changes and triggers another compile, ad infinitum. Disabling `watch` stops the self-triggering rebuild loop. See `webpack.client.config.base.js`.
- **`GenerateSW` is skipped for dev builds**: Precaching unminified dev bundles has no value and was the source of "GenerateSW has been called multiple times" warnings (re-triggered by every self-inflicted dev-server recompile) and oversized-file warnings. See `www/webpack.client.config.esm.js`.
- **`service` no longer uses webpack at all.** Serverless Framework v4 builds Lambda bundles with its own esbuild, and the docs are explicit that `serverless-webpack` "will not work unless you opt out of the default build experience". The plugin, `service/webpack.serverless.config.js` and the `custom.webpack` block are gone; the bundle is configured by `build.esbuild` in `service/serverless.yml`, which emits `.mjs` so `nodejs24.x` reads the module format from the extension rather than from a `"type"` field the packaged `package.json` never carried.

## Voice and Style

We use conventional commits with personality. Be practical and candid. Explain WHY, not just WHAT.

Good examples from this repo's history:
- `fix(resume): We need to yarn resume before we can yarn docs. Otherwise we don't get any resumes... 🤦‍♂️`
- `fix: webpack-node-externals expects an allowlist, not a whitelist. ✊🏿`
- `chore(package): Set snyk: false. I mean, the cloud service is scanning... Or am I getting this switch the other way around...? 🤔`
- `chore(www): Transition to webpack-dev-server. Finally.`

Rules:
- Subject line: `type(scope): brief description.` — sentence case, period optional
- Body: explain the why, not just the what. Be yourself.
- Emojis are fine when they add personality, not as decoration
- Don't be corporate. Don't be robotic.
- PR descriptions: thorough but relaxed. Show your work.
