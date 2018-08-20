#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=`pwd`}

cd $REPO_ROOT;

./postinstall-css.sh;
./postinstall-posts.sh
./postinstall-pseudoimage.sh;
./postinstall-resume.sh;
./postinstall-all.sh;
