import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import * as versionHeader from "../../../../../../src/serverless/util/request/headers/version";
import buildPostsResponse, * as postsReponseBuilder
    from "../../../../../../src/serverless/util/response/buildPostsResponse";

describe("buildPostsResponse", function () {
    let stubPost;
    let stubPhoto;
    let stubPosts;

    beforeEach(function () {
        stubPost = Post.fromJSON({id: "woof", dateCreated: DateTime.utc().toISO()});
        stubPhoto = Photo.fromJSON({id: "meow", dateCreated: DateTime.utc().toISO()});
        stubPosts = [stubPost, stubPhoto];
    });

    describe("buildPostsV2ResponseBody", function () {
        it("builds the expected response body", function () {
            const stubSearchPostsResponse = {
                posts: stubPosts,
                total: stubPosts.length,
                first: stubPost,
                last: stubPhoto
            };
            const response = postsReponseBuilder.buildPostsV2ResponseBody(stubSearchPostsResponse);

            expect(response).to.be.ok;
            expect(response).to.eql({
                posts: stubPosts,
                total: stubPosts.length,
                oldest: stubPost.dateCreated.toISO(),
                newest: stubPhoto.dateCreated.toISO()
            });
        });

        it("handles an empty response", function () {
            const stubSearchPostsResponse = {
                posts: [],
                total: [].length,
                first: undefined,
                last: undefined
            };
            const response = postsReponseBuilder.buildPostsV2ResponseBody(stubSearchPostsResponse);

            expect(response).to.be.ok;
            expect(response).to.eql({
                posts: stubSearchPostsResponse.posts,
                total: stubSearchPostsResponse.total,
                oldest: undefined,
                newest: undefined
            });
        });
    });

    describe("buildPostsV1ResponseBody", function () {
        it("builds the expected response body", function () {
            const stubSearchPostsResponse = {
                posts: stubPosts,
                total: stubPosts.length,
                first: stubPost,
                last: stubPhoto
            };
            const response = postsReponseBuilder.buildPostsV1ResponseBody(stubSearchPostsResponse.posts);

            expect(response).to.be.ok;
            expect(response).to.eql(stubPosts);
        });

        it("handles an empty response", function () {
            const stubSearchPostsResponse = {
                posts: [],
                total: [].length,
                first: undefined,
                last: undefined
            };
            const response = postsReponseBuilder.buildPostsV1ResponseBody(stubSearchPostsResponse.posts);

            expect(response).to.be.ok;
            expect(response).to.eql(stubSearchPostsResponse.posts);
        });
    });

    describe("default", function () {
        it("delegates to buildPostsV1ResponseBody for no version", function () {
            const stubSearchPostsResponse = {
                posts: stubPosts,
                total: stubPosts.length,
                first: stubPost,
                last: stubPhoto
            };
            const stubParsedHeaders = {};

            const response = buildPostsResponse(stubParsedHeaders)(stubSearchPostsResponse);

            expect(response).to.be.ok;
            expect(response.body).to.be.ok;
            expect(response.body).to.eql(JSON.stringify(stubSearchPostsResponse.posts));
        });

        it("delegates to buildPostsV1ResponseBody for version 1", function () {
            const stubSearchPostsResponse = {
                posts: stubPosts,
                total: stubPosts.length,
                first: stubPost,
                last: stubPhoto
            };
            const stubParsedHeaders = {
                [versionHeader.headerName]: 1
            };

            const response = buildPostsResponse(stubParsedHeaders)(stubSearchPostsResponse);

            expect(response).to.be.ok;
            expect(response.body).to.be.ok;
            expect(response.body).to.eql(JSON.stringify(stubSearchPostsResponse.posts));
        });

        it("delegates to buildPostsV2ResponseBody for version 2", function () {
            const stubSearchPostsResponse = {
                posts: stubPosts,
                total: stubPosts.length,
                first: stubPost,
                last: stubPhoto
            };
            const stubParsedHeaders = {
                [versionHeader.headerName]: 2
            };

            const response = buildPostsResponse(stubParsedHeaders)(stubSearchPostsResponse);

            expect(response).to.be.ok;
            expect(response.body).to.be.ok;
            expect(response.body).to.contain(JSON.stringify(stubSearchPostsResponse.posts));
        });

        it("delegates to buildPostsV3ResponseBody for version 3", function () {
            const stubSearchPostsResponse = {
                posts: stubPosts,
                total: stubPosts.length,
                first: {
                    global: stubPost,
                    Post: stubPost,
                    Photo: stubPhoto
                },
                last: {
                    global: stubPhoto,
                    Post: stubPost,
                    Photo: stubPhoto
                }
            };
            const stubParsedHeaders = {
                [versionHeader.headerName]: 3
            };

            const response = buildPostsResponse(stubParsedHeaders)(stubSearchPostsResponse);

            expect(response).to.be.ok;
            expect(response.body).to.be.ok;
            expect(response.body).to.contain(JSON.stringify(stubSearchPostsResponse.posts));
        });

        it("throws if API version is unsupported", function () {
            const stubSearchPostsResponse = {
                posts: stubPosts,
                total: stubPosts.length,
                first: stubPost,
                last: stubPhoto
            };
            const stubParsedHeaders = {
                [versionHeader.headerName]: 999
            };

            try {
                buildPostsResponse(stubParsedHeaders)(stubSearchPostsResponse);
                throw new Error("Wtf? This should've thrown");
            } catch (error) {
                expect(error).to.be.ok;
                expect(error.message).to.match(/^`ME-API-VERSION` specifies unsupported version of `999`$/);
            }
        });
    });
});
