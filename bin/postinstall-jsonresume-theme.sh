#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}

cd "${REPO_ROOT}";

# NOTE-RT: Need to symlink `jsonresume-theme-randytarampi` at the top level `node_modules` directory so `resume-cli` can find it
ln -snf "${REPO_ROOT}/packages/jsonresume-theme" "${REPO_ROOT}/node_modules/jsonresume-theme-randytarampi";
