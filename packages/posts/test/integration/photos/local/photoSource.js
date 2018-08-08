import {Photo} from "@randy.tarampi/js";
import {expect} from "chai";
import fs from "fs";
import _ from "lodash";
import path from "path";
import PostModel from "../../../../db/models/post";
import PhotoSource from "../../../../photos/local/photoSource";

const LOCAL_DIRECTORY = process.env.LOCAL_DIRECTORY;

describe("LocalSource", function () {
    this.timeout(60000);

    beforeEach(async function () {
        process.env.LOCAL_DIRECTORY = path.join(__dirname, "../../../resources/photos/local");

        return await PostModel.query({type: Photo.name}).all().exec().then(
            photoModelInstances => PostModel.batchDelete(photoModelInstances.map(photoModelInstance => {
                return {uid: photoModelInstance.uid};
            }))
        );
    });

    afterEach(async function () {
        process.env.LOCAL_DIRECTORY = LOCAL_DIRECTORY;
    });

    describe("constructor", function () {
        it("should build a Local `PhotoSource` instance", function () {
            const photoSource = new PhotoSource();

            expect(photoSource.client).to.be.undefined;
            expect(photoSource.type).to.eql("Local");
            expect(photoSource).to.be.instanceOf(PhotoSource);
        });
    });

    describe("#getPosts", function () {
        it("should load `Photo`s from the most recent images in the given `process.env.LOCAL_DIRECTORY`", function () {

            const photoSource = new PhotoSource();

            return photoSource.getPosts()
                .then((photos) => {
                    expect(photos).to.be.ok;
                    photos.map((photo) => {
                        expect(photo).to.be.instanceOf(Photo);
                    });
                    expect(photos.length).to.be.eql(
                        _.filter(fs.readdirSync(process.env.LOCAL_DIRECTORY), PhotoSource.fileIsSupported).length
                    );
                    expect(photos).to.eql(
                        _.sortBy(photos,
                            (photo) => {
                                return -1 * photo.dateCreated;
                            })
                    );
                });
        });
    });

    describe("#getPost", function () {
        it("should load a `Photo` from a given `Photo`'s `id`", function () {
            const photoSource = new PhotoSource();

            return photoSource.getPosts()
                .then((photos) => {
                    return Promise.all(
                        photos.map((photo) => {
                            return photoSource.getPost(photo.id)
                                .then((photoFromGetPost) => {
                                    expect(photo).to.be.ok;
                                    expect(photo).to.be.instanceof(Photo);
                                    expect(photo.id).to.eql(photoFromGetPost.id);
                                    expect(photo.sizedPhotos.length).to.eql(photoFromGetPost.sizedPhotos.length);
                                });
                        })
                    );
                });
        });
    });

    describe("#jsonToPost", function () {
        it("should only ever have one `SizedPhoto`", function () {
            const lstat = {
                dev: 16777220,
                mode: 33279,
                nlink: 1,
                uid: 501,
                gid: 20,
                rdev: 0,
                blksize: 4096,
                ino: 16256439,
                size: 6718861,
                blocks: 13128,
                atime: "2017-01-23T10:58:19.000Z",
                mtime: "2016-12-12T08:37:44.000Z",
                ctime: "2017-01-22T18:16:16.000Z",
                birthtime: "2016-12-12T08:37:44.000Z"
            };
            const fileName = "woof.meow";
            const filePath = path.join(__dirname, "woof.meow");
            const width = 4;
            const height = 3;

            const photoSource = new PhotoSource();
            const jsonToPostResult = photoSource.jsonToPost(filePath, fileName, lstat, width, height);

            expect(jsonToPostResult).to.be.instanceof(Photo);
            expect(jsonToPostResult.sizedPhotos.length).to.eql(1);
            jsonToPostResult.sizedPhotos.map((sizedPhoto) => {
                expect(sizedPhoto.url).to.eql(jsonToPostResult.sourceUrl);
                expect(sizedPhoto.width).to.eql(jsonToPostResult.width);
                expect(sizedPhoto.height).to.eql(jsonToPostResult.height);
            });
        });
    });

    describe("#isEnabled", function () {
        it("should be enabled if `process.env.LOCAL_DIRECTORY` is truthy", function () {
            const photoSource = new PhotoSource();

            expect(photoSource.isEnabled).to.eql(true);
        });

        it("should not be enabled if `process.env.LOCAL_DIRECTORY` is falsy", function () {
            delete process.env.LOCAL_DIRECTORY;

            const photoSource = new PhotoSource();

            expect(photoSource.isEnabled).to.eql(false);
        });
    });
});
