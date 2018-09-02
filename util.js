module.exports = {
    babelLoaderExclusions: /\/node_modules\/(?!(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|react-dimensions)\/)/,
    babelRegisterInclusions: /\/(?:node_modules\/(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|react-dimensions)|packages)\//,
    webpackVendorInclusions: /\/node_modules\/(?!(?:mv|safe-json-stringify|dtrace-provider|moment|source-map-support)\/)/,
    webpackModuleNoParseInclusions: /(?:mv|safe-json-stringify|dtrace-provider|moment|source-map-support)/
};
