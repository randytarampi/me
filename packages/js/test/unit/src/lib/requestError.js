import {expect} from "chai";
import {RequestError, requestErrorCodeToHttpStatusCode} from "../../../../src/lib/requestError";

describe("RequestError", function () {
    describe("constructor", function () {
        it("builds a RequestError", function () {
            const requestError = new RequestError("woof", "meow", "grr");

            expect(requestError).to.be.instanceof(RequestError);
            expect(requestError).to.be.instanceof(Error);
            expect(requestError.message).to.eql("woof");
            expect(requestError.code).to.eql("meow");
            expect(requestError.statusCode).to.eql("grr");
        });

        Object.values(RequestError.codes).forEach(requestErrorCode => {
            it(`builds a RequestError for ${requestErrorCode}`, function () {
                const requestError = new RequestError("woof", requestErrorCode);

                expect(requestError).to.be.instanceof(RequestError);
                expect(requestError).to.be.instanceof(Error);
                expect(requestError.message).to.eql("woof");
                expect(requestError.code).to.eql(requestErrorCode);
                expect(requestError.statusCode).to.eql(requestErrorCodeToHttpStatusCode[requestErrorCode]);
            });
        });
    });
});
