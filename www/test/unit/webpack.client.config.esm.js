import {expect} from "chai";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";

const configSource = readFileSync(fileURLToPath(new URL("../../webpack.client.config.esm.js", import.meta.url)), "utf8");

describe("www prd bundle polyfills", function () {
    it("has one RAF polyfill entry across the client build", function () {
        expect(configSource.match(/"raf\/polyfill"/g) || []).to.have.lengthOf(1);
    });
});
