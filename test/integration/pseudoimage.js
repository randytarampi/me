let path = require("path");
let fs = require("fs");
let lwip = require("lwip");
let Mocha = require("mocha");
let describe = Mocha.describe;
let beforeEach = Mocha.beforeEach;
let after = require("mocha").after;
let it = require("mocha").it;
let expect = require("chai").expect;
let Pseudoimage = require("../../lib/pseudoimage");

describe("pseudoimage", function () {
	this.timeout(60000);
	let resourceDir = path.join(__dirname, "../resources");
	let tmpDir = path.join(__dirname, "../tmp");

	beforeEach(function () {
		try {
			rmrf(tmpDir);
		} catch (e) {} finally { // eslint-disable-line no-empty
			fs.mkdirSync(tmpDir);
		}
	});
	after(function () {
		try {
			rmrf(tmpDir);
		} catch (e) {} // eslint-disable-line no-empty
	});

	describe("#generatePseudoImage", () => {
		it("should generate a pseudoimage", function (done) {
			let pseudoimage = new Pseudoimage();
			let source = path.join(__dirname, "../resources/photo-1450684739805-ccc25cf4d388.jpeg");
			let destination = path.join(__dirname, "../tmp/woof.jpeg");
			pseudoimage.generatePseudoImage(source, destination)
				.then(() => {
					return Promise.all([source, destination].map(openImage))
						.then(function (images) {
							expect(images[0].width()).to.eql(images[1].width());
							expect(images[0].height()).to.eql(images[1].height());
						});
				})
				.then(done)
				.catch(done);
		});
	});

	describe("#generatePseudoImages", () => {
		it("should generate pseudoimages", function (done) {
			let pseudoimage = new Pseudoimage(resourceDir, tmpDir);
			pseudoimage.generatePseudoImages()
				.then(done)
				.catch(done);
		});
	});

	describe("retina", () => {
		it("should generate a pseudoimage twice the size of the original", function (done) {
			let pseudoimage = Pseudoimage.retina();
			let source = path.join(__dirname, "../resources/photo-1450684739805-ccc25cf4d388.jpeg");
			let destination = path.join(__dirname, "../tmp/meow.jpeg");
			pseudoimage.generatePseudoImage(source, destination)
				.then(() => {
					return Promise.all([source, destination].map(openImage))
						.then(function (images) {
							expect(2 * images[0].width()).to.eql(images[1].width());
							expect(2 * images[0].height()).to.eql(images[1].height());
						});
				})
				.then(done)
				.catch(done);
		});
	});

	describe("half", () => {
		it("should generate a pseudoimage half the size of the original", function (done) {
			let pseudoimage = Pseudoimage.half();
			let source = path.join(__dirname, "../resources/photo-1450684739805-ccc25cf4d388.jpeg");
			let destination = path.join(__dirname, "../tmp/meow.jpeg");
			pseudoimage.generatePseudoImage(source, destination)
				.then(() => {
					return Promise.all([source, destination].map(openImage))
						.then(function (images) {
							expect(images[0].width()).to.be.within(2 * images[1].width() - 1, 2 * images[1].width() + 1);
							expect(images[0].height()).to.be.within(2 * images[1].height() - 1, 2 * images[1].height() + 1);
						});
				})
				.then(done)
				.catch(done);
		});
	});
});

function rmrf(dir) {
	let files = fs.readdirSync(dir);

	files.forEach(function (file) {
		let filename = path.join(dir, file);

		if (fs.statSync(filename).isDirectory()) {
			rmrf(filename);
		} else {
			fs.unlinkSync(filename);
		}
	});
	fs.rmdirSync(dir);
}

function openImage(imagePath) {
	return new Promise((resolve, reject) => {
		lwip.open(imagePath, (error, image) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(image);
		});
	});
}