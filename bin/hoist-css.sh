#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}

cd "${REPO_ROOT}";

# NOTE-RT: Consumers of `css` need to have local references to style assets so we can pull them in during the build. It's easier to code in references to local `node_modules` than to guess if they exist above – in preparation for #67 and publishing them
ln -snf "${REPO_ROOT}/node_modules/materialize-css/" "${REPO_ROOT}/packages/css/node_modules/materialize-css";
ln -snf "${REPO_ROOT}/node_modules/@fortawesome/" "${REPO_ROOT}/packages/css/node_modules/@fortawesome";
