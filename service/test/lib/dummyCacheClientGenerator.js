import CacheClient from "../../src/lib/cacheClient.js";
import DummyDataClientGenerator from "./dummyDataClientGenerator.js";

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

export default DummyCacheClientGenerator;

export {DummyCacheClientGenerator};
