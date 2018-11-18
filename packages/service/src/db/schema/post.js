import {compositeKeySeparator, Photo, Post} from "@randy.tarampi/js";
import {Schema} from "dynamoose";

const throughput = {read: 4, write: 4};

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
            Photo.name,
            Post.name
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
    }
}, {
    throughput,
    useNativeBooleans: true,
    useDocumentTypes: true,
    timestamps: true,
    expires: 24 * 60 * 60
});

export default post;
