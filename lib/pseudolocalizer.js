let util = require('util');

class Pseudolocalizer {
	/**
	 * Instantiates a Pseudolocalizer
	 * @constructor
	 * @param {number} relativeScale - Governs the relative size of the generated pseudolocalized string with respect to some input
	 * @param {string} prefix - The character that defines the start of a pseudolocalization
	 * @param {string} postfix - The character that defines the end of a pseudolocalization
	 * @param {string} prePad - The characters between the prefix and the input added to meet the length determined by relativeScale
	 * @param {string} postPad - The characters between the postfix and the input added to meet the length determined by relativeScale
	 */
	constructor(relativeScale, prefix, postfix, prePad, postPad) {
		if (relativeScale && (typeof relativeScale !== "number" || relativeScale < 0.5)) {
			throw new Error(util.format("relativeScale should be greater than 0.5, but is \"%s\" instead", relativeScale));
		}
		if (prePad !== undefined && !prePad) {
			throw new Error(util.format("prePad should be a non falsy string, but is \"%s\"", prePad));
		}
		if (postPad !== undefined && !postPad) {
			throw new Error(util.format("postPad should be a non falsy string, but is \"%s\"", prePad));
		}

		this.relativeScale = relativeScale || 1.33;
		this.prefix = prefix || "ʕつ";
		this.postfix = postfix || "ʔつ";
		this.prePad = prePad || "•";
		this.postPad = postPad || "•";
	}

	/**
	 * A convenience constructor featuring Chinese, Japansese and Korean characters
	 * @constructor
	 * @param {number} relativeScale - Governs the relative size of the generated pseudolocalized string with respect to some input
	 * @param {string} prefix - The character that defines the start of a pseudolocalization
	 * @param {string} postfix - The character that defines the end of a pseudolocalization
	 * @param {string} prePad - The characters between the prefix and the input added to meet the length determined by relativeScale
	 * @param {string} postPad - The characters between the postfix and the input added to meet the length determined by relativeScale
	 */
	static CJK(relativeScale, prefix, postfix, prePad, postPad) {
		let open = "\uFF5F";
		let close = "\uFF60";
		let CJKPadding = "纬横糸씨"; // From "纬", "横糸", and "씨"
		return new Pseudolocalizer(relativeScale || 0.8, prefix || open, postfix || close, prePad || CJKPadding, postPad || CJKPadding);
	}

	/**
	 * A convenience constructor featuring Latin, Cyrillic, and Greek characters
	 * @constructor
	 * @param {number} relativeScale - Governs the relative size of the generated pseudolocalized string with respect to some input
	 * @param {string} prefix - The character that defines the start of a pseudolocalization
	 * @param {string} postfix - The character that defines the end of a pseudolocalization
	 * @param {string} prePad - The characters between the prefix and the input added to meet the length determined by relativeScale
	 * @param {string} postPad - The characters between the postfix and the input added to meet the length determined by relativeScale
	 */
	static LCG(relativeScale, prefix, postfix, prePad, postPad) {
		let open = "«";
		let close = "»";
		let LCGPadding = "sгυ"; // From "subtegmine", "гав", and "υφάδι"
		return new Pseudolocalizer(relativeScale || 1.3, prefix || open, postfix || close, prePad || LCGPadding, postPad || LCGPadding);
	}

	/**
	 * A convenience constructor featuring Arabic, Farsi (Persian?), and Bengali characters
	 * @constructor
	 * @param {number} relativeScale - Governs the relative size of the generated pseudolocalized string with respect to some input
	 * @param {string} prefix - The character that defines the start of a pseudolocalization
	 * @param {string} postfix - The character that defines the end of a pseudolocalization
	 * @param {string} prePad - The characters between the prefix and the input added to meet the length determined by relativeScale
	 * @param {string} postPad - The characters between the postfix and the input added to meet the length determined by relativeScale
	 */
	static AFB(relativeScale, prefix, postfix, prePad, postPad) {
		let open = "『";
		let close = "』";
		let AFBPadding = "نپব"; // From "نسيج" and "پود" and "বুনন"
		return new Pseudolocalizer(relativeScale || 1.5, prefix || open, postfix || close, prePad || AFBPadding, postPad || AFBPadding);
	}

	/**
	 * A convenience constructor featuring a mix of characters
	 * @constructor
	 * @param {number} relativeScale - Governs the relative size of the generated pseudolocalized string with respect to some input
	 * @param {string} prefix - The character that defines the start of a pseudolocalization
	 * @param {string} postfix - The character that defines the end of a pseudolocalization
	 * @param {string} prePad - The characters between the prefix and the input added to meet the length determined by relativeScale
	 * @param {string} postPad - The characters between the postfix and the input added to meet the length determined by relativeScale
	 */
	static mix(relativeScale, prefix, postfix, prePad, postPad) {
		return new Pseudolocalizer(relativeScale || 1.5, prefix || "\uFF62", postfix || "\uFF63", prePad || "\u00DF\u04DC\u06A3", postPad || "\u2B53\u4EB6\uACA1");
	}

	/**
	 * @param {string} string - The string to be pseudolocalized
	 */
	pseudolocalize(string) {
		if ((typeof string) !== "string") {
			throw new Error(util.format("Argument \"%s\" should be of type \"string\", but is \"%s\" instead", string, typeof string));
		}

		let computedPrePad = this.prePad;
		let computedPostPad = this.postPad;
		let stringLength = string.length;
		let pseudoStringLength = ~~(string.length * this.relativeScale);
		let paddingLength = ~~((pseudoStringLength - this.prefix.length - this.postfix.length - stringLength) / 2);

		if (paddingLength < 1) {
			stringLength = ~~(string.length * paddingLength);
			stringLength = stringLength < 1 ? 1 : stringLength;
			paddingLength = 1;
			computedPrePad = generatePadding(computedPrePad, paddingLength);
			computedPostPad = generatePadding(computedPostPad, paddingLength);
		} else {
			computedPrePad = generatePadding(computedPrePad, paddingLength);
			computedPostPad = generatePadding(computedPostPad, paddingLength);
		}

		return this.prefix + computedPrePad + string.slice(0, stringLength) + computedPostPad + this.postfix;
	}
}

/**
 * @param {string} padding - The string to be duplicated
 */
function* paddingGenerator(padding) {
	var computedPadding = padding;
	while (true) {
		computedPadding += computedPadding;
		yield computedPadding;
	}
}

/**
 * @param {string} padding - The base string to be duplicated to create the padding string
 * @param {number} length - The length of the desired string
 */
function generatePadding(padding, length) {
	let padded = paddingGenerator(padding);
	while (padding.length < length) {
		padding = padded.next().value;
	}
	return padding.slice(0, length);
}

module.exports = Pseudolocalizer;