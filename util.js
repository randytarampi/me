const productionEnvs = ["production", "prd"];
const isNodeEnvDevelopment = !productionEnvs.includes(process.env.NODE_ENV);
const isBabelEnvDevelopment = process.env.BABEL_ENV !== undefined
    ? !productionEnvs.includes(process.env.BABEL_ENV)
    : isNodeEnvDevelopment;
const isDevelopment = isNodeEnvDevelopment && isBabelEnvDevelopment;

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
    productionEnvs,
    isDevelopment,
    isNodeEnvDevelopment,
    isBabelEnvDevelopment,
    resolveWebpackMode,
    webpackMode,
    webpackNodeExternalsWhitelist: /(?:@randy\.tarampi\/(?:schema-dot-org-json-ld-components|schema-dot-org-types|react-dimensions|redux-offline-immutable-config))|query-string|strict-uri-encode|strip-ansi|ansi-regex|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap|react-hot-loader|dom-helpers|redux-immutable|reduce-reducers|react-router|react-progressive-image|react-metrics|react-event-listener|react-helmet|split-on-first|materialize-css|react-materialize/,
    babelLoaderExclusions: /\/node_modules\/(?!(?:(?:@randy\.tarampi\/(?:schema-dot-org-json-ld-components|schema-dot-org-types|react-dimensions|redux-offline-immutable-config))|query-string|strict-uri-encode|strip-ansi|ansi-regex|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap|react-hot-loader|dom-helpers|redux-immutable|reduce-reducers|react-router|react-progressive-image|react-metrics|react-event-listener|react-helmet|split-on-first|materialize-css|react-materialize)\/)/,
    babelRegisterInclusions: /\/(?:node_modules\/(?:(?:@randy\.tarampi\/(?:schema-dot-org-json-ld-components|schema-dot-org-types|react-dimensions|redux-offline-immutable-config))|query-string|strict-uri-encode|strip-ansi|ansi-regex|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap|react-hot-loader|dom-helpers|redux-immutable|reduce-reducers|react-router|react-progressive-image|react-metrics|react-event-listener|react-helmet|split-on-first|materialize-css|react-materialize)|packages)\//,
    webpackVendorInclusions: /\/node_modules\//
};
