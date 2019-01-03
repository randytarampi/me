import {expect} from "chai";
import {fromJS, Map, Set} from "immutable";
import {DateTime} from "luxon";
import proxyquire from "proxyquire";
import configureStore from "redux-mock-store";
import {Post} from "@randy.tarampi/js";
import thunk from "redux-thunk";
import sinon from "sinon";
import selectors from "../../../../../../src/lib/data/selectors";

describe("fetchPostsForMap", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubMap;
    let stubGetMap;
    let stubOldestPost;
    let stubGetOldestPostForBoundingBox;

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
        stubMap = {
            center: {
                lat: 0,
                lng: 0
            },
            bounds: {
                north: 1,
                east: 1,
                south: -1,
                west: -1,
            }
        };
        stubGetMap = sinon.stub(selectors, "getMap").returns(fromJS(stubMap));
        stubOldestPost = Post.fromJS({id: "woof", dateCreated: DateTime.local().toISO()});
        stubGetOldestPostForBoundingBox = sinon.stub(selectors, "getOldestPostForBoundingBox").returns(stubOldestPost);
    });

    afterEach(function () {
        stubGetMap.restore && stubGetMap.restore();
        stubGetOldestPostForBoundingBox.restore && stubGetOldestPostForBoundingBox.restore();
    });

    it("doesn't explode if there's no map", function () {
        const stubFetchUrl = "/woof";
        const stubSearchParams = undefined;
        const stubMapId = "grr";
        const stubPostsResponse = {
            posts: []
        };
        const stubFetchPostsCreator = sinon.stub().callsFake((fetchUrl, postType, searchParams, searchType) => () => {
            expect(fetchUrl).to.eql(stubFetchUrl);
            expect(postType).to.eql("global");
            expect(searchParams).to.eql({
                lat: undefined,
                long: undefined,
                north: undefined,
                east: undefined,
                south: undefined,
                west: undefined
            });
            expect(searchType).to.eql("map");

            return Promise.resolve(stubPostsResponse);
        });

        const proxyquiredFetchPosts = proxyquire("../../../../../../src/lib/actions/posts/fetchPostsForMap", {
            "./fetchPosts": {
                "fetchPostsCreator": stubFetchPostsCreator
            }
        });

        stubGetMap.returns(null);
        stubGetOldestPostForBoundingBox.returns(null);

        stubStore = mockStore(stubInitialState);

        return stubStore.dispatch(proxyquiredFetchPosts.default(stubMapId, stubFetchUrl, undefined, stubSearchParams))
            .then(() => {
                const actions = stubStore.getActions();

                expect(actions).to.eql([]);

                sinon.assert.calledWith(stubGetMap, stubInitialState, stubMapId);
                sinon.assert.calledWith(stubGetOldestPostForBoundingBox, stubInitialState, undefined, undefined, undefined, undefined);
            });
    });

    it("delegates to `fetchPostsCreator` with the correct searchParams (first fetch)", function () {
        const stubFetchUrl = "/woof";
        const stubSearchParams = {};
        const stubMapId = "grr";
        const stubPostsResponse = {
            posts: []
        };
        const stubFetchPostsCreator = sinon.stub().callsFake((fetchUrl, postType, searchParams, searchType) => () => {
            expect(fetchUrl).to.eql(stubFetchUrl);
            expect(postType).to.eql("global");
            expect(searchParams).to.eql({
                lat: stubMap.center.lat,
                long: stubMap.center.lng,
                ...stubMap.bounds
            });
            expect(searchType).to.eql("map");

            return Promise.resolve(stubPostsResponse);
        });

        const proxyquiredFetchPosts = proxyquire("../../../../../../src/lib/actions/posts/fetchPostsForMap", {
            "./fetchPosts": {
                "fetchPostsCreator": stubFetchPostsCreator
            }
        });

        stubGetOldestPostForBoundingBox.returns(null);

        stubStore = mockStore(stubInitialState);

        return stubStore.dispatch(proxyquiredFetchPosts.default(stubMapId, stubFetchUrl, undefined, stubSearchParams))
            .then(() => {
                const actions = stubStore.getActions();

                expect(actions).to.eql([]);

                sinon.assert.calledWith(stubGetMap, stubInitialState, stubMapId);
                sinon.assert.calledWith(stubGetOldestPostForBoundingBox, stubInitialState, stubMap.bounds.north, stubMap.bounds.east, stubMap.bounds.south, stubMap.bounds.west);
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
        const stubMapId = "grr";
        const stubPostsResponse = {
            posts: []
        };
        const stubFetchPostsCreator = sinon.stub().callsFake((fetchUrl, postType, searchParams, searchType) => () => {
            expect(fetchUrl).to.eql(stubFetchUrl);
            expect(postType).to.eql(stubSearchParams.type);
            expect(searchParams).to.eql({
                orderBy: "datePublished",
                orderComparator: stubOldestPost.date.toISO(),
                orderComparatorType: "String",
                orderOperator: "lt",
                lat: stubMap.center.lat,
                long: stubMap.center.lng,
                ...stubMap.bounds,
                perPage: stubSearchParams.perPage,
                type: stubSearchParams.type,
                [stubSearchParams.filter]: stubSearchParams.filterValue
            });
            expect(searchType).to.eql("map");

            return Promise.resolve(stubPostsResponse);
        });

        const proxyquiredFetchPosts = proxyquire("../../../../../../src/lib/actions/posts/fetchPostsForMap", {
            "./fetchPosts": {
                "fetchPostsCreator": stubFetchPostsCreator
            }
        });

        stubStore = mockStore(stubInitialState);

        return stubStore.dispatch(proxyquiredFetchPosts.default(stubMapId, stubFetchUrl, stubSearchParams.type, stubSearchParams))
            .then(() => {
                const actions = stubStore.getActions();

                expect(actions).to.eql([]);

                sinon.assert.calledWith(stubGetMap, stubInitialState, stubMapId);
                sinon.assert.calledWith(stubGetOldestPostForBoundingBox, stubInitialState, stubMap.bounds.north, stubMap.bounds.east, stubMap.bounds.south, stubMap.bounds.west);
            });
    });
});
