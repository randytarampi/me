import {CampaignLink, ConnectedPosts, RowBlock} from "@randy.tarampi/jsx";
import {shallow} from "@randy.tarampi/jsx/test";
import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import New from "../../../../../src/public/views/main/new";

describe("New", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);
    });

    it("renders", function () {
        const rendered = shallow(stubStore)(<New/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.contain(
            <h2>
                <span className="text">So what's new? <CampaignLink text=" " className="link--rss"
                                                                    href={__POSTS_FEED_URL__}/></span>
            </h2>
        );
        expect(rendered).to.contain(
            <ConnectedPosts
                fetchUrl={`${__POSTS_SERVICE_URL__}`}
                infiniteLoadBeginEdgeOffset={undefined}
                shouldFetchPostsOnMount={true}
                postsLimit={3}
            />
        );
        expect(rendered.find(RowBlock)).to.have.length(1);
    });
});
