import {expect} from "chai";
import {Map} from "immutable/dist/immutable";
import {Route} from "react-router";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import renderSwipeableRoutes, {renderRoute} from "../../../../src/lib/util/renderSwipeableRoutes";
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

    describe("renderRoute", function () {
        const originalJsdomWindow = global.window;
        const originalJsdomWindowLocation = originalJsdomWindow.location;

        afterEach(function () {
            global._jsdom.reconfigure({url: originalJsdomWindowLocation.href});
            global.window = originalJsdomWindow;
        });

        it("doesn't render a non-matching route", function () {
            const stubRoutes = routes;
            const component = renderRoute(stubRoutes, stubRoutes[0]);
            expect(component).to.be.ok;

            const actualComponent = component({});
            expect(actualComponent).to.eql(null);
        });

        it("doesn't render an out-of-view route", function () {
            global._jsdom.reconfigure({url: "http://localhost:8080/error"});
            global.window = global._jsdom.window;
            global.location = global.window.location;

            const stubRoutes = routes;
            const component = renderRoute(stubRoutes, stubRoutes[0]);
            expect(component).to.be.ok;

            const actualComponent = component({});
            expect(actualComponent).to.eql(null);
        });

        it("renders a matched route", function () {
            global._jsdom.reconfigure({url: "http://localhost:8080/posts"});
            global.window = global._jsdom.window;
            global.location = global.window.location;

            const stubRoutes = routes;
            const component = renderRoute(stubRoutes, stubRoutes[1]);
            expect(component).to.be.ok;

            const actualComponent = component({});
            expect(actualComponent).to.be.ok;
        });
    });
});
