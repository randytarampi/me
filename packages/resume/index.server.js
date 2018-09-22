var builtOrUnbuiltModule;

try {
    builtOrUnbuiltModule = require("./src/index.server");
} catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
        builtOrUnbuiltModule = require("./build/index.server"); // eslint-disable-line import/no-unresolved
    } else {
        throw error;
    }
}

module.exports = builtOrUnbuiltModule;
