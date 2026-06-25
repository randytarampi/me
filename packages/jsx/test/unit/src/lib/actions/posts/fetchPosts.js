const {Post} = require("@randy.tarampi/js");
const {expect} = require("chai");
const {Map, Set} = require("immutable");
const {DateTime} = require("luxon");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const sinon = require("sinon");
const fetchPosts = require("../../../../../../src/lib/actions/posts/fetchPosts.js").default || require("../../../../../../src/lib/actions/posts/fetchPosts.js");
const {
    FETCHING_POSTS,
    FETCHING_POSTS_CANCELLED,
    FETCHING_POSTS_FAILURE,
    FETCHING_POSTS_FAILURE_RECOVERY,
    FETCHING_POSTS_PER_PAGE,
    FETCHING_POSTS_SUCCESS
} = require("../../../../../../src/lib/actions/posts/fetchPosts.js");
const {SET_ERROR} = require("../../../../../../src/lib/actions/error/setError.js");

describe("fetchPosts", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let fetchStub;

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
        fetchStub = sinon.stub(global, "fetch");
    });

    afterEach(function () {
        fetchStub.restore();
    });

    describe("FETCHING_POSTS", function () {
        it("isn't dispatched if already `isLoading`", async function () {
            const stubFetchUrl = "/woof";

            stubInitialState = Map({
                api: Map({
                    [stubFetchUrl]: Map({isLoading: true})
                }),
                posts: Map({posts: Set()})
            });
            stubStore = mockStore(stubInitialState);

            await stubStore.dispatch(fetchPosts(stubFetchUrl));

            expect(fetchStub.notCalled).to.eql(true);
            expect(stubStore.getActions()).to.eql([
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

        it("is dispatched with the correct searchParams", async function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {
                perPage: FETCHING_POSTS_PER_PAGE
            };
            const stubPostJson = {
                id: "woof",
                type: Post.type,
                source: "woof",
                dateCreated: DateTime.utc().toISO()
            };
            const stubPostsResponse = {
                posts: [stubPostJson],
                total: 1,
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

            fetchStub.resolves({json: () => Promise.resolve(stubPostsResponse)});

            await stubStore.dispatch(fetchPosts(stubFetchUrl, Post.type, stubSearchParams));

            expect(fetchStub.calledOnce).to.eql(true);
            expect(stubStore.getActions()).to.eql([
                {
                    type: FETCHING_POSTS,
                    payload: {
                        fetchUrl: stubFetchUrl,
                        searchParams: {perPage: FETCHING_POSTS_PER_PAGE, type: Post.type},
                        searchType: undefined
                    }
                },
                {
                    type: FETCHING_POSTS_SUCCESS,
                    payload: {
                        fetchUrl: stubFetchUrl,
                        searchParams: {perPage: FETCHING_POSTS_PER_PAGE, type: Post.type},
                        searchType: undefined,
                        ...{
                            ...stubPostsResponse,
                            posts: [Post.fromJSON(stubPostJson)]
                        }
                    }
                }
            ]);
        });
    });

    describe("FETCHING_POSTS_FAILURE", function () {
        it("is dispatched with the expected payload (no posts)", async function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {perPage: FETCHING_POSTS_PER_PAGE};
            const stubPostsResponse = {
                posts: [],
                total: 0,
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

            fetchStub.resolves({json: () => Promise.resolve(stubPostsResponse)});

            await stubStore.dispatch(fetchPosts(stubFetchUrl, undefined, stubSearchParams));

            expect(stubStore.getActions()).to.eql([
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
                        ...{
                            ...stubPostsResponse,
                            posts: []
                        }
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
            ]);
        });

        it("is dispatched with the expected payload (has posts)", async function () {
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

            stubInitialState = Map({
                api: Map({
                    [stubFetchUrl]: Map({isLoading: false})
                }),
                posts: Map({
                    posts: Set([stubLoadedPost]),
                    oldest: Map({}),
                    newest: Map({})
                })
            });
            stubStore = mockStore(stubInitialState);
            fetchStub.rejects(stubPostsResponse);

            try {
                await stubStore.dispatch(fetchPosts(stubFetchUrl, stubSearchParams.type, stubSearchParams));
                throw new Error("Wtf? This should've thrown");
            } catch (error) {
                expect(error).to.eql(stubPostsResponse);
                expect(stubStore.getActions()).to.eql([
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
                ]);
            }
        });

        it("is dispatched with the expected payload (fetch error)", async function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {perPage: FETCHING_POSTS_PER_PAGE};
            const stubPostsResponse = new Error("woof");

            fetchStub.rejects(stubPostsResponse);

            try {
                await stubStore.dispatch(fetchPosts(stubFetchUrl, stubSearchParams.type, stubSearchParams));
                throw new Error("Wtf? This should've thrown");
            } catch (error) {
                expect(error).to.eql(stubPostsResponse);
                expect(stubStore.getActions()).to.eql([
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
                ]);
            }
        });
    });

    describe("FETCHING_POSTS_SUCCESS", function () {
        it("is dispatched with the expected payload", async function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {perPage: FETCHING_POSTS_PER_PAGE};
            const stubPostJson = {
                id: "woof",
                type: Post.type,
                source: "woof",
                dateCreated: DateTime.utc().toISO()
            };
            const stubPostsResponse = {
                posts: [stubPostJson],
                total: 1,
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

            fetchStub.resolves({json: () => Promise.resolve(stubPostsResponse)});

            await stubStore.dispatch(fetchPosts(stubFetchUrl, stubSearchParams.type, stubSearchParams));

            expect(stubStore.getActions()[1]).to.eql({
                type: FETCHING_POSTS_SUCCESS,
                payload: {
                    fetchUrl: stubFetchUrl,
                    searchParams: stubSearchParams,
                    searchType: undefined,
                    ...{
                        ...stubPostsResponse,
                        posts: [Post.fromJSON(stubPostJson)]
                    }
                }
            });
        });
    });
});
