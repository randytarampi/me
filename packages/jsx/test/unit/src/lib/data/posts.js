import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {fromJS, Map} from "immutable";
import {DateTime} from "luxon";
import {createAction} from "redux-actions";
import {REHYDRATE} from "redux-persist/constants";
import {fetchingPostsSuccess} from "../../../../../src/lib/actions/posts/fetchPosts";
import reducer, {
    getNewestAvailablePostDateForSearchTypeAndPostType,
    getNewestFetchedPostDateForSearchTypeAndPostType,
    getNewestPost,
    getNewestPostForBoundingBox,
    getOldestAvailablePostDateForSearchTypeAndPostType,
    getOldestFetchedPostDateForSearchTypeAndPostType,
    getOldestPost,
    getOldestPostForBoundingBox,
    getPhotoPosts,
    getPhotoPostsSortedByDate,
    getPosts,
    getPostsForBoundingBox,
    getPostsSortedByDate,
    getPostsSortedByDateForBoundingBox,
    getWordPosts,
    getWordPostsSortedByDate
} from "../../../../../src/lib/data/posts";

describe("posts", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = Map({
            posts: Map(),
            oldest: Map(),
            newest: Map()
        });
    });

    it("reduces the current state for some other action", function () {
        const stubPosts = [
            Post.fromJSON({
                id: "woof",
                dateCreated: DateTime.utc().toISO()
            }),
            Photo.fromJSON({
                id: "meow",
                dateCreated: DateTime.utc().toISO()
            })
        ];
        const stubPayload = {
            posts: stubPosts
        };
        const otherAction = createAction("OTHER_ACTION");

        const updatedState = reducer(stubInitialState, otherAction(stubPayload));
        const posts = getPosts(updatedState);
        expect(posts.toArray()).to.eql([]);
    });

    describe("REHYDRATE", function () {
        it("reduces the correct state (has existing posts)", function () {
            const stubPosts = Map([
                Post.fromJSON({
                    id: "woof",
                    dateCreated: DateTime.utc().toISO()
                }),
                Photo.fromJSON({
                    id: "meow",
                    dateCreated: DateTime.utc().toISO()
                })
            ].reduce((mappedPosts, post) => {
                mappedPosts[post.uid] = post;
                return mappedPosts;
            }, {}));
            const stubPayload = {
                posts: Map({
                    posts: stubPosts,
                    oldest: Map({
                        blog: {
                            Post: stubPosts.first().dateCreated,
                            Photo: stubPosts.last().dateCreated,
                            global: stubPosts.first().dateCreated
                        }
                    }),
                    newest: Map({
                        blog: {
                            Post: stubPosts.first().dateCreated,
                            Photo: stubPosts.last().dateCreated,
                            global: stubPosts.last().dateCreated
                        }
                    })
                })
            };

            stubInitialState = Map({
                posts: stubPosts
            });
            const updatedState = reducer(stubInitialState, createAction(REHYDRATE)(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts.toArray()).to.eql(stubInitialState.get("posts").toSet().union(stubPosts.toList()).toArray());
        });

        it("reduces the correct state (has no existing posts)", function () {
            const stubPosts = Map();
            const stubPayload = {
                posts: Map({
                    posts: stubPosts,
                    oldest: Map({}),
                    newest: Map({})
                })
            };

            const updatedState = reducer(stubInitialState, createAction(REHYDRATE)(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts.toArray()).to.eql(stubInitialState.get("posts").toSet().union(stubPosts).toArray());
        });

        it("reduces the correct state (has no posts)", function () {
            const stubPayload = {};

            const updatedState = reducer(stubInitialState, createAction(REHYDRATE)(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts.toArray()).to.eql([]);
        });
    });

    describe("FETCHING_POSTS_SUCCESS", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubPosts = [
                Post.fromJSON({
                    id: "woof",
                    dateCreated: DateTime.utc().toISO()
                }),
                Photo.fromJSON({
                    id: "meow",
                    dateCreated: DateTime.utc().toISO()
                })
            ];
            const stubPayload = {
                posts: stubPosts,
                searchType: "blog",
                searchParams: {}
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts.toArray()).to.eql(stubPosts);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubPosts = [
                Post.fromJSON({
                    id: "woof",
                    dateCreated: DateTime.utc().toISO()
                }),
                Photo.fromJSON({
                    id: "meow",
                    dateCreated: DateTime.utc().toISO()
                })
            ];
            const stubPayload = {
                posts: stubPosts,
                searchType: "blog",
                searchParams: {}
            };

            const stubExistingPost = Post.fromJSON({
                id: "grr",
                dateCreated: DateTime.utc().toISO()
            });
            stubInitialState = Map({
                posts: Map([
                    stubExistingPost
                ].reduce((mappedPosts, post) => {
                    mappedPosts[post.uid] = post;
                    return mappedPosts;
                }, {})),
                oldest: Map({
                    blog: {
                        Post: stubExistingPost.dateCreated,
                        global: stubExistingPost.dateCreated
                    }
                }),
                newest: Map({
                    blog: {
                        Post: stubExistingPost.dateCreated,
                        global: stubExistingPost.dateCreated
                    }
                })
            });
            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts.toArray()).to.eql(stubInitialState.get("posts").toSet().union(stubPosts).toArray());
        });

        it("reduces the correct state (has tags)", function () {
            const stubPosts = [
                Post.fromJSON({
                    id: "woof",
                    dateCreated: DateTime.utc().toISO()
                }),
                Photo.fromJSON({
                    id: "meow",
                    dateCreated: DateTime.utc().toISO()
                })
            ];
            const stubPayload = {
                posts: stubPosts,
                searchParams: {
                    tags: "woof"
                }
            };

            stubInitialState = Map({
                posts: Map([Post.fromJSON({
                    id: "grr",
                    dateCreated: DateTime.utc().toISO()
                })].reduce((mappedPosts, post) => {
                    mappedPosts[post.uid] = post;
                    return mappedPosts;
                }, {}))
            });
            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts.toArray()).to.eql(stubInitialState.get("posts").toSet().union(stubPosts).toArray());
        });

        it("reduces the correct state (does nothing if no posts at all)", function () {
            const stubPayload = {};

            stubInitialState = Map({
                posts: Map([
                    Post.fromJSON({
                        id: "grr",
                        dateCreated: DateTime.utc().toISO()
                    })
                ].reduce((mappedPosts, post) => {
                    mappedPosts[post.uid] = post;
                    return mappedPosts;
                }, {}))
            });
            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts.toArray()).to.eql(stubInitialState.get("posts").toList().toArray());
        });

        it("reduces the correct state (does nothing if no posts to add)", function () {
            const stubPayload = {
                posts: [],
                searchParams: {}
            };

            stubInitialState = Map({
                posts: Map([
                    Post.fromJSON({
                        id: "grr",
                        dateCreated: DateTime.utc().toISO()
                    })
                ].reduce((mappedPosts, post) => {
                    mappedPosts[post.uid] = post;
                    return mappedPosts;
                }, {}))
            });
            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPosts(updatedState);
            expect(posts.toArray()).to.eql(stubInitialState.get("posts").toList().toArray());
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
                posts: stubPosts,
                searchParams: {}
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getWordPostsSortedByDate(updatedState);
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
                posts: stubPosts,
                searchParams: {}
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPhotoPostsSortedByDate(updatedState);
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
                posts: stubPosts,
                searchParams: {}
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPostsSortedByDate(updatedState);
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
                posts: stubPosts,
                searchParams: {}
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getWordPosts(updatedState);
            expect(posts).to.be.ok;
            posts.toArray().forEach(post => {
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
                posts: stubPosts,
                searchParams: {}
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPhotoPosts(updatedState);
            expect(posts).to.be.ok;
            posts.toArray().forEach(post => {
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
                posts: stubPosts,
                searchParams: {}
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const post = getOldestPost(updatedState);
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
                posts: stubPosts,
                searchParams: {}
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const post = getNewestPost(updatedState);
            expect(post).to.eql(stubPosts[3]);
        });
    });

    describe("getPostsForBoundingBox", function () {
        it("filters for posts that fit in the bounding box", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", lat: 0, long: 0, dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", lat: 1, long: 1, dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", lat: -1, long: -1, dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubPayload = {
                posts: stubPosts,
                searchParams: {}
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPostsForBoundingBox(updatedState, 1, 1, 0, 0);
            expect(posts.toArray()).to.have.members([stubPosts[0], stubPosts[1]]);
        });
    });

    describe("getPostsSortedByDateForBoundingBox", function () {
        it("filters for posts that fit in the bounding box", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", lat: 0, long: 0, dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", lat: 1, long: 1, dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", lat: -1, long: -1, dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubPayload = {
                posts: stubPosts,
                searchParams: {}
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const posts = getPostsSortedByDateForBoundingBox(updatedState, 1, 1, 0, 0);
            expect(posts.toArray()).to.eql([stubPosts[0], stubPosts[1]]);
        });
    });

    describe("getOldestPostForBoundingBox", function () {
        it("gets the oldest post that fits in the bounding box", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", lat: 0, long: 0, dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", lat: 1, long: 1, dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", lat: -1, long: -1, dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubPayload = {
                posts: stubPosts,
                searchParams: {}
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const post = getOldestPostForBoundingBox(updatedState, 1, 1, 0, 0);
            expect(post).to.eql(stubPosts[1]);
        });
    });

    describe("getNewestPostForBoundingBox", function () {
        it("gets the newest post that fits in the bounding box", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", lat: 0, long: 0, dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", lat: 1, long: 1, dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", lat: -1, long: -1, dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubPayload = {
                posts: stubPosts,
                searchParams: {}
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const post = getNewestPostForBoundingBox(updatedState, 1, 1, 0, 0);
            expect(post).to.eql(stubPosts[0]);
        });
    });

    describe("getOldestAvailablePostDateForSearchTypeAndPostType", function () {
        it("gets the oldest available post date", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", lat: 0, long: 0, dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", lat: 1, long: 1, dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", lat: -1, long: -1, dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubInitialState = fromJS({
                posts: stubPosts,
                oldest: {
                    blog: {
                        global: stubPosts[1].date.toISO()
                    }
                }
            });

            const dateString = getOldestAvailablePostDateForSearchTypeAndPostType(stubInitialState, "blog", "global");
            expect(dateString).to.eql(stubPosts[1].date.toISO());
        });
    });

    describe("getNewestAvailablePostDateForSearchTypeAndPostType", function () {
        it("gets the newest available post date", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", lat: 0, long: 0, dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", lat: 1, long: 1, dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", lat: -1, long: -1, dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubInitialState = fromJS({
                posts: stubPosts,
                newest: {
                    blog: {
                        global: stubPosts[0].date.toISO()
                    }
                }
            });

            const dateString = getNewestAvailablePostDateForSearchTypeAndPostType(stubInitialState, "blog", "global");
            expect(dateString).to.eql(stubPosts[0].date.toISO());
        });
    });

    describe("getOldestFetchedPostDateForSearchTypeAndPostType", function () {
        it("gets the oldest fetched post date", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", lat: 0, long: 0, dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", lat: 1, long: 1, dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", lat: -1, long: -1, dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubInitialState = fromJS({
                posts: stubPosts,
                oldestFetched: {
                    map: {
                        Photo: stubPosts[1].date.toISO()
                    }
                }
            });

            const dateString = getOldestFetchedPostDateForSearchTypeAndPostType(stubInitialState, "map", "Photo");
            expect(dateString).to.eql(stubPosts[1].date.toISO());
        });
    });

    describe("getNewestFetchedPostDateForSearchTypeAndPostType", function () {
        it("gets the newest fetched post date", function () {
            const stubPosts = [
                Post.fromJSON({id: "woof", lat: 0, long: 0, dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", lat: 1, long: 1, dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", lat: -1, long: -1, dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ];
            const stubInitialState = fromJS({
                posts: stubPosts,
                newestFetched: {
                    blog: {
                        Photo: stubPosts[3].date.toISO()
                    }
                }
            });

            const dateString = getNewestFetchedPostDateForSearchTypeAndPostType(stubInitialState, "blog", "Photo");
            expect(dateString).to.eql(stubPosts[3].date.toISO());
        });
    });
});
