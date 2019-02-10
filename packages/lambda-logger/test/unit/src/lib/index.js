import {expect} from "chai";
import proxyquire from "proxyquire";
import sinon from "sinon";
import packageJson from "../../../../../service/package.json";

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
        it("configures raven properly", function () {
            const ravenStubs = {
                config: sinon.stub(),
                on: sinon.stub(),
                install: sinon.stub()
            };
            const {configureLogger} = proxyquire("../../../../src/lib", {
                raven: ravenStubs
            });

            return configureLogger(packageJson)
                .then(() => {
                    sinon.assert.calledOnce(ravenStubs.install);
                    sinon.assert.calledWith(ravenStubs.on, "error");
                    sinon.assert.calledWith(ravenStubs.config, process.env.SENTRY_DSN, sinon.match({
                        logger: `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
                        release: packageJson.version,
                        environment: process.env.SERVERLESS_STAGE
                    }));
                });
        });

        it("configures raven regardless of logger status", function () {
            delete process.env.LOGGER_ENABLED;
            delete process.env.LOGGER_STREAM_HUMAN_ENABLED;
            delete process.env.LOGGER_STREAM_STDOUT_ENABLED;
            delete process.env.LOGGER_STREAM_SENTRY_ENABLED;
            delete process.env.LOGGER_SRC_ENABLED;

            const ravenStubs = {
                config: sinon.stub(),
                on: sinon.stub(),
                install: sinon.stub()
            };
            const {configureLogger} = proxyquire("../../../../src/lib", {
                raven: ravenStubs
            });

            return configureLogger(packageJson)
                .then(() => {
                    sinon.assert.calledOnce(ravenStubs.install);
                    sinon.assert.calledWith(ravenStubs.on, "error");
                    sinon.assert.calledWith(ravenStubs.config, process.env.SENTRY_DSN, sinon.match({
                        logger: `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
                        release: packageJson.version,
                        environment: process.env.SERVERLESS_STAGE
                    }));
                });
        });

        it("configures raven but does not install it if `process.env.IS_OFFLINE`", function () {
            process.env.IS_OFFLINE = true;

            const ravenStubs = {
                config: sinon.stub(),
                on: sinon.stub(),
                install: sinon.stub()
            };
            const {configureLogger} = proxyquire("../../../../src/lib", {
                raven: ravenStubs
            });

            return configureLogger(packageJson)
                .then(() => {
                    sinon.assert.notCalled(ravenStubs.install);
                    sinon.assert.calledWith(ravenStubs.on, "error");
                    sinon.assert.calledWith(ravenStubs.config, process.env.SENTRY_DSN, sinon.match({
                        logger: `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
                        release: packageJson.version,
                        environment: process.env.SERVERLESS_STAGE
                    }));
                });
        });

        it("doesn't configure raven if there's no `process.env.SENTRY_DSN`", function () {
            delete process.env.SENTRY_DSN;

            const ravenStubs = {
                config: sinon.stub(),
                on: sinon.stub(),
                install: sinon.stub()
            };
            const {configureLogger} = proxyquire("../../../../src/lib", {
                raven: ravenStubs
            });

            return configureLogger(packageJson)
                .then(() => {
                    sinon.assert.notCalled(ravenStubs.install);
                    sinon.assert.notCalled(ravenStubs.on);
                    sinon.assert.notCalled(ravenStubs.config);
                });
        });
    });

    describe("createLogger", function () {
        it("configures bunyan streams from logger stream environment variables", function () {
            delete process.env.LOGGER_STREAM_HUMAN_ENABLED;
            delete process.env.LOGGER_STREAM_STDOUT_ENABLED;
            delete process.env.LOGGER_STREAM_SENTRY_ENABLED;

            const bunyanStubs = {
                createLogger: sinon.stub()
            };
            const {createLogger} = proxyquire("../../../../src/lib", {
                bunyan: bunyanStubs
            });

            createLogger(packageJson);

            sinon.assert.calledWith(bunyanStubs.createLogger, sinon.match({
                name: `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
                version: packageJson.version,
                environment: process.env.SERVERLESS_STAGE,
                streams: []
            }));
        });

        it("configures bunyan streams from logger stream environment variables", function () {
            const bunyanStubs = {
                createLogger: sinon.stub()
            };
            const {createLogger} = proxyquire("../../../../src/lib", {
                bunyan: bunyanStubs
            });

            createLogger(packageJson);

            sinon.assert.calledWith(bunyanStubs.createLogger, sinon.match({
                name: `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
                version: packageJson.version,
                environment: process.env.SERVERLESS_STAGE
            }));

            sinon.assert.calledOnce(bunyanStubs.createLogger);
            expect(bunyanStubs.createLogger.args[0][0].streams).to.have.length(3);
        });
    });
});
