import {expect} from "chai";
import {Map} from "immutable/dist/immutable";
import React from "react";
import {Route} from "react-router";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {RenderedSwipeableRoutes, renderRoute} from "../../../../../src/lib/util/renderSwipeableRoutes";
import routes from "../../../../build/routes";
import {shallow} from "../../../../../src/test/util";

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

    describe("RenderedSwipeableRoutes", function () {
        it("handles no routes", function () {
            const stubRoutes = null;
            const rendered = shallow(stubStore)(<RenderedSwipeableRoutes routes={stubRoutes}/>);
            expect(rendered).to.be.ok;
            expect(rendered).to.not.have.className("routes-container");
            expect(rendered).to.not.have.className("routes-container__swipeable");
        });

        it("delegates to `ConnectedSwipeableRoutes`", function () {
            const stubLocation = {pathname: "/posts/woof"};
            const stubRoutes = routes;
            const rendered = shallow(stubStore)(<RenderedSwipeableRoutes routes={stubRoutes} location={stubLocation}/>);
            expect(rendered).to.be.ok;
            expect(rendered).to.have.className("routes-container");
            expect(rendered).to.have.className("routes-container__swipeable");
            expect(rendered).to.have.descendants(Route);
            expect(rendered.find(Route)).to.have.length(stubRoutes.filter(route => route.path).length);
        });
    });

    describe("renderRoute", function () {
        const originalJsdomWindow = global.window;
        const originalJsdomWindowLocation = originalJsdomWindow.location;

        afterEach(function () {
            global._jsdom.reconfigure({url: originalJsdomWindowLocation.href});
            global.window = originalJsdomWindow;
            global.location = global.window.location;
        });

        it("doesn't render a non-matching route", function () {
            const stubLocation = {pathname: "/woof"};
            const stubRoutes = routes;
            const component = renderRoute(stubRoutes, stubRoutes[0]);
            expect(component).to.be.ok;

            const actualComponent = component({location: stubLocation});
            expect(actualComponent).to.eql(null);
        });

        it("doesn't render an out-of-view route", function () {
            const stubLocation = {pathname: "/posts/foo"};

            const stubRoutes = routes;
            const component = renderRoute(stubRoutes, stubRoutes[1]);
            expect(component).to.be.ok;

            const actualComponent = component({location: stubLocation});
            expect(actualComponent).to.eql(null);
        });

        it("renders a matched route", function () {
            const stubLocation = {pathname: "/posts"};

            const stubRoutes = routes;
            const component = renderRoute(stubRoutes, stubRoutes[1]);
            expect(component).to.be.ok;

            const actualComponent = component({location: stubLocation});
            expect(actualComponent).to.be.ok;
        });
    });
});
