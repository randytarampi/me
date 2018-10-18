import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import setRoutes, {SET_ROUTES} from "../../../../../../src/lib/actions/routing/setRoutes";

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
            const stubPayload = "woof";
            stubStore.dispatch(setRoutes(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.be.ok;
            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: SET_ROUTES, payload: stubPayload}]);
        });
    });
});
