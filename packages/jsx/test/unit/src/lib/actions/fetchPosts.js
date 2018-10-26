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
} from "../../../../../src/lib/actions/fetchPosts";
import {SET_ERROR} from "../../../../../src/lib/actions/setError";

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

            const proxyquiredFetchPosts = proxyquire("../../../../../src/lib/actions/fetchPosts", {
                "../api/fetchPosts": {
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

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(1);
                    expect(actions).to.eql([
                        {
                            type: FETCHING_POSTS_CANCELLED,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                isLoading: true
                            }
                        }
                    ]);
                });
        });

        it("isn't dispatched if already loaded the oldest post", function () {
            const stubFetchUrl = "/woof";
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
            const stubLoadedPost = Post.fromJSON({dateCreated: stubPostsResponse.oldest.global});

            const proxyquiredFetchPosts = proxyquire("../../../../../src/lib/actions/fetchPosts", {
                "../api/fetchPosts": {
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

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(1);
                    expect(actions).to.eql([
                        {
                            type: FETCHING_POSTS_CANCELLED,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                oldestPostAvailableDate: stubInitialState.getIn(["posts", "oldest", "global"]),
                                oldestLoadedPostDate: stubLoadedPost.dateCreated
                            }
                        }
                    ]);
                });
        });

        it("is dispatched with the expected payload (first page)", function () {
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

            const proxyquiredFetchPosts = proxyquire("../../../../../src/lib/actions/fetchPosts", {
                "../api/fetchPosts": {
                    "default": (fetchUrl, searchParams) => {
                        expect(fetchUrl).to.be.ok;
                        expect(fetchUrl).to.eql(stubFetchUrl);

                        expect(searchParams).to.be.ok;
                        expect(searchParams).to.eql(stubSearchParams);

                        return Promise.resolve(stubPostsResponse);
                    }
                }
            });

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(2);
                    expect(actions).to.eql([
                        {
                            type: FETCHING_POSTS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams
                            }
                        },
                        {
                            type: FETCHING_POSTS_SUCCESS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                ...stubPostsResponse
                            }
                        }
                    ]);
                });
        });

        it("is dispatched with the expected payload (subsequent page)", function () {
            const stubFetchUrl = "/woof";
            const stubPostsResponse = {
                posts: ["grr"],
                total: ["grr"].length,
                oldest: {
                    global: DateTime.utc(1991, 11, 14).toISO(),
                    Post: DateTime.utc(1991, 11, 14).toISO(),
                    Photo: DateTime.utc(1991, 11, 14).toISO()
                },
                newest: {
                    Post: DateTime.utc().toISO(),
                    Photo: DateTime.utc().toISO(),
                    global: DateTime.utc().toISO()
                }
            };
            const stubLoadedPost = Post.fromJSON({dateCreated: DateTime.utc(2018, 8, 22)});
            const stubSearchParams = {
                perPage: FETCHING_POSTS_PER_PAGE,
                orderComparator: stubLoadedPost.dateCreated.toISO(),
                orderBy: "datePublished",
                orderComparatorType: "String",
                orderOperator: "lt"
            };

            const proxyquiredFetchPosts = proxyquire("../../../../../src/lib/actions/fetchPosts", {
                "../api/fetchPosts": {
                    "default": (fetchUrl, searchParams) => {
                        expect(fetchUrl).to.be.ok;
                        expect(fetchUrl).to.eql(stubFetchUrl);

                        expect(searchParams).to.be.ok;
                        expect(searchParams).to.eql(stubSearchParams);

                        return Promise.resolve(stubPostsResponse);
                    }
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
                    oldest: Map({
                        global: DateTime.fromISO(stubPostsResponse.oldest.global),
                        Post: DateTime.fromISO(stubPostsResponse.oldest.Post),
                        Photo: DateTime.fromISO(stubPostsResponse.oldest.Photo)
                    }),
                    newest: Map({
                        Post: DateTime.fromISO(stubPostsResponse.newest.Post),
                        Photo: DateTime.fromISO(stubPostsResponse.newest.Photo),
                        global: DateTime.fromISO(stubPostsResponse.newest.global)
                    })
                })
            });
            stubStore = mockStore(stubInitialState);

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(2);
                    expect(actions).to.eql([
                        {
                            type: FETCHING_POSTS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams
                            }
                        },
                        {
                            type: FETCHING_POSTS_SUCCESS,
                            payload: {
                                fetchUrl: stubFetchUrl,
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

            const proxyquiredFetchPosts = proxyquire("../../../../../src/lib/actions/fetchPosts", {
                "../api/fetchPosts": {
                    "default": () => Promise.resolve(stubPostsResponse)
                }
            });

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl))
                .then(() => {
                    const actions = stubStore.getActions();
                    const expectedActions = [
                        {
                            type: FETCHING_POSTS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams
                            }
                        },
                        {
                            type: FETCHING_POSTS_SUCCESS,
                            payload: {
                                fetchUrl: stubFetchUrl,
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

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(expectedActions.length);
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

            const proxyquiredFetchPosts = proxyquire("../../../../../src/lib/actions/fetchPosts", {
                "../api/fetchPosts": {
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
                    oldest: Map({
                        global: DateTime.utc(),
                        Photo: DateTime.utc(),
                        Post: DateTime.utc()
                    }),
                    newest: Map({
                        global: DateTime.utc(),
                        Photo: DateTime.utc(),
                        Post: DateTime.utc()
                    })
                })
            });
            stubStore = mockStore(stubInitialState);

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl))
                .catch(error => {
                    expect(error).to.be.ok;
                    expect(error).to.eql(stubPostsResponse);

                    const actions = stubStore.getActions();
                    const expectedActions = [
                        {
                            type: FETCHING_POSTS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams
                            }
                        },
                        {
                            type: FETCHING_POSTS_FAILURE,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                error: stubPostsResponse
                            }
                        },
                        {
                            type: FETCHING_POSTS_FAILURE_RECOVERY,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                oldestPostAvailableDate: stubInitialState.getIn(["api", stubFetchUrl, "oldest", "global"]),
                                oldestLoadedPostDate: stubLoadedPost.dateCreated
                            }
                        }
                    ];

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(expectedActions.length);
                    expect(actions).to.eql(expectedActions);
                });
        });

        it("is dispatched with the expected payload (fetch error)", function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {
                perPage: FETCHING_POSTS_PER_PAGE
            };
            const stubPostsResponse = new Error("woof");

            const proxyquiredFetchPosts = proxyquire("../../../../../src/lib/actions/fetchPosts", {
                "../api/fetchPosts": {
                    "default": () => Promise.reject(stubPostsResponse)
                }
            });

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl))
                .catch(error => {
                    expect(error).to.be.ok;
                    expect(error).to.eql(stubPostsResponse);

                    const actions = stubStore.getActions();
                    const expectedActions = [
                        {
                            type: FETCHING_POSTS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                searchParams: stubSearchParams
                            }
                        },
                        {
                            type: FETCHING_POSTS_FAILURE,
                            payload: {
                                fetchUrl: stubFetchUrl,
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

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(expectedActions.length);
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

            const proxyquiredFetchPosts = proxyquire("../../../../../src/lib/actions/fetchPosts", {
                "../api/fetchPosts": {
                    "default": (fetchUrl, searchParams) => {
                        expect(fetchUrl).to.be.ok;
                        expect(fetchUrl).to.eql(stubFetchUrl);

                        expect(searchParams).to.be.ok;
                        expect(searchParams).to.eql(stubSearchParams);

                        return Promise.resolve(stubPostsResponse);
                    }
                }
            });

            return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(2);
                    expect(actions[1]).to.eql(
                        {
                            type: FETCHING_POSTS_SUCCESS,
                            payload: {
                                fetchUrl: stubFetchUrl,
                                ...stubPostsResponse
                            }
                        }
                    );
                });
        });
    });
});
