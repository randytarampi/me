#!/usr/bin/env node

const path = require("path");
const commander = require("commander");
const Pseudoimage = require("../lib/pseudoimage");
const packageJson = require("../package.json");

let pseudoimage;

commander
    .version(packageJson.version)
    .usage("[options] <sourceImagePath> [destinationImagePath]")
    .description("ʕつ◕ᴥ◕ʔつ 📷 → pseudoimages")
    .option("-p --preset <preset>", "Use a preset pseudolocalizer {retina|half}", /^(retina|half)$/gm)
    .action((sourceImagePath, destinationImagePath) => {
        if (!commander.args.length) {
            console.error("Please supply a sourceImagePath"); // eslint-disable-line no-console
            process.exit(1);
        }

        if (commander.args.length < 3) {
            destinationImagePath = path.join(path.dirname(sourceImagePath), `${path.basename(sourceImagePath, path.extname(sourceImagePath))}.pseudoimage${path.extname(sourceImagePath)}`);
        }

        if (commander.preset) {
            if (typeof commander.preset !== "string") {
                console.error("Please specify a proper preset"); // eslint-disable-line no-console
                process.exit(1);
            }
            pseudoimage = Pseudoimage[commander.preset]();
        } else {
            pseudoimage = new Pseudoimage();
        }

        return pseudoimage.generatePseudoImage(sourceImagePath, destinationImagePath)
            .then(() => {
                process.exit(0);
            })
            .catch(error => {
                console.error(`Failed to generate pseudoimage (${destinationImagePath}) from source (${sourceImagePath}) with error:\n`, error); // eslint-disable-line no-console
                process.exit(1);
            });
    });

commander.parse(process.argv);
