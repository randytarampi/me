import {compositeKeySeparator} from "@randy.tarampi/js";
import {DateTime} from "luxon";
import logger from "../serverless/logger";
import CacheClient from "./cacheClient";
import DataSource from "./dataSource";
import PostSearchParams from "./postSearchParams";

/**
 * A generic data source that fetches [Record(s)]{@link Record} from some service or some cache, whichever returns first
 * @abstract
 */
class CachedDataSource extends DataSource {
    /**
     * Build a data source that fetches [Record(s)]{@link Record} from some service using some client
     * @param client {object} A client that wraps some service that serves content to be transformed into [Records]{@link Record}
     * @param cacheClient {object} A client to the cache
     */
    constructor(client, cacheClient = new CacheClient()) {
        super(client);
        this.cacheClient = cacheClient;
    }

    /**
     * A hook to do some processing of searchParams before we query the [cache]{@link CachedDataSource.cache} for records
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {object} The maybe decorated searchParams to be used by [recordsGetter]{@link recordsGetter}
     */
    async beforeCachedRecordsGetter(searchParams) {
        return Promise.resolve(searchParams);
    }

    /**
     * The method that actually uses the [cache]{@link CachedDataSource.cache} to query for [Records]{@link Record}
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Record[]} [Record]{@link Record} entities transformed from data retrieved from the [cacheClient]{@link CachedDataSource.cache}
     */
    async cachedRecordsGetter(searchParams) {
        return this.cacheClient.getRecords(searchParams.set("source", this.constructor.type))
            .then(cachedRecords => cachedRecords.map(cachedRecord => this.constructor.instanceToRecord(cachedRecord.raw)));
    }

    /**
     * A hook to do some processing of [Records]{@link Record} after they're returned by the client
     * @param records {Record[]} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Record[]} The maybe decorated [Records]{@link Record} from the wrapped client
     */
    async afterCachedRecordsGetter(records, searchParams) { // eslint-disable-line no-unused-vars
        return Promise.resolve(records);
    }

    /**
     * Set some [Records]{@link Record} in the cache to be later pulled by [CachedDataSource.cachedRecordsGetter]{@link CachedDataSource.cachedRecordsGetter}
     * @param records {Record[]}
     * @returns {Promise<Record[]>}
     */
    async cacheRecords(records) {
        if (!records || !records.length) {
            return Promise.resolve([]);
        }
        return await this.cacheClient.setRecords(records)
            .then(cached => cached);
    }

    /**
     * A generic method that returns some [Records]{@link Record} from the [cache]{@link CachedDataSource.cacheClient}
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Record[]} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     */
    async getCachedRecords(searchParams) {
        return this.beforeCachedRecordsGetter(searchParams)
            .then(decoratedCachedRecordsGetterParams => {
                logger.trace(`retrieving record (${JSON.stringify(searchParams)}) from cache at ${DateTime.utc()}`);
                return this.cachedRecordsGetter(decoratedCachedRecordsGetterParams)
                    .then(records => this.afterCachedRecordsGetter(records, decoratedCachedRecordsGetterParams))
                    .then(records => {
                        if (!records || !records.length) {
                            logger.trace(`retrieve records (${JSON.stringify(searchParams)}) cache miss at ${DateTime.utc()}`);
                            return null;
                        }

                        logger.trace(`retrieved records (${JSON.stringify(records.map(record => record.id))}) from cache at ${DateTime.utc()}`);
                        return records;
                    });
            });
    }

    /**
     * The method that actually uses the [cache]{@link CachedDataSource.cache} to query for [Records]{@link Record}
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Record[]} [Record]{@link Record} entities transformed from data retrieved from the [cacheClient]{@link CachedDataSource.cache}
     */
    async allCachedRecordsGetter(searchParams) {
        return this.cacheClient.getRecords(searchParams.set("source", this.constructor.type).set("all", true))
            .then(cachedRecords => cachedRecords.map(cachedRecord => this.constructor.instanceToRecord(cachedRecord.raw)));
    }

