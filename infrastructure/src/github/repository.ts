import * as command from "@pulumi/command";
import * as github from "@pulumi/github";

import {githubRepo, githubRepositoryFullName, ownsGlobalResources} from "../config";
import {provider} from "./provider";

/**
 * Which actions this repository is allowed to run.
 *
 * The posture today is the most permissive available: `allowed_actions: all`,
 * `sha_pinning_required: false`. `selected` plus an explicit allowlist is the smallest change that
 * actually narrows the blast radius of a compromised third-party action.
 *
 * NOTE-RT: `shaPinningRequired` is deliberately left `false`. Turning it on would reject every
 * `@v7`-style reference in `.github/workflows/`, i.e. all of them — that is a real hardening step
 * but it is a change to every workflow file, not a repository setting, and doing it here would
 * break CI the moment it applied.
 *
 * NOTE-RT: default workflow permissions are also deliberately untouched, and this one is worth
 * being explicit about because `write` is genuinely too broad. It is what lets `release.yml`'s
 * `lerna version` push to `master` and `deploy.pages.reusable.yml` write deployment statuses.
 * Narrowing it to `read` requires every workflow to declare its own `permissions:` block first;
 * doing it in the same change would break the release with no way to tell which half was at fault.
 */
export const actionsPermissions = ownsGlobalResources
    ? new github.ActionsRepositoryPermissions("actions", {
        repository: githubRepo,
        enabled: true,
        allowedActions: "selected",
        allowedActionsConfig: {
            githubOwnedAllowed: true,
            verifiedAllowed: true,
            // NOTE-RT: exactly the third-party actions `.github/workflows/` reaches for, and
            // nothing else.
            patternsAlloweds: [
                "JamesIves/github-pages-deploy-action@*",
                "aws-actions/configure-aws-credentials@*",
                "coverallsapp/github-action@*",
                "pulumi/actions@*"
            ]
        }
    }, {provider})
    : undefined;

/**
 * GitHub Pages, and the one setting the provider cannot express.
 *
 * `GET /repos/randytarampi/me/pages` reports `https_enforced: false` — the API literally answers
 * with `html_url: "http://www.randytarampi.ca/"`. The provider's `pages` block covers `build_type`,
 * `cname` and `source`, but not `https_enforced`, and it only exists on the `github.Repository`
 * resource — which would mean importing the repository itself and handing Pulumi the ability to
 * delete it. `PUT /repos/{owner}/{repo}/pages` does accept the field, so this is one clearly-labelled
 * shim rather than an undocumented manual setting or a very large risk.
 *
 * NOTE-RT: `build_type` stays `legacy`. Moving to the workflow-based build is entangled with
 * replacing `GH_PAGES_DEPLOYMENT_TOKEN` (see `README.md`) — `deploy.pages.reusable.yml` publishes by
 * pushing a branch, which is exactly what `legacy` consumes. Treat those as one change, not two.
 */
export const pagesHttpsEnforced = ownsGlobalResources
    ? new command.local.Command("pages-https-enforced", {
        create: `gh api --method PUT repos/${githubRepositoryFullName}/pages -F https_enforced=true`,
        update: `gh api --method PUT repos/${githubRepositoryFullName}/pages -F https_enforced=true`,
        // NOTE-RT: no `delete`. Unsetting `https_enforced` on teardown would serve the site over
        // plain HTTP, which is not a state worth being able to reach by accident.
        triggers: [githubRepositoryFullName, "https_enforced=true"]
    })
    : undefined;
