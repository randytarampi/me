#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}

cd "${REPO_ROOT}";

# NOTE-RT: Rebuild lwip if we need to
if [[ ! -d "${REPO_ROOT}/node_modules/lwip/build/Release" ]]; then npm rebuild lwip; fi;

# NOTE-RT: Use the same `lwip` for `posts` and `pseudoimage`
ln -snf "${REPO_ROOT}/node_modules/lwip/" "${REPO_ROOT}/packages/pseudoimage/node_modules/lwip";
