#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}
LERNA_CONCURRENCY=${CPUS_COUNT:=$(node -p "require(\"os\").cpus().length")}

cd "${REPO_ROOT}";

# NOTE-RT: Bootstrap the monorepo
npx lerna bootstrap --hoist --no-ci --concurrency "${LERNA_CONCURRENCY}";

"${REPO_ROOT}/bin/hoist-css.sh";
"${REPO_ROOT}/bin/hoist-jsonresume-theme.sh";
