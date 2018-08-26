import {expect} from "chai";
import {DateTime} from "luxon";
import Creator from "../../lib/creator";
import Post from "../../lib/post";
import {compositeKeySeparator} from "../../lib/util";

describe("Post", () => {
    describe("constructor", () => {
        it("should build a `Post` object", () => {
            const postJs = {
                id: "woof",
                source: "Woofdy",
                dateCreated: DateTime.utc(),
                datePublished: DateTime.utc(),
                title: "Woof woof woof",
                body: [
                    "ʕ•ᴥ•ʔ",
                    "ʕ•ᴥ•ʔﾉ゛",
                    "ʕ◠ᴥ◠ʔ"
                ],
                sourceUrl: "woof://woof.woof/woof",
                creator: new Creator({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                })
            };

            const post = new Post(postJs);

            expect(post.type).to.eql(Post.name);
            expect(post.dateCreated).to.be.an.instanceOf(DateTime);
            expect(post.datePublished).to.be.an.instanceOf(DateTime);
        });
    });

    describe(".fromJSON", () => {
        it("should instantiate a Post object from some plain JS Object", () => {
            const postJSON = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: DateTime.utc().toISO(),
                datePublished: DateTime.utc().toISO(),
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

            const postFromJson = Post.fromJSON(postJSON);

            expect(postFromJson).to.be.ok;
            expect(postFromJson.id).to.eql(postJSON.id);
            expect(postFromJson.dateCreated).to.be.instanceof(DateTime);
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

            expect(post.uid).to.eql(`${postJSON.source}${compositeKeySeparator}${postJSON.id}`);
        });
    });

    describe("#dateCreated", function () {
        it("should set the value of `dateCreated` to be the value of `datePublished` if `dateCreated` is falsy", function () {
            const postJs = {
                id: "woof",
                source: "Woofdy",
                datePublished: DateTime.utc().toISO(),
                dateCreated: null,
                title: "Woof woof woof",
                body: [
                    "ʕ•ᴥ•ʔ",
                    "ʕ•ᴥ•ʔﾉ゛",
                    "ʕ◠ᴥ◠ʔ"
                ],
                sourceUrl: "woof://woof.woof/woof",
                creator: new Creator({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                })
            };

            const post = Post.fromJSON(postJs);

            expect(post.type).to.eql(Post.name);
            expect(post.dateCreated).to.be.an.instanceOf(DateTime);
            expect(post.datePublished).to.be.an.instanceOf(DateTime);
            expect(post.datePublished.valueOf()).to.eql(post.dateCreated.valueOf());
        });
    })
});
