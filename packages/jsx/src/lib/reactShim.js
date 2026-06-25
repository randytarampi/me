// NOTE-RT: React 19 compatibility polyfills for unmaintained dependencies.
import React from "react";

// NOTE-RT: React 19 and React Testing Library expect `global.IS_REACT_ACT_ENVIRONMENT` to be set up-front.
// NOTE-RT: Declare it in React test setup (which loads this shim first) so mocha's `checkLeaks: true` treats it
// NOTE-RT: as part of the baseline rather than a per-test leak.
if (typeof global.IS_REACT_ACT_ENVIRONMENT === "undefined") {
    global.IS_REACT_ACT_ENVIRONMENT = true;
}

// NOTE-RT: React 19 removed the long-deprecated `React.createFactory`, which unmaintained dependencies
// NOTE-RT: (e.g. `react-google-maps`) still call at import time. Re-add a faithful polyfill.
if (typeof React.createFactory !== "function") {
    React.createFactory = type => React.createElement.bind(null, type);
}

import ReactDOM from "react-dom";

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

// NOTE-RT: `immutable@5` keeps `Iterable` as a deprecated alias of `Collection` but dropped the legacy static
// NOTE-RT: helpers (`Iterable.isIterable`, etc.) that older immutable-aware deps (e.g.
// NOTE-RT: `@actra-development-oss/redux-persist-transform-filter-immutable`) still call. Restore them.
import Immutable from "immutable";

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
