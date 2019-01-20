import {compositeKeySeparator} from "@randy.tarampi/js";
import {Schema} from "dynamoose";
import {AUTH_INFO_TYPE} from "../../lib/authInfo";

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
        required: true
    }
}, {
    useNativeBooleans: true,
    useDocumentTypes: true,
    timestamps: true
});

export default authInfo;
