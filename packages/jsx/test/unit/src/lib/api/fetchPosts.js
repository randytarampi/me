const {getEntityForType, Photo, Post} = require("@randy.tarampi/js");
const {expect} = require("chai");
const {DateTime} = require("luxon");
const sinon = require("sinon");
const queryString = require("query-string").default || require("query-string");
const fetchPostsApi = require("../../../../../src/lib/api/fetchPosts.js").default || require("../../../../../src/lib/api/fetchPosts.js");

describe("fetchPosts", function () {
    it("delegates to `fetch` with the correct parameters", async function () {
        const stubFetchUrl = "/fetch!";
        const stubPost = Post.fromJSON({
            id: "woof",
            dateCreated: DateTime.utc().toISO(),
            datePublished: DateTime.utc().toISO()
        });
        const stubPhoto = Photo.fromJSON({
            id: "meow",
            dateCreated: DateTime.utc().toISO(),
            datePublished: DateTime.utc().toISO()
        });
        const stubPosts = [stubPost, stubPhoto].map(post => post.toJSON());
        const stubPostsResponse = {
            json: () => {
                return Promise.resolve({
                    posts: stubPosts,
                    total: stubPosts.length,
                    oldest: stubPost.dateCreated.toISO(),
                    newest: stubPhoto.dateCreated.toISO()
                });
            }
        };
        const stubSearchParams = {
            woof: true,
            meow: "MEOW",
            grr: 2
        };

        const fetchStub = sinon.stub(global, "fetch").callsFake((fetchUrl, options) => {
            expect(fetchUrl).to.match(/^\/fetch!/);

            const parsedQuerystringParams = queryString.parse(fetchUrl.replace(stubFetchUrl, ""));
            expect(parsedQuerystringParams).to.eql({
                woof: stubSearchParams.woof.toString(),
                meow: stubSearchParams.meow.toString(),
                grr: stubSearchParams.grr.toString()
            });

            expect(options.headers).to.eql({
                "Accept": "application/json",
                "Accept-Charset": "utf-8",
                "ME-API-VERSION": 4
            });

            return Promise.resolve(stubPostsResponse);
        });

        try {
            const postsResponse = await fetchPostsApi(stubFetchUrl, stubSearchParams);
            expect(postsResponse).to.eql({
                posts: stubPosts.map(post => getEntityForType(post.type).fromJS(post)),
                total: stubPosts.length,
                oldest: stubPost.dateCreated.toISO(),
                newest: stubPhoto.dateCreated.toISO()
            });
        } finally {
            fetchStub.restore();
        }
    });

    it("instantiates a `Post` for unrecognized `Post.type`s", async function () {
        const stubFetchUrl = "/fetch!";
        const stubPost = Post.fromJSON({
            id: "woof",
            dateCreated: DateTime.utc().toISO(),
            datePublished: DateTime.utc().toISO()
        });
        const stubPhoto = Photo.fromJSON({
            id: "meow",
            type: "meow",
            dateCreated: DateTime.utc().toISO(),
            datePublished: DateTime.utc().toISO()
        });
        const stubPosts = [stubPost, stubPhoto].map(post => post.toJSON());
        const stubPostsResponse = {
            json: () => {
                return Promise.resolve({
                    posts: stubPosts,
                    total: stubPosts.length,
                    oldest: stubPost.dateCreated.toISO(),
                    newest: stubPhoto.dateCreated.toISO()
                });
            }
        };
        const stubSearchParams = {
            woof: true,
            meow: "MEOW",
            grr: 2
        };

        const fetchStub = sinon.stub(global, "fetch").callsFake((fetchUrl, options) => {
            expect(fetchUrl).to.match(/^\/fetch!/);

            const parsedQuerystringParams = queryString.parse(fetchUrl.replace(stubFetchUrl, ""));
            expect(parsedQuerystringParams).to.eql({
                woof: stubSearchParams.woof.toString(),
                meow: stubSearchParams.meow.toString(),
                grr: stubSearchParams.grr.toString()
            });

            expect(options.headers).to.eql({
                "Accept": "application/json",
                "Accept-Charset": "utf-8",
                "ME-API-VERSION": 4
            });

            return Promise.resolve(stubPostsResponse);
        });

        try {
            const postsResponse = await fetchPostsApi(stubFetchUrl, stubSearchParams);
            expect(postsResponse).to.eql({
                posts: stubPosts.map(post => Post.fromJS(post)),
                total: stubPosts.length,
                oldest: stubPost.dateCreated.toISO(),
                newest: stubPhoto.dateCreated.toISO()
            });
        } finally {
            fetchStub.restore();
        }
    });
});
