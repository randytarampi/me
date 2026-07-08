// NOTE-RT: unlike `02_import-all.js` (which exercises `../src` via `babel.register.cjs`'s live
// transform), this requires the package's actual `build:babel:esm` output - a regression guard
// against the real, genuine-ESM `esm/` artifact ever becoming un-`require()`-able (e.g. a stray
// `.jsx`/unfully-specified bare import, or a missing JSON import attribute), since those issues
// don't surface when testing against `../src` alone. Run `yarn run build:babel:esm` first if this
// throws `Cannot find module`.
require("../esm/index.server.js");

// NOTE-RT: pre-`require()` (fully, synchronously) any real-ESM package that a `test/integration`
// spec might also reach via a raw `.jsx` source import graph, *before* Mocha's own spec loader gets
// a chance to. Mocha's `requireOrImport` always tries a dynamic `import()` of a `.js` spec file
// first; when that spec's import graph includes an unbuilt `.jsx` file (unknown extension to
// Node's native ESM loader), the `import()` call partially registers this ESM dep in Node's module
// map before rejecting with `ERR_UNKNOWN_FILE_EXTENSION`, then Mocha falls back to `require()`
// (transformed to CommonJS by `babel.register.cjs`) - which collides with that not-yet-fully-
// loaded partial registration and throws `ERR_REQUIRE_ESM_RACE_CONDITION`. Fully `require()`-ing it
// here first (with nothing else racing) leaves a complete, cached module instance, so both paths
// resolve to the same already-loaded instance instead of racing.
require("chai");
