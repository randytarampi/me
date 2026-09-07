import {expect} from "chai";
import {Map} from "immutable";
import sinon from "sinon";
import selectors from "../../../../../src/lib/data/selectors.js";
import {mapStateToProps} from "../../../../../src/lib/containers/swipeableRoutes.jsx";

describe("swipeableRoutes", function () {
    afterEach(function () {
        sinon.restore();
    });

    it("derives the slide from the router location instead of persisted UI state", function () {
        sinon.stub(selectors, "getIndexForRoute").returns(0);

        const result = mapStateToProps(Map(), {location: {pathname: "/"}});

        expect(result.index).to.equal(0);
    });

    it("leaves an unknown route without a selected slide", function () {
        sinon.stub(selectors, "getIndexForRoute").returns(-1);

        const result = mapStateToProps(Map(), {location: {pathname: "/missing"}});

        expect(result.index).to.equal(undefined);
    });
});
