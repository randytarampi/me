import CacheClient from "../../lib/cacheClient";
import DummyDataClientGenerator from "./dummyDataClientGenerator";

export default ({
                    dummyDataClientStubs
                }) => {
    const DummyDataClient = DummyDataClientGenerator(dummyDataClientStubs);

    return class DummyCacheClient extends CacheClient {
        constructor(type, dataClient = new DummyDataClient()) {
            super(type, dataClient);
        }
    };
};
