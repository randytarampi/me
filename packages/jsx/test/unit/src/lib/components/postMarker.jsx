import {Gallery, Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {createBrowserHistory} from "history";
import {fromJS} from "immutable";
import React from "react";
import sinon from "sinon";
import {
    PostBodyAsArrayComponent,
    PostBodyAsStringComponent,
    PostDateCreatedComponent,
    PostDatePublishedComponent,
    PostTagsComponent,
    PostTitleComponent
} from "../../../../../src/lib/components";
import {
    buildPostMarkerId,
    PhotoMarkerInfoBoxComponent,
    PostMarkerComponent,
    PostMarkerInfoBoxComponent,
    PostMarkerInfoBoxContentComponent
} from "../../../../../src/lib/components/postMarker";
import reducers from "../../../../../src/lib/data/reducers";
import {configureStore} from "../../../../../src/lib/store";
import {shallow} from "../../../../../src/test";

describe("PostMarker", function () {
    let stubPost;
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
        stubHistory = createBrowserHistory();
        stubInitialState = fromJS({});
        stubStore = configureStore(stubInitialState, stubHistory, reducers);
    });

    describe("buildPostMarkerId", function () {
        it("returns the expected HTML id", function () {
            const id = buildPostMarkerId(stubPost);

            expect(id).to.eql(`marker--${stubPost.uid}`);
        });
    });

    describe("PostMarkerComponent", function () {
        let stubOnVisibilityToggle;
        let stubSetMapCenter;

        beforeEach(function () {
            stubOnVisibilityToggle = sinon.stub();
            stubSetMapCenter = sinon.stub();
        });

        it("renders (!isVisible)", function () {
            const rendered = shallow(stubStore)(<PostMarkerComponent
                post={stubPost}
                isVisible={false}
                setMapCenter={stubSetMapCenter}
                onVisibilityToggle={stubOnVisibilityToggle}
            />);

            expect(rendered).to.not.have.descendants(PostMarkerInfoBoxComponent);
            expect(rendered).to.not.have.descendants(PhotoMarkerInfoBoxComponent);
        });

        it("renders (Gallery)", function () {
            stubPost = Gallery.fromJSON({
                ...stubPost.toJSON(),
                type: undefined
            });

            const rendered = shallow(stubStore)(<PostMarkerComponent
                post={stubPost}
                isVisible={true}
                setMapCenter={stubSetMapCenter}
                onVisibilityToggle={stubOnVisibilityToggle}
            />);

            expect(rendered).to.have.className(`marker marker__${stubPost.type} ${buildPostMarkerId(stubPost)}`);
            expect(rendered).to.have.id(buildPostMarkerId(stubPost));
            expect(rendered.prop("defaultPosition")).to.eql({
                lat: stubPost.lat,
                lng: stubPost.long
            });

            expect(rendered).to.have.prop("onClick");
            rendered.prop("onClick")();
            expect(stubOnVisibilityToggle.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubOnVisibilityToggle, false);

            expect(rendered).to.have.descendants(PhotoMarkerInfoBoxComponent);
        });

        it("renders (Photo)", function () {
            const rendered = shallow(stubStore)(<PostMarkerComponent
                post={stubPost}
                isVisible={true}
                setMapCenter={stubSetMapCenter}
                onVisibilityToggle={stubOnVisibilityToggle}
            />);

            expect(rendered).to.have.className(`marker marker__${stubPost.type} ${buildPostMarkerId(stubPost)}`);
            expect(rendered).to.have.id(buildPostMarkerId(stubPost));
            expect(rendered.prop("defaultPosition")).to.eql({
                lat: stubPost.lat,
                lng: stubPost.long
            });

            expect(rendered).to.have.prop("onClick");
            rendered.prop("onClick")();
            expect(stubOnVisibilityToggle.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubOnVisibilityToggle, false);

            expect(rendered).to.have.descendants(PhotoMarkerInfoBoxComponent);
        });

        it("renders (Post)", function () {
            stubPost = Post.fromJSON({
                ...stubPost.toJSON(),
                type: undefined
            });

            const rendered = shallow(stubStore)(<PostMarkerComponent
                post={stubPost}
                isVisible={true}
                setMapCenter={stubSetMapCenter}
                onVisibilityToggle={stubOnVisibilityToggle}
            />);

            expect(rendered).to.have.className(`marker marker__${stubPost.type} ${buildPostMarkerId(stubPost)}`);
            expect(rendered).to.have.id(buildPostMarkerId(stubPost));
            expect(rendered.prop("defaultPosition")).to.eql({
                lat: stubPost.lat,
                lng: stubPost.long
            });

            expect(rendered).to.have.prop("onClick");
            rendered.prop("onClick")();
            expect(stubOnVisibilityToggle.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubOnVisibilityToggle, false);

            expect(rendered).to.have.descendants(PostMarkerInfoBoxComponent);
        });
    });

    describe("PostMarkerInfoBoxComponent", function () {
        let stubOnVisibilityToggle;

        beforeEach(function () {
            stubOnVisibilityToggle = sinon.stub();
            stubPost = Post.fromJSON({
                ...stubPost.toJSON(),
                type: undefined
            });
        });

        describe("postInfoBoxElementId", function () {
            it("returns the expected HTML id", function () {
                const rendered = shallow(stubStore)(<PostMarkerInfoBoxComponent
                    post={stubPost}
                    isVisible={true}
                    onVisibilityToggle={stubOnVisibilityToggle}
                />);

                const component = rendered.instance();
                expect(component.postInfoBoxElementId).to.eql(`marker-info-box--${stubPost.uid}`);
            });
        });

        describe("width", function () {
            it("returns a value scaled to the `window.innerWidth`", function () {
                const rendered = shallow(stubStore)(<PostMarkerInfoBoxComponent
                    post={stubPost}
                    isVisible={true}
                    onVisibilityToggle={stubOnVisibilityToggle}
                />);

                const component = rendered.instance();
                expect(component.width).to.eql(Math.ceil(window.innerWidth * 3 / 4));
            });
        });

        describe("height", function () {
            it("returns a value scaled to the `window.innerHeight`", function () {
                const rendered = shallow(stubStore)(<PostMarkerInfoBoxComponent
                    post={stubPost}
                    isVisible={true}
                    onVisibilityToggle={stubOnVisibilityToggle}
                />);

                const component = rendered.instance();
                expect(component.height).to.eql(Math.ceil(window.innerHeight * 3 / 4));
            });
        });

        describe("scaledHeight", function () {
            it("returns the `height`", function () {
                const rendered = shallow(stubStore)(<PostMarkerInfoBoxComponent
                    post={stubPost}
                    isVisible={true}
                    onVisibilityToggle={stubOnVisibilityToggle}
                />);

                const component = rendered.instance();
                expect(component.scaledHeight).to.eql(component.height);
            });
        });

        describe("title", function () {
            it("returns `Undefined` if no `post.title`", function () {
                const rendered = shallow(stubStore)(<PostMarkerInfoBoxComponent
                    post={stubPost.set("title", null)}
                    isVisible={true}
                    onVisibilityToggle={stubOnVisibilityToggle}
                />);

                const component = rendered.instance();
                expect(component.title).to.eql("Untitled");
            });

            it("returns the `post.title` if it exists", function () {
                const rendered = shallow(stubStore)(<PostMarkerInfoBoxComponent
                    post={stubPost}
                    isVisible={true}
                    onVisibilityToggle={stubOnVisibilityToggle}
                />);

                const component = rendered.instance();
                expect(component.title).to.eql(stubPost.title);
            });
        });

        it("renders", function () {
            const rendered = shallow(stubStore)(<PostMarkerInfoBoxComponent
                post={stubPost}
                isVisible={true}
                onVisibilityToggle={stubOnVisibilityToggle}
            />);

            const component = rendered.instance();

            expect(rendered).to.have.prop("onCloseClick", stubOnVisibilityToggle);
            expect(rendered).to.have.prop("visible", true);
            expect(rendered.prop("options")).to.eql({
                infoBoxClearance: 20,
                enableEventPropagation: true,
                boxClass: `marker-info-box marker-info-box__${stubPost.type} ${component.postInfoBoxElementId}`,
                pixelOffset: {
                    width: -384,
                    height: -288
                },
                boxStyle: {
                    backgroundColor: "white"
                }
            });
            expect(rendered).to.containMatchingElement(
                <PostMarkerInfoBoxContentComponent
                    post={stubPost}
                    title={component.title}
                    style={{
                        maxWidth: Math.ceil(window.innerWidth * 3 / 4)
                    }}
                />
            );
        });
    });

    describe("PostMarkerInfoBoxContentComponent", function () {
        it("renders (Photo)", function () {
            const stubStyle = {};

            const rendered = shallow(stubStore)(<PostMarkerInfoBoxContentComponent
                post={stubPost}
                title={stubPost.title}
                style={stubStyle}
            />);

            expect(rendered).to.have.className("marker-info-box-post");
            expect(rendered).to.containMatchingElement(<PostTitleComponent post={stubPost} title={stubPost.title}/>);
            expect(rendered).to.containMatchingElement(<PostDatePublishedComponent post={stubPost}/>);
            expect(rendered).to.containMatchingElement(<PostDateCreatedComponent post={stubPost} label="Taken:"/>);
            expect(rendered).to.containMatchingElement(
                <PostTagsComponent post={stubPost} tagLinkBase={`${__MAP_APP_URL__}/tags`}/>
            );
            expect(rendered).to.containMatchingElement(<PostBodyAsStringComponent post={stubPost}/>);
            expect(rendered).to.containMatchingElement(<PostBodyAsArrayComponent post={stubPost}/>);
            expect(rendered).to.have.descendants(".marker-info-box-post-content.hide-on-med-and-down");
        });

        it("renders (Post)", function () {
            stubPost = Post.fromJSON({
                ...stubPost.toJSON(),
                type: undefined
            });

            const stubStyle = {};

            const rendered = shallow(stubStore)(<PostMarkerInfoBoxContentComponent
                post={stubPost}
                title={stubPost.title}
                style={stubStyle}
            />);

            expect(rendered).to.have.className("marker-info-box-post");
            expect(rendered).to.containMatchingElement(<PostTitleComponent post={stubPost} title={stubPost.title}/>);
            expect(rendered).to.containMatchingElement(<PostDatePublishedComponent post={stubPost}/>);
            expect(rendered).to.containMatchingElement(<PostDateCreatedComponent post={stubPost} label="Taken:"/>);
            expect(rendered).to.containMatchingElement(
                <PostTagsComponent post={stubPost} tagLinkBase={`${__MAP_APP_URL__}/tags`}/>
            );
            expect(rendered).to.containMatchingElement(<PostBodyAsStringComponent post={stubPost}/>);
            expect(rendered).to.containMatchingElement(<PostBodyAsArrayComponent post={stubPost}/>);
            expect(rendered).to.have.descendants(".marker-info-box-post-content");
            expect(rendered).to.not.have.descendants(".marker-info-box-post-content.hide-on-med-and-down");
        });

        it("renders (is loading)", function () {
            const stubStyle = {};

            const rendered = shallow(stubStore)(<PostMarkerInfoBoxContentComponent
                isLoading={true}
                post={stubPost}
                title={stubPost.title}
                style={stubStyle}
            />);

            expect(rendered).to.have.className("marker-info-box-post marker-info-box-post--loading");
            expect(rendered).to.containMatchingElement(<PostTitleComponent post={stubPost} title={stubPost.title}/>);
            expect(rendered).to.containMatchingElement(<PostDatePublishedComponent post={stubPost}/>);
            expect(rendered).to.containMatchingElement(<PostDateCreatedComponent post={stubPost} label="Taken:"/>);
            expect(rendered).to.containMatchingElement(
                <PostTagsComponent post={stubPost} tagLinkBase={`${__MAP_APP_URL__}/tags`}/>
            );
            expect(rendered).to.containMatchingElement(<PostBodyAsStringComponent post={stubPost}/>);
            expect(rendered).to.containMatchingElement(<PostBodyAsArrayComponent post={stubPost}/>);
        });
    });

    describe("PhotoMarkerInfoBoxComponent", function () {
        let stubOnVisibilityToggle;
        let stubSetMapCenter;

        beforeEach(function () {
            stubOnVisibilityToggle = sinon.stub();
            stubSetMapCenter = sinon.stub();
        });

        describe("selected", function () {
            const windowDpr = window.devicePixelRatio;

            afterEach(function () {
                window.devicePixelRatio = windowDpr;
            });

            it("returns the appropriate photo for no DPR", function () {
                delete window.devicePixelRatio;

                const rendered = shallow(stubStore)(<PhotoMarkerInfoBoxComponent
                    post={stubPost}
                    isVisible={true}
                    setMapCenter={stubSetMapCenter}
                    onVisibilityToggle={stubOnVisibilityToggle}
                />);

                const component = rendered.instance();
                expect(component.selected).to.eql(stubPost.getSizedPhotoForDisplay(window.innerWidth));
            });

            it("returns the appropriate photo for no DPR", function () {
                window.devicePixelRatio = 2;

                const rendered = shallow(stubStore)(<PhotoMarkerInfoBoxComponent
                    post={stubPost}
                    isVisible={true}
                    setMapCenter={stubSetMapCenter}
                    onVisibilityToggle={stubOnVisibilityToggle}
                />);

                const component = rendered.instance();
                expect(component.selected).to.eql(stubPost.sortedSizedPhotos.last());
            });
        });

        describe("scaledHeight", function () {
            it("returns a value scaled to the `window.innerHeight`", function () {
                const rendered = shallow(stubStore)(<PhotoMarkerInfoBoxComponent
                    post={stubPost}
                    isVisible={true}
                    setMapCenter={stubSetMapCenter}
                    onVisibilityToggle={stubOnVisibilityToggle}
                />);

                const component = rendered.instance();
                expect(component.scaledHeight).to.eql(Math.ceil(window.innerHeight * 3 / 4));
            });
        });

        describe("scaledWidth", function () {
            it("returns the `width`", function () {
                const rendered = shallow(stubStore)(<PhotoMarkerInfoBoxComponent
                    post={stubPost}
                    isVisible={true}
                    setMapCenter={stubSetMapCenter}
                    onVisibilityToggle={stubOnVisibilityToggle}
                />);

                const component = rendered.instance();
                expect(component.scaledWidth).to.eql(Math.ceil(Math.ceil(window.innerHeight * 3 / 4) * component.selected.width / component.selected.height));
            });
        });

        describe("title", function () {
            it("returns `Undefined` if no `post.title`", function () {
                const rendered = shallow(stubStore)(<PhotoMarkerInfoBoxComponent
                    post={stubPost.set("title", null)}
                    isVisible={true}
                    setMapCenter={stubSetMapCenter}
                    onVisibilityToggle={stubOnVisibilityToggle}
                />);

                const component = rendered.instance();
                expect(component.title).to.eql("Untitled");
            });

            it("returns the `post.title` if it exists", function () {
                const rendered = shallow(stubStore)(<PhotoMarkerInfoBoxComponent
                    post={stubPost}
                    isVisible={true}
                    setMapCenter={stubSetMapCenter}
                    onVisibilityToggle={stubOnVisibilityToggle}
                />);

                const component = rendered.instance();
                expect(component.title).to.eql(stubPost.title);
            });
        });

        xit("renders", function () {
            const rendered = shallow(stubStore)(<PhotoMarkerInfoBoxComponent
                post={stubPost}
                isVisible={true}
                setMapCenter={stubSetMapCenter}
                onVisibilityToggle={stubOnVisibilityToggle}
            />);

            const component = rendered.instance();

            expect(rendered).to.have.prop("onCloseClick", stubOnVisibilityToggle);
            expect(rendered).to.have.prop("visible", true);
            expect(rendered.prop("options")).to.eql({
                infoBoxClearance: 20,
                enableEventPropagation: true,
                boxClass: `marker-info-box marker-info-box__${stubPost.type} ${component.postInfoBoxElementId}`,
                pixelOffset: {
                    width: -144,
                    height: -288
                },
                boxStyle: {
                    backgroundImage: `url(${component.selected.url})`,
                    backgroundColor: null
                },
                maxWidth: component.scaledWidth
            });
            expect(rendered).to.containMatchingElement(
                <PostMarkerInfoBoxContentComponent
                    post={stubPost}
                    title={component.title}
                    style={{
                        height: component.scaledHeight,
                        width: component.scaledWidth
                    }}
                />
            );
        });
    });
});
