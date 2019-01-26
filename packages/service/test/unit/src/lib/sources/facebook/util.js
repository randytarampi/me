import {expect} from "chai";
import proxyquire from "proxyquire";
import queryString from "query-string";
import sinon from "sinon";
import * as facebookUtil from "../../../../../../src/lib/sources/facebook/util";

describe("util", function () {
    describe("buildFacebookApiEdge", function () {
        it("builds the expected edge URL", function () {
            const stubEdge = "woof";
            expect(facebookUtil.buildFacebookApiEdge(stubEdge)).to.eql(`${facebookUtil.FACEBOOK_API_URL}/${stubEdge}`);
        });
    });

    describe("buildFacebookApiUrl", function () {
        it("builds the expected URL", function () {
            const stubEdge = "woof";
            const stubAccessToken = "meow";
            const stubQueryParameters = {grr: true, rawr: 1};
            expect(facebookUtil.buildFacebookApiUrl(stubEdge, stubAccessToken, stubQueryParameters)).to.eql(`${facebookUtil.FACEBOOK_API_URL}/${stubEdge}?${queryString.stringify({access_token: stubAccessToken, ...stubQueryParameters})}`);
        });
    });

    describe("fetchFacebookEdge", function () {
        it("returns the response's JSON body", function () {
            const stubEdge = "woof";
            const stubAccessToken = "meow";
            const stubQueryParameters = {grr: true, rawr: 1};
            const stubFacebookResponseData = "arf";
            const stubFacebookResponse = {
                status: 200,
                json: sinon.stub().returns(Promise.resolve(stubFacebookResponseData))
            };
            const proxyquiredFacebookUtil = proxyquire("../../../../../../src/lib/sources/facebook/util", {
                "isomorphic-fetch": (fetchUrl, options) => {
                    expect(fetchUrl).to.eql(facebookUtil.buildFacebookApiUrl(stubEdge, stubAccessToken, stubQueryParameters));

                    expect(options.headers).to.eql({
                        Accept: "application/json",
                        "Accept-Charset": "utf-8"
                    });

                    return Promise.resolve(stubFacebookResponse);
                }
            });

            return proxyquiredFacebookUtil.fetchFacebookEdge(stubEdge, stubAccessToken, stubQueryParameters)
                .then(responseData => {
                    expect(responseData).to.eql(stubFacebookResponseData);
                });
        });

        it("handles errors", function () {
            const stubEdge = "woof";
            const stubAccessToken = "meow";
            const stubQueryParameters = {grr: true, rawr: 1};
            const stubFacebookResponseData = {
                error: {
                    message: "argh"
                }
            };
            const stubFacebookResponse = {
                status: 400,
                json: sinon.stub().returns(Promise.resolve(stubFacebookResponseData))
            };
            const proxyquiredFacebookUtil = proxyquire("../../../../../../src/lib/sources/facebook/util", {
                "isomorphic-fetch": (fetchUrl, options) => {
                    expect(fetchUrl).to.eql(facebookUtil.buildFacebookApiUrl(stubEdge, stubAccessToken, stubQueryParameters));

                    expect(options.headers).to.eql({
                        Accept: "application/json",
                        "Accept-Charset": "utf-8"
                    });

                    return Promise.resolve(stubFacebookResponse);
                }
            });

            return proxyquiredFacebookUtil.fetchFacebookEdge(stubEdge, stubAccessToken, stubQueryParameters)
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.eql(stubFacebookResponseData.error.message);
                });
        });
    });
});
