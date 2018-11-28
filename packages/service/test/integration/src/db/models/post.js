import {Photo, Post, SizedPhoto} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import PostModel, {createPost, createPosts, getPost, getPostCount, getPosts} from "../../../../../src/db/models/post";

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

        return await PostModel.batchDelete(stubPosts.map(post => {
            return {id: post.id, source: post.source};
        }));
    });

    describe("createPost", function () {
        it("persists a post from a Post", async function () {
            const createdPost = await createPost(stubPost);
            expect(createdPost).to.be.ok;
            expect(createdPost.uid).to.eql(stubPost.uid);
            const postFromDb = await PostModel.get({id: createdPost.id, source: createdPost.source});
            expect(postFromDb).to.be.ok;
        });

        it("persists a post from a Photo", async function () {
            const createdPhoto = await createPost(stubPhoto);
            expect(createdPhoto).to.be.ok;
            expect(createdPhoto.uid).to.eql(stubPhoto.uid);
            const photoFromDb = await PostModel.get({id: createdPhoto.id, source: createdPhoto.source});
            expect(photoFromDb).to.be.ok;
        });

        it("doesn't persist empty string tags", async function () {
            const createdPost = await createPost(stubPost);
            expect(createdPost).to.be.ok;
            expect(createdPost.uid).to.eql(stubPost.uid);
            const postFromDb = await PostModel.get({id: createdPost.id, source: createdPost.source});
            expect(postFromDb).to.be.ok;
            expect(postFromDb.tags).to.have.all.members(stubPost.tags.filter(tag => !!tag).map(tag => tag.toLowerCase()).toArray());
            expect(postFromDb.tags).to.not.have.members([""]);
        });
    });

    describe("getPost", function () {
        it("retrieves a Post (uid)", async function () {
            await createPosts(stubPosts);
            const retrievedPost = await getPost({_query: {uid: {eq: stubPost.uid}}});
            expect(retrievedPost).to.be.ok;
            expect(retrievedPost.uid).to.eql(stubPost.uid);
            expect(retrievedPost.type).to.eql(Post.type);
        });

        it("retrieves a Post (type)", async function () {
            await createPosts(stubPosts);
            const retrievedPost = await getPost({_query: {type: {eq: stubPost.type}}});
            expect(retrievedPost).to.be.ok;
            expect(retrievedPost.uid).to.eql(stubPost.uid);
            expect(retrievedPost.type).to.eql(Post.type);
        });

        it("retrieves a Photo (source)", async function () {
            await createPosts(stubPosts);
            const retrievedPhoto = await getPost({_query: {source: {eq: stubPhoto.source}}});
            expect(retrievedPhoto).to.be.ok;
            expect(retrievedPhoto.uid).to.eql(stubPhoto.uid);
            expect(retrievedPhoto.type).to.eql(Photo.type);
        });

        it("retrieves a Post (tags)", async function () {
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
                        "Woof"
                    ]
                })
            ]);
            await createPosts(moreThanOnePhoto);
            const retrievedPost = await getPost({_filter: {tags: {CONTAINS: ["woof"]}}});
            expect(retrievedPost).to.be.ok;
            expect(retrievedPost.uid).to.eql(stubPost.uid);
            expect(retrievedPost.type).to.eql(Post.type);
        });
    });

    describe("createPosts", function () {
        it("persists multiple posts", async function () {//
            const createdPosts = await createPosts(stubPosts);
            expect(createdPosts).to.be.ok;
            expect(createdPosts).to.be.an("array");
            expect(createdPosts).to.have.length(stubPosts.length);
            return await Promise.all(stubPosts.map(async createdPost => {
                expect(createdPost).to.be.ok;
                expect(createdPost.uid).to.be.ok;
                const postFromDb = await PostModel.get({id: createdPost.id, source: createdPost.source});
                expect(postFromDb).to.be.ok;
                expect(postFromDb.uid).to.eql(createdPost.uid);
            }));
        });
    });

    describe("getPosts", function () {
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
            await createPosts(moreThanOnePhoto);
            const retrievedPosts = await getPosts({_query: {type: {eq: stubPhoto.type}}});
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(2);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost).to.be.ok;
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
            await createPosts(moreThanOnePhoto);
            const retrievedPosts = await getPosts({_query: {type: {eq: stubPhoto.type}}, _options: {limit: 1}});
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(1);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost).to.be.ok;
                expect(retrievedPost.type).to.eql(Photo.type);
            }));
        });

        it("retrieves posts (source)", async function () {
            await createPosts(stubPosts);
            const retrievedPosts = await getPosts({_query: {source: {eq: stubPhoto.source}}});
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(1);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost).to.be.ok;
                expect(retrievedPost.type).to.eql(Photo.type);
                expect(retrievedPost.uid).to.eql(stubPhoto.uid);
            }));
        });

        it("retrieves posts (uid)", async function () {
            await createPosts(stubPosts);
            const retrievedPosts = await getPosts({_query: {uid: {eq: stubPhoto.uid}}});
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(1);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost).to.be.ok;
                expect(retrievedPost.type).to.eql(Photo.type);
                expect(retrievedPost.uid).to.eql(stubPhoto.uid);
            }));
        });

        it("retrieves posts (type & source index)", async function () {
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
            await createPosts(moreThanOnePhoto);
            const retrievedPosts = await getPosts({
                _query: {
                    hash: {id: {eq: stubPhoto.id}},
                    range: {source: {eq: stubPhoto.source}}
                }
            });
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(1);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost).to.be.ok;
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
            await createPosts(moreThanOnePhoto);
            const retrievedPosts = await getPosts({_filter: {tags: {CONTAINS: ["woof"]}}});
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(2);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost).to.be.ok;
                expect(retrievedPost.tags).to.contain("woof");
            }));
        });

        it("retrieves posts (scan with a limit)", async function () {
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
            await createPosts(moreThanOnePhoto);
            const retrievedPosts = await getPosts({_filter: {tags: {CONTAINS: ["woof"]}}, _options: {limit: 1}});
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.be.an("array");
            expect(retrievedPosts).to.have.length(1);
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost).to.be.ok;
                expect(retrievedPost.type).to.eql(Post.type);
            }));
        });
    });

    describe("getPostCount", function () {
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
            await createPosts(moreThanOnePhoto);
            const retrievedPosts = await getPostCount({_query: {type: {eq: stubPhoto.type}}});
            expect(retrievedPosts).to.be.ok;
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
            await createPosts(moreThanOnePhoto);
            const retrievedPosts = await getPostCount({_query: {type: {eq: stubPhoto.type}}, _options: {limit: 1}});
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.eql(2);
        });

        it("retrieves posts (source)", async function () {
            await createPosts(stubPosts);
            const retrievedPosts = await getPostCount({_query: {source: {eq: stubPhoto.source}}});
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.eql(1);
        });

        it("retrieves posts (uid)", async function () {
            await createPosts(stubPosts);
            const retrievedPosts = await getPostCount({_query: {uid: {eq: stubPhoto.uid}}});
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.eql(1);
        });

        it("retrieves posts (type & source index)", async function () {
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
            await createPosts(moreThanOnePhoto);
            const retrievedPosts = await getPostCount({
                _query: {
                    hash: {id: {eq: stubPhoto.id}},
                    range: {source: {eq: stubPhoto.source}}
                }
            });
            expect(retrievedPosts).to.be.ok;
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
            await createPosts(moreThanOnePhoto);
            const retrievedPosts = await getPostCount({_filter: {tags: {CONTAINS: ["woof"]}}});
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.eql(2);
        });
    });
});
