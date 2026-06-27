# Conventions

- Use Yarn 4 (`packageManager`) for installs and scripts.
- Node 24 is the baseline.
- ESM is the default; only documented exceptions should stay CommonJS.
- ESLint uses flat config (`eslint.config.js`).
- Follow conventional commits; release automation assumes predictable commit messages.
- Prefer workspace-scoped changes over cross-package edits unless the shared contract changed.

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
