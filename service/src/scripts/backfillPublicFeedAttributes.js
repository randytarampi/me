import fs from "node:fs/promises";
import PostModel from "../db/models/post.js";
import {publicFeedAttributesForRecord} from "../db/dynamooseModel.js";

const PROJECTION = ["status", "uid", "type", "source", "datePublished", "dateCreated"];

const sleep = milliseconds => milliseconds > 0
    ? new Promise(resolve => setTimeout(resolve, milliseconds))
    : Promise.resolve();

const readCheckpoint = async checkpointPath => {
    if (!checkpointPath) return {};
    try {
        return JSON.parse(await fs.readFile(checkpointPath, "utf8"));
    } catch (error) {
        if (error.code === "ENOENT") return {};
        throw error;
    }
};

const writeCheckpoint = (checkpointPath, checkpoint) => checkpointPath
    ? fs.writeFile(checkpointPath, `${JSON.stringify(checkpoint, null, 2)}\n`)
    : Promise.resolve();

/** Scan and optionally backfill only the synthetic public-feed attributes. */
const backfillPublicFeedAttributes = async ({
    model = PostModel,
    dryRun = true,
    checkpointPath,
    pageSize = 25,
    maxPages = Infinity,
    delayMs = 0,
    checkpoint
} = {}) => {
    if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 1000) {
        throw new RangeError("pageSize must be an integer between 1 and 1000");
    }
    if (!Number.isInteger(delayMs) || delayMs < 0) {
        throw new RangeError("delayMs must be a non-negative integer");
    }

    checkpoint = checkpoint || await readCheckpoint(checkpointPath);
    const counts = {updated: 0, skipped: 0, invalid: 0, pages: 0};
    if (checkpoint.complete) {
        return {...counts, complete: true, checkpoint: null};
    }
    let exclusiveStartKey = checkpoint.complete ? undefined : checkpoint.exclusiveStartKey;

    while (counts.pages < maxPages) {
        let scan = model.dynamooseModel.scan().attributes(PROJECTION).limit(pageSize);
        if (exclusiveStartKey) scan = scan.startAt(exclusiveStartKey);
        const records = await scan.exec();
        counts.pages++;

        for (const record of records) {
            const attributes = publicFeedAttributesForRecord(record);
            if (!attributes) {
                counts.invalid++;
                continue;
            }

            if (record.publicFeedPartition === attributes.publicFeedPartition && record.publicFeedSort === attributes.publicFeedSort) {
                counts.skipped++;
                continue;
            }

            counts.updated++;
            if (!dryRun) {
                try {
                    await model.updatePublicFeedAttributes({status: record.status, uid: record.uid}, attributes);
                } catch (error) {
                    if (error.name !== "ConditionalCheckFailedException") throw error;
                    counts.updated--;
                    counts.skipped++;
                }
            }
        }

        exclusiveStartKey = records.lastKey;
        await writeCheckpoint(checkpointPath, {
            complete: !exclusiveStartKey,
            exclusiveStartKey: exclusiveStartKey || null,
            ...counts
        });
        if (!exclusiveStartKey) break;
        await sleep(delayMs);
    }

    return {...counts, complete: !exclusiveStartKey, checkpoint: exclusiveStartKey || null};
};

const argumentValue = (argumentsList, name) => {
    const index = argumentsList.indexOf(name);
    return index < 0 ? undefined : argumentsList[index + 1];
};

const run = async argumentsList => {
    const stage = argumentValue(argumentsList, "--stage");
    if (stage !== "dev") {
        throw new Error("This command requires explicit --stage dev; production is not supported");
    }
    if (!process.env.SERVICE_POSTS_DYNAMODB_TABLE) {
        throw new Error("SERVICE_POSTS_DYNAMODB_TABLE must identify the dev table");
    }

    const result = await backfillPublicFeedAttributes({
        dryRun: !argumentsList.includes("--write"),
        checkpointPath: argumentValue(argumentsList, "--checkpoint"),
        pageSize: Number(argumentValue(argumentsList, "--page-size") || 25),
        maxPages: Number(argumentValue(argumentsList, "--max-pages") || Infinity),
        delayMs: Number(argumentValue(argumentsList, "--delay-ms") || 0)
    });
    console.log(JSON.stringify(result));
};

export {backfillPublicFeedAttributes, PROJECTION, run};

if (process.argv[1] === import.meta.filename) {
    run(process.argv.slice(2)).catch(error => {
        console.error(error.message);
        process.exitCode = 1;
    });
}
