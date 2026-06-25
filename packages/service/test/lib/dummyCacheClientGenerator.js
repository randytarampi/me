const CacheClient = require("../../src/lib/cacheClient.js");
const DummyDataClientGenerator = require("./dummyDataClientGenerator.js");

const DummyCacheClientGenerator = ({
                    dummyDataClientStubs
                }) => {
    const DummyDataClient = DummyDataClientGenerator(dummyDataClientStubs);

    return class DummyCacheClient extends CacheClient {
        constructor(type, dataClient = new DummyDataClient()) {
            super(type, dataClient);
        }
    };
};

module.exports = DummyCacheClientGenerator;
module.exports.DummyCacheClientGenerator = DummyCacheClientGenerator;
module.exports.default = module.exports;
