import {expect} from "chai";
import proxyquire from "proxyquire";
import testLetterJson from "../../../../letters/default";
import Letter from "../../../../lib/letter";

describe("fetchLetter", function () {
    it("delegates to `fetch` with the correct parameters", function () {
        const stubVariant = "fetch!";
        const stubLetterResponse = {
            json: () => {
                return Promise.resolve(testLetterJson);
            }
        };

        const proxyquiredFetchLetter = proxyquire("../../../../lib/api/fetchLetter", {
            "isomorphic-fetch": (fetchUrl, options) => {
                expect(fetchUrl).to.be.ok;
                expect(fetchUrl).to.match(/\/fetch!/);

                expect(options).to.be.ok;
                expect(options.headers).to.be.ok;
                expect(options.headers).to.eql({
                    "Accept": "application/json",
                    "Accept-Charset": "utf-8"
                });

                return Promise.resolve(stubLetterResponse);
            }
        });

        return proxyquiredFetchLetter.default(stubVariant)
            .then(letterResponse => {
                expect(letterResponse).to.be.ok;
                expect(letterResponse.toJSON()).to.eql(Letter.fromResume({
                    ...testLetterJson,
                    id: stubVariant
                }).toJSON());
            });
    });

    it("returns `null` if `status` is `404`", function () {
        const stubVariant = "fetch!";
        const stubLetterResponse = {
            status: 404,
            json: () => {
                return Promise.reject(new Error("Wtf? This shouldn't have thrown"));
            }
        };

        const proxyquiredFetchLetter = proxyquire("../../../../lib/api/fetchLetter", {
            "isomorphic-fetch": (fetchUrl, options) => {
                expect(fetchUrl).to.be.ok;
                expect(fetchUrl).to.match(/\/fetch!/);

                expect(options).to.be.ok;
                expect(options.headers).to.be.ok;
                expect(options.headers).to.eql({
                    "Accept": "application/json",
                    "Accept-Charset": "utf-8"
                });

                return Promise.resolve(stubLetterResponse);
            }
        });

        return proxyquiredFetchLetter.default(stubVariant)
            .then(letterResponse => {
                expect(letterResponse).to.not.be.ok;
                expect(letterResponse).to.eql(null);
            });
    });
});
