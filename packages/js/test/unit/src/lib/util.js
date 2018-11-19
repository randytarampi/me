import {expect} from "chai";
import {DateTime} from "luxon";
import queryString from "query-string";
import {Character} from "../../../../src/lib/emoji";
import Photo from "../../../../src/lib/photo";
import Post from "../../../../src/lib/post";
import * as util from "../../../../src/lib/util";

describe("util", function () {
    describe(".sortPhotosByWidth", function () {
        it("sorts photos by ascending `.width`", function () {
            const stubPhotos = [
                Photo.fromJS({id: "grr", width: -2}),
                Photo.fromJS({id: "woof", width: -1}),
                Photo.fromJS({id: "meow", width: -2})
            ];

            const sortedPhotos = [...stubPhotos].sort(util.sortPhotosByWidth);

            expect(sortedPhotos).to.be.ok;
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

    describe(".sortPostsByDate", function () {
        it("sorts posts by descending `#date`", function () {
            const stubPhotos = [
                Photo.fromJS({id: "grr", dateCreated: new Date(1991, 10, 14)}),
                Photo.fromJS({id: "woof", datePublished: new Date(Date.now() + 2000)}),
                Photo.fromJS({id: "rawr", datePublished: new Date(Date.now() - 2000)}),
                Photo.fromJS({id: "meow", dateCreated: new Date(1991, 10, 14)})
            ];

            const sortedPhotos = [...stubPhotos].sort(util.sortPostsByDate);

            expect(sortedPhotos).to.be.ok;
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

    describe(".sortCharactersByPosition", function () {
        it("sorts posts by descending `#position`", function () {
            const stubCharacters = [
                Character.fromJS({id: "grr", position: 2}),
                Character.fromJS({id: "woof", position: 1}),
                Character.fromJS({id: "meow", position: 2})
            ];

            const sortedCharacters = [...stubCharacters].sort(util.sortCharactersByPosition);

            expect(sortedCharacters).to.be.ok;
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

    describe(".getEntityForType", function () {
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
                expect(error).to.be.ok;
                expect(error.message).to.match(/Can't `getEntityForType` for `woof`/);
            }
        });
    });

    describe(".castDatePropertyToDateTime", function () {
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

    describe(".augmentUrlWithTrackingParams", function () {
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

            expect(augmentedHref).to.be.ok;
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

            expect(augmentedHref).to.be.ok;
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

            expect(augmentedHref).to.be.ok;
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

            expect(augmentedHref).to.be.ok;
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

            expect(augmentedHref).to.be.ok;
            expect(augmentedHref).to.eql(expectedAugmentedHref);
        });
    });
});
