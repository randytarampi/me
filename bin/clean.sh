#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=`pwd`}

cd $REPO_ROOT;

rm -rf packages/*/package-lock.json packages/*/dist packages/*/coverage packages/*/.nyc_output packages/*/.serverless packages/*/.webpack packages/*/.dynamodb;

npx lerna clean --yes;

rm -rf node_modules package-lock.json coverage .nyc_output;
