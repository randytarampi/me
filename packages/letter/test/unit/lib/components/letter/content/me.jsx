import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import LetterMe from "../../../../../../lib/components/letter/content/me";
import LetterSection from "../../../../../../lib/letterSection";

describe("LetterMe", function () {
    let stubContentConfiguration;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "aboutMe"
        });
    });

    it("renders (default content)", function () {
        const rendered = shallow(<LetterMe contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-me__content");

        expect(rendered.find(".letter-me__content").length).to.eql(1);
        expect(rendered.find(".letter-me__content").html()).to.match(/I&#x27;m not your run of the mill software developer/);
    });

    it("renders (custom content)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                aboutMe: <span className="Woof">Woof woof woof</span>
            }
        });

        const rendered = shallow(<LetterMe contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-me__content");
        expect(rendered).to.contain(stubContentConfiguration.contentProps.aboutMe);

        expect(rendered.find(".letter-me__content").length).to.eql(1);
        expect(rendered.find(".letter-me__content").html()).to.match(/Woof woof woof/);
    });
});
