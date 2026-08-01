import * as command from "@pulumi/command";
import * as pulumi from "@pulumi/pulumi";

import {githubRepositoryFullName, ownsGlobalResources} from "../config";

const config = new pulumi.Config("me");

/**
 * Every workspace that is actually published, i.e. every one without `"private": true`.
 *
 * NOTE-RT: all 13 already exist on the registry at `7.0.0`, published 2020-10-19. That matters:
 * npm cannot publish the *first* version of a package via OIDC, so a package that had never been
 * published would need a token exactly once — and none of these do.
 */
export const publishableWorkspaces = [
    "@randy.tarampi/assets",
    "@randy.tarampi/browser-logger",
    "@randy.tarampi/css",
    "@randy.tarampi/js",
    "@randy.tarampi/jsx",
    "@randy.tarampi/lambda-logger",
    "@randy.tarampi/letter",
    "@randy.tarampi/printables",
    "@randy.tarampi/redux-metrics",
    "@randy.tarampi/resume",
    "@randy.tarampi/serverless",
    "@randy.tarampi/views",
    "jsonresume-theme-randytarampi"
];

/** The workflow that publishes, and the environment its `release` job declares. */
const releaseWorkflowFile = "release.yml";
const releaseEnvironment = "prd";

/**
 * Dry run by default, and this is deliberate rather than timid.
 *
 * NOTE-RT: the registry permits exactly **one** trusted-publisher configuration per package. A
 * wrong `--file` or `--environment` is not something you overwrite — it has to be found with
 * `npm trust list` and revoked by id, one package at a time, 13 times. Reading a dry run first
 * costs one command; getting it wrong costs an afternoon.
 *
 * Flip it once the output looks right: `pulumi config set --stack prd me:npmTrustDryRun false`.
 */
const dryRun = config.getBoolean("npmTrustDryRun") ?? true;

if (ownsGlobalResources && dryRun) {
    pulumi.log.warn(
        "npm trusted publishing is in dry-run mode, so no trust relationship will actually be " +
        "created. Read the output, then `pulumi config set --stack prd me:npmTrustDryRun false`."
    );
}

/**
 * Configures npm trusted publishing for every publishable workspace, replacing `NPM_TOKEN`.
 *
 * NOTE-RT: `lerna publish` already speaks OIDC — `node_modules/lerna/dist/index.js` requests a
 * token with audience `npm:registry.npmjs.org`, exchanges it per-package at
 * `POST /-/npm/v1/oidc/token/exchange/package/<name>`, and turns provenance on by itself when both
 * the repository and the package are public. So `NPM_TOKEN` is not a credential to rotate, it is
 * one to never introduce.
 *
 * NOTE-RT: one sequential command rather than 13 resources on purpose. Pulumi would run 13
 * resources in parallel, which collides with both npm's rate limiting and the single five-minute
 * two-factor skip window; npm's own bulk-usage guidance is a loop with a 2-second sleep.
 *
 * NOTE-RT: idempotent by checking `npm trust list` first, because re-running on an
 * already-configured package is an *error*, not a no-op.
 *
 * NOTE-RT: `--allow-publish` rather than `--allow-stage-publish`. The hardened alternative makes
 * every CI publish wait for a maintainer to approve it with 2FA, which is defensible for a
 * portfolio and fatal to an automated release chain. Stated here so it reads as a decision.
 */
const trustScript = `set -euo pipefail

packages=(${publishableWorkspaces.map(name => `"${name}"`).join(" ")})

for pkg in "\${packages[@]}"; do
    if npm trust list --json "$pkg" 2>/dev/null | grep -q '"id"'; then
        echo "- $pkg already has a trusted publisher; leaving it alone"
        continue
    fi

    echo "- configuring $pkg"
    npm trust github "$pkg" \\
        --file ${releaseWorkflowFile} \\
        --repository ${githubRepositoryFullName} \\
        --environment ${releaseEnvironment} \\
        --allow-publish \\
        --yes${dryRun ? " \\\n        --dry-run" : ""}

    # NOTE-RT: npm's own bulk guidance - without it the registry rate-limits partway through.
    sleep 2
done`;

export const npmTrustedPublishers = ownsGlobalResources
    ? new command.local.Command("npm-trusted-publishers", {
        create: trustScript,
        update: trustScript,
        // NOTE-RT: no `delete`. Tearing this stack down should not revoke publishing for packages
        // that are already on the registry.
        interpreter: ["/bin/bash", "-c"],
        triggers: [
            ...publishableWorkspaces,
            releaseWorkflowFile,
            releaseEnvironment,
            String(dryRun)
        ]
    })
    : undefined;
