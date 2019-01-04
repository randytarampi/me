import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import proxyquire from "proxyquire";
import sinon from "sinon";
import RssFeed from "../../../../../../src/lib/rssFeed";

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

    it("delegates to `getPostsForParsedQuerystringParameters`", function (done) {
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
        const proxyquireStubs = {
            "../../util/getPostsForParsedQuerystringParameters": {
                "default": sinon.stub().callsFake(() => {
                    const stubPosts = [stubPhoto, stubPost];
                    return Promise.resolve({
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
                })
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve())
            },
            "../../util/request/parseHeaders": {
                "default": sinon.stub().returns(stubHeaders)
            },
            "../../util/request/parseQuerystringParameters": {
                "default": sinon.stub().returns(stubQuerystringParameters)
            },
            "../../util/response/buildRssResponse": {
                "default": sinon.stub().callsFake(({rss: rssResult}, headers) => {
                    try {
                        expect(headers).to.eql(stubHeaders);
                        expect(rssResult.docs).to.eql(expectedFeedResult.docs);
                        expect(rssResult.title).to.eql(expectedFeedResult.title);
                        expect(rssResult.items).to.eql(expectedFeedResult.items);
                        return stubResponse;
                    } catch (error) {
                        done(error);
                    }
                })
            },
            "../../util/response/returnErrorResponse": {
                "default": sinon.stub().callsFake((event, context, callback) => {
                    try {
                        expect(callback).to.eql(stubCallback);
                        return stubCallback;
                    } catch (error) {
                        done(error);
                    }
                })
            }
        };
        const stubCallback = (error, postsResult) => {
            try {
                expect(error).to.not.be.ok;
                expect(postsResult).to.eql(stubResponse);
                expect(proxyquireStubs["../../util/request/parseHeaders"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/request/parseQuerystringParameters"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/configureEnvironment"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/getPostsForParsedQuerystringParameters"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/buildRssResponse"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/returnErrorResponse"].default.calledOnce).to.eql(true);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredgetPostsRss = proxyquire("../../../../../../src/serverless/handlers/getPostsRss", proxyquireStubs);

        proxyquiredgetPostsRss.default(stubEvent, stubContext, stubCallback);
    });

    it("`returnErrorResponse` on error", function (done) {
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
        const proxyquireStubs = {
            "../../util/getPostsForParsedQuerystringParameters": {
                "default": sinon.stub().callsFake(() => {
                    const stubPosts = [stubPost, stubPhoto];
                    return Promise.resolve({
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
                })
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve())
            },
            "../../util/request/parseHeaders": {
                "default": sinon.stub().returns(stubHeaders)
            },
            "../../util/request/parseQuerystringParameters": {
                "default": sinon.stub().returns(stubQuerystringParameters)
            },
            "../../util/response/buildRssResponse": {
                "default": sinon.stub().throws(stubError)
            },
            "../../util/response/returnErrorResponse": {
                "default": sinon.stub().callsFake((event, context, callback) => {
                    try {
                        expect(callback).to.eql(stubCallback);
                        return stubErrorCallback;
                    } catch (error) {
                        done(error);
                    }
                })
            }
        };
        const stubCallback = () => {
            throw new Error("Wtf? This should've thrown");
        };
        const stubErrorCallback = error => {
            try {
                expect(error.message).to.eql(stubError.message);
                expect(proxyquireStubs["../../util/request/parseHeaders"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/request/parseQuerystringParameters"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/configureEnvironment"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/getPostsForParsedQuerystringParameters"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/buildRssResponse"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/returnErrorResponse"].default.calledOnce).to.eql(true);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredgetPostsRss = proxyquire("../../../../../../src/serverless/handlers/getPostsRss", proxyquireStubs);

        proxyquiredgetPostsRss.default(stubEvent, stubContext, stubCallback);
    });

    it("`returnErrorResponse` on parse error", function (done) {
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
        const proxyquireStubs = {
            "../../util/getPostsForParsedQuerystringParameters": {
                "default": sinon.stub().callsFake(() => {
                    const stubPosts = [stubPost, stubPhoto];
                    return Promise.resolve({
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
                })
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve())
            },
            "../../util/request/parseHeaders": {
                "default": sinon.stub().returns(stubHeaders)
            },
            "../../util/request/parseQuerystringParameters": {
                "default": sinon.stub().throws(stubError)
            },
            "../../util/response/buildRssResponse": {
                "default": sinon.stub().throws(new Error("Wtf? This should've thrown"))
            },
            "../../util/response/returnErrorResponse": {
                "default": sinon.stub().callsFake((event, context, callback) => {
                    try {
                        expect(callback).to.eql(stubCallback);
                        return stubErrorCallback;
                    } catch (error) {
                        done(error);
                    }
                })
            }
        };
        const stubCallback = () => {
            throw new Error("Wtf? This should've thrown");
        };
        const stubErrorCallback = error => {
            try {
                expect(error.message).to.eql(stubError.message);
                expect(proxyquireStubs["../../util/request/parseHeaders"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/request/parseQuerystringParameters"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/configureEnvironment"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/getPostsForParsedQuerystringParameters"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/response/buildRssResponse"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/response/returnErrorResponse"].default.calledOnce).to.eql(true);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredgetPostsRss = proxyquire("../../../../../../src/serverless/handlers/getPostsRss", proxyquireStubs);

        proxyquiredgetPostsRss.default(stubEvent, stubContext, stubCallback);
    });

    it("returns early after being warmed", function (done) {
        const stubEvent = {source: "serverless-plugin-warmup"};
        const stubContext = {};
        const proxyquireStubs = {
            "../../util/getPostsForParsedQuerystringParameters": {
                "default": sinon.stub().throws(new Error("Wtf? This should've thrown"))
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().throws(new Error("Wtf? This should've thrown"))
            },
            "../../util/request/parseHeaders": {
                "default": sinon.stub().throws(new Error("Wtf? This should've thrown"))
            },
            "../../util/request/parseQuerystringParameters": {
                "default": sinon.stub().throws(new Error("Wtf? This should've thrown"))
            },
            "../../util/response/buildRssResponse": {
                "default": sinon.stub().throws(new Error("Wtf? This should've thrown"))
            },
            "../../util/response/returnErrorResponse": {
                "default": sinon.stub().throws(new Error("Wtf? This should've thrown"))
            }
        };
        const stubCallback = (error, lambdaIsWarm) => {
            try {
                expect(error).to.not.be.ok;
                expect(lambdaIsWarm).to.match(/Lambda is warm!/);
                expect(proxyquireStubs["../../util/request/parseHeaders"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/request/parseQuerystringParameters"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/configureEnvironment"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/getPostsForParsedQuerystringParameters"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/response/buildRssResponse"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/response/returnErrorResponse"].default.notCalled).to.eql(true);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredgetPostsRss = proxyquire("../../../../../../src/serverless/handlers/getPostsRss", proxyquireStubs);

        proxyquiredgetPostsRss.default(stubEvent, stubContext, stubCallback);
    });
});
