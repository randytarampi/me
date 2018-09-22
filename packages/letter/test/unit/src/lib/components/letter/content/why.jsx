import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import LetterWhy from "../../../../../../../src/lib/components/letter/content/why";
import LetterEntity from "../../../../../../../src/lib/letter";
import LetterSection from "../../../../../../../src/lib/letterSection";

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
            givenName: "Woof",
            familyName: "Woof",
            worksFor: "Woofs",
            jobTitle: "Woof",
            picture: null,
            email: "woof@randytarampi.ca",
            phone: "+1234567890",
            url: "woof.woof/woof",
            description: "Woof woof woof",
            location: {
                address: "woof",
                postalCode: "meow",
                city: "grr",
                countryCode: "CA",
                region: "BC"
            }
        };
        stubSenderJs = Object.assign({}, stubPersonJs);
        stubRecipientJs = Object.assign({}, stubPersonJs, {givenName: "Meow", email: "meow@randytarampi.ca"});

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
        expect(rendered.find(".letter-why__content").html()).to.match(/I spent the last few years developing on smaller teams/);
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
