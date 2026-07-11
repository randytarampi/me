// NOTE-RT: `esmock` (https://github.com/iambumblehead/esmock) itself contains genuine top-level
// `await` in its own module graph. Mocha's spec-file loader (`node_modules/mocha/lib/esm-utils.js`)
// tries to `require()` each spec file first (Node's newer synchronous `require(esm)` support), and
// Node refuses to synchronously `require()` any ESM graph that contains top-level `await`, throwing
// `ERR_REQUIRE_ASYNC_MODULE`. Mocha only special-cases the older `ERR_REQUIRE_ESM` error, so this
// crashes the whole run rather than falling back to `import()`.
//
// Statically `import`-ing `esmock` at the top of a spec file pulls its top-level-await graph into
// that spec file's own synchronous load-time graph, triggering the crash. Loading it dynamically
// here instead (a normal `import()` call inside a function, not at module top level) sidesteps the
// problem entirely: this wrapper module has no top-level await of its own, so it (and any spec file
// that only statically imports this wrapper) loads via Mocha's `require()` step just fine, and the
// dynamic `import("esmock")` only resolves later, during Mocha's own async test execution.
const esmock = async (...args) => {
    const {default: esmockFn} = await import("esmock");

    return esmockFn(...args);
};

export default esmock;
export {esmock};
