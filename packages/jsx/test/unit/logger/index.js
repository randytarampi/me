import {SentryStream} from "bunyan-sentry-stream";
import {expect} from "chai";
import {JSDOM} from "jsdom";
import raven from "raven-js";
import sinon from "sinon";
import {buildBunyanConfiguration, buildRavenConfiguration} from "../../../lib/logger";
import ConsoleStream from "../../../lib/logger/consoleStream";

describe("logger", function () {
    const globalWindow = global.window;

    afterEach(function () {
        global.window = globalWindow;
        global.document = globalWindow.document;
    });

    describe("buildRavenConfiguration", function () {
        it("returns a valid raven configuration", function () {
            const ravenConfiguration = buildRavenConfiguration();

            expect(ravenConfiguration).to.be.ok;
            expect(ravenConfiguration).to.eql({
                logger: window.NAME,
                autoBreadcrumbs: true,
                captureUnhandledRejections: true,
                maxBreadcrumbs: 100,
                environment: window.ENVIRONMENT,
                release: window.VERSION,
                debug: true
            });
        });
    });

    describe("buildBunyanConfiguration", function () {
        beforeEach(function () {
            sinon.stub(raven, "install");
        });

        afterEach(function () {
            raven.install.restore();
        });

        it("returns a valid bunyan configuration (with a `window`)", function () {
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
            const stubDom = new JSDOM();
            global.window = stubDom.window;
            global.document = global.window.document;
            global.window.NAME = stubName;
            global.window.VERSION = stubVersion;
            global.window.ENVIRONMENT = stubEnironment;
            global.window.SENTRY_DSN = stubSentryDsn;
            global.window.LOGGER = stubLoggerConfig;

            const bunyanConfiguration = buildBunyanConfiguration();

            expect(bunyanConfiguration).to.be.ok;
            expect(bunyanConfiguration.name).to.eql(stubName);
            expect(bunyanConfiguration.version).to.eql(stubVersion);
            expect(bunyanConfiguration.environment).to.eql(stubEnironment);
            expect(bunyanConfiguration.streams).to.be.ok;
            expect(bunyanConfiguration.streams).to.have.length(2);
            expect(bunyanConfiguration.streams[0].stream).to.be.ok;
            expect(bunyanConfiguration.streams[0].stream).to.be.instanceOf(ConsoleStream);
            expect(bunyanConfiguration.streams[1].stream).to.be.ok;
            expect(bunyanConfiguration.streams[1].stream).to.be.instanceOf(SentryStream);
            expect(bunyanConfiguration.src).to.eql(false);
            expect(raven.install.calledOnce).to.eql(true);
        });

        it("returns a valid bunyan configuration (without a `window`)", function () {
            global.window = undefined;
            global.document = undefined;

            const bunyanConfiguration = buildBunyanConfiguration();

            expect(bunyanConfiguration).to.be.ok;
            expect(bunyanConfiguration.name).to.eql("jsx");
            expect(bunyanConfiguration.src).to.eql(false);
        });
    });
});
