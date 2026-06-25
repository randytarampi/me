const filterPostForOrderingConditionsInSearchParams = (post, searchParams) => {
    if (searchParams.hasOrderingConditions) {
        return searchParams.computeOrderingComparisonForEntity(post);
    }

    return true;
};
module.exports.filterPostForOrderingConditionsInSearchParams = filterPostForOrderingConditionsInSearchParams;
module.exports.default = module.exports;
