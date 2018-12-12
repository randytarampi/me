const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "../../config");

const config = require("config");
const webpackBaseConfig = require("./webpack.client.config.base");

const bundleName = config.get("www.bundle.name");

module.exports = webpackBaseConfig({
    babelEnv: "client.es5",
    entry: {
        [bundleName]: ["@babel/polyfill", "raf/polyfill", path.join(__dirname, "src/public/views/index.jsx")]
    }
});
