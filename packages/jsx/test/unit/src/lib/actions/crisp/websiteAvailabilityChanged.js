const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const websiteAvailabilityChanged = require("../../../../../../src/lib/actions/crisp/websiteAvailabilityChanged.js").default || require("../../../../../../src/lib/actions/crisp/websiteAvailabilityChanged.js");
const {CRISP_WEBSITE_AVAILABILITY_CHANGED} = require("../../../../../../src/lib/actions/crisp/websiteAvailabilityChanged.js");

describe("websiteAvailabilityChanged", function () {
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

    describe("CRISP_WEBSITE_AVAILABILITY_CHANGED", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(websiteAvailabilityChanged(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_WEBSITE_AVAILABILITY_CHANGED, payload: stubPayload}]);
        });
    });
});
