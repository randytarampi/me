import {Post as PostEntity} from "@randy.tarampi/js";
import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Post, {
    PostBodyAsArrayComponent,
    PostBodyAsStringComponent,
    PostDateCreatedComponent,
    PostDatePublishedComponent,
    PostLocationComponent,
    PostMapComponent,
    PostTagsComponent,
    PostTitleComponent
} from "../../../../../src/lib/components/post";

describe("Post", function () {
    let stubPost;
    let store;

    beforeEach(function () {
        stubPost = PostEntity.fromJSON({
            id: "woof",
            source: "ᶘ ◕ᴥ◕ᶅ",
            dateCreated: new Date(2500, 0, 1).toISOString()
        });
        store = configureStore([])({});
    });

    const renderPost = props => render(<Provider store={store}><Post {...props}/></Provider>);

    const setElementSize = (element, width, height) => {
        if (!element) return;
        Object.defineProperty(element, "clientWidth", {configurable: true, value: width});
        Object.defineProperty(element, "clientHeight", {configurable: true, value: height});
    };

    describe("PostBodyAsArrayComponent", function () {
        it("renders (no body)", function () {
            const rendered = render(<PostBodyAsArrayComponent post={stubPost}/>);
            expect(rendered.container.firstElementChild).to.eql(null);
        });

        it("renders (array body)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                body: ["<p class=\"Woof\">Woof Woof Woof</p>", "Meow meow meow"]
            });

            const rendered = render(<PostBodyAsArrayComponent post={stubPost}/>);

            expect(rendered.container.querySelectorAll(".post-body").length).to.eql(2);
            expect(rendered.container.querySelector(".post-body > div")).to.not.eql(null);
            expect(rendered.container.querySelector(".post-body > p > .post-body__text")).to.not.eql(null);
        });
    });

    describe("PostBodyAsStringComponent", function () {
        it("renders (no body)", function () {
            const rendered = render(<PostBodyAsStringComponent post={stubPost}/>);
            expect(rendered.container.firstElementChild).to.eql(null);
        });

        it("renders (plain string body)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                body: "Meow meow meow"
            });

            const rendered = render(<PostBodyAsStringComponent post={stubPost}/>);

            expect(rendered.container.firstElementChild?.classList.contains("post-body")).to.eql(true);
            expect(rendered.container.querySelector(".post-body > p > .post-body__text")).to.not.eql(null);
        });

        it("renders (html string body)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                body: "<p class=\"Woof\">Woof Woof Woof</p>"
            });

            const rendered = render(<PostBodyAsStringComponent post={stubPost}/>);

            expect(rendered.container.firstElementChild?.classList.contains("post-body")).to.eql(true);
            expect(rendered.container.querySelector(".post-body > div")).to.not.eql(null);
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

            const rendered = render(<PostDateCreatedComponent post={stubPost}/>);
            expect(rendered.container.firstElementChild).to.eql(null);
        });

        it("renders (has different datePublished)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                datePublished: new Date(2500, 0, 2).toISOString()
            });

            const rendered = render(<PostDateCreatedComponent post={stubPost}/>);

            expect(rendered.container.firstElementChild?.classList.contains("post-date")).to.eql(true);
            expect(rendered.container.querySelector(".post-date__label.post-date__label--created")).to.not.eql(null);
            expect(rendered.container.querySelector(".post-date__date.post-date__date--created")).to.not.eql(null);
        });

        it("renders (no dateCreated)", function () {
            stubPost = PostEntity.fromJSON({id: "woof", source: "ᶘ ◕ᴥ◕ᶅ"});
            const rendered = render(<PostDateCreatedComponent post={stubPost}/>);
            expect(rendered.container.firstElementChild).to.eql(null);
        });
    });

    describe("PostDatePublishedComponent", function () {
        it("renders (has datePublished)", function () {
            stubPost = PostEntity.fromJSON({id: "woof", source: "ᶘ ◕ᴥ◕ᶅ", datePublished: new Date(2500, 0, 1).toISOString()});
            const rendered = render(<PostDatePublishedComponent post={stubPost}/>);

            expect(rendered.container.firstElementChild?.classList.contains("post-date")).to.eql(true);
            expect(rendered.container.querySelector(".post-date__label.post-date__label--published")).to.not.eql(null);
            expect(rendered.container.querySelector(".post-date__date.post-date__date--published")).to.not.eql(null);
        });

        it("renders (has unknown creator source)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                datePublished: new Date(2500, 0, 1).toISOString(),
                creator: {username: "woof", url: "woof://woof.woof/woof/woof", network: "meow"}
            });

            const rendered = render(<PostDatePublishedComponent post={stubPost}/>);
            expect(rendered.container.querySelector(".post-source__link")).to.not.eql(null);
            expect(rendered.container.querySelector(".post-source__source-name")).to.eql(null);
        });

        it("renders (has known creator source)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "unsplash",
                datePublished: new Date(2500, 0, 1).toISOString(),
                creator: {username: "woof", url: "woof://woof.woof/woof/woof", network: "unsplash"}
            });

            const rendered = render(<PostDatePublishedComponent post={stubPost}/>);
            expect(rendered.container.querySelector(".post-source__link")).to.not.eql(null);
            expect(rendered.container.querySelector(".post-source__source-name")).to.not.eql(null);
        });

        it("renders (no datePublished)", function () {
            stubPost = PostEntity.fromJSON({id: "woof", source: "ᶘ ◕ᴥ◕ᶅ"});
            const rendered = render(<PostDatePublishedComponent post={stubPost}/>);
            expect(rendered.container.firstElementChild).to.eql(null);
        });
    });

    describe("PostLocationComponent", function () {
        it("renders (has map)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                datePublished: new Date(2500, 0, 1).toISOString(),
                sourceUrl: "woof.woof/woof",
                tags: ["woof", "meow", "grr"],
                lat: 0,
                long: 0
            });

            const rendered = render(<Provider store={store}><PostLocationComponent post={stubPost}/></Provider>);
            expect(rendered.container.firstElementChild?.classList.contains("post-location")).to.eql(true);
            expect(rendered.container.querySelector(".post-location__link")).to.not.eql(null);
        });

        it("returns (no location)", function () {
            const rendered = render(<Provider store={store}><PostLocationComponent post={stubPost}/></Provider>);
            expect(rendered.container.firstElementChild).to.eql(null);
        });
    });

    describe("PostMapComponent", function () {
        it("renders (has map)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                datePublished: new Date(2500, 0, 1).toISOString(),
                sourceUrl: "woof.woof/woof",
                tags: ["woof", "meow", "grr"],
                lat: 0,
                long: 0
            });

            const rendered = render(<PostMapComponent post={stubPost}/>);

            expect(rendered.container.firstElementChild?.classList.contains("post-map")).to.eql(true);
        });

        it("renders (has custom children)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                datePublished: new Date(2500, 0, 1).toISOString(),
                sourceUrl: "woof.woof/woof",
                tags: ["woof", "meow", "grr"],
                lat: 0,
                long: 0
            });

            const rendered = render(<PostMapComponent post={stubPost}><div>Woof</div></PostMapComponent>);

            expect(rendered.container.firstElementChild?.classList.contains("post-map")).to.eql(true);
        });

        it("renders (no map)", function () {
            const rendered = render(<PostMapComponent post={stubPost}/>);
            expect(rendered.container.firstElementChild).to.eql(null);
        });
    });

    describe("PostTagsComponent", function () {
        it("renders (has tags)", function () {
            stubPost = PostEntity.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                datePublished: new Date(2500, 0, 1).toISOString(),
                sourceUrl: "woof.woof/woof",
                tags: ["woof", "meow", "grr"]
            });

            const rendered = render(<Provider store={store}><PostTagsComponent post={stubPost}/></Provider>);

            expect(rendered.container.firstElementChild?.classList.contains("post-tags")).to.eql(true);
            expect(rendered.container.querySelector(".post-tags__label")).to.not.eql(null);
            expect(rendered.container.querySelector(".post-tags__tag")).to.not.eql(null);
        });

        it("renders (no tags)", function () {
            const rendered = render(<Provider store={store}><PostTagsComponent post={stubPost}/></Provider>);
            expect(rendered.container.firstElementChild).to.eql(null);
        });
    });

    describe("PostTitleComponent", function () {
        it("renders (has url)", function () {
            stubPost = PostEntity.fromJSON({id: "woof", source: "ᶘ ◕ᴥ◕ᶅ", datePublished: new Date(2500, 0, 1).toISOString(), sourceUrl: "woof.woof/woof", tags: ["woof", "meow", "grr"]});

            const rendered = render(<PostTitleComponent post={stubPost} title={"Meow"}/>);

            expect(rendered.container.firstElementChild?.classList.contains("post-title")).to.eql(true);
            expect(rendered.container.querySelector(".post-title__text")).to.eql(null);
            expect(rendered.container.querySelector(".post-title__link")).to.not.eql(null);
        });

        it("renders (no url)", function () {
            const rendered = render(<PostTitleComponent post={stubPost} title={"Meow"}/>);

            expect(rendered.container.firstElementChild?.classList.contains("post-title")).to.eql(true);
            expect(rendered.container.querySelector(".post-title__text")).to.not.eql(null);
            expect(rendered.container.querySelector(".post-title__link")).to.eql(null);
        });
    });

    describe("dimensions", function () {
        it("uses the rendered element sizes", function () {
            const stubProps = {post: stubPost, containerHeight: 123, containerWidth: 456};
            const rendered = renderPost(stubProps);
            const postElement = rendered.container.firstElementChild;
            const metadataElement = rendered.container.querySelector(".post-metadata");
            const contentElement = rendered.container.querySelector(".post-content");

            setElementSize(postElement, 456, 123);
            setElementSize(metadataElement, 111, 222);
            setElementSize(contentElement, 333, 444);

            const component = new Post(stubProps);
            expect(component.width).to.eql(456);
            expect(component.height).to.eql(123);
            expect(component.metadataWidth).to.eql(111);
            expect(component.metadataHeight).to.eql(222);
            expect(component.contentHeight).to.eql(444);
            expect(component.containerWidth).to.eql(456);
            expect(component.containerHeight).to.eql(123);
            expect(component.scaledHeight).to.eql(Math.round(456 * 123 / 456));
            expect(component.title).to.eql("Untitled");
        });

        it("returns the `post.title` if it exists", function () {
            stubPost = PostEntity.fromJSON({id: "woof", source: "ᶘ ◕ᴥ◕ᶅ", dateCreated: new Date(2500, 0, 1).toISOString(), title: "Meow meow meow"});
            const component = new Post({post: stubPost, containerHeight: 123, containerWidth: 456});
            expect(component.title).to.eql(stubPost.title);
        });
    });
});
