# Cross-repo modernization roadmap

> **Status:** council-endorsed direction, dated 2026-09-06
> **Scope:** `me`, the five companion repositories, and the dotfiles generator
> **Confidence:** `[verified]` means a commit, run, or local check is available; `[believed]` means a bounded estimate or interpretation; `[aspirational]` means a target rather than a delivered capability.

## 1. Document contract

This document supersedes `docs/MATERIALIZE_MIGRATION.md`. It is the durable
architecture and sequencing contract for the next modernization cycle. It is
not an operational status page: current branch tips, waiting release runs,
secret values, and deployment state belong in issues, runbooks, and the
repository history. A statement can therefore be directionally authoritative
without claiming that the work is already complete.

The roadmap covers the personal site and its six-repository delivery fleet:
`me`, `lwip`, `pseudoimage`, `pwa`, `slamscan`, `pseudolocalize`, plus the
dotfiles repository that generates shared agent and CI guidance. It also
covers the boundary between application infrastructure and portfolio
governance. It does not authorize destructive imports, release approvals,
secret rotation, or a product redesign without the human gates named below.

Its audience is intentionally mixed. A human uses the phase gates and rejected
alternatives to decide what deserves attention; a repository maintainer uses
the workstreams and scorecard to open a bounded issue; and an agent uses the
task-form rules and update block to avoid inventing authority. The same prose
should therefore remain useful without access to a live dashboard. Links to
volatile state are evidence pointers, not a promise that a future reader can
repeat a run unchanged.

The primary unit of work is one concern in one repository. A modernization
item may have a cross-repo design, but it gets one issue and one pull request
per repository. Commits remain small and conventional. When this document
changes, the update process at the end is part of the contract.

Durable facts migrated from the former Materialize note are in the Materialize
workstream in section 10. The old note is deleted so there is only one source
of direction. The old facts remain deliberately narrow: this roadmap does not
pretend that a component replacement is a prerequisite for every other fleet
decision.

## 2. Executive direction

Five conclusions govern the programme.

1. **The fleet has a reliable floor.** `[verified]` All six repositories are
   on `main`; their verification commands are green at the recorded baseline,
   release workflows are gated, and the common Yarn/Lerna/Nx versions have
   been reconciled. This is a floor, not a declaration that every dependency,
   deploy, or native edge case is solved.
2. **Close release and security gates first.** Trusted publishing, production
   reviewers, the three major release approvals, the remaining high-impact
   `lodash.set` alert, Sentry wiring, and the small number of human UI actions
   are runway-closing work. New automation must not be used to bypass them.
3. **Establish one workflow contract.** The fleet should share meanings for
   validate, test, analyse, package, release, deploy, and observe while
   retaining thin repository callers. One pilot repository comes before
   batches; there is no seven-repository big bang.
4. **Separate portfolio infrastructure from `me`.** `me` owns its AWS
   application boundary: OIDC roles, SSM runtime secrets, and adopted
   resources. A separate governance stack owns GitHub policy and integration
   bindings. Serverless/CloudFormation remains the owner of application
   resources; dual orchestration is forbidden.
5. **Turn `me` from a social aggregator into an owned publishing system.** The
   site should make writing and photographs canonical on `randytarampi.ca`,
   distribute deliberately, and present a curated proof of work. It should not
   become an ambient activity firehose, comments product, engagement
   dashboard, social graph, Instagram clone, custom CMS, or newsletter.

## 3. Mandate and dispositions

The council considered the six wishlist items below. The labels and verdicts
are the mandate, not a suggestion to reopen settled alternatives.

### 3.1 Dotfiles-Poetry — **COMMIT-NOW**

Adopt Poetry for the dotfiles Python package boundary, with shell modules and
one canonical `make verify`. Poetry, not `uv`, is the selected direction.
The package boundary makes the Python tests and support scripts explicit;
shell modules keep platform setup and command wrappers comprehensible; the
single verify target gives agents and humans one truthful entry point. Do not
create a fleet-wide task/just runner or a second command vocabulary merely to
make this look uniform.

### 3.2 GH-Actions-standardization — **COMMIT-NOW, migrate incrementally**

Standardize the meanings of `validate`, `test`, `analyse`, `package`,
`release`, `deploy`, and `observe`. Keep callers thin and implementations
shared where it is safe. Establish a stable `ci/required` check, then pilot
one repository and move in batches. The standard is a workflow contract, not
an enormous central workflow and not a seven-repository big bang. Existing
toolchains remain valid when their boundary and evidence satisfy the contract.

### 3.3 Pulumi-GitHub — **DESIGN-NOW, implement narrowly**

Import repositories with deletion protection and retain-on-delete. Manage
environments, reviewers, rulesets, labels, security configuration, Actions
policy, and the required variable/secret bindings. Dependabot remains
file-stamped from dotfiles. Copilot MCP is a documented UI-only runbook,
because automation is impossible in the current integration. GitHub Projects
are designed in this roadmap but never Pulumi-managed.

### 3.4 Pulumi-third-parties — **RATIONALIZE-BEFORE-AUTOMATING**

Decommission first where a service is dead: Snyk, Codacy, DeepScan, Hound,
and FOSSA are not candidates for a new Pulumi abstraction. Pulumi may manage
survivors such as Sentry, UptimeRobot, and the coverage tool. Serverless keeps
owning application stacks. npm is a rotation runbook, not a Pulumi resource;
GCP is punted until a workload exists; token lifecycle is a small CLI plus a
password manager, not Pulumi.

### 3.5 Product direction — **TWO BETS**

The product bets are owned publishing and agent-operated maintenance. The
milestones are consequently rescoped around fleet reliability, runtime
renewal, owned publishing, and delegated delivery. The resume remains
untouched. Product work must support the site as a person’s curated proof of
work rather than reward raw activity volume.

### 3.6 Workflow-layer and portfolio control plane — **DESIGN-NOW, pilot before scale**

Use one account-level Fleet Delivery Project for all repositories and dotfiles,
with one issue and PR per repository. A small, manually governed portfolio
control plane may later manage GitHub policy and drift reporting. It must not
execute untrusted issue text, hold unnecessary secrets, or merge agent PRs by
itself during the pilot. The first release is an observable, human-gated
workflow, not autonomy theatre.

The project is a coordination surface, not a second issue tracker with a
different truth. The repository issue remains the detailed record; the project
fields make portfolio questions answerable: what is blocked, which repository
owns the next action, how much agent capacity is in flight, and which human
gate is waiting. An item moves to Done only when its issue has the expected
evidence and the resulting repository state is visible. A PR merge alone is
not completion if deployment, publication, or a manual UI action is still
outstanding.

## 4. Year in review

The sparse era accumulated operating debt. A long period with little visible
change did not mean the system was simple: legacy React assumptions, native
bindings, release paths, deployment ownership, and hand-maintained workflow
exceptions kept compounding. The debt was mostly invisible until a modern
runtime, a gated release, or a degraded data source crossed an old boundary.

The summer 2026 modernization wave was a 344-commit year-in-review slice
covering ESM/CJS completion, Babel distribution changes, dynamoose v4,
asynchronous Lambda handlers, Serverless v4 schema corrections, infrastructure
preview CI, and the React 19 `defaultProps` saga. The changes were not just
cleanup. They exposed where the fleet lacked a shared definition of done.

The Sept. 5–6 marathon moved from modernization to governance. It repaired
the service read path and warmup/capacity failure, completed the master-to-main
transition, reconciled Yarn 4.18/Lerna 10/Nx 23, stamped shared AGENTS
guidance, gated releases, enabled provenance, retired AppVeyor, cleaned S3
resource-fork objects, verified 1,316 DynamoDB rows, classified 67 Dependabot
alerts, and delivered the N-API scope spike. The result is a more honest
starting line, not permission to automate every remaining decision.

Two corrections are part of the history and must not be edited away. First,
the initial claim that Yarn 4.18 was uniform proved false: `slamscan`,
`pseudoimage`, and `pseudolocalize` were still on 4.17. That claim was
verified, corrected, and fixed in commits `7175f28`, `7c04165`, and `c6ff250`.
Second, the initial CodeQL scope assumption for Kotlin proved wrong. The
extractor could not process the Kotlin/JS output, so the job was removed and
the JavaScript/TypeScript scope was documented in `22519af`. A green-looking
badge is not a substitute for a truthful extractor boundary.

Other lessons are equally concrete: Coveralls badge CDN lag is not a coverage
regression; `startup_failure` has no useful API artefacts; GitHub’s environment
REST response can omit required reviewers even when a release is correctly
waiting; and a degraded post row was S3 binary corruption round-tripping
through cache, not a malformed DynamoDB table. The roadmap therefore favours
evidence links, UI checks where APIs lie, and explicit confidence markers.

