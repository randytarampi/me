#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}
LERNA_CONCURRENCY=${CPUS_COUNT:=$(node -p "require(\"os\").cpus().length")}

cd "${REPO_ROOT}";

npx lerna link;
ls -alh packages/*/node_modules/@randy.tarampi/**;
npx lerna bootstrap --concurrency "${LERNA_CONCURRENCY}";
"${REPO_ROOT}/bin/hoist-jsonresume-theme.sh";
