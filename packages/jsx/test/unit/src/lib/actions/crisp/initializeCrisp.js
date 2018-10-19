import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import initializeCrisp, {crispNamespaceHandlerMap, CRISP_INITIALIZING, CRISP_INITIALIZED} from "../../../../../../src/lib/actions/crisp/initializeCrisp";

describe("initializeCrisp", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stub$crisp;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);
        stub$crisp = [];
    });

    it("dispatches the correct actions", function () {
        stubStore.dispatch(initializeCrisp(stub$crisp));

        const actions = stubStore.getActions();

        expect(actions).to.be.ok;
        expect(actions).to.have.length(2);
        expect(actions).to.eql([{type: CRISP_INITIALIZING}, {type: CRISP_INITIALIZED}]);
    });

    it("actually sets up $crisp", function () {
        stubStore.dispatch(initializeCrisp(stub$crisp));

        expect(stub$crisp).to.be.ok;
        expect(stub$crisp).to.be.an("array");
        expect(stub$crisp).to.have.length(Object.keys(crispNamespaceHandlerMap).length);
    });
});
