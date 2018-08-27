const fs = require("fs");
const path = require("path");
const {expect} = require("chai");
const childProcess = require("child_process");
const {rmrf} = require("../../util");

describe("p7eImages", function () {
    this.timeout(60000);

    it("throws an error when given no input", function () {
        const stubArguments = [];

        return new Promise((resolve, reject) => {
            childProcess.execFile(path.join(__dirname, "../../../bin/p7eImages.js"), stubArguments, (error, stdout, stderr) => {
                try {
                    expect(error).to.be.ok;
                    expect(stdout).to.eql("");
                    expect(stderr).to.match(/Please supply a sourceDirectory/);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            });
        });
    });

    it("throws an error when given a non-existent sourceDirectory", function () {
        const sourceDirectory = path.join(__dirname, "../../resources/woof");
        const stubArguments = [
            sourceDirectory
        ];

        return new Promise((resolve, reject) => {
            childProcess.execFile(path.join(__dirname, "../../../bin/p7eImages.js"), stubArguments, (error, stdout, stderr) => {
                try {
                    expect(error).to.be.ok;
                    expect(stdout).to.eql("");
                    expect(stderr).to.match(/ENOENT/);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            });
        });
    });

    it("sets a default `destinationPath`", function () {
        const sourceDirectory = path.join(__dirname, "../../resources/subdirectory");
        const stubArguments = [
            sourceDirectory
        ];
        const expectedDestinationDirectory = `${sourceDirectory}-pseudoimages`;

        return new Promise((resolve, reject) => {
            childProcess.execFile(path.join(__dirname, "../../../bin/p7eImages.js"), stubArguments, (error, stdout, stderr) => {
                try {
                    expect(error).to.eql(null);
                    expect(stdout).to.eql("");
                    expect(stderr).to.eql("");
                    expect(fs.lstatSync(expectedDestinationDirectory).isDirectory()).to.eql(true);
                    rmrf(expectedDestinationDirectory);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            });
        });
    });

    it("accepts a`destinationPath`", function () {
        const sourceDirectory = path.join(__dirname, "../../resources/subdirectory");
        const destinationDirectory = `${sourceDirectory}-pseudoimages-manual`;
        const stubArguments = [
            sourceDirectory,
            destinationDirectory
        ];

        return new Promise((resolve, reject) => {
            childProcess.execFile(path.join(__dirname, "../../../bin/p7eImages.js"), stubArguments, (error, stdout, stderr) => {
                try {
                    expect(error).to.eql(null);
                    expect(stdout).to.eql("");
                    expect(stderr).to.eql("");
                    expect(fs.lstatSync(destinationDirectory).isDirectory()).to.eql(true);
                    rmrf(destinationDirectory);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            });
        });
    });

    describe("preset", function () {
        it("throws an error when given a bad preset", function () {
            const sourceDirectory = path.join(__dirname, "../../resources/subdirectory");
            const stubArguments = [
                "--preset=foo",
                sourceDirectory
            ];

            return new Promise((resolve, reject) => {
                childProcess.execFile(path.join(__dirname, "../../../bin/p7eImages.js"), stubArguments, (error, stdout, stderr) => {
                    try {
                        expect(error).to.be.ok;
                        expect(stdout).to.eql("");
                        expect(stderr).to.match(/Please specify a proper preset/);
                        resolve();
                    } catch (expectationError) {
                        reject(expectationError);
                    }
                });
            });
        });

        it("uses a specified preset", function () {
            const sourceDirectory = path.join(__dirname, "../../resources/subdirectory");
            const destinationDirectory = path.join(__dirname, "../../resources/subdirectory-pseudoimages-half");
            const stubArguments = [
                "--preset=half",
                sourceDirectory,
                destinationDirectory
            ];

            return new Promise((resolve, reject) => {
                childProcess.execFile(path.join(__dirname, "../../../bin/p7eImages.js"), stubArguments, (error, stdout, stderr) => {
                    try {
                        expect(error).to.eql(null);
                        expect(stdout).to.eql("");
                        expect(stderr).to.eql("");
                        rmrf(destinationDirectory);
                        resolve();
                    } catch (expectationError) {
                        reject(expectationError);
                    }
                });
            });
        });

        it("defaults to no preset", function () {
            const sourceDirectory = path.join(__dirname, "../../resources/subdirectory");
            const destinationDirectory = path.join(__dirname, "../../resources/subdirectory-pseudoimages-default");
            const stubArguments = [
                sourceDirectory,
                destinationDirectory
            ];

            return new Promise((resolve, reject) => {
                childProcess.execFile(path.join(__dirname, "../../../bin/p7eImages.js"), stubArguments, (error, stdout, stderr) => {
                    try {
                        expect(error).to.eql(null);
                        expect(stdout).to.eql("");
                        expect(stderr).to.eql("");
                        rmrf(destinationDirectory);
                        resolve();
                    } catch (expectationError) {
                        reject(expectationError);
                    }
                });
            });
        });
    });
});
