import sinon from "sinon";
import path from "path";
import {freshRequire} from "../../../../../lib/freshRequire";

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

        const configureEnvironmentModule = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/util/configureEnvironment.js"));
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const returnErrorResponseModule = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/util/response/returnErrorResponse.js"));
        sinon.stub(returnErrorResponseModule, "default").returns(sinon.stub());

        const instagramAuthRedirect = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/handlers/instagramAuthRedirect")).default;

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

        const configureEnvironmentModule = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/util/configureEnvironment.js"));
        sinon.stub(configureEnvironmentModule, "default").rejects(new Error("woof"));

        const instagramAuthRedirect = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/handlers/instagramAuthRedirect")).default;

        instagramAuthRedirect(stubEvent, stubContext, () => {});
    });
});
