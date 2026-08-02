import {expect} from "chai";
import sinon from "sinon";
import esmock from "../../../../lib/esmock.js";

// NOTE-RT: these two modules are `${file(...)}` variable sources for
// `resources.Resources.{Posts,AuthInfo}DynamoDbTable.Properties`, so nothing else in the suite
// exercises them - and for seven years nothing noticed that they resolved their `TableName` from a
// `process.env` variable the Serverless CLI process never sets, silently declaring `local-posts` at
// every stage. The `process.env` cases below are the regression tests for exactly that: `getModel()`
// defaults its argument to `process.env.SERVICE_*_DYNAMODB_TABLE`, so a resolution that quietly
// returns `undefined` still produces a plausible-looking template.

const tableProperties = [
    {
        description: "post",
        modulePath: "../../../../../src/serverless/dynamodb/post.js",
        modelPath: "../../../../../src/db/models/post.js",
        configurationPath: ["custom", "postsTableName"],
        environmentVariable: "SERVICE_POSTS_DYNAMODB_TABLE",
        resolvedTableName: "prd-service-posts-2019-01-11"
    },
    {
        description: "authInfo",
        modulePath: "../../../../../src/serverless/dynamodb/authInfo.js",
        modelPath: "../../../../../src/db/models/authInfo.js",
        configurationPath: ["custom", "authInfoTableName"],
        environmentVariable: "SERVICE_AUTH_INFO_DYNAMODB_TABLE",
        resolvedTableName: "prd-service-authInfo-2019-01-18"
    }
];

describe("serverless/dynamodb", function () {
    tableProperties.forEach(({description, modulePath, modelPath, configurationPath, environmentVariable, resolvedTableName}) => {
        describe(description, function () {
            const loadTableProperties = async () => {
                const stubGetModel = sinon.stub().callsFake(modelName => ({
                    getCreateTableRequest: () => ({TableName: modelName})
                }));

                const {default: buildTableProperties} = await esmock(modulePath, import.meta.url, {
                    "../../../../../src/serverless/dynamodb/util.js": {setupLocal: sinon.stub()},
                    [modelPath]: {getModel: stubGetModel}
                });

                return {buildTableProperties, stubGetModel};
            };

            it(`resolves TableName from ${configurationPath.join(".")}`, async function () {
                const stubResolve = sinon.stub().resolves(resolvedTableName);
                const {buildTableProperties, stubGetModel} = await loadTableProperties();

                const properties = await buildTableProperties({resolveConfigurationProperty: stubResolve});

                expect(stubResolve.calledOnceWith(configurationPath)).to.eql(true);
                expect(stubGetModel.calledOnceWith(resolvedTableName)).to.eql(true);
                expect(properties.TableName).to.eql(resolvedTableName);
            });

            it(`ignores process.env.${environmentVariable}`, async function () {
                const originalValue = process.env[environmentVariable];

                process.env[environmentVariable] = "a-table-nobody-asked-for";

                try {
                    const {buildTableProperties} = await loadTableProperties();
                    const properties = await buildTableProperties({
                        resolveConfigurationProperty: sinon.stub().resolves(resolvedTableName)
                    });

                    expect(properties.TableName).to.eql(resolvedTableName);
                } finally {
                    if (originalValue === undefined) {
                        delete process.env[environmentVariable];
                    } else {
                        process.env[environmentVariable] = originalValue;
                    }
                }
            });

            it("throws rather than falling back when the name doesn't resolve", async function () {
                const {buildTableProperties, stubGetModel} = await loadTableProperties();

                return buildTableProperties({resolveConfigurationProperty: sinon.stub().resolves(undefined)})
                    .then(() => {
                        throw new Error("Wtf? This should've thrown");
                    })
                    .catch(error => {
                        expect(error.message).to.match(/did not resolve/);
                        expect(stubGetModel.called).to.eql(false);
                    });
            });
        });
    });
});
