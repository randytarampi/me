import {expect} from "chai";
import proxyquire from "proxyquire";

describe("client", function () {
    beforeEach(function () {
        process.env.INSTAGRAM_API_KEY = "INSTAGRAM_API_KEY";
        process.env.INSTAGRAM_API_SECRET = "INSTAGRAM_API_SECRET";
        process.env.INSTAGRAM_AUTH_REDIRECT_URI = "INSTAGRAM_AUTH_REDIRECT_URI";
    });

    it("delegates to `fetch` with the correct parameters", function () {
        const stubCode = "woof";
        const stubResponseJson = "meow";
        const stubResponse = {
            json: () => {
                return Promise.resolve(stubResponseJson);
            }
        };

        const proxyquiredInstagramClient = proxyquire("../../../../auth/instagram/client", {
            "isomorphic-fetch": (fetchUrl, options) => {
                expect(fetchUrl).to.be.ok;
                expect(fetchUrl).to.eql("https://api.instagram.com/oauth/access_token");

                expect(options).to.be.ok;
                expect(options.method).to.eql("POST");
                expect(options.body).to.be.ok;
                const body = JSON.stringify(options.body);
                expect(body).to.contain(`"${stubCode}"`);
                expect(body).to.contain("\"authorization_code\"");
                expect(body).to.contain("\"INSTAGRAM_AUTH_REDIRECT_URI\"");
                expect(body).to.contain("\"INSTAGRAM_API_KEY\"");
                expect(body).to.contain("\"INSTAGRAM_API_SECRET\"");

                return Promise.resolve(stubResponse);
            }
        });

        return proxyquiredInstagramClient.getAuthTokenForCode(stubCode)
            .then(postsResponse => {
                expect(postsResponse).to.be.ok;
                expect(postsResponse).to.eql(stubResponseJson);
            });
    });

});
