const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const sessionLoaded = require("../../../../../../src/lib/actions/crisp/sessionLoaded.js").default || require("../../../../../../src/lib/actions/crisp/sessionLoaded.js");
const {CRISP_SESSION_LOADED} = require("../../../../../../src/lib/actions/crisp/sessionLoaded.js");

describe("sessionLoaded", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubPayload;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);
        stubPayload = "foo";
    });

    describe("CRISP_SESSION_LOADED", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(sessionLoaded(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_SESSION_LOADED, payload: stubPayload}]);
        });
    });
});
