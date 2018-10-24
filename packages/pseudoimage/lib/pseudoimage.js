const fs = require("fs");
const path = require("path");
const lwip = require("@mcph/lwip");
const mkdirp = require("mkdirp");

class Pseudoimage {
    /**
     * Instantiates a Pseudoimage
     * @constructor
     * @param {string} sourceDirectory - The directory to create pseudoimages for
     * @param {string} destinationDirectory - The destination to place the pseudoimages in
     * @param {function} transformationFunction - some image transformation function that takes an image, destination, success and failure callbacks
     */
    constructor(sourceDirectory, destinationDirectory, transformationFunction) {
        this.sourceDirectory = sourceDirectory ? path.normalize(sourceDirectory) : null;
        this.destinationDirectory = destinationDirectory ? path.normalize(destinationDirectory) : null;
        this.transformationFunction = transformationFunction || defaultImageTransformation;
    }

    /**
     * A convenience constructor that creates retinized images to help test for unprescribed image sizes
     * @constructor
     * @param {string} sourceDirectory - The directory to create pseudoimages for
     * @param {string} destinationDirectory - The destination to place the pseudoimages in
     */
    static retina(sourceDirectory, destinationDirectory) {
        return new Pseudoimage(sourceDirectory, destinationDirectory, retinizedImageTransformation);
    }

    /**
     * A convenience constructor that creates half-sized images to help test for unprescribed image sizes
     * @constructor
     * @param {string} sourceDirectory - The directory to create pseudoimages for
     * @param {string} destinationDirectory - The destination to place the pseudoimages in
     */
    static half(sourceDirectory, destinationDirectory) {
        return new Pseudoimage(sourceDirectory, destinationDirectory, halfImageTransformation);
    }

    /**
     * Create an image that are the same size of some source image (a pseudoimage) and place that at some destination
     * @param {string} sourcePath - The source image for the pseudolocalization
     * @param {string} destinationPath - The destination for the pseudoimage
     * @param {function} transformationFunction - some image transformation function that takes an image, destination, success and failure callbacks
     * @return {Promise} - a promise that resolves if we create a pseudoimage at destinationPath and is rejected otherwise
     */
    generatePseudoImage(sourcePath, destinationPath, transformationFunction) {
        sourcePath = path.normalize(sourcePath);
        destinationPath = path.normalize(destinationPath);
        transformationFunction = transformationFunction || this.transformationFunction;

        const destinationDirectory = path.dirname(destinationPath);

        return Promise.all([
            new Promise((resolve, reject) => {
                fs.lstat(sourcePath, (error, lstat) => {
                    if (error) {
                        return reject(error);
                    }

                    if (!lstat.isFile()) {
                        return reject(new Error(`${sourcePath} must be a file`));
                    }

                    return resolve(lstat);
                });
            }),
            mkdirpDestinationDirectoryIfRequired(destinationDirectory)
        ]).then(() => {
            return new Promise((resolve, reject) => {
                lwip.open(sourcePath, (error, image) => {
                    if (error) {
                        return reject(error);
                    }

                    transformationFunction(image, destinationPath, resolve, reject);
                });
            });
        });
    }

    /**
     * Create pseudoimages for each image in the sourceImagePath, recursively
     * @param {string} sourceDirectory - The directory to create pseudoimages for
     * @param {string} destinationDirectory - The destination to place the pseudoimages in
     * @param {function} transformationFunction - some image transformation function that takes an image, destination, success and failure callbacks
     * @return {Promise} - a promise that resolves if we create all pseudoimages and is rejected otherwise
     */
    generatePseudoImages(sourceDirectory, destinationDirectory, transformationFunction) {
        sourceDirectory = sourceDirectory ? path.normalize(sourceDirectory) : this.sourceDirectory;
        destinationDirectory = destinationDirectory ? path.normalize(destinationDirectory) : this.destinationDirectory;

        return new Promise((resolve, reject) => {
            fs.readdir(sourceDirectory, (error, files) => {
                if (error) {
                    return reject(error);
                }

                return resolve(files);
            });
        })
            .then(files => Promise.all(files.map(file => {
                const source = path.join(sourceDirectory, file);
                const destination = path.join(destinationDirectory, file);

                return Promise.all([
                    new Promise((resolve, reject) => {
                        fs.lstat(source, (error, sourceLstat) => {
                            if (error) {
                                return reject(error);
                            }
                            return resolve(sourceLstat);
                        });
                    }),
                    mkdirpDestinationDirectoryIfRequired(destinationDirectory)
                ]).then(([sourceLstat]) => {
                    if (sourceLstat.isDirectory()) {
                        return this.generatePseudoImages(source, destination, transformationFunction);
                    } else if (sourceLstat.isFile()) {
                        return this.generatePseudoImage(source, destination, transformationFunction);
                    } else {
                        throw new Error(`Source ${source} is neither a file nor directory (${sourceLstat.mode})`);
                    }
                });
            })));

    }
}

/**
 * Applies a gaussian blur on an image with σ = 2 and then flips the image on the vertical and horizontal.
 * @param {Image} image - the image we're working on
 * @param {string} destinationPath - The path for the pseudoimage
 * @param {function} successCallback - called on success, with no return value
 * @param {function} errorCallback - called on failure, returns an error
 */
function defaultImageTransformation(image, destinationPath, successCallback, errorCallback) {
    image.batch()
        .blur(2)
        .flip("xy")
        .writeFile(destinationPath, (error) => {
            if (error) {
                return errorCallback(error);
            }

            successCallback();
        });
}

/**
 * Enlarges the image by 2x, applies a gaussian blur on an image with σ = 2 and then flips the image on the vertical and horizontal.
 * @param {Image} image - the image we're working on
 * @param {string} destinationPath - The path for the pseudoimage
 * @param {function} successCallback - called on success, with no return value
 * @param {function} errorCallback - called on failure, returns an error
 */
function retinizedImageTransformation(image, destinationPath, successCallback, errorCallback) {
    image.batch()
        .scale(2)
        .blur(2)
        .flip("xy")
        .writeFile(destinationPath, (error) => {
            if (error) {
                return errorCallback(error);
            }

            successCallback();
        });
}

/**
 * Reduces the image by 2x, applies a gaussian blur on an image with σ = 2 and then flips the image on the vertical and horizontal.
 * @param {Image} image - the image we're working on
 * @param {string} destinationPath - The path for the pseudoimage
 * @param {function} successCallback - called on success, with no return value
 * @param {function} errorCallback - called on failure, returns an error
 */
function halfImageTransformation(image, destinationPath, successCallback, errorCallback) {
    image.batch()
        .scale(0.5)
        .blur(2)
        .flip("xy")
        .writeFile(destinationPath, (error) => {
            if (error) {
                return errorCallback(error);
            }

            successCallback();
        });
}

module.exports = Pseudoimage;

const mkdirpDestinationDirectoryIfRequired = destinationDirectory => new Promise((resolve, reject) => {
    fs.lstat(destinationDirectory, error => {
        if (error) {
            if (error.code === "ENOENT") {
                return mkdirp(destinationDirectory, error => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve();
                });
            } else {
                return reject(error);
            }
        }

        return resolve();
    });
});
