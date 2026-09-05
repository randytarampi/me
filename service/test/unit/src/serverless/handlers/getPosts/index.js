import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import esmock from "../../../../../lib/esmock.js";

afterEach(function () {
    sinon.restore();
});

describe("getPosts", function () {
    const loadHandler = mocks => {
        return esmock("../../../../../../src/serverless/handlers/getPosts/index.js", import.meta.url, mocks).then(({default: getPosts}) => getPosts);
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

        const getPosts = await loadHandler({
            "../../../../../../src/serverless/util/request/parseHeaders.js": {default: parseHeadersStub},
            "../../../../../../src/serverless/util/request/parseQuerystringParameters.js": {default: parseQuerystringParametersStub},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js": {default: getPostsForParsedQuerystringParametersStub},
            "../../../../../../src/serverless/util/response/buildPostsResponse.js": {default: buildPostsResponseStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        const postsResult = await getPosts(stubEvent, stubContext);

        expect(postsResult).to.eql(stubResponse);
        expect(parseHeadersStub.calledOnce).to.eql(true);
        expect(parseQuerystringParametersStub.calledOnce).to.eql(true);
        expect(configureEnvironmentStub.calledOnce).to.eql(true);
        expect(getPostsForParsedQuerystringParametersStub.calledOnce).to.eql(true);
        expect(buildPostsResponseStub.calledOnce).to.eql(true);
        expect(returnErrorResponseStub.calledOnce).to.eql(true);
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
        const errorHandlerStub = sinon.stub().returns("error-response");
        const returnErrorResponseStub = sinon.stub().returns(errorHandlerStub);

        const getPosts = await loadHandler({
            "../../../../../../src/serverless/util/request/parseHeaders.js": {default: parseHeadersStub},
            "../../../../../../src/serverless/util/request/parseQuerystringParameters.js": {default: parseQuerystringParametersStub},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js": {default: getPostsForParsedQuerystringParametersStub},
            "../../../../../../src/serverless/util/response/buildPostsResponse.js": {default: buildPostsResponseStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        const result = await getPosts(stubEvent, stubContext);

        expect(result).to.eql("error-response");
        expect(errorHandlerStub.calledOnce).to.eql(true);
        expect(errorHandlerStub.firstCall.args[0].message).to.eql(stubError.message);
        expect(parseHeadersStub.calledOnce).to.eql(true);
        expect(parseQuerystringParametersStub.calledOnce).to.eql(true);
        expect(configureEnvironmentStub.calledOnce).to.eql(true);
        expect(getPostsForParsedQuerystringParametersStub.calledOnce).to.eql(true);
        expect(buildPostsResponseStub.calledOnce).to.eql(true);
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
        const buildPostsResponseStub = sinon.stub().throws(new Error("Wtf? This should've thrown"));
        const errorHandlerStub = sinon.stub().returns("error-response");
        const returnErrorResponseStub = sinon.stub().returns(errorHandlerStub);

        const getPosts = await loadHandler({
            "../../../../../../src/serverless/util/request/parseHeaders.js": {default: parseHeadersStub},
            "../../../../../../src/serverless/util/request/parseQuerystringParameters.js": {default: parseQuerystringParametersStub},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js": {default: getPostsForParsedQuerystringParametersStub},
            "../../../../../../src/serverless/util/response/buildPostsResponse.js": {default: buildPostsResponseStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        const result = await getPosts(stubEvent, stubContext);

        expect(result).to.eql("error-response");
        expect(errorHandlerStub.calledOnce).to.eql(true);
        expect(errorHandlerStub.firstCall.args[0].message).to.eql(stubError.message);
        expect(parseHeadersStub.calledOnce).to.eql(true);
        expect(parseQuerystringParametersStub.calledOnce).to.eql(true);
        expect(configureEnvironmentStub.notCalled).to.eql(true);
        expect(getPostsForParsedQuerystringParametersStub.notCalled).to.eql(true);
        expect(buildPostsResponseStub.notCalled).to.eql(true);
        expect(returnErrorResponseStub.calledOnce).to.eql(true);
    });

});
