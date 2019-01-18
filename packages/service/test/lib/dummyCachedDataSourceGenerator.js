import CachedDataSource from "../../src/lib/cachedDataSource";

export const DummyCachedDataSourceGenerator = ({
                                                   stubType,

                                                   stubBeforeRecordsGetter,
                                                   stubRecordsGetter,
                                                   stubAfterRecordsGetter,

                                                   stubAllRecordsGetter,

                                                   stubBeforeRecordGetter,
                                                   stubRecordGetter,
                                                   stubAfterRecordGetter,

                                                   stubBeforeCachedRecordsGetter,
                                                   stubCachedRecordsGetter,
                                                   stubAfterCachedRecordsGetter,

                                                   stubAllCachedRecordsGetter,

                                                   stubBeforeCachedRecordGetter,
                                                   stubCachedRecordGetter,
                                                   stubAfterCachedRecordGetter,

                                                   stubInstanceToRecord
                                               }) => {

    return class DummyCachedDataSource extends CachedDataSource {
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

        async beforeCachedRecordsGetter(params) {
            return stubBeforeCachedRecordsGetter ? stubBeforeCachedRecordsGetter(params) : super.beforeCachedRecordsGetter(params);
        }

        async cachedRecordsGetter(params) {
            return stubCachedRecordsGetter ? stubCachedRecordsGetter(params) : super.cachedRecordsGetter(params);
        }

        async afterCachedRecordsGetter(posts, params) {
            return stubAfterCachedRecordsGetter ? stubAfterCachedRecordsGetter(posts, params) : super.afterCachedRecordsGetter(posts, params);
        }

        async allCachedRecordsGetter(params) {
            return stubAllCachedRecordsGetter ? stubAllCachedRecordsGetter(params) : super.allCachedRecordsGetter(params);
        }

        async beforeCachedRecordGetter(postId, params) {
            return stubBeforeCachedRecordGetter ? stubBeforeCachedRecordGetter(postId, params) : super.beforeCachedRecordGetter(postId, params);
        }

        async cachedRecordGetter(postId, params) {
            return stubCachedRecordGetter ? stubCachedRecordGetter(postId, params) : super.cachedRecordGetter(postId, params);
        }

        async afterCachedRecordGetter(post, params) {
            return stubAfterCachedRecordGetter ? stubAfterCachedRecordGetter(post, params) : super.afterCachedRecordGetter(post, params);
        }
    };
};

export default DummyCachedDataSourceGenerator;
