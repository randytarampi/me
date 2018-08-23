/* global global */

import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import {jsdom} from "jsdom/lib/old-api";

global.document = jsdom("");
global.window = document.defaultView;
global.navigator = {
    userAgent: "node.js"
};

Enzyme.configure({adapter: new EnzymeAdapter()});
chai.use(chaiEnzyme());
