const {TwitterSource} = require("./source.js");

module.exports = TwitterSource;
Object.assign(module.exports, require("./authInfo.js"));
Object.assign(module.exports, require("./source.js"));
module.exports.default = module.exports;
