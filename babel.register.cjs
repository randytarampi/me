const path = require("path");
const util = require("./util.cjs");

require("@babel/register").default({
    configFile: path.join(__dirname, "babel.config.js"),
    extensions: [".js", ".jsx"],
    only: [
        /node_modules\/(?:@randy\.tarampi\/(?:schema-dot-org-json-ld-components|schema-dot-org-types|react-dimensions|redux-offline-immutable-config)|query-string|strict-uri-encode|strip-ansi|ansi-regex|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap|react-hot-loader|dom-helpers|redux-immutable|reduce-reducers|react-router|react-progressive-image|react-metrics|react-event-listener|react-helmet|split-on-first|latlon-geohash)\//,
        /packages\/(?!letter\/src\/lib\/(?:buildLetter|renderHtml)\.js$|job-application\/src\/lib\/jobApplication\.js$)/
    ]
});
