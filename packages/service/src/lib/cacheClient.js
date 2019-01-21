import _ from "lodash";
import PostModel from "../db/models/post";
import logger from "./logger";

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

        const queries = _.flatten([searchParams[this.type]]);

        return Promise.all(queries.map(this.dataClient.getRecords))
            .then(_.flatten)
            .catch(error => {
                logger.error(error, `error for (${JSON.stringify(searchParams)})`);
            }); // NOTE-RT: Just swallow caching errors
    }

    /**
     * Retrieve a count of [Records]{@link Record} from the cache that correspond to the terms in the passed searchParams
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Promise<Number>}
     */
    async getRecordCount(searchParams) {
        logger.trace(`getting count of records (${JSON.stringify(searchParams)}) from cache`);

        const queries = _.flatten([searchParams[this.type]]);

        return Promise.all(queries.map(this.dataClient.getRecordCount))
            .then(_.sum)
            .catch(error => {
                logger.error(error, `error for (${JSON.stringify(searchParams)})`);
            }); // NOTE-RT: Just swallow caching errors
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
            }); // NOTE-RT: Just swallow caching errors
    }

    /**
     * Retrieve a [Record]{@link Record} from the cache that corresponds to the terms in the passed searchParams
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Promise<Record>}
     */
    async getRecord(searchParams) {
        logger.trace(`getting record (${JSON.stringify(searchParams)}) from cache`);

        const queries = _.flatten([searchParams[this.type]]);

        return Promise.all(queries.map(this.dataClient.getRecord))
            .then(_.first)
            .catch(error => {
                logger.error(error, `error for (${JSON.stringify(searchParams)})`);
            }); // NOTE-RT: Just swallow caching errors
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
            }); // NOTE-RT: Just swallow caching errors
    }
}

export default CacheClient;
