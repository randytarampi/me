import {expect} from "chai";
import WordSource from "../../../words/wordSource";

let stubType;

describe("WordSource", function () {
    this.timeout(60000);

    beforeEach(function () {
        stubType = "ʕ•ᴥ•ʔ";
    });

    describe("constructor", function () {
        it("should build a `WordSource` instance", function () {
            const wordSource = new WordSource(stubType);

            expect(wordSource.type).to.eql(stubType);
            expect(wordSource.client).to.be.undefined;
            expect(wordSource.initializing).to.be.instanceOf(Promise);
            expect(wordSource).to.be.instanceOf(WordSource);
        });
    });

    describe("#getPosts", function () {
        it("should throw a `Please specify an actual get photo for user implementation` error", function () {
            const wordSource = new WordSource(stubType);

            return wordSource.getPosts()
                .catch((error) => {
                    expect(error.message).to.match(/Please specify an actual postsGetter implementation/);
                });
        });
    });

    describe("#getPost", function () {
        it("should throw a `Please specify an actual get photo implementation` error", function () {
            const wordSource = new WordSource(stubType);

            return wordSource.getPost()
                .catch((error) => {
                    expect(error.message).to.match(/Please specify an actual postGetter implementation/);
                });
        });
    });
});
