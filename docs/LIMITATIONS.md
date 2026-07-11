## Recommended next modernization phase

Now that `build`/`test`/`job-applications` are fixed at the source (not just patched around in CI), the next steps in the same direction:

- Continue executing `docs/MATERIALIZE_MIGRATION.md`'s phased replacement of `react-materialize` (peer deps on React `^17` only) - the actual source of the remaining React-peer-range warnings; a React version change would not have resolved this, since it doesn't support React 18 either. (`react-google-maps` was already fully replaced with `@vis.gl/react-google-maps` in an earlier session, so that half of this bullet is done.)
- `chai`, `gulp-mocha`, and `webpack-cli` are all current (`^6.2.2`, `^10.0.1`, `^7.2.1` respectively); `chai-dom` (an unused `packages/jsx` devDependency) was dropped entirely. `webpack-dev-server` was deliberately held back at `^5.2.6` (not bumped to `^6.0.0`): `@pmmmwh/react-refresh-webpack-plugin` (used for React Fast Refresh in `letter`/`resume`/`www`'s dev servers) statically imports a `webpack-dev-server` SockJS client export removed in v6, and its latest published release (`0.6.2`) still only declares peer-dependency support for `webpack-dev-server` `4.8.0+`/`5.x` - revisit this once that plugin ships v6 support.
- `unsplash-js` was upgraded from `v7` to `v8` — a full TypeScript rewrite with a different response shape (`{data, error}` instead of the `{response}` the old `UnsplashSource` destructured). The migration updated the response destructuring, added the required `download` endpoint call for Unsplash ToS compliance, and adjusted the `createApi` call for the v8 API. Done.

## `packages/jsx/src/lib/reactShim.js`

This shim exists to keep React 19 working with a few legacy dependencies.

- `global.IS_REACT_ACT_ENVIRONMENT`
  - Why: React Testing Library expects it to exist before tests start; we set it in the test bootstrap so mocha leak checks treat it as baseline state.
  - Remove when: the test setup no longer needs the global (or React/RTL provide it automatically).

- `ReactDOM.findDOMNode`
  - Why: legacy DOM-driven UI deps in this package still rely on it (`react-materialize` / swipeable tab helpers).
  - Remove when: those dependencies are upgraded or replaced so they use refs instead of `findDOMNode`.

- Immutable legacy statics (`Iterable.isIterable`, `isKeyed`, `isIndexed`, `isAssociative`, `isOrdered`)
  - Why: `@actra-development-oss/redux-persist-transform-filter-immutable` still calls the pre-v5 Immutable statics.
  - Remove when: that dependency is upgraded or replaced and no longer needs the legacy `Immutable.Iterable.*` helpers.
