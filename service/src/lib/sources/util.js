const filterPostForOrderingConditionsInSearchParams = (post, searchParams) => {
    if (searchParams.hasOrderingConditions) {
        return searchParams.computeOrderingComparisonForEntity(post);
    }

    return true;
};
export {filterPostForOrderingConditionsInSearchParams};

export default {filterPostForOrderingConditionsInSearchParams};
