#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=`pwd`}

cd $REPO_ROOT;
npx lerna bootstrap --hoist --no-ci;
npm rebuild lwip;

# NOTE-RT: Use the same `lwip` for `posts` and `pseudoimage`
ln -snf $REPO_ROOT/node_modules/lwip/ $REPO_ROOT/packages/posts/node_modules/lwip;
ln -snf $REPO_ROOT/node_modules/lwip/ $REPO_ROOT/packages/pseudoimage/node_modules/lwip;

# NOTE-RT: Need to symlink `jsonresume-theme-randytarampi` at the top level `node_modules` directory so `resume-cli` can find it
ln -snf $REPO_ROOT/packages/resume $REPO_ROOT/node_modules/jsonresume-theme-randytarampi

# FIXME-RT: `serverless` expects us to have a full `node_modules` tree living below us here. Can't tell if I want to hack around things by symlinking to the top level modules folder, so I'll just play it safe and install again.
cd $REPO_ROOT/packages/posts;
npm install;
rm package-lock.json;

# FIXME-RT: Consumers of `css` needs it have local references to style assets so we can pull them in during the build
ln -snf $REPO_ROOT/node_modules/materialize-css/ $REPO_ROOT/packages/css/node_modules/materialize-css

cd $REPO_ROOT;
npx lerna link;
