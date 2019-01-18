/**
 * Build a sensibly filtered Dynamoose Query
 * @param _query {Object} A Dynamoose parseable query object
 * @param _filter {Object} A Dynamoose parseable filter object
 * @param _options {Object} Dynamoose specific query options, like `indexName`
 * @param queryMethod {function} A Dynamoose `Model.query` or similar method
 * @returns {Query}
 */
export const buildQueryWithFilter = ({_options, _filter, _query}, queryMethod) => {
    let query = queryMethod(_query, _options);

    if (_filter) {
        const {hash, range, ...hashShorthand} = _query;
        let actualHash = hash || hashShorthand;

        Object.keys(_filter).forEach(filterKey => {
            if (!actualHash[filterKey] && (!range || !range[filterKey])) {
                const filterValue = _filter[filterKey];

                if (typeof filterValue === "object") {
                    Object.keys(filterValue).forEach(filterValueKey => {
                        const filterValueValue = filterValue[filterValueKey];

                        query = query.and().filter(filterKey)[filterValueKey](filterValueValue);
                    });
                } else {
                    query = query.and().filter(filterKey).eq(filterValue);
                }
            }
        });
    }

    return query;
};

/**
 * Recursively call a model's getter function to ensure that we return *at least* _options.limit
 * @param _query {Object} A Dynamoose parseable query object
 * @param _filter {Object} A Dynamoose parseable filter object
 * @param _options {Object} Dynamoose specific query options, like `indexName`
 * @param modelGetter {function} One of the model methods defined in this file, like `getRecords`
 * @returns {Function}
 */
export const recursivelyGet = ({_options, _filter, _query}, modelGetter) => async justFetched => {
    const {limit: originalLimit = 1, _numberPreviouslyFetched = 0, _nextLimit = originalLimit} = _options || {};
    const totalFetched = justFetched.length + _numberPreviouslyFetched;

    if (totalFetched >= originalLimit) {
        return justFetched;
    }

    if (totalFetched > 0 && justFetched.lastKey) {
        const subsequentlyFetchedPosts = await modelGetter({
            _options: {
                ..._options,
                ExclusiveStartKey: justFetched.lastKey,
                _numberPreviouslyFetched: totalFetched,
                _nextLimit: _nextLimit * 10
            },
            _filter,
            _query
        });

        return justFetched.concat(subsequentlyFetchedPosts);
    }

    if (justFetched.lastKey) {
        const subsequentlyFetchedPosts = await modelGetter({
            _options: {
                ..._options,
                all: true,
                ExclusiveStartKey: justFetched.lastKey,
                _numberPreviouslyFetched: totalFetched
            },
            _filter,
            _query
        });

        return justFetched.concat(subsequentlyFetchedPosts);
    }

    return justFetched;
};
