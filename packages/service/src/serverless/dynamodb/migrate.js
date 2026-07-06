import dynamoose from "dynamoose";
import {getModel as getPostModel} from "../../db/models/post.js";
import {getModel as getAuthInfoModel} from "../../db/models/authInfo.js";
import {setupLocal} from "./util.js";

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

export {createLocalTables};

if (process.argv[1] === import.meta.filename) {
    createLocalTables()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}

export default {createLocalTables};
