import {expect} from "chai";
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