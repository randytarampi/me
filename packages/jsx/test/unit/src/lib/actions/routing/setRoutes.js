const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const setRoutes = require("../../../../../../src/lib/actions/routing/setRoutes.js").default || require("../../../../../../src/lib/actions/routing/setRoutes.js");
const {SET_ROUTES} = require("../../../../../../src/lib/actions/routing/setRoutes.js");

describe("setRoutes", function () {
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

    describe("SET_ROUTES", function () {
        it("is dispatched with the expected payload", function () {
            const stubPayload = [
                {
                    tab: "foo",
                    path: "meow",
                    component: true
                },
                {
                    component: true,
                    tab: "bar",
                    path: "grr",
                    exact: true,
                    routes: [
                        {
                            tab: 1,
                            component: 1,
                            path: "rawr",
                            parent: {
                                path: "grr",
                                tab: true
                            }
                        }
                    ]
                }
            ];
            stubStore.dispatch(setRoutes(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{
                type: SET_ROUTES,
                payload: [
                    {
                        tab: true,
                        path: "meow"
                    },
                    {
                        tab: true,
                        path: "grr",
                        exact: true,
                        routes: [
                            {
                                path: "rawr",
                                tab: true,
                                parent: {
                                    path: "grr",
                                    tab: true
                                }
                            }
                        ]
                    }
                ]
            }]);
        });
    });
});
