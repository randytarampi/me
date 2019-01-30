import {compositeKeySeparator, POST_ENTITIES_MAP, POST_STATUS} from "@randy.tarampi/js";
import {Schema} from "dynamoose";

const post = new Schema({
    uid: {
        type: String,
        rangeKey: true,
        default: model => `${model.source}${compositeKeySeparator}${model.id}`,
        index: [
            {
                global: true,
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
                global: false,
                name: "status-type-index"
            },
            {
                global: true,
                name: "type-datePublished-index",
                rangeKey: "datePublished"
            },
            {
                global: true,
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
                global: false,
                name: "status-source-index"
            }
        ]
    },
    datePublished: {
        type: Date,
        get: date => date && date.toISOString(),
        index: [
            {
                global: false,
                name: "status-datePublished-index"
            }
        ]
    },
    dateCreated: {
        type: Date,
        get: date => date && date.toISOString(),
        index: [
            {
                global: false,
                name: "status-dateCreated-index"
            }
        ]
    },
    raw: {
        type: Object,
        required: true
    },
    tags: {
        type: [String],
        lowercase: true,
        set: tags => tags && tags
            .filter(tag => !!tag)
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
                global: false,
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
    useNativeBooleans: true,
    useDocumentTypes: true,
    timestamps: true
});

export default post;
