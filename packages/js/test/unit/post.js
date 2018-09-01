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
            const postJson = {
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

            const postFromJson = Post.fromJSON(postJson);

            expect(postFromJson).to.be.ok;
            expect(postFromJson.id).to.eql(postJson.id);
            expect(postFromJson.dateCreated).to.be.instanceof(DateTime);
        });
    });

    describe(".fromJS", () => {
        it("should instantiate a Post object from some plain JS Object", () => {
            const postJS = {
                id: "woof",
                type: "Woof",
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
                creator: {
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                }
            };

            const postfromJS = Post.fromJS(postJS);

            expect(postfromJS).to.be.ok;
            expect(postfromJS.id).to.eql(postJS.id);
            expect(postfromJS.dateCreated).to.be.instanceof(DateTime);
        });
    });

    describe("#uid", () => {
        it("should return a uid (composite key, based on source and the id in the source's context)", () => {
            const postJson = {
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
            const post = Post.fromJSON(postJson);

            expect(post.uid).to.eql(`${postJson.source}${compositeKeySeparator}${postJson.id}`);
        });
    });

    describe("#datePublished", function () {
        it("should set the value of `datePublished` to be the value of `dateCreated` if `datePublished` is falsy", function () {
            const postJs = {
                id: "woof",
                source: "Woofdy",
                dateCreated: DateTime.utc().toISO(),
                datePublished: null,
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
    });

    describe("#date", function () {
        it("should set the value of `date` to be the value of `dateCreated` if `datePublished` is falsy", function () {
            const postJs = {
                id: "woof",
                source: "Woofdy",
                dateCreated: DateTime.utc(),
                datePublished: null,
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

            const post = Post.fromJS(postJs);

            expect(post.type).to.eql(Post.name);
            expect(post.dateCreated).to.be.an.instanceOf(DateTime);
            expect(post.datePublished).to.be.an.instanceOf(DateTime);
            expect(post.datePublished.valueOf()).to.eql(post.dateCreated.valueOf());
            expect(post.date.valueOf()).to.eql(post.dateCreated.valueOf());
        });
    });

    describe("#toJS", function () {
        it("should set the value of `datePublished` per `#datePublished`", function () {
            const postJs = {
                id: "woof",
                source: "Woofdy",
                dateCreated: DateTime.utc(),
                datePublished: null,
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

            const post = Post.fromJS(postJs);

            expect(post.toJS()).to.contain({
                datePublished: postJs.dateCreated
            });
        });

        it("should set the value of `type` per `#type`", function () {
            const postJs = {
                id: "woof",
                source: "Woofdy",
                dateCreated: DateTime.utc(),
                datePublished: null,
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

            const post = Post.fromJS(postJs);

            expect(post.toJS()).to.contain({
                datePublished: postJs.dateCreated,
                type: post.type
            });
        });
    });

    describe("#toJSON", function () {
        it("should set the value of `datePublished` per `#datePublished`", function () {
            const postJson = {
                id: "woof",
                source: "Woofdy",
                dateCreated: DateTime.utc().toISO(),
                datePublished: null,
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

            const post = Post.fromJSON(postJson);

            expect(post.toJSON()).to.contain({
                datePublished: post.dateCreated
            });
        });

        it("should set the value of `type` per `#type`", function () {
            const postJson = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: DateTime.utc().toISO(),
                datePublished: null,
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

            const post = Post.fromJSON(postJson);

            expect(post.toJSON()).to.contain({
                type: post.type
            });
        });
    });
});
