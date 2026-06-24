import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import {freshRequire} from "../../../../../lib/freshRequire";

afterEach(function () {
    sinon.restore();
});

describe("getPosts", function () {
    it("delegates to `getPostsForParsedQuerystringParameters`", async function () {
        const stubEvent = {};
        const stubContext = {};
        const stubPost = Post.fromJS({id: "woof", dateCreated: new Date(1900, 0, 1)});
        const stubPhoto = Photo.fromJS({id: "meow", dateCreated: new Date(1900, 0, 1)});
        const stubPosts = [stubPhoto, stubPost];
        const stubHeaders = {};
        const stubQuerystringParameters = {};
        const expectedPostsResult = {
            posts: stubPosts,
            total: {
                global: stubPosts.length,
                [Post.type]: 1,
                [Photo.type]: 1
            },
            first: {
                global: stubPost,
                [Post.type]: stubPost,
                [Photo.type]: stubPhoto
            },
            last: {
                global: stubPhoto,
                [Post.type]: stubPost,
                [Photo.type]: stubPhoto
            }
        };
        const stubResponse = "meow";

        const parseHeadersModule = freshRequire("../../../../../../src/serverless/util/request/parseHeaders.js");
        sinon.stub(parseHeadersModule, "default").returns(stubHeaders);

        const parseQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/request/parseQuerystringParameters.js");
        sinon.stub(parseQuerystringParametersModule, "default").returns(stubQuerystringParameters);

        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const getPostsForParsedQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js");
        sinon.stub(getPostsForParsedQuerystringParametersModule, "default").resolves({
            first: {
                global: stubPost,
                [Post.type]: stubPost,
                [Photo.type]: stubPhoto
            },
            last: {
                global: stubPhoto,
                [Post.type]: stubPost,
                [Photo.type]: stubPhoto
            },
            posts: stubPosts,
            total: {
                global: stubPosts.length,
                [stubPhoto.constructor.name]: 1,
                [stubPost.constructor.name]: 1
            }
        });

        const buildPostsResponseModule = freshRequire("../../../../../../src/serverless/util/response/buildPostsResponse.js");
        sinon.stub(buildPostsResponseModule, "default").callsFake((postsResult, headers) => {
            expect(headers).to.eql(stubHeaders);
            expect(postsResult).to.eql(expectedPostsResult);
            return stubResponse;
        });

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        const errorHandlerStub = sinon.stub().returns(undefined);
        sinon.stub(returnErrorResponseModule, "default").returns(errorHandlerStub);

        const getPosts = freshRequire("../../../../../../src/serverless/handlers/getPosts").default;
        await new Promise((resolve, reject) => {
            const stubCallback = (error, postsResult) => {
                try {
                    expect(error).to.not.be.ok;
                    expect(postsResult).to.eql(stubResponse);
                    expect(parseHeadersModule.default.calledOnce).to.eql(true);
                    expect(parseQuerystringParametersModule.default.calledOnce).to.eql(true);
                    expect(configureEnvironmentModule.default.calledOnce).to.eql(true);
                    expect(getPostsForParsedQuerystringParametersModule.default.calledOnce).to.eql(true);
                    expect(buildPostsResponseModule.default.calledOnce).to.eql(true);
                    expect(returnErrorResponseModule.default.calledOnce).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            getPosts(stubEvent, stubContext, stubCallback);
        });
    });

    it("`returnErrorResponse` on error", async function () {
        const stubEvent = {};
        const stubContext = {};
        const stubPost = Post.fromJS({id: "woof", dateCreated: new Date(1900, 0, 1)});
        const stubPhoto = Photo.fromJS({id: "meow", dateCreated: new Date(1900, 0, 1)});
        const stubHeaders = {};
        const stubQuerystringParameters = {};
        const stubError = new Error("woof");

        const parseHeadersModule = freshRequire("../../../../../../src/serverless/util/request/parseHeaders.js");
        sinon.stub(parseHeadersModule, "default").returns(stubHeaders);

        const parseQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/request/parseQuerystringParameters.js");
        sinon.stub(parseQuerystringParametersModule, "default").returns(stubQuerystringParameters);

        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const getPostsForParsedQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js");
        sinon.stub(getPostsForParsedQuerystringParametersModule, "default").resolves({
            first: {
                global: stubPost,
                [Post.type]: stubPost,
                [Photo.type]: stubPhoto
            },
            last: {
                global: stubPhoto,
                [Post.type]: stubPost,
                [Photo.type]: stubPhoto
            },
            posts: [stubPost, stubPhoto],
            total: {
                global: 2,
                [stubPhoto.constructor.name]: 1,
                [stubPost.constructor.name]: 1
            }
        });

        const buildPostsResponseModule = freshRequire("../../../../../../src/serverless/util/response/buildPostsResponse.js");
        sinon.stub(buildPostsResponseModule, "default").throws(stubError);

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        const errorHandlerStub = sinon.stub().returns(undefined);
        sinon.stub(returnErrorResponseModule, "default").callsFake(() => errorHandlerStub);

        const getPosts = freshRequire("../../../../../../src/serverless/handlers/getPosts").default;
        await new Promise((resolve, reject) => {
            const stubCallback = () => {
                throw new Error("Wtf? This should've thrown");
            };

            const stubErrorCallback = error => {
                try {
                    expect(error.message).to.eql(stubError.message);
                    expect(parseHeadersModule.default.calledOnce).to.eql(true);
                    expect(parseQuerystringParametersModule.default.calledOnce).to.eql(true);
                    expect(configureEnvironmentModule.default.calledOnce).to.eql(true);
                    expect(getPostsForParsedQuerystringParametersModule.default.calledOnce).to.eql(true);
                    expect(buildPostsResponseModule.default.calledOnce).to.eql(true);
                    expect(returnErrorResponseModule.default.calledOnce).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            errorHandlerStub.callsFake(stubErrorCallback);
            getPosts(stubEvent, stubContext, stubCallback);
        });
    });

    it("`returnErrorResponse` on parse error", async function () {
        const stubEvent = {};
        const stubContext = {};
        const stubHeaders = {};
        const stubError = new Error("woof");

        const parseHeadersModule = freshRequire("../../../../../../src/serverless/util/request/parseHeaders.js");
        sinon.stub(parseHeadersModule, "default").returns(stubHeaders);

        const parseQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/request/parseQuerystringParameters.js");
        sinon.stub(parseQuerystringParametersModule, "default").throws(stubError);

        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const getPostsForParsedQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js");
        sinon.stub(getPostsForParsedQuerystringParametersModule, "default").throws(new Error("Wtf? This should've thrown"));

        const buildPostsResponseModule = freshRequire("../../../../../../src/serverless/util/response/buildPostsResponse.js");
        sinon.stub(buildPostsResponseModule, "default").throws(new Error("Wtf? This should've thrown"));

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        const errorHandlerStub = sinon.stub().returns(undefined);
        sinon.stub(returnErrorResponseModule, "default").callsFake(() => errorHandlerStub);

        const getPosts = freshRequire("../../../../../../src/serverless/handlers/getPosts").default;
        await new Promise((resolve, reject) => {
            const stubCallback = () => {
                throw new Error("Wtf? This should've thrown");
            };

            const stubErrorCallback = error => {
                try {
                    expect(error.message).to.eql(stubError.message);
                    expect(parseHeadersModule.default.calledOnce).to.eql(true);
                    expect(parseQuerystringParametersModule.default.calledOnce).to.eql(true);
                    expect(configureEnvironmentModule.default.notCalled).to.eql(true);
                    expect(getPostsForParsedQuerystringParametersModule.default.notCalled).to.eql(true);
                    expect(buildPostsResponseModule.default.notCalled).to.eql(true);
                    expect(returnErrorResponseModule.default.calledOnce).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            errorHandlerStub.callsFake(stubErrorCallback);
            getPosts(stubEvent, stubContext, stubCallback);
        });
    });

    it("returns early after being warmed", async function () {
        const stubEvent = {source: "serverless-plugin-warmup"};
        const stubContext = {};

        const getPostsForParsedQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js");
        sinon.stub(getPostsForParsedQuerystringParametersModule, "default").throws(new Error("Wtf? This should've thrown"));

        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        sinon.stub(configureEnvironmentModule, "default").throws(new Error("Wtf? This should've thrown"));

        const parseHeadersModule = freshRequire("../../../../../../src/serverless/util/request/parseHeaders.js");
        sinon.stub(parseHeadersModule, "default").throws(new Error("Wtf? This should've thrown"));

        const parseQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/request/parseQuerystringParameters.js");
        sinon.stub(parseQuerystringParametersModule, "default").throws(new Error("Wtf? This should've thrown"));

        const buildPostsResponseModule = freshRequire("../../../../../../src/serverless/util/response/buildPostsResponse.js");
        sinon.stub(buildPostsResponseModule, "default").throws(new Error("Wtf? This should've thrown"));

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        sinon.stub(returnErrorResponseModule, "default").throws(new Error("Wtf? This should've thrown"));

        const getPosts = freshRequire("../../../../../../src/serverless/handlers/getPosts").default;
        await new Promise((resolve, reject) => {
            const stubCallback = (error, lambdaIsWarm) => {
                try {
                    expect(error).to.not.be.ok;
                    expect(lambdaIsWarm).to.match(/Lambda is warm!/);
                    expect(parseHeadersModule.default.notCalled).to.eql(true);
                    expect(parseQuerystringParametersModule.default.notCalled).to.eql(true);
                    expect(configureEnvironmentModule.default.notCalled).to.eql(true);
                    expect(getPostsForParsedQuerystringParametersModule.default.notCalled).to.eql(true);
                    expect(buildPostsResponseModule.default.notCalled).to.eql(true);
                    expect(returnErrorResponseModule.default.notCalled).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            getPosts(stubEvent, stubContext, stubCallback);
        });
    });
});
