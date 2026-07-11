import {expect} from "chai";
import sinon from "sinon";
import AuthInfo from "../../../../../src/lib/authInfo.js";
import sources, {initializeSources} from "../../../../../src/lib/sources/index.js";

describe("sources", function () {
    describe("initializeSources", function () {
        let originalFlickrApiKey;

        beforeEach(function () {
            originalFlickrApiKey = process.env.FLICKR_API_KEY;
            process.env.FLICKR_API_KEY = "flickr-key";
        });

        afterEach(function () {
            if (typeof originalFlickrApiKey === "undefined") {
                delete process.env.FLICKR_API_KEY;
            } else {
                process.env.FLICKR_API_KEY = originalFlickrApiKey;
            }
        });

        it("returns initialized sources", function () {
            return initializeSources()
                .then(initializedSources => {
                    const sourcesAsArray = Object.values(sources);

                    expect(initializedSources).to.have.length(sourcesAsArray.length);
                    initializedSources.forEach((initializedSource, index) => {
                        expect(initializedSource).to.be.instanceof(sourcesAsArray[index]);
                    });
                });
        });

        it("returns filtered initialized sources", function () {
            const filter = [sources.tumblr.type];

            return initializeSources(filter)
                .then(initializedSources => {
                    expect(initializedSources).to.have.length(filter.length);
                    expect(initializedSources[0]).to.be.instanceof(sources[filter]);
                });
        });

        it("returns all initialized sources if the filter is empty", function () {
            const filter = [];

            return initializeSources(filter)
                .then(initializedSources => {
                    const sourcesAsArray = Object.values(sources);

                    expect(initializedSources).to.have.length(sourcesAsArray.length);
                    initializedSources.forEach((initializedSource, index) => {
                        expect(initializedSource).to.be.instanceof(sourcesAsArray[index]);
                    });
                });
        });
    });
});