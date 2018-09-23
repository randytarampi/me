var builtOrUnbuiltModule;

try {
    builtOrUnbuiltModule = require("./src/html");
} catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
        builtOrUnbuiltModule = require("./build/html"); // eslint-disable-line import/no-unresolved
    } else {
        throw error;
    }
}

module.exports = builtOrUnbuiltModule;
