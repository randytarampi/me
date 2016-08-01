let path = require("path");
let fs = require("fs");
let lwip = require("lwip");
let Image = require("lwip/lib/image");
let Mocha = require("mocha");
let describe = Mocha.describe;
let it = require("mocha").it;
let expect = require("chai").expect;
let Pseudoimager = require("../../lib/pseudoimager");

describe("pseudoimager", function () {
	let resourceDir = path.join(__dirname, "../resources");
	let tmpDir = path.join(__dirname, "../tmp");

	describe("#generatePseudoImage", () => {
		it("should call the imageTransformationFunction correctly", function (done) {
			let pseudoimager = new Pseudoimager(null, null, testImageTransformationFunction);
			let source = path.join(__dirname, "../resources/photo-1450684739805-ccc25cf4d388.jpeg");
			let destination = path.join(__dirname, "../tmp/woof.jpeg");
			pseudoimager.generatePseudoImage(source, destination)
				.then(done)
				.catch(done);
		});
	});

	describe("#generatePseudoImages", () => {
		it("should call the imageTransformationFunction for each image", function (done) {
			let pseudoimager = new Pseudoimager(resourceDir, tmpDir, testImageTransformationFunction);
			pseudoimager.generatePseudoImages()
				.then(done)
				.catch(done);
		});
	});
});


function testImageTransformationFunction(image, destinationPath, successCallback, failureCallback) {
	try {
		expect(image).to.be.instanceOf(Image);
		expect(typeof destinationPath).to.eql("string");
		expect(successCallback).to.be.instanceOf(Function);
		expect(failureCallback).to.be.instanceOf(Function);
	} catch (error) {
		failureCallback(error);
	}
	successCallback();
}
