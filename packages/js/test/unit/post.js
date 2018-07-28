const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const expect = require("chai").expect;
const Moment = require("moment");
const Post = require("../../lib/post");

describe("Post", () => {
    describe("constructor", () => {
        it("should build a `Post` object", () => {
            const postJSON = {
                id: "woof",
                source: "Woofdy",
                dateCreated: Date.now(),
                datePublished: Date.now(),
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
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                }
            };

            const post = new Post(postJSON.id, postJSON.type, postJSON.source, postJSON.dateCreated, postJSON.datePublished, postJSON.title, postJSON.body, postJSON.sourceUrl, postJSON.creator);

            expect(post.type).to.eql(Post.name);
            expect(post.dateCreated).to.be.an.instanceOf(Moment);
            expect(post.datePublished).to.be.an.instanceOf(Moment);
        });

        it("should set the value of `dateCreated` to be the value of `datePublished` if `dateCreated` is falsy", () => {
            const postJSON = {
                id: "woof",
                source: "Woofdy",
                datePublished: Date.now(),
                dateCreated: null,
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
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                }
            };

            const post = new Post(postJSON.id, postJSON.type, postJSON.source, postJSON.dateCreated, postJSON.datePublished, postJSON.title, postJSON.body, postJSON.sourceUrl, postJSON.creator);

            expect(post.type).to.eql(Post.name);
            expect(post.dateCreated).to.be.an.instanceOf(Moment);
            expect(post.datePublished).to.be.an.instanceOf(Moment);
            expect(post.datePublished.valueOf()).to.eql(post.dateCreated.valueOf());
        });
    });

    describe(".fromJSON", () => {
        it("should instantiate a Post object from some plain JS Object", () => {
            const postJSON = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: Date.now(),
                datePublished: Date.now(),
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
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                }
            };

            expect(new Post(postJSON.id, postJSON.type, postJSON.source, postJSON.dateCreated, postJSON.datePublished, postJSON.title, postJSON.body, postJSON.sourceUrl, postJSON.creator)).to.eql(Post.fromJSON(postJSON));
        });
    });

    describe("#uid", () => {
        it("should return a uid (composite key, based on source and the id in the source's context)", () => {
            const postJSON = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: null,
                datePublished: null,
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
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                }
            };
            const post = Post.fromJSON(postJSON);

            expect(post.uid).to.eql(`${postJSON.source}-${postJSON.id}`);
        });
    });
});
