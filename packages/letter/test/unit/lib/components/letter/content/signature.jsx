import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import LetterSignature from "../../../../../../lib/components/letter/content/signature";
import LetterEntity from "../../../../../../lib/letter";
import LetterSection from "../../../../../../lib/letterSection";

describe("LetterSignature", function () {
    let stubContentConfiguration;
    let stubPersonJs;
    let stubSenderJs;
    let stubRecipientJs;
    let stubLetter;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "signature"
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

    it("renders", function () {
        const rendered = shallow(<LetterSignature letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-signature__content");
        expect(rendered).to.have.descendants(".signature.letter-signature__signature");
        expect(rendered.find(".signature.letter-signature__signature")).to.have.prop("src", `${__ASSET_URL__}/signature.svg`);
    });
});
