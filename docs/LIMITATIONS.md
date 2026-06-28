# Limitations

- `packages/service` is still CommonJS (`"type": "commonjs"`) while the rest of the workspace is ESM.
- `node-config` is CJS-only, uses `require()` internally, and blocks a future `service`/`www` ESM migration. We need a replacement before going full ESM.
- The `freshRequire` test helper clears `require.cache` and reloads modules as a sinon/esmock substitute for ESM stubbing. It's fragile test infrastructure debt and not well documented.
- `packages/jsx/src/lib/reactRouter.cjs` is the last CJS wrapper in an otherwise mostly-ESM `jsx` package. It stays because loading the ESM `react-router` root breaks the mocha/Babel path through the package's ESM entrypoint, so we use targeted absolute-path requires instead.
- `enzyme` / `chai-enzyme` are still referenced in `packages/job-application` and `packages/printables`.
- `materialize-css` and `react-materialize` are legacy but still functional.

## `packages/jsx/src/lib/reactShim.js`

This shim exists to keep React 19 working with a few legacy dependencies.

- `global.IS_REACT_ACT_ENVIRONMENT`
  - Why: React Testing Library expects it to exist before tests start; we set it in the test bootstrap so mocha leak checks treat it as baseline state.
  - Remove when: the test setup no longer needs the global (or React/RTL provide it automatically).

- `React.createFactory`
  - Why: `react-google-maps` still calls it during module initialization.
  - Remove when: `react-google-maps` is removed or replaced with a React 19-safe alternative.

- `ReactDOM.findDOMNode`
  - Why: legacy DOM-driven UI deps in this package still rely on it (`react-materialize` / swipeable tab helpers).
  - Remove when: those dependencies are upgraded or replaced so they use refs instead of `findDOMNode`.

- Immutable legacy statics (`Iterable.isIterable`, `isKeyed`, `isIndexed`, `isAssociative`, `isOrdered`)
  - Why: `@actra-development-oss/redux-persist-transform-filter-immutable` still calls the pre-v5 Immutable statics.
  - Remove when: that dependency is upgraded or replaced and no longer needs the legacy `Immutable.Iterable.*` helpers.
