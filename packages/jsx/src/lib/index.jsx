// NOTE-RT: Must be first — polyfills React.createFactory (removed in React 19) before
// NOTE-RT: react-google-maps loads transitively through ./components.
import "./reactShim.js";
import * as actions from "./actions/index.js";
import * as api from "./api/index.js";
import * as components from "./components/index.jsx";
import * as containers from "./containers/index.jsx";
import * as contexts from "./contexts/index.jsx";
import * as data from "./data/index.js";
import * as middleware from "./middleware/index.js";
import * as store from "./store/index.js";
import * as util from "./util/index.js";

export {default as ClientSwipeableReduxRouterRoot} from "./clientSwipeableReduxRouterRoot.jsx";
export {default as ClientReduxRoot, default as ClientReduxRouterRoot} from "./clientReduxRouterRoot.jsx";
export {default as ServerReduxRoot, default as ServerReduxRouterRoot} from "./serverReduxRouterRoot.jsx";

export {
    actions,
    api,
    components,
    containers,
    contexts,
    data,
    middleware,
    store,
    util
};

export * from "./actions/index.js";
export * from "./api/index.js";
export * from "./components/index.jsx";
export * from "./containers/index.jsx";
export * from "./contexts/index.jsx";
export * from "./data/index.js";
export * from "@randy.tarampi/browser-logger"; // FIXME-RT: Remove this in v3.
export * from "@randy.tarampi/redux-metrics"; // FIXME-RT: Remove this in v3.
export * from "./middleware/index.js";
export * from "./store/index.js";
export * from "./util/index.js";
