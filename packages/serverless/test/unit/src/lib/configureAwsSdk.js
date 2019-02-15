import AwsXRay from "aws-xray-sdk";
import {expect} from "chai";
import sinon from "sinon";
import {configureAwsSdk} from "../../../../src/lib/configureAwsSdk";

describe("configureAwsSdk", function () {
    const originalNodeEnv = process.env.NODE_ENV;

    beforeEach(function () {
        sinon.stub(AwsXRay, "setLogger");
    });

    afterEach(function () {
        process.env.NODE_ENV = originalNodeEnv;

        AwsXRay.setLogger.restore();
    });

    it("returns a client for NODE_ENV=test", function () {
        const awsClient = configureAwsSdk();

        expect(awsClient).to.be.ok;
        expect(AwsXRay.setLogger.notCalled).to.eql(true);
    });

    it("returns a client for NODE_ENV!=test", function () {
        process.env.NODE_ENV = "woof";

        const awsClient = configureAwsSdk();

        expect(awsClient).to.be.ok;
        expect(AwsXRay.setLogger.calledOnce).to.eql(true);
    });
});
