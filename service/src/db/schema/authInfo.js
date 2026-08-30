import {compositeKeySeparator} from "@randy.tarampi/js";
import dynamoose from "dynamoose";
import {AUTH_INFO_TYPE} from "../../lib/authInfo.js";

const {Schema} = dynamoose;

const authInfo = new Schema({
    uid: {
        type: String,
        default: model => `${model.source}${compositeKeySeparator}${model.id}`
    },
    id: {
        type: String,
        rangeKey: true,
        required: true
    },
    source: {
        type: String,
        hashKey: true,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: AUTH_INFO_TYPE.oauth
    },
    raw: {
        type: Object,
        required: true,
        // NOTE-RT: see the identical NOTE-RT in `post.js` - without this, dynamoose has no declared
        // nested schema for `raw`, so every key underneath it gets silently stripped down to an
        // empty object on every single write.
        schema: dynamoose.type.ANY
    }
}, {
    timestamps: true
});

export default authInfo;
