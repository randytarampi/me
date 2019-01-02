import {Post as PostEntity} from "@randy.tarampi/js";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import {Marker} from "react-google-maps";
import Post, {
    PostBodyAsArrayComponent,
    PostBodyAsStringComponent,
    PostDateCreatedComponent,
    PostDatePublishedComponent,
    PostMapComponent,
    PostTagsComponent,
    PostTitleComponent
} from "../../../../../src/lib/components/post";
import {MapComponent} from "../../../../../src/lib/components";

describe("Post", function () {
    let stubPost;

    beforeEach(function () {
        stubPost = PostEntity.fromJSON({
            id: "woof",
            source: "ᶘ ◕ᴥ◕ᶅ",
            dateCreated: new Date(2500, 0, 1).toISOString()
        });
    });

    describe("PostBodyAsArrayComponent", function () {
        it("renders (no body)", function () {
            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostBodyAsArrayComponent {...stubProps}/>);

            expect(rendered).to.not.have.className("post-body");
        });

        it("renders (array body)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                body: [
                    "<p class=\"Woof\">Woof Woof Woof</p>",
                    "Meow meow meow"
                ]
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostBodyAsArrayComponent {...stubProps}/>);

            expect(rendered).to.have.descendants(".post-body");
            expect(rendered.find(".post-body")).to.have.length(2);
            expect(rendered).to.have.descendants(".post-body > div");
            expect(rendered).to.have.descendants(".post-body > p > .post-body__text");
        });
    });

    describe("PostBodyAsStringComponent", function () {
        it("renders (no body)", function () {
            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostBodyAsStringComponent {...stubProps}/>);

            expect(rendered).to.not.have.className("post-body");
        });

        it("renders (plain string body)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                body: "Meow meow meow"
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostBodyAsStringComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-body");
            expect(rendered).to.have.descendants(".post-body > p > .post-body__text");
        });

        it("renders (html string body)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                body: "<p class=\"Woof\">Woof Woof Woof</p>"
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostBodyAsStringComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-body");
            expect(rendered).to.have.descendants(".post-body > div");
        });
    });

    describe("PostDateCreatedComponent", function () {
        it("renders (has same datePublished)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                datePublished: new Date(2500, 0, 1).toISOString()
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostDateCreatedComponent {...stubProps}/>);

            expect(rendered).to.not.have.className("post-date");
        });

        it("renders (has different datePublished)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                datePublished: new Date(2500, 0, 2).toISOString()
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostDateCreatedComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-date");
            expect(rendered).to.have.descendants(".post-date__label.post-date__label--created");
            expect(rendered).to.have.descendants(".post-date__date.post-date__date--created");
        });

        it("renders (no dateCreated)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ"
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostDateCreatedComponent {...stubProps}/>);

            expect(rendered).to.not.have.className("post-date");
        });
    });

    describe("PostDatePublishedComponent", function () {
        it("renders (has datePublished)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                datePublished: new Date(2500, 0, 1).toISOString()
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostDatePublishedComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-date");
            expect(rendered).to.have.descendants(".post-date__label.post-date__label--published");
            expect(rendered).to.have.descendants(".post-date__date.post-date__date--published");
        });

        it("renders (has unknown creator source)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                datePublished: new Date(2500, 0, 1).toISOString(),
                creator: {
                    username: "woof",
                    url: "woof://woof.woof/woof/woof",
                    network: "meow"
                }
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostDatePublishedComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-date");
            expect(rendered).to.have.descendants(".post-source__link");
            expect(rendered).to.not.have.descendants(".post-source__source-name");
        });

        it("renders (has known creator source)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "unsplash",
                datePublished: new Date(2500, 0, 1).toISOString(),
                creator: {
                    username: "woof",
                    url: "woof://woof.woof/woof/woof",
                    network: "unsplash"
                }
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostDatePublishedComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-date");
            expect(rendered).to.have.descendants(".post-source__link");
            expect(rendered).to.have.descendants(".post-source__source-name");
        });

        it("renders (no datePublished)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ"
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostDatePublishedComponent {...stubProps}/>);

            expect(rendered).to.not.have.className("post-date");
        });
    });

    describe("PostMapComponent", function () {
        it("renders (has map)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                datePublished: new Date(2500, 0, 1).toISOString(),
                sourceUrl: "woof.woof/woof",
                tags: [
                    "woof",
                    "meow",
                    "grr"
                ],
                lat: 0,
                long: 0
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostMapComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-map");
            expect(rendered).to.have.descendants(MapComponent);
            expect(rendered).to.containMatchingElement(<Marker position={{lat: stubPost.lat, lng: stubPost.long}}/>);
        });

        it("renders (has custom children)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                datePublished: new Date(2500, 0, 1).toISOString(),
                sourceUrl: "woof.woof/woof",
                tags: [
                    "woof",
                    "meow",
                    "grr"
                ],
                lat: 0,
                long: 0
            });

            const stubProps = {
                post: stubPost
            };
            const StubChild = () => <div>Woof</div>;
            const rendered = shallow(<PostMapComponent {...stubProps}><StubChild/></PostMapComponent>);

            expect(rendered).to.have.className("post-map");
            expect(rendered).to.have.descendants(MapComponent);
            expect(rendered).to.have.descendants(StubChild);
        });

        it("renders (no map)", function () {
            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostMapComponent {...stubProps}/>);

            expect(rendered).to.not.have.className("post-map");
        });
    });

    describe("PostTagsComponent", function () {
        it("renders (has tags)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                datePublished: new Date(2500, 0, 1).toISOString(),
                sourceUrl: "woof.woof/woof",
                tags: [
                    "woof",
                    "meow",
                    "grr"
                ]
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostTagsComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-tags");
            expect(rendered).to.have.descendants(".post-tags__label");
            expect(rendered).to.have.descendants(".post-tags__tag");
        });

        it("renders (no tags)", function () {
            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostTagsComponent {...stubProps}/>);

            expect(rendered).to.not.have.className("post-tags");
        });
    });

    describe("PostTitleComponent", function () {
        it("renders (has url)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                datePublished: new Date(2500, 0, 1).toISOString(),
                sourceUrl: "woof.woof/woof",
                tags: [
                    "woof",
                    "meow",
                    "grr"
                ]
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostTitleComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-title");
            expect(rendered).to.not.have.descendants(".post-title__text");
            expect(rendered).to.have.descendants(".post-title__link");
        });

        it("renders (no url)", function () {
            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<PostTitleComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-title");
            expect(rendered).to.have.descendants(".post-title__text");
            expect(rendered).to.not.have.descendants(".post-title__link");
        });
    });

    describe("width", function () {
        it("returns the `containerWidth`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.instance();
            expect(component.width).to.eql(stubProps.containerWidth);
        });
    });

    describe("height", function () {
        it("returns the `containerHeight`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.instance();
            expect(component.height).to.eql(stubProps.containerHeight);
        });
    });

    describe("metadataWidth", function () {
        it("returns the `width`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.instance();
            expect(component.metadataWidth).to.eql(component.width);
            expect(component.metadataWidth).to.eql(component.containerWidth);
        });
    });

    describe("metadataHeight", function () {
        it("returns the `height`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.instance();
            expect(component.metadataHeight).to.eql(component.height);
            expect(component.metadataHeight).to.eql(component.containerHeight);
        });
    });

    describe("contentHeight", function () {
        it("returns the `height`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.instance();
            expect(component.contentHeight).to.eql(component.height);
            expect(component.contentHeight).to.eql(component.containerHeight);
        });
    });

    describe("containerWidth", function () {
        it("returns the `containerWidth`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.instance();
            expect(component.containerWidth).to.eql(stubProps.containerWidth);
        });
    });

    describe("containerHeight", function () {
        it("returns the `containerHeight`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.instance();
            expect(component.containerHeight).to.eql(stubProps.containerHeight);
        });
    });

    describe("scaledHeight", function () {
        it("returns the `height`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.instance();
            expect(component.scaledHeight).to.eql(component.height);
            expect(component.scaledHeight).to.eql(component.containerHeight);
        });
    });

    describe("title", function () {
        it("returns `Undefined` if no `post.title`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.instance();
            expect(component.title).to.eql("Untitled");
        });

        it("returns the `post.title` if it exists", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                title: "Meow meow meow"
            });

            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.instance();
            expect(component.title).to.eql(stubPost.title);
        });
    });
});
