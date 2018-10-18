import {getEntityForType, Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import proxyquire from "proxyquire";
import queryString from "query-string";

describe("fetchPosts", function () {
    it("delegates to `fetch` with the correct parameters", function () {
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

        const proxyquiredFetchPosts = proxyquire("../../../../../src/lib/api/fetchPosts", {
            "isomorphic-fetch": (fetchUrl, options) => {
                expect(fetchUrl).to.be.ok;
                expect(fetchUrl).to.match(/^\/fetch!/);

                const parsedQuerystringParams = queryString.parse(fetchUrl.replace(stubFetchUrl, ""));
                expect(parsedQuerystringParams).to.be.ok;
                expect(parsedQuerystringParams).to.eql({
                    woof: stubSearchParams.woof.toString(),
                    meow: stubSearchParams.meow.toString(),
                    grr: stubSearchParams.grr.toString()
                });

                expect(options).to.be.ok;
                expect(options.headers).to.be.ok;
                expect(options.headers).to.eql({
                    "Accept": "application/json",
                    "Accept-Charset": "utf-8",
                    "ME-API-VERSION": 3
                });

                return Promise.resolve(stubPostsResponse);
            }
        });

        return proxyquiredFetchPosts.default(stubFetchUrl, stubSearchParams)
            .then(postsResponse => {
                expect(postsResponse).to.be.ok;
                expect(postsResponse).to.eql({
                    posts: stubPosts.map(post => getEntityForType(post.type).fromJS(post)),
                    total: stubPosts.length,
                    oldest: stubPost.dateCreated.toISO(),
                    newest: stubPhoto.dateCreated.toISO()
                });
            });
    });

});
