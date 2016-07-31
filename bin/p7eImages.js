#!/usr/bin/env node
let commander = require("commander");
let Pseudoimager = require("../lib/pseudoimager");

commander
	.version("0.0.1")
	.usage("[options] <sourceDirectory> [destinationDirectory]")
	.description("ʕつ◕ᴥ◕ʔつ 📷 → Your application's pseudolocales' image folders")
	.option("-p --preset <preset>", "Use a preset pseudolocalizer {retina}", /^(retina)$/gm)
	.action((sourceDirectory, destinationDirectory) => {
		if (!sourceDirectory) {
			console.error("Please supply a sourceDirectory");
			process.exit(1);
		}

		let pseudoimager;
		if (commander.preset) {
			if (typeof commander.preset !== "string") {
				console.error("Please specify a proper preset");
				process.exit(1);
			}
			pseudoimager = Pseudoimager.retina(sourceDirectory, destinationDirectory);
		} else {
			pseudoimager = new Pseudoimager(sourceDirectory, destinationDirectory);
		}

		return pseudoimager.generatePseudoImages()
			.then(() => {
				process.exit(0);
			})
			.catch((error) => {
				console.error(error);
				process.exit(1);
			});
	});