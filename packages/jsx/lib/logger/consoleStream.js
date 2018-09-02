import {Bear, DeadBear, DisBear, DoubtBear, LennyBear, ShrugBear} from "@randy.tarampi/js";

const bears = {
    lennyBear: new LennyBear(),
    shrugBear: new ShrugBear(),
    bear: new Bear(),
    doubtBear: new DoubtBear(),
    disBear: new DisBear(),
    deadBear: new DeadBear(),
};

class ConsoleStream {
    static nameFromLevel(level) {
        if (level >= 60) {
            return bears.deadBear.toString();
        }
        if (level >= 50) {
            return bears.disBear.toString();
        }
        if (level >= 40) {
            return bears.doubtBear.toString();
        }
        if (level >= 30) {
            return bears.bear.toString();
        }
        if (level >= 20) {
            return bears.shrugBear.toString();
        }

        return bears.lennyBear.toString();
    }

    static consoleLoggerFromLevel(level) {
        const console = typeof window !== "undefined" && window.console;

        if (level >= 50 && console && console.error) { // NOTE-RT: There is no `console.fatal`, so just combine `FATAL` and `ERROR` into `console.error`
            return console.error;
        }

        if (level >= 40 && console && console.warn) {
            return console.warn;
        }

        if (level >= 30 && console && console.info) {
            return console.info;
        }

        if (level >= 10 && console && console.debug) { // NOTE-RT: There is no `console.trace`, so just combine `DEBUG` and `TRACE` into `console.debug`
            return console.debug;
        }

        return console && console.log || null;
    }

    write(record) {
        const consoleLogger = ConsoleStream.consoleLoggerFromLevel(record.level);

        if (consoleLogger) {
            consoleLogger("[%s] %s %s",
                record.time.toISOString(),
                ConsoleStream.nameFromLevel(record.level),
                record.msg
            );
        }
    }
}

export default ConsoleStream;
