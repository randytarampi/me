#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=`pwd`}

cd $REPO_ROOT;
npx lerna bootstrap --hoist --no-ci;
npm rebuild lwip;

ln -snf $REPO_ROOT/node_modules/lwip/ $REPO_ROOT/packages/posts/node_modules/lwip;
ln -snf $REPO_ROOT/node_modules/lwip/ $REPO_ROOT/packages/pseudoimage/node_modules/lwip;

# FIXME-RT: `serverless` expects us to have a full `node_modules` tree living below us here. Can't tell if I want to hack around things by symlinking to the top level modules folder, so I'll just play it safe and install again.
cd $REPO_ROOT/packages/posts;
npm install;
rm package-lock.json;

cd $REPO_ROOT;
npx lerna link;