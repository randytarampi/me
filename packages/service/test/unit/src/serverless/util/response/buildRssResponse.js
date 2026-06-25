const {expect} = require("chai");
const sinon = require("sinon");
const versionHeader = require("../../../../../../src/serverless/util/request/headers/version.js");
const buildRssResponse = require("../../../../../../src/serverless/util/response/buildRssResponse.js");
const postsReponseBuilder = buildRssResponse;

describe("buildRssResponse", function () {
    describe("buildRssV1ResponseBody", function () {
        it("builds the expected response body", function () {
            const stubRssXml = "woof";
            const stubRssFeed = {
                xml: sinon.stub().returns(stubRssXml)
            };
            const response = postsReponseBuilder.buildRssV1ResponseBody(stubRssFeed);

            expect(response).to.eql(stubRssXml);
            expect(stubRssFeed.xml.calledOnce).to.eql(true);
        });
    });

    describe("default", function () {
        it("delegates to buildRssV1ResponseBody for no version", function () {
            const stubRssXml = "woof";
            const stubRssFeed = {
                xml: sinon.stub().returns(stubRssXml)
            };
            const stubParsedHeaders = {};

            const response = buildRssResponse({rss: stubRssFeed}, stubParsedHeaders);

            expect(response.body).to.eql(stubRssXml);
            expect(stubRssFeed.xml.calledOnce).to.eql(true);
        });

        it("delegates to buildRssV1ResponseBody for version 1", function () {
            const stubRssXml = "woof";
            const stubRssFeed = {
                xml: sinon.stub().returns(stubRssXml)
            };
            const stubParsedHeaders = {
                [versionHeader.headerName]: 1
            };

            const response = buildRssResponse({rss: stubRssFeed}, stubParsedHeaders);

            expect(response.body).to.eql(stubRssXml);
            expect(stubRssFeed.xml.calledOnce).to.eql(true);
        });

        it("throws if API version is unsupported", function () {
            const stubRssXml = "woof";
            const stubRssFeed = {
                xml: sinon.stub().returns(stubRssXml)
            };
            const stubParsedHeaders = {
                [versionHeader.headerName]: 999
            };

            try {
                buildRssResponse({rss: stubRssFeed}, stubParsedHeaders);
                throw new Error("Wtf? This should've thrown");
            } catch (error) {
                expect(error.message).to.match(/^`ME-API-VERSION` specifies unsupported version of `999`$/);
            }
        });
    });
});
module.exports.default = module.exports;
