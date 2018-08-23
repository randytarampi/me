import {expect} from "chai";
import {Map} from "immutable";
import {DateTime} from "luxon";
import {
    FETCHING_POSTS_PER_PAGE,
    fetchingCancelled,
    fetchingFailure,
    fetchingPosts,
    fetchingSuccess
} from "../../../lib/actions/fetchPosts";
import reducer, {getApiStateForUrl} from "../../../lib/data/api";

describe("api", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = Map();
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
                    oldest: new Date(1991, 11, 14),
                    newest: new Date(2018, 8, 22)
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

            const updatedState = reducer(stubInitialState, fetchingCancelled(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql({
                isLoading: false
            });
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
                    oldest: new Date(1991, 11, 14),
                    newest: new Date(2018, 8, 22)
                })
            });
            const updatedState = reducer(stubInitialState, fetchingCancelled(stubPayload));
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
        });
    });

    describe("FETCHING_POSTS_FAILURE", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl,
                error: new Error("woof")
            };

            const updatedState = reducer(stubInitialState, fetchingFailure(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql({
                error: stubPayload.error,
                isLoading: false
            });
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
                    oldest: new Date(1991, 11, 14),
                    newest: new Date(2018, 8, 22)
                })
            });
            const updatedState = reducer(stubInitialState, fetchingFailure(stubPayload));
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
        });
    });

    describe("FETCHING_POSTS_SUCCESS", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl,
                oldest: new Date().toISOString(),
                newest: new Date().toISOString()
            };

            const updatedState = reducer(stubInitialState, fetchingSuccess(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql({
                isLoading: false,
                oldest: DateTime.fromISO(stubPayload.oldest),
                newest: DateTime.fromISO(stubPayload.newest)
            });
        });

        it("reduces the correct state (has existing state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl,
                oldest: new Date().toISOString(),
                newest: new Date().toISOString()
            };

            stubInitialState = Map({
                [stubFetchUrl]: Map({
                    isLoading: false,
                    oldest: DateTime.fromISO(stubPayload.oldest),
                    newest: DateTime.fromISO(stubPayload.newest)
                })
            });
            const updatedState = reducer(stubInitialState, fetchingSuccess(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql(
                stubInitialState
                    .get(stubFetchUrl)
                    .set("isLoading", false)
                    .set("oldest", DateTime.fromISO(stubPayload.oldest))
                    .set("newest", DateTime.fromISO(stubPayload.newest))
                    .toJS()
            );
        });
    });
});
