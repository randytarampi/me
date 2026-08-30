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
        const RssFeedStub = sinon.stub().returns(stubFeed);
        const buildRssResponseStub = sinon.stub().callsFake(({rss}, headers) => {
            expect(rss).to.eql(stubFeed);
            expect(headers).to.eql(stubHeaders);
            return stubResponse;
        });
        const returnErrorResponseStub = sinon.stub().returns(sinon.stub());

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

        expect(result).to.eql(stubResponse);
        expect(parseHeadersStub.calledOnce).to.eql(true);
        expect(parseQuerystringParametersStub.calledOnce).to.eql(true);
        expect(configureEnvironmentStub.calledOnce).to.eql(true);
        expect(getPostsForParsedQuerystringParametersStub.calledOnce).to.eql(true);
        expect(RssFeedStub.calledOnce).to.eql(true);
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
        const RssFeedStub = sinon.stub().throws(stubError);
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

    it("returns early after being warmed", async function () {
        const stubEvent = {source: "serverless-plugin-warmup"};
        const stubContext = {};

        const parseHeadersStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const parseQuerystringParametersStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const configureEnvironmentStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const getPostsForParsedQuerystringParametersStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const RssFeedStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const buildRssResponseStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const returnErrorResponseStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));

        const getPostsRss = await loadHandler({
            "../../../../../../src/serverless/util/request/parseHeaders.js": {default: parseHeadersStub},
            "../../../../../../src/serverless/util/request/parseQuerystringParameters.js": {default: parseQuerystringParametersStub},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js": {default: getPostsForParsedQuerystringParametersStub},
            "../../../../../../src/lib/rssFeed.js": {default: RssFeedStub},
            "../../../../../../src/serverless/util/response/buildRssResponse.js": {default: buildRssResponseStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        const lambdaIsWarm = await getPostsRss(stubEvent, stubContext);

        expect(lambdaIsWarm).to.match(/Lambda is warm!/);
        expect(parseHeadersStub.notCalled).to.eql(true);
        expect(parseQuerystringParametersStub.notCalled).to.eql(true);
        expect(configureEnvironmentStub.notCalled).to.eql(true);
        expect(getPostsForParsedQuerystringParametersStub.notCalled).to.eql(true);
        expect(buildRssResponseStub.notCalled).to.eql(true);
        expect(returnErrorResponseStub.notCalled).to.eql(true);
    });
});
