import {expect} from "chai";
import SearchParams from "../../../../lib/searchParams";
import {parseQueryStringParametersIntoSearchParams} from "../../../../serverless/util/parseQueryStringParametersIntoSearchParams";
import loadServerlessSecrets from "../../../../serverless/util/loadServerlessSecrets";
import proxyquire from "proxyquire";
import serverlessSecretsClient from "serverless-secrets/client";
import sinon from "sinon";

describe("util", function () {
    describe("parseQueryStringParametersIntoSearchParams", function () {
        it("returns the expected SearchParams", function () {
            const baseParameters = {
                type: "woof"
            };
            const queryStringParameters = {
                source: "meow",
                perPage: "4"
            };
            const searchParams = parseQueryStringParametersIntoSearchParams(baseParameters)(queryStringParameters);

            expect(searchParams).to.be.ok;
            expect(searchParams).to.be.instanceOf(SearchParams);
            expect(searchParams.type).to.eql("woof");
            expect(searchParams.source).to.eql("meow");
            expect(searchParams.perPage).to.eql(4);
        });
    });

    describe("configureEnvironment", function () {
        it("propagates thrown errors", function () {
            const stubErrorMessage = "woof";
            const proxyquiredConfigureEnvironment = proxyquire("../../../../serverless/util/configureEnvironment", {
                "./loadServerlessSecrets": {
                    "default": sinon.stub().returns(Promise.reject(new Error(stubErrorMessage)))
                }
            });

            return proxyquiredConfigureEnvironment.default()
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error).to.be.ok;
                    expect(error.message).to.eql(stubErrorMessage);
                });
        });

        it("works", function () {
            const proxyquireStubs = {
                "./loadServerlessSecrets": {
                    "default": sinon.stub().returns(Promise.resolve())
                },
                "../../lib/logger": {
                    "configureLogger": sinon.stub().returns(Promise.resolve())
                }
            };
            const proxyquiredConfigureEnvironment = proxyquire("../../../../serverless/util/configureEnvironment", proxyquireStubs);

            return proxyquiredConfigureEnvironment.default()
                .then(() => {
                    expect(proxyquireStubs["./loadServerlessSecrets"].default.calledOnce).to.eql(true);
                    expect(proxyquireStubs["../../lib/logger"].configureLogger.calledOnce).to.eql(true);
                });
        });
    });

    describe("loadServerlessSecrets", function () {
        let originalNodeEnv = process.env.NODE_ENV;

        beforeEach(function () {
            sinon.stub(serverlessSecretsClient, "load").callsFake(() => Promise.resolve());
            process.env.NODE_ENV = "!test";
        });

        afterEach(function () {
            serverlessSecretsClient.load.restore();
            process.env.NODE_ENV = originalNodeEnv;
        });

        it("delegates to serverlessSecretsClient.load()", function () {
            return loadServerlessSecrets()
                .then(() => {
                    expect(serverlessSecretsClient.load.calledOnce).to.eql(true);
                });
        });

        it("shortcircuits in `NODE_ENV === \"test\"`", function () {
            process.env.NODE_ENV = "test";

            return loadServerlessSecrets()
                .then(() => {
                    expect(serverlessSecretsClient.load.notCalled).to.eql(true);
                });
        });
    });
});
