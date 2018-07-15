const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const expect = require("chai").expect;
const Moment = require("moment");
const Photo = require("../../lib/photo");
const SizedPhoto = require("../../lib/sizedPhoto");

describe("Photo", () => {
	describe("constructor", () => {
		it("should build a `Photo` object", () => {
			const photoJSON = {
				id: "woof",
				source: "Woofdy",
				_dateCreated: Date.now(),
				_datePublished: Date.now(),
				width: -1,
				height: -2,
				sizedPhotos: [
					new SizedPhoto("woof://woof.woof/woof/woofto", 640, 480)
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
			const photo = new Photo(photoJSON.id, photoJSON.type, photoJSON.source, photoJSON._dateCreated, photoJSON._datePublished, photoJSON.width, photoJSON.height, photoJSON.sizedPhotos, photoJSON.sourceUrl, photoJSON.title, photoJSON.body, photoJSON.creator);

			expect(photo.type).to.eql(Photo.name);
			expect(photo.dateCreated).to.be.an.instanceOf(Moment);
			expect(photo.datePublished).to.be.an.instanceOf(Moment);
		});
	});

	describe(".fromJSON", () => {
		it("should instantiate a Photo object from some plain JS Object", () => {
			const photoJSON = {
				id: "woof",
				type: "Woof",
				source: "Woofdy",
				_dateCreated: Date.now(),
				_datePublished: Date.now(),
				width: -1,
				height: -2,
				sizedPhotos: [
					new SizedPhoto("woof://woof.woof/woof/woofto", 640, 480)
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

			expect(new Photo(photoJSON.id, photoJSON.type, photoJSON.source, photoJSON._dateCreated, photoJSON._datePublished, photoJSON.width, photoJSON.height, photoJSON.sizedPhotos, photoJSON.sourceUrl, photoJSON.title, photoJSON.body, photoJSON.creator)).to.eql(Photo.fromJSON(photoJSON));
		});
	});

	//FIXME-RT: This is a weird interface...
	describe(".sizedPhoto", () => {
		it("shouldn't have a `.sizedPhoto` getter", () => {
			const photoJSON = {
				id: "woof",
				type: "Woof",
				source: "Woofdy",
				_dateCreated: null,
				_datePublished: null,
				width: -1,
				height: -2,
				sizedPhotos: [

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
			const photo = Photo.fromJSON(photoJSON);

			expect(photo.sizedPhoto).to.eql(undefined);
		});

		it("should set `SizedPhoto`s properly", () => {
			const photoJSON = {
				id: "woof",
				type: "Woof",
				source: "Woofdy",
				_dateCreated: null,
				_datePublished: null,
				width: -1,
				height: -2,
				sizedPhotos: [

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
			const photo = Photo.fromJSON(photoJSON);
			const sizedPhoto = new SizedPhoto("woof://woof.woof/woof/woofto", 640, 480);

			photo.sizedPhoto = null;
			expect(photo.sizedPhotos.length).to.eql(0);

			photo.sizedPhoto = sizedPhoto;
			expect(photo.sizedPhotos.length).to.eql(1);

			photo.sizedPhoto = sizedPhoto;
			photo.sizedPhoto = sizedPhoto;
			expect(photo.sizedPhotos.length).to.eql(3);
		});

		it("should `scaleHeightToWidth` for `SizedPhoto`s with no `.height` defined", () => {
			const photoJSON = {
				id: "woof",
				type: "Woof",
				source: "Woofdy",
				_dateCreated: null,
				_datePublished: null,
				width: -1,
				height: -2,
				sizedPhotos: [

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
			const photo = Photo.fromJSON(photoJSON);

			const smallSizedPhoto = new SizedPhoto("woof://woof.woof/woof/woofto", 100);
			const mediumSizedPhoto = new SizedPhoto("woof://woof.woof/woof/woofto", 1000);
			const largeSizedPhoto = new SizedPhoto("woof://woof.woof/woof/woofto", 10000);
			const sizedPhotos = [
				smallSizedPhoto,
				mediumSizedPhoto,
				largeSizedPhoto
			];

			sizedPhotos.forEach((sizedPhoto) => {
				photo.sizedPhoto = sizedPhoto;
			});

			sizedPhotos.forEach((sizedPhoto) => {
				const selectedPhotoforWidth = photo.getSizedPhoto(sizedPhoto.width);
				expect(selectedPhotoforWidth.height).to.eql(sizedPhoto.width * (photo.height / photo.width));
			});
		});
	});

	describe("#getSizedPhoto", () => {
		it("should return 0 objects is `.sizedPhotos` is empty", () => {
			const photoJSON = {
				id: "woof",
				type: "Woof",
				source: "Woofdy",
				_dateCreated: null,
				_datePublished: null,
				width: -1,
				height: -2,
				sizedPhotos: [

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
			const photo = Photo.fromJSON(photoJSON);

			expect(photo.getSizedPhoto()).to.eql(undefined);
			expect(photo.getSizedPhoto(200)).to.eql(undefined);
		});

		it("should return a single member of `.sizedPhotos`, the smallest in size (width), for a given argument", () => {
			const photoJSON = {
				id: "woof",
				type: "Woof",
				source: "Woofdy",
				_dateCreated: null,
				_datePublished: null,
				width: -1,
				height: -2,
				sizedPhotos: [

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
			const photo = Photo.fromJSON(photoJSON);

			const smallSizedPhoto = new SizedPhoto("woof://woof.woof/woof/woofto", 100, 133);
			const mediumSizedPhoto = new SizedPhoto("woof://woof.woof/woof/woofto", 1000, 1333);
			const largeSizedPhoto = new SizedPhoto("woof://woof.woof/woof/woofto", 10000, 13333);
			const sizedPhotos = [
				smallSizedPhoto,
				mediumSizedPhoto,
				largeSizedPhoto
			];

			sizedPhotos.forEach((sizedPhoto) => {
				photo.sizedPhoto = sizedPhoto;
			});

			sizedPhotos.forEach((sizedPhoto) => {
				const selectedPhotoforWidth = photo.getSizedPhoto(sizedPhoto.width);
				expect(selectedPhotoforWidth.width).to.eql(sizedPhoto.width);
			});
		});
	});
});
