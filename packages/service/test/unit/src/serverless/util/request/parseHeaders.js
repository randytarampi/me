import {expect} from "chai";
import sinon from "sinon";
import * as versionHeader from "../../../../../../src/serverless/util/request/headers/version";
import parseHeaders from "../../../../../../src/serverless/util/request/parseHeaders";

describe("parseHeaders", function () {
    let stubVersionHeader;

    beforeEach(function () {
        stubVersionHeader = sinon.stub(versionHeader);
        versionHeader.getHeaderValue.restore && versionHeader.getHeaderValue.restore();
    });

    afterEach(function () {
        versionHeader.parseHeader.restore && versionHeader.parseHeader.restore();
        versionHeader.validateHeader.restore && versionHeader.validateHeader.restore();
        versionHeader.checkHeader.restore && versionHeader.checkHeader.restore();
    });

    it("returns no headers if it receives no headers", function () {
        const stubHeaders = null;
        const parsedHeaders = parseHeaders(stubHeaders);

        expect(parsedHeaders).to.eql(stubHeaders);
    });

    it("only inspects custom headers", function () {
        const stubHeaders = {};
        const parsedHeaders = parseHeaders(stubHeaders);

        expect(parsedHeaders).to.eql(stubHeaders);
        expect(stubVersionHeader.parseHeader.notCalled).to.eql(true);
        expect(stubVersionHeader.validateHeader.notCalled).to.eql(true);
        expect(stubVersionHeader.checkHeader.notCalled).to.eql(true);
    });

    it("inspects & parses custom headers", function () {
        const stubHeaders = {
            [stubVersionHeader.headerName]: "5"
        };
        const parsedHeaders = parseHeaders(stubHeaders);

        expect(parsedHeaders).to.be.ok;
        expect(stubVersionHeader.parseHeader.calledOnce).to.eql(true);
        expect(stubVersionHeader.validateHeader.calledOnce).to.eql(true);
        expect(stubVersionHeader.checkHeader.calledOnce).to.eql(false);
    });

    it("inspects & throws custom headers validation errors", function () {
        versionHeader.validateHeader.restore && versionHeader.validateHeader.restore();

        versionHeader.validateHeader = sinon.stub(versionHeader, "validateHeader").throws(new Error("💥"));

        const stubHeaders = {
            [stubVersionHeader.headerName]: "5"
        };

        try {
            parseHeaders(stubHeaders);
            throw new Error("Wtf? This should've thrown");
        } catch (error) {
            expect(error.message).to.match(/^💥$/);
            expect(stubVersionHeader.parseHeader.calledOnce).to.eql(true);
            expect(stubVersionHeader.validateHeader.calledOnce).to.eql(true);
            expect(stubVersionHeader.checkHeader.calledOnce).to.eql(false);
        }
    });
});
