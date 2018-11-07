import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import Shields, * as shieldLinks from "../../../../../../src/lib/components/link/shields";

describe("Shield", function () {
    it("renders all Shields", function () {
        const rendered = shallow(<Shields/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("shields");
    });

    Object.keys(shieldLinks)
        .filter(key => !["default", "Shields"].includes(key))
        .forEach(key => {
            describe(key, function () {
                it("renders", function () {
                    const specificShield = shieldLinks[key];
                    const rendered = shallow(specificShield());

                    expect(rendered).to.be.ok;
                    expect(rendered).to.have.length(1);
                });
            });
        });
});
