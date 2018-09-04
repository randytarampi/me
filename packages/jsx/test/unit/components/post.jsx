import {Post as PostEntity} from "@randy.tarampi/js";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import Post from "../../../lib/components/post";

describe("Post", function () {
    let stubPost;

    beforeEach(function () {
        stubPost = PostEntity.fromJSON({id: "woof", source: "ᶘ ◕ᴥ◕ᶅ", dateCreated: new Date(2500, 0, 1).toISOString()});
    });

    it("renders (url instead of title)", function () {
        stubPost = PostEntity.fromJSON({
            id: "woof",
            source: "ᶘ ◕ᴥ◕ᶅ",
            datePublished: new Date(2500, 0, 1).toISOString(),
            sourceUrl: "woof.woof/woof"
        });

        const stubProps = {
            post: stubPost,
            containerHeight: 123,
            containerWidth: 123,
        };
        const rendered = shallow(<Post {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.post.uid);
        expect(rendered).to.have.className("post");

        expect(rendered).to.have.descendants(".post-title");
        expect(rendered).to.not.have.descendants(".post-title__text");
        expect(rendered).to.have.descendants(".post-title__link");
        expect(rendered).to.have.descendants(".post-date");
        expect(rendered).to.have.descendants(".post-date__label.post-date__label--published");
        expect(rendered).to.have.descendants(".post-date__date.post-date__date--published");
        expect(rendered).to.not.have.descendants(".post-date__label.post-date__label--created");
        expect(rendered).to.not.have.descendants(".post-date__date.post-date__date--created");
        expect(rendered).to.not.have.descendants(".post-body");
    });

    it("renders (no dateCreated)", function () {
        stubPost = PostEntity.fromJSON({
            id: "woof",
            source: "ᶘ ◕ᴥ◕ᶅ",
            datePublished: new Date(2500, 0, 1).toISOString()
        });

        const stubProps = {
            post: stubPost,
            containerHeight: 123,
            containerWidth: 123,
        };
        const rendered = shallow(<Post {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.post.uid);
        expect(rendered).to.have.className("post");

        expect(rendered).to.have.descendants(".post-title");
        expect(rendered).to.have.descendants(".post-title__text");
        expect(rendered).to.have.descendants(".post-date");
        expect(rendered).to.have.descendants(".post-date__label.post-date__label--published");
        expect(rendered).to.have.descendants(".post-date__date.post-date__date--published");
        expect(rendered).to.not.have.descendants(".post-date__label.post-date__label--created");
        expect(rendered).to.not.have.descendants(".post-date__date.post-date__date--created");
        expect(rendered).to.not.have.descendants(".post-body");
    });

    it("renders (no body)", function () {
        const stubProps = {
            post: stubPost,
            containerHeight: 123,
            containerWidth: 123,
        };
        const rendered = shallow(<Post {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.post.uid);
        expect(rendered).to.have.className("post");

        expect(rendered).to.have.descendants(".post-title");
        expect(rendered).to.have.descendants(".post-title__text");
        expect(rendered).to.have.descendants(".post-date");
        expect(rendered).to.have.descendants(".post-date__label.post-date__label--published");
        expect(rendered).to.have.descendants(".post-date__date.post-date__date--published");
        expect(rendered).to.have.descendants(".post-date__label.post-date__label--created");
        expect(rendered).to.have.descendants(".post-date__date.post-date__date--created");
        expect(rendered).to.not.have.descendants(".post-body");
    });

    it("renders (plain string body)", function () {
        stubPost = PostEntity.fromJSON({
            id: "woof",
            source: "ᶘ ◕ᴥ◕ᶅ",
            dateCreated: new Date(2500, 0, 1).toISOString(),
            body: "Meow meow meow"
        });

        const stubProps = {
            post: stubPost,
            containerHeight: 123,
            containerWidth: 123,
        };
        const rendered = shallow(<Post {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.post.uid);
        expect(rendered).to.have.className("post");

        expect(rendered).to.have.descendants(".post-metadata");
        expect(rendered).to.have.descendants(".post-title");
        expect(rendered).to.have.descendants(".post-title__text");
        expect(rendered).to.have.descendants(".post-date");
        expect(rendered).to.have.descendants(".post-date__label.post-date__label--published");
        expect(rendered).to.have.descendants(".post-date__date.post-date__date--published");
        expect(rendered).to.have.descendants(".post-date__label.post-date__label--created");
        expect(rendered).to.have.descendants(".post-date__date.post-date__date--created");
        expect(rendered).to.have.descendants(".post-body");
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
            post: stubPost,
            containerHeight: 123,
            containerWidth: 123,
        };
        const rendered = shallow(<Post {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.post.uid);
        expect(rendered).to.have.className("post");

        expect(rendered).to.have.descendants(".post-metadata");
        expect(rendered).to.have.descendants(".post-title");
        expect(rendered).to.have.descendants(".post-title__text");
        expect(rendered).to.have.descendants(".post-date");
        expect(rendered).to.have.descendants(".post-date__label.post-date__label--published");
        expect(rendered).to.have.descendants(".post-date__date.post-date__date--published");
        expect(rendered).to.have.descendants(".post-date__label.post-date__label--created");
        expect(rendered).to.have.descendants(".post-date__date.post-date__date--created");
        expect(rendered).to.have.descendants(".post-body");
        expect(rendered).to.have.descendants(".post-body > div");
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
            post: stubPost,
            containerHeight: 123,
            containerWidth: 123,
        };
        const rendered = shallow(<Post {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.post.uid);
        expect(rendered).to.have.className("post");

        expect(rendered).to.have.descendants(".post-metadata");
        expect(rendered).to.have.descendants(".post-title");
        expect(rendered).to.have.descendants(".post-title__text");
        expect(rendered).to.have.descendants(".post-date");
        expect(rendered).to.have.descendants(".post-date__label.post-date__label--published");
        expect(rendered).to.have.descendants(".post-date__date.post-date__date--published");
        expect(rendered).to.have.descendants(".post-date__label.post-date__label--created");
        expect(rendered).to.have.descendants(".post-date__date.post-date__date--created");
        expect(rendered).to.have.descendants(".post-body");
        expect(rendered).to.have.descendants(".post-body > div");
        expect(rendered).to.have.descendants(".post-body > p > .post-body__text");
    });

    describe("#width", function () {
        it("returns the `containerWidth`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123,
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.getElement().props.children._self;
            expect(component).to.be.ok;
            expect(component.width).to.be.ok;
            expect(component.width).to.eql(stubProps.containerWidth);
        });
    });

    describe("#height", function () {
        it("returns the `containerHeight`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123,
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.getElement().props.children._self;
            expect(component).to.be.ok;
            expect(component.height).to.be.ok;
            expect(component.height).to.eql(stubProps.containerHeight);
        });
    });

    describe("#containerWidth", function () {
        it("returns the `containerWidth`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123,
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.getElement().props.children._self;
            expect(component).to.be.ok;
            expect(component.containerWidth).to.be.ok;
            expect(component.containerWidth).to.eql(stubProps.containerWidth);
        });
    });

    describe("#containerHeight", function () {
        it("returns the `containerHeight`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123,
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.getElement().props.children._self;
            expect(component).to.be.ok;
            expect(component.containerHeight).to.be.ok;
            expect(component.containerHeight).to.eql(stubProps.containerHeight);
        });
    });

    describe("#scaledHeight", function () {
        it("returns the `height`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123,
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.getElement().props.children._self;
            expect(component).to.be.ok;
            expect(component.scaledHeight).to.be.ok;
            expect(component.scaledHeight).to.eql(component.height);
            expect(component.scaledHeight).to.eql(component.containerHeight);
        });
    });

    describe("#title", function () {
        it("returns `Undefined` if no `post.title`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123,
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.getElement().props.children._self;
            expect(component).to.be.ok;
            expect(component.title).to.be.ok;
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
                containerWidth: 123,
            };
            const rendered = shallow(<Post {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post");

            const component = rendered.getElement().props.children._self;
            expect(component).to.be.ok;
            expect(component.title).to.be.ok;
            expect(component.title).to.eql(stubPost.title);
        });
    });
});
