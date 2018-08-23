import {expect} from "chai";
import {Map, Set} from "immutable";
import {fetchingSuccess} from "../../../lib/actions/fetchPosts";
import reducer, {getPosts} from "../../../lib/data/posts";

describe("posts", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = Map({
            posts: new Set()
        });
    });

    describe("FETCHING_POSTS_SUCCESS", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubPosts = ["woof", "meow"];
            const stubPayload = {
                posts: stubPosts
            };

            const updatedState = reducer(stubInitialState, fetchingSuccess(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts).to.be.ok;
            expect(posts.toJS()).to.eql(stubPosts);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubPosts = ["woof", "meow"];
            const stubPayload = {
                posts: stubPosts
            };

            stubInitialState = Map({
                posts: new Set(["grr"])
            });
            const updatedState = reducer(stubInitialState, fetchingSuccess(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts).to.be.ok;
            expect(posts.toJS()).to.eql(stubInitialState.get("posts").union(stubPosts).toJS());
        });

        it("reduces the correct state (does nothing if no posts to add)", function () {
            const stubPayload = {};

            stubInitialState = Map({
                posts: new Set(["grr"])
            });
            const updatedState = reducer(stubInitialState, fetchingSuccess(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts).to.be.ok;
            expect(posts.toJS()).to.eql(stubInitialState.get("posts").toJS());
        });
    });
});
