import dynamoose from "dynamoose";
import logger from "../serverless/logger";

/**
 * Convert a single value into something Dynamoose v4 can persist. Notably, Dynamoose v4 type-checks `Date`
 * attributes _before_ running schema `set` modifiers and rejects Luxon `DateTime` instances, so we convert
 * them to native `Date` objects here.
 * @param value {*}
 * @returns {*}
 */
const toDynamoCompatibleValue = value => {
    if (value && typeof value === "object" && typeof value.toJSDate === "function") {
        return value.toJSDate();
    }

    return value;
};

/**
 * Convert an Immutable [Record]{@link Record} into a plain object Dynamoose v4 can persist.
 * @param record {Record}
 * @returns {Object}
 */
export const recordToDynamoObject = record => {
    const object = record.toJS();

    // Dynamoose v4 invokes `default` functions with no arguments (unlike v1/v2, which passed the model
    // instance), so the schemas' composite-key `default: model => \`${model.source}…${model.id}\`` would
    // crash. The Immutable Record already derives the same `uid`, so we provide it explicitly here.
    object.uid = record.uid;

    return Object.keys(object).reduce((normalized, key) => {
        const value = toDynamoCompatibleValue(object[key]);

        // Dynamoose v4 type-checks attributes and rejects explicit `null`/`undefined` values for typed
        // attributes (e.g. an absent `lat`/`long`/`tags`), so we omit them entirely instead.
        if (value !== null && value !== undefined) {
            normalized[key] = value;
        }

        return normalized;
    }, {});
};

const FILTER_COMPARATOR_NORMALIZED = {
    EQ: "eq",
    NE: "ne",
    LT: "lt",
    LE: "le",
    GT: "gt",
    GE: "ge",
    CONTAINS: "contains",
    NOT_CONTAINS: "notContains",
    BEGINS_WITH: "beginsWith",
    begins_with: "beginsWith"
};

const FILTER_COMPARATOR_OPERATORS = {
    eq: "=",
    ne: "<>",
    lt: "<",
    le: "<=",
    gt: ">",
    ge: ">="
};

const marshallFilterValue = value => {
    let normalized = value;

    if (normalized && typeof normalized === "object" && typeof normalized.toJSDate === "function") {
        normalized = normalized.toJSDate();
    }

    if (normalized instanceof Date) {
        normalized = normalized.getTime();
    }

    return dynamoose.aws.converter().marshall({value: normalized}).value;
};

const filterComparisonIsScalar = comparison =>
    comparison === null || typeof comparison !== "object" || comparison instanceof Date || typeof comparison.toJSDate === "function";

const filterHasContains = _filter => Boolean(_filter) && Object.keys(_filter).some(attribute => {
    const comparison = _filter[attribute];

    return !filterComparisonIsScalar(comparison) && Object.keys(comparison).some(operator => {
        const normalizedOperator = FILTER_COMPARATOR_NORMALIZED[operator] || operator;
        return normalizedOperator === "contains" || normalizedOperator === "notContains";
    });
});

/**
 * Build a Dynamoose scan filter from the legacy `_filter` shape.
 *
 * Dynamoose v4 marshals the `contains` filter operand using the _attribute's_ schema type, so a
 * `contains` against a String `Set` attribute (e.g. `tags`) is (incorrectly) marshalled as a String Set of
 * the operand's characters (`"woof"` → `{"SS":["w","o","f"]}`) and never matches. When a `contains`
 * comparison is present we therefore build a raw {@link dynamoose.Condition} with correctly-typed scalar
 * operands; otherwise we return the plain `_filter` object (which Dynamoose handles natively). This also
 * accepts the legacy upper-case DynamoDB comparators (`CONTAINS`, `BEGINS_WITH`, …) and expands an array
 * `contains` operand into an `OR` of single-value `contains` checks.
 * @param _filter {Object} A Dynamoose parseable filter object
 * @returns {Object|dynamoose.Condition}
 */
export const buildScanFilter = _filter => {
    if (!filterHasContains(_filter)) {
        return _filter;
    }

    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};
    const expressions = [];
    let nameIndex = 0;
    let valueIndex = 0;

    const nameToken = attribute => {
        const token = `#f${nameIndex++}`;
        ExpressionAttributeNames[token] = attribute;
        return token;
    };
    const valueToken = value => {
        const token = `:f${valueIndex++}`;
        ExpressionAttributeValues[token] = marshallFilterValue(value);
        return token;
    };

    Object.keys(_filter).forEach(attribute => {
        const comparison = _filter[attribute];
        const attributeToken = nameToken(attribute);

        if (filterComparisonIsScalar(comparison)) {
            expressions.push(`${attributeToken} = ${valueToken(comparison)}`);
            return;
        }

        Object.keys(comparison).forEach(operator => {
            const normalizedOperator = FILTER_COMPARATOR_NORMALIZED[operator] || operator;
            const rawValue = comparison[operator];
            const valuesArray = (normalizedOperator === "contains" || normalizedOperator === "notContains") && Array.isArray(rawValue)
                ? rawValue
                : [rawValue];

            const subExpressions = valuesArray.map(singleValue => {
                const singleValueToken = valueToken(singleValue);

                switch (normalizedOperator) {
                    case "contains":
                        return `contains(${attributeToken}, ${singleValueToken})`;
                    case "notContains":
                        return `NOT contains(${attributeToken}, ${singleValueToken})`;
                    case "beginsWith":
                        return `begins_with(${attributeToken}, ${singleValueToken})`;
                    default:
                        return `${attributeToken} ${FILTER_COMPARATOR_OPERATORS[normalizedOperator] || "="} ${singleValueToken}`;
                }
            });

            expressions.push(subExpressions.length > 1 ? `(${subExpressions.join(" OR ")})` : subExpressions[0]);
        });
    });

    return new dynamoose.Condition({
        FilterExpression: expressions.join(" AND "),
        ExpressionAttributeNames,
        ExpressionAttributeValues
    });
};

