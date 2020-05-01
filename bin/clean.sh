#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}
LERNA_CONCURRENCY=${CPUS_COUNT:=$(node -p "require(\"os\").cpus().length")}

cd "${REPO_ROOT}";

yarn lerna run preuninstall --concurrency "${LERNA_CONCURRENCY}";

yarn lerna clean --yes --concurrency "${LERNA_CONCURRENCY}";

rm -rf node_modules coverage .nyc_output;
