module.exports = {
    babelLoaderExclusions: /\/node_modules\/(?!(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|react-dimensions)\/)/,
    babelRegisterInclusions: /\/(?:node_modules\/(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|react-dimensions)|packages)\//
};
