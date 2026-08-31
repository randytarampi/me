import {Photo, Post, POST_STATUS, SizedPhoto} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import {setupLocal} from "../../../../../src/serverless/dynamodb/util.js";

let PostModel;

before(async function () {
    setupLocal();
    ({default: PostModel} = await import("../../../../../src/db/models/post.js"));
});

describe("Post", function () {
    this.timeout(60000);

    let stubPost;
    let stubPhoto;
    let stubPosts;

    beforeEach(async function () {
        stubPost = Post.fromJSON({
            raw: {},
            id: "woof",
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
                "Woof",
                "meow",
                "",
                "grr"
            ]
        });
        stubPhoto = Photo.fromJSON({
            raw: {},
            id: "meow",
            source: "Meowdy",
            dateCreated: DateTime.utc().toISO(),
            datePublished: DateTime.utc().toISO(),
            width: -1,
            height: -2,
            sizedPhotos: [
                SizedPhoto.fromJSON({url: "meow://meow.meow/meow/meowto", width: 640, height: 480})
            ],
            title: "Meow meow meow",
            body: [
                "ʕ•ᴥ•ʔ",
                "ʕ•ᴥ•ʔﾉ゛",
                "ʕ◠ᴥ◠ʔ"
            ],
            sourceUrl: "meow://meow.meow/meow",
            creator: {
                id: -1,
                username: "ʕ•ᴥ•ʔ",
                name: "ʕ•ᴥ•ʔ",
                url: "meow://meow.meow/meow/meow/meow"
            }
        });
        stubPosts = [
            stubPost,
            stubPhoto
        ];

        // NOTE-RT: dynamoose's `batchDelete` has no chunking — DynamoDB caps `BatchWriteItem` at 25
        // items per request, and rejects the *entire* request if exceeded. Previous test suites
        // (e.g. `authInfo.js`) can leave stale posts that accumulate beyond 25, so the cleanup
        // here must chunk, just like `DynamooseModel#createRecords`.
        const posts = await PostModel.dynamooseModel.query("status").eq(POST_STATUS.visible).exec();
        if (!posts.length) {
            return;
        }

        const keys = posts.map(post => ({uid: post.uid, status: POST_STATUS.visible}));
        for (let i = 0; i < keys.length; i += 25) {
            await PostModel.dynamooseModel.batchDelete(keys.slice(i, i + 25));
        }
    });

    describe("createRecord", function () {
        it("persists a post from a Post", async function () {
            const createdPost = await PostModel.createRecord(stubPost);
            expect(createdPost.uid).to.eql(stubPost.uid);
            const postFromDb = await PostModel.dynamooseModel.get({uid: createdPost.uid, status: POST_STATUS.visible});
            expect(postFromDb).to.be.ok;
        });

        it("persists a post from a Photo", async function () {
            const createdPhoto = await PostModel.createRecord(stubPhoto);
            expect(createdPhoto.uid).to.eql(stubPhoto.uid);
            const photoFromDb = await PostModel.dynamooseModel.get({
                uid: createdPhoto.uid,
                status: POST_STATUS.visible
            });
            expect(photoFromDb).to.be.ok;
        });

        it("doesn't persist empty string tags", async function () {
            const createdPost = await PostModel.createRecord(stubPost);
            expect(createdPost.uid).to.eql(stubPost.uid);
            const postFromDb = await PostModel.dynamooseModel.get({uid: createdPost.uid, status: POST_STATUS.visible});
            expect(postFromDb.tags).to.be.an.instanceof(Set);
            expect([...postFromDb.tags]).to.have.all.members(stubPost.tags.filter(tag => !!tag).map(tag => tag.toLowerCase()).toArray());
            expect([...postFromDb.tags]).to.not.have.members([""]);
        });
    });

    describe("getRecord", function () {
        it("retrieves a Post (uid)", async function () {
            await PostModel.createRecords(stubPosts);
            const retrievedPost = await PostModel.getRecord({_query: {uid: {eq: stubPost.uid}}});
            expect(retrievedPost.uid).to.eql(stubPost.uid);
            expect(retrievedPost.type).to.eql(Post.type);
        });

        it("retrieves a Post (type)", async function () {
            await PostModel.createRecords(stubPosts);
            const retrievedPost = await PostModel.getRecord({_query: {type: {eq: stubPost.type}}});
            expect(retrievedPost.uid).to.eql(stubPost.uid);
            expect(retrievedPost.type).to.eql(Post.type);
        });

        it("retrieves a Photo (source)", async function () {
            await PostModel.createRecords(stubPosts);
            const retrievedPhoto = await PostModel.getRecord({_filter: {source: {eq: stubPhoto.source}}});
            expect(retrievedPhoto.uid).to.eql(stubPhoto.uid);
            expect(retrievedPhoto.type).to.eql(Photo.type);
        });

        it("retrieves a Post (tags)", async function () {
            const otherPhoto = Photo.fromJSON({
                raw: {},
                id: "grr",
                source: "Grrdy",
                dateCreated: DateTime.utc().toISO(),
                datePublished: DateTime.utc().toISO(),
                width: -1,
                height: -2,
                sizedPhotos: [
                    SizedPhoto.fromJSON({url: "grr://grr.grr/grr/grrto", width: 640, height: 480})
                ],
                title: "Grr grr grr",
                body: [
                    "ʕ•ᴥ•ʔ",
                    "ʕ•ᴥ•ʔﾉ゛",
                    "ʕ◠ᴥ◠ʔ"
                ],
                sourceUrl: "grr://grr.grr/grr",
                creator: {
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "grr://grr.grr/grr/grr/grr"
                },
                tags: [
                    "Woof"
                ]
            });
            const moreThanOnePhoto = stubPosts.concat(otherPhoto);
            await PostModel.createRecords(moreThanOnePhoto);
            const retrievedPost = await PostModel.getRecord({_filter: {tags: {CONTAINS: ["woof"]}}});
            expect(retrievedPost.uid).to.eql(otherPhoto.uid);
            expect(retrievedPost.type).to.eql(otherPhoto.type);
        });
    });

    describe("createRecords", function () {
        it("persists multiple posts", async function () {//
            const createdPosts = await PostModel.createRecords(stubPosts);
            expect(createdPosts).to.be.an("array");
            expect(createdPosts).to.have.length(stubPosts.length);
            return await Promise.all(stubPosts.map(async createdPost => {
                expect(createdPost.uid).to.be.ok;
                const postFromDb = await PostModel.dynamooseModel.get({
                    uid: createdPost.uid,
                    status: POST_STATUS.visible
                });
                expect(postFromDb.uid).to.eql(createdPost.uid);
            }));
        });

        // NOTE-RT: DynamoDB's `BatchWriteItem` API hard-caps a single request at 25 items and
        // rejects the *entire* request if that's exceeded - confirmed live against
        // `service-dev-cachePosts`, where a 30-item and a 50-item batch both failed to persist
        // anything at all. `createRecords` must chunk larger arrays across multiple requests.
        it("persists more posts than DynamoDB's 25-item BatchWriteItem limit in one call", async function () {
            const manyPosts = Array.from({length: 30}, (_ignored, index) => Post.fromJSON({
                raw: {},
                id: `woof-${index}`,
                source: "Woofdy",
                dateCreated: DateTime.utc().toISO(),
                datePublished: DateTime.utc().toISO(),
                title: `Woof woof woof ${index}`,
                body: ["ʕ•ᴥ•ʔ"],
                sourceUrl: `woof://woof.woof/woof-${index}`,
                creator: {
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "woof://woof.woof/woof/woof/woof"
                }
            }));

            const createdPosts = await PostModel.createRecords(manyPosts);
            expect(createdPosts).to.have.length(manyPosts.length);
            return await Promise.all(manyPosts.map(async createdPost => {
                const postFromDb = await PostModel.dynamooseModel.get({
                    uid: createdPost.uid,
                    status: POST_STATUS.visible
                });
                expect(postFromDb.uid).to.eql(createdPost.uid);
            }));
        });
    });

    describe("getRecords", function () {
        it("retrieves posts (type)", async function () {
            const moreThanOnePhoto = stubPosts.concat([
                Photo.fromJSON({
                    raw: {},
                    id: "grr",
                    source: "Grrdy",
                    dateCreated: DateTime.utc().toISO(),
                    datePublished: DateTime.utc().toISO(),
                    width: -1,
                    height: -2,
                    sizedPhotos: [
                        SizedPhoto.fromJSON({url: "grr://grr.grr/grr/grrto", width: 640, height: 480})
                    ],
                    title: "Grr grr grr",
                    body: [
                        "ʕ•ᴥ•ʔ",
                        "ʕ•ᴥ•ʔﾉ゛",
                        "ʕ◠ᴥ◠ʔ"
                    ],
                    sourceUrl: "grr://grr.grr/grr",
                    creator: {
                        id: -1,
                        username: "ʕ•ᴥ•ʔ",
                        name: "ʕ•ᴥ•ʔ",
                        url: "grr://grr.grr/grr/grr/grr"
                    }
                })
            ]);
            await PostModel.createRecords(moreThanOnePhoto);
            const retrievedPosts = await PostModel.getRecords({_query: {type: {eq: stubPhoto.type}}});
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(2);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost.type).to.eql(Photo.type);
            }));
        });

        it("retrieves posts (with a limit)", async function () {
            const moreThanOnePhoto = stubPosts.concat([
                Photo.fromJSON({
                    raw: {},
                    id: "grr",
                    source: "Grrdy",
                    dateCreated: DateTime.utc().toISO(),
                    datePublished: DateTime.utc().toISO(),
                    width: -1,
                    height: -2,
                    sizedPhotos: [
                        SizedPhoto.fromJSON({url: "grr://grr.grr/grr/grrto", width: 640, height: 480})
                    ],
                    title: "Grr grr grr",
                    body: [
                        "ʕ•ᴥ•ʔ",
                        "ʕ•ᴥ•ʔﾉ゛",
                        "ʕ◠ᴥ◠ʔ"
                    ],
                    sourceUrl: "grr://grr.grr/grr",
                    creator: {
                        id: -1,
                        username: "ʕ•ᴥ•ʔ",
                        name: "ʕ•ᴥ•ʔ",
                        url: "grr://grr.grr/grr/grr/grr"
                    }
                })
            ]);
            await PostModel.createRecords(moreThanOnePhoto);
            const retrievedPosts = await PostModel.getRecords({
                _query: {type: {eq: stubPhoto.type}},
                _options: {limit: 1}
            });
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(1);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost.type).to.eql(Photo.type);
            }));
        });

        it("retrieves posts (source)", async function () {
            await PostModel.createRecords(stubPosts);
            const retrievedPosts = await PostModel.getRecords({_filter: {source: {eq: stubPhoto.source}}});
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(1);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost.type).to.eql(Photo.type);
                expect(retrievedPost.uid).to.eql(stubPhoto.uid);
            }));
        });

        it("retrieves posts (uid)", async function () {
            await PostModel.createRecords(stubPosts);
            const retrievedPosts = await PostModel.getRecords({_query: {uid: {eq: stubPhoto.uid}}});
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(1);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost.type).to.eql(Photo.type);
                expect(retrievedPost.uid).to.eql(stubPhoto.uid);
            }));
        });

        it("retrieves posts (tags)", async function () {
            const moreThanOnePhoto = stubPosts.concat([
                Photo.fromJSON({
                    raw: {},
                    id: "grr",
                    source: "Grrdy",
                    dateCreated: DateTime.utc().toISO(),
                    datePublished: DateTime.utc().toISO(),
                    width: -1,
                    height: -2,
                    sizedPhotos: [
                        SizedPhoto.fromJSON({url: "grr://grr.grr/grr/grrto", width: 640, height: 480})
                    ],
                    title: "Grr grr grr",
                    body: [
                        "ʕ•ᴥ•ʔ",
                        "ʕ•ᴥ•ʔﾉ゛",
                        "ʕ◠ᴥ◠ʔ"
                    ],
                    sourceUrl: "grr://grr.grr/grr",
                    creator: {
                        id: -1,
                        username: "ʕ•ᴥ•ʔ",
                        name: "ʕ•ᴥ•ʔ",
                        url: "grr://grr.grr/grr/grr/grr"
                    },
                    tags: [
                        "woof"
                    ]
                })
            ]);
            await PostModel.createRecords(moreThanOnePhoto);
            const retrievedPosts = await PostModel.getRecords({_filter: {tags: {CONTAINS: ["woof"]}}});
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(2);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost.tags).to.contain("woof");
            }));
        });

        it("retrieves posts (scan with a limit < total)", async function () {
            const otherPhoto = Photo.fromJSON({
                    raw: {},
                    id: "grr",
                    source: "Grrdy",
                    dateCreated: DateTime.utc().toISO(),
                    datePublished: DateTime.utc().toISO(),
                    width: -1,
                    height: -2,
                    sizedPhotos: [
                        SizedPhoto.fromJSON({url: "grr://grr.grr/grr/grrto", width: 640, height: 480})
                    ],
                    title: "Grr grr grr",
                    body: [
                        "ʕ•ᴥ•ʔ",
                        "ʕ•ᴥ•ʔﾉ゛",
                        "ʕ◠ᴥ◠ʔ"
                    ],
                    sourceUrl: "grr://grr.grr/grr",
                    creator: {
                        id: -1,
                        username: "ʕ•ᴥ•ʔ",
                        name: "ʕ•ᴥ•ʔ",
                        url: "grr://grr.grr/grr/grr/grr"
                    },
                    tags: [
                        "woof"
                    ]
            });
            const moreThanOnePhoto = stubPosts.concat(otherPhoto);
            await PostModel.createRecords(moreThanOnePhoto);
            const retrievedPosts = await PostModel.getRecords({
                _filter: {tags: {CONTAINS: ["woof"]}},
                _options: {limit: 1}
            });
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(1);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost.type).to.eql(otherPhoto.type);
            }));
        });

        it("retrieves posts (scan with a limit > total)", async function () {
            const otherPhoto = Photo.fromJSON({
                    raw: {},
                    id: "grr",
                    source: "Grrdy",
                    dateCreated: DateTime.utc().toISO(),
                    datePublished: DateTime.utc().toISO(),
                    width: -1,
                    height: -2,
                    sizedPhotos: [
                        SizedPhoto.fromJSON({url: "grr://grr.grr/grr/grrto", width: 640, height: 480})
                    ],
                    title: "Grr grr grr",
                    body: [
                        "ʕ•ᴥ•ʔ",
                        "ʕ•ᴥ•ʔﾉ゛",
                        "ʕ◠ᴥ◠ʔ"
                    ],
                    sourceUrl: "grr://grr.grr/grr",
                    creator: {
                        id: -1,
                        username: "ʕ•ᴥ•ʔ",
                        name: "ʕ•ᴥ•ʔ",
                        url: "grr://grr.grr/grr/grr/grr"
                    },
                    tags: [
                        "woof"
                    ]
            });
            const moreThanOnePhoto = stubPosts.concat(otherPhoto);
            await PostModel.createRecords(moreThanOnePhoto);
            const retrievedPosts = await PostModel.getRecords({
                _filter: {tags: {CONTAINS: ["woof"]}},
                _options: {limit: 10}
            });
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(2);
        });

        it("retrieves posts (scan recursively)", async function () {
            const otherPhoto = Photo.fromJSON({
                    raw: {},
                    id: "grr",
                    source: "Grrdy",
                    dateCreated: DateTime.utc().toISO(),
                    datePublished: DateTime.utc().toISO(),
                    width: -1,
                    height: -2,
                    sizedPhotos: [
                        SizedPhoto.fromJSON({url: "grr://grr.grr/grr/grrto", width: 640, height: 480})
                    ],
                    title: "Grr grr grr",
                    body: [
                        "ʕ•ᴥ•ʔ",
                        "ʕ•ᴥ•ʔﾉ゛",
                        "ʕ◠ᴥ◠ʔ"
                    ],
                    sourceUrl: "grr://grr.grr/grr",
                    creator: {
                        id: -1,
                        username: "ʕ•ᴥ•ʔ",
                        name: "ʕ•ᴥ•ʔ",
                        url: "grr://grr.grr/grr/grr/grr"
                    },
                    tags: [
                        "woof"
                    ]
            });
            const moreThanOnePhoto = stubPosts
                .concat(otherPhoto.set("tags", null).set("id", "foo"))
                .concat(otherPhoto.set("tags", null).set("id", "bar"))
                .concat(otherPhoto.set("tags", null).set("id", "baz"))
                .concat(otherPhoto);
            await PostModel.createRecords(moreThanOnePhoto);
            const retrievedPosts = await PostModel.getRecords({
                _filter: {tags: {CONTAINS: ["woof"]}},
                _options: {limit: 2}
            });
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(2);
        });

        it("retrieves posts (scan entire table)", async function () {
            const otherPhoto = Photo.fromJSON({
                raw: {},
                id: "grr",
                source: "Grrdy",
                dateCreated: DateTime.utc().toISO(),
                datePublished: DateTime.utc().toISO(),
                width: -1,
                height: -2,
                sizedPhotos: [
                    SizedPhoto.fromJSON({url: "grr://grr.grr/grr/grrto", width: 640, height: 480})
                ],
                title: "Grr grr grr",
                body: [
                    "ʕ•ᴥ•ʔ",
                    "ʕ•ᴥ•ʔﾉ゛",
                    "ʕ◠ᴥ◠ʔ"
                ],
                sourceUrl: "grr://grr.grr/grr",
                creator: {
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    url: "grr://grr.grr/grr/grr/grr"
                },
                tags: [
                    "woof"
                ]
            });
            const moreThanOnePhoto = stubPosts.concat(otherPhoto);
            await PostModel.createRecords(moreThanOnePhoto);
            const retrievedPosts = await PostModel.getRecords({
                _filter: {tags: {CONTAINS: ["rawr"]}},
                _options: {limit: 10}
            });
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(0);
        });
    });

    describe("getRecordCount", function () {
        it("retrieves posts (type)", async function () {
            const moreThanOnePhoto = stubPosts.concat([
                Photo.fromJSON({
                    raw: {},
                    id: "grr",
                    source: "Grrdy",
                    dateCreated: DateTime.utc().toISO(),
                    datePublished: DateTime.utc().toISO(),
                    width: -1,
                    height: -2,
                    sizedPhotos: [
                        SizedPhoto.fromJSON({url: "grr://grr.grr/grr/grrto", width: 640, height: 480})
                    ],
                    title: "Grr grr grr",
                    body: [
                        "ʕ•ᴥ•ʔ",
                        "ʕ•ᴥ•ʔﾉ゛",
                        "ʕ◠ᴥ◠ʔ"
                    ],
                    sourceUrl: "grr://grr.grr/grr",
                    creator: {
                        id: -1,
                        username: "ʕ•ᴥ•ʔ",
                        name: "ʕ•ᴥ•ʔ",
                        url: "grr://grr.grr/grr/grr/grr"
                    }
                })
            ]);
            await PostModel.createRecords(moreThanOnePhoto);
            const retrievedPosts = await PostModel.getRecordCount({_query: {type: {eq: stubPhoto.type}}});
            expect(retrievedPosts).to.eql(2);
        });

        it("retrieves posts (ignores limit)", async function () {
            const moreThanOnePhoto = stubPosts.concat([
                Photo.fromJSON({
                    raw: {},
                    id: "grr",
                    source: "Grrdy",
                    dateCreated: DateTime.utc().toISO(),
                    datePublished: DateTime.utc().toISO(),
                    width: -1,
                    height: -2,
                    sizedPhotos: [
                        SizedPhoto.fromJSON({url: "grr://grr.grr/grr/grrto", width: 640, height: 480})
                    ],
                    title: "Grr grr grr",
                    body: [
                        "ʕ•ᴥ•ʔ",
                        "ʕ•ᴥ•ʔﾉ゛",
                        "ʕ◠ᴥ◠ʔ"
                    ],
                    sourceUrl: "grr://grr.grr/grr",
                    creator: {
                        id: -1,
                        username: "ʕ•ᴥ•ʔ",
                        name: "ʕ•ᴥ•ʔ",
                        url: "grr://grr.grr/grr/grr/grr"
                    }
                })
            ]);
            await PostModel.createRecords(moreThanOnePhoto);
            const retrievedPosts = await PostModel.getRecordCount({
                _query: {type: {eq: stubPhoto.type}},
                _options: {limit: 1}
            });
            expect(retrievedPosts).to.eql(2);
        });

        it("retrieves posts (source)", async function () {
            await PostModel.createRecords(stubPosts);
            const retrievedPosts = await PostModel.getRecordCount({_filter: {source: {eq: stubPhoto.source}}});
            expect(retrievedPosts).to.eql(1);
        });

        it("retrieves posts (uid)", async function () {
            await PostModel.createRecords(stubPosts);
            const retrievedPosts = await PostModel.getRecordCount({_query: {uid: {eq: stubPhoto.uid}}});
            expect(retrievedPosts).to.eql(1);
        });

        it("retrieves posts (tags)", async function () {
            const moreThanOnePhoto = stubPosts.concat([
                Photo.fromJSON({
                    raw: {},
                    id: "grr",
                    source: "Grrdy",
                    dateCreated: DateTime.utc().toISO(),
                    datePublished: DateTime.utc().toISO(),
                    width: -1,
                    height: -2,
                    sizedPhotos: [
                        SizedPhoto.fromJSON({url: "grr://grr.grr/grr/grrto", width: 640, height: 480})
                    ],
                    title: "Grr grr grr",
                    body: [
                        "ʕ•ᴥ•ʔ",
                        "ʕ•ᴥ•ʔﾉ゛",
                        "ʕ◠ᴥ◠ʔ"
                    ],
                    sourceUrl: "grr://grr.grr/grr",
                    creator: {
                        id: -1,
                        username: "ʕ•ᴥ•ʔ",
                        name: "ʕ•ᴥ•ʔ",
                        url: "grr://grr.grr/grr/grr/grr"
                    },
                    tags: [
                        "woof"
                    ]
                })
            ]);
            await PostModel.createRecords(moreThanOnePhoto);
            const retrievedPosts = await PostModel.getRecordCount({_filter: {tags: {CONTAINS: ["woof"]}}});
            expect(retrievedPosts).to.eql(2);
        });
    });
});
