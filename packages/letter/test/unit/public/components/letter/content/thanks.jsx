import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import LetterThanks from "../../../../../../public/components/letter/content/thanks";
import LetterSection from "../../../../../../lib/letterSection";

describe("LetterThanks", function () {
    let stubContentConfiguration;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "thanks"
        });
    });

    it("renders (default content)", function () {
        const rendered = shallow(<LetterThanks contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-thanks__content");
        expect(rendered.find(".letter-thanks__content").html()).to.match(/I hope I didn&#x27;t waste your time/);
    });

    it("renders (custom content)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                thanks: <span className="Woof">Woof woof woof</span>
            }
        });

        const rendered = shallow(<LetterThanks contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-thanks__content");
        expect(rendered.find(".letter-thanks__content")).to.contain(stubContentConfiguration.contentProps.thanks);
    });
});
