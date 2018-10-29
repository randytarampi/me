#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}

cd "${REPO_ROOT}";

# NOTE-RT: Bootstrap the monorepo
npx lerna bootstrap --hoist --no-ci --ignore-scripts;
