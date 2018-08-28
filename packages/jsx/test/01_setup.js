/* global global */

import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import {JSDOM} from "jsdom";

const jsdom = new JSDOM();
global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = {
    userAgent: "node.js"
};

Enzyme.configure({adapter: new EnzymeAdapter()});
chai.use(chaiEnzyme());
