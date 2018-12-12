import {expect} from "chai";
import sinon from "sinon";
import * as versionHeader from "../../../../../../src/serverless/util/request/headers/version";
import buildRssResponse, * as postsReponseBuilder
    from "../../../../../../src/serverless/util/response/buildRssResponse";

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

            const response = buildRssResponse(stubParsedHeaders)({rss: stubRssFeed});

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

            const response = buildRssResponse(stubParsedHeaders)({rss: stubRssFeed});

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
                buildRssResponse(stubParsedHeaders)({rss: stubRssFeed});
                throw new Error("Wtf? This should've thrown");
            } catch (error) {
                expect(error.message).to.match(/^`ME-API-VERSION` specifies unsupported version of `999`$/);
            }
        });
    });
});
