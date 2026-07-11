// NOTE-RT: NODE_ENV/NODE_CONFIG_ENV decoupling — see docs/CONVENTIONS.md#building
const productionEnvs = ["production", "prd"];
// NOTE-RT: development mode is opt-in — see docs/CONVENTIONS.md#building
const isNodeEnvDevelopment = process.env.NODE_ENV === "development";
const isBabelEnvDevelopment = process.env.BABEL_ENV !== undefined
    ? process.env.BABEL_ENV === "development"
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
    webpackNodeExternalsWhitelist: /(?:@randy\.tarampi\/(?:schema-dot-org-json-ld-components|schema-dot-org-types|react-dimensions|redux-offline-immutable-config))|query-string|strict-uri-encode|strip-ansi|ansi-regex|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap|dom-helpers|redux-immutable|reduce-reducers|react-router|react-progressive-image|react-metrics|react-event-listener|react-helmet|split-on-first|latlon-geohash/,
    babelLoaderExclusions: /\/node_modules\/(?!(?:(?:@randy\.tarampi\/(?:schema-dot-org-json-ld-components|schema-dot-org-types|react-dimensions|redux-offline-immutable-config))|query-string|strict-uri-encode|strip-ansi|ansi-regex|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap|dom-helpers|redux-immutable|reduce-reducers|react-router|react-progressive-image|react-metrics|react-event-listener|react-helmet|split-on-first|latlon-geohash)\/)/,
    babelRegisterInclusions: /\/(?:node_modules\/(?:(?:@randy\.tarampi\/(?:schema-dot-org-json-ld-components|schema-dot-org-types|react-dimensions|redux-offline-immutable-config))|query-string|strict-uri-encode|strip-ansi|ansi-regex|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap|dom-helpers|redux-immutable|reduce-reducers|react-progressive-image|react-metrics|react-event-listener|react-helmet|split-on-first|latlon-geohash)|packages)\//,
    webpackVendorInclusions: /\/node_modules\//
};
