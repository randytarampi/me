#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}
LERNA_CONCURRENCY=${CPUS_COUNT:=$(node -p "require(\"os\").cpus().length")}

cd "${REPO_ROOT}";

# NOTE: Run service's DynamoDB removal first, before concurrent preuninstall deletes build artifacts.
# `sls dynamodb remove` triggers Serverless variable resolution which loads source files that import
# `@randy.tarampi/lambda-logger` (whose `main` is `./esm/index.js`). If other packages' `preuninstall`
# (which runs `gulp clean` → deletes `esm/`) runs concurrently, the resolution fails.
yarn workspace @randy.tarampi/service run preuninstall:dynamodb || true;

yarn lerna run preuninstall --concurrency "${LERNA_CONCURRENCY}" --ignore @randy.tarampi/service;

yarn lerna clean --yes --concurrency "${LERNA_CONCURRENCY}";

rm -rf node_modules coverage .nyc_output;
