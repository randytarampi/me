#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}

cd "${REPO_ROOT}";

npx lerna run preuninstall;

npx lerna clean --yes;

rm -rf packages/*/package-lock.json node_modules package-lock.json coverage .nyc_output;
