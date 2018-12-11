import {register} from "register-service-worker";
import {onCached, onError, onOffline, onReady, onRegistered, onUpdated, onUpdateFound} from "./util";

register(SW_BUNDLE_PATH, {
    ready: onReady,
    registered: onRegistered,
    cached: onCached,
    updatefound: onUpdateFound,
    updated: onUpdated,
    offline: onOffline,
    error: onError
});
