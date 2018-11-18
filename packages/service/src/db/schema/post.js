import {compositeKeySeparator, Photo, Post} from "@randy.tarampi/js";
import {Schema} from "dynamoose";

const throughput = {read: 4, write: 4};

const post = new Schema({
    uid: {
        type: String,
        hashKey: true,
        default: model => `${model.source}${compositeKeySeparator}${model.id}`
    },
    type: {
        type: String,
        required: true,
        enum: [
            Photo.name,
            Post.name
        ],
        index: [
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
                name: "type-source-index",
                rangeKey: "source",
                throughput
            }
        ]
    },
    source: {
        type: String,
        required: true,
        index: [
            {
                global: true,
                name: "source-datePublished-index",
                rangeKey: "datePublished",
                throughput
            },
            {
                global: true,
                name: "source-dateCreated-index",
                rangeKey: "dateCreated",
                throughput
            }
        ]
    },
    datePublished: {
        type: Date,
        required: true,
        get: date => date && date.toISOString()
    },
    dateCreated: {
        type: Date,
        get: date => date && date.toISOString()
    },
    raw: {
        type: Object,
        required: true
    }
}, {
    throughput,
    useNativeBooleans: false,
    useDocumentTypes: false,
    timestamps: true,
    expires: 24 * 60 * 60
});

export default post;
