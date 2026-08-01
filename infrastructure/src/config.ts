import * as pulumi from "@pulumi/pulumi";

/**
 * The GitHub repository every trust relationship in this program is anchored to.
 *
 * NOTE-RT: deliberately constants rather than stack config. A stack that pointed at a different
 * repository would not be a different environment, it would be a different program — and making
 * the owner/repo configurable is exactly how an OIDC trust policy ends up with a wildcard in it.
 */
export const githubOwner = "randytarampi";
export const githubRepo = "me";
export const githubRepositoryFullName = `${githubOwner}/${githubRepo}` as const;

/** The branch `release.yml` versions, publishes and deploys from. */
export const defaultBranch = "master";

const config = new pulumi.Config("me");

/**
 * `dev` or `prd` — the same two names `service/env.yml`, `deploy.service.yml` and
 * `deploy.pages.yml` already use. Reusing them is what lets the OIDC `sub` condition below be
 * written against a GitHub environment that actually exists.
 */
export const stage = config.require("stage");

/**
 * The region this stack's stage-scoped resources live in — `us-east-1` for `dev`, `ca-central-1`
 * for `prd`, matching where `service`'s `deploy:dev`/`deploy:prd` scripts actually deploy.
 *
 * NOTE-RT: read straight off `aws:region` rather than through `aws.getRegion()`. It is the same
 * value, but as a plain string rather than an `Output`, so it can be interpolated into IAM policy
 * documents and SSM paths without dragging every one of them through an `apply`.
 */
export const region = new pulumi.Config("aws").require("region");

/**
 * Whether this stack owns the resources that exist once per *account* or once per *repository*
 * rather than once per stage — the IAM OIDC provider, the `master` ruleset, the environments, the
 * Actions secret inventory, the Pages settings and the npm trusted publishers.
 *
 * NOTE-RT: IAM and GitHub have no notion of a stage. Two stacks both declaring the same OIDC
 * provider or the same `master` ruleset would collide on the second `pulumi up` and leave that
 * stack permanently stuck, so exactly one stack is nominated as the owner and the other references
 * what it created. `prd` is the owner because it is the stack that must be right.
 */
export const ownsGlobalResources = config.getBoolean("ownsGlobalResources") ?? false;

/**
 * The `sub` claim a GitHub Actions job presents when it declares `environment: <environment>`.
 *
 * NOTE-RT: `randytarampi/me` was created 2018-07-17, so it predates immutable subject claims —
 * GitHub scopes the `repo:owner@<id>/repo@<id>:…` form to repositories created after 2026-07-15 or
 * explicitly opted in. If this repository ever opts in, every trust policy below has to move to
 * the immutable form in the same commit, or every deploy loses its credentials at once.
 *
 * @see https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws
 */
export const environmentSubject = (environment: string) =>
    `repo:${githubRepositoryFullName}:environment:${environment}`;

/** The OIDC issuer and audience GitHub Actions presents to AWS STS. */
export const githubOidcIssuer = "token.actions.githubusercontent.com";
export const githubOidcAudience = "sts.amazonaws.com";

/** Tags applied to everything this program creates, so the console says where it came from. */
export const tags = {
    ManagedBy: "pulumi",
    Project: "me",
    Stage: stage
};
