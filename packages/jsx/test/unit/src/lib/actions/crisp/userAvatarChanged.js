const {expect} = require("chai");
const {Map} = require("immutable");
const configureStore = require("redux-mock-store");
const {thunk} = require("redux-thunk");
const userNicknameChanged = require("../../../../../../src/lib/actions/crisp/userNicknameChanged.js").default || require("../../../../../../src/lib/actions/crisp/userNicknameChanged.js");
const {CRISP_USER_NICKNAME_CHANGED} = require("../../../../../../src/lib/actions/crisp/userNicknameChanged.js");

describe("userNicknameChanged", function () {
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

    describe("CRISP_USER_NICKNAME_CHANGED", function () {
        it("is dispatched with the expected payload", function () {
            stubStore.dispatch(userNicknameChanged(stubPayload));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{type: CRISP_USER_NICKNAME_CHANGED, payload: stubPayload}]);
        });
    });
});
