const path = require("path");

require("@babel/register")({
    configFile: path.join(__dirname, "babel.config.js"),
    only: [
        /(?:node_modules\/(@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex)|me\/packages)\//
    ]
});
