const {expect} = require("chai");
const {render} = require("@testing-library/react");
const React = require("react");
import Shields, * as shieldLinks from "../../../../../../src/lib/components/link/shields/index.jsx";

describe("Shield", function () {
    it("renders all Shields", function () {
        const rendered = render(<Shields/>);

        expect(rendered.container.firstElementChild?.classList.contains("shields")).to.eql(true);
    });

    Object.keys(shieldLinks)
        .filter(key => !["default", "Shields"].includes(key))
        .forEach(key => {
            describe(key, function () {
                it("renders", function () {
                    const specificShield = shieldLinks[key];
                    const rendered = render(specificShield());

                    expect(rendered.container.innerHTML).to.not.eql("");
                });
            });
        });
});
