#!/usr/bin/env bash

set -e;

yarn lerna exec yarn run pretest:dynamodb-local --scope="@randy.tarampi/service" --stream &
