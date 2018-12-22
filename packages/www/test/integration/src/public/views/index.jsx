import {expect} from "chai";
import {JSDOM} from "jsdom";

describe("index", function () {
    const windowGlobal = global.window;
    const documentGlobal = global.document;
    const navigatorGlobal = global.navigator;
    const locationGlobal = global.location;

    beforeEach(function () {
        const jsdom = new JSDOM("<html><div id=\"react-root\"></div></html>", {url: "http://localhost:8080"});
        global.window = jsdom.window;
        global.document = jsdom.window.document;
        global.navigator = {
            userAgent: "node.js"
        };
        global.location = jsdom.window.location;
    });

    after(function () {
        global.window = windowGlobal;
        global.document = documentGlobal;
        global.navigator = navigatorGlobal;
        global.location = locationGlobal;
    });

    it("renders", function () {
        expect(global.window.document.getElementById("react-root")).to.be.ok;
        expect(global.window.document.getElementById("react-root").children.length).to.eql(0);

        require("../../../../../src/public/views/index");

        expect(global.window.document.getElementById("react-root")).to.be.ok;
        expect(global.window.document.getElementById("react-root").children.length).to.eql(1);
    });
});
