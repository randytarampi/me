import {expect} from "chai";
import * as versionHeader from "../../../../../../../src/serverless/util/request/headers/version";

describe("version", function () {
    describe("headerName", function () {
        it("exists", function () {
            expect(versionHeader.headerName).to.eql(versionHeader.ME_API_VERSION_HEADER);
        });
    });

    describe("parseHeader", function () {
        it("parses a number", function () {
            const headers = {
                [versionHeader.headerName]: "5"
            };
            expect(versionHeader.parseHeader(headers)).to.be.ok;
            expect(versionHeader.parseHeader(headers)).to.eql(5);
        });

        it("parses a string into NaN", function () {
            const headers = {
                [versionHeader.headerName]: "five"
            };
            expect(versionHeader.parseHeader(headers)).to.eql(NaN);
        });
    });

    describe("validateHeader", function () {
        it("valid for no header", function () {
            const headers = {};
            expect(versionHeader.validateHeader(headers)).to.eql(true);
        });

        it("valid for numerical error", function () {
            const headers = {
                [versionHeader.headerName]: 5
            };
            expect(versionHeader.validateHeader(headers)).to.eql(true);
        });

        it("throws for negative version", function () {
            const headers = {
                [versionHeader.headerName]: -1
            };

            try {
                versionHeader.validateHeader(headers);
                throw new Error("Wtf? This should've thrown");
            } catch (error) {
                expect(error.message).to.match(/^`ME-API-VERSION` is invalid$/);
            }
        });

        it("throws for NaN version", function () {
            const headers = {
                [versionHeader.headerName]: "woof"
            };

            try {
                versionHeader.validateHeader(headers);
                throw new Error("Wtf? This should've thrown");
            } catch (error) {
                expect(error.message).to.match(/^Expected `ME-API-VERSION` to be a number but got `woof` instead/);
            }
        });
    });

    describe("checkHeader", function () {
        it("true (no header)", function () {
            const headers = {};
            expect(versionHeader.checkHeader(headers, 2)).to.eql(true);
        });

        it("true (integer)", function () {
            const headers = {
                [versionHeader.headerName]: 5
            };
            expect(versionHeader.checkHeader(headers, 5)).to.eql(true);
        });

        it("true (float)", function () {
            const headers = {
                [versionHeader.headerName]: 5.3
            };
            expect(versionHeader.checkHeader(headers, 5.2)).to.eql(true);
        });

        it("false (requested version < expected version)", function () {
            const headers = {
                [versionHeader.headerName]: 5.1
            };
            expect(versionHeader.checkHeader(headers, 5.2)).to.eql(false);
        });

        it("false (requested version > expected major version)", function () {
            const headers = {
                [versionHeader.headerName]: 5.1
            };
            expect(versionHeader.checkHeader(headers, 4)).to.eql(false);
        });
    });
});
