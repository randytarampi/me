module.exports = {
    babelLoaderExclusions: /\/node_modules\/(?!(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|react-dimensions|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap)\/)/,
    babelRegisterInclusions: /\/(?:node_modules\/(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|react-dimensions|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap)|packages)\//,
    webpackVendorInclusions: /\/node_modules\//,
};
