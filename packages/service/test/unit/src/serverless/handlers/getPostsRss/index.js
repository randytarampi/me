import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import RssFeed from "../../../../../../src/lib/rssFeed";
import {freshRequire} from "../../../../../lib/freshRequire";

afterEach(function () {
    sinon.restore();
});

describe("getPostsRss", function () {
    let clock;
    let now;

    beforeEach(function () {
        now = new Date();
        clock = sinon.useFakeTimers(now);
    });

    afterEach(function () {
        clock.restore();
    });

    it("delegates to `getPostsForParsedQuerystringParameters`", async function () {
        const stubEvent = {};
        const stubContext = {};
        const stubPost = Post.fromJS({
            id: "woof",
            dateCreated: new Date(1900, 0, 1),
            sourceUrl: "woof://woof.woof/woof"
        });
        const stubPhoto = Photo.fromJS({
            id: "meow",
            dateCreated: new Date(1900, 0, 1),
            sourceUrl: "meow://meow.meow/meow"
        });
        const stubPosts = [stubPhoto, stubPost];
        const stubHeaders = {};
        const stubQuerystringParameters = {};
        const expectedFeedResult = new RssFeed({
            title: `${process.env.ME_PERSON_NAME} — ${process.env.ME_PERSON_JOB_TITLE}`,
            description: process.env.ME_PERSON_DESCRIPTION,
            imageUrl: process.env.ME_PERSON_IMAGE,
            siteUrl: process.env.BLOG_URL,
            feedUrl: process.env.FEED_URL,
            managingEditor: `${process.env.ME_PERSON_NAME} <${process.env.ME_PERSON_EMAIL}>`,
            webMaster: `${process.env.ME_PERSON_NAME} <${process.env.ME_PERSON_EMAIL}>`,
            copyright: `© ${process.env.ME_PERSON_NAME}`,
            language: "en_CA"
        });
        stubPosts.forEach(post => expectedFeedResult.item(post.toRss()));

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

        const buildRssResponseModule = freshRequire("../../../../../../src/serverless/util/response/buildRssResponse.js");
        sinon.stub(buildRssResponseModule, "default").callsFake(({rss: rssResult}, headers) => {
            expect(headers).to.eql(stubHeaders);
            expect(rssResult.docs).to.eql(expectedFeedResult.docs);
            expect(rssResult.title).to.eql(expectedFeedResult.title);
            expect(rssResult.items).to.eql(expectedFeedResult.items);
            return stubResponse;
        });

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        const errorHandlerStub = sinon.stub();
        sinon.stub(returnErrorResponseModule, "default").returns(errorHandlerStub);

        const getPostsRss = freshRequire("../../../../../../src/serverless/handlers/getPostsRss").default;

        await new Promise((resolve, reject) => {
            const stubCallback = (error, postsResult) => {
                try {
                    expect(error).to.not.be.ok;
                    expect(postsResult).to.eql(stubResponse);
                    expect(parseHeadersModule.default.calledOnce).to.eql(true);
                    expect(parseQuerystringParametersModule.default.calledOnce).to.eql(true);
                    expect(configureEnvironmentModule.default.calledOnce).to.eql(true);
                    expect(getPostsForParsedQuerystringParametersModule.default.calledOnce).to.eql(true);
                    expect(buildRssResponseModule.default.calledOnce).to.eql(true);
                    expect(returnErrorResponseModule.default.calledOnce).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            getPostsRss(stubEvent, stubContext, stubCallback);
        });
    });

    it("`returnErrorResponse` on error", async function () {
        const stubEvent = {};
        const stubContext = {};
        const stubPost = Post.fromJS({
            id: "woof",
            dateCreated: new Date(1900, 0, 1),
            sourceUrl: "woof://woof.woof/woof"
        });
        const stubPhoto = Photo.fromJS({
            id: "meow",
            dateCreated: new Date(1900, 0, 1),
            sourceUrl: "meow://meow.meow/meow"
        });
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

        const buildRssResponseModule = freshRequire("../../../../../../src/serverless/util/response/buildRssResponse.js");
        sinon.stub(buildRssResponseModule, "default").throws(stubError);

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        const errorHandlerStub = sinon.stub();
        sinon.stub(returnErrorResponseModule, "default").returns(errorHandlerStub);

        const getPostsRss = freshRequire("../../../../../../src/serverless/handlers/getPostsRss").default;

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
                    expect(buildRssResponseModule.default.calledOnce).to.eql(true);
                    expect(returnErrorResponseModule.default.calledOnce).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            errorHandlerStub.callsFake(stubErrorCallback);
            getPostsRss(stubEvent, stubContext, stubCallback);
        });
    });

    it("`returnErrorResponse` on parse error", async function () {
        const stubEvent = {};
        const stubContext = {};
        const stubPost = Post.fromJS({
            id: "woof",
            dateCreated: new Date(1900, 0, 1),
            sourceUrl: "woof://woof.woof/woof"
        });
        const stubPhoto = Photo.fromJS({
            id: "meow",
            dateCreated: new Date(1900, 0, 1),
            sourceUrl: "meow://meow.meow/meow"
        });
        const stubHeaders = {};
        const stubError = new Error("woof");

        const parseHeadersModule = freshRequire("../../../../../../src/serverless/util/request/parseHeaders.js");
        sinon.stub(parseHeadersModule, "default").returns(stubHeaders);

        const parseQuerystringParametersModule = freshRequire("../../../../../../src/serverless/util/request/parseQuerystringParameters.js");
        sinon.stub(parseQuerystringParametersModule, "default").throws(stubError);

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

        const buildRssResponseModule = freshRequire("../../../../../../src/serverless/util/response/buildRssResponse.js");
        sinon.stub(buildRssResponseModule, "default").throws(new Error("Wtf? This should've thrown"));

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        const errorHandlerStub = sinon.stub();
        sinon.stub(returnErrorResponseModule, "default").returns(errorHandlerStub);

        const getPostsRss = freshRequire("../../../../../../src/serverless/handlers/getPostsRss").default;

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
                    expect(buildRssResponseModule.default.notCalled).to.eql(true);
                    expect(returnErrorResponseModule.default.calledOnce).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            errorHandlerStub.callsFake(stubErrorCallback);
            getPostsRss(stubEvent, stubContext, stubCallback);
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

        const buildRssResponseModule = freshRequire("../../../../../../src/serverless/util/response/buildRssResponse.js");
        sinon.stub(buildRssResponseModule, "default").throws(new Error("Wtf? This should've thrown"));

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        sinon.stub(returnErrorResponseModule, "default").throws(new Error("Wtf? This should've thrown"));

        const getPostsRss = freshRequire("../../../../../../src/serverless/handlers/getPostsRss").default;

        await new Promise((resolve, reject) => {
            const stubCallback = (error, lambdaIsWarm) => {
                try {
                    expect(error).to.not.be.ok;
                    expect(lambdaIsWarm).to.match(/Lambda is warm!/);
                    expect(parseHeadersModule.default.notCalled).to.eql(true);
                    expect(parseQuerystringParametersModule.default.notCalled).to.eql(true);
                    expect(configureEnvironmentModule.default.notCalled).to.eql(true);
                    expect(getPostsForParsedQuerystringParametersModule.default.notCalled).to.eql(true);
                    expect(buildRssResponseModule.default.notCalled).to.eql(true);
                    expect(returnErrorResponseModule.default.notCalled).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            getPostsRss(stubEvent, stubContext, stubCallback);
        });
    });
});
