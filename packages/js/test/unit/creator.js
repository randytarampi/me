import {expect} from "chai";
import Creator from "../../lib/creator";

describe("Creator", () => {
    describe(".fromJS", () => {
        it("should instantiate a Creator object from some plain JS Object", () => {
            const creatorJs = {
                id: -1,
                username: "ʕ•ᴥ•ʔ",
                name: "ʕ•ᴥ•ʔ",
                sourceUrl: "woof://woof.woof/woof/woof/woof",
                imageUrl: "meow://meow.meow/meow/meow/meow"
            };
            const instantiatedCreator = Creator.fromJS(creatorJs);

            expect(instantiatedCreator).to.be.ok;
            expect(instantiatedCreator.id).to.eql(creatorJs.id);
            expect(instantiatedCreator.username).to.eql(creatorJs.username);
            expect(instantiatedCreator.name).to.eql(creatorJs.name);
            expect(instantiatedCreator.sourceUrl).to.eql(creatorJs.sourceUrl);
            expect(instantiatedCreator.imageUrl).to.eql(creatorJs.imageUrl);
        });
    });
});
