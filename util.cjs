// NOTE-RT: documents the production-like `NODE_ENV` values this repo's build scripts actually use
// (`"production"`, the ecosystem-standard value every build script hardcodes so React/Terser/
// webpack's own `mode` resolution behave correctly, and `"prd"`, the value `config/`'s own file
// naming convention expects - there is no `config/production.yml`). Every build script that sets
// `NODE_ENV=production` also sets `NODE_CONFIG_ENV=prd` alongside it (decoupling "which config file
// to load" from `NODE_ENV` itself, per `config@5`'s own supported mechanism for this), so `config`
// correctly loads `config/prd.yml` instead of silently falling back to `default.cjs`/`local.cjs`.
const productionEnvs = ["production", "prd"];
// NOTE-RT: opt-in, not opt-out - development-mode tooling (react-refresh, HMR, eval-source-map)
// is only enabled when `NODE_ENV`/`BABEL_ENV` is explicitly set to the literal `"development"`.
// A missing/unexpected env var now fails safe (production-like output) instead of silently
// enabling development-only behavior (which used to crash `react-refresh/babel` outright).
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
