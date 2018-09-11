import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import LetterAboutYou from "../../../../../../lib/components/letter/content/you";
import LetterSection from "../../../../../../lib/letterSection";

describe("LetterAboutYou", function () {
    let stubContentConfiguration;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "you"
        });
    });

    it("renders (default content)", function () {
        const rendered = shallow(<LetterAboutYou contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-you__content");
        expect(rendered.find(".letter-you__content").first().html()).to.match(/I don&#x27;t usually talk about myself this often/);
        expect(rendered.find(".letter-you__content").last().html()).to.match(/I scoped out your team and it looks like/);
    });

    it("renders (custom content)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                aboutYou: <span className="Woof">Woof woof woof</span>
            }
        });

        const rendered = shallow(<LetterAboutYou contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-you__content");
        expect(rendered.find(".letter-you__content").first().html()).to.match(/I don&#x27;t usually talk about myself this often/);
        expect(rendered.find(".letter-you__content")).to.contain(stubContentConfiguration.contentProps.aboutYou);
    });
});
