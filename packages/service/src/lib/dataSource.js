/**
 * A generic data source that fetches [Record(s)]{@link Record} from some service
 * @abstract
 */
class DataSource {
    /**
     * Build a data source that fetches [Record(s)]{@link Record} from some service using some client
     * @param client {object} A client that wraps some service that serves content to be transformed into [Records]{@link Record}
     */
    constructor(client) {
        this.client = client;
        this.initializing = Promise.resolve(this);
    }

    /**
     * Return a string that describes this DataSource
     * @returns {string}
     */
    static get type() {
        throw new Error("Please specify an actual Record type");
    }

    /**
     * A convenience function that returns `true` if we should care about this data source
     * @returns {boolean}
     */
    get isEnabled() {
        const type = this.constructor.type.toUpperCase();
        return !!process.env[`${type}_API_KEY`] &&
            !!process.env[`${type}_API_SECRET`];
    }

    /**
     * Transform some raw JSON response from the [client]{@link DataSource.client} into a single [Record]{@link Record}
     * @param recordJson {object} The raw record content returned from the [client]{@link DataSource.client}
     * @returns {Record}
     */
    static instanceToRecord(recordJson) {
        throw new Error(`Trying to turn ${recordJson} into a Record – Please specify an actual Record transformation`);
    }

    /**
     * A hook to do some processing of searchParams before we query the client for records
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {object} The maybe decorated searchParams to be used by [recordsGetter]{@link recordsGetter}
     */
    async beforeRecordsGetter(searchParams) {
        return Promise.resolve(searchParams);
    }

    /**
     * The method that actually uses the [client]{@link DataSource.client} to query for raw data for transformation into [Records]{@link Record}
     * @abstract
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Record[]} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     */
    async recordsGetter(searchParams) {
        return Promise.reject(new Error(`Looking for ${searchParams} – Please specify an actual recordsGetter implementation`));
    }

    /**
     * A hook to do some processing of [Records]{@link Record} after they're returned by the client
     * @param records {Record[]} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Record[]} The maybe decorated [Records]{@link Record} from the wrapped client
     */
    async afterRecordsGetter(records, searchParams) { // eslint-disable-line no-unused-vars
        return Promise.resolve(records);
    }

    /**
     * A generic method that returns some [Records]{@link Record}
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Record[]} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     */
    async getRecords(searchParams) {
        const decoratedParams = await this.beforeRecordsGetter(searchParams);
        const retrievedRecords = await this.recordsGetter(decoratedParams);
        const decoratedRecords = await this.afterRecordsGetter(retrievedRecords, decoratedParams);

        return decoratedRecords;
    }

    /**
     * The method that actually uses the [client]{@link DataSource.client} to query for raw data for transformation into [Records]{@link Record}
     * @abstract
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Record[]} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     */
    async allRecordsGetter(searchParams) {
        return Promise.reject(new Error(`Looking for ${searchParams} – Please specify an actual allRecordsGetter implementation`));
    }

    /**
     * A generic method that returns all available [Records]{@link Record}
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Record[]} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     */
    async getAllRecords(searchParams) {
        const decoratedParams = await this.beforeRecordsGetter(searchParams);
        const retrievedRecords = await this.allRecordsGetter(decoratedParams);
        const decoratedRecords = await this.afterRecordsGetter(retrievedRecords, decoratedParams);

        return decoratedRecords;
    }

    /**
     * A hook to do some processing of searchParams before we query the client for a record
     * @param recordId {string} A single record to retrieve from the [client]{@link DataSource.client}
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {object} The maybe decorated searchParams to be used by [recordGetter]{@link recordGetter}
     */
    async beforeRecordGetter(recordId, searchParams) {
        return Promise.resolve(searchParams);
    }

    /**
     * The method that actually uses the [client]{@link DataSource.client} to query for raw data for transformation into a [Record]{@link Record}
     * @abstract
     * @param recordId {string} A single record to retrieve from the [client]{@link DataSource.client}
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Record} [Record]{@link Record} entities transformed from data retrieved from the wrapped client
     */
    async recordGetter(recordId, searchParams) {
        return Promise.reject(new Error(`Looking for ${recordId} with ${searchParams} – Please specify an actual recordGetter implementation`));
    }

    /**
     * A hook to do some processing of [Record]{@link Record} after they're returned by the client
     * @param record {Record} A single [Record]{@link Record} transformed from data retrieved from the wrapped client
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Record} The maybe decorated [Record]{@link Record} from the wrapped client
     */
    async afterRecordGetter(record, searchParams) { // eslint-disable-line no-unused-vars
        return Promise.resolve(record);
    }

    /**
     * A generic method that returns some [Record]{@link Record}
     * @param recordId {string} A single record to retrieve from the [client]{@link DataSource.client}
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Record} A single [Record]{@link Record} transformed from data retrieved from the wrapped client
     */
    async getRecord(recordId, searchParams) {
        const decoratedParams = await this.beforeRecordGetter(recordId, searchParams);
        const retrievedRecord = await this.recordGetter(recordId, decoratedParams);
        const decoratedRecord = await this.afterRecordGetter(retrievedRecord, decoratedParams);

        return decoratedRecord;
    }
}

export default DataSource;
