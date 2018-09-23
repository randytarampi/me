var builtOrUnbuiltModule;

try {
    builtOrUnbuiltModule = require("./src/pdf");
} catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
        builtOrUnbuiltModule = require("./build/pdf"); // eslint-disable-line import/no-unresolved
    } else {
        throw error;
    }
}

module.exports = builtOrUnbuiltModule;
