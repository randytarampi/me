export const DummyDataClientGenerator = ({
                                             stubGetRecords,
                                             stubGetRecordCount,
                                             stubCreateRecords,

                                             stubGetRecord,
                                             stubCreateRecord
                                         }) => {
    return class DummyDataClient {
        constructor(type) {
            this.type = type;
        }

        async getRecords(params) {
            return stubGetRecords(params);
        }

        async getRecordCount(params) {
            return stubGetRecordCount(params);
        }

        async createRecords(posts) {
            return stubCreateRecords(posts);
        }

        async getRecord(params) {
            return stubGetRecord(params);
        }

        async createRecord(post) {
            return stubCreateRecord(post);
        }
    };
};

export default DummyDataClientGenerator;
