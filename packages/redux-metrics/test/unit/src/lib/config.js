import {expect} from "chai";
import sinon from "sinon";
import config, {gtmClient} from "../../../../src/lib/config.js";
import GtmClient from "../../../../src/lib/vendors/gtm.js";

import {buildEventDetails} from "../../../../src/lib/util.js";

describe("config", function () {
    describe("vendors", function () {
        it("has the expected vendors", function () {
            expect(config.vendors).to.eql([
                {api: gtmClient}
            ]);

            expect(gtmClient).to.be.instanceOf(GtmClient);
        });
    });

    describe("pageDefaults", function () {
        let clock;

        beforeEach(function () {
            // NOTE-RT: `buildEventDetails` (via luxon's `DateTime.utc()`) stamps a real, live
            // "now" every time it's called. Since this spec calls it twice - once indirectly
            // through `config.pageDefaults`, once directly to build the expected value - two live
            // calls a fraction of a millisecond apart could land on either side of a millisecond
            // boundary, making the two `timestamp`/`dateTime` fields legitimately differ and
            // intermittently failing this otherwise-deterministic assertion. Freezing the clock
            // makes both calls observe the exact same instant.
            clock = sinon.useFakeTimers();
        });

        afterEach(function () {
            clock.restore();
        });

        it("calls `buildEventDetails` with the expected parameters", function () {
            const stubRouteState = {
                pathname: "woof",
                search: "grr",
                hash: "meow",
                params: "rawr"
            };

            const eventDetails = config.pageDefaults(stubRouteState);
            expect(eventDetails).to.be.ok;
            expect(eventDetails).to.eql(buildEventDetails({
                value: stubRouteState.pathname,
                pathname: stubRouteState.pathname,
                search: stubRouteState.search,
                hash: stubRouteState.hash,
                params: stubRouteState.params
            }));
        });
    });
});