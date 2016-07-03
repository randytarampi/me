#!/usr/bin/env node
let commander = require("commander");
let Pseudolocalizer = require("../lib/pseudolocalizer");

commander
	.version("0.0.1")
	.usage("[options] <strings...>")
	.description("Text-to-ʕ•ᴥ•ʔ translations for strings")
	.option("-p --preset <preset>", "Use a preset pseudolocalizer {CJK, LCG, AFB, mix}", /^(CJK|LCG|AFB|mix)$/gm)
	.option("-r --relativeScale <number>", "Use a custom relativeScale", /^\d+$/gm)
	.option("-s, --prefix <string>", "Use a custom prefix")
	.option("-e, --postfix <string>", "Use a custom postfix")
	.option("--prePad <string>", "Use a custom pre padding")
	.option("--postPad <string>", "Use a custom post padding")
	.parse(process.argv);

let pseudolocalizer;

if (commander.args.length === 0) {
	console.error("Please supply a value");
	process.exit(1);
}

let parsedRelativeScale = parseInt(commander.relativeScale, 10);

if (commander.preset) {
	if (typeof commander.preset !== "string") {
		console.error("Please specify a proper preset");
		process.exit(1);
	}
	pseudolocalizer = Pseudolocalizer[commander.preset](parsedRelativeScale, commander.prefix, commander.postfix, commander.prePad, commander.postPad);
} else {
	pseudolocalizer = new Pseudolocalizer(parsedRelativeScale, commander.prefix, commander.postfix, commander.prePad, commander.postPad);
}

commander.args.forEach(function (string) {
	console.log(pseudolocalizer.pseudolocalize(string));
});