import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import LetterQuality from "../../../../../../../src/lib/components/letter/content/quality.jsx";
import LetterSection from "../../../../../../../src/lib/letterSection.js";

describe("LetterQuality", function () {
    let stubContentConfiguration;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "quality"
        });
    });

    it("renders (default content)", function () {
        const rendered = render(<LetterQuality contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".letter-quality__content")?.textContent).to.match(/And it's not like I just build software for end users either/);
    });

    it("renders (custom content)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                quality: <span className="Woof">Woof woof woof</span>
            }
        });

        const rendered = render(<LetterQuality contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".letter-quality__content")?.textContent).to.contain("Woof woof woof");
    });
});
