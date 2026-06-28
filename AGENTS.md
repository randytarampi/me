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
- ESM is the default; `service` and `www` are the CommonJS exceptions.
- Config/tooling files that need CommonJS stay `.cjs`.
- Shared packages mostly depend on each other with `workspace:*`; the app surfaces sit on top.
- `service` depends on `js`, `lambda-logger`, and `serverless`; `www` depends on the shared UI/logger/theme packages.
- Watch the flaky `redux-metrics` timestamp test.
- The `jsx` package still has an incomplete enzyme → RTL migration, so some tests use CJS wrappers.
- `materialize-css`-era code is legacy and brittle; keep changes there narrow.

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
