/* global global */

import {JSDOM} from "jsdom";

const jsdom = new JSDOM();
global.window = jsdom.window;
global.navigator = {
    userAgent: "node.js"
};
