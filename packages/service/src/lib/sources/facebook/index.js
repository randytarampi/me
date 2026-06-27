// @ts-check
const {FacebookSource} = require("./source.js");

/** @type {typeof FacebookSource} */
module.exports = FacebookSource;
Object.assign(module.exports, require("./authInfo.js"));
Object.assign(module.exports, require("./source.js"));
module.exports.default = module.exports;
