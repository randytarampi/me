import {Photo} from "@randy.tarampi/js";
import {expect} from "chai";
import {createBrowserHistory} from "history";
import {fromJS, Set} from "immutable";
import React from "react";
import sinon from "sinon";
import {ConnectedMap, ConnectedPostMarker} from "../../../../../src/lib/containers";
import {GoogleMapMarkerClustererComponent} from "../../../../../src/lib/components";
import {MappedPostsComponent} from "../../../../../src/lib/components/mappedPosts";
import reducers from "../../../../../src/lib/data/reducers";
import {configureStore} from "../../../../../src/lib/store";
import {shallow} from "../../../../../src/test";

describe("MappedPosts", function () {
    let stubPost;
    let stubPosts;
    let stubInitialState;
    let stubStore;
    let stubHistory;

    beforeEach(function () {
        stubPost = Photo.fromJSON({
            id: "woof",
            source: "Woofdy",
            dateCreated: new Date(1900, 0, 1).toISOString(),
            datePublished: new Date(2500, 0, 1).toISOString(),
            width: -1,
            height: -2,
            sizedPhotos: [
                {url: "woof://woof.woof/woof/woofto", width: 640, height: 480},
                {url: "woof://woof.woof/woof/woofto?w=800", width: 800}
            ],
            title: "Woof woof woof",
            body: [
                "ʕ•ᴥ•ʔ",
                "ʕ•ᴥ•ʔﾉ゛",
                "ʕ◠ᴥ◠ʔ"
            ],
            sourceUrl: "woof://woof.woof/woof",
            creator: {
                id: -1,
                username: "ʕ•ᴥ•ʔ",
                name: "ʕ•ᴥ•ʔ",
                url: "woof://woof.woof/woof/woof/woof"
            }
        });
        stubPosts = Set([stubPost]);
        stubHistory = createBrowserHistory();
        stubInitialState = fromJS({});
        stubStore = configureStore(stubInitialState, stubHistory, reducers);
    });

    describe("MappedPostsComponent", function () {
        let stubFetchPosts;

        beforeEach(function () {
            stubFetchPosts = sinon.stub();
        });

        it("renders (shouldFetchPostsOnMount)", function () {
            const stubHtmlId = "woof";
            shallow(stubStore)(<MappedPostsComponent
                posts={stubPosts}
                id={stubHtmlId}
                shouldFetchPostsOnMount={true}
                fetchPosts={stubFetchPosts}
            />);

            expect(stubFetchPosts.calledOnce).to.eql(true);
        });

        it("renders (!shouldFetchPostsOnMount)", function () {
            const stubHtmlId = "woof";
            shallow(stubStore)(<MappedPostsComponent
                posts={stubPosts}
                id={stubHtmlId}
                shouldFetchPostsOnMount={false}
                fetchPosts={stubFetchPosts}
            />);

            expect(stubFetchPosts.notCalled).to.eql(true);
        });

        it("renders", function () {
            const stubHtmlId = "woof";
            const rendered = shallow(stubStore)(<MappedPostsComponent
                posts={stubPosts}
                id={stubHtmlId}
                fetchPosts={stubFetchPosts}
            />);

            expect(rendered).to.have.id(stubHtmlId);
            expect(rendered).to.have.prop("onIdle", stubFetchPosts);
            expect(rendered).to.have.descendants(ConnectedMap);
            expect(rendered).to.have.descendants(GoogleMapMarkerClustererComponent);
            expect(rendered).to.containMatchingElement(<ConnectedPostMarker post={stubPost} key={stubPost.uid}/>);
            expect(stubFetchPosts.calledOnce).to.eql(true);
        });
    });
});
