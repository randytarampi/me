import {expect} from "chai";
import sinon from "sinon";
import esmock from "../../../../../lib/esmock.js";

afterEach(function () {
    sinon.restore();
});

describe("getPostsRss", function () {
    const loadHandler = mocks => {
        return esmock("../../../../../../src/serverless/handlers/getPostsRss/index.js", import.meta.url, mocks).then(({default: getPostsRss}) => getPostsRss);
    };

    it("delegates to `getPostsForParsedQuerystringParameters`", async function () {
        const stubEvent = {};
        const stubContext = {};
        const stubHeaders = {};
        const stubQuerystringParameters = {};
        const stubPost = {toRss: sinon.stub().returns({title: "woof"})};
        const stubPosts = [stubPost];
        const stubFeed = {item: sinon.stub()};
        const stubResponse = "meow";

        const parseHeadersStub = sinon.stub().returns(stubHeaders);
        const parseQuerystringParametersStub = sinon.stub().returns(stubQuerystringParameters);
        const configureEnvironmentStub = sinon.stub().resolves();
        const getPostsForParsedQuerystringParametersStub = sinon.stub().resolves({posts: stubPosts});
        // NOTE-RT: the handler calls `augmentUrlWithTrackingParams` from `@randy.tarampi/js` with
        // `process.env.ME_PERSON_IMAGE` (undefined in tests) before reaching `new RssFeed()`.
        // Mocking the package prevents a validation error in `queryString.parseUrl(undefined)`.
        const augmentUrlWithTrackingParamsStub = sinon.stub().returnsArg(0);
        // NOTE-RT: `RssFeed` is a class (extends `rss` npm package), so esmock needs a class
        // constructor, not a plain sinon stub — `new RssFeed({...})` would return `undefined`
        // with a stub and crash on `feed.item()`.
        class RssFeedMock {
            constructor() {
                Object.assign(this, stubFeed);
            }
        }
        const buildRssResponseStub = sinon.stub().callsFake(({rss}, headers) => {
            expect(rss).to.eql(stubFeed);
            expect(headers).to.eql(stubHeaders);
            return stubResponse;
        });
        // NOTE-RT: the handler calls `returnErrorResponse(event, context)` to get an error handler,
        // then calls `errorHandler(error)` to handle errors. The mock returns a stub that itself
        // returns `undefined` so the success path never exercises the error handler.
        const errorHandlerStub = sinon.stub();
        const returnErrorResponseStub = sinon.stub().returns(errorHandlerStub);

        const getPostsRss = await loadHandler({
            "@randy.tarampi/js": {augmentUrlWithTrackingParams: augmentUrlWithTrackingParamsStub},
            "../../../../../../src/serverless/util/request/parseHeaders.js": {default: parseHeadersStub},
            "../../../../../../src/serverless/util/request/parseQuerystringParameters.js": {default: parseQuerystringParametersStub},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js": {default: getPostsForParsedQuerystringParametersStub},
            "../../../../../../src/lib/rssFeed.js": {default: RssFeedMock},
            "../../../../../../src/serverless/util/response/buildRssResponse.js": {default: buildRssResponseStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        const result = await getPostsRss(stubEvent, stubContext);

        expect(result).to.eql(stubResponse);
        expect(parseHeadersStub.calledOnce).to.eql(true);
        expect(parseQuerystringParametersStub.calledOnce).to.eql(true);
        expect(configureEnvironmentStub.calledOnce).to.eql(true);
        expect(getPostsForParsedQuerystringParametersStub.calledOnce).to.eql(true);
        expect(stubPost.toRss.calledOnce).to.eql(true);
        expect(stubFeed.item.calledOnce).to.eql(true);
        expect(buildRssResponseStub.calledOnce).to.eql(true);
        expect(returnErrorResponseStub.calledOnce).to.eql(true);
    });

    it("`returnErrorResponse` on error", async function () {
        const stubEvent = {};
        const stubContext = {};
        const stubHeaders = {};
        const stubQuerystringParameters = {};
        const stubError = new Error("woof");

        const parseHeadersStub = sinon.stub().returns(stubHeaders);
        const parseQuerystringParametersStub = sinon.stub().returns(stubQuerystringParameters);
        const configureEnvironmentStub = sinon.stub().resolves();
        const getPostsForParsedQuerystringParametersStub = sinon.stub().resolves({posts: []});
        // NOTE-RT: same as test 1 — `augmentUrlWithTrackingParams` throws on undefined
        // `process.env.ME_PERSON_IMAGE` before reaching `new RssFeed()`.
        const augmentUrlWithTrackingParamsStub = sinon.stub().returnsArg(0);
        // NOTE-RT: `RssFeed` is a class — the mock must be a constructor that throws,
        // not a plain sinon stub, so `new RssFeed({...})` actually throws in the handler.
        class RssFeedMock {
            constructor() {
                throw stubError;
            }
        }
        const buildRssResponseStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const errorHandlerStub = sinon.stub().returns("error-response");
        const returnErrorResponseStub = sinon.stub().returns(errorHandlerStub);

        const getPostsRss = await loadHandler({
            "@randy.tarampi/js": {augmentUrlWithTrackingParams: augmentUrlWithTrackingParamsStub},
            "../../../../../../src/serverless/util/request/parseHeaders.js": {default: parseHeadersStub},
            "../../../../../../src/serverless/util/request/parseQuerystringParameters.js": {default: parseQuerystringParametersStub},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js": {default: getPostsForParsedQuerystringParametersStub},
            "../../../../../../src/lib/rssFeed.js": {default: RssFeedMock},
            "../../../../../../src/serverless/util/response/buildRssResponse.js": {default: buildRssResponseStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        const result = await getPostsRss(stubEvent, stubContext);

        expect(result).to.eql("error-response");
        expect(errorHandlerStub.calledOnce).to.eql(true);
        expect(errorHandlerStub.firstCall.args[0].message).to.eql(stubError.message);
        expect(parseHeadersStub.calledOnce).to.eql(true);
        expect(parseQuerystringParametersStub.calledOnce).to.eql(true);
        expect(configureEnvironmentStub.calledOnce).to.eql(true);
        expect(getPostsForParsedQuerystringParametersStub.calledOnce).to.eql(true);
        expect(buildRssResponseStub.notCalled).to.eql(true);
        expect(returnErrorResponseStub.calledOnce).to.eql(true);
    });

    it("`returnErrorResponse` on parse error", async function () {
        const stubEvent = {};
        const stubContext = {};
        const stubHeaders = {};
        const stubError = new Error("woof");

        const parseHeadersStub = sinon.stub().returns(stubHeaders);
        const parseQuerystringParametersStub = sinon.stub().throws(stubError);
        const configureEnvironmentStub = sinon.stub().resolves();
        const getPostsForParsedQuerystringParametersStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const RssFeedStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const buildRssResponseStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const errorHandlerStub = sinon.stub().returns("error-response");
        const returnErrorResponseStub = sinon.stub().returns(errorHandlerStub);

        const getPostsRss = await loadHandler({
            "../../../../../../src/serverless/util/request/parseHeaders.js": {default: parseHeadersStub},
            "../../../../../../src/serverless/util/request/parseQuerystringParameters.js": {default: parseQuerystringParametersStub},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js": {default: getPostsForParsedQuerystringParametersStub},
            "../../../../../../src/lib/rssFeed.js": {default: RssFeedStub},
            "../../../../../../src/serverless/util/response/buildRssResponse.js": {default: buildRssResponseStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        const result = await getPostsRss(stubEvent, stubContext);

        expect(result).to.eql("error-response");
        expect(errorHandlerStub.calledOnce).to.eql(true);
        expect(errorHandlerStub.firstCall.args[0].message).to.eql(stubError.message);
        expect(parseHeadersStub.calledOnce).to.eql(true);
        expect(parseQuerystringParametersStub.calledOnce).to.eql(true);
        expect(configureEnvironmentStub.notCalled).to.eql(true);
        expect(getPostsForParsedQuerystringParametersStub.notCalled).to.eql(true);
        expect(returnErrorResponseStub.calledOnce).to.eql(true);
    });

});
