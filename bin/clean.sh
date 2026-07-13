#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}
LERNA_CONCURRENCY=${CPUS_COUNT:=$(node -p "require(\"os\").cpus().length")}

cd "${REPO_ROOT}";

# NOTE: `preuninstall` is only for uninstall-specific cleanup (e.g. service removing local DynamoDB tables).
# It may fail if env vars or build artifacts aren't available — that's fine during a clean.
yarn lerna run preuninstall --concurrency "${LERNA_CONCURRENCY}" --no-bail || true;

# NOTE: `lerna run clean` runs each package's `gulp clean` task to delete build artifacts (esm/, dist/, etc.).
# This replaces `lerna clean` (which only removes node_modules symlinks) — `rm -rf node_modules` below handles that.
yarn lerna run clean --concurrency "${LERNA_CONCURRENCY}";

rm -rf node_modules coverage .nyc_output;
