import {expect} from "chai";
import sinon from "sinon";
import {freshRequire} from "../../../../../lib/freshRequire";

afterEach(function () {
    sinon.restore();
});

describe("cachePosts", function () {
    it("delegates to `cachePosts` (API trigger)", async function () {
        const stubEvent = {queryStringParameters: {woof: "meow"}};
        const stubContext = {};
        const stubSortedPosts = ["meow"];
        const stubResponse = "woof";

        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const parseQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/request/parseQuerystringParameters.js");
        sinon.stub(parseQuerystringParametersModule, "default").returns({woof: "meow"});

        const parseQueryStringParametersIntoSearchParamsModule = freshRequire("../../../../../../src/serverless/util/parseQueryStringParametersIntoSearchParams.js");
        sinon.stub(parseQueryStringParametersIntoSearchParamsModule, "default").callsFake(() => () => ({woof: "meow"}));

        const cachePostsModule = freshRequire("../../../../../../src/lib/sources/cachePosts.js");
        sinon.stub(cachePostsModule, "default").resolves(stubSortedPosts);

        const serverlessModule = freshRequire("@randy.tarampi/serverless");
        sinon.stub(serverlessModule, "responseBuilder").callsFake(sortedPosts => {
            expect(sortedPosts).to.eql(stubSortedPosts);
            return stubResponse;
        });

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        sinon.stub(returnErrorResponseModule, "default").returns(sinon.stub());

        const cachePostsHandler = freshRequire("../../../../../../src/serverless/handlers/cachePosts").default;

        await new Promise((resolve, reject) => {
            const stubCallback = (error, result) => {
                try {
                    expect(error).to.not.be.ok;
                    expect(result).to.eql(stubResponse);
                    expect(configureEnvironmentModule.default.calledOnce).to.eql(true);
                    expect(parseQuerystringParametersModule.default.calledOnce).to.eql(true);
                    expect(parseQueryStringParametersIntoSearchParamsModule.default.calledOnce).to.eql(true);
                    expect(cachePostsModule.default.calledOnce).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            cachePostsHandler(stubEvent, stubContext, stubCallback);
        });
    });

    it("delegates to `cachePosts` (scheduled event)", async function () {
        const stubEvent = {woof: "meow"};
        const stubContext = {};
        const stubSortedPosts = ["meow"];
        const stubResponse = "woof";

        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const parseQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/request/parseQuerystringParameters.js");
        sinon.stub(parseQuerystringParametersModule, "default").returns({woof: "meow"});

        const parseQueryStringParametersIntoSearchParamsModule = freshRequire("../../../../../../src/serverless/util/parseQueryStringParametersIntoSearchParams.js");
        sinon.stub(parseQueryStringParametersIntoSearchParamsModule, "default").callsFake(() => () => ({woof: "meow"}));

        const cachePostsModule = freshRequire("../../../../../../src/lib/sources/cachePosts.js");
        sinon.stub(cachePostsModule, "default").resolves(stubSortedPosts);

        const serverlessModule = freshRequire("@randy.tarampi/serverless");
        sinon.stub(serverlessModule, "responseBuilder").callsFake(sortedPosts => {
            expect(sortedPosts).to.eql(stubSortedPosts);
            return stubResponse;
        });

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        sinon.stub(returnErrorResponseModule, "default").returns(sinon.stub());

        const cachePostsHandler = freshRequire("../../../../../../src/serverless/handlers/cachePosts").default;

        await new Promise((resolve, reject) => {
            const stubCallback = (error, result) => {
                try {
                    expect(error).to.not.be.ok;
                    expect(result).to.eql(stubResponse);
                    expect(configureEnvironmentModule.default.calledOnce).to.eql(true);
                    expect(parseQuerystringParametersModule.default.calledOnce).to.eql(true);
                    expect(parseQueryStringParametersIntoSearchParamsModule.default.calledOnce).to.eql(true);
                    expect(cachePostsModule.default.calledOnce).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            cachePostsHandler(stubEvent, stubContext, stubCallback);
        });
    });

    it("`returnErrorResponse` on error", async function () {
        const stubEvent = {queryStringParameters: {woof: "meow"}};
        const stubContext = {};
        const stubError = new Error("woof");

        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const parseQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/request/parseQuerystringParameters.js");
        sinon.stub(parseQuerystringParametersModule, "default").returns({woof: "meow"});

        const parseQueryStringParametersIntoSearchParamsModule = freshRequire("../../../../../../src/serverless/util/parseQueryStringParametersIntoSearchParams.js");
        sinon.stub(parseQueryStringParametersIntoSearchParamsModule, "default").callsFake(() => () => ({woof: "meow"}));

        const cachePostsModule = freshRequire("../../../../../../src/lib/sources/cachePosts.js");
        sinon.stub(cachePostsModule, "default").rejects(stubError);

        const serverlessModule = freshRequire("@randy.tarampi/serverless");
        sinon.stub(serverlessModule, "responseBuilder").callsFake(() => {
            throw new Error("Wtf? This should've thrown");
        });

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        const errorHandlerStub = sinon.stub();
        sinon.stub(returnErrorResponseModule, "default").callsFake(() => errorHandlerStub);

        const cachePostsHandler = freshRequire("../../../../../../src/serverless/handlers/cachePosts").default;

        await new Promise((resolve, reject) => {
            const stubCallback = () => {
                throw new Error("Wtf? This should've thrown");
            };

            const stubErrorCallback = error => {
                try {
                    expect(error.message).to.eql(stubError.message);
                    expect(configureEnvironmentModule.default.calledOnce).to.eql(true);
                    expect(parseQuerystringParametersModule.default.calledOnce).to.eql(true);
                    expect(parseQueryStringParametersIntoSearchParamsModule.default.calledOnce).to.eql(true);
                    expect(cachePostsModule.default.calledOnce).to.eql(true);
                    expect(returnErrorResponseModule.default.calledOnce).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            errorHandlerStub.callsFake(stubErrorCallback);
            cachePostsHandler(stubEvent, stubContext, stubCallback);
        });
    });
});
