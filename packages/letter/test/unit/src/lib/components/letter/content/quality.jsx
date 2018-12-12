import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import LetterQuality from "../../../../../../../src/lib/components/letter/content/quality";
import LetterSection from "../../../../../../../src/lib/letterSection";

describe("LetterQuality", function () {
    let stubContentConfiguration;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "quality"
        });
    });

    it("renders (default content)", function () {
        const rendered = shallow(<LetterQuality contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.have.descendants(".letter-quality__content");
        expect(rendered.find(".letter-quality__content").html()).to.match(/And it&#x27;s not like I just build software for end users either/);
    });

    it("renders (custom content)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                quality: <span className="Woof">Woof woof woof</span>
            }
        });

        const rendered = shallow(<LetterQuality contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.have.descendants(".letter-quality__content");
        expect(rendered.find(".letter-quality__content").html()).to.not.match(/And it&#x27;s not like I just build software for end users either/);
        expect(rendered.find(".letter-quality__content")).to.contain(stubContentConfiguration.contentProps.quality);
    });
});
