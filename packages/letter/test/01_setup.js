/* global global */

import {JSDOM} from "jsdom";

const jsdom = new JSDOM();
global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = {
    userAgent: "node.js"
};
