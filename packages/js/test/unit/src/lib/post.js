import {expect} from "chai";
import {List} from "immutable";
import {DateTime} from "luxon";
import Post from "../../../../src/lib/post";
import Profile from "../../../../src/lib/profile";
import {augmentUrlWithTrackingParams, compositeKeySeparator} from "../../../../src/lib/util";

describe("Post", () => {
    describe("constructor", () => {
        it("should build a Post object", () => {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                lat: 49.2845,
                long: -123.1116,
                tags: []
            };

            const post = new Post(postJs);

            expect(post.type).to.eql(Post.type);
            expect(post.dateCreated).to.be.an.instanceOf(DateTime);
            expect(post.datePublished).to.be.an.instanceOf(DateTime);
            expect(post.dateCreated).to.eql(postJs.dateCreated);
            expect(post.datePublished).to.eql(postJs.datePublished);
        });

        it("overrides dateCreated", function () {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                lat: 49.2845,
                long: -123.1116,
                tags: [
                    "foo",
                    `❕dateCreated❔${DateTime.utc().plus({years: 1}).valueOf()}`,
                    `❕datePublished❔${DateTime.utc().plus({years: -1}).valueOf()}`
                ]
            };

            const post = new Post(postJs);

            expect(post.type).to.eql(Post.type);
            expect(post.dateCreated).to.be.an.instanceOf(DateTime);
            expect(post.datePublished).to.be.an.instanceOf(DateTime);
            expect(postJs.tags[1]).to.have.string(post.dateCreated.valueOf().toString());
            expect(post.datePublished).to.eql(postJs.datePublished);
        });

        it("overrides lat", function () {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                lat: 49.2845,
                long: -123.1116,
                tags: [
                    `❕lat❔${-49.2845}`
                ]
            };

            const post = new Post(postJs);

            expect(post.type).to.eql(Post.type);
            expect(postJs.tags[0]).to.have.string(post.lat.toString());
            expect(post.long).to.eql(postJs.long);
        });

        it("overrides lat", function () {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                lat: 49.2845,
                long: -123.1116,
                tags: [
                    `❕long❔${+123.1116}`
                ]
            };

            const post = new Post(postJs);

            expect(post.type).to.eql(Post.type);
            expect(post.lat).to.eql(postJs.lat);
            expect(postJs.tags[0]).to.have.string(post.long.toString());
        });

        it("overrides geohash", function () {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                tags: [
                    "❕geohash❔c2b2qebz5b9w"
                ]
            };

            const post = new Post(postJs);

            expect(post.type).to.eql(Post.type);
            expect(postJs.tags[0]).to.have.string(post.geohash.toString());
        });

        it("overrides title", function () {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                tags: [
                    "❕title❔Meow meow meow"
                ]
            };

            const post = new Post(postJs);

            expect(post.type).to.eql(Post.type);
            expect(postJs.tags[0]).to.have.string(post.title.toString());
        });

        it("returns an empty Post", function () {
            const post = new Post();

            expect(post).to.be.instanceOf(Post);
        });
    });

    describe("fromJSON", () => {
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
                    url: "woof://woof.woof/woof/woof/woof"
                },
                tags: [
                    "woof",
                    "meow",
                    "grr"
                ],
                geohash: "c2b2qebz5b9w"
            };

            const postFromJson = Post.fromJSON(postJson);

            expect(postFromJson.id).to.eql(postJson.id);
            expect(postFromJson.dateCreated).to.be.instanceof(DateTime);
            expect(postFromJson.tags).to.be.instanceof(List);
            expect(postFromJson.tags.toJS()).to.eql(postJson.tags);
        });
    });

    describe("fromJS", () => {
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
                    url: "woof://woof.woof/woof/woof/woof"
                },
                lat: 49.2845,
                long: -123.1116
            };

            const postfromJS = Post.fromJS(postJS);

            expect(postfromJS.id).to.eql(postJS.id);
            expect(postfromJS.dateCreated).to.be.instanceof(DateTime);
        });
    });

    describe("#toSchema", function () {
        it("returns expected Schema.org JSON", function () {
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
                    url: "woof://woof.woof/woof/woof/woof"
                }
            };

            const postfromJS = Post.fromJS(postJS);

            const schemaJson = postfromJS.toSchema();
            const {body, sourceUrl, type, ...js} = postfromJS.toJS(); // eslint-disable-line no-unused-vars

            expect(schemaJson).to.eql({
                ...js,
                creator: postfromJS.creator.toSchema(),
                author: postfromJS.creator.toSchema(),
                publisher: postfromJS.creator.toSchema(),
                dateCreated: postfromJS.dateCreated.toISO(),
                dateModified: postfromJS.datePublished.toISO(),
                datePublished: postfromJS.datePublished.toISO(),
                accessMode: "textual",
                articleBody: postfromJS.body,
                articleSection: postfromJS.type,
                headline: postfromJS.title,
                name: postfromJS.title,
                sharedContent: postfromJS.sourceUrl,
                mainEntityOfPage: postfromJS.sourceUrl,
                text: postfromJS.body
            });
        });

        it("returns some empty Schema.org JSON", function () {
            const postfromJS = Post.fromJS();

            const schemaJson = postfromJS.toSchema();
            const {body, sourceUrl, type, ...js} = postfromJS.toJS(); // eslint-disable-line no-unused-vars

            expect(schemaJson).to.eql({
                ...js,
                accessMode: "textual",
                articleSection: postfromJS.type,
                articleBody: null,
                headline: null,
                name: null,
                author: null,
                publisher: null,
                dateModified: null,
                sharedContent: null,
                mainEntityOfPage: null,
                text: null
            });
        });
    });

    describe("#toRss", function () {
        it("returns expected `rss` item", function () {
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
                    url: "woof://woof.woof/woof/woof/woof"
                },
                lat: 49.2845,
                long: -123.1116
            };

            const postfromJS = Post.fromJS(postJS);

            const rssJson = postfromJS.toRss();

            expect(rssJson).to.eql({
                title: postfromJS.title,
                description: postfromJS.body,
                url: augmentUrlWithTrackingParams(postfromJS.sourceUrl),
                guid: postfromJS.uid,
                date: postfromJS.date.toJSDate(),
                author: `${postfromJS.creator.url} (${postfromJS.creator.name})`,
                lat: 49.2845,
                long: -123.1116
            });
        });

        it("returns some empty `rss` item", function () {
            const postfromJS = Post.fromJS();

            const rssJson = postfromJS.toRss();

            expect(rssJson).to.eql({
                title: null,
                description: null,
                url: null,
                guid: postfromJS.uid,
                date: null,
                author: null,
                lat: null,
                long: null
            });
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
                    url: "woof://woof.woof/woof/woof/woof"
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                })
            };

            const post = Post.fromJSON(postJs);

            expect(post.type).to.eql(Post.type);
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                })
            };

            const post = Post.fromJS(postJs);

            expect(post.type).to.eql(Post.type);
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                lat: 49.2845,
                long: -123.1116
            };

            const post = Post.fromJS(postJs);

            expect(post.toJS()).to.contain({
                datePublished: postJs.dateCreated,
                type: post.type,
                geohash: "c2b2qebz5b9w"
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                geohash: "c2b2qebz5b9w"
            };

            const post = Post.fromJSON(postJson);
            const json = post.toJSON();

            expect(json.datePublished).to.contain(post.dateCreated);
            expect(json.lat).to.be.closeTo(49.2845, 0.0001);
            expect(json.long).to.be.closeTo(-123.1116, 0.0001);
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                })
            };

            const post = Post.fromJSON(postJson);

            expect(post.toJSON()).to.contain({
                type: post.type
            });
        });
    });

    describe("#lat", function () {
        it("returns a passed lat", () => {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                lat: 49.2845,
                long: -123.1116
            };

            const post = new Post(postJs);

            expect(post.lat).to.eql(postJs.lat);
        });

        it("returns a lat from a geohash", () => {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                geohash: "c2b2qebz5b9w"
            };

            const post = new Post(postJs);

            expect(post.lat).to.be.closeTo(49.2845, 0.00001);
        });

        it("returns null if there's no lat or geohash", () => {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                })
            };

            const post = new Post(postJs);

            expect(post.lat).to.eql(null);
        });
    });

    describe("#long", function () {
        it("returns a passed long", () => {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                lat: 49.2845,
                long: -123.1116
            };

            const post = new Post(postJs);

            expect(post.long).to.eql(postJs.long);
        });

        it("returns a long from a geohash", () => {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                geohash: "c2b2qebz5b9w"
            };

            const post = new Post(postJs);

            expect(post.long).to.closeTo(-123.1116, 0.00001);
        });

        it("returns null if there's no long or geohash", () => {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                })
            };

            const post = new Post(postJs);

            expect(post.long).to.eql(null);
        });
    });

    describe("#geohash", function () {
        it("returns a passed geohash", () => {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                geohash: "c2b2qebz5b9w"
            };

            const post = new Post(postJs);

            expect(post.geohash).to.eql(postJs.geohash);
        });

        it("returns a geohash from a lat/long pair", () => {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                lat: 49.2845,
                long: -123.1116
            };

            const post = new Post(postJs);

            expect(post.geohash).to.eql("c2b2qebz5b9w");
        });

        it("returns null if there's no long or geohash", () => {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                lat: 49.2845
            };

            const post = new Post(postJs);

            expect(post.geohash).to.eql(null);
        });

        it("returns null if there's no lat or geohash", () => {
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
                creator: new Profile({
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }),
                long: -123.1116
            };

            const post = new Post(postJs);

            expect(post.geohash).to.eql(null);
        });
    });
});
