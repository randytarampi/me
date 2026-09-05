import {compositeKeySeparator, POST_ENTITIES_MAP, POST_STATUS} from "@randy.tarampi/js";
import dynamoose from "dynamoose";

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
        type: [
            {
                type: Object,
                schema: dynamoose.type.ANY
            },
            String
        ],
        // The nested schema must be declared on the union itself as well as on its Object member.
        // Dynamoose v4 otherwise resolves the union's object branch without a nested schema and
        // silently strips every key from object-valued raw payloads on read.
        schema: dynamoose.type.ANY,
        required: true,
        // NOTE-RT: without this, dynamoose has no declared nested schema for `raw`, so every key
        // underneath it gets treated as "unknown" and silently stripped down to an empty object on
        // every single write - confirmed by writing a real record through this exact model against
        // LocalStack and reading the marshalled bytes back. `schema: dynamoose.type.ANY` is
        // dynamoose's own documented way of declaring "this Object attribute's content is
        // arbitrary/untyped", which is exactly what a raw third-party API response is.
        // Legacy rows may have `raw` stored as a DynamoDB String, which dynamoose v4 rejects on read
        // unless the schema declares the union; the union is read-tolerant and the write path keeps
        // producing objects.
    },
    tags: {
        type: Set,
        schema: [String],
        // Empty-string tags are filtered out, values lowercased and de-duplicated, and the result returned
        // as a `Set` so Dynamoose v4 persists a DynamoDB String Set (`SS`) (a plain array would be stored as
        // a List and fail the read-back type check). Replaces the old `lowercase: true` setting, which does
        // not apply cleanly to Set modifiers in v4.
        //
        // NOTE-RT: must return `undefined`, not an empty `Set`, when nothing survives filtering. DynamoDB
        // rejects an empty Set outright ("Pass a non-empty set, or options.convertEmptyValues=true"), and
        // that's a client-side validation error the AWS SDK raises against the *whole batch* before it's
        // ever sent - so a single untagged post used to fail every other post in the same `createRecords`
        // batch write. `tags` isn't `required`, so omitting it entirely is a clean no-op here.
        set: tags => {
            if (!tags) {
                return tags;
            }

            const filteredTags = new Set(Array.from(tags)
                .filter(tag => !!tag)
                .map(tag => tag.toLowerCase()));

            return filteredTags.size ? filteredTags : undefined;
        }
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

export default post;
