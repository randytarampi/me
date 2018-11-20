import {expect} from "chai";
import raven from "raven";
import packageJson from "../../../../package.json";
import {configureLogger} from "../../../../src/lib/logger";

describe("logger", function () {
    describe("configureLogger", function () {
        it("configures Raven", function () {
            return configureLogger()
                .then(() => {
                    expect(raven).to.be.ok;
                    expect(raven.loggerName).to.eql(packageJson.name);
                    expect(raven.release).to.eql(packageJson.version);
                    expect(raven.environment).to.eql(process.env.NODE_ENV);
                    expect(raven.dsn).to.be.ok;
                    expect(raven.dsn.project_id).to.eql("woof");
                    expect(raven.dsn.public_key).to.eql("meow");
                });
        });
    });
});
