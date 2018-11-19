import {expect} from "chai";
import {List} from "immutable";
import {DateTime} from "luxon";
import Photo from "../../../../src/lib/photo";
import SizedPhoto from "../../../../src/lib/sizedPhoto";
import {augmentUrlWithTrackingParams} from "../../../../src/lib/util";

describe("Photo", () => {
    describe("constructor", () => {
        it("should build a Photo object", () => {
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
                    url: "woof://woof.woof/woof/woof/woof"
                }
            };
            const photo = new Photo(photoJS);

            expect(photo.type).to.eql(Photo.name);
            expect(photo.dateCreated).to.be.an.instanceOf(DateTime);
            expect(photo.datePublished).to.be.an.instanceOf(DateTime);
            expect(photo.sizedPhotos).to.be.an.instanceOf(List);
        });

        it("returns an empty Photo", function () {
            const photo = new Photo();

            expect(photo).to.be.ok;
            expect(photo).to.be.instanceOf(Photo);
        });
    });

    describe(".fromJSON", () => {
        it("should instantiate a Photo object from some plain JS Object", () => {
            const photoJson = {
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
                    url: "woof://woof.woof/woof/woof/woof"
                }
            };

            const photoFromJson = Photo.fromJSON(photoJson);

            expect(photoFromJson).to.be.ok;
            expect(photoFromJson.id).to.eql(photoJson.id);
            expect(photoFromJson.datePublished).to.be.instanceof(DateTime);
            expect(photoFromJson.sizedPhotos).to.be.instanceof(List);
            expect(photoFromJson.sizedPhotos.size).to.eql(photoJson.sizedPhotos.length);
            photoFromJson.sizedPhotos.forEach(sizedPhoto => {
                expect(sizedPhoto).to.be.ok;
                expect(sizedPhoto).to.be.instanceof(SizedPhoto);
            });
        });
    });

    describe(".fromJS", () => {
        it("should instantiate a Photo object from some plain JS Object", () => {
            const photoJson = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: null,
                datePublished: DateTime.utc(),
                width: -1,
                height: -2,
                sizedPhotos: [
                    {url: "woof://woof.woof/woof/woofto", width: 640, height: 480},
                    {url: "woof://woof.woof/woof/woofto?w=800", width: 800}
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
                    url: "woof://woof.woof/woof/woof/woof"
                }
            };

            const photofromJS = Photo.fromJS(photoJson);

            expect(photofromJS).to.be.ok;
            expect(photofromJS.id).to.eql(photoJson.id);
            expect(photofromJS.datePublished).to.be.instanceof(DateTime);
            expect(photofromJS.sizedPhotos).to.be.instanceof(List);
            expect(photofromJS.sizedPhotos.size).to.eql(photoJson.sizedPhotos.length);
            photofromJS.sizedPhotos.forEach(sizedPhoto => {
                expect(sizedPhoto).to.be.ok;
                expect(sizedPhoto).to.be.instanceof(SizedPhoto);
            });
        });
    });

    describe("#toSchema", function () {
        it("returns expected Schema.org JSON", function () {
            const photoJson = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: DateTime.utc(),
                datePublished: DateTime.utc(),
                width: -1,
                height: -2,
                sizedPhotos: [
                    {url: "woof://woof.woof/woof/woofto", width: 640, height: 480},
                    {url: "woof://woof.woof/woof/woofto?w=800", width: 800}
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
                    url: "woof://woof.woof/woof/woof/woof"
                }
            };

            const photofromJS = Photo.fromJS(photoJson);

            const schemaJson = photofromJS.toSchema();
            const {body, sourceUrl, type, sizedPhotos, ...js} = photofromJS.toJS(); // eslint-disable-line no-unused-vars
            const photoSchemaJson = {
                ...js,
                creator: photofromJS.creator.toSchema(),
                author: photofromJS.creator.toSchema(),
                publisher: photofromJS.creator.toSchema(),
                dateCreated: photofromJS.dateCreated.toISO(),
                dateModified: photofromJS.datePublished.toISO(),
                datePublished: photofromJS.datePublished.toISO(),
                accessMode: "visual",
                articleBody: photofromJS.body,
                articleSection: photofromJS.type,
                headline: photofromJS.title,
                name: photofromJS.title,
                text: photofromJS.body,
                mainEntityOfPage: photofromJS.sourceUrl,
                image: photofromJS.largestImage.url
            };

            expect(schemaJson).to.eql({
                ...photoSchemaJson,
                sharedContent: {
                    ...photoSchemaJson,
                    uploadDate: photoSchemaJson.datePublished,
                    height: `${photofromJS.largestImage.height}px`,
                    width: `${photofromJS.largestImage.width}px`,
                    caption: photoSchemaJson.articleBody,
                    thumbnail: photofromJS.smallestImage.url,
                    contentUrl: photoSchemaJson.image
                }
            });
        });

        it("returns some empty Schema.org JSON", function () {
            const photofromJS = Photo.fromJS();

            const schemaJson = photofromJS.toSchema();
            const {body, sourceUrl, type, sizedPhotos, ...js} = photofromJS.toJS(); // eslint-disable-line no-unused-vars

            expect(schemaJson).to.eql({
                ...js,
                accessMode: "visual",
                articleSection: photofromJS.type,
                articleBody: null,
                headline: null,
                name: null,
                author: null,
                publisher: null,
                dateModified: null,
                mainEntityOfPage: null,
                sharedContent: null,
                text: null,
                image: null
            });
        });
    });

    describe("#toRss", function () {
        it("returns expected `rss` item", function () {
            const photoJson = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: DateTime.utc(),
                datePublished: DateTime.utc(),
                width: -1,
                height: -2,
                sizedPhotos: [
                    {url: "woof://woof.woof/woof/woofto", width: 640, height: 480},
                    {url: "woof://woof.woof/woof/woofto?w=800", width: 800}
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
                    url: "woof://woof.woof/woof/woof/woof"
                }
            };

            const photofromJS = Photo.fromJS(photoJson);

            const rssJson = photofromJS.toRss();

            expect(rssJson).to.eql({
                title: photofromJS.title,
                description: photofromJS.body,
                url: augmentUrlWithTrackingParams(photofromJS.sourceUrl),
                guid: photofromJS.uid,
                date: photofromJS.date.toJSDate(),
                author: `${photofromJS.creator.url} (${photofromJS.creator.name})`,
                enclosure: {
                    url: photofromJS.largestImage.url
                },
                lat: null,
                long: null
            });
        });

        it("returns some empty `rss` item", function () {
            const photofromJS = Photo.fromJS();

            const rssJson = photofromJS.toRss();

            expect(rssJson).to.eql({
                title: null,
                description: null,
                url: null,
                guid: photofromJS.uid,
                date: null,
                author: null,
                enclosure: null,
                lat: null,
                long: null
            });
        });
    });

    describe("#getSizedPhotoForDisplay", () => {
        it("should return 0 objects if `.sizedPhotos` is empty", () => {
            const photoJson = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: null,
                datePublished: null,
                width: -1,
                height: -2,
                sizedPhotos: null,
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
            const photo = Photo.fromJSON(photoJson);

            expect(photo.getSizedPhotoForDisplay()).to.eql(undefined);
            expect(photo.getSizedPhotoForDisplay(200)).to.eql(undefined);
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

            const photoJson = {
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
                    url: "woof://woof.woof/woof/woof/woof"
                }
            };
            const photo = Photo.fromJSON(photoJson);

            sizedPhotos.forEach((sizedPhoto) => {
                const selectedPhotoforWidth = photo.getSizedPhotoForDisplay(sizedPhoto.width);
                expect(selectedPhotoforWidth.width).to.eql(sizedPhoto.width);
            });
        });
    });

    describe("#getSizedPhotoForLoading", () => {
        it("should return a single member of `.sizedPhotos`, the smallest in size", () => {
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

            const photoJson = {
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
                    url: "woof://woof.woof/woof/woof/woof"
                }
            };
            const photo = Photo.fromJSON(photoJson);
            const selectedPhotoforWidth = photo.getSizedPhotoForLoading();
            expect(selectedPhotoforWidth.width).to.eql(smallSizedPhoto.width);
        });
    });
});
