import {setupLocal as setupLocalDynamoDb} from "./util.js";
import {getModel as getPostModel} from "../../db/models/post.js";

// NOTE-RT: the table name is resolved from the configuration, deliberately not from `process.env`.
// `SERVICE_POSTS_DYNAMODB_TABLE` is a *Lambda* environment variable; the Serverless CLI process
// that renders this template never has it set, so reading it here fell through to `setupLocal()`'s
// `local-posts` default and baked that into `TableName` at every stage - while
// `provider.environment`, every IAM resource ARN and every alarm dimension said
// `${stage}-service-posts-…`. Deploying that would have renamed a live table.
//
// It reads `custom.postsTableName` rather than `provider.environment.SERVICE_POSTS_DYNAMODB_TABLE`
// because `resolveConfigurationProperty` does not resolve `${file(…)}` references - see the note
// above `postsTableNamesByStage` in `serverless.yml`.
export default async ({resolveConfigurationProperty}) => {
    setupLocalDynamoDb();

    const tableName = await resolveConfigurationProperty(["custom", "postsTableName"]);

    // NOTE-RT: not defensive padding. `getModel()` defaults its argument to
    // `process.env.SERVICE_POSTS_DYNAMODB_TABLE || "local-posts"`, so an unresolved name here would
    // silently produce a plausible-looking template instead of an error - which is precisely how
    // the original defect stayed invisible for seven years.
    if (!tableName) {
        throw new Error("`custom.postsTableName` did not resolve; refusing to fall back to a default table name.");
    }

    const postModel = getPostModel(tableName);

    return postModel.getCreateTableRequest();
};
