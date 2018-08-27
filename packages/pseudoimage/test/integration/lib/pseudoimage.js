const path = require("path");
const fs = require("fs");
const lwip = require("lwip");
const sinon = require("sinon");
const expect = require("chai").expect;
const Pseudoimage = require("../../../lib/pseudoimage");
const {rmrf, openImage} = require("../../util");

describe("pseudoimage", function () {
    this.timeout(60000);

    const resourceDir = path.join(__dirname, "../../resources");
    const tmpDir = path.join(__dirname, "../../tmp");

    beforeEach(function () {
        fs.mkdirSync(tmpDir);
    });

    afterEach(function () {
        try {
            rmrf(tmpDir);
        } catch (e) {
        } // eslint-disable-line no-empty
    });

    describe("#generatePseudoImage", function () {
        it("should generate a pseudoimage", function () {
            const pseudoimage = new Pseudoimage();
            const source = path.join(__dirname, "../../resources/subdirectory/photo-1450684739805-ccc25cf4d388.jpeg");
            const destination = path.join(__dirname, "../../tmp/woof.jpeg");
            return pseudoimage.generatePseudoImage(source, destination)
                .then(() => {
                    return Promise.all([source, destination].map(openImage))
                        .then(function (images) {
                            expect(images[0].width()).to.eql(images[1].width());
                            expect(images[0].height()).to.eql(images[1].height());
                        });
                });
        });

        it("should return a rejected promise if lwip errors out", function () {
            const pseudoimage = new Pseudoimage();
            const source = path.join(__dirname, "../../resources/subdirectory/photo-1450684739805-ccc25cf4d388.jpeg");
            const destination = path.join(__dirname, "../../tmp/woof.jpeg");
            const lwipOpen = lwip.open;
            sinon.stub(lwip, "open").callsFake((filename, callback) => {
                lwipOpen(filename, (error, image) => {
                    const originalImageBatch = image.batch();
                    sinon.stub(image, "batch").callsFake(() => {
                        originalImageBatch.writeFile = (destination, callback) => {
                            callback(new Error("Grr grr grr"));
                        };
                        return originalImageBatch;
                    });
                    callback(error, image);
                });
            });
            return pseudoimage.generatePseudoImage(source, destination)
                .then(() => {
                    lwip.open.restore();
                    throw new Error("This should've exploded");
                })
                .catch(error => {
                    lwip.open.restore();
                    expect(error).to.be.ok;
                    expect(error.message).to.match(/^Grr grr grr$/);
                });
        });
    });

    describe("#generatePseudoImages", function () {
        it("should generate pseudoimages", function () {
            const pseudoimage = new Pseudoimage(resourceDir, tmpDir);
            return pseudoimage.generatePseudoImages();
        });
    });

    describe("retina", function () {
        it("should generate a pseudoimage twice the size of the original", function () {
            const pseudoimage = Pseudoimage.retina();
            const source = path.join(__dirname, "../../resources/subdirectory/photo-1450684739805-ccc25cf4d388.jpeg");
            const destination = path.join(__dirname, "../../tmp/meow.jpeg");

            return pseudoimage.generatePseudoImage(source, destination)
                .then(() => {
                    return Promise.all([source, destination].map(openImage))
                        .then(function (images) {
                            expect(2 * images[0].width()).to.eql(images[1].width());
                            expect(2 * images[0].height()).to.eql(images[1].height());
                        });
                });
        });

        it("should return a rejected promise if lwip errors out", function () {
            const pseudoimage = Pseudoimage.retina();
            const source = path.join(__dirname, "../../resources/subdirectory/photo-1450684739805-ccc25cf4d388.jpeg");
            const destination = path.join(__dirname, "../../tmp/meow.jpeg");
            const lwipOpen = lwip.open;

            sinon.stub(lwip, "open").callsFake((filename, callback) => {
                lwipOpen(filename, (error, image) => {
                    const originalImageBatch = image.batch();
                    sinon.stub(image, "batch").callsFake(() => {
                        originalImageBatch.writeFile = (destination, callback) => {
                            callback(new Error("Grr grr grr"));
                        };
                        return originalImageBatch;
                    });
                    callback(error, image);
                });
            });

            return pseudoimage.generatePseudoImage(source, destination)
                .then(() => {
                    lwip.open.restore();
                    throw new Error("This should've exploded");
                })
                .catch(error => {
                    lwip.open.restore();
                    expect(error).to.be.ok;
                    expect(error.message).to.match(/^Grr grr grr$/);
                });
        });
    });

    describe("half", function () {
        it("should generate a pseudoimage half the size of the original", function () {
            const pseudoimage = Pseudoimage.half();
            const source = path.join(__dirname, "../../resources/subdirectory/photo-1450684739805-ccc25cf4d388.jpeg");
            const destination = path.join(__dirname, "../../tmp/meow.jpeg");

            return pseudoimage.generatePseudoImage(source, destination)
                .then(() => {
                    return Promise.all([source, destination].map(openImage))
                        .then(function (images) {
                            expect(images[0].width()).to.be.within(2 * images[1].width() - 1, 2 * images[1].width() + 1);
                            expect(images[0].height()).to.be.within(2 * images[1].height() - 1, 2 * images[1].height() + 1);
                        });
                });
        });

        it("should return a rejected promise if lwip errors out", function () {
            const pseudoimage = Pseudoimage.half();
            const source = path.join(__dirname, "../../resources/subdirectory/photo-1450684739805-ccc25cf4d388.jpeg");
            const destination = path.join(__dirname, "../../tmp/meow.jpeg");
            const lwipOpen = lwip.open;

            sinon.stub(lwip, "open").callsFake((filename, callback) => {
                lwipOpen(filename, (error, image) => {
                    const originalImageBatch = image.batch();
                    sinon.stub(image, "batch").callsFake(() => {
                        originalImageBatch.writeFile = (destination, callback) => {
                            callback(new Error("Grr grr grr"));
                        };
                        return originalImageBatch;
                    });
                    callback(error, image);
                });
            });

            return pseudoimage.generatePseudoImage(source, destination)
                .then(() => {
                    lwip.open.restore();
                    throw new Error("This should've exploded");
                })
                .catch(error => {
                    lwip.open.restore();
                    expect(error).to.be.ok;
                    expect(error.message).to.match(/^Grr grr grr$/);
                });
        });
    });
});
