import {expect} from "chai";
import {List} from "immutable";
import {DateTime} from "luxon";
import Photo from "../../lib/photo";
import SizedPhoto from "../../lib/sizedPhoto";

describe("Photo", () => {
    describe("constructor", () => {
        it("should build a `Photo` object", () => {
            const photoJS = {
                id: "woof",
                source: "Woofdy",
                dateCreated: DateTime.utc(),
                datePublished: DateTime.utc(),
                width: -1,
                height: -2,
                sizedPhotos: List([
                    SizedPhoto.fromJS({url: "woof://woof.woof/woof/woofto", width: 640, height: 480})
                ]),
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
            const photo = new Photo(photoJS);

            expect(photo.type).to.eql(Photo.name);
            expect(photo.dateCreated).to.be.an.instanceOf(DateTime);
            expect(photo.datePublished).to.be.an.instanceOf(DateTime);
            expect(photo.sizedPhotos).to.be.an.instanceOf(List);
        });
    });

    describe(".fromJSON", () => {
        it("should instantiate a Photo object from some plain JS Object", () => {
            const photoJSON = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: null,
                datePublished: DateTime.utc().toISO(),
                width: -1,
                height: -2,
                sizedPhotos: [
                    {url: "woof://woof.woof/woof/woofto", width: 640, height: 480}
                ],
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

            const photoFromJson = Photo.fromJSON(photoJSON);

            expect(photoFromJson).to.be.ok;
            expect(photoFromJson.id).to.eql(photoJSON.id);
            expect(photoFromJson.datePublished).to.be.instanceof(DateTime);
            expect(photoFromJson.sizedPhotos).to.be.instanceof(List);
            expect(photoFromJson.sizedPhotos.size).to.eql(photoJSON.sizedPhotos.length);
            photoFromJson.sizedPhotos.forEach(sizedPhoto => {
                expect(sizedPhoto).to.be.ok;
                expect(sizedPhoto).to.be.instanceof(SizedPhoto);
            });
        });
    });

    describe("#getSizedPhoto", () => {
        it("should return 0 objects is `.sizedPhotos` is empty", () => {
            const photoJSON = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: null,
                datePublished: null,
                width: -1,
                height: -2,
                sizedPhotos: [],
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
            const photo = Photo.fromJSON(photoJSON);

            expect(photo.getSizedPhoto()).to.eql(undefined);
            expect(photo.getSizedPhoto(200)).to.eql(undefined);
        });

        it("should return a single member of `.sizedPhotos`, the smallest in size (width), for a given argument", () => {
            const smallSizedPhoto = SizedPhoto.fromJS({url: "woof://woof.woof/woof/woofto", width: 100, height: 133});
            const mediumSizedPhoto = SizedPhoto.fromJS({
                url: "woof://woof.woof/woof/woofto",
                width: 1000,
                height: 1333
            });
            const largeSizedPhoto = SizedPhoto.fromJS({
                url: "woof://woof.woof/woof/woofto",
                width: 10000,
                height: 13333
            });
            const sizedPhotos = [
                smallSizedPhoto,
                mediumSizedPhoto,
                largeSizedPhoto
            ];

            const photoJSON = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: null,
                datePublished: null,
                width: -1,
                height: -2,
                sizedPhotos: sizedPhotos.map(sizedPhoto => sizedPhoto.toJSON()),
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
            const photo = Photo.fromJSON(photoJSON);

            sizedPhotos.forEach((sizedPhoto) => {
                const selectedPhotoforWidth = photo.getSizedPhoto(sizedPhoto.width);
                expect(selectedPhotoforWidth.width).to.eql(sizedPhoto.width);
            });
        });
    });
});
