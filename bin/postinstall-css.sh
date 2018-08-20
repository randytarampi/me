#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=`pwd`}

cd $REPO_ROOT;

# FIXME-RT: Consumers of `css` needs it have local references to style assets so we can pull them in during the build
ln -snf $REPO_ROOT/node_modules/materialize-css/ $REPO_ROOT/packages/css/node_modules/materialize-css
ln -snf $REPO_ROOT/node_modules/@fortawesome/ $REPO_ROOT/packages/css/node_modules/@fortawesome
