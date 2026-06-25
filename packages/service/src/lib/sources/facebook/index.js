const {FacebookSource} = require("./source.js");

module.exports = FacebookSource;
Object.assign(module.exports, require("./authInfo.js"));
Object.assign(module.exports, require("./source.js"));
module.exports.default = module.exports;
