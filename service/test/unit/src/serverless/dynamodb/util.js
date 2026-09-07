import dynamoose from "dynamoose";
import {expect} from "chai";
import sinon from "sinon";
import {setupLocal} from "../../../../../src/serverless/dynamodb/util.js";

const environmentKeys = ["IS_OFFLINE", "NODE_ENV", "AWS_ENDPOINT_URL", "SERVICE_POSTS_DYNAMODB_TABLE", "SERVICE_AUTH_INFO_DYNAMODB_TABLE"];

describe("serverless/dynamodb/util", function () {
    let originalEnvironment;

    beforeEach(function () {
        originalEnvironment = Object.fromEntries(environmentKeys.map(key => [key, process.env[key]]));
    });

    afterEach(function () {
        sinon.restore();
        for (const key of environmentKeys) {
            if (originalEnvironment[key] === undefined) delete process.env[key];
            else process.env[key] = originalEnvironment[key];
        }
    });

    it("does not configure the DynamoDB client for a deployed Lambda with no NODE_ENV", function () {
        delete process.env.IS_OFFLINE;
        delete process.env.NODE_ENV;
        process.env.SERVICE_POSTS_DYNAMODB_TABLE = "dev-service-posts-2019-01-11";
        const set = sinon.stub(dynamoose.aws.ddb, "set");

        expect(() => setupLocal()).not.to.throw();
        expect(set.called).to.eql(false);
    });

    for (const environment of [{IS_OFFLINE: "true"}, {NODE_ENV: "test"}]) {
        it(`configures the local client when ${Object.keys(environment)[0]} identifies a local runtime`, function () {
            Object.assign(process.env, environment);
            process.env.SERVICE_POSTS_DYNAMODB_TABLE = "local-posts";
            const set = sinon.stub(dynamoose.aws.ddb, "set");

            setupLocal();

            expect(set.calledOnce).to.eql(true);
        });
    }
});
