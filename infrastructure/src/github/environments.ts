import * as github from "@pulumi/github";

import {defaultBranch, devDeploymentBranches, githubRepo, ownsGlobalResources} from "../config";
import {provider} from "./provider";

/**
 * `randytarampi`, by numeric id — `gh api users/randytarampi --jq .id`.
 *
 * NOTE-RT: the provider takes ids, not logins. The id is stable across a rename; the login is not.
 */
const reviewerUserId = 592216;

/**
 * The deployment environments, with the protection rules they have never had.
 *
 * There were four — `dev`, `prd`, `production` and `github-pages` — all with zero protection rules
 * and no environment-scoped secrets or variables. Two of them are now declared here:
 *
 * - `production` is referenced by nothing since `release.yml` was renamed to use `prd`. Pulumi will
 *   not delete what it never created, so removing it is a one-off documented in `README.md`.
 * - `github-pages` is created and owned by GitHub Pages itself; declaring it would mean fighting
 *   the service for it.
 *
 * NOTE-RT: these names are load-bearing beyond deployment gating. `deploy.service.yml`'s job sets
 * `environment: ${{ inputs.deployment_environment }}`, which is what puts
 * `repo:randytarampi/me:environment:<stage>` in its OIDC `sub` claim — so the AWS trust policy in
 * `src/aws/oidc.ts` is pinned to exactly these strings. Renaming an environment silently revokes a
 * deploy role.
 */
const environment = (name: string) => new github.RepositoryEnvironment(name, {
    repository: githubRepo,
    environment: name,
    // NOTE-RT: `prd` requires an approval, permanently. This was decided rather than discovered, and
    // the cost is worth stating plainly: `release.yml:26` and `deploy.service.yml:41` *both* declare
    // `environment: prd`, so every release waits for a human twice — once before `release` versions
    // and publishes, then again before `deploy-pages`, `deploy-pages--jsonresume-theme` and
    // `deploy-service` (which wait together, as one round). A release therefore never completes
    // unattended. That is the point.
    //
    // `dev` gets none: it is the rehearsal, and a rehearsal nobody can run is not one.
    ...(name === "prd" ? {reviewers: [{users: [reviewerUserId]}]} : {}),
    canAdminsBypass: true,
    deploymentBranchPolicy: {
        protectedBranches: false,
        customBranchPolicies: true
    }
}, {provider});

const branchPolicy = (
    resourceName: string,
    environmentResource: github.RepositoryEnvironment,
    branchPattern: string
) =>
    new github.RepositoryEnvironmentDeploymentPolicy(resourceName, {
        repository: githubRepo,
        environment: environmentResource.environment,
        // NOTE-RT: `master` only, save for the declared `dev` exceptions below. Nothing else should
        // ever be able to deploy — the whole reason this plan exists is that a push to *any* branch
        // used to publish production Pages.
        branchPattern
    }, {provider});

/**
 * NOTE-RT: one policy resource per pattern, because the API models them that way — a
 * `RepositoryEnvironmentDeploymentPolicy` carries a single `branchPattern`. The resource name has to
 * encode the pattern rather than just the environment, or adding an exception would look to Pulumi
 * like an *update* of the `master` policy and quietly replace it.
 */
const policyResourceName = (environmentName: string, branchPattern: string) =>
    `${environmentName}-${branchPattern.replace(/[^a-zA-Z0-9-]/g, "-")}`;

export const environments = ownsGlobalResources
    ? ["dev", "prd"].map(name => {
        const environmentResource = environment(name);

        branchPolicy(name, environmentResource, defaultBranch);

        if (name === "dev") {
            devDeploymentBranches.forEach(branchPattern => branchPolicy(
                policyResourceName(name, branchPattern),
                environmentResource,
                branchPattern
            ));
        }

        return environmentResource;
    })
    : [];
