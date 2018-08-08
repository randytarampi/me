import {expect} from "chai";
import PhotoSource from "../../../photos/photoSource";

let stubType;

describe("PhotoSource", () => {
    beforeEach(() => {
        stubType = "ʕ•ᴥ•ʔ";
    });

    describe("constructor", () => {
        it("should build a `PhotoSource` instance", () => {
            const photoSource = new PhotoSource(stubType);

            expect(photoSource.type).to.eql(stubType);
            expect(photoSource.client).to.be.undefined;
            expect(photoSource.initializing).to.be.instanceOf(Promise);
            expect(photoSource).to.be.instanceOf(PhotoSource);
        });
    });

    describe("#getPosts", () => {
        it("should throw a `Please specify an actual get photo for user implementation` error", () => {
            const photoSource = new PhotoSource(stubType);

            return photoSource.getPosts()
                .catch((error) => {
                    expect(error.message).to.match(/Please specify an actual postsGetter implementation/);
                });
        });
    });

    describe("#getPost", () => {
        it("should throw a `Please specify an actual get photo implementation` error", () => {
            const photoSource = new PhotoSource(stubType);

            return photoSource.getPost()
                .catch((error) => {
                    expect(error.message).to.match(/Please specify an actual postGetter implementation/);
                });
        });
    });
});
