// @ts-check
import PostModel from "../db/models/post.js";
import logger from "../serverless/logger.js";

/**
 * A generic class that gets and sets [Records]{@link Record} in some data store
 */
class CacheClient {
    /**
     * Build a wrapper around a data store we want to use as a cache
     * @param type
     * @param dataClient
     */
    constructor(type = "Dynamoose", dataClient = PostModel) {
        this.type = type;
        this.dataClient = dataClient;
    }

    /**
     * Retrieve some [Records]{@link Record} from the cache that correspond to the terms in the passed searchParams
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Promise<Record[]>}
     */
    async getRecords(searchParams) {
        logger.trace(`getting records (${JSON.stringify(searchParams)}) from cache`);

        const queries = Array.isArray(searchParams[this.type]) ? searchParams[this.type] : [searchParams[this.type]];

        return Promise.all(queries.map(this.dataClient.getRecords))
            .then(results => results.flat())
            .catch(error => {
                logger.error(error, `error for (${JSON.stringify(searchParams)})`);
                return undefined;
            }); // NOTE-RT: swallow caching errors — see docs/CONVENTIONS.md#error-handling
    }

    /**
     * Retrieve a count of [Records]{@link Record} from the cache that correspond to the terms in the passed searchParams
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Promise<Number>}
     */
    async getRecordCount(searchParams) {
        logger.trace(`getting count of records (${JSON.stringify(searchParams)}) from cache`);

        const queries = Array.isArray(searchParams[this.type]) ? searchParams[this.type] : [searchParams[this.type]];

        return Promise.all(queries.map(this.dataClient.getRecordCount))
            .then(results => results.reduce((sum, n) => sum + n, 0))
            .catch(error => {
                logger.error(error, `error for (${JSON.stringify(searchParams)})`);
                return undefined;
            }); // NOTE-RT: swallow caching errors — see docs/CONVENTIONS.md#error-handling
    }

    /**
     * Set some [Records]{@link Record} in the cache
     * @param records {Record[]}
     * @returns {Promise<Record[]>}
     */
    async setRecords(records) {
        // NOTE-RT: guards against a `null`/`undefined` entry in `records` (e.g. a source's
        // per-item fetch that failed) so the trace log itself can't throw *before* the `.catch()`
        // below ever gets a chance to run - confirmed live: this exact line crashed the whole
        // `service-dev-cachePosts` Lambda process via an unhandled rejection.
        logger.trace(`setting records (${JSON.stringify(records.map(record => record && record.uid))}}) in cache`);
        return this.dataClient.createRecords(records)
            .catch(error => {
                logger.error(error, `error for (${JSON.stringify(records.map(record => record && record.uid))})`);
                return undefined;
            }); // NOTE-RT: swallow caching errors — see docs/CONVENTIONS.md#error-handling
    }

    /**
     * Retrieve a [Record]{@link Record} from the cache that corresponds to the terms in the passed searchParams
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Promise<Record>}
     */
    async getRecord(searchParams) {
        logger.trace(`getting record (${JSON.stringify(searchParams)}) from cache`);

        const queries = Array.isArray(searchParams[this.type]) ? searchParams[this.type] : [searchParams[this.type]];

        return Promise.all(queries.map(this.dataClient.getRecord))
            .then(results => results[0])
            .catch(error => {
                logger.error(error, `error for (${JSON.stringify(searchParams)})`);
                return undefined;
            }); // NOTE-RT: swallow caching errors — see docs/CONVENTIONS.md#error-handling
    }

    /**
     * Set a [Record]{@link Record} in the cache
     * @param record {Record}
     * @returns {Promise<Record>}
     */
    async setRecord(record) {
        logger.trace(`setting record (${record.uid}) in cache`);
        return this.dataClient.createRecord(record)
            .catch(error => {
                logger.error(error, `error for (${record.uid})`);
                return undefined;
            }); // NOTE-RT: swallow caching errors — see docs/CONVENTIONS.md#error-handling
    }
}

export default CacheClient;
