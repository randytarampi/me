import {buildEventDetails} from "./util";
import Gtm from "./vendors/gtm";

const gtmClient = new Gtm();

export default {
    vendors: [
        {api: gtmClient}
    ],
    pageDefaults: (routeState) => {
        return buildEventDetails({
            value: routeState.pathname,
            pathname: routeState.pathname,
            search: routeState.search,
            hash: routeState.hash,
            params: routeState.params
        });
    }
};
