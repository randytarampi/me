import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import config from "config";
import proxyquire from "proxyquire";
import serverlessSecretsClient from "serverless-secrets/client";
import sinon from "sinon";
import SearchParams from "../../../../../src/lib/searchParams";
import loadConfig from "../../../../../src/serverless/util/loadConfig";
import loadServerlessSecrets from "../../../../../src/serverless/util/loadServerlessSecrets";
import {parseQueryStringParametersIntoSearchParams} from "../../../../../src/serverless/util/parseQueryStringParametersIntoSearchParams";

describe("util", function () {
    describe("parseQueryStringParametersIntoSearchParams", function () {
        it("returns the expected SearchParams", function () {
            const baseParameters = {
                type: "woof"
            };
            const queryStringParameters = {
                source: "meow",
                perPage: "4"
            };
            const searchParams = parseQueryStringParametersIntoSearchParams(baseParameters)(queryStringParameters);

            expect(searchParams).to.be.ok;
            expect(searchParams).to.be.instanceOf(SearchParams);
            expect(searchParams.type).to.eql("woof");
            expect(searchParams.source).to.eql("meow");
            expect(searchParams.perPage).to.eql(4);
        });
    });

    describe("configureEnvironment", function () {
        it("propagates thrown errors", function () {
            const stubErrorMessage = "woof";
            const proxyquiredConfigureEnvironment = proxyquire("../../../../../src/serverless/util/configureEnvironment", {
                "./loadServerlessSecrets": {
                    "default": sinon.stub().returns(Promise.reject(new Error(stubErrorMessage)))
                }
            });

            return proxyquiredConfigureEnvironment.default()
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error).to.be.ok;
                    expect(error.message).to.eql(stubErrorMessage);
                });
        });

        it("works", function () {
            const proxyquireStubs = {
                "./loadServerlessSecrets": {
                    "default": sinon.stub().returns(Promise.resolve())
                },
                "../../lib/logger": {
                    "configureLogger": sinon.stub().returns(Promise.resolve())
                }
            };
            const proxyquiredConfigureEnvironment = proxyquire("../../../../../src/serverless/util/configureEnvironment", proxyquireStubs);

            return proxyquiredConfigureEnvironment.default()
                .then(() => {
                    expect(proxyquireStubs["./loadServerlessSecrets"].default.calledOnce).to.eql(true);
                    expect(proxyquireStubs["../../lib/logger"].configureLogger.calledOnce).to.eql(true);
                });
        });
    });

    describe("loadServerlessSecrets", function () {
        let originalNodeEnv = process.env.NODE_ENV;

        beforeEach(function () {
            sinon.stub(serverlessSecretsClient, "load").callsFake(() => Promise.resolve());
            process.env.NODE_ENV = "!test";
        });

        afterEach(function () {
            serverlessSecretsClient.load.restore();
            process.env.NODE_ENV = originalNodeEnv;
        });

        it("delegates to serverlessSecretsClient.load()", function () {
            return loadServerlessSecrets()
                .then(() => {
                    expect(serverlessSecretsClient.load.calledOnce).to.eql(true);
                });
        });

        it("shortcircuits in `NODE_ENV === \"test\"`", function () {
            process.env.NODE_ENV = "test";

            return loadServerlessSecrets()
                .then(() => {
                    expect(serverlessSecretsClient.load.notCalled).to.eql(true);
                });
        });
    });

    describe("loadConfig", function () {
        it("delegates to `config`", function () {
            const loadedConfig = loadConfig.default();

            expect(loadedConfig).to.be.ok;
            expect(loadedConfig).to.be.an("object");
            expect(loadedConfig.posts).to.eql(config.get("posts"));
            expect(loadedConfig.me).to.eql(config.get("me"));
            expect(loadedConfig.logger).to.eql({
                enabled: config.has("logger").toString(),
                streams: Object.keys(config.get("logger.streams")).reduce((streams, key) => {
                    streams[key] = config.get(`logger.streams.${key}`).toString();
                    return streams;
                }, {}),
                level: config.get("logger.level"),
                src: config.get("logger.src").toString()
            });
        });
    });

    describe("getPostsForParsedQuerystringParameters", function () {
        it("delegates to `searchPosts` (all types)", function () {
            const stubPost = Post.fromJS({id: "woof", dateCreated: new Date(1900, 0, 1)});
            const stubPhoto = Photo.fromJS({id: "meow", dateCreated: new Date(1900, 0, 1)});
            const stubPosts = [stubPost, stubPhoto];
            const stubQueryParameters = {};
            const expectedPostsResult = {
                posts: stubPosts,
                total: {
                    global: stubPosts.length,
                    [Post.name]: 1,
                    [Photo.name]: 1
                },
                first: {
                    global: stubPost,
                    [Post.name]: stubPost,
                    [Photo.name]: stubPhoto
                },
                last: {
                    global: stubPhoto,
                    [Post.name]: stubPost,
                    [Photo.name]: stubPhoto
                }
            };
            const proxyquireStubs = {
                "../../lib/sources/searchPosts": {
                    "default": sinon.stub().callsFake(searchParams => {
                        const baseResult = searchParams.type === Photo.name
                            ? stubPhoto
                            : stubPost;
                        return Promise.resolve({
                            first: baseResult,
                            last: baseResult,
                            posts: [baseResult],
                            total: 1
                        });
                    })
                }
            };

            const proxyquiredGetPostsForParsedQuerystringParameters = proxyquire("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters", proxyquireStubs);

            return proxyquiredGetPostsForParsedQuerystringParameters.default(stubQueryParameters)
                .then(postsResult => {
                    expect(postsResult).to.be.ok;
                    expect(postsResult).to.eql(expectedPostsResult);
                    expect(proxyquireStubs["../../lib/sources/searchPosts"].default.calledTwice).to.eql(true);
                });
        });

        it("delegates to `searchPosts` (a single type)", function () {
            const stubPost = Post.fromJS({id: "woof", dateCreated: new Date(1900, 0, 1)});
            const stubPhoto = Photo.fromJS({id: "meow", dateCreated: new Date(1900, 0, 1)});
            const stubPosts = [stubPost];
            const stubQueryParameters = {type: Post.name};
            const expectedPostsResult = {
                posts: stubPosts,
                total: {
                    global: stubPosts.length,
                    [Post.name]: 1
                },
                first: {
                    global: stubPost,
                    [Post.name]: stubPost
                },
                last: {
                    global: stubPost,
                    [Post.name]: stubPost
                }
            };
            const proxyquireStubs = {
                "../../lib/sources/searchPosts": {
                    "default": sinon.stub().callsFake(searchParams => {
                        const baseResult = searchParams.type === Photo.name
                            ? stubPhoto
                            : stubPost;
                        return Promise.resolve({
                            first: baseResult,
                            last: baseResult,
                            posts: [baseResult],
                            total: 1
                        });
                    })
                }
            };

            const proxyquiredGetPostsForParsedQuerystringParameters = proxyquire("../../../../../src/serverless/util/getPostsForParsedQuerystringParameters", proxyquireStubs);

            return proxyquiredGetPostsForParsedQuerystringParameters.default(stubQueryParameters)
                .then(postsResult => {
                    expect(postsResult).to.be.ok;
                    expect(postsResult).to.eql(expectedPostsResult);
                    expect(proxyquireStubs["../../lib/sources/searchPosts"].default.calledOnce).to.eql(true);
                });
        });
    });
});
