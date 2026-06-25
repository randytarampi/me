const {expect} = require("chai");
const sinon = require("sinon");
const {freshRequire} = require("../../../../../lib/freshRequire.js");

afterEach(function () {
    sinon.restore();
});

describe("facebookAuthRedirect", function () {
    this.timeout(5000);

    it("redirects to the correct page", async function () {
        const stubEvent = {queryStringParameters: {code: "grr"}};
        const stubContext = {};
        const stubResponse = ["meow"];

        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const serverlessModule = freshRequire("@randy.tarampi/serverless");
        sinon.stub(serverlessModule, "responseBuilder").callsFake((body, status, headers) => {
            expect(body).to.eql(null);
            expect(status).to.eql(302);
            expect(headers).to.eql({
                Location: `https://www.facebook.com/v3.2/dialog/oauth?client_id=${process.env.FACEBOOK_API_KEY}&redirect_uri=${encodeURIComponent(process.env.FACEBOOK_AUTH_CALLBACK_URI)}&response_type=code`
            });
            return stubResponse;
        });

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        sinon.stub(returnErrorResponseModule, "default").returns(sinon.stub());

        const facebookAuthRedirect = freshRequire("../../../../../../src/serverless/handlers/facebookAuthRedirect").default;

        await new Promise((resolve, reject) => {
            const stubCallback = (error, postResponse) => {
                try {
                    expect(error).to.not.be.ok;
                    expect(postResponse).to.eql(stubResponse);
                    expect(configureEnvironmentModule.default.calledOnce).to.eql(true);
                    expect(serverlessModule.responseBuilder.calledOnce).to.eql(true);
                    expect(returnErrorResponseModule.default.calledOnce).to.eql(true);
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

        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const serverlessModule = freshRequire("@randy.tarampi/serverless");
        sinon.stub(serverlessModule, "responseBuilder").throws(stubError);

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        const errorHandlerStub = sinon.stub();
        sinon.stub(returnErrorResponseModule, "default").returns(errorHandlerStub);

        const facebookAuthRedirect = freshRequire("../../../../../../src/serverless/handlers/facebookAuthRedirect").default;

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
module.exports.default = module.exports;
