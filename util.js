const productionNodeEnvs = ["production", "prd"];
const nodeEnvIsNotProduction = !productionNodeEnvs.includes(process.env.NODE_ENV);
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
    productionNodeEnvs,
    nodeEnvIsNotProduction,
    isDevelopment,
    resolveWebpackMode,
    webpackMode,
    webpackNodeExternalsWhitelist: /@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap|react-hot-loader|dom-helpers|redux-immutable|reduce-reducers|react-router|react-progressive-image|react-metrics|react-materialize|react-event-listener|react-helmet/,
    babelLoaderExclusions: /\/node_modules\/(?!(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap|react-hot-loader|dom-helpers|redux-immutable|reduce-reducers|react-router|react-progressive-image|react-metrics|react-materialize|react-event-listener|react-helmet)\/)/,
    babelRegisterInclusions: /\/(?:node_modules\/(?:@randy\.tarampi|query-string|strict-uri-encode|strip-ansi|ansi-regex|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap|react-hot-loader|dom-helpers|redux-immutable|reduce-reducers|react-router|react-progressive-image|react-metrics|react-materialize|react-event-listener|react-helmet)|packages)\//,
    webpackVendorInclusions: /\/node_modules\//
};
