const {compositeKeySeparator} = require("@randy.tarampi/js");
const dynamoose = require("dynamoose");

const {Schema} = dynamoose;
const {AUTH_INFO_TYPE} = require("../../lib/authInfo.js");

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
    timestamps: true
});

module.exports = authInfo;
module.exports.default = module.exports;
