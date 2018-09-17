const nodeEnvIsNotProduction = !["production", "prd"].includes(process.env.NODE_ENV);
const isDevelopment = nodeEnvIsNotProduction;

const WEBPACK_MODE_PRODUCTION = "production";
const WEBPACK_MODE_DEVELOPMENT = "development";

const resolveWebpackMode = () => {
    if (isDevelopment) {
        return WEBPACK_MODE_DEVELOPMENT;
    }

    return WEBPACK_MODE_PRODUCTION;
};
const webpackMode = resolveWebpackMode();

module.exports = {
    WEBPACK_MODE_PRODUCTION,
    WEBPACK_MODE_DEVELOPMENT,
    nodeEnvIsNotProduction,
    isDevelopment,
    resolveWebpackMode,
    webpackMode,
    babelLoaderExclusions: webpackMode === WEBPACK_MODE_DEVELOPMENT
        ? /\/node_modules\/(?!(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|react-dimensions|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap)\/)/
        : /!^/,
    babelRegisterInclusions: /\/(?:node_modules\/(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|react-dimensions|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap)|packages)\//,
    webpackVendorInclusions: /\/node_modules\//,
};
