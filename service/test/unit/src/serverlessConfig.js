import {execFileSync} from "child_process";
import {fileURLToPath} from "url";

import {expect} from "chai";

const serviceRoot = fileURLToPath(new URL("../../../", import.meta.url));

const printServerlessConfig = stage => JSON.parse(execFileSync("yarn", ["sls", "print", "--stage", stage, "--format", "json"], {
    cwd: serviceRoot,
    encoding: "utf8",
    // NOTE: `env.yml` resolves credentials through `${ssm:…, ''}` — each reference carries an
    // empty-string default, and the Serverless SSM resolver still contacts AWS (or the LocalStack
    // endpoint) even when the default applies. The local test substrate therefore points the
    // resolver at the lifecycle's LocalStack (dynamodb+ssm services) with throwaway credentials,
    // keeping this suite hermetic instead of reaching for live AWS.
    env: {
        ...process.env,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? "test",
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? "test",
        AWS_REGION: process.env.AWS_REGION ?? "us-east-1",
        AWS_ENDPOINT_URL: process.env.AWS_ENDPOINT_URL ?? "http://localhost:4566"
    }
}));

describe("serverless configuration", function () {
    it("renders 1024 MiB for dev and prd", function () {
        const devConfig = printServerlessConfig("dev");
        const prdConfig = printServerlessConfig("prd");

        expect(devConfig.provider.memorySize).to.eql(1024);
        expect(prdConfig.provider.memorySize).to.eql(1024);
    }).timeout(30000);
});
