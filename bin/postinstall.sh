#!/usr/bin/env bash

set -e;

REPO_ROOT=${TRAVIS_BUILD_DIR:=`pwd`}

cd $REPO_ROOT;

$REPO_ROOT/bin/postinstall-css.sh;
$REPO_ROOT/bin/postinstall-posts.sh
$REPO_ROOT/bin/postinstall-pseudoimage.sh;
$REPO_ROOT/bin/postinstall-resume.sh;
$REPO_ROOT/bin/postinstall-all.sh;