/**
 * Model an Immutable [Record]{@link Record} with a [Record.uid]{@link Record.uid} with Dynamoose
 */
export class DynamooseModel {
    constructor(modelName, schema) {
        this.modelName = modelName;
        this.schema = schema;
        this.dynamooseModel = dynamoose.model(modelName, schema, {
            create: false,
            update: false,
            waitForActive: false
        });

        this.createRecord = this.createRecord.bind(this);
        this.getRecord = this.getRecord.bind(this);
        this.createRecords = this.createRecords.bind(this);
        this.getRecords = this.getRecords.bind(this);
        this.getRecordCount = this.getRecordCount.bind(this);
        this.getCreateTableRequest = this.getCreateTableRequest.bind(this);
    }

    /**
     * Build the DynamoDB `CreateTable` request for this model without performing any network requests.
     * Used by the `serverless-dynamodb` resource generators to seed the local DynamoDB tables.
     * @returns {Promise<Object>}
     */
    async getCreateTableRequest() {
        const table = new dynamoose.Table(this.modelName, [this.dynamooseModel], {
            create: false,
            update: false,
            waitForActive: false,
            initialize: false
        });
        return table.create({return: "request"});
    }

    /**
     * Create this model's table in DynamoDB (used to seed a local DynamoDB instance for integration tests,
     * since Serverless Framework v4 requires authentication to run `sls dynamodb migrate`).
     * @returns {Promise<dynamoose.Table>}
     */
    async createTable() {
        const table = new dynamoose.Table(this.modelName, [this.dynamooseModel], {
            create: false,
            update: false,
            waitForActive: false,
            initialize: false
        });
        await table.create();
        return table;
    }

    /**
     * Persist a [Record]{@link Record}
     * @param record {Record}
     * @returns {Promise<Record>}
     */
    async createRecord(record) {
        logger.trace(`persisting record (${record.uid})`);
        const postModelInstance = await this.dynamooseModel.create(recordToDynamoObject(record), {overwrite: true});
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
            ? await applyScanQueryOptions(buildQueryWithFilter({_options, _filter, _query}, this.dynamooseModel.query), _options).limit(1).exec()
                .then(instanceContainer => instanceContainer[0])
            : await applyScanQueryOptions(this.dynamooseModel.scan(buildScanFilter(_filter)), _options).limit(1000).all().exec()
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
        await this.dynamooseModel.batchPut(records.map(recordToDynamoObject));
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
        const {limit: originalLimit, all} = _options || {};
        const itemRetriever = applyScanQueryOptions(
            _query
                ? buildQueryWithFilter({_options, _filter, _query}, this.dynamooseModel.query)
                : this.dynamooseModel.scan(buildScanFilter(_filter)),
            _options
        );
        const pagedRetriever = all
            ? itemRetriever.all()
            : (typeof originalLimit === "number" ? itemRetriever.limit(originalLimit) : itemRetriever);
        let postModelInstances = await pagedRetriever.exec()
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
        const itemRetriever = applyScanQueryOptions(
            _query
                ? buildQueryWithFilter({_options, _filter, _query}, this.dynamooseModel.query)
                : this.dynamooseModel.scan(buildScanFilter(_filter)),
            _options
        );
        const {count: postModelInstanceCount} = await itemRetriever.limit(1000).all().count().exec();
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
    const {hash, range, ...hashShorthand} = _query;
    const actualHash = hash || hashShorthand;

    // Dynamoose v4's `query()` no longer understands the v1/v2 `{hash, range}` envelope, so flatten it into
    // a single condition object (the flat `{attribute: {eq: …}}` shorthand passes through unchanged).
    let query = queryMethod({...actualHash, ...(range || {})}, _options);

    if (_filter) {
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
 * Apply the Dynamoose v4 query/scan options that used to be passed as the second argument to
 * `Model.query`/`Model.scan` in Dynamoose v1/v2 (most notably `indexName` and pagination cursors).
 * @param itemRetriever {Query|Scan} A Dynamoose `Query` or `Scan` instance
 * @param _options {Object} Dynamoose specific query options, like `indexName` and `ExclusiveStartKey`
 * @returns {Query|Scan}
 */
export const applyScanQueryOptions = (itemRetriever, _options = {}) => {
    let retriever = itemRetriever;
    const {indexName, ExclusiveStartKey} = _options || {};

    if (indexName) {
        retriever = retriever.using(indexName);
    }

    if (ExclusiveStartKey) {
        retriever = retriever.startAt(ExclusiveStartKey);
    }

    return retriever;
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
