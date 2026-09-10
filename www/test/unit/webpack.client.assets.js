import {expect} from "chai";
import {execFileSync} from "node:child_process";
import {existsSync, readdirSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const repositoryDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const assetsWebDirectory = path.join(repositoryDirectory, "packages/assets/web");

const configCases = ["www", "resume", "letter"];

const inspectSources = environment => JSON.parse(execFileSync(process.execPath, [
    "--input-type=module",
    "-e",
    `const configs = ${JSON.stringify(configCases)};
const paths = ${JSON.stringify(repositoryDirectory)};
const sources = {};
for (const name of configs) {
    const modulePath = name === "www" ? "/www/webpack.client.config.base.js" : "/" + name + "/webpack.client.config.js";
    const {default: config} = await import("file://" + paths + modulePath);
    const webpackConfig = name === "www" ? config({plugins: []}) : config;
    sources[name] = webpackConfig.plugins
        .find(plugin => plugin.constructor.name === "CopyPlugin")
        .patterns
        .map(pattern => pattern.from);
}
process.stdout.write(JSON.stringify(sources));`
], {
    cwd: repositoryDirectory,
    env: {...process.env, NODE_ENV: environment},
    encoding: "utf8"
}));

describe("client webpack stage assets", function () {
    for (const name of configCases) {
        for (const [environment, stage] of [["dev", "dev"], ["prd", "prd"]]) {
            it(`${name} copies shared assets followed by ${stage} assets for NODE_ENV=${environment}`, function () {
                const sources = inspectSources(environment)[name];
                const sharedAssets = path.join(assetsWebDirectory, "*");
                const stageDirectory = path.join(assetsWebDirectory, stage);
                const stageAssets = path.join(stageDirectory, "*");

                expect(existsSync(stageDirectory)).to.equal(true);
                expect(readdirSync(stageDirectory)).to.include("manifest.json");
                expect(sources).to.include(sharedAssets);
                expect(sources).to.include(stageAssets);
                expect(sources.indexOf(stageAssets)).to.be.greaterThan(sources.indexOf(sharedAssets));
                expect(sources).to.not.include(path.join(assetsWebDirectory, stage === "dev" ? "prd" : "dev", "*"));
            });
        }
    }
});
