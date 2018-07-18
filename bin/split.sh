#!/usr/bin/env bash

PACKAGE=$1
GITHUB_USER=${GITHUB_USER:=randytarampi}
GITHUB_PACKAGE_REPO=me.$PACKAGE;

if [[ $PACKAGE == "web" ]]; then
	GITHUB_PACKAGE_REPO=$GITHUB_USER.github.io;
fi;

cd ..;
git subtree split --prefix=packages/$PACKAGE -b $PACKAGE;
git checkout $PACKAGE;
git remote add $PACKAGE https://${GH_TOKEN}@github.com/$GITHUB_USER/$GITHUB_PACKAGE_REPO.git
git status;
git push --set-upstream $PACKAGE $PACKAGE:master;

git fetch --force --all && git reset --hard origin/master && git checkout master;
