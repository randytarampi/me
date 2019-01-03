import {Photo} from "@randy.tarampi/js";
import {expect} from "chai";
import {JSDOM} from "jsdom";
import computePostHeight, {WINDOW_LARGE_BREAKPOINT, WINDOW_LARGE_PHOTO_SCALE} from "../../../../../src/lib/util/computePostHeight";

describe("computePostHeight", function () {
    const globalWindow = global.window;

    afterEach(function () {
        global.window = globalWindow;
        global.document = globalWindow.document;
    });

    it("computes the height for a `Post` (`Photo`) that has dimension attributes", function () {
        const stubContainerWidth = 500;
        const stubPost = Photo.fromJS({source: "ʕ•ᴥ•ʔ", id: "woof", height: 1000, width: 1000});

        const computedPostHeight = computePostHeight(stubContainerWidth)(stubPost);

        expect(computedPostHeight).to.eql(500 * WINDOW_LARGE_PHOTO_SCALE); // NOTE-RT: 500 * 1000 / 1000 * WINDOW_LARGE_PHOTO_SCALE
    });

    it("computes the height for a `Post` (`Photo`) that has dimension attributes on a small or medium window", function () {
        Object.defineProperty(window, "innerWidth", {
            configurable: true,
            writable: true,
            value: WINDOW_LARGE_BREAKPOINT - 1
        });

        const stubContainerWidth = 500;
        const stubPost = Photo.fromJS({source: "ʕ•ᴥ•ʔ", id: "woof", height: 1000, width: 1000});

        const computedPostHeight = computePostHeight(stubContainerWidth)(stubPost);

        expect(computedPostHeight).to.eql(500); // NOTE-RT: 500 * 1000 / 1000
    });

    // NOTE-RT: I really don't know when we'd be falling into here. I think that might just be me requiring coffee though...
    it("returns the height for a `Post` (`Photo`) that doesn't have dimension attributes on the entity but is already rendered", function () {
        const stubContainerWidth = 500;
        const stubPost = Photo.fromJS({source: "ʕ•ᴥ•ʔ", id: "woof", height: 1000, width: null});
        const stubDom = new JSDOM(`<!doctype html><html><body><div id="${stubPost.uid}" style="${`width: ${stubPost.height}px; height: ${stubPost.height}px;`}">Hello World</div></body></html>`);
        global.window = stubDom.window;
        global.document = global.window.document;
        const stubHeight = 1000;

        Object.defineProperty(global.document.getElementById(stubPost.uid), "clientHeight", {
            value: stubHeight,
            writable: false
        });

        const computedPostHeight = computePostHeight(stubContainerWidth)(stubPost);

        expect(computedPostHeight).to.eql(stubHeight);
    });

    it("computes the height for a `Post` (`Photo`) that doesn't have dimension attributes in the DOM or entity", function () {
        const stubContainerWidth = 500;
        const stubPost = Photo.fromJS({source: "ʕ•ᴥ•ʔ", id: "woof", height: 1000, width: null});
        const stubDom = new JSDOM("<!doctype html><html><body><div id=\"foo\">Hello World</div></body></html>");
        global.window = stubDom.window;
        global.document = global.window.document;

        const computedPostHeight = computePostHeight(stubContainerWidth)(stubPost);

        expect(computedPostHeight).to.eql(global.window.innerHeight);
    });
});
