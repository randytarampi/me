import {register, unregister} from "register-service-worker";
import {onCached, onError, onOffline, onReady, onRegistered, onUpdated, onUpdateFound} from "./util.js";

if (__BUILD_IS_DEVELOPMENT__) {
    // NOTE-RT: `GenerateSW` is intentionally skipped for dev builds (see `webpack.client.config.esm.js`),
    // so `__SW_BUNDLE_PATH__` always 404s here - there is never a service worker to (re)install. Worse,
    // a browser that visited this same `localhost` origin during an earlier dev session (from before
    // that gating existed) may still have an *old* service worker actively controlling this tab, serving
    // its stale Workbox precache (keyed by content hash, so it never expires on its own) instead of the
    // freshly-rebuilt bundle - which can present as the app hanging forever on the initial loading
    // spinner, since the cached JS may predate later fixes. Proactively unregister any such leftover
    // worker and purge its caches so dev always runs against the real, current bundle.
    unregister();

    if (typeof caches !== "undefined") {
        caches.keys().then(cacheKeys => Promise.all(cacheKeys.map(cacheKey => caches.delete(cacheKey))));
    }
} else {
    register(__SW_BUNDLE_PATH__, {
        ready: onReady,
        registered: onRegistered,
        cached: onCached,
        updatefound: onUpdateFound,
        updated: onUpdated,
        offline: onOffline,
        error: onError
    });
}
