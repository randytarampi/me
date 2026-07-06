import {expect} from "chai";
import sinon from "sinon";
import {FacebookApiClient} from "../../../../../../src/lib/sources/facebook/client.js";

describe("FacebookApiClient", function () {
    afterEach(function () {
        sinon.restore();
    });

    describe("fetch", function () {
        it("delegates to `fetchFacebookEdge`", function () {
            const stubAccessToken = "woof";
            const stubEdge = "meow";
            const stubQueryParameters = {grr: true};
            const stubOptions = {rawr: 1};
            const fetchStub = sinon.stub(global, "fetch").returns(Promise.resolve({
                status: 200,
                json: sinon.stub().returns(Promise.resolve("arf"))
            }));

            const facebookApiClient = new FacebookApiClient(stubAccessToken);

            return facebookApiClient.fetch(stubEdge, stubQueryParameters, stubOptions)
                .then(() => {
                    expect(fetchStub.calledOnce).to.eql(true);
                });
        });
    });

    describe("get", function () {
        it("delegates to `fetchFacebookEdge`", function () {
            const stubAccessToken = "woof";
            const stubEdge = "meow";
            const stubQueryParameters = {grr: true};
            const stubOptions = {rawr: 1};
            const fetchStub = sinon.stub(global, "fetch").returns(Promise.resolve({
                status: 200,
                json: sinon.stub().returns(Promise.resolve("arf"))
            }));

            const facebookApiClient = new FacebookApiClient(stubAccessToken);

            return facebookApiClient.get(stubEdge, stubQueryParameters, stubOptions)
                .then(() => {
                    expect(fetchStub.calledOnce).to.eql(true);
                });
        });
    });
});
