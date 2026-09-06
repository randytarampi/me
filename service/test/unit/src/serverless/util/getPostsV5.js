import {expect} from "chai";
import {RequestError} from "@randy.tarampi/js";
import {decodeCursor, encodeCursor, getVisibleFeedPartitions, mergePublicFeedShards} from "../../../../../src/serverless/util/getPostsV5.js";

const post = (uid, sort) => ({uid, publicFeedSort: sort});

describe("getPostsV5", function () {
    it("does not create query shards for hidden sources", function () {
        expect(getVisibleFeedPartitions({types: ["Post"], hiddenSources: ["github"], registeredSources: ["s3", "github"]})).to.eql(["VISIBLE#Post#s3"]);
    });

    it("k-way merges skewed shards, removes duplicates, and refills exhausted pages", async function () {
        const pages = {
            a: [
                {posts: [post("a-new", "0000000000003#a-new")], hasMore: true, nextCursor: "0000000000003#a-new"},
                {posts: [post("a-old", "0000000000001#a-old")], hasMore: false}
            ],
            b: [{posts: [post("b-new", "0000000000002#b-new"), post("a-new", "0000000000003#a-new")], hasMore: false}]
        };
        const calls = [];
        const fetchPage = async (partition, cursor) => {
            calls.push([partition, cursor]);
            return pages[partition].shift() || {posts: [], hasMore: false};
        };

        const result = await mergePublicFeedShards({shards: ["a", "b"], perPage: 2, fetchPage});

        expect(result.posts.map(value => value.uid)).to.eql(["a-new", "b-new"]);
        expect(result.hasMore).to.eql(true);
        expect(result.metrics.duplicates).to.eql(1);
        expect(result.metrics.refills).to.eql(1);
        expect(calls).to.eql([["a", undefined], ["b", undefined], ["a", "0000000000003#a-new"]]);
    });

    it("rejects a failed shard without returning a partial page", async function () {
        let fetches = 0;
        try {
            await mergePublicFeedShards({
                shards: ["good", "failed"],
                perPage: 1,
                fetchPage: async partition => {
                    fetches++;
                    if (partition === "failed") throw new Error("shard failed");
                    return {posts: [post("good", "0000000000001#good")], hasMore: false};
                }
            });
            throw new Error("expected shard failure");
        } catch (error) {
            expect(error.message).to.eql("shard failed");
            expect(fetches).to.eql(2);
        }
    });

    it("encodes cursors and rejects malformed tokens", function () {
        const cursor = encodeCursor({v: 5, d: "descending", policy: "policy", sort: "sort"});

        expect(decodeCursor(cursor)).to.eql({v: 5, d: "descending", policy: "policy", sort: "sort"});
        expect(() => decodeCursor("not valid!")).to.throw(RequestError);
    });
});
