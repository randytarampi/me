import {expect} from "chai";
import {fromJS, Map} from "immutable";
import {createAction} from "redux-actions";
import {
    FETCHING_POSTS_PER_PAGE,
    fetchingPosts,
    fetchingPostsCancelled,
    fetchingPostsFailure,
    fetchingPostsSuccess
} from "../../../../../src/lib/actions/posts/fetchPosts";
import reducer, {
    createGetErrorForUrlSelector,
    createIsLoadingUrlSelector,
    getApiStateForUrl,
    getApiStateForUrlFromGlobalState,
    getErrorForUrlState
} from "../../../../../src/lib/data/api";

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
                    isLoading: false
                })
            });
            const updatedState = reducer(stubInitialState, fetchingPosts(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
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
                    isLoading: false
                })
            });
            const updatedState = reducer(stubInitialState, fetchingPostsCancelled(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
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
            expect(apiStateForUrlObject).to.eql({
                error: stubPayload.error,
                isLoading: false
            });

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
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
                    isLoading: false
                })
            });
            const updatedState = reducer(stubInitialState, fetchingPostsFailure(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.eql(
                stubInitialState
                    .get(stubFetchUrl)
                    .set("isLoading", false)
                    .set("error", stubPayload.error)
                    .toJS()
            );

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.eql(stubPayload.error);
        });
    });

    describe("FETCHING_POSTS_SUCCESS", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl
            };

            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.eql({
                isLoading: false
            });

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl
            };

            stubInitialState = Map({
                [stubFetchUrl]: Map({
                    isLoading: false
                })
            });
            const updatedState = reducer(stubInitialState, fetchingPostsSuccess(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
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

    describe("getApiStateForUrlFromGlobalState", function () {
        it("returns the API state for a URL", function () {
            const stubUrl = "/woof";
            const stubState = fromJS({
                api: {
                    [stubUrl]: {
                        error: null,
                        isLoading: false
                    }
                }
            });

            const apiUrlState = getApiStateForUrlFromGlobalState(stubState, stubUrl);

            expect(apiUrlState.toJS()).to.eql(stubState.getIn(["api", stubUrl]).toJS());
        });
    });

    describe("createIsLoadingUrlSelector", function () {
        it("returns the loading state for a URL", function () {
            const stubUrl = "/woof";
            const stubState = fromJS({
                api: {
                    [stubUrl]: {
                        error: null,
                        isLoading: false
                    }
                }
            });

            const loadingUrlState = createIsLoadingUrlSelector()(stubState, stubUrl);

            expect(loadingUrlState).to.eql(stubState.getIn(["api", stubUrl, "isLoading"]));
        });
    });

    describe("createGetErrorForUrlSelector", function () {
        it("returns the error state for a URL", function () {
            const stubUrl = "/woof";
            const stubState = fromJS({
                api: {
                    [stubUrl]: {
                        error: null,
                        isLoading: false
                    }
                }
            });

            const errorUrlState = createGetErrorForUrlSelector()(stubState, stubUrl);

            expect(errorUrlState).to.eql(stubState.getIn(["api", stubUrl, "error"]));
        });
    });
});
