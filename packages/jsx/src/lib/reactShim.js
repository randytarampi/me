// NOTE-RT: React 19 renamed its private shared-internals key and reshaped the dispatcher, which breaks
// NOTE-RT: `react-shallow-renderer` (used by `@cfaester/enzyme-adapter-react-18`). This shim re-creates the
// NOTE-RT: legacy `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` surface that the shallow renderer expects,
// NOTE-RT: bridging `ReactCurrentDispatcher.current` to React 19's `.H` slot so hooks are intercepted during a
// NOTE-RT: shallow render. It must be imported before `enzyme`/the adapter is loaded.
const React = require("react");

// NOTE-RT: React 19 / the enzyme adapter set `global.IS_REACT_ACT_ENVIRONMENT` lazily during the first `mount`,
// NOTE-RT: which mocha's `checkLeaks: true` flags as a leaked global. Declare it up-front (in every React test
// NOTE-RT: setup, which loads this shim first) so it's part of the baseline rather than a per-test leak.
if (typeof global.IS_REACT_ACT_ENVIRONMENT === "undefined") {
    global.IS_REACT_ACT_ENVIRONMENT = true;
}

const LEGACY_KEY = "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED";
const NEW_KEY = "__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE";

if (!React[LEGACY_KEY]) {
    const newInternals = React[NEW_KEY] || {};
    const shim = newInternals;

    if (!("ReactCurrentDispatcher" in shim)) {
        Object.defineProperty(shim, "ReactCurrentDispatcher", {
            configurable: true,
            get() {
                return {
                    get current() {
                        return newInternals.H;
                    },
                    set current(value) {
                        newInternals.H = value;
                    }
                };
            }
        });
    }

    if (!("ReactCurrentBatchConfig" in shim)) {
        shim.ReactCurrentBatchConfig = {transition: null};
    }

    if (!("ReactCurrentOwner" in shim)) {
        Object.defineProperty(shim, "ReactCurrentOwner", {
            configurable: true,
            get() {
                return {
                    get current() {
                        return newInternals.A;
                    },
                    set current(value) {
                        newInternals.A = value;
                    }
                };
            }
        });
    }

    if (!("ReactDebugCurrentFrame" in shim)) {
        shim.ReactDebugCurrentFrame = {
            getCurrentStack: null,
            getStackAddendum() {
                return "";
            }
        };
    }

    React[LEGACY_KEY] = shim;
}

// NOTE-RT: React 19 removed the long-deprecated `React.createFactory`, which unmaintained dependencies
// NOTE-RT: (e.g. `react-google-maps`) still call at import time. Re-add a faithful polyfill.
if (typeof React.createFactory !== "function") {
    React.createFactory = type => React.createElement.bind(null, type);
}

// NOTE-RT: React 19 removed `ReactDOM.findDOMNode`, still called by class components in unmaintained deps
// NOTE-RT: (e.g. `react-text-effect`) and by `chai-enzyme`'s HTML error formatter. Re-implement it by walking the
// NOTE-RT: component instance's fiber tree to the first host (DOM) node.
const ReactDOM = require("react-dom");

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
const Immutable = require("immutable");

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

// NOTE-RT: `@cfaester/enzyme-adapter-react-18`'s `mount(...).getDOMNode()` returns `undefined` when the wrapper's
// NOTE-RT: root is a composite (e.g. a `connect()`ed) component, which breaks `chai-enzyme`'s DOM-node-based
// NOTE-RT: assertions (`.className`/`.attr`/`.id`/`.style`/`.html`). The previous adapter resolved the root to
// NOTE-RT: its first host node, so patch `chai-enzyme`'s `el` getter to fall back to the first host descendant.
try {
    const ReactTestWrapper = require("chai-enzyme/build/ReactTestWrapper").default;

    Object.defineProperty(ReactTestWrapper.prototype, "el", {
        configurable: true,
        get() {
            if (!this.__el) {
                let node;

                try {
                    node = this.wrapper.getDOMNode();
                } catch {
                    node = undefined;
                }

                // NOTE-RT: the adapter sometimes returns a non-DOM RST node (no `nodeType`) for composite roots, so
                // NOTE-RT: fall back unless we got a real element node.
                if ((!node || node.nodeType !== 1) && typeof this.wrapper.findWhere === "function") {
                    const hostNodes = this.wrapper.findWhere(candidate => typeof candidate.type() === "string");

                    if (hostNodes && hostNodes.length) {
                        node = hostNodes.first().getDOMNode();
                    }
                }

                this.__el = node;
            }

            return this.__el;
        }
    });
} catch {
    // NOTE-RT: `chai-enzyme` isn't installed for non-React test setups that still load this shim; ignore.
}
