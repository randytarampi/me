const path = require("path");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "config");

const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const util = require("./util");

const {
    resolveWebpackMode: resolveMode
} = util;

const plugins = [
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false
    })
];

module.exports = ({sourceDirectoryPath, compliationDirectoryPath, ...configOverrides}) => {
    return {
        mode: resolveMode(),
        devtool: "nosources-source-map",
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
                    exclude: util.babelLoaderExclusions,
                    loader: "babel-loader",
                    options: {
                        configFile: path.join(sourceDirectoryPath, "../../babel.config.js"),
                        envName: "publish"
                    }
                }
            ]
        },
        plugins,
        ...configOverrides
    };
};
