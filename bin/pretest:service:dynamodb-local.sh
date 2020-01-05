#!/usr/bin/env bash

set -e;

npx lerna exec yarn run pretest:dynamodb-local --scope="@randy.tarampi/service" --stream &
