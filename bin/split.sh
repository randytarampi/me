#!/usr/bin/env bash

PACKAGE=`basename $1`
GITHUB_USER=${GITHUB_USER:=randytarampi}
GITHUB_PACKAGE_REPO=me.$PACKAGE;
MONOREPO_ROOT=${TRAVIS_BUILD_DIR:=`pwd`/..}

if [[ $PACKAGE == "www" ]]; then
	GITHUB_PACKAGE_REPO=$GITHUB_USER.github.io;
fi;

GITHUB_PACKAGE_REPO_URL=https://${GH_TOKEN}@github.com/$GITHUB_USER/$GITHUB_PACKAGE_REPO.git

echo "Splitting out $PACKAGE to $GITHUB_PACKAGE_REPO..."

cd $MONOREPO_ROOT;
git checkout master;

git branch -D $PACKAGE;
git remote remove $PACKAGE;
git remote add $PACKAGE $GITHUB_PACKAGE_REPO_URL
git pull -s subtree $PACKAGE master
#git subtree pull --squash --message "Update $PACKAGE from $GITHUB_PACKAGE_REPO" --prefix=packages/$PACKAGE $GITHUB_PACKAGE_REPO_URL master;
git subtree split --prefix=packages/$PACKAGE -b $PACKAGE;
git checkout $PACKAGE;
git status;
git push --force --set-upstream $PACKAGE $PACKAGE:master;

git checkout master;
cd $MONOREPO_ROOT;

echo "Split out $PACKAGE to $GITHUB_PACKAGE_REPO."