import {Photo, Post, SizedPhoto} from "@randy.tarampi/js";
import {expect} from "chai";
import PostModel, {createPost, createPosts, getPost, getPosts} from "../../../../db/models/post";

describe("Post", function () {
    this.timeout(60000);

    let stubPost;
    let stubPhoto;
    let stubPosts;

    beforeEach(async function () {
        stubPost = Post.fromJSON({
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
        });
        stubPhoto = Photo.fromJSON({
            id: "meow",
            source: "Meowdy",
            dateCreated: Date.now(),
            datePublished: Date.now(),
            width: -1,
            height: -2,
            sizedPhotos: [
                new SizedPhoto("meow://meow.meow/meow/meowto", 640, 480)
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
                sourceUrl: "meow://meow.meow/meow/meow/meow"
            }
        });
        stubPosts = [
            stubPost,
            stubPhoto
        ];

        return await PostModel.batchDelete(stubPosts.map(post => {
            return {uid: post.uid};
        }));
    });

    describe("createPost", function () {
        it("persists a post from a Post", async function () {
            const createdPost = await createPost(stubPost);
            expect(createdPost).to.be.ok;
            expect(createdPost.id).to.eql(stubPost.id);
            expect(createdPost.uid).to.eql(stubPost.uid);
            expect(createdPost).to.be.instanceof(Post);
            const postFromDb = await PostModel.get(createdPost.uid);
            expect(postFromDb).to.be.ok;
        });

        it("persists a post from a Photo", async function () {
            const createdPhoto = await createPost(stubPhoto);
            expect(createdPhoto).to.be.ok;
            expect(createdPhoto.id).to.eql(stubPhoto.id);
            expect(createdPhoto.uid).to.eql(stubPhoto.uid);
            expect(createdPhoto.sizedPhotos).to.be.ok;
            expect(createdPhoto.sizedPhotos).to.have.length(stubPhoto.sizedPhotos.length);
            expect(createdPhoto).to.be.instanceof(Photo);
            const photoFromDb = await PostModel.get(createdPhoto.uid);
            expect(photoFromDb).to.be.ok;
        });
    });

    describe("getPost", function () {
        it("retrieves a Post", async function () {
            const createdPost = await createPost(stubPost);
            expect(createdPost.uid).to.eql(stubPost.uid);
            const retrievedPost = await getPost(stubPost.uid);
            expect(retrievedPost).to.be.ok;
            expect(retrievedPost.uid).to.eql(stubPost.uid);
            expect(retrievedPost).to.be.instanceof(Post);
        });

        it("retrieves a Photo", async function () {
            const createdPhoto = await createPost(stubPhoto);
            expect(createdPhoto.uid).to.eql(stubPhoto.uid);
            const retrievedPhoto = await getPost(stubPhoto.uid);
            expect(retrievedPhoto).to.be.ok;
            expect(retrievedPhoto.uid).to.eql(stubPhoto.uid);
            expect(retrievedPhoto).to.be.instanceof(Photo);
        });
    });

    describe("createPosts", function () {
        it("persists multiple posts", async function () {//
            const createdPosts = await createPosts(stubPosts);
            expect(createdPosts).to.be.ok;
            expect(createdPosts).to.be.an("array");
            return await Promise.all(stubPosts.map(async createdPost => {
                expect(createdPost).to.be.ok;
                expect(createdPost).to.be.instanceOf(Post);
                expect(createdPost.uid).to.be.ok;
                const postFromDb = await PostModel.get(createdPost.uid);
                expect(postFromDb).to.be.ok;
                expect(postFromDb.uid).to.eql(createdPost.uid);
            }));
        });
    });

    describe("getPosts", function () {
        it("retrieves posts", async function () {
            const createdPosts = await createPosts(stubPosts);
            const retrievedPosts = await getPosts(createdPosts.map(createdPost => {
                return {uid: createdPost.uid};
            }));
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.be.an("array");
            return await Promise.all(retrievedPosts.map(retrievedPost => {
                expect(retrievedPost).to.be.ok;
                expect(retrievedPost).to.be.instanceOf(Post);
                expect(retrievedPost.uid).to.be.ok;
            }));
        });
    });
});
