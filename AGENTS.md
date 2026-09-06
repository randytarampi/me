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
- Node 24, Yarn 4.18, and Lerna 10 are the baseline.
- Every workspace package is `"type": "module"` — full ESM, no package-level CommonJS exceptions remain.
- Config/tooling files that need CommonJS stay `.cjs` (e.g. `mocha.config.cjs`, `loadConfig.cjs`, `util.cjs`, `config/**/*.cjs`).
- Shared packages mostly depend on each other with `workspace:*`; the app surfaces sit on top.
- `service` depends on `js`, `lambda-logger`, and `serverless`; `www` depends on the shared UI/logger/theme packages.
- Watch the flaky `redux-metrics` timestamp test.
- `enzyme`/`chai-enzyme` are fully removed repo-wide; `jsx` uses React Testing Library. `jsx/src/lib/reactRouter.cjs` remains a deliberate CJS wrapper (react-router internals need it), unrelated to enzyme.
- `materialize-css`-era code is legacy and brittle; keep changes there narrow.
- PDF/image attachments are unreadable to coding agents — never ask the user to re-send; probe artifacts instead with `pdftotext` (text), `pdfinfo` (page count/size), `pdffonts` (embedded fonts), or `cmp`/python (byte checks). See `packages/job-application/scripts/probe-pdf.sh` for the ready-made triad.
- **Adversarial review before push.** Before pushing any commit that changes GitHub Actions workflows, Pulumi infrastructure code, or IAM/OIDC configuration, run an adversarial review: check that all referenced workflow files exist, all action versions are valid, all permissions are consistent between callers and callees, and all environment declarations match IAM trust policies. Run `actionlint` to catch YAML and workflow syntax errors. This is not optional for infrastructure changes.
- **AWS credentials.** The agent shell has scrubbed AWS credentials — all AWS commands must be handed to the user as copy/paste blocks. See [docs/AWS_CREDENTIALS.md](docs/AWS_CREDENTIALS.md) for the pattern.

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

<!-- Managed by configure-agent-guidance.py — do not edit between DOTFILES_REPO_GUIDANCE markers -->
<!-- DOTFILES_REPO_GUIDANCE_START -->
## Repository Guidance

These policies apply to work in every repository.

### Verification

- Run the repository's canonical verification command before claiming success.
- If verification fails, fix it before reporting the work as complete.
- Verify from the committed tree, never the working tree: when the tree is dirty, stash first (or verify `git show HEAD:<file>`) so in-flight content cannot satisfy a check the commit would fail.
- Treat a lane's verification claim as unproven until it is independently re-run: re-execute the repo's verify command (and `actionlint` on workflow changes) before accepting it.

### Commits and pushes

- Keep one concern per commit.
- Use Conventional Commits (`type(scope): description`).
- Never push unless the user explicitly authorizes it.

### Writing and ambiguity

- Use Canadian English in prose and Canadian Press style for formal artifacts.
- Ask before implementing when a flag or name has ambiguous semantics; do not guess when the cost of being wrong is high.

### Delegation and planning

- For unknown scope, delegate bounded discovery first; read expected edit targets directly.
- When changing AI tooling, assess every configured tool up front and enumerate the full tool fleet.
- Keep repository-specific facts and implementation details in the repository's own guidance and documentation.
- Dispatch discipline: never dispatch onto a repo another lane may own. When a background signal contradicts the Job Board, or the board shows `error`/unknown for a session, verify the repository's tip and dirty state directly before re-dispatching — a stale or ambiguous board signal is not proof a session is gone.
- Never run long `sleep`/poll loops in the orchestrator shell; dispatch a read-only watcher lane and end the turn.

### API verification notes

- Verified live 2026-09-05; recheck these facts before debugging around them.
- GitHub Actions `startup_failure` runs expose no check-run, job or annotation API artifacts; use the Actions UI.
- GitHub environment REST responses may omit required reviewers; trust a release run's `waiting` state or the Settings UI, and verify GraphQL types against the schema.
- GitHub Actions allowlists match the full `owner/repo/path@ref`; audit every `uses:` entry, including subpaths and aliases.
- AppVeyor build-job logs are raw text, not JSON.
- Coveralls badges can be stale; use project build JSON for current coverage.
- Unpublished npm versions cannot be republished; release a higher version.

### Communication

- Image and screenshot inputs are not supported in agent lanes; ask for text, a description, or a probed artifact (`pdftotext`, `xxd`) instead of accepting an unreadable file.

### Artifacts

- Probe binary artifacts with appropriate local tools before concluding they are unreadable; never ask the user to resend an unreadable artifact.
<!-- DOTFILES_REPO_GUIDANCE_END -->