    /**
     * A generic method that returns all available [Records]{@link Record} from the cache
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Record[]} [Record]{@link Record} entities transformed from data retrieved from the cache
     */
    async getAllCachedRecords(searchParams) { // eslint-disable-line no-unused-vars
        return this.beforeCachedRecordsGetter(searchParams)
            .then(decoratedCachedRecordsGetterParams => {
                logger.trace(`retrieving record (${JSON.stringify(searchParams)}) from cache at ${DateTime.utc()}`);
                return this.allCachedRecordsGetter(decoratedCachedRecordsGetterParams)
                    .then(records => this.afterCachedRecordsGetter(records, decoratedCachedRecordsGetterParams))
                    .then(records => {
                        if (!records || !records.length) {
                            logger.trace(`retrieve records (${JSON.stringify(searchParams)}) cache miss at ${DateTime.utc()}`);
                            return null;
                        }

                        logger.trace(`retrieved records (${JSON.stringify(records.map(record => record.id))}) from cache at ${DateTime.utc()}`);
                        return records;
                    });
            });
    }

    /**
     * A generic method that returns some [Records]{@link Record} probably pulled from the [service]{@link CachedDataSource.client}
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Record[]} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     */
    async getServiceRecords(searchParams) {
        return this.beforeRecordsGetter(searchParams)
            .then(decoratedRecordsGetterParams => {
                logger.trace(`retrieving record (${JSON.stringify(searchParams)}) from service at ${DateTime.utc()}`);
                return this.recordsGetter(decoratedRecordsGetterParams)
                    .then(records => {
                        this.cacheRecords(records);
                        logger.trace(`retrieved records (${JSON.stringify(records.map(record => record.id))}) from service at ${DateTime.utc()}`);
                        return this.afterRecordsGetter(records, decoratedRecordsGetterParams);
                    });
            });
    }

    /**
     * A generic method that returns all available [Records]{@link Record} from the service
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Record[]} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     */
    async getAllServiceRecords(searchParams) { // eslint-disable-line no-unused-vars
        return this.beforeRecordsGetter(searchParams)
            .then(decoratedRecordsGetterParams => {
                logger.trace(`retrieving record (${JSON.stringify(searchParams)}) from service at ${DateTime.utc()}`);
                return this.allRecordsGetter(decoratedRecordsGetterParams)
                    .then(records => {
                        this.cacheRecords(records);
                        logger.trace(`retrieved records (${JSON.stringify(records.map(record => record.id))}) from service at ${DateTime.utc()}`);
                        return this.afterRecordsGetter(records, decoratedRecordsGetterParams);
                    });
            });
    }

    /**
     * A generic method that returns some [Records]{@link Record}
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Record[]} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     */
    async getRecords(searchParams) {
        let records = await this.getCachedRecords(searchParams);

        if (!records || !records.length) {
            records = await this.getServiceRecords(searchParams);
        }

        return records;
    }

    /**
     * A generic method that returns all available [Records]{@link Record}, either from the cache or the service
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Record[]} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     */
    async getAllRecords(searchParams) {
        let records = await this.getAllCachedRecords(searchParams);

        if (!records || !records.length) {
            records = await this.getAllServiceRecords(searchParams);
        }

        return records;
    }

    /**
     * A hook to do some processing of searchParams before we query the [cache]{@link CachedDataSource.cache} for a record
     * @param recordId {string} A single record to retrieve from the [client]{@link CachedDataSource.cacheClient}
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {object} The maybe decorated searchParams to be used by [recordGetter]{@link recordGetter}
     */
    async beforeCachedRecordGetter(recordId, searchParams) {
        return Promise.resolve(searchParams);
    }

    /**
     * The method that actually uses the [cache]{@link CachedDataSource.cache} to query for a record
     * @param recordId {string} A single record to retrieve from the [client]{@link CachedDataSource.cacheClient}
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Record} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     */
    async cachedRecordGetter(recordId, searchParams) {
        let cacheParams = searchParams
            ? searchParams.set("id", recordId).set("source", this.constructor.type)
            : PostSearchParams.fromJS({uid: `${this.constructor.type}${compositeKeySeparator}${recordId}`});

        return this.cacheClient.getRecord(cacheParams)
            .then(cachedRecord => cachedRecord && this.constructor.instanceToRecord(cachedRecord.raw));
    }

