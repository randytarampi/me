import util from "./util.cjs";

export const {
    WEBPACK_MODE_PRODUCTION,
    WEBPACK_MODE_DEVELOPMENT,
    productionEnvs,
    isDevelopment,
    isNodeEnvDevelopment,
    isBabelEnvDevelopment,
    resolveWebpackMode,
    webpackMode,
    webpackNodeExternalsWhitelist,
    babelLoaderExclusions,
    babelRegisterInclusions,
    webpackVendorInclusions
} = util;

export default util;
