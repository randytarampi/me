import * as command from "@pulumi/command";
import * as github from "@pulumi/github";
import * as pulumi from "@pulumi/pulumi";

import {githubRepo, githubRepositoryFullName, ownsGlobalResources} from "../config";
import {provider} from "./provider";

const config = new pulumi.Config("me");

/**
 * Actions secrets that still have a job to do.
 *
 * NOTE-RT: this list is deliberately short, and getting it short is most of the point of Step 8.
 * `SERVERLESS_ACCESS_KEY` is not here — the licence key moved to SSM. `NPM_TOKEN` is not here and
 * never was — npm trusted publishing replaces it, and `lerna publish` performs the OIDC exchange
 * itself. `AWS_ACCESS_KEY_ID`/`AWS_SECRET_ACCESS_KEY` are not here — the deploy assumes a role.
 */
const liveSecretNames = [
    // NOTE-RT: still a never-expiring classic PAT with write access to three repositories, and the
    // only credential here that OIDC cannot replace: the Pages deploy pushes to
    // `randytarampi/randytarampi.github.io` and `randytarampi/me.resume`, and GitHub's OIDC subject
    // is bound to the *calling* repository. A GitHub App installation token replaces it; creating
    // the App is one of the two irreducibly manual steps in `README.md`.
    "GH_PAGES_DEPLOYMENT_TOKEN",
    "COVERALLS_REPO_TOKEN"
];

/**
 * Secrets that exist, are referenced by nothing, and should stop existing.
 *
 * - `CC_TEST_REPORTER_ID` — Code Climate Quality became Qlty in 2024; the reporter binary 404s.
 * - `CODECOV_TOKEN`, `CODACY_PROJECT_TOKEN` — both services were dropped when coverage was
 *   consolidated onto Coveralls.
 * - `CHECK_RUN_REPORTER_TOKEN`, `REPORT_CI_TOKEN` — referenced by no workflow, at all, ever.
 *
 * All five were last set on 2022-04-23.
 */
const retiredSecretNames = [
    "CC_TEST_REPORTER_ID",
    "CODECOV_TOKEN",
    "CODACY_PROJECT_TOKEN",
    "CHECK_RUN_REPORTER_TOKEN",
    "REPORT_CI_TOKEN"
];

/**
 * The 2022-vintage AWS keys, retired *only* on explicit opt-in.
 *
 * NOTE-RT: this gate encodes an ordering that is genuinely load-bearing rather than fussy. Deleting
 * these before an assumed-role deploy has been observed working is unrecoverable without console
 * access — there is no other credential left to create the replacement with. Prove it first:
 *
 *   1. `pulumi up` the roles.
 *   2. Switch `deploy.service.yml` to `role-to-assume` and run it by hand.
 *   3. Confirm `aws sts get-caller-identity` reports `…assumed-role/me-deploy-service-prd/…`.
 *   4. Only then: `pulumi config set --stack prd me:retireAwsAccessKeys true`.
 */
const retireAwsAccessKeys = config.getBoolean("retireAwsAccessKeys") ?? false;

const secretsToDelete = [
    ...retiredSecretNames,
    ...(retireAwsAccessKeys ? ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"] : [])
];

/**
 * Declares a secret whose value lives encrypted in `Pulumi.<stack>.yaml`.
 *
 * NOTE-RT: skipped rather than defaulted when unset, for the same reason as the SSM parameters —
 * an empty secret is worse than an absent one, because the workflow that reads it fails somewhere
 * far away from the cause.
 */
const actionsSecret = (name: string) => {
    const value = config.getSecret(`githubSecret.${name}`);

    if (!value) {
        pulumi.log.warn(
            `No value configured for GitHub Actions secret '${name}'. It is not being managed by ` +
            `this stack. Set it with \`pulumi config set --secret me:githubSecret.${name} '…'\`.`
        );

        return undefined;
    }

    return new github.ActionsSecret(name, {
        repository: githubRepo,
        secretName: name,
        plaintextValue: value
    }, {provider});
};

export const actionsSecrets = ownsGlobalResources
    ? liveSecretNames.map(actionsSecret).filter(secret => secret !== undefined)
    : [];

/**
 * Removes the secrets that should not exist.
 *
 * NOTE-RT: a command rather than a resource, because Pulumi will not delete what it never created —
 * the alternative was `pulumi import` followed by removal from the program, which is two `up`s and
 * a window where the program claims to own a credential it is about to throw away. `|| true` keeps
 * it idempotent: deleting an already-deleted secret is a success, not a failure.
 *
 * `triggers` is the whole list, so adding a name re-runs the deletion rather than silently doing
 * nothing because the command has "already run".
 */
export const retiredSecrets = ownsGlobalResources
    ? new command.local.Command("retired-secrets", {
        create: secretsToDelete
            .map(name => `gh secret delete ${name} --repo ${githubRepositoryFullName} || true`)
            .join("\n"),
        update: secretsToDelete
            .map(name => `gh secret delete ${name} --repo ${githubRepositoryFullName} || true`)
            .join("\n"),
        triggers: secretsToDelete
    })
    : undefined;

export const retiredSecretsList = secretsToDelete;
