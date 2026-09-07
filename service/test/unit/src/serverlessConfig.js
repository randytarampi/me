import {execFileSync} from "child_process";
import {fileURLToPath} from "url";

import {expect} from "chai";

const serviceRoot = fileURLToPath(new URL("../../../", import.meta.url));

const printServerlessConfig = stage => JSON.parse(execFileSync("yarn", ["sls", "print", "--stage", stage, "--format", "json"], {
    cwd: serviceRoot,
    encoding: "utf8"
}));

describe("serverless configuration", function () {
    it("renders 1024 MiB for dev and retains 256 MiB for prd", function () {
        const devConfig = printServerlessConfig("dev");
        const prdConfig = printServerlessConfig("prd");

        expect(devConfig.provider.memorySize).to.eql(1024);
        expect(prdConfig.provider.memorySize).to.eql(256);
    }).timeout(30000);
});
