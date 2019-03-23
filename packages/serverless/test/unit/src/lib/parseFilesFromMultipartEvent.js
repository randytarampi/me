import {expect} from "chai";
import fs from "fs";
import path from "path";
import {parseFilesFromMultipartEvent} from "../../../../src/lib/parseFilesFromMultipartEvent";

const ensureBodyIsMultipartFormData = file => file.replace(/\n/g, "\r\n");

describe("parseFilesFromMultipartEvent", function () {
    let stubEvent;

    beforeEach(function (done) {
        fs.readFile(path.join(__dirname, "../../../resources/upload.json.single"), "utf8", (error, file) => {
            if (error) {
                return done(error);
            }

            stubEvent = {
                body: ensureBodyIsMultipartFormData(file),
                headers: {
                    "Content-Type": "multipart/form-data; boundary=------------------------a1a1e9e776c3734b"
                },
                isBase64Encoded: false
            };

            done();
        });
    });

    it("parses a file (string)", function () {
        return parseFilesFromMultipartEvent(stubEvent)
            .then(parsedFileAndMetadata => {
                expect(parsedFileAndMetadata.file["berlin.json"].data).to.be.a("string");
                expect(parsedFileAndMetadata.file["berlin.json"].encoding).to.eql("7bit");
                expect(parsedFileAndMetadata.file["berlin.json"].contentType).to.eql("application/octet-stream");
            });
    });

    it("parses a file (image)", function () {
        stubEvent.body = ensureBodyIsMultipartFormData(fs.readFileSync(path.join(__dirname, "../../../resources/upload.image.single"), "utf8"));
        stubEvent.headers["Content-Type"] = "multipart/form-data; boundary=------------------------5dc2a512cc3537aa";

        return parseFilesFromMultipartEvent(stubEvent)
            .then(parsedFileAndMetadata => {
                expect(parsedFileAndMetadata.file["ʕつ•ᴥ•ʔつ-square-knockout-orange.png"].data).to.be.a("string");
                expect(parsedFileAndMetadata.file["ʕつ•ᴥ•ʔつ-square-knockout-orange.png"].encoding).to.eql("7bit");
                expect(parsedFileAndMetadata.file["ʕつ•ᴥ•ʔつ-square-knockout-orange.png"].contentType).to.eql("application/octet-stream");
            });
    });

    it("parses multiple files", function () {
        stubEvent.body = ensureBodyIsMultipartFormData(fs.readFileSync(path.join(__dirname, "../../../resources/upload.json.multiple"), "utf8"));
        stubEvent.headers["Content-Type"] = "multipart/form-data; boundary=------------------------81905c4e69b81594";

        return parseFilesFromMultipartEvent(stubEvent)
            .then(parsedFileAndMetadata => {
                ["berlin.json", "munich.json", "vancouver.json"].forEach(locationFile => {
                    expect(parsedFileAndMetadata.file[locationFile].data).to.be.a("string");
                    expect(parsedFileAndMetadata.file[locationFile].encoding).to.eql("7bit");
                    expect(parsedFileAndMetadata.file[locationFile].contentType).to.eql("application/octet-stream");
                });
            });
    });

    it("errors out gracefully", function () {
        delete stubEvent.headers["Content-Type"];
        delete stubEvent.headers["content-type"];

        return parseFilesFromMultipartEvent(stubEvent)
            .then(() => {
                throw new Error("Wtf? This should've thrown");
            })
            .catch(error => {
                expect(error.message).to.eql("Missing Content-Type");
            });
    });

    it("accepts the `content-type` header", function () {
        delete stubEvent.headers["Content-Type"];
        stubEvent.headers["content-type"] = "multipart/form-data; boundary=------------------------a1a1e9e776c3734b";

        return parseFilesFromMultipartEvent(stubEvent)
            .then(parsedFileAndMetadata => {
                expect(parsedFileAndMetadata.file["berlin.json"].data).to.be.a("string");
                expect(parsedFileAndMetadata.file["berlin.json"].encoding).to.eql("7bit");
                expect(parsedFileAndMetadata.file["berlin.json"].contentType).to.eql("application/octet-stream");
            });
    });

    it("accepts the `Content-Type` header", function () {
        delete stubEvent.headers["content-type"];
        stubEvent.headers["Content-Type"] = "multipart/form-data; boundary=------------------------a1a1e9e776c3734b";

        return parseFilesFromMultipartEvent(stubEvent)
            .then(parsedFileAndMetadata => {
                expect(parsedFileAndMetadata.file["berlin.json"].data).to.be.a("string");
                expect(parsedFileAndMetadata.file["berlin.json"].encoding).to.eql("7bit");
                expect(parsedFileAndMetadata.file["berlin.json"].contentType).to.eql("application/octet-stream");
            });
    });
});
