// @ts-check
const {TwitterSource} = require("./source.js");

/** @type {typeof TwitterSource} */
module.exports = TwitterSource;
Object.assign(module.exports, require("./authInfo.js"));
Object.assign(module.exports, require("./source.js"));
module.exports.default = module.exports;
