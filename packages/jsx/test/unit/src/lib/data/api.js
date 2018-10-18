import {expect} from "chai";
import {Map} from "immutable";
import {DateTime} from "luxon";
import {createAction} from "redux-actions";
import {
    FETCHING_POSTS_PER_PAGE,
    fetchingPosts,
    fetchingPostsCancelled,
    fetchingPostsFailure,
    fetchingPostsSuccess
} from "../../../../../src/lib/actions/fetchPosts";
import reducer, {getApiStateForUrl, getErrorForUrlState} from "../../../../../src/lib/data/api";

describe("api", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = Map();
    });

    it("reduces the current state for some other action", function () {
        const stubFetchUrl = "/woof";
        const stubSearchParams = {
            perPage: FETCHING_POSTS_PER_PAGE
        };
        const stubPayload = {
            fetchUrl: stubFetchUrl,
            searchParams: stubSearchParams
        };

        const otherAction = createAction("OTHER_ACTION");

        const updatedState = reducer(stubInitialState, otherAction(stubPayload));
        const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
        expect(apiStateForUrl).to.not.be.ok;
        expect(apiStateForUrl).to.eql(undefined);

        const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
        expect(errorStateForUrl).to.not.be.ok;
        expect(errorStateForUrl).to.eql(undefined);
    });

    describe("FETCHING_POSTS", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {
                perPage: FETCHING_POSTS_PER_PAGE
            };
            const stubPayload = {
                fetchUrl: stubFetchUrl,
                searchParams: stubSearchParams
            };

            const updatedState = reducer(stubInitialState, fetchingPosts(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql({
                isLoading: true
            });

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {
                perPage: FETCHING_POSTS_PER_PAGE
            };
            const stubPayload = {
                fetchUrl: stubFetchUrl,
                searchParams: stubSearchParams
            };

            stubInitialState = Map({
                [stubFetchUrl]: Map({
                    isLoading: false,
                    oldest: DateTime.utc(1991, 11, 14),
                    newest: DateTime.utc(2018, 8, 22)
                })
            });
            const updatedState = reducer(stubInitialState, fetchingPosts(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql(
                stubInitialState
                    .get(stubFetchUrl)
                    .set("isLoading", true)
                    .toJS()
            );

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });
    });

    describe("FETCHING_POSTS_CANCELLED", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {
                perPage: FETCHING_POSTS_PER_PAGE
            };
            const stubPayload = {
                fetchUrl: stubFetchUrl,
                searchParams: stubSearchParams
            };

            const updatedState = reducer(stubInitialState, fetchingPostsCancelled(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql({
                isLoading: false
            });

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubFetchUrl = "/woof";
            const stubSearchParams = {
                perPage: FETCHING_POSTS_PER_PAGE
            };
            const stubPayload = {
                fetchUrl: stubFetchUrl,
                searchParams: stubSearchParams
            };

            stubInitialState = Map({
                [stubFetchUrl]: Map({
                    isLoading: false,
                    oldest: DateTime.utc(1991, 11, 14),
                    newest: DateTime.utc(2018, 8, 22)
                })
            });
            const updatedState = reducer(stubInitialState, fetchingPostsCancelled(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql(
                stubInitialState
                    .get(stubFetchUrl)
                    .set("isLoading", false)
                    .toJS()
            );

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });
    });

    describe("FETCHING_POSTS_FAILURE", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl,
                error: new Error("woof")
            };

            const updatedState = reducer(stubInitialState, fetchingPostsFailure(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql({
                error: stubPayload.error,
                isLoading: false
            });

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.be.ok;
            expect(errorStateForUrl).to.eql(stubPayload.error);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl,
                error: new Error("grr")
            };

            stubInitialState = Map({
                [stubFetchUrl]: Map({
                    isLoading: false,
                    oldest: DateTime.utc(1991, 11, 14),
                    newest: DateTime.utc(2018, 8, 22)
                })
            });
            const updatedState = reducer(stubInitialState, fetchingPostsFailure(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql(
                stubInitialState
                    .get(stubFetchUrl)
                    .set("isLoading", false)
                    .set("error", stubPayload.error)
                    .toJS()
            );

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.be.ok;
            expect(errorStateForUrl).to.eql(stubPayload.error);
        });
    });

    describe("FETCHING_POSTS_SUCCESS", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl,
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

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql({
                isLoading: false,
                oldest: {
                    global: DateTime.fromISO(stubPayload.oldest.global),
                    Post: DateTime.fromISO(stubPayload.oldest.Post),
                    Photo: DateTime.fromISO(stubPayload.oldest.Photo)
                },
                newest: {
                    Post: DateTime.fromISO(stubPayload.newest.Post),
                    Photo: DateTime.fromISO(stubPayload.newest.Photo),
                    global: DateTime.fromISO(stubPayload.newest.global)
                }
            });

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl,
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

            stubInitialState = Map({
                [stubFetchUrl]: Map({
                    isLoading: false,
                    oldest: Map({
                        global: DateTime.fromISO(stubPayload.oldest.global),
                        Post: DateTime.fromISO(stubPayload.oldest.Post),
                        Photo: DateTime.fromISO(stubPayload.oldest.Photo)
                    }),
                    newest: Map({
                        Post: DateTime.fromISO(stubPayload.newest.Post),
                        Photo: DateTime.fromISO(stubPayload.newest.Photo),
                        global: DateTime.fromISO(stubPayload.newest.global)
                    })
                })
            });
            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql(
                stubInitialState
                    .get(stubFetchUrl)
                    .set("isLoading", false)
                    .set("oldest", Map({
                        global: DateTime.fromISO(stubPayload.oldest.global),
                        Post: DateTime.fromISO(stubPayload.oldest.Post),
                        Photo: DateTime.fromISO(stubPayload.oldest.Photo)
                    }))
                    .set("newest", Map({
                        Post: DateTime.fromISO(stubPayload.newest.Post),
                        Photo: DateTime.fromISO(stubPayload.newest.Photo),
                        global: DateTime.fromISO(stubPayload.newest.global)
                    }))
                    .toJS()
            );

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });
    });
});
