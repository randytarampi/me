import {createRequire} from "module";
import path from "path";
import webpackBaseConfig from "../../webpack.publish.config.base.js";

const require = createRequire(import.meta.url);
const __dirname = import.meta.dirname;

const nodeExternals = require("webpack-node-externals");

// NOTE-RT: this is a Node target (real `require()` at runtime works fine here), so third-party
// dependencies (only `@randy.tarampi/*` first-party packages are bundled) are left external
// rather than force-bundled via `webpackNodeExternalsWhitelist` (used by the client bundles).
// Bundling `query-string` was actively broken: it's pure ESM and re-exports a sibling file
// (`./base.js`) via `import * as x from "./base.js"`, which webpack drops when the file is
// babel-processed, crashing with "Cannot find module './base.js'". `webpack-node-externals`'s
// own auto-detection misses it in this hoisted workspace layout (no local `node_modules` next
// to this package), so it's listed explicitly here too, exactly like the existing `"pug"` external.
export default webpackBaseConfig({
    babelEnv: "client.es5",
    sourceDirectoryPath: __dirname,
    compliationDirectoryPath: path.join(__dirname, "es5"),
    entry: {
        index: [path.join(__dirname, "./src/index.js")]
    },
    // NOTE-RT: webpack's single-module "inline entry" optimization (used here since this bundle
    // has exactly one module with nothing else requiring it) doesn't correctly rewrite this
    // module's own `exports`/`module.exports` references onto its generated `__webpack_exports__`
    // variable, so the final `module.exports = __webpack_exports__` silently discards everything
    // this module actually assigned to the real `exports` object, resulting in an empty export.
    // `output.libraryTarget: "commonjs"` (rather than the base config's default `"commonjs2"`)
    // avoids this: it only ever assigns individual properties onto the real, ambient `exports`
    // object and never does a final blanket `module.exports = ...` overwrite. `configOverrides`
    // is spread shallowly onto the base config, so `output` must be repeated here in full.
    output: {
        libraryTarget: "commonjs",
        path: path.join(__dirname, "es5"),
        filename: "[name].js"
    },
    // NOTE-RT: `node: false` leaves bare `__dirname`/`__filename` completely untouched, which is
    // only correct for a single unbundled file. Since this bundle merges many first-party source
    // files (only `@randy.tarampi/*` packages are bundled, see the `externals` note below) into
    // one output file, every one of those merged modules would then share the SAME `__dirname`
    // (the bundle's own), breaking any of them that resolve sibling files (e.g. `package.json`,
    // `resume.json`) relative to their own original location. Let webpack mock `__dirname`/
    // `__filename` per-module instead, so each merged file still gets its own correct value.
    node: {
        __dirname: true,
        __filename: true
    },
    target: "node",
    externals: [nodeExternals({
        allowlist: [
            /@randy\.tarampi\//
        ]
    }), "pug", "query-string"]
});
