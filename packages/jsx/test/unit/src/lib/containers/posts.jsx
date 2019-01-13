import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {List, Map} from "immutable";
import proxyquire from "proxyquire";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import * as api from "../../../../../src/lib/data/api";
import selectors from "../../../../../src/lib/data/selectors";
import {shallow} from "../../../../../src/test/util";

describe("Posts", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubWords;
    let stubPhotos;
    let stubPosts;
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
                lat: 0.0,
                long: 0.0,
                dateCreated: new Date(1900, 0, 1).toISOString(),
                tags: ["meow"]
            }),
            Photo.fromJSON({id: "rawr", lat: 0.0, long: 0.0, dateCreated: new Date(3000, 0, 1).toISOString()})
        ]);
        stubWords = List([
            Post.fromJSON({id: "woof", lat: 0.0, long: 0.0, dateCreated: new Date(2500, 0, 1).toISOString()}),
            Post.fromJSON({id: "grr", lat: 0.0, long: 0.0, dateCreated: new Date().toISOString()})
        ]);
        stubPosts = stubPhotos.concat(stubWords);

        isLoadingForUrlStub = false;
        getErrorForUrlStub = null;
        isLoadingForUrlSelectorStub = sinon.stub().returns(isLoadingForUrlStub);
        getErrorForUrlSelectorStub = sinon.stub().returns(getErrorForUrlStub);
        sinon.stub(api, "createIsLoadingUrlSelector").returns(isLoadingForUrlSelectorStub);
        sinon.stub(api, "createGetErrorForUrlSelector").returns(getErrorForUrlSelectorStub);
        sinon.stub(selectors, "getPosts").returns(stubPosts);
        sinon.stub(selectors, "getPostsSortedByDate").returns(stubPosts);
        sinon.stub(selectors, "getPhotoPostsSortedByDate").returns(stubPhotos);
        sinon.stub(selectors, "getWordPostsSortedByDate").returns(stubWords);
        sinon.stub(selectors, "getOldestFetchedPostDateForSearchTypeAndPostType").returns(stubPosts.get(0).date.toISO());
        sinon.stub(selectors, "getOldestAvailablePostDateForSearchTypeAndPostType").returns(stubPosts.get(0).date.plus({years: -1}).toISO());
    });

    afterEach(function () {
        api.createIsLoadingUrlSelector.restore();
        api.createGetErrorForUrlSelector.restore();
        selectors.getPosts.restore();
        selectors.getPostsSortedByDate.restore();
        selectors.getPhotoPostsSortedByDate.restore();
        selectors.getWordPostsSortedByDate.restore();
        selectors.getOldestFetchedPostDateForSearchTypeAndPostType.restore();
        selectors.getOldestAvailablePostDateForSearchTypeAndPostType.restore();
    });

    it("receives default props", function () {
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredPosts = proxyquire("../../../../../src/lib/containers/posts", {
            "../actions/posts/fetchPostsForBlog": {
                fetchPostsForBlogCreator: fetchPostsStub
            }
        });
        const Posts = proxyquiredPosts.default;

        const rendered = shallow(stubStore)(<Posts/>);
        let renderCount = 1;
        const expectedProps = {fetchUrl: "/posts"};

        expect(rendered).to.have.props(expectedProps);

        expect(api.createIsLoadingUrlSelector.callCount).to.eql(renderCount);
        expect(api.createGetErrorForUrlSelector.callCount).to.eql(renderCount);
        expect(selectors.getPostsSortedByDate.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getPostsSortedByDate, stubInitialState);
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
        const stubProps = {fetchUrl: "/woof", match: {params: {}}};
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredPosts = proxyquire("../../../../../src/lib/containers/posts", {
            "../actions/posts/fetchPostsForBlog": {
                fetchPostsForBlogCreator: fetchPostsStub
            }
        });
        const Posts = proxyquiredPosts.default;

        const rendered = shallow(stubStore)(<Posts {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.have.props(stubProps);

        expect(api.createIsLoadingUrlSelector.callCount).to.eql(renderCount);
        expect(api.createGetErrorForUrlSelector.callCount).to.eql(renderCount);
        expect(selectors.getPostsSortedByDate.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getPostsSortedByDate, stubInitialState);
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
        const stubProps = {fetchUrl: "/woof", match: {params: {filter: "tags", filterValue: "meow"}}};
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredPosts = proxyquire("../../../../../src/lib/containers/posts", {
            "../actions/posts/fetchPostsForBlog": {
                fetchPostsForBlogCreator: fetchPostsStub
            }
        });
        const Posts = proxyquiredPosts.default;

        const rendered = shallow(stubStore)(<Posts {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.have.props(stubProps);

        expect(api.createIsLoadingUrlSelector.callCount).to.eql(renderCount);
        expect(api.createGetErrorForUrlSelector.callCount).to.eql(renderCount);
        expect(selectors.getPostsSortedByDate.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getPostsSortedByDate, stubInitialState);
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
        const stubProps = {fetchUrl: "/woof", type: Photo.type, match: {params: {}}};
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredPosts = proxyquire("../../../../../src/lib/containers/posts", {
            "../actions/posts/fetchPostsForBlog": {
                fetchPostsForBlogCreator: fetchPostsStub
            }
        });
        const Posts = proxyquiredPosts.default;

        const rendered = shallow(stubStore)(<Posts {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.have.props(stubProps);

        expect(api.createIsLoadingUrlSelector.callCount).to.eql(renderCount);
        expect(api.createGetErrorForUrlSelector.callCount).to.eql(renderCount);
        expect(selectors.getPhotoPostsSortedByDate.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getPhotoPostsSortedByDate, stubInitialState);
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
        const stubProps = {fetchUrl: "/woof", type: Post.type, match: {params: {}}};
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredPosts = proxyquire("../../../../../src/lib/containers/posts", {
            "../actions/posts/fetchPostsForBlog": {
                fetchPostsForBlogCreator: fetchPostsStub
            }
        });
        const Posts = proxyquiredPosts.default;

        const rendered = shallow(stubStore)(<Posts {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.have.props(stubProps);

        expect(api.createIsLoadingUrlSelector.callCount).to.eql(renderCount);
        expect(api.createGetErrorForUrlSelector.callCount).to.eql(renderCount);
        expect(selectors.getWordPostsSortedByDate.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getWordPostsSortedByDate, stubInitialState);
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
        const stubProps = {fetchUrl: "/woof", match: {params: {}}};
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredPosts = proxyquire("../../../../../src/lib/containers/posts", {
            "../actions/posts/fetchPostsForBlog": {
                fetchPostsForBlogCreator: fetchPostsStub
            }
        });
        const Posts = proxyquiredPosts.default;

        const rendered = shallow(stubStore)(<Posts {...stubProps} />);

        expect(rendered).to.have.props(stubProps);

        expect(fetchPostsStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("fetchPosts");

        const mappedFetchPosts = rendered.prop("fetchPosts");

        return mappedFetchPosts()
            .then(() => {
                // expect(fetchPostsStub.calledOnce).to.eql(true);
                sinon.assert.calledWith(fetchPostsStub, stubProps.fetchUrl);
            });
    });
});
