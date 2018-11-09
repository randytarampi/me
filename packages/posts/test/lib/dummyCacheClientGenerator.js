import CacheClient from "../../src/lib/cacheClient";
import DummyDataClientGenerator from "./dummyDataClientGenerator";

export const DummyCacheClientGenerator = ({
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
