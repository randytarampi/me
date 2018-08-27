const path = require("path");
const sinon = require("sinon");
const expect = require("chai").expect;
const lwip = require("lwip");
const Pseudoimage = require("../../../lib/pseudoimage");

describe("pseudoimage", function () {
    this.timeout(60000);

    const resourceDir = path.join(__dirname, "../../resources");
    const tmpDir = path.join(__dirname, "../../../tmp");

    describe("#generatePseudoImage", function () {
        it("should call the imageTransformationFunction correctly", function () {
            const pseudoimage = new Pseudoimage(null, null, testImageTransformationFunction);
            const source = path.join(__dirname, "../../resources/subdirectory/photo-1450684739805-ccc25cf4d388.jpeg");
            const destination = path.join(__dirname, "../../../tmp/woof.jpeg");
            return pseudoimage.generatePseudoImage(source, destination);
        });

        it("should return a rejected promise if lwip errors out", function () {
            const pseudoimage = new Pseudoimage(null, null, testImageTransformationFunction);
            const source = path.join(__dirname, "../../resources/subdirectory/photo-1450684739805-ccc25cf4d388.jpeg");
            const destination = path.join(__dirname, "../../../tmp/woof.meow");
            sinon.stub(lwip, "open").callsFake((filename, callback) => {
                callback(new Error("Meow meow meow"));
            });

            return pseudoimage.generatePseudoImage(source, destination)
                .then(() => {
                    lwip.open.restore();
                    throw new Error("This should've exploded");
                })
                .catch(error => {
                    lwip.open.restore();
                    expect(error).to.be.ok;
                    expect(error.message).to.match(/^Meow meow meow$/);
                });
        });
    });

    describe("#generatePseudoImages", function () {
        it("should call the imageTransformationFunction for each image", function () {
            const pseudoimage = new Pseudoimage(resourceDir, tmpDir, testImageTransformationFunction);
            return pseudoimage.generatePseudoImages();
        });

        it("should return a rejected promise we can't traverse the destination directory", function () {
            const pseudoimage = new Pseudoimage(resourceDir, "/dev/urandom", testImageTransformationFunction);
            return pseudoimage.generatePseudoImages()
                .then(() => {
                    throw new Error("This should've exploded");
                })
                .catch(error => {
                    expect(error).to.be.ok;
                    expect(error.code).to.match(/^ENOTDIR$/);
                });
        });
    });
});

const testImageTransformationFunction = (image, destinationPath, successCallback, failureCallback) => {
    try {
        expect(typeof destinationPath).to.eql("string");
        expect(successCallback).to.be.instanceOf(Function);
        expect(failureCallback).to.be.instanceOf(Function);
    } catch (error) {
        failureCallback(error);
    }
    successCallback();
};