## 5. Verified baseline

The following four status classes distinguish what is known from what is
waiting on a person.

### Green: repository and CI floor

- `[verified]` All six repositories verify on `origin/main` with their
  canonical Yarn commands; Node 24 is the native-build baseline. The uniform
  toolchain is recorded by the reconciliation commits above and the day-two
  progress log.
- `[verified]` Release paths use CI-success gates, head-SHA checkout, a
  production environment, and a required reviewer. The REST API is not the
  reviewer source of truth; the waiting run or Settings UI is.
- `[verified]` AppVeyor was fully removed from `lwip` and `pseudoimage` in
  `4d0f440` and `4d81157`. The retirement is evidenced in the repository
  histories, not inferred from a badge.
- `[verified]` Dotfiles has 39 pytest tests and CI matrix coverage for macOS
  and Ubuntu verify/deploy smoke paths. The local commits are listed in the
  progress record and must be pushed before they become the shared baseline.

### Green with bounded scope

- `[verified]` CodeQL is scoped to JavaScript/TypeScript where the extractor
  is truthful. Kotlin was removed rather than labelled green incorrectly.
- `[verified]` Qlty uses OIDC and Coveralls reports coverage. Coveralls is
  retained by design; a stale CDN badge is not a decommission signal.
- `[verified]` npm provenance is enabled with `NPM_CONFIG_PROVENANCE` and
  `id-token: write`, with no npm token in release workflows. Trusted-publisher
  linkage in the npm UI and local-token revocation remain human actions.
- `[verified]` S3 binary objects named like macOS resource forks were deleted;
  DynamoDB was checked clean at 1,316 rows, `searchPosts` totals reconcile,
  and the S3 source now skips binary objects before YAML parsing.

The baseline also records what was intentionally not “fixed” by changing the
scope. Kotlin was not forced into a JavaScript CodeQL result, Coveralls was not
removed because a CDN badge lagged, and the 67 Dependabot alerts were not
treated as one undifferentiated emergency. The service’s two incidents were
separated: the 502 bundle failure and the zero-result DynamoDB throttling
failure had different causes and different fixes. This matters operationally:
future reviews should not collapse unrelated red signals into a single broad
rewrite.

The day-two data cleanup is similarly bounded. Two macOS resource-fork S3
objects were the corruption source; the validated DynamoDB table contained
1,316 healthy rows. The source now isolates parse failures and skips binary
objects, while the regression coverage exercises the failure shape. That is
evidence for the cache boundary, not a claim that arbitrary future data is
safe. The observe stage must continue to report per-key skips rather than
silently turning data loss into an empty feed.

### Amber: human gates and parked work

- `[verified]` The three major lanes are prepared: `lwip` 4.0.0, `pseudoimage`
  5.0.0, and `pseudolocalize` 3.0.0. Runs `34022029836`, `34021709134`, and
  `34019936167` are waiting for npm UI trusted-publisher linkage and user
  approval. They are not represented here as published facts.
- `[verified]` Dependabot’s 67 alerts classify as 64 runtime and three dev;
  `lodash.set` #191 is the immediate HIGH candidate because it reaches the
  deployed www graph. `materialize-css` alerts are tied to the replacement
  programme. The user’s parked decision is a Phase 0 gate, not permission to
  silently upgrade it.
- `[verified]` Sentry auth-token management is represented in Pulumi, with
  import documented in `73f97d9c6` and `ddd091546`; actual deployment wiring
  still needs the Phase 0 verification.

### Not a baseline claim

The N-API inventory is `[believed]` sizing: 100 NAN matches in 22 files,
including 69 in `image.cpp`, 24 in `image.h`, and the remaining encoder,
decoder, and init matches. It is a bounded spike, not a migration. The
Materialize estimate is likewise `[believed]` at two to three dedicated weeks.
Future product cadence and agent delivery are `[aspirational]` until a person
has accepted the gates and the site has demonstrated them.

