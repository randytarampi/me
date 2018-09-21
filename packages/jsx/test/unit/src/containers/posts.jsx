import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {List, Map} from "immutable";
import proxyquire from "proxyquire";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import * as api from "../../../../src/lib/data/api";
import selectors from "../../../../src/lib/data/selectors";
import {shallow} from "../../../util";

describe("Posts", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
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

        stubPosts = List([
            Post.fromJSON({id: "woof", dateCreated: new Date(2500, 0, 1).toISOString()}),
            Photo.fromJSON({id: "meow", dateCreated: new Date(1900, 0, 1).toISOString()}),
            Post.fromJSON({id: "grr", dateCreated: new Date().toISOString()}),
            Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
        ]);

        isLoadingForUrlStub = false;
        getErrorForUrlStub = null;
        isLoadingForUrlSelectorStub = sinon.stub().returns(isLoadingForUrlStub);
        getErrorForUrlSelectorStub = sinon.stub().returns(getErrorForUrlStub);
        sinon.stub(api, "createIsLoadingUrlSelector").returns(isLoadingForUrlSelectorStub);
        sinon.stub(api, "createGetErrorForUrlSelector").returns(getErrorForUrlSelectorStub);
        sinon.stub(selectors, "getPostsSortedByDate").returns(stubPosts);
    });

    afterEach(function () {
        api.createIsLoadingUrlSelector.restore();
        api.createGetErrorForUrlSelector.restore();
        selectors.getPostsSortedByDate.restore();
    });

    it("receives default props", function () {
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredPosts = proxyquire("../../../../src/lib/containers/posts", {
            "../actions/fetchPosts": {
                "default": fetchPostsStub
            }
        });
        const Posts = proxyquiredPosts.default;

        const rendered = shallow(stubStore)(<Posts/>);
        let renderCount = 1;
        const expectedProps = {fetchUrl: "/posts"};

        expect(rendered).to.be.ok;
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
        expect(rendered).to.have.prop("posts", stubPosts);

        expect(fetchPostsStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("fetchPosts");
    });

    it("propagates props", function () {
        const stubProps = {fetchUrl: "/woof"};
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredPosts = proxyquire("../../../../src/lib/containers/posts", {
            "../actions/fetchPosts": {
                "default": fetchPostsStub
            }
        });
        const Posts = proxyquiredPosts.default;

        const rendered = shallow(stubStore)(<Posts {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.be.ok;
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
        expect(rendered).to.have.prop("posts", stubPosts);

        expect(fetchPostsStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("fetchPosts");
    });

    it("dispatches `fetchPosts` properly", function () {
        const stubProps = {fetchUrl: "/woof"};
        const fetchPostsStub = sinon.stub().returns(() => Promise.resolve());
        const proxyquiredPosts = proxyquire("../../../../src/lib/containers/posts", {
            "../actions/fetchPosts": {
                "default": fetchPostsStub
            }
        });
        const Posts = proxyquiredPosts.default;

        const rendered = shallow(stubStore)(<Posts {...stubProps} />);

        expect(rendered).to.be.ok;
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
