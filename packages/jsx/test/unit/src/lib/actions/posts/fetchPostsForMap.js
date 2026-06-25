const {expect} = require("chai");
const {fromJS, Map, Set} = require("immutable");
const {DateTime} = require("luxon");
const {Post} = require("@randy.tarampi/js");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const sinon = require("sinon");
const fetchPostsModule = require("../../../../../../src/lib/actions/posts/fetchPosts.js");
const fetchPostsForMap = require("../../../../../../src/lib/actions/posts/fetchPostsForMap.js").default || require("../../../../../../src/lib/actions/posts/fetchPostsForMap.js");
const selectors = require("../../../../../../src/lib/data/selectors.js").default || require("../../../../../../src/lib/data/selectors.js");

describe("fetchPostsForMap", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubMap;
    let stubGetMap;
    let stubOldestPost;
    let stubGetOldestPostForBoundingBox;
    let stubFetchPostsCreator;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map({
            api: Map(),
            posts: Map({posts: Set()})
        });
        stubStore = mockStore(stubInitialState);
        stubMap = {
            center: {lat: 0, lng: 0},
            bounds: {
                north: 1,
                east: 1,
                south: -1,
                west: -1
            }
        };
        stubGetMap = sinon.stub(selectors, "getMap").returns(fromJS(stubMap));
        stubOldestPost = Post.fromJS({id: "woof", dateCreated: DateTime.local().toISO()});
        stubGetOldestPostForBoundingBox = sinon.stub(selectors, "getOldestPostForBoundingBox").returns(stubOldestPost);
        stubFetchPostsCreator = sinon.stub(fetchPostsModule, "fetchPostsCreator");
    });

    afterEach(function () {
        stubGetMap.restore();
        stubGetOldestPostForBoundingBox.restore();
        stubFetchPostsCreator.restore();
    });

    it("doesn't explode if there's no map", async function () {
        const stubFetchUrl = "/woof";
        const stubMapId = "grr";
        const stubPostsResponse = {posts: []};

        stubFetchPostsCreator.callsFake((fetchUrl, postType, searchParams, searchType) => () => {
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

        stubGetMap.returns(null);
        stubGetOldestPostForBoundingBox.returns(null);

        await stubStore.dispatch(fetchPostsForMap(stubMapId, stubFetchUrl, undefined, undefined));

        expect(stubStore.getActions()).to.eql([]);
        sinon.assert.calledWith(stubGetMap, stubInitialState, stubMapId);
        sinon.assert.calledWith(stubGetOldestPostForBoundingBox, stubInitialState, undefined, undefined, undefined, undefined);
    });

    it("delegates to `fetchPostsCreator` with the correct searchParams (first fetch)", async function () {
        const stubFetchUrl = "/woof";
        const stubMapId = "grr";
        const stubPostsResponse = {posts: []};

        stubFetchPostsCreator.callsFake((fetchUrl, postType, searchParams, searchType) => () => {
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

        stubGetOldestPostForBoundingBox.returns(null);

        await stubStore.dispatch(fetchPostsForMap(stubMapId, stubFetchUrl, undefined, {}));

        expect(stubStore.getActions()).to.eql([]);
        sinon.assert.calledWith(stubGetMap, stubInitialState, stubMapId);
        sinon.assert.calledWith(stubGetOldestPostForBoundingBox, stubInitialState, stubMap.bounds.north, stubMap.bounds.east, stubMap.bounds.south, stubMap.bounds.west);
    });

    it("delegates to `fetchPostsCreator` with the correct searchParams (subsequent fetch)", async function () {
        const stubFetchUrl = "/woof";
        const stubSearchParams = {
            type: Post.type,
            perPage: 100,
            filter: "tags",
            filterValue: "meow"
        };
        const stubMapId = "grr";
        const stubPostsResponse = {posts: []};
        const stubOldestLoadedPostDate = stubOldestPost.date;

        stubFetchPostsCreator.callsFake((fetchUrl, postType, searchParams, searchType) => () => {
            expect(fetchUrl).to.eql(stubFetchUrl);
            expect(postType).to.eql(stubSearchParams.type);
            expect(searchParams).to.eql({
                orderBy: "datePublished",
                orderComparator: stubOldestLoadedPostDate.toISO(),
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

        await stubStore.dispatch(fetchPostsForMap(stubMapId, stubFetchUrl, stubSearchParams.type, stubSearchParams));

        expect(stubStore.getActions()).to.eql([]);
        sinon.assert.calledWith(stubGetMap, stubInitialState, stubMapId);
        sinon.assert.calledWith(stubGetOldestPostForBoundingBox, stubInitialState, stubMap.bounds.north, stubMap.bounds.east, stubMap.bounds.south, stubMap.bounds.west);
    });
});
