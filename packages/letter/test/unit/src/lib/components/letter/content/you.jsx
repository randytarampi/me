import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import LetterAboutYou from "../../../../../../../src/lib/components/letter/content/you";
import LetterSection from "../../../../../../../src/lib/letterSection";

describe("LetterAboutYou", function () {
    let stubContentConfiguration;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "you"
        });
    });

    it("renders (default content)", function () {
        const rendered = render(<LetterAboutYou contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelectorAll(".letter-you__content").length).to.eql(2);
        expect(rendered.container.querySelectorAll(".letter-you__content")[0]?.textContent).to.match(/I don't usually talk about myself this often/);
        expect(rendered.container.querySelectorAll(".letter-you__content")[1]?.textContent).to.match(/I scoped out your team and it looks like/);
    });

    it("renders (custom content)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                aboutYou: <span className="Woof">Woof woof woof</span>
            }
        });

        const rendered = render(<LetterAboutYou contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelectorAll(".letter-you__content").length).to.eql(2);
        expect(rendered.container.querySelectorAll(".letter-you__content")[0]?.textContent).to.match(/I don't usually talk about myself this often/);
        expect(rendered.container.querySelectorAll(".letter-you__content")[1]?.textContent).to.contain("Woof woof woof");
    });
});
