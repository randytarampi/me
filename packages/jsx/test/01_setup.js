/* global global */

import {jsdom} from "jsdom/lib/old-api";

global.document = jsdom("");
global.window = document.defaultView;
global.navigator = {
    userAgent: "node.js"
};
