import {expect} from "chai";
import {firstResolved} from "../../../lib/util";
import {timedPromise} from "../../lib/util";

describe("util", function () {
    describe("firstResolved", function () {
        it("resolves the first of the resolved", function () {
            let first = "first";
            let last = "last";

            return firstResolved([
                Promise.resolve(first),
                timedPromise(last)
            ])
                .catch(error => {
                    expect(error).to.not.be.ok;
                })
                .then(firstResolved => {
                    expect(firstResolved).to.eql(first);
                });
        });

        it("resolves the resolved", function () {
            let first = "first";
            let last = "last";

            return firstResolved([
                timedPromise(null, new Error(`${first} exploded`), true),
                timedPromise(last)
            ])
                .catch(error => {
                    expect(error).to.not.be.ok;
                })
                .then(firstResolved => {
                    expect(firstResolved).to.eql(last);
                });
        });

        it("throws if none resolved", function () {
            let first = "first";
            let last = "last";

            return firstResolved([
                timedPromise(null, new Error(`${first} exploded`), true),
                timedPromise(null, new Error(`${last} exploded`), true)
            ])
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error).to.be.ok;
                    expect(error).to.be.instanceof(Error);
                    expect(error.message).to.match(/`firstResolved` failed and returned 2 errors/);
                    expect(error.errors).to.have.length(2);
                });
        });
    });
});
