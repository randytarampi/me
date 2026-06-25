const DummyCacheClientGenerator = require("./dummyCacheClientGenerator.js");
const DummyCachedDataSourceGenerator = require("./dummyCachedDataSourceGenerator.js");
const DummyDataClientGenerator = require("./dummyDataClientGenerator.js");
const DummyDataSourceGenerator = require("./dummyDataSourceGenerator.js");

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

module.exports = dummyClassesGenerator;
module.exports.dummyClassesGenerator = dummyClassesGenerator;
module.exports.default = module.exports;
