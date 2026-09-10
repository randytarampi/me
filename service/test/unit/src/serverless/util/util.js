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

    describe("parseHiddenPostSources", function () {
        it("parses valid source lists and rejects malformed values", async function () {
            const {default: parseHiddenPostSources} = await import("../../../../../src/serverless/util/parseHiddenPostSources.js");

            expect(parseHiddenPostSources("github, tumblr,github")).to.eql(["github", "tumblr"]);
            expect(() => parseHiddenPostSources("github,,tumblr")).to.throw(/invalid source name/);
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
                    global: stubPosts[stubPosts.length - 1],
                    [Gallery.type]: stubGallery,
                    [Photo.type]: stubPhoto
                },
                lastFetched: {
                    global: stubPosts[0],
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

        it("orders the default mixed-type response and metadata by datePublished", async function () {
            const stubPostsByType = {
                [LinkPost.type]: LinkPost.fromJS({id: "link", dateCreated: new Date(1900, 0, 1), datePublished: new Date(2020, 0, 1)}),
                [Gallery.type]: Gallery.fromJS({id: "gallery", dateCreated: new Date(1900, 0, 1), datePublished: new Date(2020, 0, 3)}),
                [Post.type]: Post.fromJS({id: "post", dateCreated: new Date(2030, 0, 1), datePublished: new Date(2020, 0, 2)}),
                [Photo.type]: Photo.fromJS({id: "photo", dateCreated: new Date(1900, 0, 1), datePublished: new Date(2020, 0, 1)})
            };
            const stubRequestHeaders = {[ME_API_VERSION_HEADER]: 4};
            const proxyquiredSearchPosts = sinon.stub().callsFake(searchParams => {
                const post = stubPostsByType[searchParams.type];

                return Promise.resolve({
                    first: post,
                    firstFetched: post,
                    last: post,
                    lastFetched: post,
                    posts: [post],
                    total: 1
                });
            });

            const {default: getPostsForParsedQuerystringParameters} = await esmock("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js", import.meta.url, {
                "../../../../../src/lib/sources/searchPosts.js": {default: proxyquiredSearchPosts}
            });

            const postsResult = await getPostsForParsedQuerystringParameters({perPage: 3}, stubRequestHeaders);

            expect(postsResult.posts.map(post => post.id)).to.eql(["gallery", "post", "photo"]);
            expect(postsResult.firstFetched.global).to.eql(stubPostsByType[Photo.type]);
            expect(postsResult.lastFetched.global).to.eql(stubPostsByType[Gallery.type]);
        });

        it("deduplicates mixed types, applies the page size, and uses a stable UID tie-break", async function () {
            const equalDate = new Date(2020, 0, 2);
            const galleryPosts = [
                Gallery.fromJS({id: "newest", datePublished: new Date(2020, 0, 3)}),
                Gallery.fromJS({id: "same", datePublished: equalDate}),
                Gallery.fromJS({id: "old-a", datePublished: equalDate})
            ];
            const photoPosts = [
                Photo.fromJS({id: "same", datePublished: equalDate}),
                Photo.fromJS({id: "old-b", datePublished: equalDate})
            ];
            const proxyquiredSearchPosts = sinon.stub().callsFake(searchParams => Promise.resolve({
                posts: searchParams.type === Gallery.type ? galleryPosts : photoPosts,
                total: searchParams.type === Gallery.type ? galleryPosts.length : photoPosts.length
            }));
            const {default: getPostsForParsedQuerystringParameters} = await esmock("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js", import.meta.url, {
                "../../../../../src/lib/sources/searchPosts.js": {default: proxyquiredSearchPosts}
            });

            const result = await getPostsForParsedQuerystringParameters({type: Gallery.type, perPage: 8}, {[ME_API_VERSION_HEADER]: 4});

            expect(result.posts.map(post => post.id)).to.eql(["newest", "same", "old-b", "old-a"]);
            expect(result.total.global).to.eql(5);
            expect(result.firstFetched.global.id).to.eql("old-a");
            expect(result.lastFetched.global.id).to.eql("newest");
        });

        it("returns eight posts on the first page and advances to a strictly older second page", async function () {
            const posts = Array.from({length: 10}, (_, index) => Post.fromJS({
                id: `post-${index}`,
                datePublished: new Date(2020, 0, 10 - index)
            }));
            const proxyquiredSearchPosts = sinon.stub().callsFake(searchParams => {
                const cursorDate = searchParams.orderComparator && new Date(searchParams.orderComparator).valueOf();
                const cursorId = searchParams.beforeId;
                const filteredPosts = posts.filter(post => !cursorDate
                    || post.datePublished.valueOf() < cursorDate
                    || (post.datePublished.valueOf() === cursorDate && post.uid.localeCompare(cursorId) < 0)
                );

                return Promise.resolve({posts: filteredPosts, total: filteredPosts.length});
            });
            const {default: getPostsForParsedQuerystringParameters} = await esmock("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js", import.meta.url, {
                "../../../../../src/lib/sources/searchPosts.js": {default: proxyquiredSearchPosts}
            });
            const headers = {[ME_API_VERSION_HEADER]: 4};

            const firstPage = await getPostsForParsedQuerystringParameters({type: Post.type, perPage: 8}, headers);
            const cursor = firstPage.firstFetched.global;
            const secondPage = await getPostsForParsedQuerystringParameters({
                type: Post.type,
                perPage: 8,
                orderBy: "datePublished",
                orderOperator: "lt",
                orderComparator: cursor.datePublished,
                beforeId: cursor.uid
            }, headers);

            expect(firstPage.posts).to.have.length(8);
            expect(firstPage.firstFetched.global).to.eql(posts[7]);
            expect(firstPage.lastFetched.global).to.eql(posts[0]);
            expect(secondPage.posts).to.have.length(2);
            expect(secondPage.posts.every(post => post.datePublished < cursor.datePublished)).to.eql(true);
            expect(secondPage.posts.some(post => post.uid === cursor.uid)).to.eql(false);
        });

        it("excludes configured sources before pagination and metadata aggregation", async function () {
            const hiddenPost = Post.fromJS({id: "github", source: "github", datePublished: new Date(2020, 0, 3)});
            const visiblePosts = [
                Post.fromJS({id: "new", source: "s3", datePublished: new Date(2020, 0, 2)}),
                Post.fromJS({id: "old", source: "s3", datePublished: new Date(2020, 0, 1)})
            ];
            const oldSetting = process.env.HIDDEN_POST_SOURCES;
            process.env.HIDDEN_POST_SOURCES = "github";
            const proxyquiredSearchPosts = sinon.stub().resolves({
                first: hiddenPost,
                firstFetched: hiddenPost,
                last: visiblePosts[1],
                lastFetched: hiddenPost,
                posts: [hiddenPost, ...visiblePosts],
                total: 3
            });
            const {default: getPostsForParsedQuerystringParameters} = await esmock("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js", import.meta.url, {
                "../../../../../src/lib/sources/searchPosts.js": {default: proxyquiredSearchPosts}
            });

            try {
                const result = await getPostsForParsedQuerystringParameters({type: Post.type, perPage: 1}, {[ME_API_VERSION_HEADER]: 4});
                expect(result.posts.map(post => post.id)).to.eql(["new"]);
                expect(result.total.global).to.eql(2);
                expect(result.first.global.id).to.eql("old");
                expect(result.last.global.id).to.eql("new");
                expect(result.firstFetched.global.id).to.eql("new");
                expect(result.lastFetched.global.id).to.eql("new");
            } finally {
                if (oldSetting === undefined) delete process.env.HIDDEN_POST_SOURCES;
                else process.env.HIDDEN_POST_SOURCES = oldSetting;
            }
        });
    });
});
