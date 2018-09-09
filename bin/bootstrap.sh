#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}

cd "${REPO_ROOT}";

"${REPO_ROOT}/bin/install.sh";

"${REPO_ROOT}/bin/postinstall.sh";
