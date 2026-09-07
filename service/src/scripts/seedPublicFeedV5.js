import {createHash} from "node:crypto";
import {readFile} from "node:fs/promises";
import {Post} from "@randy.tarampi/js";
import dynamoose from "dynamoose";
import {getModel as getPostModel} from "../db/models/post.js";
import {setupLocal} from "../serverless/dynamodb/util.js";
import {sources} from "../lib/sources/index.js";

const fixturePath = new URL("../../test/fixtures/public-feed-v5/records.json", import.meta.url);
const localTablePattern = /^local-[a-zA-Z0-9-]+$/;

const assertLocalTable = tableName => {
    if (!localTablePattern.test(tableName)) throw new Error(`Refusing to seed non-local table: ${tableName}`);
};

const readFixture = async () => {
    const source = await readFile(fixturePath, "utf8");
    return {records: JSON.parse(source), hash: createHash("sha256").update(source).digest("hex")};
};

const fixtureToRecord = fixture => {
    const sourcePayload = fixture.source === "s3" ? {...fixture, Key: fixture.id} : fixture;
    const raw = fixture.rawMode === "invalid-json" ? "not-json" : sourcePayload;
    let record;
    if (sources[fixture.source]) {
        record = sources[fixture.source].instanceToRecord(sourcePayload);
    } else {
        record = Post.fromJS({id: fixture.id, source: fixture.source, type: fixture.type, datePublished: fixture.date, raw});
    }

    record = record.set("status", "VISIBLE").set("raw", fixture.rawMode === "json-string" ? JSON.stringify(sourcePayload) : raw);
    return record;
};

const seedPublicFeedV5 = async ({reset = false} = {}) => {
    setupLocal();
    const tableName = process.env.SERVICE_POSTS_DYNAMODB_TABLE || "local-posts";
    assertLocalTable(tableName);
    const {records, hash} = await readFixture();
    const model = getPostModel(tableName);

    if (reset) {
        try {
            await dynamooseDeleteTable(tableName);
        } catch (error) {
            if (error?.name !== "ResourceNotFoundException") throw error;
        }
        await model.createTable();
    }

    await model.dynamooseModel.table().initialize();
    await model.createRecords(records.map(fixtureToRecord));
    console.log(JSON.stringify({fixture: "public-feed-v5", hash, count: records.length, table: tableName}));
};

const dynamooseDeleteTable = TableName => dynamoose.aws.ddb().deleteTable({TableName});

if (process.argv[1] === import.meta.filename) {
    seedPublicFeedV5({reset: process.argv.includes("--reset")})
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
}

export {assertLocalTable, fixtureToRecord, seedPublicFeedV5};
export default seedPublicFeedV5;
