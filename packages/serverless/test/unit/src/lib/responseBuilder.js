import {expect} from "chai";
import mime from "mime-types";
import {responseBuilder} from "../../../../src/lib/responseBuilder";

describe("responseBuilder", function () {
    it("builds a response", function () {
        const stubBody = undefined;
        const stubStatusCode = "woof";
        const stubHeaders = null;
        const stubIsBase64Encoded = false;

        const response = responseBuilder(stubBody, stubStatusCode, stubHeaders, stubIsBase64Encoded);

        expect(response.body).to.eql(undefined);
        expect(response.statusCode).to.eql(stubStatusCode);
        expect(response.headers).to.eql({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": mime.types.json,
            "Content-Encoding": "utf-8"
        });
        expect(response.isBase64Encoded).to.eql(stubIsBase64Encoded);
    });

    it("builds a response (passed a `Content-Type`)", function () {
        const stubBody = {};
        const stubHeaders = {
            "Content-Type": false
        };

        const response = responseBuilder(stubBody, undefined, stubHeaders);

        expect(response.body).to.eql(stubBody);
        expect(response.headers).to.eql({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": false,
            "Content-Encoding": "utf-8"
        });
    });

    it("builds a response (default options)", function () {
        const stubBody = {};
        const response = responseBuilder(stubBody);

        expect(response.body).to.eql(JSON.stringify(stubBody));
        expect(response.statusCode).to.eql(200);
        expect(response.headers).to.eql({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": mime.types.json,
            "Content-Encoding": "utf-8"
        });
        expect(response.isBase64Encoded).to.eql(false);
    });
});
