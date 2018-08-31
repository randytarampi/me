import {Photo, Post, util} from "@randy.tarampi/js";
import {Schema} from "dynamoose";

const throughput = {read: 1, write: 4};

const post = new Schema({
    uid: {
        type: String,
        hashKey: true,
        default: model => `${model.source}${util.compositeKeySeparator}${model.id}`
    },
    id: {
        type: String
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
                throughput: 1
            },
            {
                global: true,
                name: "type-dateCreated-index",
                rangeKey: "dateCreated",
                throughput: 1
            },
            {
                global: true,
                name: "type-source-index",
                rangeKey: "source",
                throughput: 1
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
                throughput: 1
            },
            {
                global: true,
                name: "source-dateCreated-index",
                rangeKey: "dateCreated",
                throughput: 1
            }
        ]
    },
    datePublished: {
        type: Date,
        required: true,
        get: date => date ? date.toISOString() : date
    },
    dateCreated: {
        type: Date,
        get: date => date ? date.toISOString() : date
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    sourceUrl: {
        type: String
    },
    creator: {
        type: Object
    },
    sizedPhotos: {
        type: [Object]
    }
}, {
    throughput,
    useNativeBooleans: false,
    useDocumentTypes: false,
    timestamps: true,
    expires: 24 * 60 * 60
});

post.methods.toEntity = function () {
    const Constructor = util.getEntityForType(this.type);
    return Constructor.fromJSON(this);
};

export default post;
