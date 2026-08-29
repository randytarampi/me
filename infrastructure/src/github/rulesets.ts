import * as github from "@pulumi/github";

import {githubRepo, ownsGlobalResources} from "../config";
import {provider} from "./provider";

/**
 * Repository admin, so a human is never locked out of their own repository.
 *
 * NOTE-RT: `5` is GitHub's fixed role id for `admin` in the rulesets API.
 */
const repositoryAdminRoleId = 5;

/**
 * NOTE-RT: there used to be a second entry here — `{actorId: 15368, actorType: "Integration",
 * bypassMode: "always"}` for the `github-actions` app (`15368` from `GET /apps/github-actions`),
 * so `release.yml`'s `lerna version` could push its version-bump commit and tag past these two
 * rulesets using the checkout-persisted `GITHUB_TOKEN`. It does not work: `randytarampi/me` is a
 * personal, user-owned repository, and GitHub's ruleset API rejects an `Integration` bypass actor
 * unless that app is installed on the ruleset's own repository or an owning organization — found
 * as `POST .../rulesets: 422 … Actor GitHub Actions integration must be part of the ruleset
 * source or owner organization` on the first `pulumi up --stack prd`, for both rulesets below,
 * since they share this array. Personal accounts have no owning organization, and the built-in
 * Actions bot is not a discoverable app installation on this repository either.
 *
 * Rather than reintroduce a long-lived credential to push as a real `User` bypass actor instead,
 * the two rules that actually needed a bypass were removed below: tag *creation* is no longer
 * restricted, and `master`'s required-status-check rule is gone. Both changes are explained where
 * they used to be.
 */
const bypassActors: github.types.input.RepositoryRulesetBypassActor[] = [
    {actorId: repositoryAdminRoleId, actorType: "RepositoryRole", bypassMode: "always"}
];

/**
 * NOTE-RT: `master` used to also require a named status check here, read from `me:requiredStatusCheck`
 * and applied as `requiredStatusChecks` below. Removed: GitHub evaluates a ruleset's required-status-
 * check rule against *every* push to the ref, not only pull-request merges, so it rejected
 * `release.yml`'s own `lerna version` commit — a brand-new commit that was never itself run through
 * CI — with no bypass actor available to get it past that one rule on this personal-owned repository
 * (see the note above `bypassActors`). CI still fully gates every pull request before it reaches
 * `master`; this only stopped re-enforcing that a second time on the ref itself, which is the one
 * enforcement point a personal account cannot bypass around. `me:requiredStatusCheck` is unused now.
 */

/**
 * `master` protection, which `release.yml:9` has claimed as a prerequisite while the branch had
 * none at all (`GET /branches/master/protection` returned 404).
 *
 * NOTE-RT: a ruleset rather than legacy branch protection, because rulesets have first-class
 * `bypass_actors`. `lerna version` pushes a commit *and* a tag, so a branch rule alone would not
 * have been enough even if legacy protection could express the exemption.
 */
export const masterRuleset = ownsGlobalResources
    ? new github.RepositoryRuleset("master", {
        name: "master",
        repository: githubRepo,
        target: "branch",
        enforcement: "active",
        conditions: {
            refName: {
                includes: ["~DEFAULT_BRANCH"],
                excludes: []
            }
        },
        bypassActors,
        rules: {
            deletion: true,
            nonFastForward: true
        }
    }, {provider})
    : undefined;

/**
 * Release tags, which are the input to every deploy.
 *
 * NOTE-RT: creation is deliberately *not* restricted, unlike the design this replaced. `creation:
 * true` would have restricted minting a `v*` tag to bypass actors only — which is exactly what broke
 * on this personal-owned repository (see the note above `bypassActors`): no `Integration` bypass
 * actor is usable here, so `release.yml`'s `lerna publish` tag push would have been rejected with
 * no way past it. Once a `v*` tag exists, though, it is immutable: deletion and force-moves are
 * still blocked outright, because a moved or deleted release tag silently rewrites what a published
 * version means, and neither of those needs a bypass actor for the normal release flow.
 */
export const releaseTagRuleset = ownsGlobalResources
    ? new github.RepositoryRuleset("release-tags", {
        name: "release-tags",
        repository: githubRepo,
        target: "tag",
        enforcement: "active",
        conditions: {
            refName: {
                includes: ["refs/tags/v*"],
                excludes: []
            }
        },
        bypassActors,
        rules: {
            deletion: true,
            nonFastForward: true,
            update: true
        }
    }, {provider})
    : undefined;
