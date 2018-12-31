import {expect} from "chai";
import {DateTime} from "luxon";
import queryString from "query-string";
import {Character} from "../../../../src/lib/emoji";
import Gallery from "../../../../src/lib/gallery";
import Photo from "../../../../src/lib/photo";
import Post from "../../../../src/lib/post";
import * as util from "../../../../src/lib/util";

describe("util", function () {
    describe("sortPhotosByWidth", function () {
        it("sorts photos by ascending `.width`", function () {
            const stubPhotos = [
                Photo.fromJS({id: "grr", width: -2}),
                Photo.fromJS({id: "woof", width: -1}),
                Photo.fromJS({id: "meow", width: -2})
            ];

            const sortedPhotos = [...stubPhotos].sort(util.sortPhotosByWidth);

            expect(sortedPhotos).to.have.length(stubPhotos.length);
            sortedPhotos.forEach(sortedPhoto => {
                expect(sortedPhoto).to.be.instanceOf(Photo);
            });
            expect(sortedPhotos.map(sortedPhoto => sortedPhoto.id)).to.eql([
                stubPhotos[0].id,
                stubPhotos[2].id,
                stubPhotos[1].id
            ]);
        });
    });

    describe("sortPostsByDate", function () {
        it("sorts posts by descending `#date`", function () {
            const stubPhotos = [
                Photo.fromJS({id: "grr", dateCreated: new Date(1991, 10, 14)}),
                Photo.fromJS({id: "woof", datePublished: new Date(Date.now() + 2000)}),
                Photo.fromJS({id: "rawr", datePublished: new Date(Date.now() - 2000)}),
                Photo.fromJS({id: "meow", dateCreated: new Date(1991, 10, 14)})
            ];

            const sortedPhotos = [...stubPhotos].sort(util.sortPostsByDate);

            expect(sortedPhotos).to.have.length(stubPhotos.length);
            sortedPhotos.forEach(sortedPhoto => {
                expect(sortedPhoto).to.be.instanceOf(Photo);
            });
            expect(sortedPhotos.map(sortedPhoto => sortedPhoto.id)).to.eql([
                stubPhotos[1].id,
                stubPhotos[2].id,
                stubPhotos[0].id,
                stubPhotos[3].id
            ]);
        });
    });

    describe("sortCharactersByPosition", function () {
        it("sorts posts by descending `#position`", function () {
            const stubCharacters = [
                Character.fromJS({id: "grr", position: 2}),
                Character.fromJS({id: "woof", position: 1}),
                Character.fromJS({id: "meow", position: 2})
            ];

            const sortedCharacters = [...stubCharacters].sort(util.sortCharactersByPosition);

            expect(sortedCharacters).to.have.length(stubCharacters.length);
            sortedCharacters.forEach(sortedCharacter => {
                expect(sortedCharacter).to.be.instanceOf(Character);
            });
            expect(sortedCharacters.map(sortedCharacter => sortedCharacter.id)).to.eql([
                stubCharacters[1].id,
                stubCharacters[0].id,
                stubCharacters[2].id
            ]);
        });
    });

    describe("getEntityForType", function () {
        it("gets `Gallery`s", function () {
            const stubGallery = Gallery.fromJS({id: "grr", width: -2});

            const GalleryConstructor = util.getEntityForType(stubGallery.type);

            expect(stubGallery).to.be.instanceOf(GalleryConstructor);
            expect(stubGallery).to.be.instanceOf(Gallery);
        });

        it("gets `Photo`s", function () {
            const stubPhoto = Photo.fromJS({id: "grr", width: -2});

            const PhotoConstructor = util.getEntityForType(stubPhoto.type);

            expect(stubPhoto).to.be.instanceOf(PhotoConstructor);
            expect(stubPhoto).to.be.instanceOf(Photo);
        });

        it("gets `Post`s", function () {
            const stubPost = Post.fromJS({id: "grr", width: -2});

            const PostConstructor = util.getEntityForType(stubPost.type);

            expect(stubPost).to.be.instanceOf(PostConstructor);
            expect(stubPost).to.be.instanceOf(Post);
        });

        it("throws when it encounters an unknown type", function () {
            try {
                const stubPost = Post.fromJS({type: "woof", id: "grr", width: -2});
                util.getEntityForType(stubPost.type);
                throw new Error("Wtf? This should've thrown");
            } catch (error) {
                expect(error.message).to.match(/Can't `getEntityForType` for `woof`/);
            }
        });
    });

    describe("castDatePropertyToDateTime", function () {
        it("returns null for falsy values", function () {
            const castedDate = util.castDatePropertyToDateTime(null);

            expect(castedDate).to.eql(null);
        });

        it("returns a DateTime from a DateTime", function () {
            const baseDate = DateTime.fromISO("1991-11-14");
            const castedDate = util.castDatePropertyToDateTime(baseDate);

            expect(castedDate).to.be.instanceOf(DateTime);
            expect(castedDate).to.eql(baseDate);
        });

        it("returns a DateTime from an ISO8601 string", function () {
            const baseDate = "1991-11-14";
            const castedDate = util.castDatePropertyToDateTime(baseDate);

            expect(castedDate).to.be.instanceOf(DateTime);
            expect(castedDate.toISO()).to.contain(baseDate);
        });

        it("returns a DateTime from an ISO8601 string", function () {
            const baseDate = DateTime.fromISO("1991-11-14").valueOf();
            const castedDate = util.castDatePropertyToDateTime(baseDate);

            expect(castedDate).to.be.instanceOf(DateTime);
            expect(castedDate.valueOf()).to.eql(baseDate);
        });

        it("returns a DateTime from a Date", function () {
            const baseDate = new Date("1991-11-14");
            const castedDate = util.castDatePropertyToDateTime(baseDate);

            expect(castedDate).to.be.instanceOf(DateTime);
            expect(castedDate.valueOf()).to.eql(baseDate.valueOf());
        });
    });

    describe("augmentUrlWithTrackingParams", function () {
        it("augments the passed href", function () {
            const stubHref = "/woof";
            const stubParameters = {
                source: "woof",
                medium: "meow",
                name: "grr",
                term: "rawr",
                content: "content"
            };

            const augmentedHref = util.augmentUrlWithTrackingParams(stubHref, stubParameters);
            const expectedAugmentedHref = `/woof?${queryString.stringify({
                utm_source: stubParameters.source,
                utm_medium: stubParameters.medium,
                utm_campaign: stubParameters.name,
                utm_term: stubParameters.term,
                utm_content: stubParameters.content
            })}`;

            expect(augmentedHref).to.eql(expectedAugmentedHref);
        });

        it("augments the passed href (no passed params)", function () {
            const stubHref = "/woof";

            const augmentedHref = util.augmentUrlWithTrackingParams(stubHref);
            const expectedAugmentedHref = `/woof?${queryString.stringify({
                utm_source: __CAMPAIGN_SOURCE__,
                utm_medium: __CAMPAIGN_MEDIUM__,
                utm_campaign: __CAMPAIGN_NAME__,
                utm_term: __CAMPAIGN_TERM__,
                utm_content: __CAMPAIGN_CONTENT__
            })}`;

            expect(augmentedHref).to.eql(expectedAugmentedHref);
        });

        it("augments the passed href (explicitly null params)", function () {
            const stubHref = "/woof";
            const stubParameters = {
                source: null,
                medium: null,
                name: null,
                term: null,
                content: null
            };

            const augmentedHref = util.augmentUrlWithTrackingParams(stubHref, stubParameters);
            const expectedAugmentedHref = stubHref;

            expect(augmentedHref).to.eql(expectedAugmentedHref);
        });

        it("augments the passed href (default properties)", function () {
            const stubHref = "/woof";
            const stubParameters = {};

            const augmentedHref = util.augmentUrlWithTrackingParams(stubHref, stubParameters);
            const expectedAugmentedHref = `/woof?${queryString.stringify({
                utm_source: __CAMPAIGN_SOURCE__,
                utm_medium: __CAMPAIGN_MEDIUM__,
                utm_campaign: __CAMPAIGN_NAME__,
                utm_term: __CAMPAIGN_TERM__,
                utm_content: __CAMPAIGN_CONTENT__
            })}`;

            expect(augmentedHref).to.eql(expectedAugmentedHref);
        });

        it("augments the passed href (existing query string)", function () {
            const stubHref = "/woof?woof=meow";
            const stubParameters = {
                source: "woof",
                medium: "meow",
                name: "grr",
                term: "rawr",
                content: "content"
            };

            const augmentedHref = util.augmentUrlWithTrackingParams(stubHref, stubParameters);
            const expectedAugmentedHref = `/woof?${queryString.stringify({
                ...queryString.parseUrl(stubHref).query,
                utm_source: stubParameters.source,
                utm_medium: stubParameters.medium,
                utm_campaign: stubParameters.name,
                utm_term: stubParameters.term,
                utm_content: stubParameters.content
            })}`;

            expect(augmentedHref).to.eql(expectedAugmentedHref);
        });
    });

    describe("getNumericalPrecision", function () {
        it("works for 0", function () {
            const number = 0;
            const precisionForNumber = util.getNumericalPrecision(number);

            expect(precisionForNumber).to.be.a("number");
            expect(precisionForNumber).to.eql(0);
        });

        it("works for 1", function () {
            const number = 1;
            const precisionForNumber = util.getNumericalPrecision(number);

            expect(precisionForNumber).to.be.a("number");
            expect(precisionForNumber).to.eql(0);
        });

        it("works for Infinite values", function () {
            const number = Infinity;
            const precisionForNumber = util.getNumericalPrecision(number);

            expect(precisionForNumber).to.be.a("number");
            expect(precisionForNumber).to.eql(0);
        });

        it("works for decimal values", function () {
            const number = 0.12345;
            const precisionForNumber = util.getNumericalPrecision(number);

            expect(precisionForNumber).to.be.a("number");
            expect(precisionForNumber).to.eql(5);
        });
    });

    describe("getHaversineDistance", function () {
        it("returns the haversine distance (in metres)", function () {
            const lat1 = 0;
            const long1 = 0;
            const lat2 = 0;
            const long2 = 1;

            const haversineDistance = util.getHaversineDistance(lat1, long1, lat2, long2);

            expect(haversineDistance).to.be.a("number");
            expect(haversineDistance).to.be.within(111000, 111200); // NOTE-RT: 1 degree of longitude is about 111.1km right?
        });
    });

    describe("getGeohashPrecisionForRadius", function () {
        util.MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION.map((cellWidth, index) => {
            const cellWidthPrecision = util.getNumericalPrecision(cellWidth);
            const cellWidthIncrement = Number(`${1}e${-cellWidthPrecision}`);

            it(`computes geohash precision for radius for ${cellWidth} + ${cellWidthIncrement}`, function () {
                const geohashPrecision = util.getGeohashPrecisionForRadius(cellWidth + cellWidthIncrement);

                expect(geohashPrecision).to.be.a("number");
                expect(geohashPrecision).to.eql(index + 1);
            });
        });

        const minimumRadius = util.MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION[util.MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION.length - 1] - 0.0001;

        it(`computes geohash precision for radius for ${minimumRadius}`, function () {
            const geohashPrecision = util.getGeohashPrecisionForRadius(minimumRadius);

            expect(geohashPrecision).to.be.a("number");
            expect(geohashPrecision).to.eql(util.MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION.length + 1);
        });
    });

    describe("getGeohashPrecisionForLatOrLong", function () {
        util.GEOHASH_PRECISION_FOR_SIG_FIGS.map((precision, index) => {
            const latOrLong = Number(`${1}e${-index}`);

            it(`computes geohash precision for ${latOrLong}`, function () {
                const geohashPrecision = util.getGeohashPrecisionForLatOrLong(latOrLong);

                expect(geohashPrecision).to.be.a("number");
                expect(geohashPrecision).to.eql(precision);
            });
        });

        const latOrLong = Number(`${1}e${-util.GEOHASH_PRECISION_FOR_SIG_FIGS.length}`);

        it(`computes geohash precision for ${latOrLong} (defaults to 19)`, function () {
            const geohashPrecision = util.getGeohashPrecisionForLatOrLong(latOrLong);

            expect(geohashPrecision).to.be.a("number");
            expect(geohashPrecision).to.eql(19);
        });
    });

    describe("getGeohashPrecisionForLatsOrLongs", function () {
        const latsOrLongs = util.GEOHASH_PRECISION_FOR_SIG_FIGS.map((precision, index) => {
            return Number(`${1}e${-index}`);
        });

        it(`computes geohash precision for ${latsOrLongs}`, function () {
            const geohashPrecision = util.getGeohashPrecisionForLatsOrLongs(...latsOrLongs);

            expect(geohashPrecision).to.be.a("number");
            expect(geohashPrecision).to.eql(util.GEOHASH_PRECISION_FOR_SIG_FIGS[util.GEOHASH_PRECISION_FOR_SIG_FIGS.length - 1]);
        });
    });

    describe("getGeohashesForRadiusAroundPoint", function () {
        it("infers a precision if necessary", function () {
            const radius = util.MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION[0] + 1;
            const geohashesForRadiusAroundPoint = util.getGeohashesForRadiusAroundPoint(0, 0, radius);

            expect(geohashesForRadiusAroundPoint).to.be.an("array");
            expect(geohashesForRadiusAroundPoint).to.contain.members([
                "s",
                "k",
                "e",
                "7",
                "u",
                "h",
                "g",
                "5"
            ]);
        });

        it("calculates geohashes for a given precision", function () {
            const radius = util.MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION[0] + 1;
            const geohashesForRadiusAroundPoint = util.getGeohashesForRadiusAroundPoint(0, 0, radius, 2);

            expect(geohashesForRadiusAroundPoint).to.be.an("array");
            expect(geohashesForRadiusAroundPoint).to.contain.members([
                "ec", "s1", "s3",
                "eb", "s0", "s2",
                "7z", "kp", "kr"
            ]);
        });
    });

    describe("getGeohashesForRadiusAroundGeohash", function () {
        it("infers a precision if necessary", function () {
            const radius = util.MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION[0] + 1;
            const geohashesForRadiusAroundGeohash = util.getGeohashesForRadiusAroundGeohash("s", radius);

            expect(geohashesForRadiusAroundGeohash).to.be.an("array");
            expect(geohashesForRadiusAroundGeohash).to.contain.members([
                "s",
                "t",
                "e",
                "u",
                "k",
                "v",
                "m",
                "g",
                "7"
            ]);
        });

        it("calculates geohashes for a given precision", function () {
            const radius = util.MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION[1];
            const geohashesForRadiusAroundGeohash = util.getGeohashesForRadiusAroundGeohash("s", radius, 2);

            expect(geohashesForRadiusAroundGeohash).to.be.an("array");
            expect(geohashesForRadiusAroundGeohash).to.contain.members([
                "ss",
                "se",
                "sk",
                "s7",
                "st",
                "sd",
                "sm",
                "s6",
                "sw",
                "s9",
                "sq",
                "s3"
            ]);
        });
    });

    describe("getGeohashesForBoundingBox", function () {
        it("infers a precision if necessary", function () {
            const geohashesForBoundingBox = util.getGeohashesForBoundingBox(1, 1, -1, -1);

            expect(geohashesForBoundingBox).to.be.an("array");
            expect(geohashesForBoundingBox).to.contain.members([
                "s00",
                "kpb",
                "ebp",
                "7zz",
                "s01",
                "kpc",
                "ebn",
                "7zy",
                "s02",
                "kp8",
                "ebr",
                "7zx"
            ]);
        });

        it("calculates geohashes for a given precision", function () {
            const geohashesForBoundingBox = util.getGeohashesForBoundingBox(1, 1, -1, -1, 2);

            expect(geohashesForBoundingBox).to.be.an("array");
            expect(geohashesForBoundingBox).to.contain.members([
                "s0",
                "kp",
                "eb",
                "7z"
            ]);
        });
    });

    describe("convertLatLongToGeohash", function () {
        it("returns a geohash", function () {
            const castedDate = util.convertLatLongToGeohash(49.2845, -123.1116);

            expect(castedDate).to.eql("c2b2qebz5b9");
        });

        it("returns a geohash (with custom precision)", function () {
            const castedDate = util.convertLatLongToGeohash(49.2845, -123.1116, 8);

            expect(castedDate).to.eql("c2b2qebz");
        });
    });
});
