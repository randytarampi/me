import {expect} from "chai";
import {readFileSync} from "fs";
import {JSDOM} from "jsdom";
import * as Sentry from "@sentry/browser";
import pino from "pino";
import sinon from "sinon";
import {buildPinoConfiguration, buildSentryConfiguration} from "../../../../src/lib/index.js";
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
        it("returns a valid sentry configuration", function () {
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
        beforeEach(function () {
            sinon.stub(Sentry, "init");
        });

        afterEach(function () {
            Sentry.init.restore();
        });

        it("returns a valid pino configuration (with a `window`)", function () {
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

            const pinoConfiguration = buildPinoConfiguration();

            expect(pinoConfiguration.name).to.eql(stubName);
            expect(pinoConfiguration.version).to.eql(stubVersion);
            expect(pinoConfiguration.environment).to.eql(stubEnironment);
            expect(pinoConfiguration.stream).to.be.ok;
            expect(Sentry.init.calledOnce).to.eql(true);
        });

        it("returns a valid pino configuration (without a `window`)", function () {
            global.window = undefined;
            global.document = undefined;

            const pinoConfiguration = buildPinoConfiguration();

            expect(pinoConfiguration.name).to.eql("jsx");
        });
    });
});
