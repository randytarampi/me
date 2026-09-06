---
name: code-review
description: "Review a changeset using the shared review method. Use during agentic code review. Triggers on \"review\", \"code review\", \"PR review\", \"agentic review\"."
---

# Code review

<!-- PORTABILITY COPY of configs/review/code-review-prompt.md (canonical).
     Kept in lockstep with configs/skills/randy-review/SKILL.md. If the method
     changes there, change it here in the same commit. -->

Execute the shared review method below — do not substitute your own rubric.

## Locate the method

Prefer, in order:

1. A trusted checkout at `__TRUSTED_DOTFILES__/configs/review/code-review-prompt.md`
   (present in CI runs of the agentic-review workflow).
2. `configs/review/code-review-prompt.md` in the current repository.
3. The inlined method below (use this whenever neither file exists; you do not
   need to announce the substitution).

## Context rules

- Review **the repository you are invoked in** — its patterns, customs, and
  conventions, not another repository's. Read its documented guidance
  (CONTRIBUTING, AGENTS.md, CLAUDE.md, REVIEW.md), use its standard
  verification command, and measure the changeset against those.
- Never carry conventions in from the repository that distributes this skill.
  If you cannot find a convention in the invoked-in repository, do not
  assume one; ask or note the uncertainty explicitly.

## Inlined method (fallback)

Review the changeset for correctness, security vulnerabilities, regressions,
maintainability, and adherence to the repository's conventions.

1. **Direction first.** Before line-level findings, state whether the changeset
   is pulling in the right direction — architecturally and for the product. A
   correct implementation of the wrong approach is a blocking finding; re-steer
   early instead of polishing a doomed direction.
2. **Root cause, not symptoms.** Identify underlying causes. When a bug pattern
   appears, sweep the codebase for similar instances — including non-obvious
   surfaces (shared configs, framework defaults, generated code, sibling
   services) that a single-syntax grep would miss. The review is not done until
   the sweep is.
3. **Check conventions before judging.** Read the repository's documented
   guidance and measure the changeset against it. Do not relitigate established
   conventions; cite them when an author or another reviewer drifts. Convention
   is the arbiter of review disputes.
4. **Extract themes.** Name recurring patterns: what should be adjusted, and
   what should be celebrated.

Findings: run the repository's standard verification command before attributing
a failure to CI or tests; cite file and line for every finding; distinguish
blocking issues from suggestions with impact and a practical correction; no
speculative style preferences; prioritize production breakage, security,
regressions, broken contracts, and unsafe-for-future-changes code; calibrate
trust (flag "fix" commits doing the real engineering, review-driven commits
hiding substantive changes, copied-but-not-understood code, tests that pass
without exercising claimed behavior).

Communication: keep comments economical (if the code can say it, don't; if a
cognitive jump is unavoidable, prefer refactoring); be precise about reuse vs.
reimplementation and about affected scope; in English prose use Canadian
English spelling and Canadian Press style for formal reports (casual exchanges
keep the conversation's register); end with owner-assigned,
forward-looking actions (author before merge, reviewers before approval,
future changesets).
