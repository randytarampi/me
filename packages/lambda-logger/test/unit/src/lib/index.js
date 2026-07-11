import {expect} from "chai";
import {readFileSync} from "fs";
import * as Sentry from "@sentry/node";
import pino from "pino";
import sinon from "sinon";
import path from "path";
import {pathToFileURL} from "url";

const packageJson = JSON.parse(readFileSync("../../service/package.json", "utf8"));

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
        it("configures sentry properly", async function () {
            const sentryInitStub = sinon.stub(Sentry, "init");
            const {configureLogger} = await loadLoggerModule();

            return configureLogger(packageJson)
                .then(() => {
                    sinon.assert.calledOnce(sentryInitStub);
                    sinon.assert.calledWith(sentryInitStub, sinon.match({
                        dsn: process.env.SENTRY_DSN,
                        release: packageJson.version,
                        environment: process.env.SERVERLESS_STAGE
                    }));
                });
        });

        it("configures sentry regardless of logger status", async function () {
            delete process.env.LOGGER_ENABLED;
            delete process.env.LOGGER_STREAM_HUMAN_ENABLED;
            delete process.env.LOGGER_STREAM_STDOUT_ENABLED;
            delete process.env.LOGGER_STREAM_SENTRY_ENABLED;
            delete process.env.LOGGER_SRC_ENABLED;

            const sentryInitStub = sinon.stub(Sentry, "init");
            const {configureLogger} = await loadLoggerModule();

            return configureLogger(packageJson)
                .then(() => {
                    sinon.assert.calledOnce(sentryInitStub);
                    sinon.assert.calledWith(sentryInitStub, sinon.match({
                        dsn: process.env.SENTRY_DSN,
                        release: packageJson.version,
                        environment: process.env.SERVERLESS_STAGE
                    }));
                });
        });

        it("does not configure sentry if `process.env.IS_OFFLINE`", async function () {
            process.env.IS_OFFLINE = true;

            const sentryInitStub = sinon.stub(Sentry, "init");
            const {configureLogger} = await loadLoggerModule();

            return configureLogger(packageJson)
                .then(() => {
                    sinon.assert.notCalled(sentryInitStub);
                });
        });

        it("doesn't configure sentry if there's no `process.env.SENTRY_DSN`", async function () {
            delete process.env.SENTRY_DSN;

            const sentryInitStub = sinon.stub(Sentry, "init");
            const {configureLogger} = await loadLoggerModule();

            return configureLogger(packageJson)
                .then(() => {
                    sinon.assert.notCalled(sentryInitStub);
                });
        });
    });

    describe("createLogger", function () {
        it("configures pino streams from logger stream environment variables (all disabled)", async function () {
            delete process.env.LOGGER_STREAM_HUMAN_ENABLED;
            delete process.env.LOGGER_STREAM_STDOUT_ENABLED;
            delete process.env.LOGGER_STREAM_SENTRY_ENABLED;

            const pinoStub = sinon.stub(pino, "pino").returns({});
            const {createLogger} = await loadLoggerModule();

            createLogger(packageJson);

            sinon.assert.calledWith(pinoStub, sinon.match({
                name: `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
                version: packageJson.version,
                environment: process.env.SERVERLESS_STAGE
            }));
        });

        it("configures pino streams from logger stream environment variables (all enabled)", async function () {
            process.env.LOGGER_ENABLED = "true";
            process.env.LOGGER_LEVEL = "trace";
            process.env.LOGGER_STREAM_HUMAN_ENABLED = "true";
            process.env.LOGGER_STREAM_STDOUT_ENABLED = "true";
            process.env.LOGGER_STREAM_SENTRY_ENABLED = "true";
            process.env.LOGGER_SRC_ENABLED = "true";

            const pinoStub = sinon.stub(pino, "pino").returns({});
            sinon.stub(pino, "multistream").returns({});
            const {createLogger} = await loadLoggerModule();

            createLogger(packageJson);

            sinon.assert.calledWith(pinoStub, sinon.match({
                name: `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
                version: packageJson.version,
                environment: process.env.SERVERLESS_STAGE
            }));

            sinon.assert.calledOnce(pinoStub);
        });
    });
});
