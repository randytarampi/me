# Limitations

- `packages/service` and `packages/www` are still CommonJS (`"type": "commonjs"`) while the rest of the workspace is ESM.
- `immutable` is still pinned to a GitHub fork (`rc.12`).
- `materialize-css` and `react-materialize` are legacy but still functional.
- `reactShim.js` is still required for React 19 compatibility with some dependencies.