    /**
     * A hook to do some processing of a [Record]{@link Record} after it's returned by the client
     * @param record {string} A single record retrieved from the [cache]{@link CachedDataSource.cacheClient}
     * @param searchParams {PostSearchParams} A combination of attributes that we're looking for
     * @returns {Record} The maybe decorated [Record]{@link Record} from the wrapped client
     */
    async afterCachedRecordGetter(record, searchParams) { // eslint-disable-line no-unused-vars
        return Promise.resolve(record);
    }

    /**
     * Set a [Record]{@link Record} in the cache to be later pulled by [CachedDataSource.cachedRecordGetter]{@link CachedDataSource.cachedRecordGetter}
     * @param record {Record}
     * @returns {Promise<Record>}
     */
    async cacheRecord(record) {
        if (!record) {
            return Promise.resolve(null);
        }

        return await this.cacheClient.setRecord(record)
            .then(cached => cached);
    }

    /**
     * A generic method that returns some [Record]{@link Record} retrieved from the [cache]{@link CachedDataSource.cacheClient}
     * @param recordId {string} A single record to retrieve from the [cache]{@link CachedDataSource.cacheClient}
     * @param searchParams {PostSearchParams} [Client]{@link CachedDataSource.client} specific query parameters
     * @returns {Record} A single [Record]{@link Record} transformed from data retrieved from the wrapped client
     */
    async getCachedRecord(recordId, searchParams) {
        return this.beforeCachedRecordGetter(recordId, searchParams)
            .then(decoratedCachedRecordGetterParams => {
                logger.trace(`retrieving record (${recordId}) from cache at ${DateTime.utc()}`);
                return this.cachedRecordGetter(recordId, decoratedCachedRecordGetterParams)
                    .then(record => this.afterCachedRecordGetter(record, decoratedCachedRecordGetterParams))
                    .then(record => {
                        if (!record) {
                            logger.trace(`retrieve record (${recordId}) cache miss at ${DateTime.utc()}`);
                            return null;
                        }
                        logger.trace(`retrieved record (${record && record.uid}) from cache at ${DateTime.utc()}`);
                        return record;
                    });
            });
    }

    /**
     * A generic method that returns some [Record]{@link Record} probably retrieved from the [service]{@link CachedDataSource.client}
     * @param recordId {string} A single record to retrieve from the [service]{@link CachedDataSource.client}
     * @param searchParams {PostSearchParams} [Client]{@link CachedDataSource.client} specific query parameters
     * @returns {Record} A single [Record]{@link Record} transformed from data retrieved from the wrapped client
     */
    async getServiceRecord(recordId, searchParams) {
        return this.beforeRecordGetter(recordId, searchParams)
            .then(decoratedRecordGetterParams => {
                logger.trace(`retrieving record (${recordId}) from service at ${DateTime.utc()}`);
                return this.recordGetter(recordId, decoratedRecordGetterParams)
                    .then(record => {
                        this.cacheRecord(record);
                        logger.trace(`retrieved record from service ${record && record.uid} at ${DateTime.utc()}`);
                        return this.afterRecordGetter(record, decoratedRecordGetterParams);
                    });
            });
    }

    /**
     * A generic method that returns some [Record]{@link Record}
     * @param recordId {string} A single record to retrieve from the [cache]{@link CachedDataSource.cacheClient} or [service]{@link CachedDataSource.client}
     * @param searchParams {PostSearchParams} [Client]{@link CachedDataSource.client} specific query parameters
     * @returns {Record} A single [Record]{@link Record} transformed from data retrieved from the wrapped client
     */
    async getRecord(recordId, searchParams) {
        let record = await this.getCachedRecord(recordId, searchParams);

        if (!record) {
            record = await this.getServiceRecord(recordId, searchParams);
        }

        return record;
    }
}

export default CachedDataSource;
