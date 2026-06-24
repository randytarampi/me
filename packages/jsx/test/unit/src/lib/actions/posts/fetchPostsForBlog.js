import {Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {List, Map, Set} from "immutable";
import {DateTime} from "luxon";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";
import sinon from "sinon";
import * as fetchPostsModule from "../../../../../../src/lib/actions/posts/fetchPosts";
import {FETCHING_POSTS_CANCELLED, FETCHING_POSTS_PER_PAGE} from "../../../../../../src/lib/actions/posts/fetchPosts";
import fetchPostsForBlog from "../../../../../../src/lib/actions/posts/fetchPostsForBlog";
import selectors from "../../../../../../src/lib/data/selectors";

describe("fetchPostsForBlog", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubGetPostsSortedByDate;
    let stubGetOldestFetchedPostDateForSearchTypeAndPostType;
    let stubGetOldestAvailablePostDateForSearchTypeAndPostType;
    let stubFetchPostsCreator;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map({
            api: Map(),
            posts: Map({posts: Set()})
        });
        stubStore = mockStore(stubInitialState);
        stubGetPostsSortedByDate = sinon.stub(selectors, "getPostsSortedByDate");
        stubGetOldestFetchedPostDateForSearchTypeAndPostType = sinon.stub(selectors, "getOldestFetchedPostDateForSearchTypeAndPostType");
        stubGetOldestAvailablePostDateForSearchTypeAndPostType = sinon.stub(selectors, "getOldestAvailablePostDateForSearchTypeAndPostType");
        stubFetchPostsCreator = sinon.stub(fetchPostsModule, "fetchPostsCreator");
    });

    afterEach(function () {
        stubGetPostsSortedByDate.restore();
        stubGetOldestFetchedPostDateForSearchTypeAndPostType.restore();
        stubGetOldestAvailablePostDateForSearchTypeAndPostType.restore();
        stubFetchPostsCreator.restore();
    });

    it("dispatches FETCHING_POSTS_CANCELLED if already loaded the oldest post", async function () {
        const stubFetchUrl = "/woof";
        const stubOldestAvailablePostDate = DateTime.local();
        const stubOldestLoadedPostDate = stubOldestAvailablePostDate;
        const stubPostsResponse = {posts: []};

        stubFetchPostsCreator.callsFake((fetchUrl, postType, searchParams, searchType) => () => {
            expect(fetchUrl).to.eql(stubFetchUrl);
            expect(postType).to.eql("global");
            expect(searchParams).to.eql({
                perPage: FETCHING_POSTS_PER_PAGE,
                orderBy: "datePublished",
                orderComparator: stubOldestLoadedPostDate.toISO(),
                orderComparatorType: "String",
                orderOperator: "lt"
            });
            expect(searchType).to.eql("blog");
            return Promise.resolve(stubPostsResponse);
        });

        stubGetOldestFetchedPostDateForSearchTypeAndPostType.returns(stubOldestLoadedPostDate.toISO());
        stubGetOldestAvailablePostDateForSearchTypeAndPostType.returns(stubOldestAvailablePostDate.toISO());

        await stubStore.dispatch(fetchPostsForBlog(stubFetchUrl));

        expect(stubStore.getActions()).to.eql([
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
    });

    it("delegates to `fetchPostsCreator` with the correct searchParams (first fetch)", async function () {
        const stubFetchUrl = "/woof";
        const stubSearchParams = {};
        const stubPostsResponse = {posts: []};

        stubFetchPostsCreator.callsFake((fetchUrl, postType, searchParams, searchType) => () => {
            expect(fetchUrl).to.eql(stubFetchUrl);
            expect(postType).to.eql("global");
            expect(searchParams).to.eql({perPage: FETCHING_POSTS_PER_PAGE});
            expect(searchType).to.eql("blog");
            return Promise.resolve(stubPostsResponse);
        });

        stubGetOldestFetchedPostDateForSearchTypeAndPostType.returns(null);
        stubGetOldestAvailablePostDateForSearchTypeAndPostType.returns(null);

        await stubStore.dispatch(fetchPostsForBlog(stubFetchUrl, undefined, stubSearchParams));

        expect(stubStore.getActions()).to.eql([]);
    });

    it("delegates to `fetchPostsCreator` with the correct searchParams (subsequent fetch)", async function () {
        const stubFetchUrl = "/woof";
        const stubSearchParams = {
            type: "global",
            perPage: 100,
            filter: "tags",
            filterValue: "meow"
        };
        const stubOldestAvailablePostDate = DateTime.local();
        const stubOldestLoadedPostDate = stubOldestAvailablePostDate.plus({years: 1});
        const stubPostsResponse = {posts: []};

        stubFetchPostsCreator.callsFake((fetchUrl, postType, searchParams, searchType) => () => {
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

        stubGetPostsSortedByDate.returns(List([
            Post.fromJSON({datePublished: stubOldestLoadedPostDate.toISO(), tags: ["meow"]}),
            Post.fromJSON({datePublished: stubOldestLoadedPostDate.minus({days: 1}).toISO()})
        ]));
        stubGetOldestFetchedPostDateForSearchTypeAndPostType.returns(stubOldestLoadedPostDate.minus({days: 1}).toISO());
        stubGetOldestAvailablePostDateForSearchTypeAndPostType.returns(stubOldestAvailablePostDate.toISO());

        await stubStore.dispatch(fetchPostsForBlog(stubFetchUrl, stubSearchParams.type, stubSearchParams));

        expect(stubStore.getActions()).to.eql([]);
    });
});
