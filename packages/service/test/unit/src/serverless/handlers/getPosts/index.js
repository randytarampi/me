const {Photo, Post} = require("@randy.tarampi/js");
const {expect} = require("chai");
const sinon = require("sinon");
const {freshRequire} = require("../../../../../lib/freshRequire.js");

afterEach(function () {
    sinon.restore();
});

describe("getPosts", function () {
    const loadHandler = () => {
        return freshRequire("../../../../../../src/serverless/handlers/getPosts/index.js").default;
    };

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

        const parseHeadersStub = sinon.stub().returns(stubHeaders);
        const parseQuerystringParametersStub = sinon.stub().returns(stubQuerystringParameters);
        const configureEnvironmentStub = sinon.stub().resolves();
        const getPostsForParsedQuerystringParametersStub = sinon.stub().resolves({
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
        const buildPostsResponseStub = sinon.stub().callsFake((postsResult, headers) => {
            expect(headers).to.eql(stubHeaders);
            expect(postsResult).to.eql(expectedPostsResult);
            return stubResponse;
        });
        const returnErrorResponseStub = sinon.stub().returns(sinon.stub());

        const parseHeadersModule = freshRequire("../../../../../../src/serverless/util/request/parseHeaders.js");
        parseHeadersModule.default = parseHeadersStub;
        const parseQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/request/parseQuerystringParameters.js");
        parseQuerystringParametersModule.default = parseQuerystringParametersStub;
        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        configureEnvironmentModule.default = configureEnvironmentStub;
        const getPostsForParsedQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js");
        getPostsForParsedQuerystringParametersModule.default = getPostsForParsedQuerystringParametersStub;
        const buildPostsResponseModule = freshRequire("../../../../../../src/serverless/util/response/buildPostsResponse.js");
        buildPostsResponseModule.default = buildPostsResponseStub;
        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        returnErrorResponseModule.default = returnErrorResponseStub;

        const getPosts = loadHandler();

        await new Promise((resolve, reject) => {
            const stubCallback = (error, postsResult) => {
                try {
                    expect(error).to.not.be.ok;
                    expect(postsResult).to.eql(stubResponse);
                    expect(parseHeadersStub.calledOnce).to.eql(true);
                    expect(parseQuerystringParametersStub.calledOnce).to.eql(true);
                    expect(configureEnvironmentStub.calledOnce).to.eql(true);
                    expect(getPostsForParsedQuerystringParametersStub.calledOnce).to.eql(true);
                    expect(buildPostsResponseStub.calledOnce).to.eql(true);
                    expect(returnErrorResponseStub.calledOnce).to.eql(true);
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

        const parseHeadersStub = sinon.stub().returns(stubHeaders);
        const parseQuerystringParametersStub = sinon.stub().returns(stubQuerystringParameters);
        const configureEnvironmentStub = sinon.stub().resolves();
        const getPostsForParsedQuerystringParametersStub = sinon.stub().resolves({
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
        const buildPostsResponseStub = sinon.stub().throws(stubError);
        const returnErrorResponseStub = sinon.stub();
        const errorHandlerStub = sinon.stub();
        returnErrorResponseStub.returns(errorHandlerStub);

        const parseHeadersModule = freshRequire("../../../../../../src/serverless/util/request/parseHeaders.js");
        parseHeadersModule.default = parseHeadersStub;
        const parseQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/request/parseQuerystringParameters.js");
        parseQuerystringParametersModule.default = parseQuerystringParametersStub;
        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        configureEnvironmentModule.default = configureEnvironmentStub;
        const getPostsForParsedQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js");
        getPostsForParsedQuerystringParametersModule.default = getPostsForParsedQuerystringParametersStub;
        const buildPostsResponseModule = freshRequire("../../../../../../src/serverless/util/response/buildPostsResponse.js");
        buildPostsResponseModule.default = buildPostsResponseStub;
        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        returnErrorResponseModule.default = returnErrorResponseStub;

        const getPosts = loadHandler();

        await new Promise((resolve, reject) => {
            const stubCallback = () => {
                throw new Error("Wtf? This should've thrown");
            };

            const stubErrorCallback = error => {
                try {
                    expect(error.message).to.eql(stubError.message);
                    expect(parseHeadersStub.calledOnce).to.eql(true);
                    expect(parseQuerystringParametersStub.calledOnce).to.eql(true);
                    expect(configureEnvironmentStub.calledOnce).to.eql(true);
                    expect(getPostsForParsedQuerystringParametersStub.calledOnce).to.eql(true);
                    expect(buildPostsResponseStub.calledOnce).to.eql(true);
                    expect(returnErrorResponseStub.calledOnce).to.eql(true);
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

        const parseHeadersStub = sinon.stub().returns(stubHeaders);
        const parseQuerystringParametersStub = sinon.stub().throws(stubError);
        const configureEnvironmentStub = sinon.stub().resolves();
        const getPostsForParsedQuerystringParametersStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const buildPostsResponseStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const returnErrorResponseStub = sinon.stub();
        const errorHandlerStub = sinon.stub();
        returnErrorResponseStub.returns(errorHandlerStub);

        const parseHeadersModule = freshRequire("../../../../../../src/serverless/util/request/parseHeaders.js");
        parseHeadersModule.default = parseHeadersStub;
        const parseQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/request/parseQuerystringParameters.js");
        parseQuerystringParametersModule.default = parseQuerystringParametersStub;
        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        configureEnvironmentModule.default = configureEnvironmentStub;
        const getPostsForParsedQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js");
        getPostsForParsedQuerystringParametersModule.default = getPostsForParsedQuerystringParametersStub;
        const buildPostsResponseModule = freshRequire("../../../../../../src/serverless/util/response/buildPostsResponse.js");
        buildPostsResponseModule.default = buildPostsResponseStub;
        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        returnErrorResponseModule.default = returnErrorResponseStub;

        const getPosts = loadHandler();

        await new Promise((resolve, reject) => {
            const stubCallback = () => {
                throw new Error("Wtf? This should've thrown");
            };

            const stubErrorCallback = error => {
                try {
                    expect(error.message).to.eql(stubError.message);
                    expect(parseHeadersStub.calledOnce).to.eql(true);
                    expect(parseQuerystringParametersStub.calledOnce).to.eql(true);
                    expect(configureEnvironmentStub.notCalled).to.eql(true);
                    expect(getPostsForParsedQuerystringParametersStub.notCalled).to.eql(true);
                    expect(buildPostsResponseStub.notCalled).to.eql(true);
                    expect(returnErrorResponseStub.calledOnce).to.eql(true);
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

        const parseHeadersStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const parseQuerystringParametersStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const configureEnvironmentStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const getPostsForParsedQuerystringParametersStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const buildPostsResponseStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const returnErrorResponseStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));

        const parseHeadersModule = freshRequire("../../../../../../src/serverless/util/request/parseHeaders.js");
        parseHeadersModule.default = parseHeadersStub;
        const parseQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/request/parseQuerystringParameters.js");
        parseQuerystringParametersModule.default = parseQuerystringParametersStub;
        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        configureEnvironmentModule.default = configureEnvironmentStub;
        const getPostsForParsedQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js");
        getPostsForParsedQuerystringParametersModule.default = getPostsForParsedQuerystringParametersStub;
        const buildPostsResponseModule = freshRequire("../../../../../../src/serverless/util/response/buildPostsResponse.js");
        buildPostsResponseModule.default = buildPostsResponseStub;
        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        returnErrorResponseModule.default = returnErrorResponseStub;

        const getPosts = loadHandler();

        await new Promise((resolve, reject) => {
            const stubCallback = (error, lambdaIsWarm) => {
                try {
                    expect(error).to.not.be.ok;
                    expect(lambdaIsWarm).to.match(/Lambda is warm!/);
                    expect(parseHeadersStub.notCalled).to.eql(true);
                    expect(parseQuerystringParametersStub.notCalled).to.eql(true);
                    expect(configureEnvironmentStub.notCalled).to.eql(true);
                    expect(getPostsForParsedQuerystringParametersStub.notCalled).to.eql(true);
                    expect(buildPostsResponseStub.notCalled).to.eql(true);
                    expect(returnErrorResponseStub.notCalled).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            getPosts(stubEvent, stubContext, stubCallback);
        });
    });
});
module.exports.default = module.exports;
