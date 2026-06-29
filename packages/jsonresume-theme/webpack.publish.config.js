import {createRequire} from "module";
import path from "path";
import {fileURLToPath} from "url";
import webpackBaseConfig from "../../webpack.publish.config.base.js";
import {webpackNodeExternalsWhitelist} from "../../util.js";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nodeExternals = require("webpack-node-externals");

export default webpackBaseConfig({
    babelEnv: "client.es5",
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "es5"),
    entry: {
        index: [path.join(__dirname, "./src/index.js")]
    },
    node: false,
    target: "node",
    externals: [nodeExternals({
        allowlist: [
            /@randy\.tarampi\//,
            webpackNodeExternalsWhitelist
        ]
    }), "pug"]
});
