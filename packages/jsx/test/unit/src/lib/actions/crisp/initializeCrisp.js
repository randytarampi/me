const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const initializeCrisp = require("../../../../../../src/lib/actions/crisp/initializeCrisp.js").default || require("../../../../../../src/lib/actions/crisp/initializeCrisp.js");
const {crispNamespaceHandlerMap, CRISP_INITIALIZING, CRISP_INITIALIZED} = require("../../../../../../src/lib/actions/crisp/initializeCrisp.js");

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
