#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}

cd "${REPO_ROOT}";

# NOTE-RT: Use the same `lwip` for `posts` and `pseudoimage`
mkdir -p "${REPO_ROOT}/packages/pseudoimage/node_modules/@mcph/"
ln -snf "${REPO_ROOT}/node_modules/@mcph/lwip/" "${REPO_ROOT}/packages/pseudoimage/node_modules/@mcph/lwip";
