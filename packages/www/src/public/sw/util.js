/* global Materialize */

import {logger} from "@randy.tarampi/browser-logger";

export const onReady = () => {
    logger.debug(`Service worker from ${SW_BUNDLE_PATH} is ready`);
};

export const onRegistered = () => {
    logger.debug(`Service worker from ${SW_BUNDLE_PATH} has been registered`);
};

export const onCached = () => {
    logger.debug(`Service worker from ${SW_BUNDLE_PATH} has cached assets`);
};

export const onUpdateFound = () => {
    logger.debug(`Service worker from ${SW_BUNDLE_PATH} needs updating`);
};

export const onUpdated = () => {
    logger.debug(`Service worker from ${SW_BUNDLE_PATH} has been updated`);

    Materialize.toast(`
        <p>
            <span class="hide-on-small-and-down">
                I just pushed
                <a
                    target="__blank"
                    rel="noopener noreferrer"
                    href="https://github.com/randytarampi/me/releases/latest"
                    data-metrics-event-name="anchor" 
                    data-metrics-type="href" 
                    data-metrics-name="an update" 
                    data-metrics-label="an update"
                >
                    an update
                </a> and you're behind.
            </span>
            <a 
                href="javascript:void(0)" 
                data-metrics-event-name="anchor" 
                data-metrics-type="onClick" 
                data-metrics-name="Reload now" 
                data-metrics-label="Reload now"
                onclick="location.reload();"
            >
                Reload now
            </a> to stay current!
        </p>
        <button 
            class="hide-on-small-and-down btn-flat toast-action" 
            onclick="location.reload();"
            data-metrics-event-name="button" 
            data-metrics-type="onClick" 
            data-metrics-name="Reload and update" 
            data-metrics-label="Reload and update"
        >
            Reload and update
        </button>
    `, undefined, "toast__sw-updated");
};

export const onOffline = () => {
    logger.debug(`Service worker from ${SW_BUNDLE_PATH} reports that we're offline`);
};

export const onError = error => {
    logger.error(error, `Could not install service worker from ${SW_BUNDLE_PATH}`);
};
