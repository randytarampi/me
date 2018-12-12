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
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false
    })
];

module.exports = ({
                      sourceDirectoryPath,
                      compliationDirectoryPath,
                      plugins: otherPlugins = [],
                      babelEnv = "client",
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
