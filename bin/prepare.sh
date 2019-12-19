#!/usr/bin/env bash

set -e;

LERNA_CONCURRENCY=${CPUS_COUNT:=$(node -p "require(\"os\").cpus().length")}

if [ -z "$IS_PUBLISHING" ]; then
    npx lerna run prepare --concurrency "${LERNA_CONCURRENCY}";
fi
