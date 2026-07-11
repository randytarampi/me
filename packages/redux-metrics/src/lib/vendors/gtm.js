import * as util from "../util.js";

class GtmMetrics {
    constructor({name = "GTM", ...options} = {}) {
        const GTM_DATALAYER = typeof window !== "undefined" && window.GTM_DATALAYER;

        this.name = name;
        this.options = options;
        this.dataLayer = this.options.dataLayer || GTM_DATALAYER || [];
    }

    track(eventName, details) {
        if (typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "prd") {
            return Promise.resolve([]);
        }

        return new Promise(resolve => {
            return resolve(this.dataLayer.push({
                event: eventName,
                ...util.buildEventDetails(details)
            }));
        });
    }

    pageView(eventName, details) {
        return this.track(eventName, details);
    }

    trackReduxAction(action, supplementaryDetails = {}) {
        return this.track("action", util.buildReduxActionEventDetails(action, supplementaryDetails));
    }
}

export default GtmMetrics;
