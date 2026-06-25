const {compositeKeySeparator, POST_ENTITIES_MAP, POST_STATUS} = require("@randy.tarampi/js");
const dynamoose = require("dynamoose");

const {Schema} = dynamoose;

const post = new Schema({
    uid: {
        type: String,
        rangeKey: true,
        default: model => `${model.source}${compositeKeySeparator}${model.id}`,
        index: [
            {
                type: "global",
                name: "uid-index"
            }
        ]
    },
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.keys(POST_ENTITIES_MAP),
        index: [
            {
                type: "local",
                name: "status-type-index"
            },
            {
                type: "global",
                name: "type-datePublished-index",
                rangeKey: "datePublished"
            },
            {
                type: "global",
                name: "type-geohash-index",
                rangeKey: "geohash"
            }
        ]
    },
    source: {
        type: String,
        required: true,
        index: [
            {
                type: "local",
                name: "status-source-index"
            }
        ]
    },
    datePublished: {
        type: Date,
        get: date => date && date.toISOString(),
        index: [
            {
                type: "local",
                name: "status-datePublished-index"
            }
        ]
    },
    dateCreated: {
        type: Date,
        get: date => date && date.toISOString(),
        index: [
            {
                type: "local",
                name: "status-dateCreated-index"
            }
        ]
    },
    raw: {
        type: Object,
        required: true
    },
    tags: {
        type: Set,
        schema: [String],
        // Empty-string tags are filtered out, values lowercased and de-duplicated, and the result returned
        // as a `Set` so Dynamoose v4 persists a DynamoDB String Set (`SS`) (a plain array would be stored as
        // a List and fail the read-back type check). Replaces the old `lowercase: true` setting, which does
        // not apply cleanly to Set modifiers in v4.
        set: tags => tags && new Set(Array.from(tags)
            .filter(tag => !!tag)
            .map(tag => tag.toLowerCase()))
    },
    lat: {
        type: Number
    },
    long: {
        type: Number
    },
    geohash: {
        type: String,
        index: [
            {
                type: "local",
                name: "status-geohash-index"
            }
        ]
    },
    status: {
        type: String,
        enum: Object.values(POST_STATUS),
        hashKey: true
    }
}, {
    throughput: "ON_DEMAND",
    timestamps: true
});

module.exports = post;
module.exports.default = module.exports;
