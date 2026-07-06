import {responseBuilder} from "@randy.tarampi/serverless";
import {expect} from "chai";
import sinon from "sinon";
import esmock from "../../../../../lib/esmock.js";

afterEach(function () {
    sinon.restore();
});

describe("facebookAuthRedirect", function () {
    this.timeout(5000);

    it("redirects to the correct page", async function () {
        const stubEvent = {queryStringParameters: {code: "grr"}};
        const stubContext = {};
        const expectedResponse = responseBuilder(null, 302, {
            Location: `https://www.facebook.com/v3.2/dialog/oauth?client_id=${process.env.FACEBOOK_API_KEY}&redirect_uri=${encodeURIComponent(process.env.FACEBOOK_AUTH_CALLBACK_URI)}&response_type=code`
        });

        const configureEnvironmentStub = sinon.stub().resolves();
        const returnErrorResponseStub = sinon.stub().returns(sinon.stub());

        const {default: facebookAuthRedirect} = await esmock("../../../../../../src/serverless/handlers/facebookAuthRedirect/index.js", import.meta.url, {
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        await new Promise((resolve, reject) => {
            const stubCallback = (error, postResponse) => {
                try {
                    expect(error).to.not.be.ok;
                    expect(postResponse).to.eql(expectedResponse);
                    expect(configureEnvironmentStub.calledOnce).to.eql(true);
                    expect(returnErrorResponseStub.calledOnce).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            facebookAuthRedirect(stubEvent, stubContext, stubCallback);
        });
    });

    it("`returnErrorResponse` on error", async function () {
        const stubEvent = {queryStringParameters: {code: "grr"}};
        const stubContext = {};
        const stubError = new Error("woof");

        // NOTE-RT: `responseBuilder` (from `@randy.tarampi/serverless`, which can't be mocked - see the
        // note atop `cachePosts`'s test) is called here with a `null` body, so it can't be made to throw
        // via a circular reference like in other handlers' tests - `configureEnvironment` rejecting is
        // used instead to genuinely trigger the same `.catch(returnErrorResponse(...))` error path.
        const configureEnvironmentStub = sinon.stub().rejects(stubError);
        const errorHandlerStub = sinon.stub();
        const returnErrorResponseStub = sinon.stub().returns(errorHandlerStub);

        const {default: facebookAuthRedirect} = await esmock("../../../../../../src/serverless/handlers/facebookAuthRedirect/index.js", import.meta.url, {
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        await new Promise((resolve, reject) => {
            const stubCallback = () => {
                throw new Error("Wtf? This should've thrown");
            };

            const stubErrorCallback = error => {
                try {
                    expect(error.message).to.eql(stubError.message);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            errorHandlerStub.callsFake(stubErrorCallback);
            facebookAuthRedirect(stubEvent, stubContext, stubCallback);
        });
    });
});
