import {createRequire} from "module";
import {dirname, join} from "path";
import {fileURLToPath} from "url";
import util from "./util.js";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
process.env.NODE_CONFIG_DIR = join(__dirname, "config");

const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {
    isDevelopment,
    resolveWebpackMode: resolveMode
} = util;

const plugins = [
    new MiniCssExtractPlugin()
];

if (!isDevelopment || process.env.BUNDLE_ANALYZER) {
    plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        })
    );
}

export default ({
                      sourceDirectoryPath,
                      compliationDirectoryPath,
                      plugins: otherPlugins = [],
                      babelEnv = "client.es5",
                      babelLoaderExclusions = util.babelLoaderExclusions,
                      ...configOverrides
                  }) => {
    return {
        mode: resolveMode(),
        devtool: isDevelopment ? "eval-source-map" : "nosources-source-map",
        output: {
            libraryTarget: "commonjs2",
            path: compliationDirectoryPath,
            filename: "[name].js"
        },
        resolve: {
            // NOTE-RT: Prefer `main` (CJS) over `module` (ESM) for commonjs2 output. ESM-first packages like
            // NOTE-RT: immutable@5 export a namespace without `default`, which breaks `redux-immutable`'s
            // NOTE-RT: `_interopRequireDefault(require("immutable")).default.Map` interop inside the bundle.
            // NOTE-RT: This config is only consumed by jsonresume-theme; client webpack configs are unaffected.
            mainFields: ["main", "module"],
            extensions: [".js", ".jsx", ".json"]
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: babelLoaderExclusions,
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        configFile: join(sourceDirectoryPath, "../../babel.config.js"),
                        envName: babelEnv
                    }
                }
            ]
        },
        plugins: plugins.concat(otherPlugins),
        ...configOverrides
    };
};
