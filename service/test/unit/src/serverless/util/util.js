import {Gallery, LinkPost, Photo, Post, POST_TYPES} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import esmock from "../../../../lib/esmock.js";
import PostSearchParams from "../../../../../src/lib/postSearchParams.js";
import loadConfig from "../../../../../src/serverless/util/loadConfig.cjs";
import {parseQueryStringParametersIntoSearchParams} from "../../../../../src/serverless/util/parseQueryStringParametersIntoSearchParams.js";
import {ME_API_VERSION_HEADER} from "../../../../../src/serverless/util/request/headers/version.js";

afterEach(function () {
    sinon.restore();
});

describe("util", function () {
    describe("parseQueryStringParametersIntoSearchParams", function () {
        it("returns the expected PostSearchParams", async function () {
            const baseParameters = {type: "woof"};
            const queryStringParameters = {source: "meow", perPage: "4"};
            const searchParams = parseQueryStringParametersIntoSearchParams(baseParameters)(queryStringParameters);

            expect(searchParams).to.be.instanceOf(PostSearchParams);
            expect(searchParams.type).to.eql("woof");
            expect(searchParams.source).to.eql("meow");
            expect(searchParams.perPage).to.eql(4);
        });
    });

    describe("configureEnvironment", function () {
        it("propagates thrown errors", async function () {
            const stubErrorMessage = "woof";
            const stubDynamooseLocal = sinon.stub();
            const stubConfigureLogger = sinon.stub().rejects(new Error(stubErrorMessage));

            const {default: configureEnvironment} = await esmock("../../../../../src/serverless/util/configureEnvironment.js", import.meta.url, {
                dynamoose: {default: {aws: {ddb: {local: stubDynamooseLocal}}}},
                "../../../../../src/serverless/logger.js": {configureLogger: stubConfigureLogger}
            });

            return configureEnvironment().then(() => {
                throw new Error("Wtf? This should've thrown");
            }).catch(error => {
                expect(error.message).to.eql(stubErrorMessage);
            });
        });

        it("works", async function () {
            const stubDynamooseLocal = sinon.stub();
            const stubConfigureLogger = sinon.stub().resolves();

            const {default: configureEnvironment} = await esmock("../../../../../src/serverless/util/configureEnvironment.js", import.meta.url, {
                dynamoose: {default: {aws: {ddb: {local: stubDynamooseLocal}}}},
                "../../../../../src/serverless/logger.js": {configureLogger: stubConfigureLogger}
            });

            return configureEnvironment().then(() => {
                expect(stubConfigureLogger.calledOnce).to.eql(true);
            });
        });
    });

    describe("loadConfig", function () {
        it("delegates to `config`", async function () {
            process.env.NODE_ENV = "test";
            const loadedConfig = loadConfig();

            expect(loadedConfig).to.be.an("object");
            expect(loadedConfig.posts).to.be.an("object");
            expect(loadedConfig.me).to.be.an("object");
            expect(loadedConfig.logger).to.be.an("object");
            expect(loadedConfig.logger.enabled).to.be.ok;
            expect(loadedConfig.logger.streams).to.be.an("object");
            expect(loadedConfig.logger.level).to.be.ok;
            expect(loadedConfig.logger.src).to.be.ok;
        });
    });

    describe("getPostsForParsedQuerystringParameters", function () {
        it("fans out untyped ME_API_VERSION_HEADER >= 4 requests to every post type", async function () {
            const stubPost = Post.fromJS({id: "woof", dateCreated: new Date(1900, 0, 1)});
            const stubPhoto = Photo.fromJS({id: "meow", dateCreated: new Date(1900, 0, 1)});
            const stubGallery = Gallery.fromJS({id: "grr", dateCreated: new Date(1900, 0, 1)});
            const stubLinkPost = LinkPost.fromJS({id: "link", dateCreated: new Date(1900, 0, 1)});
            const stubPostsByType = {
                [LinkPost.type]: stubLinkPost,
                [Gallery.type]: stubGallery,
                [Post.type]: stubPost,
                [Photo.type]: stubPhoto
            };
            const stubPosts = Object.values(stubPostsByType);
            const stubQueryParameters = undefined;
            const stubRequestHeaders = {[ME_API_VERSION_HEADER]: 4};

            const proxyquiredSearchPosts = sinon.stub().callsFake(searchParams => {
                const result = [stubPostsByType[searchParams.type]];

                return Promise.resolve({
                    first: result[0],
                    firstFetched: result[0],
                    last: result[0],
                    lastFetched: result[0],
                    posts: result,
                    total: result.length
                });
            });

            const {default: getPostsForParsedQuerystringParameters} = await esmock("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js", import.meta.url, {
                "../../../../../src/lib/sources/searchPosts.js": {default: proxyquiredSearchPosts}
            });

            return getPostsForParsedQuerystringParameters(stubQueryParameters, stubRequestHeaders).then(postsResult => {
                expect(postsResult.posts).to.have.members(stubPosts);
                expect(postsResult.total.global).to.eql(stubPosts.length);
                expect(proxyquiredSearchPosts.callCount).to.eql(POST_TYPES.length);
                expect(proxyquiredSearchPosts.args.map(([searchParams]) => searchParams.type)).to.have.members(POST_TYPES);
            });
        });

        it("delegates to `searchPosts` (ME_API_VERSION_HEADER <= 3)", async function () {
            const stubPost = Post.fromJS({id: "woof", dateCreated: new Date(1900, 0, 1)});
            const stubPhoto = Photo.fromJS({id: "meow", dateCreated: new Date(1900, 0, 1)});
            const stubGallery = Gallery.fromJS({id: "grr", dateCreated: new Date(1900, 0, 1)});
            const stubPosts = [stubPost, stubPhoto, stubGallery];
            const stubQueryParameters = undefined;
            const stubRequestHeaders = {[ME_API_VERSION_HEADER]: 3};
            const expectedPostsResult = {
                posts: stubPosts,
                total: {
                    global: stubPosts.length,
                    [LinkPost.type]: 0,
                    [Gallery.type]: 1,
                    [Post.type]: 1,
                    [Photo.type]: 1
                },
                first: {
                    global: stubPost,
                    [LinkPost.type]: null,
                    [Gallery.type]: stubGallery,
                    [Post.type]: stubPost,
                    [Photo.type]: stubPhoto
                },
                last: {
                    global: stubGallery,
                    [LinkPost.type]: null,
                    [Gallery.type]: stubGallery,
                    [Post.type]: stubPost,
                    [Photo.type]: stubPhoto
                },
                firstFetched: {
                    global: stubPosts[0],
                    [LinkPost.type]: null,
                    [Gallery.type]: stubGallery,
                    [Post.type]: stubPost,
                    [Photo.type]: stubPhoto
                },
                lastFetched: {
                    global: stubPosts[stubPosts.length - 1],
                    [LinkPost.type]: null,
                    [Gallery.type]: stubGallery,
                    [Post.type]: stubPost,
                    [Photo.type]: stubPhoto
                }
            };

            const proxyquiredSearchPosts = sinon.stub().callsFake(searchParams => {
                let baseResult = null;

                switch (searchParams.type) {
                    case Gallery.type:
                        baseResult = stubGallery;
                        break;

                    case Photo.type:
                        baseResult = stubPhoto;
                        break;

                    case Post.type:
                        baseResult = stubPost;
                        break;
                }

                return Promise.resolve({
                    first: baseResult,
                    firstFetched: baseResult,
                    last: baseResult,
                    lastFetched: baseResult,
                    posts: baseResult ? [baseResult] : [],
                    total: baseResult ? 1 : 0
                });
            });

            const {default: getPostsForParsedQuerystringParameters} = await esmock("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js", import.meta.url, {
                "../../../../../src/lib/sources/searchPosts.js": {default: proxyquiredSearchPosts}
            });

            return getPostsForParsedQuerystringParameters(stubQueryParameters, stubRequestHeaders).then(postsResult => {
                expect(postsResult).to.eql(expectedPostsResult);
                expect(proxyquiredSearchPosts.callCount).to.eql(POST_TYPES.length);
            });
        });

        it("delegates to `searchPosts` (a single type)", async function () {
            const stubPost = Post.fromJS({id: "woof", dateCreated: new Date(1900, 0, 1)});
            const stubPhoto = Photo.fromJS({id: "meow", dateCreated: new Date(1900, 0, 1)});
            const stubPosts = [stubPost];
            const stubQueryParameters = {type: Post.type};
            const stubRequestHeaders = {[ME_API_VERSION_HEADER]: 4};
            const expectedPostsResult = {
                posts: stubPosts,
                total: {
                    global: stubPosts.length,
                    [Post.type]: 1
                },
                first: {
                    global: stubPost,
                    [Post.type]: stubPost
                },
                last: {
                    global: stubPost,
                    [Post.type]: stubPost
                },
                firstFetched: {
                    global: stubPosts[0],
                    [Post.type]: stubPost
                },
                lastFetched: {
                    global: stubPosts[stubPosts.length - 1],
                    [Post.type]: stubPost
                }
            };

            const proxyquiredSearchPosts = sinon.stub().callsFake(searchParams => {
                let baseResult = null;

                switch (searchParams.type) {
                    case Photo.type:
                        baseResult = stubPhoto;
                        break;

                    case Post.type:
                        baseResult = stubPost;
                        break;
                }

                return Promise.resolve({
                    first: baseResult,
                    firstFetched: baseResult,
                    last: baseResult,
                    lastFetched: baseResult,
                    posts: [baseResult],
                    total: 1
                });
            });

            const {default: getPostsForParsedQuerystringParameters} = await esmock("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js", import.meta.url, {
                "../../../../../src/lib/sources/searchPosts.js": {default: proxyquiredSearchPosts}
            });

            return getPostsForParsedQuerystringParameters(stubQueryParameters, stubRequestHeaders).then(postsResult => {
                expect(postsResult).to.eql(expectedPostsResult);
                expect(proxyquiredSearchPosts.calledOnce).to.eql(true);
            });
        });

        it("delegates to `searchPosts` (multiple types)", async function () {
            const stubGallery = Gallery.fromJS({id: "woof", dateCreated: new Date(1900, 0, 2)});
            const stubPhoto = Photo.fromJS({id: "meow", dateCreated: new Date(1900, 0, 1)});
            const stubPosts = [stubGallery, stubPhoto];
            const stubQueryParameters = {type: Gallery.type};
            const stubRequestHeaders = {[ME_API_VERSION_HEADER]: 4};
            const expectedPostsResult = {
                posts: stubPosts,
                total: {
                    global: stubPosts.length,
                    [Gallery.type]: 1,
                    [Photo.type]: 1
                },
                first: {
                    global: stubPhoto,
                    [Gallery.type]: stubGallery,
                    [Photo.type]: stubPhoto
                },
                last: {
                    global: stubGallery,
                    [Gallery.type]: stubGallery,
                    [Photo.type]: stubPhoto
                },
                firstFetched: {
                    global: stubPhoto,
                    [Gallery.type]: stubGallery,
                    [Photo.type]: stubPhoto
                },
                lastFetched: {
                    global: stubGallery,
                    [Gallery.type]: stubGallery,
                    [Photo.type]: stubPhoto
                }
            };

            const proxyquiredSearchPosts = sinon.stub().callsFake(searchParams => {
                let baseResult = null;

                switch (searchParams.type) {
                    case Photo.type:
                        baseResult = stubPhoto;
                        break;

                    case Gallery.type:
                        baseResult = stubGallery;
                        break;
                }

                return Promise.resolve({
                    first: baseResult,
                    firstFetched: baseResult,
                    last: baseResult,
                    lastFetched: baseResult,
                    posts: [baseResult],
                    total: 1
                });
            });

            const {default: getPostsForParsedQuerystringParameters} = await esmock("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js", import.meta.url, {
                "../../../../../src/lib/sources/searchPosts.js": {default: proxyquiredSearchPosts}
            });

            return getPostsForParsedQuerystringParameters(stubQueryParameters, stubRequestHeaders).then(postsResult => {
                expect(postsResult).to.eql(expectedPostsResult);
                expect(proxyquiredSearchPosts.calledTwice).to.eql(true);
            });
        });
    });
});
