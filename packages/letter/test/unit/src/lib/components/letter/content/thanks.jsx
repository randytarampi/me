import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import LetterThanks from "../../../../../../../src/lib/components/letter/content/thanks";
import LetterSection from "../../../../../../../src/lib/letterSection";

describe("LetterThanks", function () {
    let stubContentConfiguration;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "thanks"
        });
    });

    it("renders (default content)", function () {
        const rendered = render(<LetterThanks contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".letter-thanks__content")?.textContent).to.match(/I hope I didn't waste your time/);
    });

    it("renders (custom content)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                thanks: <span className="Woof">Woof woof woof</span>
            }
        });

        const rendered = render(<LetterThanks contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".letter-thanks__content")?.textContent).to.contain("Woof woof woof");
    });
});
