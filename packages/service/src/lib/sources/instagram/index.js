// @ts-check
const {InstagramSource} = require("./source.js");

/** @type {typeof InstagramSource} */
module.exports = InstagramSource;
Object.assign(module.exports, require("./authInfo.js"));
Object.assign(module.exports, require("./source.js"));
module.exports.default = module.exports;
