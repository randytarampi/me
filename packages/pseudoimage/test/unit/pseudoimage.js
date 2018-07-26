"use strict";

let path = require("path");
let mocha = require("mocha");
let sinon = require("sinon");
let describe = mocha.describe;
let it = mocha.it;
let expect = require("chai").expect;
let lwip = require("lwip");
let Pseudoimage = require("../../lib/pseudoimage");

describe("pseudoimage", function () {
	this.timeout(60000);
	let resourceDir = path.join(__dirname, "../resources");
	let tmpDir = path.join(__dirname, "../tmp");

	describe("#generatePseudoImage", function () {
		it("should call the imageTransformationFunction correctly", function (done) {
			let pseudoimage = new Pseudoimage(null, null, testImageTransformationFunction);
			let source = path.join(__dirname, "../resources/subdirectory/photo-1450684739805-ccc25cf4d388.jpeg");
			let destination = path.join(__dirname, "../tmp/woof.jpeg");
			pseudoimage.generatePseudoImage(source, destination)
				.then(done)
				.catch(done);
		});

		it("should return a rejected promise if lwip errors out", function (done) {
			let pseudoimage = new Pseudoimage(null, null, testImageTransformationFunction);
			let source = path.join(__dirname, "../resources/subdirectory/photo-1450684739805-ccc25cf4d388.meow");
			let destination = path.join(__dirname, "../tmp/woof.meow");
			sinon.stub(lwip, "open").callsFake((filename, callback) => {
				callback(new Error("Meow meow meow"));
			});
			pseudoimage.generatePseudoImage(source, destination)
				.then(() => {
					lwip.open.restore();
					done(new Error("This should've exploded"));
				})
				.catch((error) => {
					lwip.open.restore();
					expect(error).to.be.ok;
					expect(error.message).to.match(/^Meow meow meow$/);
					done();
				});
		});
	});

	describe("#generatePseudoImages", function () {
		it("should call the imageTransformationFunction for each image", function (done) {
			let pseudoimage = new Pseudoimage(resourceDir, tmpDir, testImageTransformationFunction);
			pseudoimage.generatePseudoImages()
				.then(done)
				.catch(done);
		});

		it("should return a rejected promise we can't traverse the destination directory", function (done) {
			let pseudoimage = new Pseudoimage(resourceDir, "/dev/urandom", testImageTransformationFunction);
			pseudoimage.generatePseudoImages()
				.then(() => {
					done(new Error("This should've exploded"));
				})
				.catch((error) => {
					expect(error).to.be.ok;
					expect(error.code).to.match(/^ENOTDIR$/);
					done();
				});
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
