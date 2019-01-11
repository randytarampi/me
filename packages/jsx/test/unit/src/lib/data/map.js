import {expect} from "chai";
import {fromJS, Map} from "immutable";
import {createAction} from "redux-actions";
import {clearMap, instantiateGoogleMap, updateMap} from "../../../../../src/lib/actions/map";
import reducer, {getMap, hasMap} from "../../../../../src/lib/data/maps";

describe("map", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = Map();
    });

    it("reduces the current state for some other action", function () {
        const stubMap = fromJS({id: "woof"});

        const otherAction = createAction("OTHER_ACTION");

        const instantiatedState = reducer(stubInitialState, otherAction(stubMap));
        expect(getMap(instantiatedState, stubMap.id)).to.eql(undefined);
        expect(hasMap(instantiatedState, stubMap.id)).to.eql(false);
    });

    describe("INSTANTIATE_GOOGLE_MAP", function () {
        it("reduces the correct state", function () {
            const stubMapId = "woof";
            const stubPayload = {id: stubMapId, vendor: "google"};

            const instantiatedState = reducer(stubInitialState, instantiateGoogleMap(stubPayload));
            expect(getMap(instantiatedState, stubMapId).toJS()).to.eql({
                id: stubMapId,
                vendor: "google"
            });
        });
    });

    describe("UPDATE_MAP", function () {
        it("reduces the correct state", function () {
            const stubMapId = "woof";
            const stubMapInstantiation = {id: stubMapId, vendor: "google"};

            const instantiatedState = reducer(stubInitialState, instantiateGoogleMap(stubMapInstantiation));
            expect(getMap(instantiatedState, stubMapId).toJS()).to.eql({
                id: stubMapId,
                vendor: "google"
            });

            const stubMapUpdate = {
                id: stubMapId,
                meow: "grr"
            };
            const updatedState = reducer(instantiatedState, updateMap(stubMapUpdate));
            expect(getMap(updatedState, stubMapUpdate.id).toJS()).to.eql({
                id: stubMapId,
                vendor: "google",
                meow: stubMapUpdate.meow
            });
        });
    });

    describe("CLEAR_MAP", function () {
        it("reduces the correct state", function () {
            const stubMapId = "woof";
            const stubPayload = {id: stubMapId, vendor: "google"};

            const instantiatedState = reducer(stubInitialState, instantiateGoogleMap(stubPayload));
            expect(getMap(instantiatedState, stubMapId).toJS()).to.eql({
                id: stubMapId,
                vendor: "google"
            });

            const clearedState = reducer(instantiatedState, clearMap(stubPayload));
            expect(getMap(clearedState, stubMapId)).to.eql(undefined);
            expect(hasMap(clearedState, stubMapId)).to.eql(false);
        });
    });
});
