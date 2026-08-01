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
