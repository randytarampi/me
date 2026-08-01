#!/usr/bin/env bash

set -e;

# NOTE-RT: derived from this script's own location. It used to read `$TRAVIS_BUILD_DIR`,
# falling back to `$(pwd)` — this repo left Travis behind years ago, and the fallback quietly
# made the script depend on where it was invoked from.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "${REPO_ROOT}";

# NOTE-RT: Need to symlink `jsonresume-theme-randytarampi` at the top level `node_modules` directory so `resume-cli` can find it
ln -snf "${REPO_ROOT}/packages/jsonresume-theme" "${REPO_ROOT}/node_modules/jsonresume-theme-randytarampi";
