const expect = require("chai").expect;
const Creator = require("../../lib/creator");

describe("Creator", () => {
    describe(".fromJSON", () => {
        it("should instantiate a Creator object from some plain JS Object", () => {
            const creatorJSON = {
                id: -1,
                username: "ʕ•ᴥ•ʔ",
                name: "ʕ•ᴥ•ʔ",
                sourceUrl: "woof://woof.woof/woof/woof/woof"
            };

            expect(new Creator(creatorJSON.id, creatorJSON.username, creatorJSON.name, creatorJSON.sourceUrl)).to.eql(Creator.fromJSON(creatorJSON));
        });
    });
});
