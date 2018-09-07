module.exports = {
    babelLoaderExclusions: /\/node_modules\/(?!(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|react-dimensions|bunyan-sentry-stream)\/)/,
    babelRegisterInclusions: /\/(?:node_modules\/(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|react-dimensions|bunyan-sentry-stream)|packages)\//,
    webpackVendorInclusions: /\/node_modules\//,
};
