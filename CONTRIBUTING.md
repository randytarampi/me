# Contributing

This repo is old enough to have opinions. Keep changes small, test them, and don’t pretend the toolchain is simpler than it is.

## Prereqs

- Node 24
- Yarn 4.17 via Corepack (`corepack enable` if needed)
- Whatever environment variables your target app needs; start from `.env.example`

## Setup

1. Clone the repo.
2. Run `yarn bootstrap`.
3. Copy the relevant env file(s) from `.env.example` and fill them in.

## Workflow

- Branch from main.
- Make the change.
- Commit with conventional commits, but keep the human voice.
- Run tests and lint before you open the PR.
- Use the PR template and say what you broke/fixed.

## Testing

- `yarn test`
- `npx lerna run test --scope @randy.tarampi/<pkg>`
- `yarn cover` when you need coverage numbers

## Code style

- ESLint flat config
- ESM by default; `service` and `www` are the CJS exceptions
- Prefer workspace-scoped edits over sweeping cross-package rewrites
- Conventional commits, with personality if you’ve got it
