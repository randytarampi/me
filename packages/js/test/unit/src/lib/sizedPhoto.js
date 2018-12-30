import {expect} from "chai";
import SizedPhoto from "../../../../src/lib/sizedPhoto";

describe("SizedPhoto", () => {
    describe("fromJS", () => {
        it("should instantiate a SizedPhoto object from some plain JS Object", () => {
            const sizedPhotoJs = {
                width: -1,
                height: -2,
                url: "woof://woof.woof/woof/woof/woof"
            };
            const instantiatedSizedPhoto = SizedPhoto.fromJS(sizedPhotoJs);

            expect(instantiatedSizedPhoto.width).to.eql(sizedPhotoJs.width);
            expect(instantiatedSizedPhoto.height).to.eql(sizedPhotoJs.height);
            expect(instantiatedSizedPhoto.url).to.eql(sizedPhotoJs.url);
        });
    });

    describe("size", () => {
        it("gets the set `.size`", () => {
            const sizedPhotoJs = {
                width: -1,
                height: -2,
                url: "woof://woof.woof/woof/woof/woof",
                size: "meow"
            };
            const instantiatedSizedPhoto = SizedPhoto.fromJS(sizedPhotoJs);

            expect(instantiatedSizedPhoto.size).to.eql(sizedPhotoJs.size);
        });

        it("defers to the `.width` when there is no `.size`", () => {
            const sizedPhotoJs = {
                width: -1,
                height: -2,
                url: "woof://woof.woof/woof/woof/woof"
            };
            const instantiatedSizedPhoto = SizedPhoto.fromJS(sizedPhotoJs);

            expect(instantiatedSizedPhoto.size).to.eql(sizedPhotoJs.width.toString());
        });
    });
});
