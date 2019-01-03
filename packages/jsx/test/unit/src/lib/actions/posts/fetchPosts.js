import {Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {Map, Set} from "immutable";
import {DateTime} from "luxon";
import proxyquire from "proxyquire";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    FETCHING_POSTS,
    FETCHING_POSTS_CANCELLED,
    FETCHING_POSTS_FAILURE,
    FETCHING_POSTS_FAILURE_RECOVERY,
    FETCHING_POSTS_PER_PAGE,
    FETCHING_POSTS_SUCCESS
} from "../../../../../../src/lib/actions/posts/fetchPosts";
import {SET_ERROR} from "../../../../../../src/lib/actions/error/setError";

describe("fetchPosts", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map({
            api: Map({}),
            posts: Map({
                posts: Set(),
                oldest: Map({}),
                newest: Map({})
            })
        });
        stubStore = mockStore(stubInitialState);
    });

    describe("FETCHING_POSTS", function () {
        it("isn't dispatched if already `isLoading`", function () {
            const stubFetchUrl = "/woof";
            const stubPostsResponse = {
                posts: ["woof"],
                total: ["woof"].length,
                oldest: {
                    global: DateTime.utc().toISO(),
                    Post: DateTime.utc().toISO(),
                    Photo: DateTime.utc().toISO()
                },
                newest: {
                    Post: DateTime.utc().toISO(),
                    Photo: DateTime.utc().toISO(),
                    global: DateTime.utc().toISO()
                }
            };

            const proxyquiredFetchPosts = proxyquire("../../../../../../src/lib/actions/posts/fetchPosts", {
                "../../api/fetchPosts": {
                    "default": () => Promise.resolve(stubPostsResponse)
                }
            });

            stubInitialState = Map({
                api: Map({
                    [stubFetchUrl]: Map({
                        isLoading: true
                    })
                }),
                posts: Map({posts: Set()})
            });
            stubStore = mockStore(stubInitialState);

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.eql([
                        {
                            type: FETCHING_POSTS_CANCELLED,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: undefined,
                                searchType: undefined,
                                isLoading: true
                            }
                        }
                    ]);
                });
        });

        it("is dispatched with the correct searchParams", function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {
                type: Post.type,
                perPage: FETCHING_POSTS_PER_PAGE,
                filter: "tags",
                filterValue: "meow"
            };
            const stubPostsResponse = {
                posts: ["woof"],
                total: ["woof"].length,
                oldest: {
                    Post: DateTime.utc(2017, 11, 14).toISO(),
                    Photo: DateTime.utc(2018, 11, 14).toISO()
                },
                newest: {
                    Post: DateTime.utc(2017, 11, 14).toISO(),
                    Photo: DateTime.utc(2018, 11, 14).toISO()
                }
            };
            stubPostsResponse.oldest.global = stubPostsResponse.oldest.Post;
            stubPostsResponse.newest.global = stubPostsResponse.oldest.Photo;
            const stubLoadedPost = Post.fromJSON({dateCreated: stubPostsResponse.oldest.global});

            const proxyquiredFetchPosts = proxyquire("../../../../../../src/lib/actions/posts/fetchPosts", {
                "../../api/fetchPosts": {
                    "default": () => Promise.resolve(stubPostsResponse)
                }
            });

            stubInitialState = Map({
                api: Map({
                    [stubFetchUrl]: Map({
                        isLoading: false,
                        fetchUrl: stubFetchUrl
                    })
                }),
                posts: Map({
                    posts: Set([stubLoadedPost]),
                    oldest: Map({
                        global: DateTime.fromISO(stubPostsResponse.oldest.global),
                        Photo: DateTime.fromISO(stubPostsResponse.oldest.Photo),
                        Post: DateTime.fromISO(stubPostsResponse.oldest.Post)
                    }),
                    newest: Map({
                        global: DateTime.fromISO(stubPostsResponse.newest.global),
                        Photo: DateTime.fromISO(stubPostsResponse.newest.Photo),
                        Post: DateTime.fromISO(stubPostsResponse.newest.Post)
                    })
                })
            });
            stubStore = mockStore(stubInitialState);

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl, stubSearchParams.type, stubSearchParams))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.eql([
                        {
                            type: FETCHING_POSTS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams,
                                searchType: undefined
                            }
                        },
                        {
                            type: FETCHING_POSTS_SUCCESS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams,
                                searchType: undefined,
                                ...stubPostsResponse
                            }
                        }
                    ]);
                });
        });
    });

    describe("FETCHING_POSTS_FAILURE", function () {
        it("is dispatched with the expected payload (no posts)", function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {
                perPage: FETCHING_POSTS_PER_PAGE
            };
            const stubPostsResponse = {
                posts: [],
                total: [].length,
                oldest: {
                    global: DateTime.utc().toISO(),
                    Post: DateTime.utc().toISO(),
                    Photo: DateTime.utc().toISO()
                },
                newest: {
                    Post: DateTime.utc().toISO(),
                    Photo: DateTime.utc().toISO(),
                    global: DateTime.utc().toISO()
                }
            };

            const proxyquiredFetchPosts = proxyquire("../../../../../../src/lib/actions/posts/fetchPosts", {
                "../../api/fetchPosts": {
                    "default": () => Promise.resolve(stubPostsResponse)
                }
            });

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl, stubSearchParams.type, stubSearchParams))
                .then(() => {
                    const actions = stubStore.getActions();
                    const expectedActions = [
                        {
                            type: FETCHING_POSTS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams,
                                searchType: undefined
                            }
                        },
                        {
                            type: FETCHING_POSTS_SUCCESS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams,
                                searchType: undefined,
                                ...stubPostsResponse
                            }
                        },
                        {
                            type: SET_ERROR,
                            payload: {
                                error: undefined,
                                errorCode: "ENOPOSTS",
                                errorMessage: undefined
                            }
                        }
                    ];

                    expect(actions).to.eql(expectedActions);
                });
        });

        it("is dispatched with the expected payload (has posts)", function () {
            const stubFetchUrl = "/woof";
            const stubLoadedPost = Post.fromJSON({dateCreated: DateTime.utc(2018, 8, 22)});
            const stubSearchParams = {
                perPage: FETCHING_POSTS_PER_PAGE,
                orderComparator: stubLoadedPost.dateCreated.toISO(),
                orderBy: "datePublished",
                orderComparatorType: "String",
                orderOperator: "lt"
            };
            const stubPostsResponse = new Error("woof");

            const proxyquiredFetchPosts = proxyquire("../../../../../../src/lib/actions/posts/fetchPosts", {
                "../../api/fetchPosts": {
                    "default": () => Promise.reject(stubPostsResponse)
                }
            });

            stubInitialState = Map({
                api: Map({
                    [stubFetchUrl]: Map({
                        isLoading: false
                    })
                }),
                posts: Map({
                    posts: Set([stubLoadedPost]),
                    oldest: Map({}),
                    newest: Map({})
                })
            });
            stubStore = mockStore(stubInitialState);

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl, stubSearchParams.type, stubSearchParams))
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error).to.eql(stubPostsResponse);

                    const actions = stubStore.getActions();
                    const expectedActions = [
                        {
                            type: FETCHING_POSTS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams,
                                searchType: undefined
                            }
                        },
                        {
                            type: FETCHING_POSTS_FAILURE,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams,
                                searchType: undefined,
                                error: stubPostsResponse
                            }
                        },
                        {
                            type: FETCHING_POSTS_FAILURE_RECOVERY,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams,
                                searchType: undefined
                            }
                        }
                    ];

                    expect(actions).to.eql(expectedActions);
                });
        });

        it("is dispatched with the expected payload (fetch error)", function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {
                perPage: FETCHING_POSTS_PER_PAGE
            };
            const stubPostsResponse = new Error("woof");

            const proxyquiredFetchPosts = proxyquire("../../../../../../src/lib/actions/posts/fetchPosts", {
                "../../api/fetchPosts": {
                    "default": () => Promise.reject(stubPostsResponse)
                }
            });

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl, stubSearchParams.type, stubSearchParams))
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error).to.eql(stubPostsResponse);

                    const actions = stubStore.getActions();
                    const expectedActions = [
                        {
                            type: FETCHING_POSTS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams,
                                searchType: undefined
                            }
                        },
                        {
                            type: FETCHING_POSTS_FAILURE,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams,
                                searchType: undefined,
                                error: stubPostsResponse
                            }
                        },
                        {
                            type: SET_ERROR,
                            payload: {
                                error: stubPostsResponse,
                                errorCode: "EFETCH",
                                errorMessage: undefined
                            }
                        }
                    ];

                    expect(actions).to.eql(expectedActions);
                });
        });
    });

    describe("FETCHING_POSTS_SUCCESS", function () {
        it("is dispatched with the expected payload", function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {
                perPage: FETCHING_POSTS_PER_PAGE
            };
            const stubPostsResponse = {
                posts: ["woof"],
                total: ["woof"].length,
                oldest: {
                    global: DateTime.utc().toISO(),
                    Post: DateTime.utc().toISO(),
                    Photo: DateTime.utc().toISO()
                },
                newest: {
                    Post: DateTime.utc().toISO(),
                    Photo: DateTime.utc().toISO(),
                    global: DateTime.utc().toISO()
                }
            };

            const proxyquiredFetchPosts = proxyquire("../../../../../../src/lib/actions/posts/fetchPosts", {
                "../../api/fetchPosts": {
                    "default": (fetchUrl, searchParams) => {
                        expect(fetchUrl).to.eql(stubFetchUrl);

                        expect(searchParams).to.eql(stubSearchParams);

                        return Promise.resolve(stubPostsResponse);
                    }
                }
            });

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl, stubSearchParams.type, stubSearchParams))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions[1]).to.eql(
                        {
                            type: FETCHING_POSTS_SUCCESS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams,
                                searchType: undefined,
                                ...stubPostsResponse
                            }
                        }
                    );
                });
        });
    });
});
