#!/usr/bin/env bash

set -e;

REPO_ROOT=`pwd`

npx lerna bootstrap --hoist;
npm rebuild lwip;

ln -s $REPO_ROOT/node_modules/lwip/ $REPO_ROOT/packages/posts/node_modules/lwip;
ln -s $REPO_ROOT/node_modules/lwip/ $REPO_ROOT/packages/pseudoimage/node_modules/lwip;