import dynamoose from "dynamoose";
import logger from "../lib/logger";

/**
 * Model an Immutable [Record]{@link Record} with a [Record.uid]{@link Record.uid} with Dynamoose
 */
export class DynamooseModel {
    constructor(modelName, schema) {
        this.dynamooseModel = dynamoose.model(modelName, schema, {
            create: false
        });

        this.createRecord = this.createRecord.bind(this);
        this.getRecord = this.getRecord.bind(this);
        this.createRecords = this.createRecords.bind(this);
        this.getRecords = this.getRecords.bind(this);
        this.getRecordCount = this.getRecordCount.bind(this);
    }

    /**
     * Persist a [Record]{@link Record}
     * @param record {Record}
     * @returns {Promise<Record>}
     */
    async createRecord(record) {
        logger.trace(`persisting record (${record.uid})`);
        const postModelInstance = await this.dynamooseModel.create(record.toJS(), {overwrite: true});
        logger.trace(`persisted record (${JSON.stringify(postModelInstance && postModelInstance.uid)})`);
        return postModelInstance;
    }

    /**
     * Retrieve a single [Record]{@link Record} matching a [Record.uid]{@link Record.uid} or some other attributes
     * @param _query {Object} A Dynamoose parseable query object
     * @param _filter {Object} A Dynamoose parseable filter object
     * @param _options {Object} Dynamoose specific query options, like `indexName`
     * @returns {Promise<Record>}
     */
    async getRecord({_options, _filter, _query}) {
        logger.trace(`retrieving record (_query: ${JSON.stringify(_query)}, _filter: ${JSON.stringify(_filter)}) with ${JSON.stringify(_options)}`);
        const postModelInstance = _query
            ? await buildQueryWithFilter({_options, _filter, _query}, this.dynamooseModel.queryOne).exec()
            : await this.dynamooseModel.scan(_filter, _options).limit(1000).all().exec()
                .then(instanceContainer => instanceContainer[0]);
        logger.trace(`retrieved record (${postModelInstance && postModelInstance.uid})`);
        return postModelInstance;
    }

    /**
     * Persist an array of [Records]{@link Record}
     * @param records {Record[]}
     * @returns {Promise<Record[]>}
     */
    async createRecords(records) {
        logger.trace(`persisting records (${JSON.stringify(records.map(record => record.uid))})`);
        await this.dynamooseModel.batchPut(records.map(record => record.toJS()), {overwrite: true});
        logger.trace(`persisted records (${JSON.stringify(records.map(record => record.uid))})`);
        return records;
    }

    /**
     * Retrieve an array of [Records]{@link Record} matching a [Record.uid]{@link Record.uid} or some other attributes
     * @param _query {Object} A Dynamoose parseable query object
     * @param _filter {Object} A Dynamoose parseable filter object
     * @param _options {Object} Dynamoose specific query options, like `indexName`
     * @returns {Promise<Record[]>}
     */
    async getRecords({_options, _filter, _query}) {
        logger.trace(`retrieving records (_query: ${JSON.stringify(_query)}, _filter: ${JSON.stringify(_filter)}) ${JSON.stringify(_options)}`);
        const {limit: originalLimit} = _options || {};
        let postModelInstances = _query
            ? await buildQueryWithFilter({_options, _filter, _query}, this.dynamooseModel.query).exec()
                .then(recursivelyGet({_options, _filter, _query}, this.getRecords))
                .then(allPosts => originalLimit ? allPosts.slice(0, originalLimit) : allPosts)
            : await this.dynamooseModel.scan(_filter, _options).exec()
                .then(recursivelyGet({_options, _filter, _query}, this.getRecords))
                .then(allPosts => originalLimit ? allPosts.slice(0, originalLimit) : allPosts);
        logger.trace(`retrieved records (${JSON.stringify(postModelInstances.map(postModelInstance => postModelInstance.uid))})`);
        return postModelInstances;
    }

    /**
     * Retrieve a count of _all_ [Records]{@link Record} matching a [Record.uid]{@link Record.uid} or some other attributes
     * @param _query {Object} A Dynamoose parseable query object
     * @param _filter {Object} A Dynamoose parseable filter object
     * @param _options {Object} Dynamoose specific query options, like `indexName`
     * @returns {Promise<Record[]>}
     */
    async getRecordCount({_options, _filter, _query}) {
        logger.trace(`counting records (_query: ${JSON.stringify(_query)}, _filter: ${JSON.stringify(_filter)}) ${JSON.stringify(_options)}`);
        let postModelInstanceCount = _query
            ? await buildQueryWithFilter({
                _options,
                _filter,
                _query
            }, this.dynamooseModel.query).limit(1000).all().count().exec()
            : await this.dynamooseModel.scan(_filter, _options).limit(1000).all().count().exec()
                .then(countContainer => countContainer[0]);
        logger.trace(`counted (${postModelInstanceCount}) records`);
        return postModelInstanceCount;
    }
}

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


export default DynamooseModel;
