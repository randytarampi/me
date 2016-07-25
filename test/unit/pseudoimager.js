let path = require("path");
let fs = require("fs");
let lwip = require("lwip");
let Mocha = require("mocha");
let describe = Mocha.describe;
let beforeEach = Mocha.beforeEach;
let after = require("mocha").after;
let it = require("mocha").it;
let expect = require("chai").expect;
let Pseudoimager = require("../../lib/pseudoimager");

describe("pseudoimager", function () {
	this.timeout(10000); // RT: Lol. These are really integration tests...
	let resourceDir = path.join(__dirname, "../resources");
	let tmpDir = path.join(__dirname, "../tmp");

	beforeEach(function () {
		try {
			rmrf(tmpDir);
		} catch (e) {} finally {
			fs.mkdirSync(tmpDir);
		}
	});
	after(function () {
		try {
			rmrf(tmpDir);
		} catch (e) {}
	});

	describe("#generatePseudoImage", () => {
		it("should generate a pseudoimage", function (done) {
			let pseudoimager = new Pseudoimager();
			let source = path.join(__dirname, "../resources/photo-1450684739805-ccc25cf4d388.jpeg");
			let destination = path.join(__dirname, "../tmp/woof.jpeg");
			pseudoimager.generatePseudoImage(source, destination)
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
			let pseudoimager = new Pseudoimager(resourceDir, tmpDir);
			pseudoimager.generatePseudoImages()
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
		})
	});
}