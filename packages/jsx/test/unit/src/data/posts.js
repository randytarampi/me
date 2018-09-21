import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map, Set} from "immutable";
import {createAction} from "redux-actions";
import {fetchingPostsSuccess} from "../../../../src/lib/actions/fetchPosts";
import reducer, {
    getNewestPost,
    getOldestPost,
    getPhotoPosts,
    getPhotoPostsSortedByDate,
    getPosts,
    getPostsSortedByDate,
    getWordPosts,
    getWordPostsSortedByDate
} from "../../../../src/lib/data/posts";

describe("posts", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = Map({
            posts: new Set()
        });
    });

    it("reduces the current state for some other action", function () {
        const stubPosts = ["woof", "meow"];
        const stubPayload = {
            posts: stubPosts
        };
        const otherAction = createAction("OTHER_ACTION");

        const updatedState = reducer(stubInitialState, otherAction(stubPayload));
        const posts = getPosts(updatedState);
        expect(posts).to.be.ok;
        expect(posts.toArray()).to.eql([]);
    });

    describe("FETCHING_POSTS_SUCCESS", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubPosts = ["woof", "meow"];
            const stubPayload = {
                posts: stubPosts
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts).to.be.ok;
            expect(posts.toArray()).to.eql(stubPosts);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubPosts = ["woof", "meow"];
            const stubPayload = {
                posts: stubPosts
            };

            stubInitialState = Map({
                posts: new Set(["grr"])
            });
            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts).to.be.ok;
            expect(posts.toArray()).to.eql(stubInitialState.get("posts").union(stubPosts).toArray());
        });

        it("reduces the correct state (does nothing if no posts to add)", function () {
            const stubPayload = {};

            stubInitialState = Map({
                posts: new Set(["grr"])
            });
            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts).to.be.ok;
            expect(posts.toArray()).to.eql(stubInitialState.get("posts").toArray());
        });
    });

    describe("getWordPostsSortedByDate", function () {
        it("gets word posts sorted by date", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubPayload = {
                posts: stubPosts
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getWordPostsSortedByDate(updatedState);
            expect(posts).to.be.ok;
            expect(posts.toArray()).to.eql([
                stubPosts[0],
                stubPosts[2]
            ]);
        });
    });

    describe("getPhotoPostsSortedByDate", function () {
        it("gets photo posts sorted by date", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubPayload = {
                posts: stubPosts
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPhotoPostsSortedByDate(updatedState);
            expect(posts).to.be.ok;
            expect(posts.toArray()).to.eql([
                stubPosts[3],
                stubPosts[1]
            ]);
        });
    });

    describe("getPostsSortedByDate", function () {
        it("gets all posts sorted by date", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubPayload = {
                posts: stubPosts
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPostsSortedByDate(updatedState);
            expect(posts).to.be.ok;
            expect(posts.toArray()).to.eql([
                stubPosts[3],
                stubPosts[0],
                stubPosts[2],
                stubPosts[1]
            ]);
        });
    });

    describe("getWordPosts", function () {
        it("gets word posts", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubPayload = {
                posts: stubPosts
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getWordPosts(updatedState);
            expect(posts).to.be.ok;
            posts.toArray().forEach(post => {
                expect(post).to.be.ok;
                expect(post).to.be.instanceOf(Post);
            });
        });
    });

    describe("getPhotoPosts", function () {
        it("gets photo posts", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubPayload = {
                posts: stubPosts
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPhotoPosts(updatedState);
            expect(posts).to.be.ok;
            posts.toArray().forEach(post => {
                expect(post).to.be.ok;
                expect(post).to.be.instanceOf(Photo);
            });
        });
    });

    describe("getOldestPost", function () {
        it("gets the oldest post", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubPayload = {
                posts: stubPosts
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const post = getOldestPost(updatedState);
            expect(post).to.be.ok;
            expect(post).to.eql(stubPosts[1]);
        });
    });

    describe("getNewestPost", function () {
        it("gets the newest post", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubPayload = {
                posts: stubPosts
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const post = getNewestPost(updatedState);
            expect(post).to.be.ok;
            expect(post).to.eql(stubPosts[3]);
        });
    });
});
