import {expect} from "chai";
import {readFileSync} from "fs";
import bunyan from "bunyan";
import bunyanSentryStream from "bunyan-sentry-stream";
import sinon from "sinon";
import path from "path";
import {pathToFileURL} from "url";
import raven from "raven";

const packageJson = JSON.parse(readFileSync("../service/package.json", "utf8"));

const loadLoggerModule = async () => Function(`return import(${JSON.stringify(`${pathToFileURL(path.resolve("src/lib/index.js")).href}?t=${Date.now()}-${Math.random()}`)})`)();

afterEach(function () {
    sinon.restore();
});

describe("logger", function () {
    const SENTRY_DSN = process.env.SENTRY_DSN;
    const LOGGER_ENABLED = process.env.LOGGER_ENABLED;
    const LOGGER_STREAM_HUMAN_ENABLED = process.env.LOGGER_STREAM_HUMAN_ENABLED;
    const LOGGER_STREAM_STDOUT_ENABLED = process.env.LOGGER_STREAM_STDOUT_ENABLED;
    const LOGGER_STREAM_SENTRY_ENABLED = process.env.LOGGER_STREAM_SENTRY_ENABLED;
    const LOGGER_SRC_ENABLED = process.env.LOGGER_SRC_ENABLED;

    beforeEach(function () {
        process.env.SENTRY_DSN = SENTRY_DSN;
        process.env.LOGGER_ENABLED = LOGGER_ENABLED;
        process.env.LOGGER_STREAM_HUMAN_ENABLED = LOGGER_STREAM_HUMAN_ENABLED;
        process.env.LOGGER_STREAM_STDOUT_ENABLED = LOGGER_STREAM_STDOUT_ENABLED;
        process.env.LOGGER_STREAM_SENTRY_ENABLED = LOGGER_STREAM_SENTRY_ENABLED;
        process.env.LOGGER_SRC_ENABLED = LOGGER_SRC_ENABLED;
        delete process.env.IS_OFFLINE;
    });

    describe("configureLogger", function () {
        it("configures raven properly", async function () {
            const ravenConfigStub = sinon.stub(raven, "config");
            const ravenOnStub = sinon.stub(raven, "on");
            const ravenInstallStub = sinon.stub(raven, "install");
            const {configureLogger} = await loadLoggerModule();

            return configureLogger(packageJson)
                .then(() => {
                    sinon.assert.calledOnce(ravenInstallStub);
                    sinon.assert.calledWith(ravenOnStub, "error");
                    sinon.assert.calledWith(ravenConfigStub, process.env.SENTRY_DSN, sinon.match({
                        logger: `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
                        release: packageJson.version,
                        environment: process.env.SERVERLESS_STAGE
                    }));
                });
        });

        it("configures raven regardless of logger status", async function () {
            delete process.env.LOGGER_ENABLED;
            delete process.env.LOGGER_STREAM_HUMAN_ENABLED;
            delete process.env.LOGGER_STREAM_STDOUT_ENABLED;
            delete process.env.LOGGER_STREAM_SENTRY_ENABLED;
            delete process.env.LOGGER_SRC_ENABLED;

            const ravenConfigStub = sinon.stub(raven, "config");
            const ravenOnStub = sinon.stub(raven, "on");
            const ravenInstallStub = sinon.stub(raven, "install");
            const {configureLogger} = await loadLoggerModule();

            return configureLogger(packageJson)
                .then(() => {
                    sinon.assert.calledOnce(ravenInstallStub);
                    sinon.assert.calledWith(ravenOnStub, "error");
                    sinon.assert.calledWith(ravenConfigStub, process.env.SENTRY_DSN, sinon.match({
                        logger: `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
                        release: packageJson.version,
                        environment: process.env.SERVERLESS_STAGE
                    }));
                });
        });

        it("configures raven but does not install it if `process.env.IS_OFFLINE`", async function () {
            process.env.IS_OFFLINE = true;

            const ravenConfigStub = sinon.stub(raven, "config");
            const ravenOnStub = sinon.stub(raven, "on");
            const ravenInstallStub = sinon.stub(raven, "install");
            const {configureLogger} = await loadLoggerModule();

            return configureLogger(packageJson)
                .then(() => {
                    sinon.assert.notCalled(ravenInstallStub);
                    sinon.assert.calledWith(ravenOnStub, "error");
                    sinon.assert.calledWith(ravenConfigStub, process.env.SENTRY_DSN, sinon.match({
                        logger: `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
                        release: packageJson.version,
                        environment: process.env.SERVERLESS_STAGE
                    }));
                });
        });

        it("doesn't configure raven if there's no `process.env.SENTRY_DSN`", async function () {
            delete process.env.SENTRY_DSN;

            const ravenConfigStub = sinon.stub(raven, "config");
            const ravenOnStub = sinon.stub(raven, "on");
            const ravenInstallStub = sinon.stub(raven, "install");
            const {configureLogger} = await loadLoggerModule();

            return configureLogger(packageJson)
                .then(() => {
                    sinon.assert.notCalled(ravenInstallStub);
                    sinon.assert.notCalled(ravenOnStub);
                    sinon.assert.notCalled(ravenConfigStub);
                });
        });
    });

    describe("createLogger", function () {
        it("configures bunyan streams from logger stream environment variables", async function () {
            delete process.env.LOGGER_STREAM_HUMAN_ENABLED;
            delete process.env.LOGGER_STREAM_STDOUT_ENABLED;
            delete process.env.LOGGER_STREAM_SENTRY_ENABLED;

            const bunyanStubs = sinon.stub(bunyan, "createLogger");
            sinon.stub(bunyanSentryStream, "SentryStream").callsFake(function StubSentryStream() {});
            const {createLogger} = await loadLoggerModule();

            createLogger(packageJson);

            sinon.assert.calledWith(bunyanStubs, sinon.match({
                name: `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
                version: packageJson.version,
                environment: process.env.SERVERLESS_STAGE,
                streams: []
            }));
        });

        it("configures bunyan streams from logger stream environment variables", async function () {
            process.env.LOGGER_ENABLED = "true";
            process.env.LOGGER_LEVEL = "trace";
            process.env.LOGGER_STREAM_HUMAN_ENABLED = "true";
            process.env.LOGGER_STREAM_STDOUT_ENABLED = "true";
            process.env.LOGGER_STREAM_SENTRY_ENABLED = "true";
            process.env.LOGGER_SRC_ENABLED = "true";

            const bunyanStubs = sinon.stub(bunyan, "createLogger");
            sinon.stub(bunyanSentryStream, "SentryStream").callsFake(function StubSentryStream() {});
            const {createLogger} = await loadLoggerModule();

            createLogger(packageJson);

            sinon.assert.calledWith(bunyanStubs, sinon.match({
                name: `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
                version: packageJson.version,
                environment: process.env.SERVERLESS_STAGE
            }));

            sinon.assert.calledOnce(bunyanStubs);
            expect(bunyanStubs.args[0][0].streams).to.have.length(3);
        });
    });
});
