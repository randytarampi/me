import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import LetterWhy from "../../../../../../public/components/letter/content/why";
import LetterSection from "../../../../../../lib/letterSection";
import LetterEntity from "../../../../../../lib/letter";

describe("LetterWhy", function () {
    let stubContentConfiguration;
    let stubPersonJs;
    let stubSenderJs;
    let stubRecipientJs;
    let stubLetter;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "why"
        });

        stubPersonJs = {
            name: null,
            firstName: "Woof",
            lastName: "Woof",
            worksFor: "Woofs",
            jobTitle: "Wf.",
            label: "Woof",
            picture: null,
            email: "woof@randytarampi.ca",
            phone: "+1234567890",
            website: "woof.woof/woof",
            summary: "Woof woof woof",
            location: {
                address: "woof",
                postalCode: "meow",
                city: "grr",
                countryCode: "CA",
                region: "BC"
            }
        };
        stubSenderJs = Object.assign({}, stubPersonJs);
        stubRecipientJs = Object.assign({}, stubPersonJs, {firstName: "Meow", email: "meow@randytarampi.ca"});

        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            fileName: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });
    });

    it("renders (default content)", function () {
        const rendered = shallow(<LetterWhy letter={stubLetter} contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-why__content");
        expect(rendered.find(".letter-why__content").html()).to.match(/I&#x27;ve spent the last few years working as a full stack developer/);
    });

    it("renders (custom content)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                why: <span className="Woof">Woof woof woof</span>
            }
        });

        const rendered = shallow(<LetterWhy letter={stubLetter} contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-why__content");
        expect(rendered.find(".letter-why__content")).to.contain(stubContentConfiguration.contentProps.why);
    });
});
