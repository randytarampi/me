"use strict";

const path = require("path");
const fs = require("fs");
const mocha = require("mocha");
const describe = mocha.describe;
const xdescribe = () => {};
const it = mocha.it;
const before = mocha.before;
const after = mocha.after;
const expect = require("chai").expect;
const _ = require("lodash");
const Photo = require("me.common.js/lib/photo");
const PhotoSource = require("../../../photos/photoSource");

describe("PhotoSource", () => {
	before(() => {
		process.env._API_KEY = "woof";
		process.env._API_SECRET = "meow";
	});

	after(() => {
		delete process.env._API_KEY;
		delete process.env._API_SECRET;
	});

	describe("constructor", () => {
		it("should build a `PhotoSource` instance", () => {
			const photoSource = new PhotoSource();

			expect(photoSource.client).to.be.undefined;
			expect(photoSource.type).to.eql(undefined);
			expect(photoSource).to.be.instanceOf(PhotoSource);
		});
	});

	xdescribe("#getUserPhotos", () => {
		it("should load `Photo`s from the most recent images in the given `process.env.LOCAL_DIRECTORY`", () => {
			const photoSource = new PhotoSource();

			return photoSource.getUserPhotos()
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

	xdescribe("#getPhoto", () => {
		it("should load a `Photo` from a given `Photo`'s `id`", () => {
			const photoSource = new PhotoSource();

			return photoSource.getUserPhotos()
				.then((photos) => {
					return Promise.all(
						photos.map((photo) => {
							return photoSource.getPhoto(photo.id)
								.then((photoFromGetPhoto) => {
									expect(photo).to.be.eql(photoFromGetPhoto);
								});
						})
					);
				});
		});
	});

	xdescribe("#jsonToPhoto", () => {
		it("should only ever have one `SizedPhoto`", () => {
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
			const jsonToPhotoResult = photoSource.jsonToPhoto(filePath, fileName, lstat, width, height);

			expect(jsonToPhotoResult).to.be.instanceof(Photo);
			expect(jsonToPhotoResult.sizedPhotos.length).to.eql(1);
			jsonToPhotoResult.sizedPhotos.map((sizedPhoto) => {
				expect(sizedPhoto.url).to.eql(jsonToPhotoResult.sourceUrl);
				expect(sizedPhoto.width).to.eql(jsonToPhotoResult.width);
				expect(sizedPhoto.height).to.eql(jsonToPhotoResult.height);
			});
		});
	});

	describe("#isEnabled", () => {
		it("should be enabled if it can find some `_API_KEY` and some `_API_SECRET`", () => {
			const photoSource = new PhotoSource();

			expect(photoSource.isEnabled).to.eql(true);
		});

		it("should not be enabled if it cannot find `_API_KEY`", () => {
			delete process.env._API_KEY;

			const photoSource = new PhotoSource();

			expect(photoSource.isEnabled).to.eql(false);
		});

		it("should not be enabled if it cannot find `_API_SECRET`", () => {
			delete process.env._API_SECRET;

			const photoSource = new PhotoSource();

			expect(photoSource.isEnabled).to.eql(false);
		});
	});
});
