import {expect} from "chai";
import sinon from "sinon";
import AuthInfo from "../../../../../src/lib/authInfo";
import sources, {initializeSources} from "../../../../../src/lib/sources";
import {InstagramSource} from "../../../../../src/lib/sources/instagram/source";

describe("sources", function () {
    describe("initializeSources", function () {
        let stubInstagramAuthInfoClientGetter;

        beforeEach(function () {
            class StubInstagramAuthInfoClient {
                getRecords(searchParams) {
                    try {
                        expect(searchParams.source).to.eql(sources.instagram.type);

                        return Promise.resolve([]);
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            }

            stubInstagramAuthInfoClientGetter = sinon.stub(InstagramSource, "AuthInfoClient").get(() => StubInstagramAuthInfoClient);
        });

        afterEach(function () {
            stubInstagramAuthInfoClientGetter.restore();
        });

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

        it("returns filtered initialized sources", function () {
            stubInstagramAuthInfoClientGetter.restore();

            const stubAuthInfos = [
                new AuthInfo({id: "woof", token: "woof"}),
                new AuthInfo({id: "meow", token: "meow"})
            ];

            class StubInstagramAuthInfoClient {
                getRecords(searchParams) {
                    try {
                        expect(searchParams.source).to.eql(sources.instagram.type);

                        return Promise.resolve(stubAuthInfos);
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            }

            sinon.stub(InstagramSource, "AuthInfoClient").get(() => StubInstagramAuthInfoClient);

            const filter = [sources.instagram.type];

            return initializeSources(filter)
                .then(initializedSources => {
                    expect(initializedSources).to.have.length(stubAuthInfos.length);
                    expect(initializedSources[0]).to.be.instanceof(sources[filter]);
                    expect(initializedSources[0].authInfo).to.eql(stubAuthInfos[0]);
                    expect(initializedSources[1]).to.be.instanceof(sources[filter]);
                    expect(initializedSources[1].authInfo).to.eql(stubAuthInfos[1]);
                });
        });
    });
});
