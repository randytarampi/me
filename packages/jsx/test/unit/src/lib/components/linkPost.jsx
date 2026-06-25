const {LinkPost} = require("@randy.tarampi/js");
const {expect} = require("chai");
const {render} = require("@testing-library/react");
const React = require("react");
const configureStore = require("redux-mock-store");
const {Provider} = require("react-redux");
const {
    LinkPostBodyAsArrayComponent,
    LinkPostBodyAsStringComponent,
    LinkPostComponent,
    LinkPostTitleComponent
} = require("../../../../../src/lib/components/linkPost.jsx");

describe("LinkPostComponent", function () {
    let stubPost;

    beforeEach(function () {
        stubPost = LinkPost.fromJSON({
            id: "woof",
            source: "ᶘ ◕ᴥ◕ᶅ",
            dateCreated: new Date(2500, 0, 1).toISOString(),
            linkSourceUrl: "https://www.example.com/woof",
            linkTitle: "Woof"
        });
    });

    describe("LinkPostBodyAsArrayComponent", function () {
        it("renders (no body)", function () {
            const rendered = render(<LinkPostBodyAsArrayComponent post={stubPost}/>);
            expect(rendered.container.firstElementChild).to.eql(null);
        });

        it("renders (array body)", function () {
            stubPost = LinkPost.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                linkBody: ["<p class=\"Woof\">Woof Woof Woof</p>", "Meow meow meow"]
            });

            const rendered = render(<LinkPostBodyAsArrayComponent post={stubPost}/>);

            expect(rendered.container.querySelectorAll(".post-link-body").length).to.eql(2);
            expect(rendered.container.querySelector(".post-link-body > div")).to.not.eql(null);
            expect(rendered.container.querySelector(".post-link-body > p > .post-link-body__text")).to.not.eql(null);
        });
    });

    describe("LinkPostBodyAsStringComponent", function () {
        it("renders (no body)", function () {
            const rendered = render(<LinkPostBodyAsStringComponent post={stubPost}/>);
            expect(rendered.container.firstElementChild).to.eql(null);
        });

        it("renders (plain string body)", function () {
            stubPost = LinkPost.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                linkBody: "Meow meow meow"
            });

            const rendered = render(<LinkPostBodyAsStringComponent post={stubPost}/>);

            expect(rendered.container.firstElementChild?.classList.contains("post-link-body")).to.eql(true);
            expect(rendered.container.querySelector(".post-link-body > p > .post-link-body__text")).to.not.eql(null);
        });

        it("renders (html string body)", function () {
            stubPost = LinkPost.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                linkBody: "<p class=\"Woof\">Woof Woof Woof</p>"
            });

            const rendered = render(<LinkPostBodyAsStringComponent post={stubPost}/>);

            expect(rendered.container.firstElementChild?.classList.contains("post-link-body")).to.eql(true);
            expect(rendered.container.querySelector(".post-link-body > div")).to.not.eql(null);
        });
    });

    describe("LinkPostTitleComponent", function () {
        it("renders (has url)", function () {
            stubPost = LinkPost.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                datePublished: new Date(2500, 0, 1).toISOString(),
                linkSourceUrl: "https://www.example.com/woof",
                linkTitle: "Woof",
                tags: ["woof", "meow", "grr"]
            });

            const rendered = render(<LinkPostTitleComponent post={stubPost}/>);

            expect(rendered.container.firstElementChild?.classList.contains("post-link-title")).to.eql(true);
            expect(rendered.container.querySelector(".post-link-title__text")).to.eql(null);
            expect(rendered.container.querySelector(".post-link-title__link")).to.not.eql(null);
        });
    });

    describe("title", function () {
        it("returns `🔗` if no `post.title`", function () {
            const component = new LinkPostComponent({post: stubPost, containerHeight: 123, containerWidth: 123});
            expect(component.title).to.eql("🔗");
        });

        it("returns the `post.title` if it exists", function () {
            stubPost = LinkPost.fromJSON({
                id: "woof",
                source: "ᶘ ◕ᴥ◕ᶅ",
                dateCreated: new Date(2500, 0, 1).toISOString(),
                title: "Meow meow meow"
            });

            const component = new LinkPostComponent({post: stubPost, containerHeight: 123, containerWidth: 123});
            expect(component.title).to.eql(stubPost.title);
        });
    });

    describe("render", function () {
        it("renders", function () {
            const store = configureStore([])({});
            const stubProps = {post: stubPost, containerHeight: 123, containerWidth: 123};
            const rendered = render(
                <Provider store={store}>
                    <LinkPostComponent {...stubProps}/>
                </Provider>
            );

            expect(rendered.container.firstElementChild?.id).to.eql(stubProps.post.uid);
            expect(rendered.container.firstElementChild?.classList.contains("post--link")).to.eql(true);
        });
    });
});
