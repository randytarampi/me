import {Bear, DeadBear, DisBear, DoubtBear, LennyBear, ShrugBear} from "@randy.tarampi/js";
import bunyan from "bunyan";

const bears = {
    lennyBear: new LennyBear(),
    shrugBear: new ShrugBear(),
    bear: new Bear(),
    doubtBear: new DoubtBear(),
    disBear: new DisBear(),
    deadBear: new DeadBear(),
};

class ConsoleStream {
    // NOTE-RT: Lifted directly from `bunyan-format`
    static colorFromLevel(level) {
        if (level >= 60) {
            return "brightRed";
        }
        if (level >= 50) {
            return "red";
        }
        if (level >= 40) {
            return "magenta";
        }
        if (level >= 30) {
            return "cyan";
        }
        if (level >= 20) {
            return "brightBlack";
        }

        return "brightBlack";
    }

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
            consoleLogger("\t%c｢%s｣ %c%s%c: %s",
                "color: lightgrey",
                bears.bear.toString(),
                `color: ${ConsoleStream.colorFromLevel(record.level)}`,
                bunyan.nameFromLevel[record.level].toUpperCase(),
                "color: unset",
                record.msg
            );
        }
    }
}

export default ConsoleStream;
