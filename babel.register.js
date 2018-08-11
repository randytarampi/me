const path = require("path");

require("@babel/register")({
    configFile: path.join(__dirname, "babel.config.js"),
    only: [
        /(?:node_modules\/@randy\.tarampi|me\/packages)\//
    ]
});
