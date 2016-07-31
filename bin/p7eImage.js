#!/usr/bin/env node
let commander = require("commander");
let Pseudoimager = require("../lib/pseudoimager");

commander
	.version("0.0.1")
	.usage("[options] <sourceImage> [destinationImage]")
	.description("ʕつ◕ᴥ◕ʔつ 📷 → pseudo images")
	.option("-p --preset <preset>", "Use a preset pseudolocalizer {retina}", /^(retina)$/gm)
	.action((sourceImage, destinationImage) => {
		if (!sourceImage) {
			console.error("Please supply a sourceImage");
			process.exit(1);
		}

		let pseudoimager;
		if (commander.preset) {
			if (typeof commander.preset !== "string") {
				console.error("Please specify a proper preset");
				process.exit(1);
			}
			pseudoimager = Pseudoimager.retina();
		} else {
			pseudoimager = new Pseudoimager();
		}

		return pseudoimager.generatePseudoImage(sourceImage, destinationImage)
			.then(() => {
				process.exit(0);
			})
			.catch((error) => {
				console.error(error);
				process.exit(1);
			});
	});