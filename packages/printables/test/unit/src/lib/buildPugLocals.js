import {expect} from "chai";
import path from "path";
import React from "react";
import {buildPugLocalsBuilder} from "../../../../src/lib/buildPugLocals.js";

describe("buildPugLocalsBuilder", function () {
    it("builds printable pug locals", function () {
        const PrintableComponent = ({rawr}) => React.createElement("div", null, `woof ${rawr}`);
        const pugLocalsBuilder = buildPugLocalsBuilder({
            printableComponent: PrintableComponent,
            printableStylesPath: path.resolve("test/resources/styles.css")
        });

        const pugLocals = pugLocalsBuilder({rawr: 1});

        expect(pugLocals).to.contain({
            environment: "printable",
            rawr: 1
        });
        expect(pugLocals.content).to.contain("woof 1");
        expect(pugLocals.css).to.contain("body");
    });
});
