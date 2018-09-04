import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import proxyquire from "proxyquire";
import sinon from "sinon";

describe("getPosts", function () {
    it("delegates to `searchPosts`", function (done) {
        this.timeout(5000);

        const stubEvent = {};
        const stubContext = {};
        const stubPost = Post.fromJS({id: "woof", dateCreated: new Date()});
        const stubPhoto = Photo.fromJS({id: "meow", dateCreated: new Date()});
        const stubPosts = [stubPost, stubPhoto];
        const stubHeaders = {};
        const stubQuerystringParameters = {};
        const expectedPostsResult = {
            posts: stubPosts,
            total: stubPosts.length,
            first: stubPost,
            last: stubPhoto
        };
        const stubResponse = "meow";
        const proxyquireStubs = {
            "../../../lib/searchPosts": {
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
                }),
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve()),
            },
            "../../util/request/parseHeaders": {
                "default": sinon.stub().returns(stubHeaders),
            },
            "../../util/request/parseQuerystringParameters": {
                "default": sinon.stub().returns(stubQuerystringParameters),
            },
            "../../util/response/buildPostsResponse": {
                "default": sinon.stub().callsFake(headers => postsResult => {
                    try {
                        expect(headers).to.eql(stubHeaders);
                        expect(postsResult).to.eql(expectedPostsResult);
                        return stubResponse;
                    } catch (error) {
                        done(error);
                    }
                })
            },
            "../../util/response/returnErrorResponse": {
                "default": sinon.stub().callsFake(callback => {
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
                expect(proxyquireStubs["../../../lib/searchPosts"].default.calledTwice).to.eql(true);
                expect(proxyquireStubs["../../util/configureEnvironment"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/buildPostsResponse"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/returnErrorResponse"].default.calledOnce).to.eql(true);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredGetPosts = proxyquire("../../../../../serverless/handlers/getPosts", proxyquireStubs);

        proxyquiredGetPosts.default(stubEvent, stubContext, stubCallback);
    });

    it("`returnErrorResponse` on error", function (done) {
        const stubEvent = {};
        const stubContext = {};
        const stubPost = Post.fromJS({id: "woof", dateCreated: Date.now()});
        const stubPhoto = Photo.fromJS({id: "meow", dateCreated: Date.now()});
        const stubHeaders = {};
        const stubQuerystringParameters = {};
        const stubError = new Error("woof");
        const proxyquireStubs = {
            "../../../lib/searchPosts": {
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
                }),
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve()),
            },
            "../../util/request/parseHeaders": {
                "default": sinon.stub().returns(stubHeaders),
            },
            "../../util/request/parseQuerystringParameters": {
                "default": sinon.stub().returns(stubQuerystringParameters),
            },
            "../../util/response/buildPostsResponse": {
                "default": sinon.stub().throws(stubError)
            },
            "../../util/response/returnErrorResponse": {
                "default": sinon.stub().callsFake(callback => {
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
                expect(error).to.be.ok;
                expect(error.message).to.eql(stubError.message);
                expect(proxyquireStubs["../../util/request/parseHeaders"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/request/parseQuerystringParameters"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../../lib/searchPosts"].default.calledTwice).to.eql(true);
                expect(proxyquireStubs["../../util/configureEnvironment"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/buildPostsResponse"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/returnErrorResponse"].default.calledOnce).to.eql(true);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredGetPosts = proxyquire("../../../../../serverless/handlers/getPosts", proxyquireStubs);

        proxyquiredGetPosts.default(stubEvent, stubContext, stubCallback);
    });

    it("`returnErrorResponse` on parse error", function (done) {
        const stubEvent = {};
        const stubContext = {};
        const stubPost = Post.fromJS({id: "woof", dateCreated: Date.now()});
        const stubPhoto = Photo.fromJS({id: "meow", dateCreated: Date.now()});
        const stubHeaders = {};
        const stubError = new Error("woof");
        const proxyquireStubs = {
            "../../../lib/searchPosts": {
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
                }),
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve()),
            },
            "../../util/request/parseHeaders": {
                "default": sinon.stub().returns(stubHeaders),
            },
            "../../util/request/parseQuerystringParameters": {
                "default": sinon.stub().throws(stubError),
            },
            "../../util/response/buildPostsResponse": {
                "default": sinon.stub().throws(new Error("Wtf? This should've thrown"))
            },
            "../../util/response/returnErrorResponse": {
                "default": sinon.stub().callsFake(callback => {
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
                expect(error).to.be.ok;
                expect(error.message).to.eql(stubError.message);
                expect(proxyquireStubs["../../util/request/parseHeaders"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/request/parseQuerystringParameters"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../../lib/searchPosts"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/configureEnvironment"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/response/buildPostsResponse"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/response/returnErrorResponse"].default.calledOnce).to.eql(true);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredGetPosts = proxyquire("../../../../../serverless/handlers/getPosts", proxyquireStubs);

        proxyquiredGetPosts.default(stubEvent, stubContext, stubCallback);
    });

    it("returns early after being warmed", function (done) {
        const stubEvent = {source: "serverless-plugin-warmup"};
        const stubContext = {};
        const proxyquireStubs = {
            "../../../lib/searchPosts": {
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
            "../../util/response/buildPostsResponse": {
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
                expect(proxyquireStubs["../../../lib/searchPosts"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/configureEnvironment"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/response/buildPostsResponse"].default.notCalled).to.eql(true);
                expect(proxyquireStubs["../../util/response/returnErrorResponse"].default.notCalled).to.eql(true);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredGetPosts = proxyquire("../../../../../serverless/handlers/getPosts", proxyquireStubs);

        proxyquiredGetPosts.default(stubEvent, stubContext, stubCallback);
    });
});
