# Conventions

- Use Yarn 4 (`packageManager`) for installs and scripts.
- Node 24 is the baseline.
- ESM is the default; only documented exceptions should stay CommonJS.
- ESLint uses flat config (`eslint.config.js`).
- Follow conventional commits; release automation assumes predictable commit messages.
- Prefer workspace-scoped changes over cross-package edits unless the shared contract changed.
