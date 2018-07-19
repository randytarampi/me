#!/usr/bin/env bash

PACKAGE=`basename $1`
GITHUB_USER=${GITHUB_USER:=randytarampi}
GITHUB_PACKAGE_REPO=me.$PACKAGE;
MONOREPO_ROOT=${TRAVIS_BUILD_DIR:=`pwd`/..}

if [[ $PACKAGE == "web" ]]; then
	GITHUB_PACKAGE_REPO=$GITHUB_USER.github.io;
fi;

GITHUB_PACKAGE_REPO_URL=https://${GH_TOKEN}@github.com/$GITHUB_USER/$GITHUB_PACKAGE_REPO.git

echo "Splitting out $PACKAGE to $GITHUB_PACKAGE_REPO..."

cd $MONOREPO_ROOT;
git subtree pull --squash --message "Update $PACKAGE from $GITHUB_PACKAGE_REPO" --rejoin --prefix=packages/$PACKAGE $GITHUB_PACKAGE_REPO_URL master;
git subtree split --prefix=packages/$PACKAGE -b $PACKAGE;
git checkout $PACKAGE;
git remote add $PACKAGE $GITHUB_PACKAGE_REPO_URL
git status;
git push --set-upstream $PACKAGE $PACKAGE:master;

cd $MONOREPO_ROOT;
git checkout master;
git status;
ls -al;

echo "Split out $PACKAGE to $GITHUB_PACKAGE_REPO."