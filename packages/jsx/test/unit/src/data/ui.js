import {expect} from "chai";
import {LOCATION_CHANGE} from "connected-react-router";
import {fromJS, List, Map} from "immutable";
import {createAction} from "redux-actions";
import {setRoutes} from "../../../../src/lib/actions/routing/setRoutes";
import {swipeableChangeIndex} from "../../../../src/lib/actions/routing/swipeableChangeIndex";
import {swipeableTabChangeIndex} from "../../../../src/lib/actions/routing/swipeableTabChangeIndex";
import reducer, {
    getIndexForRoute,
    getRouteForIndex,
    getRoutes,
    getSwipeable,
    getSwipeableIndex
} from "../../../../src/lib/data/ui";

describe("ui", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = undefined;
    });

    it("reduces the current state for some other action", function () {
        const stubPayload = {
            routes: ["woof", "meow"],
            swipeable: {
                index: 0,
                indexLatest: 1,
                meta: {
                    grr: "rawr"
                }
            }
        };

        const otherAction = createAction("OTHER_ACTION");
        const updatedState = reducer(stubInitialState, otherAction(stubPayload));

        const routesState = getRoutes(updatedState);
        expect(routesState).to.be.ok;
        expect(routesState.size).to.eql(0);
        const route = getRouteForIndex(updatedState, 0);
        expect(route).to.eql(null);
        const routeIndex = getIndexForRoute(updatedState, "argh");
        expect(routeIndex).to.eql(null);

        const swipeableState = getSwipeable(updatedState);
        expect(swipeableState).to.be.ok;
        expect(swipeableState.size).to.eql(3);
        const swipeableIndex = getSwipeableIndex(swipeableState);
        expect(swipeableIndex).to.eql(null);
    });

    describe("SET_ROUTES", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubPayload = ["woof", "meow"];

            const updatedState = reducer(stubInitialState, setRoutes(stubPayload));

            const routesState = getRoutes(updatedState);
            expect(routesState).to.be.ok;
            expect(routesState.size).to.eql(stubPayload.length);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubPayload = ["woof", "meow"];

            stubInitialState = Map({
                routes: List(["rawr"])
            });
            const updatedState = reducer(stubInitialState, setRoutes(stubPayload));
            const routesState = getRoutes(updatedState);
            expect(routesState).to.be.ok;
            expect(routesState.size).to.eql(stubPayload.length);
        });
    });

    describe("LOCATION_CHANGE", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubRoute = "woof";
            const updatedState = reducer(stubInitialState, {
                payload: stubRoute,
                type: LOCATION_CHANGE
            });
            const routesState = getRoutes(updatedState);
            expect(routesState).to.eql(List());

            const swipeableIndex = getSwipeableIndex(updatedState);
            expect(swipeableIndex).to.eql(null);
        });

        it("reduces the correct state (has existing state)", function () {
            stubInitialState = Map({
                routes: List([
                    {path: "woof", tab: 1, pathRegExp: /wooof/}, // NOTE-RT: Deliberately match `woof` to `/.*/`
                    {path: "meow", tab: 2, pathRegExp: /meow/},
                    {path: "grr", tab: 3, pathRegExp: /.*/}
                ]),
                swipeable: Map({
                    index: 0,
                    indexLatest: 1,
                    meta: {
                        grr: "rawr"
                    }
                })
            });

            const stubRoute = "woof";
            const updatedState = reducer(stubInitialState, {
                payload: {
                    pathname: stubRoute
                },
                type: LOCATION_CHANGE
            });
            const routesState = getRoutes(updatedState);
            expect(routesState).to.be.ok;
            expect(routesState.size).to.eql(stubInitialState.get("routes").size);
            const route = getRouteForIndex(updatedState, 1);
            expect(route).to.eql(stubInitialState.get("routes").get(1));
            const routeIndex = getIndexForRoute(updatedState, stubRoute);
            expect(routeIndex).to.eql(2);

            const swipeableIndex = getSwipeableIndex(updatedState);
            expect(swipeableIndex).to.eql(2);
        });
    });

    describe("SWIPEABLE_CHANGE_INDEX", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubPayload = {
                index: 3,
                indexLatest: 0,
                meta: {
                    argh: "ahh"
                }
            };
            const updatedState = reducer(stubInitialState, swipeableChangeIndex(stubPayload));
            const routesState = getRoutes(updatedState);
            expect(routesState).to.eql(List());

            const swipeableState = getSwipeable(updatedState);
            expect(swipeableState).to.be.ok;
            expect(swipeableState.size).to.eql(3);
            expect(swipeableState.get("indexLatest")).to.eql(stubPayload.indexLatest);
            expect(swipeableState.get("meta")).to.eql(fromJS(stubPayload.meta));
            const swipeableIndex = getSwipeableIndex(updatedState);
            expect(swipeableIndex).to.eql(stubPayload.index);
        });

        it("reduces the correct state (has existing state)", function () {
            stubInitialState = Map({
                routes: List([
                    {path: "woof", tab: 1, pathRegExp: /woof/}, // NOTE-RT: Properly match `woof`
                    {path: "meow", tab: 2, pathRegExp: /meow/},
                    {path: "grr", tab: 3, pathRegExp: /.*/}
                ]),
                swipeable: Map({
                    index: 0,
                    indexLatest: 1,
                    meta: {
                        grr: "rawr"
                    }
                })
            });

            const stubPayload = {
                index: 3,
                indexLatest: 0,
                meta: {
                    argh: "ahh"
                }
            };
            const updatedState = reducer(stubInitialState, swipeableChangeIndex(stubPayload));
            const routesState = getRoutes(updatedState);
            expect(routesState).to.be.ok;
            expect(routesState.size).to.eql(stubInitialState.get("routes").size);
            const route = getRouteForIndex(updatedState, 1);
            expect(route).to.eql(stubInitialState.get("routes").get(1));
            const routeIndex = getIndexForRoute(updatedState, "woof");
            expect(routeIndex).to.eql(0);

            const swipeableState = getSwipeable(updatedState);
            expect(swipeableState).to.be.ok;
            expect(swipeableState.size).to.eql(3);
            expect(swipeableState.get("indexLatest")).to.eql(stubPayload.indexLatest);
            expect(swipeableState.get("meta")).to.eql(fromJS(stubPayload.meta));
            const swipeableIndex = getSwipeableIndex(updatedState);
            expect(swipeableIndex).to.eql(stubPayload.index);
        });
    });

    describe("SWIPEABLE_TAB_CHANGE_INDEX", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubPayload = {
                index: 3,
                indexLatest: 0,
                meta: {
                    argh: "ahh"
                }
            };
            const updatedState = reducer(stubInitialState, swipeableTabChangeIndex(stubPayload));
            const routesState = getRoutes(updatedState);
            expect(routesState).to.eql(List());

            const swipeableState = getSwipeable(updatedState);
            expect(swipeableState).to.be.ok;
            expect(swipeableState.size).to.eql(3);
            expect(swipeableState.get("indexLatest")).to.eql(stubPayload.indexLatest);
            expect(swipeableState.get("meta")).to.eql(fromJS(stubPayload.meta));
            const swipeableIndex = getSwipeableIndex(updatedState);
            expect(swipeableIndex).to.eql(stubPayload.index);
        });

        it("reduces the correct state (has existing state)", function () {
            stubInitialState = Map({
                routes: List([
                    {path: "woof", tab: 1, pathRegExp: /woof/}, // NOTE-RT: Properly match `woof`
                    {path: "meow", tab: 2, pathRegExp: /meow/},
                    {path: "grr", tab: 3, pathRegExp: /.*/}
                ]),
                swipeable: Map({
                    index: 0,
                    indexLatest: 1,
                    meta: {
                        grr: "rawr"
                    }
                })
            });

            const stubPayload = {
                index: 3,
                indexLatest: 0,
                meta: {
                    argh: "ahh"
                }
            };
            const updatedState = reducer(stubInitialState, swipeableTabChangeIndex(stubPayload));
            const routesState = getRoutes(updatedState);
            expect(routesState).to.be.ok;
            expect(routesState.size).to.eql(stubInitialState.get("routes").size);
            const route = getRouteForIndex(updatedState, 1);
            expect(route).to.eql(stubInitialState.get("routes").get(1));
            const routeIndex = getIndexForRoute(updatedState, "woof");
            expect(routeIndex).to.eql(0);

            const swipeableState = getSwipeable(updatedState);
            expect(swipeableState).to.be.ok;
            expect(swipeableState.size).to.eql(3);
            expect(swipeableState.get("indexLatest")).to.eql(stubPayload.indexLatest);
            expect(swipeableState.get("meta")).to.eql(fromJS(stubPayload.meta));
            const swipeableIndex = getSwipeableIndex(updatedState);
            expect(swipeableIndex).to.eql(stubPayload.index);
        });
    });
});
