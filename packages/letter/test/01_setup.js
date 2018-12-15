/* global global */

import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import {JSDOM} from "jsdom";
import packageJson from "../package.json";

const jsdom = new JSDOM();
global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = {
    userAgent: "node.js"
};
global.location = jsdom.window.location;

global.$ = global.jQuery = require("jquery");
global.Hammer = require("materialize-css/js/hammer.min");
global.Velocity = require("materialize-css/js/velocity.min");
global.Materialize = global.Materialize || {}; // NOTE-RT: Gross – gotta do this up here to sidestep all the weirdness of mocking how we're requiring `materialize-css` in `@randy.tarampi/jsx`.
require("materialize-css");

Enzyme.configure({adapter: new EnzymeAdapter()});
chai.use(chaiEnzyme());

global.window.NAME = packageJson.name;
global.window.VERSION = packageJson.version;
global.window.ENVIRONMENT = process.env.NODE_ENV;
global.window.SENTRY_DSN = "https://meow@sentry.io/woof";
global.window.LOGGER = {
    level: "trace",
    streams: {
        console: true
    }
};
