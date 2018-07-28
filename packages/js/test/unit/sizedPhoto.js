const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const expect = require("chai").expect;
const SizedPhoto = require("../../lib/sizedPhoto");

describe("SizedPhoto", () => {
    describe(".fromJSON", () => {
        it("should instantiate a SizedPhoto object from some plain JS Object", () => {
            const sizedPhotoJSON = {
                width: -1,
                height: -2,
                url: "woof://woof.woof/woof/woof/woof"
            };

            expect(new SizedPhoto(sizedPhotoJSON.url, sizedPhotoJSON.width, sizedPhotoJSON.height, sizedPhotoJSON.size)).to.eql(SizedPhoto.fromJSON(sizedPhotoJSON));
        });
    });
});
