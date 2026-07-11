import {expect} from "chai";
import {readFileSync} from "fs";
import {JSDOM} from "jsdom";
import esmock from "esmock";
import sinon from "sinon";
import ConsoleStream from "../../../../src/lib/consoleStream.js";

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"));

describe("logger", function () {
    const globalWindow = global.window || new JSDOM("<html><div id=\"react-root\"></div></html>", {url: "http://localhost:8080"}).window;

    if (!global.window) {
        global.window = globalWindow;
        global.document = globalWindow.document;
    }

    globalWindow.NAME = packageJson.name;
    globalWindow.VERSION = packageJson.version;
    globalWindow.ENVIRONMENT = process.env.NODE_ENV;
    globalWindow.SENTRY_DSN = "https://meow@sentry.io/woof";
    globalWindow.LOGGER = {
        level: "trace",
        streams: {
            console: true
        }
    };

    afterEach(function () {
        global.window = globalWindow;
        global.document = globalWindow.document;
    });

    describe("buildSentryConfiguration", function () {
        it("returns a valid sentry configuration", async function () {
            const pinoDefault = sinon.stub().returns({});
            pinoDefault.multistream = sinon.stub().returns({});
            const {buildSentryConfiguration} = await esmock("../../../../src/lib/logger.js", {
                "@sentry/browser": {init: sinon.stub()},
                pino: {default: pinoDefault}
            });
            const sentryConfiguration = buildSentryConfiguration();

            expect(sentryConfiguration).to.eql({
                logger: window.NAME,
                environment: window.ENVIRONMENT,
                release: window.VERSION,
                debug: true
            });
        });
    });

    describe("buildPinoConfiguration", function () {
        it("returns a valid pino configuration (with a `window`)", async function () {
            const stubName = "woof";
            const stubVersion = "grr";
            const stubEnironment = "meow";
            const stubSentryDsn = "https://meow@sentry.io/woof";
            const stubLoggerConfig = {
                level: "fatal",
                streams: {
                    console: true,
                    sentry: true
                }
            };
            const stubDom = new JSDOM("<html><div id=\"react-root\"></div></html>", {url: "http://localhost:8080"});
            global.window = stubDom.window;
            global.document = global.window.document;
            global.window.NAME = stubName;
            global.window.VERSION = stubVersion;
            global.window.ENVIRONMENT = stubEnironment;
            global.window.SENTRY_DSN = stubSentryDsn;
            global.window.LOGGER = stubLoggerConfig;

            const sentryInitStub = sinon.stub().returns();
            const multistreamStub = sinon.stub().returns({});
            const pinoDefault = sinon.stub().returns({});
            pinoDefault.multistream = multistreamStub;
            const {buildPinoConfiguration} = await esmock("../../../../src/lib/logger.js", {
                "@sentry/browser": {init: sentryInitStub},
                pino: {default: pinoDefault}
            });

            const pinoConfiguration = buildPinoConfiguration();

            expect(pinoConfiguration.name).to.eql(stubName);
            expect(pinoConfiguration.version).to.eql(stubVersion);
            expect(pinoConfiguration.environment).to.eql(stubEnironment);
            expect(pinoConfiguration.stream).to.be.ok;
            expect(sentryInitStub.called).to.eql(true);
        });

        it("returns a valid pino configuration (without a `window`)", async function () {
            global.window = undefined;
            global.document = undefined;

            const pinoDefault = sinon.stub().returns({});
            pinoDefault.multistream = sinon.stub().returns({});
            const {buildPinoConfiguration} = await esmock("../../../../src/lib/logger.js", {
                "@sentry/browser": {init: sinon.stub()},
                pino: {default: pinoDefault}
            });

            const pinoConfiguration = buildPinoConfiguration();

            expect(pinoConfiguration.name).to.eql("jsx");
        });
    });
});
