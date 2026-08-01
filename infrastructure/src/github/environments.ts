import * as github from "@pulumi/github";

import {defaultBranch, githubRepo, ownsGlobalResources} from "../config";
import {provider} from "./provider";

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
    // NOTE-RT: no `reviewers`. A required reviewer on `prd` would be the natural hardening, and it
    // is a real choice rather than an oversight: it pauses the release chain — `release.yml` calls
    // the deploys directly with `needs: release`, so an approval gate stops a release mid-flight
    // until a human acts. That is arguably right for a portfolio and a nuisance for automation.
    // Decide it deliberately; do not discover it during a release.
    canAdminsBypass: true,
    deploymentBranchPolicy: {
        protectedBranches: false,
        customBranchPolicies: true
    }
}, {provider});

const branchPolicy = (name: string, environmentResource: github.RepositoryEnvironment) =>
    new github.RepositoryEnvironmentDeploymentPolicy(name, {
        repository: githubRepo,
        environment: environmentResource.environment,
        // NOTE-RT: `master` only. Nothing else should ever be able to deploy — the whole reason
        // this plan exists is that a push to *any* branch used to publish production Pages.
        branchPattern: defaultBranch
    }, {provider});

export const environments = ownsGlobalResources
    ? ["dev", "prd"].map(name => {
        const environmentResource = environment(name);

        branchPolicy(name, environmentResource);

        return environmentResource;
    })
    : [];
