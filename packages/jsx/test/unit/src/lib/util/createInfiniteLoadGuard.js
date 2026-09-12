import {expect} from "chai";
import createInfiniteLoadGuard from "../../../../../src/lib/util/createInfiniteLoadGuard.js";

describe("createInfiniteLoadGuard", function () {
    it("admits exactly one call while a load is in flight", function () {
        let calls = 0;
        const guard = createInfiniteLoadGuard(() => {
            calls++;
            return new Promise(() => {});
        });

        expect(guard.run()).to.equal(true);
        expect(guard.run()).to.equal(false);
        expect(guard.run()).to.equal(false);
        expect(calls).to.equal(1);
    });

    it("admits the next call only after release", function () {
        let calls = 0;
        const guard = createInfiniteLoadGuard(() => {
            calls++;
            return Promise.resolve();
        });

        guard.run();
        expect(guard.isInFlight()).to.equal(true);
        guard.release();
        expect(guard.isInFlight()).to.equal(false);
        expect(guard.run()).to.equal(true);
        expect(calls).to.equal(2);
    });

    it("survives a rejecting fetch without wedging the guard", function () {
        const guard = createInfiniteLoadGuard(() => Promise.reject(new Error("EFETCH")));

        expect(guard.run()).to.equal(true);
        guard.release();
        expect(guard.run()).to.equal(true);
    });
});