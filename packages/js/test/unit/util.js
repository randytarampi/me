import {expect} from "chai";
import {Character} from "../../lib/emoji";
import Photo from "../../lib/photo";
import * as util from "../../lib/util";

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
                stubPhotos[1].id,
            ]);
        });
    });

    describe(".sortPostsByDate", function () {
        it("sorts posts by descending `#date`", function () {
            const stubPhotos = [
                Photo.fromJS({id: "grr", dateCreated: new Date(1991, 10, 14)}),
                Photo.fromJS({id: "woof", datePublished: Date.now()}),
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
                stubPhotos[0].id,
                stubPhotos[2].id,
            ]);
        });
    });

    describe(".sortPostsByDate", function () {
        it("sorts posts by descending `#date`", function () {
            const stubPhotos = [
                Photo.fromJS({id: "grr", dateCreated: new Date(1991, 10, 14)}),
                Photo.fromJS({id: "woof", datePublished: Date.now()}),
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
                stubPhotos[0].id,
                stubPhotos[2].id,
            ]);
        });
    });

    describe(".sortCharactersByPosition", function () {
        it("sorts posts by descending `#date`", function () {
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
                stubCharacters[2].id,
            ]);
        });
    });
});
