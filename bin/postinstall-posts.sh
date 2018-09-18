#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}

cd "${REPO_ROOT}";

# NOTE-RT: Need to symlink `dynamodb-localhost` into `posts`
ln -snf "${REPO_ROOT}/node_modules/dynamodb-localhost/" "${REPO_ROOT}/packages/posts/node_modules/dynamodb-localhost";
