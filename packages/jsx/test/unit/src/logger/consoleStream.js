import {Bear, DeadBear, DisBear, DoubtBear, LennyBear, ShrugBear} from "@randy.tarampi/js";
import {nameFromLevel} from "browser-bunyan";
import {expect} from "chai";
import sinon from "sinon";
import ConsoleStream from "../../../../src/lib/logger/consoleStream";

describe("ConsoleStream", function () {
    let bears;

    beforeEach(function () {
        bears = {
            lennyBear: new LennyBear(),
            shrugBear: new ShrugBear(),
            bear: new Bear(),
            doubtBear: new DoubtBear(),
            disBear: new DisBear(),
            deadBear: new DeadBear()
        };
    });

    describe(".colorFromLevel", function () {
        it("handles FATAL (60)", function () {
            const name = ConsoleStream.colorFromLevel(60);

            expect(name).to.be.ok;
            expect(name).to.eql("brightRed");
        });

        it("handles ERROR (50)", function () {
            const name = ConsoleStream.colorFromLevel(50);

            expect(name).to.be.ok;
            expect(name).to.eql("red");
        });

        it("handles WARN (40)", function () {
            const name = ConsoleStream.colorFromLevel(40);

            expect(name).to.be.ok;
            expect(name).to.eql("magenta");
        });

        it("handles INFO (30)", function () {
            const name = ConsoleStream.colorFromLevel(30);

            expect(name).to.be.ok;
            expect(name).to.eql("cyan");
        });

        it("handles DEBUG (20)", function () {
            const name = ConsoleStream.colorFromLevel(20);

            expect(name).to.be.ok;
            expect(name).to.eql("brightBlack");
        });

        it("handles TRACE (10)", function () {
            const name = ConsoleStream.colorFromLevel(10);

            expect(name).to.be.ok;
            expect(name).to.eql("brightBlack");
        });

        it("returns the closest matching level name for a random logging level", function () {
            const name = ConsoleStream.colorFromLevel(101);

            expect(name).to.be.ok;
            expect(name).to.eql("brightRed");
        });
    });

    describe(".nameFromLevel", function () {
        it("handles FATAL (60)", function () {
            const name = ConsoleStream.nameFromLevel(60);

            expect(name).to.be.ok;
            expect(name).to.eql(bears.deadBear.toString());
        });

        it("handles ERROR (50)", function () {
            const name = ConsoleStream.nameFromLevel(50);

            expect(name).to.be.ok;
            expect(name).to.eql(bears.disBear.toString());
        });

        it("handles WARN (40)", function () {
            const name = ConsoleStream.nameFromLevel(40);

            expect(name).to.be.ok;
            expect(name).to.eql(bears.doubtBear.toString());
        });

        it("handles INFO (30)", function () {
            const name = ConsoleStream.nameFromLevel(30);

            expect(name).to.be.ok;
            expect(name).to.eql(bears.bear.toString());
        });

        it("handles DEBUG (20)", function () {
            const name = ConsoleStream.nameFromLevel(20);

            expect(name).to.be.ok;
            expect(name).to.eql(bears.shrugBear.toString());
        });

        it("handles TRACE (10)", function () {
            const name = ConsoleStream.nameFromLevel(10);

            expect(name).to.be.ok;
            expect(name).to.eql(bears.lennyBear.toString());
        });

        it("returns the closest matching level name for a random logging level", function () {
            const name = ConsoleStream.nameFromLevel(101);

            expect(name).to.be.ok;
            expect(name).to.eql(bears.deadBear.toString());
        });
    });

    describe(".consoleLoggerFromLevel", function () {
        const window = global.window;
        const console = window.console;

        beforeEach(function () {
            sinon.stub(console, "error");
            sinon.stub(console, "warn");
            sinon.stub(console, "info");
            sinon.stub(console, "debug");
            sinon.stub(console, "log");
        });

        afterEach(function () {
            console.error.restore(); // eslint-disable-line no-console
            console.warn.restore(); // eslint-disable-line no-console
            console.info.restore(); // eslint-disable-line no-console
            console.debug.restore(); // eslint-disable-line no-console
            console.log.restore(); // eslint-disable-line no-console

            window.console = console;
            global.window = window;
        });

        it("handles FATAL (60)", function () {
            const consoleLogger = ConsoleStream.consoleLoggerFromLevel(60);

            expect(consoleLogger).to.be.ok;
            expect(consoleLogger).to.eql(console.error); // eslint-disable-line no-console
        });

        it("handles ERROR (50)", function () {
            const consoleLogger = ConsoleStream.consoleLoggerFromLevel(50);

            expect(consoleLogger).to.be.ok;
            expect(consoleLogger).to.eql(console.error); // eslint-disable-line no-console
        });

        it("handles WARN (40)", function () {
            const consoleLogger = ConsoleStream.consoleLoggerFromLevel(40);

            expect(consoleLogger).to.be.ok;
            expect(consoleLogger).to.eql(console.warn); // eslint-disable-line no-console
        });

        it("handles INFO (30)", function () {
            const consoleLogger = ConsoleStream.consoleLoggerFromLevel(30);

            expect(consoleLogger).to.be.ok;
            expect(consoleLogger).to.eql(console.info); // eslint-disable-line no-console
        });

        it("handles DEBUG (20)", function () {
            const consoleLogger = ConsoleStream.consoleLoggerFromLevel(20);

            expect(consoleLogger).to.be.ok;
            expect(consoleLogger).to.eql(console.debug); // eslint-disable-line no-console
        });

        it("handles TRACE (10)", function () {
            const consoleLogger = ConsoleStream.consoleLoggerFromLevel(10);

            expect(consoleLogger).to.be.ok;
            expect(consoleLogger).to.eql(console.debug); // eslint-disable-line no-console
        });

        it("returns `console.log` if there is no other appropriate level", function () {
            const consoleLogger = ConsoleStream.consoleLoggerFromLevel(-10);

            expect(consoleLogger).to.be.ok;
            expect(consoleLogger).to.eql(console.log); // eslint-disable-line no-console
        });

        it("returns the closest matching logger for a random logging level", function () {
            const consoleLogger = ConsoleStream.consoleLoggerFromLevel(101);

            expect(consoleLogger).to.be.ok;
            expect(consoleLogger).to.eql(console.error); // eslint-disable-line no-console
        });
    });

    describe("#write", function () {
        const window = global.window;
        const console = window.console;
        let stubRecord;

        beforeEach(function () {
            stubRecord = {
                time: new Date(),
                level: 50,
                msg: "woof woof woof"
            };

            sinon.stub(console, "error");
            sinon.stub(console, "warn");
            sinon.stub(console, "info");
            sinon.stub(console, "debug");
            sinon.stub(console, "log");
        });

        afterEach(function () {
            console.error.restore(); // eslint-disable-line no-console
            console.warn.restore(); // eslint-disable-line no-console
            console.info.restore(); // eslint-disable-line no-console
            console.debug.restore(); // eslint-disable-line no-console
            console.log.restore(); // eslint-disable-line no-console

            window.console = console;
            global.window = window;
        });

        it("logs out a record", function () {
            const consoleStream = new ConsoleStream();

            consoleStream.write(stubRecord);

            expect(console.error.calledOnce).to.eql(true); // eslint-disable-line no-console
            sinon.assert.calledWith(console.error, // eslint-disable-line no-console
                "%c｢%s｣ %c%s%c: %s",
                "color: grey",
                bears.bear.toString(),
                `color: ${ConsoleStream.colorFromLevel(stubRecord.level)}`,
                nameFromLevel[stubRecord.level].toUpperCase(),
                "color: unset",
                stubRecord.msg
            );
        });

        it("doesn't explode when there's no console method to log to", function () {
            const consoleStream = new ConsoleStream();
            stubRecord.level = -10;

            delete window.console;

            consoleStream.write(stubRecord);

            expect(console.error.notCalled).to.eql(true); // eslint-disable-line no-console
            expect(console.warn.notCalled).to.eql(true); // eslint-disable-line no-console
            expect(console.info.notCalled).to.eql(true); // eslint-disable-line no-console
            expect(console.debug.notCalled).to.eql(true); // eslint-disable-line no-console
            expect(console.log.notCalled).to.eql(true); // eslint-disable-line no-console
        });
    });
});
