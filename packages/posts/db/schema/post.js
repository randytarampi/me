import {Photo, Post, util} from "@randy.tarampi/js";
import {Schema} from "dynamoose";

const post = new Schema({
    uid: {
        type: String,
        hashKey: true,
        default: model => `${model.source}${util.compositeKeySeparator}${model.id}`
    },
    id: {
        type: String,
        required: true,
        index: {
            global: true
        }
    },
    type: {
        type: String,
        required: true,
        enum: [
            Photo.name,
            Post.name
        ],
        index: {
            global: true
        }
    },
    source: {
        type: String,
        required: true,
        index: {
            global: true
        }
    },
    datePublished: {
        type: Date,
        index: {
            global: true
        }
    },
    dateCreated: {
        type: Date,
        index: {
            global: true
        }
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
    throughput: 1,
    useNativeBooleans: false,
    useDocumentTypes: false,
    timestamps: true,
    expires: 7 * 24 * 60 * 60
});

post.methods.toEntity = function () {
    const Constructor = util.getEntityForType(this.type);
    return Constructor.fromJSON(this);
};

export default post;
