import {expect} from "chai";
import proxyquire from "proxyquire";
import testLetterJson from "../../../../../src/letters/letter.json";
import Letter from "../../../../../src/lib/letter";

describe("fetchLetter", function () {
    it("delegates to `fetch` with the correct parameters", function () {
        const stubVariant = "fetch!";
        const stubLetterResponse = {
            json: () => {
                return Promise.resolve(testLetterJson);
            }
        };

        const proxyquiredFetchLetter = proxyquire("../../../../../src/lib/api/fetchLetter", {
            "isomorphic-fetch": (fetchUrl, options) => {
                expect(fetchUrl).to.match(/\/fetch!/);

                expect(options.headers).to.eql({
                    "Accept": "application/json",
                    "Accept-Charset": "utf-8"
                });

                return Promise.resolve(stubLetterResponse);
            }
        });

        return proxyquiredFetchLetter.default(stubVariant)
            .then(letterResponse => {
                expect(letterResponse.toJSON()).to.eql(Letter.fromJSON({
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

        const proxyquiredFetchLetter = proxyquire("../../../../../src/lib/api/fetchLetter", {
            "isomorphic-fetch": (fetchUrl, options) => {
                expect(fetchUrl).to.match(/\/fetch!/);

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
