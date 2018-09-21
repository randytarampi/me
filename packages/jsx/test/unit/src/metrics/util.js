import {expect} from "chai";
import sinon from "sinon";
import {buildEventDetails, buildReduxActionEventDetails} from "../../../../src/lib/metrics/util";

describe("util", function () {
    let clock;
    let now;

    beforeEach(function () {
        now = new Date();
        clock = sinon.useFakeTimers(now);
    });

    afterEach(function () {
        clock.restore();
    });

    describe("buildEventDetails", function () {
        it("builds the expected event object", function () {
            const stubDetails = {
                woof: "1",
                grr: "a",
                rawr: {
                    "ʕ•ᴥ•ʔ": [1, 2, 3, 4]
                }
            };

            const eventDetails = buildEventDetails(stubDetails);

            expect(eventDetails).to.be.ok;
            expect(eventDetails).to.be.instanceOf(Object);
            expect(eventDetails).to.contain(stubDetails);
            expect(eventDetails.timestamp).to.eql(now.valueOf());
            expect(eventDetails.dateTime).to.eql(now.toISOString());
        });
    });

    describe("buildReduxActionEventDetails", function () {
        it("builds the expected event object", function () {
            const stubAction = {
                payload: "woof",
                type: "GRR"
            };
            const stubSupplementaryDetails = {
                woof: "1",
                grr: "a",
                rawr: {
                    "ʕ•ᴥ•ʔ": [1, 2, 3, 4]
                }
            };

            const eventDetails = buildReduxActionEventDetails(stubAction, stubSupplementaryDetails);

            expect(eventDetails).to.be.ok;
            expect(eventDetails).to.be.instanceOf(Object);
            expect(eventDetails).to.contain(stubSupplementaryDetails);
            expect(eventDetails.timestamp).to.eql(now.valueOf());
            expect(eventDetails.dateTime).to.eql(now.toISOString());
            expect(eventDetails.type).to.eql(stubAction.type);
        });
    });
});
