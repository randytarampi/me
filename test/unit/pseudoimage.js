let path = require("path");
let Mocha = require("mocha");
let describe = Mocha.describe;
let it = require("mocha").it;
let expect = require("chai").expect;
let Pseudoimage = require("../../lib/pseudoimage");

describe("pseudoimage", function () {
	let resourceDir = path.join(__dirname, "../resources");
	let tmpDir = path.join(__dirname, "../tmp");

	describe("#generatePseudoImage", () => {
		it("should call the imageTransformationFunction correctly", function (done) {
			let pseudoimage = new Pseudoimage(null, null, testImageTransformationFunction);
			let source = path.join(__dirname, "../resources/photo-1450684739805-ccc25cf4d388.jpeg");
			let destination = path.join(__dirname, "../tmp/woof.jpeg");
			pseudoimage.generatePseudoImage(source, destination)
				.then(done)
				.catch(done);
		});
	});

	describe("#generatePseudoImages", () => {
		it("should call the imageTransformationFunction for each image", function (done) {
			let pseudoimage = new Pseudoimage(resourceDir, tmpDir, testImageTransformationFunction);
			pseudoimage.generatePseudoImages()
				.then(done)
				.catch(done);
		});
	});
});


function testImageTransformationFunction(image, destinationPath, successCallback, failureCallback) {
	try {
		expect(typeof destinationPath).to.eql("string");
		expect(successCallback).to.be.instanceOf(Function);
		expect(failureCallback).to.be.instanceOf(Function);
	} catch (error) {
		failureCallback(error);
	}
	successCallback();
}
