#!/usr/bin/env bash

PACKAGE=$(basename "$1")
GITHUB_USER=${GITHUB_USER:=randytarampi}
GITHUB_PACKAGE_REPO=me.${PACKAGE};
GITHUB_PACKAGE_REPO_TARGET_BRANCH=${GITHUB_PACKAGE_REPO_TARGET_BRANCH:=master}
MONOREPO_ROOT=${TRAVIS_BUILD_DIR:=$(pwd)}
MONOREPO_BASE_BRANCH=${MONOREPO_BASE_BRANCH:=master}

if [[ "${PACKAGE}" == "www" ]]; then
	GITHUB_PACKAGE_REPO=${GITHUB_USER}.github.io;
fi;

GITHUB_PACKAGE_REPO_URL=https://${GH_TOKEN}@github.com/${GITHUB_USER}/${GITHUB_PACKAGE_REPO}.git

echo "Splitting out ${PACKAGE} to ${GITHUB_PACKAGE_REPO}..."

cd "${MONOREPO_ROOT}" || exit 1;
git checkout "${MONOREPO_BASE_BRANCH}";

git branch -D "${PACKAGE}";
git remote remove "${PACKAGE}";
git remote add "${PACKAGE}" "${GITHUB_PACKAGE_REPO_URL}"
git subtree split --prefix=packages/"${PACKAGE}" -b "${PACKAGE}";
git checkout "${PACKAGE}";
git status;
git push --force --set-upstream "${PACKAGE}" "${PACKAGE}:${GITHUB_PACKAGE_REPO_TARGET_BRANCH}";

git checkout "$MONOREPO_BASE_BRANCH";
cd "$MONOREPO_ROOT" || exit 1;

echo "Split out ${PACKAGE} to ${GITHUB_PACKAGE_REPO}#${GITHUB_PACKAGE_REPO_TARGET_BRANCH}."
