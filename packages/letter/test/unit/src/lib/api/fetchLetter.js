import {expect} from "chai";
import testLetterJson from "../../../../../src/letters/letter.json";
import Letter from "../../../../../src/lib/letter.js";
import sinon from "sinon";
import fetchLetterApi from "../../../../../src/lib/api/fetchLetter.js";

describe("fetchLetter", function () {
    it("delegates to `fetch` with the correct parameters", async function () {
        const stubVariant = "fetch!";
        const stubLetterResponse = {
            json: () => {
                return Promise.resolve(testLetterJson);
            }
        };
        const fetchStub = sinon.stub(global, "fetch").callsFake((fetchUrl, options) => {
            expect(fetchUrl).to.match(/\/fetch!/);

            expect(options.headers).to.eql({
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            });

            return Promise.resolve(stubLetterResponse);
        });

        try {
            const letterResponse = await fetchLetterApi(stubVariant);
            expect(letterResponse.toJSON()).to.eql(Letter.fromJSON({
                ...testLetterJson,
                id: stubVariant
            }).toJSON());
        } finally {
            fetchStub.restore();
        }
    });

    it("returns `null` if `status` is `404`", async function () {
        const stubVariant = "fetch!";
        const stubLetterResponse = {
            status: 404,
            json: () => {
                return Promise.reject(new Error("Wtf? This shouldn't have thrown"));
            }
        };
        const fetchStub = sinon.stub(global, "fetch").callsFake((fetchUrl, options) => {
            expect(fetchUrl).to.match(/\/fetch!/);

            expect(options.headers).to.eql({
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            });

            return Promise.resolve(stubLetterResponse);
        });

        try {
            const letterResponse = await fetchLetterApi(stubVariant);
            expect(letterResponse).to.not.be.ok;
            expect(letterResponse).to.eql(null);
        } finally {
            fetchStub.restore();
        }
    });
});
