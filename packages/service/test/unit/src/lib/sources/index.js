import {expect} from "chai";
import sources, {initializeSources} from "../../../../../src/lib/sources";

describe("sources", function () {
    describe("initializeSources", function () {
        it("returns initialized sources", function () {
            return initializeSources()
                .then(initializedSources => {
                    const sourcesAsArray = Object.values(sources); // NOTE-RT: No guarantee that they'll be in the same order per the spec, but I assume they would be.

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
                    const sourcesAsArray = Object.values(sources); // NOTE-RT: No guarantee that they'll be in the same order per the spec, but I assume they would be.

                    expect(initializedSources).to.have.length(sourcesAsArray.length);
                    initializedSources.forEach((initializedSource, index) => {
                        expect(initializedSource).to.be.instanceof(sourcesAsArray[index]);
                    });
                });
        });
    });
});
