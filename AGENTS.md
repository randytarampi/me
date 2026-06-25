# AGENTS.md

`me` is the personal site/app monorepo. It is a Yarn 4 + Lerna workspace with shared packages under `packages/*` and the main `service`/`www` apps on top.

Canonical commands:
- `yarn bootstrap`
- `yarn test`
- `yarn cover`
- `yarn start:service`
- `yarn start:www`
- `yarn start:web`
- `yarn clean`

Details:
- [Architecture](docs/ARCHITECTURE.md)
- [Conventions](docs/CONVENTIONS.md)
- [Limitations](docs/LIMITATIONS.md)

## How to add/enrich/update guidance in this repo
- Keep this file short; put repo facts in `docs/*`.
- If layout or scripts change, update the command list and `ARCHITECTURE.md`.
- If a repo rule changes (Node, ESM, linting, commits), update `CONVENTIONS.md`.
- Only keep unresolved items in `LIMITATIONS.md`; remove entries when fixed.
