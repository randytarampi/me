import {buildEventDetails, buildReduxActionEventDetails} from "../util";

class GtmMetrics {
    constructor({name = "GTM", ...options} = {}) {
        const GTM_DATALAYER = typeof window !== "undefined" && window.GTM_DATALAYER;

        this.name = name;
        this.options = options;
        this.dataLayer = this.options.dataLayer || GTM_DATALAYER || [];
    }

    track(eventName, details) {
        return new Promise(resolve => {
            return resolve(this.dataLayer.push({
                event: eventName,
                ...buildEventDetails(details)
            }));
        });
    }

    pageView(eventName, details) {
        return this.track(eventName, details);
    }

    trackReduxAction(action, supplementaryDetails = {}) {
        return this.track("action", buildReduxActionEventDetails(action, supplementaryDetails));
    }
}

export default GtmMetrics;
