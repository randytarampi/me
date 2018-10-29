#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}

cd "${REPO_ROOT}";

npx lerna run preuninstall;

npx lerna clean --yes;

rm -rf node_modules coverage .nyc_output;
