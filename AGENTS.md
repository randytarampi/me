# AGENTS.md

`me` is the personal site/app monorepo for www.randytarampi.ca and the shared packages that keep the site, backend, and generators from turning into copy-paste soup. It is a Yarn 4 + Lerna workspace with shared packages under `packages/*` and the main `service`/`www` apps on top.

Canonical commands:
- `yarn bootstrap` — install workspace deps
- `yarn test` — run tests and merge reports
- `yarn cover` — run coverage and collect reports
- `yarn lint` — run ESLint
- `yarn build` — build all packages
- `yarn clean` — remove build/test junk
- `yarn start:service` — run the backend
- `yarn start:www` — run the public app
- `yarn start:web` — run service + www together

Constraints and sharp edges:
- Node 24, Yarn 4.17, and Lerna 9 are the baseline.
- Every workspace package is `"type": "module"` — full ESM, no package-level CommonJS exceptions remain.
- Config/tooling files that need CommonJS stay `.cjs` (e.g. `mocha.config.cjs`, `loadConfig.cjs`, `util.cjs`, `config/**/*.cjs`).
- Shared packages mostly depend on each other with `workspace:*`; the app surfaces sit on top.
- `service` depends on `js`, `lambda-logger`, and `serverless`; `www` depends on the shared UI/logger/theme packages.
- Watch the flaky `redux-metrics` timestamp test.
- `enzyme`/`chai-enzyme` are fully removed repo-wide; `jsx` uses React Testing Library. `jsx/src/lib/reactRouter.cjs` remains a deliberate CJS wrapper (react-router internals need it), unrelated to enzyme.
- `materialize-css`-era code is legacy and brittle; keep changes there narrow.
- PDF/image attachments are unreadable to coding agents — never ask the user to re-send; probe artifacts instead with `pdftotext` (text), `pdfinfo` (page count/size), `pdffonts` (embedded fonts), or `cmp`/python (byte checks). See `packages/job-application/scripts/probe-pdf.sh` for the ready-made triad.

Details:
- [Architecture](docs/ARCHITECTURE.md)
- [Conventions](docs/CONVENTIONS.md)
- [Limitations](docs/LIMITATIONS.md)
- CodeGraph: semantic code index available. Run `codegraph status` to check, `codegraph init` to rebuild. MCP tools available in OpenCode.

Setup / onboarding:
- Run `codegraph init` after cloning to enable semantic code search via CodeGraph.

## How to add/enrich/update guidance in this repo
- Keep this file short; put repo facts in `docs/*`.
- If layout or scripts change, update the command list and `ARCHITECTURE.md`.
- If a repo rule changes (Node, ESM, linting, commits), update `CONVENTIONS.md`.
- Only keep unresolved items in `LIMITATIONS.md`; remove entries when fixed.

## Commit and PR conventions
- Use [GitHub keywords](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/using-keywords-in-issues-and-pull-requests#linking-a-pull-request-to-an-issue) (`Closes #N`, `Fixes #N`, `Resolves #N`) in commit messages and PR descriptions to automatically link and close related issues/PRs.
- Keep commits small and atomic — one logical change per commit. Don't push until ready.
- Follow [Conventional Commits](https://www.conventionalcommits.org/) format (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`).
