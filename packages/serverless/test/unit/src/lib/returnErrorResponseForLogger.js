import {RequestError} from "@randy.tarampi/js";
import {expect} from "chai";
import {returnErrorResponseForLogger} from "../../../../src/lib/returnErrorResponseForLogger.js";

describe("returnErrorResponseForLogger", function () {
    it("handles `RequestError`s", function () {
        const returnErrorResponse = returnErrorResponseForLogger();

        const stubEvent = {};
        const stubContext = {};
        const stubError = new RequestError("woof", RequestError.codes.badRequest);

        const response = returnErrorResponse(stubEvent, stubContext)(stubError);

        expect(response.body).to.contain(stubError.message);
        expect(response.body).to.contain(stubError.code);
        expect(response.statusCode).to.eql(stubError.statusCode);
    });

    it("handles other errors", function () {
        const returnErrorResponse = returnErrorResponseForLogger();

        const stubEvent = {};
        const stubContext = {};
        const stubError = new Error("meow");

        // NOTE-RT: rethrows rather than calling a `callback` - AWS Lambda's Node.js 24 runtime
        // removed callback-based function handlers entirely, so an unexpected error must fail the
        // handler's own promise instead.
        expect(() => returnErrorResponse(stubEvent, stubContext)(stubError)).to.throw(stubError);
    });
});
