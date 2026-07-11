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
            }); // NOTE-RT: Intentionally swallow caching errors — cache failures should not break the request, the service falls back to the origin source
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
            }); // NOTE-RT: Intentionally swallow caching errors — cache failures should not break the request, the service falls back to the origin source
    }

    /**
     * Set some [Records]{@link Record} in the cache
     * @param records {Record[]}
     * @returns {Promise<Record[]>}
     */
    async setRecords(records) {
        logger.trace(`setting records (${JSON.stringify(records.map(record => record.uid))}}) in cache`);
        return this.dataClient.createRecords(records)
            .catch(error => {
                logger.error(error, `error for (${JSON.stringify(records.map(record => record.uid))})`);
                return undefined;
            }); // NOTE-RT: Intentionally swallow caching errors — cache failures should not break the request, the service falls back to the origin source
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
            }); // NOTE-RT: Intentionally swallow caching errors — cache failures should not break the request, the service falls back to the origin source
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
            }); // NOTE-RT: Intentionally swallow caching errors — cache failures should not break the request, the service falls back to the origin source
    }
}

export default CacheClient;
