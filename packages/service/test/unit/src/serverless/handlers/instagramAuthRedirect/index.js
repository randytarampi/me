import sinon from "sinon";
import esmock from "../../../../../lib/esmock.js";

afterEach(function () {
    sinon.restore();
});

describe("instagramAuthRedirect", function () {
    this.timeout(5000);

    it("redirects to the correct page", async function () {
        process.env.INSTAGRAM_API_KEY = "INSTAGRAM_API_KEY";
        process.env.INSTAGRAM_AUTH_CALLBACK_URI = "https://example.com/instagram/callback";

        const stubEvent = {queryStringParameters: {code: "grr"}};
        const stubContext = {};

        const configureEnvironmentStub = sinon.stub().resolves();
        const returnErrorResponseStub = sinon.stub().returns(sinon.stub());

        const {default: instagramAuthRedirect} = await esmock("../../../../../../src/serverless/handlers/instagramAuthRedirect/index.js", import.meta.url, {
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        await new Promise((resolve, reject) => {
            const stubCallback = (error, postResponse) => {
                try {
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            instagramAuthRedirect(stubEvent, stubContext, stubCallback);
        });
    });

    it("`returnErrorResponse` on error", async function () {
        process.env.INSTAGRAM_API_KEY = "INSTAGRAM_API_KEY";
        process.env.INSTAGRAM_AUTH_CALLBACK_URI = "https://example.com/instagram/callback";

        const stubEvent = {queryStringParameters: {code: "grr"}};
        const stubContext = {};

        const configureEnvironmentStub = sinon.stub().rejects(new Error("woof"));

        const {default: instagramAuthRedirect} = await esmock("../../../../../../src/serverless/handlers/instagramAuthRedirect/index.js", import.meta.url, {
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub}
        });

        instagramAuthRedirect(stubEvent, stubContext, () => {});
    });
});
