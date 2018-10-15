import {expect} from "chai";
import {Map} from "immutable/dist/immutable";
import {Route} from "react-router";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import renderSwipeableRoutes from "../../../../src/lib/util/renderSwipeableRoutes";
import routes from "../../../build/routes";
import {shallow} from "../../../util";

describe("renderSwipeableRoutes", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);
    });

    it("handles no routes", function () {
        const stubRoutes = null;
        const component = renderSwipeableRoutes(stubRoutes);
        expect(component).to.eql(null);
    });

    it("delegates to `ConnectedSwipeableRoutes`", function () {
        const stubRoutes = routes;
        const component = renderSwipeableRoutes(stubRoutes);
        expect(component).to.be.ok;

        const rendered = shallow(stubStore)(component);
        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(Route);
        expect(rendered.find(Route)).to.have.length(stubRoutes.length);
    });
});
