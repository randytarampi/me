#!/usr/bin/env bash

find $TRAVIS_BUILD_DIR/packages -maxdepth 1 -mindepth 1 -type d -execdir $TRAVIS_BUILD_DIR/bin/split.sh {} \;