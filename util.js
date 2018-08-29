module.exports = {
    babelLoaderExclusions: /\/node_modules\/(?!(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex)\/)/,
    babelRegisterInclusions: /\/(?:node_modules\/(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex)|packages)\//
};
