#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}

cd "${REPO_ROOT}";

"${REPO_ROOT}/bin/prepare-css.sh";
"${REPO_ROOT}/bin/prepare-posts.sh";
"${REPO_ROOT}/bin/prepare-pseudoimage.sh";
"${REPO_ROOT}/bin/prepare-jsonresume-theme.sh";
"${REPO_ROOT}/bin/prepare-all.sh";
