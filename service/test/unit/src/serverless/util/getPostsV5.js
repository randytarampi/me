import {expect} from "chai";
import {RequestError} from "@randy.tarampi/js";
import {decodeCursor, encodeCursor, getVisibleFeedPartitions, mergePublicFeedPages, mergePublicFeedShards} from "../../../../../src/serverless/util/getPostsV5.js";

const post = (uid, sort) => ({uid, publicFeedSort: sort});
const visiblePost = (uid, datePublished) => ({uid, datePublished});

describe("getPostsV5", function () {
    it("does not create query shards for hidden sources", function () {
        expect(getVisibleFeedPartitions({types: ["Post"], hiddenSources: ["github"], registeredSources: ["s3", "github"]})).to.eql(["VISIBLE#Post#s3"]);
    });

    it("does not create shards for historical sources outside the registered allowlist", function () {
        expect(getVisibleFeedPartitions({types: ["Post"], hiddenSources: [], registeredSources: ["s3", "github"], source: "twitter"})).to.eql([]);
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
        const cursor = encodeCursor({v: 5, d: "descending", policy: "policy", datePublished: "2024-01-01T00:00:00.000Z", uid: "uid"});

        expect(decodeCursor(cursor)).to.eql({v: 5, d: "descending", policy: "policy", datePublished: "2024-01-01T00:00:00.000Z", uid: "uid"});
        expect(() => decodeCursor("not valid!")).to.throw(RequestError);
    });

    it("refills a bounded visibility stream without gaps or duplicate cursor results", async function () {
        const pages = [
            {posts: [visiblePost("new", "2024-01-03T00:00:00.000Z"), visiblePost("same", "2024-01-02T00:00:00.000Z"), visiblePost("duplicate", "2024-01-01T00:00:00.000Z")], lastKey: {datePublished: "2024-01-01T00:00:00.000Z"}, count: 3, scannedCount: 3, evaluated: 3, filtered: 0, rejected: 0, duplicates: 0},
            {posts: [visiblePost("duplicate", "2024-01-01T00:00:00.000Z"), visiblePost("old", "2023-12-31T00:00:00.000Z")], lastKey: undefined, count: 2, scannedCount: 2, evaluated: 2, filtered: 0, rejected: 0, duplicates: 0}
        ];
        const calls = [];
        const result = await mergePublicFeedPages({
            perPage: 2,
            policy: "policy",
            fetchPage: async (cursor, limit) => {
                calls.push({cursor, limit});
                return pages.shift();
            }
        });

        expect(result.posts.map(value => value.uid)).to.eql(["new", "same"]);
        expect(result.hasMore).to.eql(true);
        expect(result.metrics.pages).to.eql(1);
        expect(calls).to.eql([{cursor: undefined, limit: 3}]);
        expect(decodeCursor(result.nextCursor)).to.include({datePublished: "2024-01-02T00:00:00.000Z", uid: "same"});

        const continuation = await mergePublicFeedPages({
            perPage: 2,
            policy: "policy",
            cursor: {datePublished: "2024-01-02T00:00:00.000Z", uid: "same"},
            fetchPage: async (cursor, limit) => {
                calls.push({cursor, limit});
                return pages.shift();
            }
        });
        expect(continuation.posts.map(value => value.uid)).to.eql(["duplicate", "old"]);
        expect(continuation.hasMore).to.eql(false);
    });
});
