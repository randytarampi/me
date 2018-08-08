import {expect} from "chai";
import WordSource from "../../../words/wordSource";

let stubType;

describe("WordSource", () => {
    beforeEach(() => {
        stubType = "ʕ•ᴥ•ʔ";
    });

    describe("constructor", () => {
        it("should build a `WordSource` instance", () => {
            const wordSource = new WordSource(stubType);

            expect(wordSource.type).to.eql(stubType);
            expect(wordSource.client).to.be.undefined;
            expect(wordSource.initializing).to.be.instanceOf(Promise);
            expect(wordSource).to.be.instanceOf(WordSource);
        });
    });

    describe("#getPosts", () => {
        it("should throw a `Please specify an actual get photo for user implementation` error", () => {
            const wordSource = new WordSource(stubType);

            return wordSource.getPosts()
                .catch((error) => {
                    expect(error.message).to.match(/Please specify an actual postsGetter implementation/);
                });
        });
    });

    describe("#getPost", () => {
        it("should throw a `Please specify an actual get photo implementation` error", () => {
            const wordSource = new WordSource(stubType);

            return wordSource.getPost()
                .catch((error) => {
                    expect(error.message).to.match(/Please specify an actual postGetter implementation/);
                });
        });
    });
});