Evidence index: [the complete progress record](../../.slim/deepwork/progress-me-modernization-20260905.md),
[service fixes](https://github.com/randytarampi/me/commits/main/),
[release run: lwip](https://github.com/randytarampi/lwip/actions/runs/34022029836),
[release run: pseudoimage](https://github.com/randytarampi/pseudoimage/actions/runs/34021709134),
[release run: pseudolocalize](https://github.com/randytarampi/pseudolocalize/actions/runs/34019936167),
and [the me Actions history](https://github.com/randytarampi/me/actions).

### Baseline table — Gate A5 evidence, dated 2026-09-24

| Repo | Source/build | Test/verify | Release/provenance | Security/dependencies | Infrastructure/operations | Documentation/ownership | Delegation/evidence |
|---|---|---|---|---|---|---|---|
| me | M3 [surveyed] — active monorepo hardening | M3 [surveyed] — local V5 harness and browser gates | M2 [surveyed] — V5 remains route-gated; release approval pending | M2 [surveyed] — lodash.set, Sentry and token gates open | M3 [surveyed] — CI/Pages hardening; `ci/required` absent | M4 [surveyed] — extensive roadmap and operational docs | M3 [surveyed] — typed task/evidence practices, sensitive gates human-owned |
| lwip | M3 [surveyed] — v4 prepared; NAN remains in seven source files | M3 [surveyed] — `yarn verify` | M2 [surveyed] — v4.0.0 unpublished; trusted-publisher gate pending | M3 [per roadmap] — dependency-security upgrade remains | M2 [per roadmap] — native operations need N-API work | M3 [per roadmap] — documentation target is still a gap | M3 [surveyed] — SHA and verify recorded; native migration not yet delegable |
| pseudoimage | M3 [surveyed] — v5 prepared; no NAN matches | M3 [surveyed] — `yarn verify:ci` | M2 [surveyed] — v5.0.0 unpublished; publisher gate pending | M3 [per roadmap] — security target remains transitional | M3 [per roadmap] — native operations target defined | M3 [per roadmap] — documentation target | M3 [surveyed] — clean SHA/verify evidence; fleet gate absent |
| pseudolocalize | M3 [surveyed] — v3 prepared | M3 [surveyed] — `yarn verify:ci` | M2 [surveyed] — v3.0.0 unpublished; publisher gate pending | M3 [per roadmap] — dependency-security gap remains | M3 [per roadmap] — operations target remains transitional | M3 [per roadmap] — documentation target remains transitional | M3 [surveyed] — clean SHA/verify evidence; fleet gate absent |
| pwa | M3 [surveyed] — maintained Gradle/Kotlin and asset-service surfaces | M3 [surveyed] — `yarn verify` | M3 [per roadmap] — release target is governed but evidence is thin | M3 [per roadmap] — CodeQL/dependency scope must remain honest | M3 [surveyed] — Gradle/asset-service CI lanes active | M3 [per roadmap] — documentation target | M2 [per roadmap] — delegation target not yet demonstrated |
| slamscan | M2 [surveyed] — Babel/ESM boundary incomplete | M3 [surveyed] — `yarn verify:ci` | M2 [surveyed] — no `release.yml`; June-only tags | M3 [per roadmap] — dependency-security target | M2 [surveyed] — operational release path missing | M3 [per roadmap] — documentation target | M2 [per roadmap] — delegation depends on ESM/release work |
| dotfiles | M4 [per roadmap] — Poetry/package generator contract | M4 [per roadmap] — `make verify` is canonical | M3 [per roadmap] — publish/deploy evidence still being promoted | M3 [per roadmap] — coverage and security policy remain active work | M4 [per roadmap] — generator operations owned | M4 [per roadmap] — reference implementation and guidance | M4 [per roadmap] — staged gates and bounded delegation model |

Thin-evidence notes: non-me security/documentation/operations/delegation
grades rely on §7 roadmap targets rather than per-repo measurement;
pwa's release evidence and dotfiles' current-run evidence are the thinnest
cells and should be raised to [surveyed] at the next quarterly review.

## 6. Principles and rejected-alternatives register

### Operating principles

1. Evidence before confidence: every “green” assertion names a check, commit,
   run, or UI gate.
2. One owner per resource: Serverless owns app stacks; Pulumi governance owns
   GitHub policy; no dual-orchestrator drift.
3. Narrow automation: automate repeatable transitions, not judgement, secrets,
   or destructive imports.
4. Stable interfaces over uniform internals: a repository may keep a distinct
   test tool if its workflow contract and evidence are clear.
5. Human approval is a product feature of personal infrastructure, not an
   embarrassing failure of autonomy.
6. Standard tools only: do not invent a semantic-versioning protocol when
   semantic-release already supports standard `BREAKING CHANGE` footers.

### Rejected, retained, or completed alternatives

| Alternative | Disposition and reason |
| --- | --- |
| Action-SHA pinning | **Rejected.** It conflicts with the user constraint; use current action majors and honest allowlists instead. |
| npm shrinkwrap | **Rejected.** Remove stale publish artefacts; Yarn lockfiles and the package boundary are the selected model. |
| Local npm token | **Retained as accepted risk.** Document scope and rotation; trusted publishing is preferred for CI but does not erase the local release runbook. |
| AppVeyor | **Retired and done** on 2026-09-05; do not recreate a parallel native gate. |
| GitHub Projects scaffolding | **Deferred.** The design is in section 8; the account-level project is not yet Pulumi-managed. |
| Copilot MCP automation | **Impossible in the current integration.** Provide a UI-only runbook, not a pretend API. |
| Homegrown semver | **Forbidden.** Use standard semantic-release-native `BREAKING CHANGE` footers and standard release tools. |
| Third-party decommission wave | **Not adopted.** Retain Coveralls and all existing tools by design because `me` is consumed by other repositories with different toolchains. Rationalize integration boundaries without a purge. |
| Raw GitHub firehose | **Rejected.** Curate highlights and case studies so the site is useful rather than overbearing or dry. |

## 7. Fleet maturity model and scorecards

Maturity is four staged capabilities, not a single percentage. A repository
reaches a level only when its evidence supports the level’s dimensions.

- **M1 — Structured:** source, ownership, commands, and release intent are
  discoverable; failures may still require bespoke intervention.
- **M2 — Reproducible:** dependency/runtime inputs, CI verification, packaging,
  and release evidence can be repeated from a clean checkout.
- **M3 — Governed:** required checks, environment gates, dependency policy,
  security scope, drift ownership, and rollback/retirement decisions are
  explicit.
- **M4 — Delegable:** a bounded agent can execute a named task from an exact
  base SHA under allowed paths and a canonical verify command, producing
  reviewable evidence; a human still controls sensitive gates.

Each scorecard uses seven dimensions: **source/build**, **test/verify**,
**release/provenance**, **security/dependencies**, **infrastructure/operations**,
**documentation/ownership**, and **delegation/evidence**. These are qualitative
 7-tuples, never one percentage.

| Repository | Current target | Seven-dimension scorecard target |
| --- | --- | --- |
| `me` | M4 | source/build M4; verify M4; release M4; security M3→M4; infrastructure M4 with owner split; docs M4; delegation M4 |
| `lwip` | M4 | source/build M4; native verify M4; provenance M4; dependency security M3→M4; native operations M4; docs M3→M4; delegation M4 |
| `pseudoimage` | M4 | source/build M4; three-OS native verify M4; provenance M4; dependency security M3→M4; native operations M4; docs M3; delegation M4 |
| `pwa` | M3 | source/build M3; JVM/JS verify M3; release M3; honest CodeQL/dependency scope M3; infrastructure M3; docs M3; delegation M2→M3 |
| `slamscan` | M3 | Babel/ESM build M3; verify M3; release M3; dependency security M3; operations M2→M3; docs M3; delegation M2→M3 |
| `pseudolocalize` | M4 | source/build M4; verify M4; provenance M4; dependency security M3→M4; operations M3→M4; docs M3→M4; delegation M4 |
| `dotfiles` | M4 for generators | Poetry/package M4; `make verify` M4; publish/deploy evidence M3→M4; dependency security M3; generator operations M4; docs M4; delegation M4 |

The arrows are gaps to close, not a claim that the target has been earned.
Quarterly review records evidence per dimension and may lower a dimension when
scope, ownership, or a check becomes untruthful.

The scorecard is deliberately asymmetric. A repository can have M4 source
reproducibility and only M2 delegation if its commands are clear but its task
boundary is not safe. It can have M3 release governance while remaining M2 in
operations if no one owns an alert after deployment. The review should name
the weakest dimension and the next evidence-producing action, rather than
averaging away a dangerous gap. A target such as `pwa` M3 is therefore a
governance commitment, not a claim that its JVM and JavaScript surfaces are
identical to the native-image repositories.

Maturity also expires when its assumptions expire. A runtime-major upgrade,
new deployment provider, changed GitHub permission, or unreviewed generated
workflow starts a re-evaluation. The repository can retain its level when the
change is covered by the existing contract and evidence; otherwise the
affected dimension returns to the last defensible level until a focused issue
restores it. This is preferable to maintaining a permanent “achieved” badge
that outlives its verification.

## 8. Target operating architecture

### Workflow contract

Every repository exposes the same conceptual stages: **validate** source and
workflow shape; **test** the supported matrix; **analyse** coverage and
security within honest extractor scope; **package** the artefact; **release**
only from a verified immutable commit; **deploy** through an environment and
reviewer; and **observe** the result. Shared implementations may evolve, but
the caller says which stage it is invoking and uploads the evidence. A stable
`ci/required` check is the fleet contract. It is intentionally not a promise
that all repos use one language, test runner, or container.

### Fleet Delivery Project

Create one account-level project spanning all repositories and dotfiles. Its
fields are **Status, Repository, Workstream, Quarter, Priority, Effort, Risk,
Executor, Resolution, Dependency, Verification command, Outcome**. The ten
columns are **Inbox → Triage → Decision needed → Ready → Dispatched → In
progress → Review → Human gate → Done → Cancelled**. WIP begins at two agent
PRs; increase it only after review latency and failure evidence support the
change.

Use five issue forms: modernization, migration, integration, decision-record,
and agent-task. The agent-task form is strict: exact repository, base SHA,
allowed paths, forbidden changes, canonical verify command, required evidence,
expected PR title, and a `Closes` keyword are mandatory. Issue prose is not an
execution channel. No untrusted issue-text execution, no secret-bearing
`pull_request_target`, and no agent-only merge during the pilot. There is one
issue and one PR per repository, even when the project view groups them.

### Portfolio control plane

Split infrastructure into two stacks. The `me` application infrastructure
contains AWS OIDC roles, SSM runtime secrets, and adopted resources. It does
not take ownership of resources that Serverless/CloudFormation already owns.
The portfolio governance stack imports all six GitHub repositories with
deletion protection and retain-on-delete. It manages features and merge
settings, Actions policy, environments and reviewers, branch/tag rulesets,
labels, security configuration, Actions variables, and secret bindings.

The first components are `FleetRepository`, `RepositoryDeliveryPolicy`,
`IntegrationBinding`, and `CredentialLease`. A scheduled refresh may detect
drift and open an issue; it must not auto-apply drift. The Portfolio
Automation GitHub App is created manually first, with a narrow permission
review, before any Pulumi binding. Projects remain intentionally outside
Pulumi.

The split also determines how incidents are handled. An application outage
starts in the `me` service or its Serverless stack, with the normal AWS
runbook and deployment owner. A ruleset mismatch, missing reviewer, or action
allowlist difference starts as a portfolio drift issue. The two records may
link to one another, but neither stack silently repairs the other. This is
important for imports: adoption is not the same as authority, and a successful
`pulumi up` is not proof that a deployed application is healthy.

The governance stack should expose policy as reviewable data. A repository
record names its default branch, required check, environment names, reviewers,
allowed actions, dependency policy, and escalation owner. A binding record
names the integration, its secret class, scope, rotation issue, and whether
the integration is retained by design. A lease record contains metadata and an
expiry, never the underlying credential. This makes quarterly review possible
without copying secrets into state or asking an agent to infer ownership from
an arbitrary issue comment.

### Secret taxonomy

Seven classes keep public identifiers from being falsely labelled secrets and
keep credentials out of the control plane.

1. **Bootstrap/root:** password-manager-only, never repository or CI config.
2. **Federated OIDC:** preferred; use trust relationships rather than a
   stored credential whenever possible.
3. **CI integration credentials:** environment-scoped and least-privileged.
4. **Runtime application secrets:** stage-specific SSM values owned by the
   application boundary.
5. **Human-local and agent-provider keys:** password-manager JIT access, not
   Pulumi state.
6. **Public identifiers:** ordinary configuration, not secrets by label.
7. **Credential metadata:** a catalogue of owner, scope, expiry, and rotation
   issue; it is metadata, not the credential itself.

### Owned publishing architecture

Photos are flagship material. Canonical writing and public photos live on
`randytarampi.ca`, with RSS, Atom, and JSON Feed outputs. The photo pipeline
creates derivatives, records alt text, strips EXIF, protects location, and
publishes stable URLs. A `/now` page and curated project narratives connect
the durable work. Essays and a fleet-changelog are connective tissue, not the
product’s centre of gravity.

The minimum cadence is one photo per month, targeting weekly or every-other-
day publication. GitHub activity is presented as selected highlights with
context, outcomes, and links: a curated proof of work, not a raw firehose.
POSSE adapters are allowed only for platforms with stable publication APIs.
Webmentions come before ActivityPub. The roadmap explicitly rejects comments,
engagement dashboards, social graphs, an Instagram clone, a custom CMS, and a
newsletter. The resume is untouched. The persona is case studies from the
modernization year and other deliberate work, not ambient activity streams.

The presentation rule is “show the consequence, not the counter.” A weekly
highlight might explain that a release gate was made truthful, that a native
image package gained a three-OS matrix, or that a corrupted object no longer
poisons a post cache. It should link to a short narrative and, where useful,
the public repository or run. It should not display a commit tally, a daily
streak, a green-square wall, or every Dependabot branch. A monthly photo can
stand alone; an essay can supply context; a fleet-changelog can connect the
two without making the website read like an internal operations console.

The photo pipeline is a privacy boundary as much as a publishing feature.
Ingestion should preserve an original privately, produce web derivatives,
strip EXIF from public outputs, require meaningful alt text, and avoid exposing
precise location unless the author deliberately chooses it. Stable URLs are
more valuable than a vendor gallery because they let feeds, narratives, and
future adapters point to a durable canonical object. Any publication adapter
must fail closed to the canonical site: an API outage cannot make the source
of truth disappear or force a second editorial workflow.

## 9. Phased roadmap

### Phase 0 — Close the runway

Complete npm UI trusted-publisher linkage, approve the three prepared majors,
unpark and fix `lodash.set` #191, verify Sentry wiring, and publish the
baseline table. Recheck production reviewers in the UI, revoke the local npm
token after linkage, and record the result. This phase is complete only when
the evidence distinguishes “workflow waiting” from “published”.

### Phase 1 — Establish the fleet contract

Adopt Poetry and shell modules in dotfiles with one canonical `make verify`.
Stamp the repository contract and the agent-task form. Write the Actions ADR,
implement the thin workflow substrate, and establish `ci/required`. Group
Dependabot updates and permit auto-merge only for patch/minor development
dependencies after the matrix is green. Runtime, native, major, and Actions
updates remain human-reviewed. Agent PRs do not auto-merge in the pilot.

### Phase 2 — Build the portfolio control plane

Import repositories with deletion protection and retain-on-delete. Add drift
issues, retained integration bindings, environments, reviewers, rulesets,
labels, and Actions policy. Create the Portfolio Automation GitHub App
manually and bind it only after permission review. Keep Dependabot file-
stamped and Copilot MCP UI-only. A refresh opens issues; it never auto-applies.

### Phase 3 — Runtime and product renewal

Run the N-API work across two sessions and four phases: scaffold plus decoder/
encoder; workers and callbacks; image wrapper and lifetime; then Node 26 and
downstream validation. NAN appears 100 times in 22 files; the dominant
patterns are `Callback` (64), `AsyncWorker` (30), and `AsyncQueueWorker` (17).
The target is node-addon-api; vendored codecs stay untouched. The biggest risk
is buffer/object lifetime across asynchronous workers. `pseudoimage` is
downstream-only and has no direct NAN matches.

Replace Materialize with explicit visual, accessibility, and mobile acceptance
criteria. First replace `Tab`/`Tabs`, then `Row`/`Col`/`Container`, and
`Carousel` last. Timebox the `[believed]` two-to-three-week programme and
measure each slice rather than treating the estimate as a promise. Resolve
the React 19 peer incompatibility and remove brittle internals access only
when the replacement is proven.

The replacement is not complete when imports compile. Each slice needs a
before/after inventory of routes and selectors, keyboard navigation checks,
focus visibility and focus order, screen-reader names and selected-state
announcements, touch targets, reduced-motion behaviour, narrow viewport
checks, and a production bundle smoke test. Carousel acceptance must cover
pointer, keyboard, and assistive-technology paths without depending on a
global Materialize initialiser. A temporary compatibility wrapper is allowed
inside a slice, but it must have an owner, a removal issue, and no new callers.

The React shim is a risk marker. Code that reaches `_reactInternals` or
`_reactInternalFiber` can appear to work until a React release changes an
implementation detail. The programme should remove those reads rather than
make the shim more clever. If a candidate library recreates the same
imperative coupling, reject it even if its first migration diff is shorter.
The decision record should explain the accessibility and mobile trade-offs,
not merely list component-library popularity.

In parallel, fix `slamscan`’s Babel/ESM boundary, decide whether `pwa` Gradle
is real and maintained or dead, standardize README and experience surfaces,
and rescope milestones around fleet reliability, runtime renewal, owned
publishing, and delegated delivery.

### Phase 4 — Owned publishing and delegated delivery

Publish canonical writing, photos, feeds, `/now`, and project narratives.
Add POSSE only where an API is stable and observe Webmentions before considering
ActivityPub. Build agent dispatch from phone/iPad as an MVP: select a typed
issue, pin a base SHA, enforce paths and forbidden changes, run the canonical
verify command, and return a PR with evidence. Graduate to production only
after the pilot demonstrates safe prompt handling, no secret-bearing workflow,
bounded WIP, and human review. Turn the modernization year into case studies.

## 10. Named workstreams

### Materialize replacement

The former document’s durable facts are: 41 source files across `jsx`, `www`,
`letter`, and `resume` use `react-materialize`; the primary components are
`Carousel`, `Col`, `Container`, `Row`, `Tab`, and `Tabs`; and `window.M` appears
in `swipeableTabs.jsx`, `ui.js`, and `www/sw/util.js`. `react-materialize`
3.10.0 declares React `^17` peer dependencies and is incompatible with React
19. `reactShim.js` walks `_reactInternals`/`_reactInternalFiber` to support a
`ReactDOM.findDOMNode` polyfill for Materialize and swipeable-tab helpers,
which is brittle and must not become a new platform contract.

The candidates are headless primitives such as Radix or Headless UI, a
maintained component system such as MUI or Chakra, or small custom components.
The selected implementation is still a design decision inside the programme;
the order is not: tabs first because they are coupled to `window.M`, layout
primitives second, carousel last. Risk is **HIGH** because imperative globals,
jQuery-era patterns, and React 19 strict-mode conflicts interact. Acceptance
requires visual parity where intended, keyboard and screen-reader behaviour,
mobile gestures/layout, no internal React-field traversal, and a clean
production build. The old file’s facts are now authoritative here.

### N-API migration

Inventory first, then preserve the codec boundary. Decoder and encoder tests
must pass before worker rewrites. Worker callbacks need explicit ownership and
failure tests; image wrappers need documented lifetime rules; Node 26 and
downstream packages validate last. Never batch a mechanical NAN replacement
with an unreviewed lifetime change.

### Dependency policy

Keep Coveralls and existing integrations by design. Use Dependabot grouping and
matrix evidence. Auto-merge only patch/minor development dependencies after
verification; humans review runtime, native, major, and Actions changes.
Use standard semantic-release and `BREAKING CHANGE` footers. The local npm
token is accepted risk with a written rotation scope until trusted publishing
is fully operational.

“Retain” does not mean “ignore.” Each retained integration gets a named owner,
the repository surfaces it serves, the credential class if any, the failure
signal, and a rotation or retirement review date. Coveralls is a deliberate
example: it remains useful across consumers even if a badge CDN is delayed.
Conversely, a service that is merely present in a historical configuration is
not automatically a survivor. The decision record must distinguish active
use, observable failure, and dead configuration before proposing Pulumi
resources.

### CI standardization

Pilot the stage vocabulary in one repository, publish the `ci/required` check,
then migrate batches. Shared actions must be thin enough to debug from the
calling repository. Preserve honest language/toolchain scope, including the
CodeQL extractor limitation and native OS matrices.

### Third-party rationalization

Do not start a decommission wave. Retain Coveralls and current tools because
consumers have different toolchains. Remove only demonstrably dead services
through a separate decision record. Pulumi survivors only; npm rotation by
runbook; no GCP resources before a real workload; no second owner for app
stacks.

### Dotfiles restructuring

Poetry defines the package boundary, shell modules hold platform operations,
and `make verify` is canonical. Generated AGENTS guidance, issue forms, and
workflow contracts must be drift-checked. The dotfiles generator is M4-for-
generators when a clean checkout can reproduce its output and verify it.

### Owned publishing

Make photos the flagship, essays and fleet-changelog connective tissue, and
`/now` the current human-readable index. Preserve stable URLs, alt text,
derivatives, stripped EXIF, and location protection. Present selected GitHub
milestones as case studies. Do not let an integration dictate the canonical
model.

### Agent execution

Start with typed agent tasks and a two-PR WIP limit. Require exact base SHA,
allowed paths, forbidden changes, verify command, required evidence, expected
title, and `Closes`. Keep all merges human-gated in the pilot. A phone/iPad
dispatcher is useful only if it reports failures honestly and cannot turn
untrusted issue text or injected instructions into privileged execution.

The dispatch result is a small evidence packet: repository and base SHA,
changed paths, diff summary, commands run, exit status, test artefacts, and
known skips. A failed task remains visible in In progress or Review with a
reason; it is not converted into a green outcome because a PR was opened. The
dispatcher may request a follow-up task, but it cannot expand allowed paths or
change the verification command without a new human decision. This makes
delegation useful on a phone while keeping the authority boundary legible on a
desktop.

## 11. Measures and governance

Review quarterly and after any incident. The review publishes the seven
dimension scorecard for every repository, the current workflow-contract
adoption, open drift issues, release waiting time, dependency classification,
verification freshness, and product cadence. “One photo per month” is the
minimum publishing measure; weekly/every-other-day is a target, never a reason
to publish low-value noise.

Issue hygiene means one concern per issue, one repository per PR, an owner,
dependency links, a verification command, and a recorded outcome. Cancelled
work records why. Drift issues name the observed state, desired state, owner,
and human gate. A green badge without a truthful extractor or current run is
not evidence.

Retirement conditions are explicit: retire an integration only when its owner,
replacement or accepted loss, data/export impact, and observation window are
recorded; retire a workflow only after its replacement has passed the required
matrix; retire a secret only after consumers are disproven and the old value
is revoked; retire a product surface only after canonical links and archive
behaviour are tested. The quarterly review can lower maturity or pause
dispatch when these conditions are not met.

Governance should also report negative measures: skipped tests, runs that
waited on a reviewer, drift issues reopened after a false fix, and agent tasks
that exceeded their allowed paths. These are not embarrassing statistics to
hide; they identify where a contract is too broad or a manual gate is doing
real work. A healthy system can show a queue of human gates and still be
delegable. A system that reports only successful merges is not measurable
enough to govern.

## 12. Risks and manual gates

1. **Roadmap staleness:** dated corrections and append-only updates; quarterly
   review is mandatory.
2. **Pulumi import/destruction:** import with deletion protection and
   retain-on-delete; preview and human approval before every adoption.
3. **Control-plane credentials:** narrow GitHub App permissions, password
   manager for bootstrap material, and no secret-bearing fork workflows.
4. **Personal-account GitHub limitations:** design around UI-only reviewer and
   MCP checks; do not infer absence from an incomplete REST response.
5. **`command.local` portability:** keep local commands optional, document
   shell/platform assumptions, and make CI canonical.
6. **Central workflow blast radius:** one pilot, thin callers, rollback per
   batch, and a stable required check rather than a big-bang migration.
7. **Agent prompt injection:** typed forms, pinned SHA, allowed/forbidden paths,
   no issue-text execution, and human review.
8. **False autonomy:** agents may prepare evidence, not approve releases,
   merge their own PRs, rotate secrets, or apply drift during the pilot.
9. **Provider sprawl:** retain by design, rationalize before Pulumi, and reject
   a new provider without an owner and retirement path.
10. **Native migration lifetime correctness:** N-API workers require explicit
    buffer/object lifetime tests and downstream validation; no bulk rewrite.
11. **Materialize scope:** HIGH risk, narrow component order, and visual,
    accessibility, and mobile acceptance before removing the shim.
12. **Product overreach:** photos remain flagship; cadence is bounded; reject
    engagement machinery, custom CMS ambitions, and ambient feeds.

## 13. Traceability appendix

### Wishlist-to-phase matrix

| Mandate | Primary phase | Evidence/owner |
| --- | --- | --- |
| Dotfiles-Poetry | 1 | Delivered 2026-09-22; dotfiles owner; `make verify`, Poetry lock/package evidence, and run 35713182137 |
| GH-Actions standardization | 1, then batches | pilot repository; `ci/required` run history |
| Pulumi-GitHub | 2 | governance stack; import previews and drift issues |
| Pulumi-third-parties | 2–3 | integration inventory and decision records |
| Product two bets | 3–4 | owned publishing acceptance and fleet scorecards |
| Workflow/control plane | 1–2, 4 | Fleet Delivery Project and gated agent-dispatch pilot |

### Evidence links

- [Deepwork progress and execution log](../../.slim/deepwork/progress-me-modernization-20260905.md)
- [Current `me` commit history](https://github.com/randytarampi/me/commits/main/)
- [N-API inventory and migration context](../../.slim/deepwork/progress-me-modernization-20260905.md)
- [Dotfiles repository](https://github.com/randytarampi/dotfiles)
- [All fleet Actions](https://github.com/randytarampi?tab=repositories)

### Superseded mapping

| Former material | New home |
| --- | --- |
| 41 files and component inventory | Section 10, Materialize replacement |
| `window.M` and `reactShim.js` brittleness | Section 10, Materialize replacement |
| React 17 peer incompatibility | Sections 5 and 10 |
| tabs → layout → carousel order | Sections 9 and 10 |
| HIGH risk and two-to-three-week estimate | Sections 5 and 10, marked `[believed]` |

## 14. September 2026 dotfiles reconciliation — dated 2026-09-22

### Dotfiles-Poetry mandate delivered

- **Old claim:** Section 3.1 marked this mandate **COMMIT-NOW**, and Phase 1 required adopting Poetry.
- **Evidence:** [verified] dotfiles delivered the PEP 621 `pyproject.toml`, committed `poetry.lock`, Poetry-authoritative `make test`/`make verify` (with `verify` running the full suite), and production-only coverage measured by subprocess on 2026-09-20/22. CI run [35713182137](https://github.com/randytarampi/dotfiles/actions/runs/35713182137) is all green across macOS and Ubuntu verification, the required Windows deployment, deployment, and Coveralls finish; CodeQL is green.
- **Replacement claim:** [verified] The Dotfiles-Poetry mandate is delivered as of 2026-09-22; retain the evidence as Phase 1 completion evidence.

### Action-SHA-pinning dated correction

- **Old claim:** The Sept. 6 rejected alternative at lines 277–280 treated blanket Action SHA pinning as rejected.
- **Evidence:** [verified] Fleet policy recorded 2026-09-22 requires verified immutable full SHAs for required, security, and deployment workflows; dotfiles’ `ci`, nightly, and CodeQL lanes are the implemented precedent. Moving-reference exceptions must be enumerated and justified. Dotfiles’ write-capable agentic review lanes float by documented design (`dotfiles/docs/AGENTIC-REVIEW.md:80-82`) and remain an enumerated gap, not a settled exception. In `me/`, `shaPinningRequired: false` remains intentional because of the ref-pattern allowlist and 47 tag references (`me/infrastructure/src/github/repository.ts:14-18,25-49`); qlty and Coveralls still use moving majors (`me/.github/workflows/test.yml:343-360`).
- **Replacement claim:** [verified] The former blanket rejection is narrowed: migration is incremental per repository, and no fleet-wide SHA-pinned claim is made until each repository migrates. This register must be consistent before Phase 2 imports Actions policy into Pulumi; otherwise the contradiction becomes infrastructure.

### qlty cross-reference

- **Old claim:** The dotfiles roadmap’s earlier blocker said there was no credential-free way to verify coverage reporting.
- **Evidence:** [verified] `me/` uses `qltysh/qlty-action/coverage@v2` with `oidc: true` and `id-token: write` (`me/.github/workflows/test.yml:351-357`), with `qlty.toml` committed.
- **Replacement claim:** [verified] Delivered 2026-09-22 (evening): dotfiles adopted the pattern — minimal `qlty.toml` plus a supplemental, non-required OIDC coverage upload in its ci.yml, SHA-pinned to the qlty-action v2 commit. Tool lessons verified there: bandit scoping belongs in a `.bandit` ini file (the driver runs `bandit --ini .bandit`; a `qlty.toml` `[[plugin]] exclude_patterns` key is silently ignored — confirmed via `qlty config show`); bandit B101/B404/B603 are false positives in pytest suites (asserts are the assertion mechanism; subprocess imports in tests are intentional mocking) so test paths are excluded; qlty's coverage-diff external gate reports 0.0% against a 30% threshold until a project baseline exists — a first-upload artifact, non-required, tuned qlty-side. Coveralls remains the deliberate reporting path in both repositories.

### Stale fleet facts corrected

- **Old claim:** Lines 193–195 said dotfiles had 39 pytest tests and CI matrix coverage for macOS and Ubuntu; line 99 said Dependabot remained file-stamped from dotfiles.
- **Evidence:** [verified] Dotfiles now has 160-plus tests, a three-OS required deployment matrix with Windows promoted after three consecutive green runs, a nightly real-gate observation lane, and production coverage of approximately 33 per cent against a 25 per cent floor. A grep found no Dependabot stamper script in dotfiles.
- **Replacement claim:** [verified] Replace the test and matrix facts with the current three-OS, nightly, and coverage evidence; mark the line 99 Dependabot-stamper claim [aspirational], not verified.

### Phase 1 status note

- **Old claim:** Phase 1 could be read as complete once the Poetry and `make verify` work landed.
- **Evidence:** [verified] Poetry and `make verify` are complete, but `ci/required` has been named five times in `me/` without being created. The current ruleset protects only deletion and non-fast-forward and has an always-on role bypass. Dotfiles is piloting `ci/required` and staged branch protection as the fleet reference on 2026-09-22.
- **Replacement claim:** [verified] Phase 1 remains incomplete until `ci/required` exists and PR governance lands; dotfiles’ pilot is the current reference implementation.

### Dotfiles maturity/scorecard evidence update

- **Old claim:** Section 7’s dotfiles scorecard left generator operations and deployment evidence below the next maturity grade.
- **Evidence:** [verified] Dotfiles now has a three-OS required matrix, a nightly observation lane with per-gate postconditions, an environment-scenario harness, and a staged-promotion pattern.
- **Replacement claim:** [verified] Generator operations and deployment evidence are M3-to-M4 grade. Delegation and governance remain gated on typed agent-task forms, protected merge flow, and stable required checks; no higher grade is claimed for those dimensions.

### Fleet lessons promoted from the dotfiles session

- **Old claim:** The roadmap did not yet record these as fleet operating rules.
- **Evidence:** [verified] The dotfiles session established staged lane promotion (allow-failure, observed stabilization, then required), with schedule-only jobs explicitly unable to become merge-required checks; the prohibition on concurrent committing subagent lanes on one repository was recorded in `dotfiles/configs/agents/home-agents.md` after three staging-race incidents; subprocess coverage is required for script-heavy repositories; stable aggregate checks precede branch protection; typed agent-task boundaries specify the exact base SHA, allowed paths, forbidden changes, canonical verify command, and evidence packet; and OIDC is the default for eligible third-party reporting.
- **Replacement claim:** [verified] Treat these six practices as fleet lessons for subsequent phases and repository migrations.

### Traceability matrix correction

- **Old claim:** The matrix recorded Dotfiles-Poetry as a Phase 1 mandate without dated delivery evidence and GH-Actions standardization as a future pilot.
- **Evidence:** [verified] Dotfiles-Poetry evidence was delivered 2026-09-22; dotfiles is piloting the `ci/required` aggregate and staged ruleset for GH-Actions standardization.
- **Replacement claim:** [verified] The matrix now records Dotfiles-Poetry as delivered 2026-09-22 in Phase 1; GH-Actions standardization remains Phase 1, then batches, with dotfiles as the pilot repository.

## 15. Dotfiles governance-closure and coverage expansion — dated 2026-09-22 (evening)

### Required-check/PR ruleset is live — the governed-trunk reference implementation

- **Old claim:** Phase 1's `ci/required` mandate had no implemented precedent anywhere in the fleet.
- **Evidence:** [verified] Dotfiles' ruleset id 23837328 is active on `refs/heads/main`: a `pull_request` rule (zero approving reviews, rebase-only merge methods after the live settings were aligned) plus `required_status_checks` for `ci/required` and `security/required`, with RepositoryRole admin as break-glass bypass only. PRs #9, #10, and #11 were merged under it, each with the aggregates green before merge. The emitted check-context names are confirmed as `ci/required` and `security/required` (not matrix-generated names). API mechanics learned: `bypass_actors` and `rules` must be real JSON arrays in the rulesets REST call, and `required_status_checks` entries must omit `integration_id` entirely (explicit `null` returns 422).
- **Replacement claim:** [verified] The governed-trunk reference implementation is operating; Phase 1's `ci/required` mandate now has a proven shape to copy (aggregate job + observed check name + staged ruleset), and me/'s Phase 1 gap is implementation, not design. Post-review additions (2026-09-22 evening): the qlty upload step is now isolated from the required gate (step-level `continue-on-error`, success-gated) after a review found it could fail `ci/required` — "non-required" means operationally optional, not just unstated in docs; the sole admin break-glass use (commit d0d5090, direct push for the reflect-round docs) is recorded in the dotfiles roadmap's decision record; unpinned installers (actionlint download script, get.chezmoi.io) are a dated owner decision — machines deliberately pull the latest tool versions.

### Coverage expansion and shell-test evidence

- **Old claim:** Section 15 (earlier draft, 2026-09-22) recorded the six newly-tested scripts as "(check-env-coverage, check-hashes, check-docs-drift, migrate-env-gates, verify-brewfile-completeness, show-categories)", production coverage as 33.24% → 36%, and the floor as 25 per cent in section 14.
- **Evidence:** [verified] The dotfiles post-review remediation (branch review-remediation, 2026-09-22 evening, commits 69ea692..7329960) corrected the record: the tested scripts are check-hashes, check-env-coverage, check-docs-drift, migrate-env-gates, verify-ci-assets, and verify-brewfile-completeness (scripts/lib/tests/test_coverage_checks.py:16,49,78,98,118,143), plus show-categories gained its own hermetic suite (scripts/lib/tests/test_show_categories.py) in the same pass — seven newly-tested scripts total. Production coverage measured 36.36% after the remediation; the ratchet floor is 27 per cent (dotfiles/pyproject.toml), not 25.
- **Replacement claim:** [verified] Seven newly-tested scripts (check-hashes, check-env-coverage, check-docs-drift, migrate-env-gates, verify-ci-assets, verify-brewfile-completeness, show-categories); production coverage 36.36% against a 27 per cent floor; kcov 43.1 was evaluated and rejected (hangs wrapping the bats suite on macOS arm64), so shell tests are wired as `make test-shell` without shell coverage metrics — test value independent of coverage numbers, shell and Python coverage metrics kept separate.

### oMLX tap takedown-reversal lesson

- **Old claim:** The dotfiles session retired the `jundot/omlx` tap permanently after its upstream repo went 404.
- **Evidence:** [verified] The removal was a mistaken moderation takedown, later reversed upstream (repo restored, pushed 2026-09-22T14:58Z; releases resolve). Dotfiles reverted its retirement through the governed flow (PR #10, required checks green) and recorded the full history in its docs.
- **Replacement claim:** [verified] Fleet rule: verify upstream state live (GitHub API) before irreversible retirement decisions — takedowns can be reversible; keep manifest changes revert-ready; document recovery paths for upstream-controlled dependencies in durable docs.

### README badge layout convention

- **Old claim:** Section 15 (earlier draft) said "Both dotfiles and `me` READMEs now place the badge row between the ASCII text header and the rich-text description, with all badges `?style=flat-square`."
- **Evidence:** [verified] The placement claim is true for both READMEs (dotfiles README.md:1-11; me/README.md:1-23), but the "all badges" wording was not literally true on the me/ side: the qlty Maintainability badge (me/README.md:15) carries no style parameter.
- **Replacement claim:** [verified] Fleet convention for README changes: badges sit under the header, above the description, flat-square styling — with one known exception (me/'s qlty badge is unstyled); add `?style=flat-square` to it at the next README touch.

### Post-review corrections and remaining gaps — dated 2026-09-22 (evening, after the five-seat review)

- **Old claim:** Sections 14-15 recorded the dotfiles productionalization without a review pass.
- **Evidence:** [verified] A five-seat review (oracle + four council seats) of the full session changeset found: (a) the qlty upload could fail the required `ci/required` aggregate despite docs calling it supplemental — remediated with step-level `continue-on-error` and a success-gated upload; (b) the CLI-contract checker only asserted one direction of manifest↔implementation parity — a bidirectional assertion was added and three drifts fixed (configure-aws/configure-docker undeclared `--no-backup`, cleanup-project over-declaration, configure-all.sh missing aws/docker children); (c) check-docs-drift had a fenced-code blind spot that let dead references pass — fixed with a fenced-stripping scan and regression; (d) npm/nvm update scripts reported success on partial failure — exit semantics made truthful and tests updated; (e) JSON root-type guards added to configure-docker.py and verify-config.py; (f) the oMLX tap retirement was reverted after the upstream reversal (PR #10); (g) show-categories gained its own test (the earlier six-script claim named it wrongly); (h) kcov's rejection now has a durable dotfiles record; (i) unpinned installers are a deliberate owner decision (machines pull latest tool versions).
- **Replacement claim:** [verified] The dotfiles review-remediation branch (69ea692..7329960, merged 2026-09-22 evening) closes the review's blocking findings; production coverage is 36.36% against the 27 per cent floor. Remaining fleet-risk items for the me/ session: pin or version the six downstream `agentic-review.yml@main` callers (the mutable write-capable supply-chain surface), record the `secrets: inherit` narrowing (named-secrets passthrough), define Dependabot grouping/ownership policy, and decide the qlty coverage-diff threshold alignment. Dotfiles lessons added to fleet guidance in d0d5090: dispatch-interruption recovery and third-party tool-claim introspection.

## 16. Cross-repo next steps — dated 2026-09-24

> **Status:** council-passed, Oracle-gated plan (Gates 1–2 complete; section
> reviewed before commit). **Scope:** the next modernization pass across
> `me`, `lwip`, `pseudoimage`, `pwa`, `slamscan`, `pseudolocalize`, with
> dotfiles as the governance generator. **Confidence:** as per the document
> **Status:** council-passed, Oracle-gated plan (Gates 1–2 complete; section
> reviewed before commit). **Scope:** the next modernization pass across
> `me`, `lwip`, `pseudoimage`, `pwa`, `slamscan`, `pseudolocalize`, with
> dotfiles as the governance generator. **Confidence:** as per the document
> contract. Evidence base: five OpenCode sessions (the dotfiles
> knowledge-transfer pair and the me/ parity trio), Junie history probes,
> 120-commit history `39c566b7e..9d7d1c1af`, five-repo state survey, and a
> reflect exercise over both; the full evidence ledger lives in the session
> progress record `.slim/deepwork/progress-cross-repo-next-steps-20260924.md`
> (local deepwork state, not committed — it is git-local by design and does
> not travel with clones; durable facts from it are recorded in this
> section).

### 16.1 What this section is

This section converts the September sessions' outcomes into an executable
next-steps contract. It advances §9 Phases 0–1, schedules Phase 3 with
guardrails, and records Phase 2 and Phase 4 as explicit dated deferred
decisions — not silent drops. It supersedes no prior section; it sequences
the remaining mandates.

### 16.2 Operating rules adopted this pass

Eight rules emerged from the sessions' lessons (truthful-proof failures,
hypothesis persistence, migration-state incidents) and were amended through
an Oracle gate and a four-seat council review:

- **Durable fleet guidance** (distribute via `home-agents.md` +
  `me/docs/CONVENTIONS.md`; one rule one home, the other links):
  - **R1 truthful-proof:** proofs are truthful only when tests are actually
    discovered/collected, tooling is invoked not merely installed,
    observations are non-zero and meaningful, and assertions come from
    independent fixtures or protocols — never a value computed by the same
    formula as the implementation; protocol contracts (headers, cursors,
    multi-page renders) are asserted, not just happy-path sentinels.
    [verified — five independent occurrences: circular geometry test,
    0/0/0 jitter on a crashed page, `.jsx` tests uncollected by the Mocha
    `.js` glob, actionlint installed-but-uninvoked, single-seed V5 sentinel]
  - **R2 hypothesis-retirement:** a disproven hypothesis is retired and
    reopened only with new evidence; the disproof is recorded in progress
    state. [verified — DPR repeatedly over-assumed]
  - **R3 compatibility-introspection (amends the d0d5090 third-party
    tool-claim rule):** compatibility claims require loading the installed
    artifact and a fresh-process smoke test; migration rollback must cover
    processes and shared state, not only the binary. [verified — OpenCode
    v2 plugin blocker; stale v2 service poisoning post-rollback observation]
  - **R4 clean-stop gate:** stop and verify fresh processes before
    re-testing lifecycle-dependent work. [verified — feed:v5:dev +
    harness port collisions]
  - **R7 deployment-identity:** verify what is actually deployed (bundle
    age, deployment metadata, redirects) before changing code to fix a
    perceived divergence. [verified — prd was a legacy 2022 bundle]
  - **R8 cloud-safety:** cloud-adjacent test infrastructure keeps
    loopback-only endpoints and throwaway credentials, always.
    [verified — SSM seeding near live AWS]
- **Roadmap-dated (this pass's cadence):** **R5** recurring human-gate
  decision passes at each wave boundary; **R6** staged lane promotion
  (allow-failure → observed stabilization → required) — already recorded in
  §14; referenced, not duplicated.

### 16.3 Track A — the human-gate decision queue (day one, parallel with everything)

Wave A is a decision queue, not a work wave: agents prepare evidence
packets; humans decide. Each gate carries owner, agent-prep spec, UI-only
flags, evidence-of-done, allowed outcomes (approve/defer/reject — never
implied approval), fallback, decision date, and a "not blocked by" list so
execution tracks proceed without serializing behind the user. Outcomes are
recorded append-only.

The two hard edges — **A1a → D1b** and **A2 → B4** — are declared here
once; §16.4 cross-references them and adds no others. Every gate states its
decision date and an explicit "not blocked by" list; the `Blocks` column
names the ONLY downstream items a gate blocks.

| Gate | Question | Owner / agent-prep | Evidence-of-done | Fallback | Decision date | Blocks (nothing else is blocked) |
|---|---|---|---|---|---|---|
| A1a | Complete npm trusted-publisher linkage (npm UI, owner-only) then approve lwip 4.0.0 (run [34022029836](https://github.com/randytarampi/lwip/actions/runs/34022029836)) | User (UI-only action); agent assembles run state + linkage checklist | "Published", not "workflow waiting" (§9 Phase 0 rule) | Release from retained local token (§6 accepted-risk) | On linkage completion | D1b. Not blocked by: B, C, D1a, E, A1b–A8 |
| A1b | Linkage + approve pseudoimage 5.0.0 (run [34021709134](https://github.com/randytarampi/pseudoimage/actions/runs/34021709134)) | User (UI-only); agent preps run state | Published | Retained-token release | On linkage completion | Nothing. Not blocked by: any track |
| A1c | Linkage + approve pseudolocalize 3.0.0 (run [34019936167](https://github.com/randytarampi/pseudolocalize/actions/runs/34019936167)) | User (UI-only); agent preps run state | Published | Retained-token release | On linkage completion | Nothing. Not blocked by: any track |
| A1d | npm token disposition: revoke vs retain-and-rotate (§6/§10 register) | User decision | Register entry + rotation scope updated | Retain with written rotation scope | With A1a–c | Nothing |
| A2 | Round-6 re-test: (1) uniform white-on-black cards incl. text posts; (2) cookies recipe parity with tight padding; (3) `/blog` page-2 scroll; (4) one orange spinner; (5) prior fixes hold → then approve/defer/reject the parity release. Approval scope EXCLUDES `/letter`, `/resume`, `/blog` wide viewports (B5) and V5 deployment state — those are separate follow-ons and cannot broaden this gate | User; agent replays the local battery | Battery exit 0 + user visual confirmation | Defer with recorded evidence; release stays withheld | User-scheduled | B4. Not blocked by: B0–B3, B5, C, D, E |
| A3a | Unpark and fix [`lodash.set` #191](https://github.com/randytarampi/me/issues/191) (HIGH; reaches www graph) | Agent-implementable once unparked | Alert resolved + green matrix | — | Next agent session | Nothing |
| A3b | Verify Sentry wiring (UI where REST omits reviewers/DSN state) | User check; agent preps UI path | Recorded verification | — | Next agent session | Nothing |
| A4 | Dotfiles nightly promotion decision on/after 2026-09-29 (~7 green scheduled runs) | User | Decision record | Keep allow-failure with dated re-check | ≥2026-09-29 | Nothing |
| A5 | Publish the §5 baseline table from the five-repo survey — output: seven-dimension scorecard per repo with evidence links | Agent-draftable | Table appended to §5 evidence | — | Next agent session | Nothing |
| A6 | Per-repo applicability inventories (Python surfaces, plugin-compat surfaces, subprocess-coverage needs, deployment state) | Agent-executable (read-only) | Inventory rows per repo | — | Day one | Feeds C0/C2 only |
| A7 | SHA-pinning register reconciliation (§6 blanket rejection vs §14 per-repo policy) — precondition for Phase 2 imports [verified — roadmap:732] | User | Dated register entry | Keep enumerated-gap status | Before any Phase 2 import | Phase 2 only. Not blocked by: B, C, D, E, A1–A6 |
| A8 | Phase 4 delegated-delivery disposition: execute / defer / remove | User decision (not plan-authored) | Dated decision record | Defer with revisit trigger | With §16.6 answer | Phase 4 only |

**Not authorized (standing):** no agent approves releases, rotates secrets,
publishes majors, merges its own PRs, or generalizes localhost evidence to
production.

### 16.4 Execution tracks (day-one parallelism; two hard edges only)

The only blocking edges are the two declared in §16.3. Everything below is
otherwise unblocked by Track A — agents do not wait on the user to start B,
C-inventory, or D1-inventory work.

**Track B — me/ consolidation (day one):**
- B0 (first): fix the `ci.yml` path-filter asymmetry — `infrastructure/**`
  is in the `push` filter ([ci.yml:24](../.github/workflows/ci.yml)) but
  absent from `pull_request` (lines 26–35) — before any required-check
  enforcement, or infra-only PRs hang forever. [verified]
- B1: adopt `ci/required` in me/ copying the dotfiles reference
  (aggregate job + observed check names + staged ruleset + PR-first flow;
  ruleset 23837328 pattern). Built in the §2-importable shape so Phase 2
  imports adoption, not re-creation.
- B2: map/card encapsulation — bounded, non-blocking refactor in five
  separately-accepted concerns: card-sizing contract module; replace the
  10 ms portal-polling interval with lifecycle callbacks; single tab-sync
  service; typed cursor/query fingerprints; test-oracle repair per R1
  (independent DOM/protocol fixtures). [believed — smell evidence from
  review passes]
- B3: feed hardening — malformed `perPage` returns 400 (not `NaN` into
  Dynamoose: [getPostsV5.js:268-269](../../service/src/serverless/util/getPostsV5.js));
  V5 request assertions in the browser sentinel (ME-API-VERSION header,
  cursor progression, multi-page render without duplicates).
- B4 (after the A2→B4 edge declared in §16.3): V5 rollout decision —
  precondition: staged dev deployment of V5 plus same-SHA verification.
  The volatile deployed-version fact (which hosts serve V4 vs V5 today) is
  inlined nowhere in this document; it belongs in a deployment-state issue
  referenced from B4's execution record.
- B5 (independent follow-on, unblocked by A2): residual parity surfaces
  (`/letter`, `/resume`, `/blog` wide viewports) with the existing harness.
  A2's approval scope explicitly EXCLUDES these surfaces and V5 deployment
  state; B5 does not broaden A2 — it is separate follow-on work.

**Track C — fleet contract (inventories day one; execution after the B1 pilot):**
- C0: pilot selection by evidence (smallest blast radius, fastest CI
  signal, closest migration surface); user escalation only if tied.
- C1: `ci/required` migration, pilot then staged batches
  (pilot → pseudoimage/pseudolocalize → pwa → slamscan → lwip last, behind
  a D1-stabilization non-concurrency gate).
- C1a: slamscan `release.yml` (the only fleet repo without one) + release-
  gate normalization survey.
- C1b: slamscan ESM boundary completion (Babel config/register removal;
  src `.js` decision) — own decision record.
- C2: pwa decision — "maintained and justified" vs retire the
  Gradle/asset-service lane (a real decision, not a maintenance check);
  asset regeneration conditional on me/ need.
- C3: Dependabot grouping/ownership policy + qlty coverage-diff threshold
  alignment (§15 remaining gaps).
- C4: agentic-review supply chain — replace the six `@main` caller
  references with an immutable reviewed reference or enumerated time-bounded
  exceptions; `secrets: inherit` narrowing with verification evidence;
  wording reconciled through A7. [verified — the documented gap at §15;
  the future remediation itself is aspirational until it lands]

**Track D — runtime renewal (long-lead; starts day one where safe):**
- D1a (pre-A1a): N-API inventory refresh, acceptance-test design, non-native
  harness preparation only — no lwip native/production mutation.
- D1b (after the A1a→D1b edge declared in §16.3): decoder/encoder →
  workers/callbacks → wrappers/lifetime → Node 26 + downstream validation,
  per §9's four-phase plan; no bulk rewrite; never batch mechanical NAN
  replacement with an unreviewed lifetime change. [verified — NAN in 7 lwip
  src files]
- D2 (after B2): Materialize replacement — tabs (`window.M`) → layout
  primitives → carousel; accessibility/mobile acceptance per slice; remove
  `_reactInternals` reads; timeboxed, not promised.

**Track E — owned publishing (last; separately gated items):**
- E0: `/now` page + curated highlights ("show the consequence, not the
  counter"); case studies from the modernization year.
- E1: photo pipeline privacy boundary (EXIF strip, alt text, stable URLs).
- Each item carries its own acceptance criteria and human gate before
  publish surfaces go live.

### 16.5 Decisions recorded this pass (deferrals)

- **Phase 2 (Pulumi-GitHub governance):** deferred, dated, gated on A7 plus
  B1 proving the importable ruleset shape. Not silently dropped.
- **C1 pilot selection:** not deferred — C0's evidence-based criteria
  select it; user escalation only if tied.

### 16.6 Open questions for the user

1. npm token disposition after linkage (A1d): revoke vs retain-and-rotate?
2. Phase 4 delegated delivery (A8): execute, defer with a revisit trigger,
   or remove via a new decision?
3. D2 (Materialize): inside this pass, or the next pass's anchor?

### 16.7 Gate outcomes — dated 2026-09-24 (first decision pass)

- **A1a–A1c:** [verified] npm trusted-publisher linkage and the OIDC
  relationship are complete (user, 2026-09-24). The prepared runs
  ([34022029836](https://github.com/randytarampi/lwip/actions/runs/34022029836),
  [34021709134](https://github.com/randytarampi/pseudoimage/actions/runs/34021709134),
  [34019936167](https://github.com/randytarampi/pseudolocalize/actions/runs/34019936167))
  still await the user's approval clicks in the npm/GitHub UIs; live `git
  ls-remote` on 2026-09-24 confirms lwip 4.0.0, pseudoimage 5.0.0, and
  pseudolocalize 3.0.0 are **not yet published** (latest tags v3.0.23,
  v4.0.3, v2.13.22). The retained-token fallback is no longer needed for
  linkage, and the approval click remains a user gate per §9 Phase 0
  semantics.
- **A1d:** [verified] Token retained **and rotated** (user, 2026-09-24);
  the §6 accepted-risk row now carries an updated rotation record instead
  of a pending revocation decision.
- **C2 (pwa):** [verified] Decision: **retain and maintain**
  `packages/asset-service` (user, 2026-09-24). The Gradle lane is
  maintained; asset-regeneration work remains conditional on me/ need.
- **A7:** [verified] Policy: pin to **specific SHAs only when required**;
  prefer pinning to **majors** otherwise (user, 2026-09-24). This is
  consistent with the dotfiles reference implementation, which pins
  verified immutable full SHAs for required/security/deployment workflows
  and lets write-capable agent-review lanes float by documented design —
  the majors-preferred rule generalizes that split to the fleet: majors
  where the lane is not write-capable-critical, SHAs where it is. The
  register reconciliation this closes: the §6 blanket rejection stays
  narrowed (§14), targeted SHA requirements apply to write-capable
  surfaces only, and majors are the default elsewhere. C4's `@main`
  callers remain the mutable write-capable surface and still need the
  immutable-reference or enumerated-exception treatment.
- **A6/A5/C1a/D1a/B0:** dispatched same day (user-selected agent lanes);
  outcomes record below as they land.

- **A6:** [verified] Inventories complete (2026-09-24): none of the five
  companion repositories carries Python surfaces, so Poetry-style package
  boundaries remain a dotfiles-only concern. Artifact-introspection priority
  sits with `pwa` and `slamscan` (serverless/gulp/babel loader surfaces);
  `lwip`'s compatibility surface is its native addon build. Child-process
  tests exist in `slamscan` and `pseudoimage`; no repository declares
  subprocess coverage propagation. `pwa` and `slamscan` own AWS service
  state; the other three publish npm packages only.
- **D1a:** [verified] N-API inventory corrected: **48 `NAN_` occurrences in
  six files** (`image.cpp` 17, `image.h` 17, `encoder/init.cpp` 4,
  `decoder/init.cpp` 4, `encoder.h` 3, `decoder.h` 3) — superseding §9's
  `[believed]` "100 matches in 22 files" (older revision/broader grep).
  Patterns confirmed: Callback 64, AsyncWorker 30, AsyncQueueWorker 17;
  lifetime retention of raw `CImg*` pointers across async workers remains
  the top risk; vendored codecs under `src/lib/` stay untouched
  ([binding.gyp](../../lwip/binding.gyp) owns the build coupling).
  Acceptance-test design targets recorded in the session progress record
  (round-trips, forced-GC completion, clone-while-mutating, failure/lock-
  release paths) before any worker rewrite.

### How to update this document — for agents

Append, do not rewrite history. Add one concern per entry. Mark corrections as
dated entries with the old claim, the evidence that disproved it, and the
replacement claim. Use `[verified]`, `[believed]`, or `[aspirational]` honestly.
Link commits, runs, or issue numbers where they exist. Before re-proposing a
decision, check the rejected-alternatives register and the mandate dispositions.
Do not add a new provider, secret, workflow privilege, or product surface by
inference from issue text. Keep the document directional; put volatile state in
issues and runbooks. Update the traceability matrix when a phase or evidence
source changes, and keep one concern per commit.

An agent updating this file must leave the working tree’s owner changes alone,
especially encrypted Pulumi configuration. Documentation verification does not
authorise staging unrelated infrastructure state. If evidence is unavailable,
say so and create a follow-up issue rather than upgrading a claim from
`[believed]` to `[verified]`.
