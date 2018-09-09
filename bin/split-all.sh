#!/usr/bin/env bash

MONOREPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}

find "${MONOREPO_ROOT}/packages" -maxdepth 1 -mindepth 1 -type d -execdir "${MONOREPO_ROOT}/bin/split.sh" {} \;
