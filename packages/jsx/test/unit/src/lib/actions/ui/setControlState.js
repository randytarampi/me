import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {setControlStateCreator, SET_CONTROL_STATE} from "../../../../../../src/lib/actions/ui";

describe("setControlState", function () {
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

    describe("SET_CONTROL_STATE", function () {
        it("is dispatched with the expected payload", function () {
            const stubControlId = "woof";
            const stubControlState = {
                meow: "grr"
            };
            stubStore.dispatch(setControlStateCreator(stubControlId, stubControlState));

            const actions = stubStore.getActions();

            expect(actions).to.have.length(1);
            expect(actions).to.eql([{
                type: SET_CONTROL_STATE,
                payload: {
                    id: stubControlId,
                    ...stubControlState
                }
            }]);
        });
    });
});
