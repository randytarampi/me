# Conventions

## Testing

- Tests use Mocha, usually wired through `gulp-mocha`.
- Mocha config files that need CommonJS should stay `.cjs` (`mocha.config.cjs` is the usual shape).
- Use `sinon` for stubbing/mocking non-module-boundary code. For mocking ES module dependencies (a target module's own imports), use `esmock` — the sanctioned approach, adopted throughout `packages/service`'s test suite, replacing the old `require.cache`-deleting `freshRequire` helper which doesn't work against real ESM module instances. Don't reach for `proxyquire`.

## Building

- Gulp owns the task orchestration.
- Webpack owns bundling and package outputs.
- The build is genuinely ESM end-to-end now - there's no more ES5/CommonJS dual build anywhere (see `docs/ARCHITECTURE.md`'s "Build pipeline" section for the full story and the two remaining, deliberate CJS exceptions).

## ESM rules

- ESM is the default because the repo is `type: module`.
- Every workspace package is now `"type": "module"` — there are no remaining package-level CommonJS exceptions. Only specific tooling/config files stay CommonJS via the `.cjs` extension (e.g. `mocha.config.cjs`, `loadConfig.cjs`, `util.cjs`, `config/**/*.cjs`); don’t rename those without checking the build/test fallout.
- Config files that need CommonJS should use `.cjs`.

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
