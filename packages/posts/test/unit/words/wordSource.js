const expect = require("chai").expect;
const WordSource = require("../../../words/wordSource");

describe("WordSource", () => {
    before(() => {
        process.env._API_KEY = "woof";
        process.env._API_SECRET = "meow";
    });

    after(() => {
        delete process.env._API_KEY;
        delete process.env._API_SECRET;
    });

    describe("constructor", () => {
        it("should build a `WordSource` instance", () => {
            const wordSource = new WordSource();

            expect(wordSource.type).to.eql(undefined);
            expect(wordSource.client).to.be.undefined;
            expect(wordSource.initializing).to.be.instanceOf(Promise);
            expect(wordSource).to.be.instanceOf(WordSource);
        });

        it("should accept an `initalizerPromise`", () => {
            const wordSource = new WordSource("Woof", "Grr", Promise.resolve("Meow"));

            expect(wordSource.type).to.eql("Woof");
            expect(wordSource.client).to.eql("Grr");
            expect(wordSource.initializing).to.be.instanceOf(Promise);
            expect(wordSource).to.be.instanceOf(WordSource);

            return wordSource.initializing
                .then((initializingResult) => {
                    expect(initializingResult).to.eql(wordSource);
                    expect(initializingResult.client).to.eql("Meow");
                });
        });
    });

    describe("#getWordPosts", () => {
        it("should throw a `Please specify an actual get word posts implementation` error", () => {
            const wordSource = new WordSource();

            return wordSource.getWordPosts()
                .catch((error) => {
                    expect(error.message).to.match(/Please specify an actual get word posts implementation/);
                });
        });
    });

    describe("#getWordPost", () => {
        it("should throw a `Please specify an actual get word post implementation` error", () => {
            const wordSource = new WordSource();

            return wordSource.getWordPost()
                .catch((error) => {
                    expect(error.message).to.match(/Please specify an actual get word post implementation/);
                });
        });
    });

    describe("#jsonToPost", () => {
        it("should throw a `Please specify an actual Post transformation` error", () => {
            const wordSource = new WordSource();

            expect(wordSource.jsonToPost).to.throw(/Please specify an actual Post transformation/);
        });
    });

    describe(".isEnabled", () => {
        it("should throw a `Please specify an actual isEnabled check` error", () => {
            const wordSource = new WordSource();

            expect(() => wordSource.isEnabled).to.throw(/Please specify an actual isEnabled check/);
        });
    });
});
