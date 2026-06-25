import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import LetterMe from "../../../../../../../src/lib/components/letter/content/me.jsx";
import LetterSection from "../../../../../../../src/lib/letterSection.js";

describe("LetterMe", function () {
    let stubContentConfiguration;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "aboutMe"
        });
    });

    it("renders (default content)", function () {
        const rendered = render(<LetterMe contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelectorAll(".letter-me__content").length).to.eql(1);
        expect(rendered.container.querySelector(".letter-me__content")?.textContent).to.match(/I'm not your run of the mill software developer/);
    });

    it("renders (custom content)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                aboutMe: <span className="Woof">Woof woof woof</span>
            }
        });

        const rendered = render(<LetterMe contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelectorAll(".letter-me__content").length).to.eql(1);
        expect(rendered.container.querySelector(".letter-me__content")?.textContent).to.contain("Woof woof woof");
    });
});
