// @ts-check
import "../reactShim.js";

export * from "./computePostHeight.js";
export * from "./getBrowserLanguage.js";
export * from "./getComponentForType.js";
export * from "./getSvgPathForPost.js";
export * from "./posts.js";
export * from "./scalePixelValueForWindowDevicePixelRatio.js";

// NOTE-RT: `./renderRoutes.js` and `./renderSwipeableRoutes.js` are `.js` shims that re-export the
// `.jsx` implementations next to them, so that these specifiers resolve both here in `src` (plain
// Node ESM, no extension guessing) and in `esm/`, where Babel compiles the `.jsx` to that same
// filename. `eslint-plugin-import` doesn't follow a nested `export *` chain, so it concludes the
// shims are empty. They are not — see `renderRoutes.jsx` / `renderSwipeableRoutes.jsx`.
// eslint-disable-next-line import/export
export * from "./renderRoutes.js";
// eslint-disable-next-line import/export
export * from "./renderSwipeableRoutes.js";
