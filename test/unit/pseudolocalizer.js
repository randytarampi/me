let describe = require("mocha").describe;
let it = require("mocha").it;
let expect = require("chai").expect;
let Pseudolocalizer = require("../../lib/pseudolocalizer");

describe("pseudolocalizer", () => {
	describe("#pseudolocalize", () => {
		it("should generate a bear by default", () => {
			let pseudolocalizer = new Pseudolocalizer();
			expect(pseudolocalizer.pseudolocalize("ᴥ")).to.equal("ʕつ•ᴥ•ʔつ");
		});
		it("should be configurable", () => {
			let pseudolocalizer = new Pseudolocalizer(2.5, "ʕつ", "ʔつ", " ", " ");
			expect(pseudolocalizer.pseudolocalize("• ᴥ •")).to.equal("ʕつ • ᴥ • ʔつ");
		});
		it("should respect the expansion factor", () => {
			let expansionFactor = 8;
			let pseudolocalizer = new Pseudolocalizer(expansionFactor);

			expect(pseudolocalizer.pseudolocalize("ᴥ")).to.equal("ʕつ•ᴥ•ʔつ");

			let requiredLength = " ᴥ ".length + "ʕつ".length + "ʔつ".length;
			expect(pseudolocalizer.pseudolocalize(" ᴥ ").length).to.equal(
				~~((" ᴥ ".length * expansionFactor - requiredLength) / 2) * 2
				+ requiredLength
			);
		});
		it("should truncate the input string and preserve the prefix, postfix, prePad and postPad if the input is small", () => {
			let pseudolocalizer = new Pseudolocalizer();
			expect(pseudolocalizer.pseudolocalize("ᴥ12")).to.equal("ʕつ•ᴥ•ʔつ");
		});
		it("should always show the prefix, postfix and the first characters of the input, prePad and postPad", () => {
			let pseudolocalizer = new Pseudolocalizer(1, "ᶘつ", "ᶅつ", " ", " ");
			expect(pseudolocalizer.pseudolocalize("◕ ᴥ ◕")).to.equal("ᶘつ ◕ ᶅつ");
		});
		it("should generate some serious pseudolocalizations", () => {
			let pseudolocalizer = new Pseudolocalizer(1.33, "\uFF62", "\uFF63", "\u00DF\u04DC\u06A3", "\u2B53\u4EB6\uACA1");
			expect(pseudolocalizer.pseudolocalize("ᴥ")).to.equal("｢ßᴥ⭓｣");
			expect(pseudolocalizer.pseudolocalize("hey")).to.equal("｢ßh⭓｣");
			expect(pseudolocalizer.pseudolocalize("This is a full sentence...")).to.equal("｢ßӜڣThis is a full sentence...⭓亶겡｣");
		});
	});
});
