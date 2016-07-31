let fs = require("fs");
let path = require("path");
let lwip = require("lwip");

class Pseudoimager {
	/**
	 * Instantiates a Pseudoimager
	 * @constructor
	 * @param {string} sourceDirectory - The directory to create pseudoimages for
	 * @param {string} destinationDirectory - The destination to place the pseudoimages in
	 * @param {number} relativeScale - Scales the pseudoimage size relative to the source image, defaults to 1
	 */
	constructor (sourceDirectory, destinationDirectory, relativeScale) {
		this.sourceDirectory = sourceDirectory ? path.normalize(sourceDirectory) : null;
		this.destinationDirectory = destinationDirectory ? path.normalize(destinationDirectory) : null;
		this.relativeScale = relativeScale || 1;
	}

	/**
	 * Create an image that are the same size of some source image (a pseudoimage) and place that at some destination
	 * @param {string} sourcePath - The source image for the pseudolocalization
	 * @param {string} destinationPath - The destination for the pseudoimage
	 * @param {number} relativeScale - Scales the pseudoimage size relative to the source image, defaults to 1
	 * @return {Promise} - a promise that resolves if we create a pseudoimage at destinationPath, and is rejected otherwise
	 */
	generatePseudoImage(sourcePath, destinationPath, relativeScale) {
		sourcePath = path.normalize(sourcePath);
		destinationPath = path.normalize(destinationPath);
		relativeScale = relativeScale || this.relativeScale;

		return new Promise((resolve, reject) => {
			lwip.open(sourcePath, (error, image) => {
				if (error) {
					reject(error);
					return;
				}

				image.batch()
					.scale(relativeScale)
					.blur(2)
					.flip("xy")
					.writeFile(destinationPath, (error) => {
						if (error) {
							reject(error);
							return;
						}

						resolve();
					});
			});
		});
	}

	/**
	 * Create pseudoimages for each image in the sourceImagePath, recursively
	 * @param {string} sourceDirectory - The directory to create pseudoimages for
	 * @param {string} destinationDirectory - The destination to place the pseudoimages in
	 * @param {number} relativeScale - Scales the pseudoimage size relative to the source image, defaults to 1
	 * @return {Promise} - a promise that resolves if we create all pseudoimages, and is rejected otherwise
	 */
	generatePseudoImages(sourceDirectory, destinationDirectory, relativeScale) {
		sourceDirectory = sourceDirectory ? path.normalize(sourceDirectory) : this.sourceDirectory;
		destinationDirectory = destinationDirectory ? path.normalize(destinationDirectory) : this.destinationDirectory;
		relativeScale = relativeScale || this.relativeScale;
		let that = this;
		let files = fs.readdirSync(sourceDirectory);

		return Promise.all(files.map((file) => {
			let source = path.join(sourceDirectory, file);
			let destination = path.join(destinationDirectory, file);

			if (fs.lstatSync(source).isDirectory()) {
				return that.generatePseudoImages(source, destination, relativeScale);
			}
			return that.generatePseudoImage(source, destination, relativeScale);
		}))
			.then(() => {});
	}
}

module.exports = Pseudoimager;