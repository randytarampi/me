require("@babel/polyfill");

const path = require("path");
const util = require("./util");

require("@babel/register")({
    configFile: path.join(__dirname, "babel.config.js"),
    only: [
        util.babelRegisterInclusions
    ]
});
