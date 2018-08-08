#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=`pwd`}

cd $REPO_ROOT;
npx lerna bootstrap --hoist --no-ci;
if [[ ! -d $REPO_ROOT/node_modules/lwip/build/Release ]]; then npm rebuild lwip; fi;

# NOTE-RT: Use the same `lwip` for `posts` and `pseudoimage`
ln -snf $REPO_ROOT/node_modules/lwip/ $REPO_ROOT/packages/posts/node_modules/lwip;
ln -snf $REPO_ROOT/node_modules/lwip/ $REPO_ROOT/packages/pseudoimage/node_modules/lwip;

# NOTE-RT: Need to symlink `jsonresume-theme-randytarampi` at the top level `node_modules` directory so `resume-cli` can find it
ln -snf $REPO_ROOT/packages/resume/ $REPO_ROOT/node_modules/jsonresume-theme-randytarampi

# FIXME-RT: Consumers of `css` needs it have local references to style assets so we can pull them in during the build
ln -snf $REPO_ROOT/node_modules/materialize-css/ $REPO_ROOT/packages/css/node_modules/materialize-css
ln -snf $REPO_ROOT/node_modules/@fortawesome/ $REPO_ROOT/packages/css/node_modules/@fortawesome

cd $REPO_ROOT;
npx lerna link;
