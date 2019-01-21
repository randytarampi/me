import DataSource from "../../src/lib/dataSource";

export const DummyDataSourceGenerator = ({
                                             stubType,

                                             stubBeforeRecordsGetter,
                                             stubRecordsGetter,
                                             stubAfterRecordsGetter,

                                             stubAllRecordsGetter,

                                             stubBeforeRecordGetter,
                                             stubRecordGetter,
                                             stubAfterRecordGetter,

                                             stubInstanceToRecord
                                         }) => {

    return class DummyDataSource extends DataSource {
        static get type() {
            return stubType ? stubType : super.type;
        }

        static instanceToRecord(postJson) {
            return stubInstanceToRecord ? stubInstanceToRecord(postJson) : super.instanceToRecord(postJson);
        }

        async beforeRecordsGetter(params) {
            return stubBeforeRecordsGetter ? stubBeforeRecordsGetter(params) : super.beforeRecordsGetter(params);
        }

        async recordsGetter(params) {
            return stubRecordsGetter ? stubRecordsGetter(params) : super.recordsGetter(params);
        }

        async afterRecordsGetter(posts, params) {
            return stubAfterRecordsGetter ? stubAfterRecordsGetter(posts, params) : super.afterRecordsGetter(posts, params);
        }

        async allRecordsGetter(posts, params) {
            return stubAllRecordsGetter ? stubAllRecordsGetter(posts, params) : super.allRecordsGetter(posts, params);
        }

        async beforeRecordGetter(postId, params) {
            return stubBeforeRecordGetter ? stubBeforeRecordGetter(postId, params) : super.beforeRecordGetter(postId, params);
        }

        async recordGetter(postId, params) {
            return stubRecordGetter ? stubRecordGetter(postId, params) : super.recordGetter(postId, params);
        }

        async afterRecordGetter(post, params) {
            return stubAfterRecordGetter ? stubAfterRecordGetter(post, params) : super.afterRecordGetter(post, params);
        }
    };
};

export default DummyDataSourceGenerator;
