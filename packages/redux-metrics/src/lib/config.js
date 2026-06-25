import Gtm from "./vendors/gtm.js";

import * as util from "./util.js";

export const gtmClient = new Gtm();

export default {
    vendors: [
        {api: gtmClient}
    ],
    pageDefaults: (routeState) => {
        return util.buildEventDetails({
            value: routeState.pathname,
            pathname: routeState.pathname,
            search: routeState.search,
            hash: routeState.hash,
            params: routeState.params
        });
    }
};
