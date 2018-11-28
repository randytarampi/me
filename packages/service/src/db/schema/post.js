import {compositeKeySeparator, Photo, Post} from "@randy.tarampi/js";
import {Schema} from "dynamoose";

const throughput = {read: 5, write: 5};

const post = new Schema({
    uid: {
        type: String,
        default: model => `${model.source}${compositeKeySeparator}${model.id}`,
        index: [
            {
                global: true,
                name: "uid-index",
                throughput
            }
        ]
    },
    id: {
        type: String,
        rangeKey: true
    },
    type: {
        type: String,
        required: true,
        enum: [
            Photo.type,
            Post.type
        ],
        index: [
            {
                global: false,
                name: "source-type-index"
            },
            {
                global: true,
                name: "type-datePublished-index",
                rangeKey: "datePublished",
                throughput
            },
            {
                global: true,
                name: "type-dateCreated-index",
                rangeKey: "dateCreated",
                throughput
            },
            {
                global: true,
                name: "type-geohash-index",
                rangeKey: "geohash",
                throughput
            }
        ]
    },
    source: {
        type: String,
        hashKey: true,
        required: true
    },
    datePublished: {
        type: Date,
        required: true,
        get: date => date && date.toISOString(),
        index: [
            {
                global: false,
                name: "source-datePublished-index"
            }
        ]
    },
    dateCreated: {
        type: Date,
        get: date => date && date.toISOString(),
        index: [
            {
                global: false,
                name: "source-dateCreated-index"
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
                name: "source-geohash-index"
            }
        ]
    }
}, {
    throughput,
    useNativeBooleans: true,
    useDocumentTypes: true,
    timestamps: true,
    expires: 24 * 60 * 60
});

export default post;
