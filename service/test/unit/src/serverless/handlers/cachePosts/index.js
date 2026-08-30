import {expect} from "chai";
import sinon from "sinon";
import {responseBuilder} from "@randy.tarampi/serverless";
import esmock from "../../../../../lib/esmock.js";

// NOTE-RT: `@randy.tarampi/serverless`'s built entry point uses a doubly-nested dynamic re-export
// pattern (`Object.keys(...).forEach(...)` + `Object.defineProperty` getters, two levels deep) that
// `esmock` cannot statically resolve, so `responseBuilder` can't be intercepted/mocked here. Instead,
// the real `responseBuilder` is used to compute the expected result for assertions.

afterEach(function () {
    sinon.restore();
});

describe("cachePosts", function () {
    it("delegates to `cachePosts` (API trigger)", async function () {
        const originalFlickrApiKey = process.env.FLICKR_API_KEY;
        process.env.FLICKR_API_KEY = "flickr-key";
        const stubEvent = {queryStringParameters: {woof: "meow"}};
        const stubContext = {};
        const stubSortedPosts = ["meow"];

        const stubConfigureEnvironment = sinon.stub().resolves();
        const stubParseQuerystringParameters = sinon.stub().returns({woof: "meow"});
        const stubParseQueryStringParametersIntoSearchParams = sinon.stub().callsFake(() => () => ({woof: "meow"}));
        const stubCachePosts = sinon.stub().resolves(stubSortedPosts);
        const stubReturnErrorResponse = sinon.stub().returns(sinon.stub());
        const expectedResponse = responseBuilder(stubSortedPosts);

        const {default: cachePostsHandler} = await esmock("../../../../../../src/serverless/handlers/cachePosts/index.js", import.meta.url, {
            "../../../../../../src/lib/sources/cachePosts.js": {default: stubCachePosts},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: stubConfigureEnvironment},
            "../../../../../../src/serverless/util/parseQueryStringParametersIntoSearchParams.js": {default: stubParseQueryStringParametersIntoSearchParams},
            "../../../../../../src/serverless/util/request/parseQuerystringParameters.js": {default: stubParseQuerystringParameters},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: stubReturnErrorResponse}
        });

        const result = await cachePostsHandler(stubEvent, stubContext);

        expect(result).to.eql(expectedResponse);
        expect(stubConfigureEnvironment.calledOnce).to.eql(true);
        expect(stubParseQuerystringParameters.calledOnce).to.eql(true);
        expect(stubParseQueryStringParametersIntoSearchParams.calledOnce).to.eql(true);
        expect(stubCachePosts.calledOnce).to.eql(true);

        if (typeof originalFlickrApiKey === "undefined") {
            delete process.env.FLICKR_API_KEY;
        } else {
            process.env.FLICKR_API_KEY = originalFlickrApiKey;
        }
    });

    it("delegates to `cachePosts` (scheduled event)", async function () {
        const originalFlickrApiKey = process.env.FLICKR_API_KEY;
        process.env.FLICKR_API_KEY = "flickr-key";
        const stubEvent = {woof: "meow"};
        const stubContext = {};
        const stubSortedPosts = ["meow"];

        const stubConfigureEnvironment = sinon.stub().resolves();
        const stubParseQuerystringParameters = sinon.stub().returns({woof: "meow"});
        const stubParseQueryStringParametersIntoSearchParams = sinon.stub().callsFake(() => () => ({woof: "meow"}));
        const stubCachePosts = sinon.stub().resolves(stubSortedPosts);
        const stubReturnErrorResponse = sinon.stub().returns(sinon.stub());
        const expectedResponse = responseBuilder(stubSortedPosts);

        const {default: cachePostsHandler} = await esmock("../../../../../../src/serverless/handlers/cachePosts/index.js", import.meta.url, {
            "../../../../../../src/lib/sources/cachePosts.js": {default: stubCachePosts},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: stubConfigureEnvironment},
            "../../../../../../src/serverless/util/parseQueryStringParametersIntoSearchParams.js": {default: stubParseQueryStringParametersIntoSearchParams},
            "../../../../../../src/serverless/util/request/parseQuerystringParameters.js": {default: stubParseQuerystringParameters},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: stubReturnErrorResponse}
        });

        const result = await cachePostsHandler(stubEvent, stubContext);

        expect(result).to.eql(expectedResponse);
        expect(stubConfigureEnvironment.calledOnce).to.eql(true);
        expect(stubParseQuerystringParameters.calledOnce).to.eql(true);
        expect(stubParseQueryStringParametersIntoSearchParams.calledOnce).to.eql(true);
        expect(stubCachePosts.calledOnce).to.eql(true);

        if (typeof originalFlickrApiKey === "undefined") {
            delete process.env.FLICKR_API_KEY;
        } else {
            process.env.FLICKR_API_KEY = originalFlickrApiKey;
        }
    });

    it("`returnErrorResponse` on error", async function () {
        const originalFlickrApiKey = process.env.FLICKR_API_KEY;
        process.env.FLICKR_API_KEY = "flickr-key";
        const stubEvent = {queryStringParameters: {woof: "meow"}};
        const stubContext = {};
        const stubError = new Error("woof");

        const stubConfigureEnvironment = sinon.stub().resolves();
        const stubParseQuerystringParameters = sinon.stub().returns({woof: "meow"});
        const stubParseQueryStringParametersIntoSearchParams = sinon.stub().callsFake(() => () => ({woof: "meow"}));
        const stubCachePosts = sinon.stub().rejects(stubError);
        const errorHandlerStub = sinon.stub().returns("error-response");
        const stubReturnErrorResponse = sinon.stub().callsFake(() => errorHandlerStub);

        const {default: cachePostsHandler} = await esmock("../../../../../../src/serverless/handlers/cachePosts/index.js", import.meta.url, {
            "../../../../../../src/lib/sources/cachePosts.js": {default: stubCachePosts},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: stubConfigureEnvironment},
            "../../../../../../src/serverless/util/parseQueryStringParametersIntoSearchParams.js": {default: stubParseQueryStringParametersIntoSearchParams},
            "../../../../../../src/serverless/util/request/parseQuerystringParameters.js": {default: stubParseQuerystringParameters},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: stubReturnErrorResponse}
        });

        const result = await cachePostsHandler(stubEvent, stubContext);

        expect(result).to.eql("error-response");
        expect(errorHandlerStub.calledOnce).to.eql(true);
        expect(errorHandlerStub.firstCall.args[0].message).to.eql(stubError.message);
        expect(stubConfigureEnvironment.calledOnce).to.eql(true);
        expect(stubParseQuerystringParameters.calledOnce).to.eql(true);
        expect(stubParseQueryStringParametersIntoSearchParams.calledOnce).to.eql(true);
        expect(stubCachePosts.calledOnce).to.eql(true);
        expect(stubReturnErrorResponse.calledOnce).to.eql(true);

        if (typeof originalFlickrApiKey === "undefined") {
            delete process.env.FLICKR_API_KEY;
        } else {
            process.env.FLICKR_API_KEY = originalFlickrApiKey;
        }
    });
});
