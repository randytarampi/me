import {expect} from "chai";
import {backfillPublicFeedAttributes} from "../../../../src/scripts/backfillPublicFeedAttributes.js";

const post = (uid, datePublished = undefined) => ({
    status: "VISIBLE",
    uid,
    type: "Post",
    source: "s3",
    datePublished,
    dateCreated: new Date("2024-01-01T00:00:00.000Z")
});

const modelForPages = pages => {
    let pageIndex = 0;
    const scans = [];
    const model = {
        dynamooseModel: {
            scan: () => {
                const scan = {
                    attributes: attributes => {
                        scan.projected = attributes;
                        return scan;
                    },
                    limit: limit => {
                        scan.pageSize = limit;
                        return scan;
                    },
                    startAt: cursor => {
                        scan.cursor = cursor;
                        return scan;
                    },
                    exec: async () => {
                        scans.push(scan);
                        return pages[pageIndex++] || [];
                    }
                };
                return scan;
            }
        },
        updatePublicFeedAttributes: async () => {}
    };
    model.scans = scans;
    return model;
};

describe("backfillPublicFeedAttributes", function () {
    it("dry-runs without updating, projects only required fields, and checkpoints", async function () {
        const model = modelForPages([[post("one", new Date("2024-01-02T00:00:00.000Z"))]]);
        let updates = 0;
        model.updatePublicFeedAttributes = async () => updates++;
        const result = await backfillPublicFeedAttributes({model, dryRun: true, maxPages: 1});

        expect(updates).to.eql(0);
        expect(result.updated).to.eql(1);
        expect(model.scans[0].projected).to.eql(["status", "uid", "type", "source", "datePublished", "dateCreated"]);
        expect(result.complete).to.eql(true);
    });

    it("resumes from a checkpoint and performs conditional idempotent updates", async function () {
        const model = modelForPages([[post("two")]]);
        let updates = 0;
        model.updatePublicFeedAttributes = async () => {
            updates++;
            const error = new Error("already present");
            error.name = "ConditionalCheckFailedException";
            throw error;
        };

        const result = await backfillPublicFeedAttributes({
            model,
            dryRun: false,
            checkpoint: {exclusiveStartKey: {status: "VISIBLE", uid: "one"}}
        });

        expect(model.scans[0].cursor).to.eql({status: "VISIBLE", uid: "one"});
        expect(updates).to.eql(1);
        expect(result.updated).to.eql(0);
        expect(result.skipped).to.eql(1);
    });

    it("counts invalid shapes and uses dateCreated when publication date is absent", async function () {
        const model = modelForPages([[post("fallback"), {...post("missing"), type: undefined}]]);
        const result = await backfillPublicFeedAttributes({model});

        expect(result.updated).to.eql(1);
        expect(result.invalid).to.eql(1);
    });
});
