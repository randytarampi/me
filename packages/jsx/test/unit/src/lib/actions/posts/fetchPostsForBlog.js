import {expect} from "chai";
import {Map, Set} from "immutable";
import {DateTime} from "luxon";
import proxyquire from "proxyquire";
import configureStore from "redux-mock-store";
import {Post} from "@randy.tarampi/js";
import thunk from "redux-thunk";
import sinon from "sinon";
import selectors from "../../../../../../src/lib/data/selectors";
import {
    FETCHING_POSTS_CANCELLED,
    FETCHING_POSTS_PER_PAGE,
} from "../../../../../../src/lib/actions/posts/fetchPosts";

describe("fetchPostsForBlog", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubGetOldestFetchedPostDateForSearchTypeAndPostType;
    let stubGetOldestAvailablePostDateForSearchTypeAndPostType;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map({
            api: Map(),
            posts: Map({
                posts: Set()
            })
        });
        stubStore = mockStore(stubInitialState);
        stubGetOldestFetchedPostDateForSearchTypeAndPostType = sinon.stub(selectors, "getOldestFetchedPostDateForSearchTypeAndPostType");
        stubGetOldestAvailablePostDateForSearchTypeAndPostType = sinon.stub(selectors, "getOldestAvailablePostDateForSearchTypeAndPostType");
    });

    afterEach(function () {
        stubGetOldestFetchedPostDateForSearchTypeAndPostType.restore && stubGetOldestFetchedPostDateForSearchTypeAndPostType.restore();
        stubGetOldestAvailablePostDateForSearchTypeAndPostType.restore && stubGetOldestAvailablePostDateForSearchTypeAndPostType.restore();
    });

    it("dispatches FETCHING_POSTS_CANCELLED if already loaded the oldest post", function () {
        const stubFetchUrl = "/woof";
        const stubPostsResponse = {
            posts: []
        };
        const stubOldestAvailablePostDate = DateTime.local();
        const stubOldestLoadedPostDate = stubOldestAvailablePostDate;
        const stubFetchPostsCreator = sinon.stub().callsFake(() => () => Promise.resolve(stubPostsResponse));

        const proxyquiredFetchPosts = proxyquire("../../../../../../src/lib/actions/posts/fetchPostsForBlog", {
            "./fetchPosts": {
                "fetchPostsCreator": stubFetchPostsCreator
            }
        });

        stubGetOldestFetchedPostDateForSearchTypeAndPostType.returns(stubOldestLoadedPostDate.toISO());
        stubGetOldestAvailablePostDateForSearchTypeAndPostType.returns(stubOldestAvailablePostDate.toISO());

        stubStore = mockStore(stubInitialState);

        return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl))
            .then(() => {
                const actions = stubStore.getActions();

                expect(actions).to.eql([
                    {
                        type: FETCHING_POSTS_CANCELLED,
                        payload: {
                            fetchUrl: stubFetchUrl,
                            searchParams: {
                                orderBy: "datePublished",
                                orderComparator: stubOldestLoadedPostDate.toISO(),
                                orderComparatorType: "String",
                                orderOperator: "lt",
                                perPage: FETCHING_POSTS_PER_PAGE
                            },
                            oldestPostAvailableDate: stubOldestAvailablePostDate,
                            oldestLoadedPostDate: stubOldestLoadedPostDate
                        }
                    }
                ]);

                expect(stubFetchPostsCreator.notCalled).to.eql(true);
            });
    });

    it("delegates to `fetchPostsCreator` with the correct searchParams (first fetch)", function () {
        const stubFetchUrl = "/woof";
        const stubSearchParams = {};
        const stubPostsResponse = {
            posts: []
        };
        const stubOldestAvailablePostDate = null;
        const stubOldestLoadedPostDate = null;
        const stubFetchPostsCreator = sinon.stub().callsFake((fetchUrl, postType, searchParams, searchType) => () => {
            expect(fetchUrl).to.eql(stubFetchUrl);
            expect(postType).to.eql("global");
            expect(searchParams).to.eql({
                perPage: FETCHING_POSTS_PER_PAGE
            });
            expect(searchType).to.eql("blog");

            return Promise.resolve(stubPostsResponse);
        });

        const proxyquiredFetchPosts = proxyquire("../../../../../../src/lib/actions/posts/fetchPostsForBlog", {
            "./fetchPosts": {
                "fetchPostsCreator": stubFetchPostsCreator
            }
        });

        stubGetOldestFetchedPostDateForSearchTypeAndPostType.returns(stubOldestLoadedPostDate);
        stubGetOldestAvailablePostDateForSearchTypeAndPostType.returns(stubOldestAvailablePostDate);

        stubStore = mockStore(stubInitialState);

        return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl, undefined, stubSearchParams))
            .then(() => {
                const actions = stubStore.getActions();

                expect(actions).to.eql([]);
            });
    });

    it("delegates to `fetchPostsCreator` with the correct searchParams (subsequent fetch)", function () {
        const stubFetchUrl = "/woof";
        const stubSearchParams = {
            type: Post.type,
            perPage: 100,
            filter: "tags",
            filterValue: "meow"
        };
        const stubPostsResponse = {
            posts: []
        };
        const stubOldestAvailablePostDate = DateTime.local();
        const stubOldestLoadedPostDate = stubOldestAvailablePostDate.plus({years: 1});
        const stubFetchPostsCreator = sinon.stub().callsFake((fetchUrl, postType, searchParams, searchType) => () => {
            expect(fetchUrl).to.eql(stubFetchUrl);
            expect(postType).to.eql(stubSearchParams.type);
            expect(searchParams).to.eql({
                orderBy: "datePublished",
                orderComparator: stubOldestLoadedPostDate.toISO(),
                orderComparatorType: "String",
                orderOperator: "lt",
                perPage: stubSearchParams.perPage,
                type: stubSearchParams.type,
                [stubSearchParams.filter]: stubSearchParams.filterValue
            });
            expect(searchType).to.eql("blog");

            return Promise.resolve(stubPostsResponse);
        });

        const proxyquiredFetchPosts = proxyquire("../../../../../../src/lib/actions/posts/fetchPostsForBlog", {
            "./fetchPosts": {
                "fetchPostsCreator": stubFetchPostsCreator
            }
        });

        stubGetOldestFetchedPostDateForSearchTypeAndPostType.returns(stubOldestLoadedPostDate.toISO());
        stubGetOldestAvailablePostDateForSearchTypeAndPostType.returns(stubOldestAvailablePostDate.toISO());

        stubStore = mockStore(stubInitialState);

        return stubStore.dispatch(proxyquiredFetchPosts.default(stubFetchUrl, stubSearchParams.type, stubSearchParams))
            .then(() => {
                const actions = stubStore.getActions();

                expect(actions).to.eql([]);
            });
    });
});
