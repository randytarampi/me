// NOTE-RT: unlike `02_import-all.js` (which exercises `../src` via `babel.register.cjs`'s live
// transform), this requires the package's actual `build:babel:esm` output - a regression guard
// against the real, genuine-ESM `dist/` artifact ever becoming un-`require()`-able (e.g. a stray
// `.jsx`/unfully-specified bare import, or a missing JSON import attribute), since those issues
// don't surface when testing against `../src` alone. Run `yarn run build:babel:esm` first if this
// throws `Cannot find module`.
require("../dist/index.js");
