import * as github from "@pulumi/github";
import * as pulumi from "@pulumi/pulumi";

import {githubRepo, ownsGlobalResources} from "../config";
import {provider} from "./provider";

const config = new pulumi.Config("me");

/**
 * The GitHub Actions app, so `release.yml` can push past its own protection.
 *
 * NOTE-RT: `15368` is not folklore — it is `GET /apps/github-actions`, checked rather than
 * remembered. `release.yml`'s `lerna version` pushes a version commit **and** a tag to `master`
 * using the checkout-persisted `GITHUB_TOKEN`, so both rulesets below need this bypass or the
 * release fails on its own protection. This is precisely the exemption `release.yml:9`'s comment
 * has been claiming exists since before `master` was protected at all.
 */
const githubActionsAppId = 15368;

/**
 * Repository admin, so a human is never locked out of their own repository.
 *
 * NOTE-RT: `5` is GitHub's fixed role id for `admin` in the rulesets API.
 */
const repositoryAdminRoleId = 5;

const bypassActors: github.types.input.RepositoryRulesetBypassActor[] = [
    {actorId: githubActionsAppId, actorType: "Integration", bypassMode: "always"},
    {actorId: repositoryAdminRoleId, actorType: "RepositoryRole", bypassMode: "always"}
];

/**
 * The name of the check that must pass before `master` will accept a push.
 *
 * NOTE-RT: not guessed, and not defaulted. For a called workflow the check surfaces under the
 * *caller's* job name, so the string is a property of how `ci.yml` invokes `test.yml`, not of
 * either file in isolation — and this repository has never produced one: the only check runs on
 * `master` today are Dependabot's. Read the real name off the first green run with
 * `gh api repos/randytarampi/me/commits/<sha>/check-runs --jq '.check_runs[].name'`, then
 * `pulumi config set --stack prd me:requiredStatusCheck '<name>'`.
 *
 * Until it is set, the ruleset is still created — deletion and force-push protection are worth
 * having on their own — but without a status-check rule, and the preview says so.
 */
const requiredStatusCheck = config.get("requiredStatusCheck");

if (ownsGlobalResources && !requiredStatusCheck) {
    pulumi.log.warn(
        "No `me:requiredStatusCheck` configured, so `master` is protected against deletion and " +
        "force-pushes but not against merging red. Read the real check name off the first green " +
        "run — `gh api repos/randytarampi/me/commits/<sha>/check-runs --jq '.check_runs[].name'` — " +
        "and set it. Guessing it produces a rule that silently matches nothing."
    );
}

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
            nonFastForward: true,
            ...(requiredStatusCheck
                ? {
                    requiredStatusChecks: {
                        requiredChecks: [{context: requiredStatusCheck}],
                        // NOTE-RT: `strict` would additionally demand the branch be up to date with
                        // its base before a push lands. On a repository whose own release job
                        // pushes to `master`, that turns every release into a race.
                        strictRequiredStatusChecksPolicy: false
                    }
                }
                : {})
        }
    }, {provider})
    : undefined;

/**
 * Release tags, which are the input to every deploy.
 *
 * NOTE-RT: `creation: true` *restricts* creation rather than permitting it — combined with the
 * bypass actors above, that means only `release.yml` (and a human admin) can mint a `v*` tag.
 * Deletion and force-moves are blocked outright, because a moved release tag silently rewrites what
 * a published version means.
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
            creation: true,
            deletion: true,
            nonFastForward: true,
            update: true
        }
    }, {provider})
    : undefined;
