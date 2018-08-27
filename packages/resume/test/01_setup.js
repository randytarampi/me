/* global global */

import {JSDOM} from "jsdom";

global.window = new JSDOM();
global.navigator = {
    userAgent: "node.js"
};
