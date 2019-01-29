import {LinkPost} from "@randy.tarampi/js";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import {
    LinkPostBodyAsArrayComponent,
    LinkPostBodyAsStringComponent,
    LinkPostComponent,
    LinkPostTitleComponent
} from "../../../../../src/lib/components/linkPost";

describe("LinkPostComponent", function () {
    let stubPost;

    beforeEach(function () {
        stubPost = LinkPost.fromJSON({
            id: "woof",
            source: "ᶘ ◕ᴥ◕ᶅ",
            dateCreated: new Date(2500, 0, 1).toISOString()
        });
    });

    describe("LinkPostBodyAsArrayComponent", function () {
        it("renders (no body)", function () {
            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<LinkPostBodyAsArrayComponent {...stubProps}/>);

            expect(rendered).to.not.have.className("post-link-body");
        });

        it("renders (array body)", function () {
            stubPost = LinkPost.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                linkBody: [
                    "<p class=\"Woof\">Woof Woof Woof</p>",
                    "Meow meow meow"
                ]
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<LinkPostBodyAsArrayComponent {...stubProps}/>);

            expect(rendered).to.have.descendants(".post-link-body");
            expect(rendered.find(".post-link-body")).to.have.length(2);
            expect(rendered).to.have.descendants(".post-link-body > div");
            expect(rendered).to.have.descendants(".post-link-body > p > .post-link-body__text");
        });
    });

    describe("LinkPostBodyAsStringComponent", function () {
        it("renders (no body)", function () {
            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<LinkPostBodyAsStringComponent {...stubProps}/>);

            expect(rendered).to.not.have.className("post-link-body");
        });

        it("renders (plain string body)", function () {
            stubPost = LinkPost.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                linkBody: "Meow meow meow"
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<LinkPostBodyAsStringComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-link-body");
            expect(rendered).to.have.descendants(".post-link-body > p > .post-link-body__text");
        });

        it("renders (html string body)", function () {
            stubPost = LinkPost.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                linkBody: "<p class=\"Woof\">Woof Woof Woof</p>"
            });

            const stubProps = {
                post: stubPost
            };
            const rendered = shallow(<LinkPostBodyAsStringComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-link-body");
            expect(rendered).to.have.descendants(".post-link-body > div");
        });
    });

    describe("LinkPostTitleComponent", function () {
        it("renders (has url)", function () {
            stubPost = LinkPost.fromJSON({
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
            const rendered = shallow(<LinkPostTitleComponent {...stubProps}/>);

            expect(rendered).to.have.className("post-link-title");
            expect(rendered).to.not.have.descendants(".post-link-title__text");
            expect(rendered).to.have.descendants(".post-link-title__link");
        });
    });

    describe("title", function () {
        it("returns `Undefined` if no `post.title`", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123
            };
            const rendered = shallow(<LinkPostComponent {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post post--link");

            const component = rendered.instance();
            expect(component.title).to.eql("🔗");
        });

        it("returns the `post.title` if it exists", function () {
            stubPost = LinkPost.fromJSON({
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
            const rendered = shallow(<LinkPostComponent {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post post--link");

            const component = rendered.instance();
            expect(component.title).to.eql(stubPost.title);
        });
    });

    describe("render", function () {
        it("renders", function () {
            const stubProps = {
                post: stubPost,
                containerHeight: 123,
                containerWidth: 123
            };
            const rendered = shallow(<LinkPostComponent {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post post--link");
        });
    });
});
