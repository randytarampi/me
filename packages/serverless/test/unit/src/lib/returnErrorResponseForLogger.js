import {RequestError} from "@randy.tarampi/js";
import {expect} from "chai";
import {returnErrorResponseForLogger} from "../../../../src/lib/returnErrorResponseForLogger";

describe("returnErrorResponseForLogger", function () {
    it("handles `RequestError`s", function () {
        const returnErrorResponse = returnErrorResponseForLogger();

        const stubEvent = {};
        const stubContext = {};
        const stubCallback = (error, response) => {
            expect(error).to.not.be.ok;

            expect(response.body).to.contain(stubError.message);
            expect(response.body).to.contain(stubError.code);
            expect(response.statusCode).to.eql(stubError.statusCode);
        };
        const stubError = new RequestError("woof", RequestError.codes.badRequest);

        returnErrorResponse(stubEvent, stubContext, stubCallback)(stubError);
    });

    it("handles other errors", function () {
        const returnErrorResponse = returnErrorResponseForLogger();

        const stubEvent = {};
        const stubContext = {};
        const stubCallback = (error, response) => {
            expect(error).to.be.ok;

            expect(response.body).to.contain("An unexpected error occurred");
            expect(response.body).to.not.contain(stubError.message);
            expect(response.statusCode).to.eql(500);
        };
        const stubError = new Error("meow");

        returnErrorResponse(stubEvent, stubContext, stubCallback)(stubError);
    });
});
