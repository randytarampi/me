#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}

cd "${REPO_ROOT}";

npx lerna link;
npx lerna run postinstall
npx lerna run prepare
npx lerna run build
