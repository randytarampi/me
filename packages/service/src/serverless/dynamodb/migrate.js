const dynamoose = require("dynamoose");
const {getModel: getPostModel} = require("../../db/models/post.js");
const {getModel: getAuthInfoModel} = require("../../db/models/authInfo.js");
const {setupLocal} = require("./util.js");

const TABLE_ALREADY_EXISTS_PATTERN = /already exists|preexisting|ResourceInUseException/i;

const waitForLocalDynamoDb = async ({attempts = 30, delay = 1000} = {}) => {
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            await dynamoose.aws.ddb().listTables({});
            return;
        } catch (error) {
            if (attempt === attempts) {
                throw error;
            }

            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

const createLocalTables = async () => {
    setupLocal();

    await waitForLocalDynamoDb();

    const models = [
        getPostModel(process.env.SERVICE_POSTS_DYNAMODB_TABLE),
        getAuthInfoModel(process.env.SERVICE_AUTH_INFO_DYNAMODB_TABLE)
    ];

    for (const model of models) {
        try {
            await model.createTable();
            console.log(`Created local DynamoDB table "${model.modelName}"`);
        } catch (error) {
            if (error && (error.name === "ResourceInUseException" || TABLE_ALREADY_EXISTS_PATTERN.test(error.message || ""))) {
                console.log(`Local DynamoDB table "${model.modelName}" already exists`);
                continue;
            }

            throw error;
        }
    }
};

module.exports.createLocalTables = createLocalTables;

if (require.main === module) {
    createLocalTables()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}
module.exports.default = module.exports;
