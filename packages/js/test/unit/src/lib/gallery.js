import {expect} from "chai";
import {List} from "immutable";
import {DateTime} from "luxon";
import Gallery from "../../../../src/lib/gallery";
import Photo from "../../../../src/lib/photo";
import {augmentUrlWithTrackingParams} from "../../../../src/lib/util";

describe("Gallery", () => {
    describe("constructor", () => {
        it("should build a Gallery object", () => {
            const galleryJs = {
                id: "woof",
                source: "Woofdy",
                dateCreated: DateTime.utc(),
                datePublished: DateTime.utc(),
                width: -1,
                height: -2,
                photos: List([
                    Photo.fromJS({
                        id: "woof://woof.woof/woof/woofto",
                        width: 640,
                        height: 480,
                        sizedPhotos: [{url: "woof://woof.woof/woof/woofto", width: 640, height: 480}]
                    })
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
            const gallery = new Gallery(galleryJs);

            expect(gallery.type).to.eql(Gallery.type);
            expect(gallery.dateCreated).to.be.an.instanceOf(DateTime);
            expect(gallery.datePublished).to.be.an.instanceOf(DateTime);
            expect(gallery.photos).to.be.an.instanceOf(List);
        });

        it("returns an empty Gallery", function () {
            const gallery = new Gallery();

            expect(gallery).to.be.instanceOf(Gallery);
        });
    });

    describe(".fromJSON", () => {
        it("should instantiate a Gallery object from some plain JS Object", () => {
            const galleryJson = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: null,
                datePublished: DateTime.utc().toISO(),
                width: -1,
                height: -2,
                photos: [
                    {
                        id: "woof://woof.woof/woof/woofto",
                        width: 640,
                        height: 480,
                        sizedPhotos: [{url: "woof://woof.woof/woof/woofto", width: 640, height: 480}]
                    }
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

            const galleryFromJson = Gallery.fromJSON(galleryJson);

            expect(galleryFromJson.id).to.eql(galleryJson.id);
            expect(galleryFromJson.datePublished).to.be.instanceof(DateTime);
            expect(galleryFromJson.photos).to.be.instanceof(List);
            expect(galleryFromJson.photos.size).to.eql(galleryJson.photos.length);
            galleryFromJson.photos.forEach(photo => {
                expect(photo).to.be.instanceof(Photo);
            });
        });
    });

    describe(".fromJS", () => {
        it("should instantiate a Gallery object from some plain JS Object", () => {
            const galleryJson = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: null,
                datePublished: DateTime.utc(),
                width: -1,
                height: -2,
                photos: [
                    {
                        id: "woof://woof.woof/woof/woofto",
                        width: 640,
                        height: 480,
                        sizedPhotos: [{url: "woof://woof.woof/woof/woofto", width: 640, height: 480}]
                    },
                    {
                        id: "woof://woof.woof/woof/woofto",
                        width: 800,
                        sizedPhotos: [{url: "woof://woof.woof/woof/woofto", width: 800}]
                    }
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

            const galleryFromJs = Gallery.fromJS(galleryJson);

            expect(galleryFromJs.id).to.eql(galleryJson.id);
            expect(galleryFromJs.datePublished).to.be.instanceof(DateTime);
            expect(galleryFromJs.photos).to.be.instanceof(List);
            expect(galleryFromJs.photos.size).to.eql(galleryJson.photos.length);
            galleryFromJs.photos.forEach(photo => {
                expect(photo).to.be.instanceof(Photo);
            });
        });
    });

    describe("#toSchema", function () {
        it("returns expected Schema.org JSON", function () {
            const galleryJson = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: DateTime.utc(),
                datePublished: DateTime.utc(),
                width: -1,
                height: -2,
                photos: [
                    {
                        id: "woof://woof.woof/woof/woofto",
                        width: 640,
                        height: 480,
                        sizedPhotos: [{url: "woof://woof.woof/woof/woofto", width: 640, height: 480}]
                    },
                    {
                        id: "woof://woof.woof/woof/woofto",
                        width: 800,
                        sizedPhotos: [{url: "woof://woof.woof/woof/woofto", width: 800}]
                    }
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

            const galleryFromJs = Gallery.fromJS(galleryJson);

            const schemaJson = galleryFromJs.toSchema();
            const {body, sourceUrl, type, photos, ...js} = galleryFromJs.toJS(); // eslint-disable-line no-unused-vars
            const photoSchemaJson = {
                ...js,
                creator: galleryFromJs.creator.toSchema(),
                author: galleryFromJs.creator.toSchema(),
                publisher: galleryFromJs.creator.toSchema(),
                dateCreated: galleryFromJs.dateCreated.toISO(),
                dateModified: galleryFromJs.datePublished.toISO(),
                datePublished: galleryFromJs.datePublished.toISO(),
                accessMode: "visual",
                articleBody: galleryFromJs.body,
                articleSection: galleryFromJs.type,
                headline: galleryFromJs.title,
                name: galleryFromJs.title,
                text: galleryFromJs.body,
                mainEntityOfPage: galleryFromJs.sourceUrl,
                image: galleryFromJs.largestImage.url
            };

            expect(schemaJson).to.eql({
                ...photoSchemaJson,
                sharedContent: {
                    ...photoSchemaJson,
                    uploadDate: photoSchemaJson.datePublished,
                    height: `${galleryFromJs.largestImage.height}px`,
                    width: `${galleryFromJs.largestImage.width}px`,
                    caption: photoSchemaJson.articleBody,
                    thumbnail: galleryFromJs.smallestImage.url,
                    contentUrl: photoSchemaJson.image
                }
            });
        });

        it("returns some empty Schema.org JSON", function () {
            const galleryFromJs = Gallery.fromJS();

            const schemaJson = galleryFromJs.toSchema();
            const {body, sourceUrl, type, photos, ...js} = galleryFromJs.toJS(); // eslint-disable-line no-unused-vars

            expect(schemaJson).to.eql({
                ...js,
                accessMode: "visual",
                articleSection: galleryFromJs.type,
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
            const galleryJson = {
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: DateTime.utc(),
                datePublished: DateTime.utc(),
                width: -1,
                height: -2,
                photos: [
                    {
                        id: "woof://woof.woof/woof/woofto",
                        width: 640,
                        height: 480,
                        sizedPhotos: [{url: "woof://woof.woof/woof/woofto", width: 640, height: 480}]
                    },
                    {
                        id: "woof://woof.woof/woof/woofto",
                        width: 800,
                        sizedPhotos: [{url: "woof://woof.woof/woof/woofto", width: 800}]
                    }
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

            const galleryFromJs = Gallery.fromJS(galleryJson);

            const rssJson = galleryFromJs.toRss();

            expect(rssJson).to.eql({
                title: galleryFromJs.title,
                description: galleryFromJs.body,
                url: augmentUrlWithTrackingParams(galleryFromJs.sourceUrl),
                guid: galleryFromJs.uid,
                date: galleryFromJs.date.toJSDate(),
                author: `${galleryFromJs.creator.url} (${galleryFromJs.creator.name})`,
                enclosure: {
                    url: galleryFromJs.largestImage.url
                },
                lat: null,
                long: null
            });
        });

        it("returns some empty `rss` item", function () {
            const galleryFromJs = Gallery.fromJS();

            const rssJson = galleryFromJs.toRss();

            expect(rssJson).to.eql({
                title: null,
                description: null,
                url: null,
                guid: galleryFromJs.uid,
                date: null,
                author: null,
                enclosure: null,
                lat: null,
                long: null
            });
        });
    });
});
