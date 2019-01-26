import {expect} from "chai";
import sinon from "sinon";
import {FacebookApiClient} from "../../../../../../src/lib/sources/facebook/client";
import * as facebookUtil from "../../../../../../src/lib/sources/facebook/util";

describe("FacebookApiClient", function () {
    let stubFetchFacebookEdge;

    beforeEach(function () {
        stubFetchFacebookEdge = sinon.stub(facebookUtil, "fetchFacebookEdge").returns(Promise.resolve());
    });

    afterEach(function () {
        stubFetchFacebookEdge.restore();
    });

    describe("fetch", function () {
        it("delegates to `fetchFacebookEdge`", function () {
            const stubAccessToken = "woof";
            const stubEdge = "meow";
            const stubQueryParameters = {grr: true};
            const stubOptions = {rawr: 1};

            const facebookApiClient = new FacebookApiClient(stubAccessToken);

            return facebookApiClient.fetch(stubEdge, stubQueryParameters, stubOptions)
                .then(() => {
                    expect(stubFetchFacebookEdge.calledOnce).to.eql(true);
                    sinon.assert.calledWith(stubFetchFacebookEdge, stubEdge, stubAccessToken, stubQueryParameters, stubOptions);
                });
        });
    });

    describe("get", function () {
        it("delegates to `fetchFacebookEdge`", function () {
            const stubAccessToken = "woof";
            const stubEdge = "meow";
            const stubQueryParameters = {grr: true};
            const stubOptions = {rawr: 1};

            const facebookApiClient = new FacebookApiClient(stubAccessToken);

            return facebookApiClient.get(stubEdge, stubQueryParameters, stubOptions)
                .then(() => {
                    expect(stubFetchFacebookEdge.calledOnce).to.eql(true);
                    sinon.assert.calledWith(stubFetchFacebookEdge, stubEdge, stubAccessToken, stubQueryParameters, stubOptions);
                });
        });
    });
});
