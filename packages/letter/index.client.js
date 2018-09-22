var builtOrUnbuiltModule;

try {
    builtOrUnbuiltModule = require("./src/index.client");
} catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
        builtOrUnbuiltModule = require("./build/index.client"); // eslint-disable-line import/no-unresolved
    } else {
        throw error;
    }
}

module.exports = builtOrUnbuiltModule;
