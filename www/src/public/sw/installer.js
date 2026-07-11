import {register, unregister} from "register-service-worker";
import {onCached, onError, onOffline, onReady, onRegistered, onUpdated, onUpdateFound} from "./util.js";

if (__BUILD_IS_DEVELOPMENT__) {
    // NOTE-RT: GenerateSW skipped for dev builds — see docs/CONVENTIONS.md#webpack
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
