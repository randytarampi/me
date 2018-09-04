import {expect} from "chai";
import {Map} from "immutable";
import {LOCATION_CHANGE} from "react-router-redux";
import {createAction} from "redux-actions";
import reducer, {getLocation} from "../../../lib/data/routing";

describe("routing", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = Map({
            location: null,
            action: null
        });
    });

    it("reduces the current state for some other action", function () {
        const stubPayload = {
            action: "woof",
            location: "meow"
        };
        const otherAction = createAction("OTHER_ACTION");

        const updatedState = reducer(stubInitialState, otherAction(stubPayload));
        const location = getLocation(updatedState);
        expect(location).to.not.be.ok;
        expect(location).to.eql(null);
    });

    describe("LOCATION_CHANGE", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubPayload = {
                action: "woof",
                location: "meow"
            };
            const locationChangeAction = createAction(LOCATION_CHANGE); // NOTE-RT: Just create and dispatch this ourselves instead of digging into react-router-redux

            const updatedState = reducer(stubInitialState, locationChangeAction(stubPayload));
            const location = getLocation(updatedState);
            expect(location).to.be.ok;
            expect(location).to.eql("meow");
        });

        it("reduces the correct state (has existing state)", function () {
            const stubPayload = {
                action: "woof",
                location: "rawr"
            };
            const locationChangeAction = createAction(LOCATION_CHANGE); // NOTE-RT: Just create and dispatch this ourselves instead of digging into react-router-redux

            stubInitialState = Map({
                action: "woof",
                location: "meow"
            });

            const updatedState = reducer(stubInitialState, locationChangeAction(stubPayload));
            const location = getLocation(updatedState);
            expect(location).to.be.ok;
            expect(location).to.eql("rawr");
        });

        it("reduces the correct state (where payload is just `location`)", function () {
            const stubPayload = "meow";
            const locationChangeAction = createAction(LOCATION_CHANGE); // NOTE-RT: Just create and dispatch this ourselves instead of digging into react-router-redux

            const updatedState = reducer(stubInitialState, locationChangeAction(stubPayload));
            const location = getLocation(updatedState);
            expect(location).to.be.ok;
            expect(location).to.eql("meow");
        });
    });
});
