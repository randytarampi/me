import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {List, Map} from "immutable";
import proxyquire from "proxyquire";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import {FETCHING_MAPPED_POSTS_PER_PAGE, MAPPED_POSTS_FETCH_DEBOUNCE_DELAY} from "../../../../../src/lib/containers";
import * as api from "../../../../../src/lib/data/api";
import selectors from "../../../../../src/lib/data/selectors";
import {shallow} from "../../../../../src/test/util";

describe("MappedPosts", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubWords;
    let stubPhotos;
    let stubPosts;
    let stubMap;
    let isLoadingForUrlStub;
    let getErrorForUrlStub;
    let isLoadingForUrlSelectorStub;
    let getErrorForUrlSelectorStub;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);

        stubPhotos = List([
            Photo.fromJSON({
                id: "meow",
                lat: 0.1,
                long: -0.1,
                dateCreated: new Date(1900, 0, 1).toISOString(),
                tags: ["meow"]
            }),
            Photo.fromJSON({id: "rawr", lat: -0.1, long: 0.1, dateCreated: new Date(3000, 0, 1).toISOString()})
        ]);
        stubWords = List([
            Post.fromJSON({id: "woof", lat: -0.2, long: 0.2, dateCreated: new Date(2500, 0, 1).toISOString()}),
            Post.fromJSON({id: "grr", lat: 0.2, long: -0.2, dateCreated: new Date().toISOString()})
        ]);
        stubPosts = stubPhotos.concat(stubWords);
        stubMap = Map({
            bounds: Map({
                north: 1,
                east: 1,
                south: -1,
                west: -1
            })
        });

        isLoadingForUrlStub = false;
        getErrorForUrlStub = null;
        isLoadingForUrlSelectorStub = sinon.stub().returns(isLoadingForUrlStub);
        getErrorForUrlSelectorStub = sinon.stub().returns(getErrorForUrlStub);
        sinon.stub(api, "createIsLoadingUrlSelector").returns(isLoadingForUrlSelectorStub);
        sinon.stub(api, "createGetErrorForUrlSelector").returns(getErrorForUrlSelectorStub);
        sinon.stub(selectors, "getMap").returns(stubMap);
        sinon.stub(selectors, "getPosts").returns(stubPosts);
        sinon.stub(selectors, "getPhotoPosts").returns(stubPhotos);
        sinon.stub(selectors, "getWordPosts").returns(stubWords);
    });

    afterEach(function () {
        api.createIsLoadingUrlSelector.restore();
        api.createGetErrorForUrlSelector.restore();
        selectors.getMap.restore();
        selectors.getPosts.restore();
        selectors.getPhotoPosts.restore();
        selectors.getWordPosts.restore();
    });

    it("receives default props (has map)", function () {
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredMappedPosts = proxyquire("../../../../../src/lib/containers/mappedPosts", {
            "../actions": {
                fetchPostsForMapCreator: fetchPostsStub
            }
        });
        const MappedPosts = proxyquiredMappedPosts.default;

        const rendered = shallow(stubStore)(<MappedPosts/>);
        let renderCount = 1;
        const expectedProps = {fetchUrl: "/posts"};

        expect(rendered).to.have.props(expectedProps);

        expect(api.createIsLoadingUrlSelector.callCount).to.eql(renderCount);
        expect(api.createGetErrorForUrlSelector.callCount).to.eql(renderCount);
        expect(selectors.getPosts.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getPosts, stubInitialState);
        expect(isLoadingForUrlSelectorStub.callCount).to.eql(renderCount);
        sinon.assert.calledWith(isLoadingForUrlSelectorStub, stubInitialState, expectedProps.fetchUrl);
        expect(getErrorForUrlSelectorStub.callCount).to.eql(renderCount);
        sinon.assert.calledWith(getErrorForUrlSelectorStub, stubInitialState, expectedProps.fetchUrl);
        expect(rendered).to.have.prop("isLoading", isLoadingForUrlStub);
        expect(rendered).to.have.prop("error", getErrorForUrlStub);
        expect(rendered.prop("posts").toJS()).to.eql(stubPosts.toJS());

        expect(fetchPostsStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("fetchPosts");
    });

    it("receives default props (no map)", function () {
        stubMap = null;
        selectors.getMap.restore();
        sinon.stub(selectors, "getMap").returns(stubMap);

        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredMappedPosts = proxyquire("../../../../../src/lib/containers/mappedPosts", {
            "../actions": {
                fetchPostsForMapCreator: fetchPostsStub
            }
        });
        const MappedPosts = proxyquiredMappedPosts.default;

        const rendered = shallow(stubStore)(<MappedPosts/>);
        let renderCount = 1;
        const expectedProps = {fetchUrl: "/posts"};

        expect(rendered).to.have.props(expectedProps);

        expect(api.createIsLoadingUrlSelector.callCount).to.eql(renderCount);
        expect(api.createGetErrorForUrlSelector.callCount).to.eql(renderCount);
        expect(selectors.getPosts.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getPosts, stubInitialState);
        expect(isLoadingForUrlSelectorStub.callCount).to.eql(renderCount);
        sinon.assert.calledWith(isLoadingForUrlSelectorStub, stubInitialState, expectedProps.fetchUrl);
        expect(getErrorForUrlSelectorStub.callCount).to.eql(renderCount);
        sinon.assert.calledWith(getErrorForUrlSelectorStub, stubInitialState, expectedProps.fetchUrl);
        expect(rendered).to.have.prop("isLoading", isLoadingForUrlStub);
        expect(rendered).to.have.prop("error", getErrorForUrlStub);
        expect(rendered.prop("posts").toJS()).to.eql(stubPosts.toJS());

        expect(fetchPostsStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("fetchPosts");
    });

    it("propagates props (any post type)", function () {
        const stubProps = {fetchUrl: "/woof", id: "meow", match: {params: {}}};
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredMappedPosts = proxyquire("../../../../../src/lib/containers/mappedPosts", {
            "../actions": {
                fetchPostsForMapCreator: fetchPostsStub
            }
        });
        const MappedPosts = proxyquiredMappedPosts.default;

        const rendered = shallow(stubStore)(<MappedPosts {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.have.props(stubProps);

        expect(api.createIsLoadingUrlSelector.callCount).to.eql(renderCount);
        expect(api.createGetErrorForUrlSelector.callCount).to.eql(renderCount);
        expect(selectors.getPosts.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getPosts, stubInitialState);
        expect(isLoadingForUrlSelectorStub.callCount).to.eql(renderCount);
        sinon.assert.calledWith(isLoadingForUrlSelectorStub, stubInitialState, stubProps.fetchUrl);
        expect(getErrorForUrlSelectorStub.callCount).to.eql(renderCount);
        sinon.assert.calledWith(getErrorForUrlSelectorStub, stubInitialState, stubProps.fetchUrl);
        expect(rendered).to.have.prop("isLoading", isLoadingForUrlStub);
        expect(rendered).to.have.prop("error", getErrorForUrlStub);
        expect(rendered.prop("posts").toJS()).to.eql(stubPosts.toJS());

        expect(fetchPostsStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("fetchPosts");
    });

    it("propagates props (has tags)", function () {
        const stubProps = {fetchUrl: "/woof", id: "meow", match: {params: {filter: "tags", filterValue: "meow"}}};
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredMappedPosts = proxyquire("../../../../../src/lib/containers/mappedPosts", {
            "../actions": {
                fetchPostsForMapCreator: fetchPostsStub
            }
        });
        const MappedPosts = proxyquiredMappedPosts.default;

        const rendered = shallow(stubStore)(<MappedPosts {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.have.props(stubProps);

        expect(api.createIsLoadingUrlSelector.callCount).to.eql(renderCount);
        expect(api.createGetErrorForUrlSelector.callCount).to.eql(renderCount);
        expect(selectors.getPosts.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getPosts, stubInitialState);
        expect(isLoadingForUrlSelectorStub.callCount).to.eql(renderCount);
        sinon.assert.calledWith(isLoadingForUrlSelectorStub, stubInitialState, stubProps.fetchUrl);
        expect(getErrorForUrlSelectorStub.callCount).to.eql(renderCount);
        sinon.assert.calledWith(getErrorForUrlSelectorStub, stubInitialState, stubProps.fetchUrl);
        expect(rendered).to.have.prop("isLoading", isLoadingForUrlStub);
        expect(rendered).to.have.prop("error", getErrorForUrlStub);
        expect(rendered).to.have.prop("posts");
        expect(rendered.prop("posts").size).to.eql(1);

        expect(fetchPostsStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("fetchPosts");
    });

    it("propagates props (only `Photo`s)", function () {
        const stubProps = {fetchUrl: "/woof", id: "meow", type: Photo.type, match: {params: {}}};
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredMappedPosts = proxyquire("../../../../../src/lib/containers/mappedPosts", {
            "../actions": {
                fetchPostsForMapCreator: fetchPostsStub
            }
        });
        const MappedPosts = proxyquiredMappedPosts.default;

        const rendered = shallow(stubStore)(<MappedPosts {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.have.props(stubProps);

        expect(api.createIsLoadingUrlSelector.callCount).to.eql(renderCount);
        expect(api.createGetErrorForUrlSelector.callCount).to.eql(renderCount);
        expect(selectors.getPhotoPosts.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getPhotoPosts, stubInitialState);
        expect(isLoadingForUrlSelectorStub.callCount).to.eql(renderCount);
        sinon.assert.calledWith(isLoadingForUrlSelectorStub, stubInitialState, stubProps.fetchUrl);
        expect(getErrorForUrlSelectorStub.callCount).to.eql(renderCount);
        sinon.assert.calledWith(getErrorForUrlSelectorStub, stubInitialState, stubProps.fetchUrl);
        expect(rendered).to.have.prop("isLoading", isLoadingForUrlStub);
        expect(rendered).to.have.prop("error", getErrorForUrlStub);
        expect(rendered.prop("posts").toJS()).to.eql(stubPhotos.toJS());

        expect(fetchPostsStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("fetchPosts");
    });

    it("propagates props (only `Post`s)", function () {
        const stubProps = {fetchUrl: "/woof", id: "meow", type: Post.type, match: {params: {}}};
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredMappedPosts = proxyquire("../../../../../src/lib/containers/mappedPosts", {
            "../actions": {
                fetchPostsForMapCreator: fetchPostsStub
            }
        });
        const MappedPosts = proxyquiredMappedPosts.default;

        const rendered = shallow(stubStore)(<MappedPosts {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.have.props(stubProps);

        expect(api.createIsLoadingUrlSelector.callCount).to.eql(renderCount);
        expect(api.createGetErrorForUrlSelector.callCount).to.eql(renderCount);
        expect(selectors.getWordPosts.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getWordPosts, stubInitialState);
        expect(isLoadingForUrlSelectorStub.callCount).to.eql(renderCount);
        sinon.assert.calledWith(isLoadingForUrlSelectorStub, stubInitialState, stubProps.fetchUrl);
        expect(getErrorForUrlSelectorStub.callCount).to.eql(renderCount);
        sinon.assert.calledWith(getErrorForUrlSelectorStub, stubInitialState, stubProps.fetchUrl);
        expect(rendered).to.have.prop("isLoading", isLoadingForUrlStub);
        expect(rendered).to.have.prop("error", getErrorForUrlStub);
        expect(rendered.prop("posts").toJS()).to.eql(stubWords.toJS());

        expect(fetchPostsStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("fetchPosts");
    });

    it("dispatches `fetchPosts` properly", function () {
        const stubProps = {fetchUrl: "/woof", id: "meow", match: {params: {}}};
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredMappedPosts = proxyquire("../../../../../src/lib/containers/mappedPosts", {
            "../actions": {
                fetchPostsForMapCreator: fetchPostsStub
            }
        });
        const MappedPosts = proxyquiredMappedPosts.default;

        const rendered = shallow(stubStore)(<MappedPosts {...stubProps} />);

        expect(rendered).to.have.props(stubProps);

        expect(fetchPostsStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("fetchPosts");

        const mappedFetchPosts = rendered.prop("fetchPosts");

        return Promise.resolve(mappedFetchPosts())
            .then(() => new Promise(resolve => setTimeout(resolve, MAPPED_POSTS_FETCH_DEBOUNCE_DELAY)))
            .then(() => {
                // expect(fetchPostsStub.calledOnce).to.eql(true);
                sinon.assert.calledWith(fetchPostsStub, stubProps.id, stubProps.fetchUrl, stubProps.type, {
                    ...stubProps.match.params,
                    perPage: FETCHING_MAPPED_POSTS_PER_PAGE
                });
            });
    });
});
