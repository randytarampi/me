const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "config");

const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const util = require("./util");

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

module.exports = ({
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
                        configFile: path.join(sourceDirectoryPath, "../../babel.config.js"),
                        envName: babelEnv
                    }
                }
            ]
        },
        plugins: plugins.concat(otherPlugins),
        ...configOverrides
    };
};
