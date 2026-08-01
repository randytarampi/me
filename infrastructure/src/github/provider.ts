import * as github from "@pulumi/github";

import {githubOwner} from "../config";

/**
 * The GitHub provider, with the owner stated in code rather than left to stack config.
 *
 * NOTE-RT: the token is *not* stated here and must not be. It comes from `GITHUB_TOKEN` in the
 * environment — a GitHub App installation token in CI, a local `gh auth token` at a desk. Putting
 * it in stack config would encrypt it, but it would still be a long-lived credential living in the
 * repository, which is the exact thing this workspace exists to get rid of.
 */
export const provider = new github.Provider("github", {
    owner: githubOwner
});
