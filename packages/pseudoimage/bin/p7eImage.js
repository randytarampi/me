#!/usr/bin/env node

"use strict";

let commander = require("commander");
let Pseudoimage = require("../lib/pseudoimage");

commander
    .version("0.0.1")
    .usage("[options] <sourceImage> [destinationImage]")
    .description("ʕつ◕ᴥ◕ʔつ 📷 → pseudo images")
    .option("-p --preset <preset>", "Use a preset pseudolocalizer {retina}", /^(retina)$/gm)
    .action((sourceImage, destinationImage) => {
        if (!sourceImage) {
            console.error("Please supply a sourceImage"); // eslint-disable-line no-console
            process.exit(1);
        }

        let pseudoimage;
        if (commander.preset) {
            if (typeof commander.preset !== "string") {
                console.error("Please specify a proper preset"); // eslint-disable-line no-console
                process.exit(1);
            }
            pseudoimage = Pseudoimage.retina();
        } else {
            pseudoimage = new Pseudoimage();
        }

        return pseudoimage.generatePseudoImage(sourceImage, destinationImage)
            .then(() => {
                process.exit(0);
            })
            .catch((error) => {
                console.error(error); // eslint-disable-line no-console
                process.exit(1);
            });
    });
