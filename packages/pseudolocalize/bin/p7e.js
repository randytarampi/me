#!/usr/bin/env node

const commander = require("commander");
const Pseudolocalizer = require("../lib/pseudolocalizer");
const packageJson = require("../package.json");

commander
    .version(packageJson.version)
    .usage("[options] <strings...>")
    .description("Text-to-ʕ•ᴥ•ʔ translations for strings")
    .option("-p, --preset <preset>", "Use a preset pseudolocalizer {CJK, LCG, AFB, mix}", /^(CJK|LCG|AFB|mix)$/gm)
    .option("-r, --relativeScale <number>", "Use a custom relativeScale", /^\d+$/gm)
    .option("-s, --prefix <string>", "Use a custom prefix")
    .option("-e, --postfix <string>", "Use a custom postfix")
    .option("--prePad <string>", "Use a custom pre padding")
    .option("--postPad <string>", "Use a custom post padding")
    .parse(process.argv);

let pseudolocalizer;

if (commander.args.length === 0) {
    console.error("Please supply a value"); // eslint-disable-line no-console
    process.exit(1);
}

const parsedRelativeScale = parseFloat(commander.relativeScale);

if (commander.preset) {
    if (typeof commander.preset !== "string") {
        console.error("Please specify a proper preset"); // eslint-disable-line no-console
        process.exit(1);
    }
    pseudolocalizer = Pseudolocalizer[commander.preset](parsedRelativeScale, commander.prefix, commander.postfix, commander.prePad, commander.postPad);
} else {
    pseudolocalizer = new Pseudolocalizer(parsedRelativeScale, commander.prefix, commander.postfix, commander.prePad, commander.postPad);
}

commander.args.forEach(function (string) {
    console.log(pseudolocalizer.pseudolocalize(string)); // eslint-disable-line no-console
});
