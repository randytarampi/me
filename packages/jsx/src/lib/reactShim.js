// NOTE-RT: React 19 compatibility polyfills for unmaintained dependencies.
import ReactDOM from "react-dom";

// NOTE-RT: `immutable@5` keeps `Iterable` as a deprecated alias of `Collection` but dropped the legacy static
// NOTE-RT: helpers (`Iterable.isIterable`, etc.) that older immutable-aware deps (e.g.
// NOTE-RT: `@actra-development-oss/redux-persist-transform-filter-immutable`) still call. Restore them.
// NOTE-RT: this MUST be a namespace import (`import * as Immutable`), not a default import.
// NOTE-RT: `immutable`'s package.json declares no `"exports"`/`"browser"` field, so webpack's
// NOTE-RT: `target: "web"` `resolve.mainFields` (`["browser", "module", "main"]`) picks its real-ESM
// NOTE-RT: `dist/immutable.es.js` build for the bare `"immutable"` specifier - and that build has no
// NOTE-RT: `export default` at all (only named exports). A default import against a module with no
// NOTE-RT: default export resolves to `undefined` under real ESM interop, crashing every property
// NOTE-RT: access below with `TypeError: undefined is not an object (evaluating '...Iterable')` in the
// NOTE-RT: `www` dev-server bundle. A namespace import always exposes every named export as a plain
// NOTE-RT: property, matching the already-working pattern in this same package's `store/configureStore.js`.
import * as Immutable from "immutable";

// NOTE-RT: React 19 and React Testing Library expect `global.IS_REACT_ACT_ENVIRONMENT` to be set up-front.
// NOTE-RT: Declare it in React test setup (which loads this shim first) so mocha's `checkLeaks: true` treats it
// NOTE-RT: as part of the baseline rather than a per-test leak.
if (typeof global.IS_REACT_ACT_ENVIRONMENT === "undefined") {
    global.IS_REACT_ACT_ENVIRONMENT = true;
}

if (typeof ReactDOM.findDOMNode !== "function") {
    ReactDOM.findDOMNode = instance => {
        if (instance === null || instance === undefined) {
            return null;
        }

        if (instance.nodeType === 1) {
            return instance;
        }

        let fiber = instance._reactInternals || instance._reactInternalFiber;

        while (fiber) {
            if (fiber.stateNode && fiber.stateNode.nodeType === 1) {
                return fiber.stateNode;
            }

            fiber = fiber.child;
        }

        return null;
    };
}

if (Immutable.Iterable && typeof Immutable.Iterable.isIterable !== "function") {
    const legacyStatics = {
        isIterable: Immutable.isCollection,
        isKeyed: Immutable.isKeyed,
        isIndexed: Immutable.isIndexed,
        isAssociative: Immutable.isAssociative,
        isOrdered: Immutable.isOrdered
    };

    Object.keys(legacyStatics).forEach(name => {
        if (typeof legacyStatics[name] === "function" && typeof Immutable.Iterable[name] !== "function") {
            Immutable.Iterable[name] = legacyStatics[name];
        }
    });
}
