const {Gallery, LinkPost, Photo, Post, POST_TYPES} = require("@randy.tarampi/js");
const {expect} = require("chai");
const sinon = require("sinon");
const PostSearchParams = require("../../../../../src/lib/postSearchParams.js");
const loadConfig = require("../../../../../src/serverless/util/loadConfig.js");
const {parseQueryStringParametersIntoSearchParams} = require("../../../../../src/serverless/util/parseQueryStringParametersIntoSearchParams.js");
const {ME_API_VERSION_HEADER} = require("../../../../../src/serverless/util/request/headers/version.js");
const {freshRequire} = require("../../../../lib/freshRequire.js");

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
            const dynamoose = freshRequire("dynamoose");
            sinon.stub(dynamoose.aws.ddb, "local");

            const loadServerlessSecretsModule = freshRequire("../../../../../src/serverless/util/loadServerlessSecrets.js");
            sinon.stub(loadServerlessSecretsModule, "default").rejects(new Error(stubErrorMessage));

            const loggerModule = freshRequire("../../../../../src/serverless/logger.js");
            sinon.stub(loggerModule, "configureLogger");

            const configureEnvironment = freshRequire("../../../../../src/serverless/util/configureEnvironment.js").default;

            return configureEnvironment().then(() => {
                throw new Error("Wtf? This should've thrown");
            }).catch(error => {
                expect(error.message).to.eql(stubErrorMessage);
            });
        });

        it("works", async function () {
            const dynamoose = freshRequire("dynamoose");
            sinon.stub(dynamoose.aws.ddb, "local");

            const loadServerlessSecretsModule = freshRequire("../../../../../src/serverless/util/loadServerlessSecrets.js");
            sinon.stub(loadServerlessSecretsModule, "default").resolves();

            const loggerModule = freshRequire("../../../../../src/serverless/logger.js");
            sinon.stub(loggerModule, "configureLogger").resolves();

            const configureEnvironment = freshRequire("../../../../../src/serverless/util/configureEnvironment.js").default;

            return configureEnvironment().then(() => {
                expect(loadServerlessSecretsModule.default.calledOnce).to.eql(true);
                expect(loggerModule.configureLogger.calledOnce).to.eql(true);
            });
        });
    });

    describe("loadServerlessSecrets", function () {
        const secretEnvVars = [
            "FLICKR_API_KEY",
            "FLICKR_API_SECRET",
            "UNSPLASH_API_KEY",
            "UNSPLASH_API_SECRET",
            "FACEBOOK_API_KEY",
            "FACEBOOK_API_SECRET",
            "FACEBOOK_ACCESS_TOKEN",
            "INSTAGRAM_API_KEY",
            "INSTAGRAM_API_SECRET",
            "INSTAGRAM_ACCESS_TOKEN",
            "TUMBLR_API_KEY",
            "TUMBLR_API_SECRET",
            "TWITTER_API_KEY",
            "TWITTER_API_SECRET",
            "SENTRY_DSN"
        ];

        let originalSecretEnvVars;

        beforeEach(function () {
            originalSecretEnvVars = secretEnvVars.reduce((env, envVarName) => {
                env[envVarName] = process.env[envVarName];
                return env;
            }, {});
        });

        afterEach(function () {
            process.env.NODE_ENV = "test";

            secretEnvVars.forEach(envVarName => {
                if (typeof originalSecretEnvVars[envVarName] === "undefined") {
                    delete process.env[envVarName];
                } else {
                    process.env[envVarName] = originalSecretEnvVars[envVarName];
                }
            });
        });

        it("loads secrets from SSM", async function () {
            process.env.NODE_ENV = "dev";

            const send = sinon.stub().callsFake(async command => {
                return {
                    Parameters: command.input.Names.map(name => {
                        return {
                            Name: name,
                            Value: `${name}-value`
                        };
                    })
                };
            });

            const ssm = freshRequire("@aws-sdk/client-ssm");
            sinon.stub(ssm, "GetParametersCommand").callsFake(function GetParametersCommand(input) {
                this.input = input;
            });
            sinon.stub(ssm, "SSMClient").callsFake(function SSMClient() {
                this.send = send;
            });

            const loadServerlessSecrets = freshRequire("../../../../../src/serverless/util/loadServerlessSecrets.js").default;

            return loadServerlessSecrets().then(() => {
                expect(send.calledTwice).to.eql(true);
                expect(process.env.FLICKR_API_KEY).to.eql("flickr-api-key-value");
                expect(process.env.TWITTER_API_SECRET).to.eql("twitter-api-secret-value");
            });
        });

        it("shortcircuits in `NODE_ENV === \"test\"`", async function () {
            process.env.NODE_ENV = "test";

            const loadServerlessSecrets = freshRequire("../../../../../src/serverless/util/loadServerlessSecrets.js").default;

            return loadServerlessSecrets().then(() => {
                expect(process.env.NODE_ENV).to.eql("test");
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
        it("delegates to `searchPosts` (ME_API_VERSION_HEADER >= 4)", async function () {
            const stubPost = Post.fromJS({id: "woof", dateCreated: new Date(1900, 0, 1)});
            const stubPhoto = Photo.fromJS({id: "meow", dateCreated: new Date(1900, 0, 1)});
            const stubGallery = Gallery.fromJS({id: "grr", dateCreated: new Date(1900, 0, 1)});
            const stubPosts = [stubPost, stubPhoto, stubGallery];
            const stubQueryParameters = undefined;
            const stubRequestHeaders = {[ME_API_VERSION_HEADER]: 4};
            const expectedPostsResult = {
                posts: stubPosts,
                total: {
                    global: stubPosts.length
                },
                first: {
                    global: stubPost
                },
                last: {
                    global: stubGallery
                },
                firstFetched: {
                    global: stubPosts[0]
                },
                lastFetched: {
                    global: stubPosts[stubPosts.length - 1]
                }
            };

            const searchPostsModule = freshRequire("../../../../../src/lib/sources/searchPosts.js");
            const proxyquiredSearchPosts = sinon.stub().callsFake(() => {
                const result = [stubPost, stubPhoto, stubGallery];

                return Promise.resolve({
                    first: stubPost,
                    firstFetched: stubPost,
                    last: stubGallery,
                    lastFetched: stubGallery,
                    posts: result,
                    total: result.length
                });
            });
            sinon.stub(searchPostsModule, "default").callsFake(proxyquiredSearchPosts);

            const getPostsForParsedQuerystringParameters = freshRequire("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js").default;

            return getPostsForParsedQuerystringParameters(stubQueryParameters, stubRequestHeaders).then(postsResult => {
                expect(postsResult).to.eql(expectedPostsResult);
                expect(proxyquiredSearchPosts.calledOnce).to.eql(true);
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

            const searchPostsModule = freshRequire("../../../../../src/lib/sources/searchPosts.js");
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
            sinon.stub(searchPostsModule, "default").callsFake(proxyquiredSearchPosts);

            const getPostsForParsedQuerystringParameters = freshRequire("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js").default;

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

            const searchPostsModule = freshRequire("../../../../../src/lib/sources/searchPosts.js");
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
            sinon.stub(searchPostsModule, "default").callsFake(proxyquiredSearchPosts);

            const getPostsForParsedQuerystringParameters = freshRequire("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js").default;

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

            const searchPostsModule = freshRequire("../../../../../src/lib/sources/searchPosts.js");
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
            sinon.stub(searchPostsModule, "default").callsFake(proxyquiredSearchPosts);

            const getPostsForParsedQuerystringParameters = freshRequire("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters.js").default;

            return getPostsForParsedQuerystringParameters(stubQueryParameters, stubRequestHeaders).then(postsResult => {
                expect(postsResult).to.eql(expectedPostsResult);
                expect(proxyquiredSearchPosts.calledTwice).to.eql(true);
            });
        });
    });
});
module.exports.default = module.exports;
