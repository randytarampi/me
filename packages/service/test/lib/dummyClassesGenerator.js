import DummyCacheClientGenerator from "./dummyCacheClientGenerator.js";
import DummyCachedDataSourceGenerator from "./dummyCachedDataSourceGenerator.js";
import DummyDataClientGenerator from "./dummyDataClientGenerator.js";
import DummyDataSourceGenerator from "./dummyDataSourceGenerator.js";

const dummyClassesGenerator = ({
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

                                          stubInstanceToRecord,

                                          stubGetRecords,
                                          stubCreateRecords,

                                          stubGetRecord,
                                          stubCreateRecord
                                      }) => {
    return {
        DummyDataSource: DummyDataSourceGenerator({
            stubType,

            stubBeforeRecordsGetter,
            stubRecordsGetter,
            stubAfterRecordsGetter,

            stubAllRecordsGetter,

            stubBeforeRecordGetter,
            stubRecordGetter,
            stubAfterRecordGetter,

            stubInstanceToRecord
        }),
        DummyCachedDataSource: DummyCachedDataSourceGenerator({
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
        }),
        DummyDataClient: DummyDataClientGenerator({
            stubGetRecords,
            stubCreateRecords,

            stubGetRecord,
            stubCreateRecord
        }),
        DummyCacheClient: DummyCacheClientGenerator({
            dummyDataClientStubs: {
                stubGetRecords,
                stubCreateRecords,

                stubGetRecord,
                stubCreateRecord
            }
        })
    };
};

export default dummyClassesGenerator;

export {dummyClassesGenerator};
