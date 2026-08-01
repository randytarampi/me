#!/usr/bin/env bash

set -e;

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LERNA_CONCURRENCY=${CPUS_COUNT:=$(node -p "require(\"os\").cpus().length")}

# NOTE-RT: this used to hang off a `package.json` script named `install`, which npm and yarn treat
# as a lifecycle hook - so symlinking into `node_modules` happened as an invisible side effect of
# installing. `prepare` runs at the same point and is the hook this repo already relies on.
"${REPO_ROOT}/bin/hoist-jsonresume-theme.sh";

if [ -z "$IS_PUBLISHING" ]; then
    yarn lerna run prepare --concurrency "${LERNA_CONCURRENCY}";
fi
