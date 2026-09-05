const path = require("path");

require("@babel/register").default({
    configFile: path.join(__dirname, "babel.config.js"),
    extensions: [".js", ".jsx"],
    only: [
        // NOTE-RT: `react-router` itself no longer needs to be included here - it was only ever
        // needed to let Babel's require-hook transform the old `reactRouter.cjs` wrapper's
        // dynamic `require()`s into `react-router`'s own dist files (Phase 8's now-deleted
        // Node-only hack). Nothing in this repo dynamically `require()`s into `react-router`'s
        // internals anymore; every consumer does a plain `import {...} from "react-router";`,
        // which Node/webpack/Mocha all resolve correctly on their own without this hook's help.
        /node_modules\/(?:@randy\.tarampi\/(?:schema-dot-org-json-ld-components|schema-dot-org-types|react-dimensions|redux-offline-immutable-config)|query-string|strict-uri-encode|strip-ansi|ansi-regex|bunyan-sentry-stream|libphonenumber-js|react-router-sitemap|dom-helpers|redux-immutable|reduce-reducers|react-progressive-image|react-metrics|react-event-listener|react-helmet|split-on-first|latlon-geohash)\//,
        // NOTE-RT: this used to also exclude `letter/src/lib/(buildLetter|renderHtml).js` and
        // `job-application/src/lib/jobApplication.js` from Babel's require-hook transform. That
        // exclusion is stale: it made these two files load as real, untransformed native ESM at
        // test time, where the bare `__dirname` they (and files they import) rely on doesn't
        // exist, crashing with `ReferenceError: __dirname is not defined`. Removing the exclusion
        // lets them go through the same CommonJS transform as every other package file (with a
        // real, working `__dirname`), matching how they're already compiled for the real build.
        //
        // NOTE-RT: `service` IS excluded here (unlike every other package). It has no
        // `build` script at all (it's a Lambda/serverless backend, not a bundled frontend
        // package) - its real runtime never Babel-transforms these files, it runs them as native
        // ESM directly under Node. Running its test/src files through this hook at test time
        // creates a real mismatch: Node commits to loading a `"type":"module"` file as ESM before
        // this hook's patched compile step runs, then evaluates Babel's CommonJS-shaped output
        // (`exports.x = ...`) as if it were that already-decided ESM source, crashing with
        // `ReferenceError: exports is not defined in ES module scope`. Excluding it lets its
        // files load as the plain, untransformed native ESM they already are - which also matches
        // its real (Babel-free) production runtime behavior, unlike the two files noted above.
        //
        // NOTE-RT: each package's own `dist`/`build` output directories are
        // also excluded now that library output is genuine ESM (see `babel.config.js`'s
        // "client.esm" case) - re-transforming an already-compiled real-ESM file through this
        // hook's own default Babel env is a second, unrelated compilation pass with no knowledge
        // of the standalone build's own settings, and corrupts it (observed as broken relative
        // `require()`/import resolution inside the re-transformed output). Requiring these files
        // at test time (e.g. a regression check against the real build output) should load them
        // exactly as-is, matching how they're actually consumed in production.
        /packages\/(?!service\/)|\/(?:www|resume|letter)\//
    ],
    ignore: [
        /\/(?:esm|dist|build)\//,
        /\/webpack\.[^/]*\.js$/
    ]
});
