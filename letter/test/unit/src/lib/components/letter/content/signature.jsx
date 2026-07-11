import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import LetterSignature from "../../../../../../../src/lib/components/letter/content/signature.jsx";
import LetterEntity from "../../../../../../../src/lib/letter.js";
import LetterSection from "../../../../../../../src/lib/letterSection.js";

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
            givenName: "Woof",
            familyName: "Woof",
            worksFor: "Woofs",
            jobTitle: "Woof",
            picture: null,
            email: "woof@randytarampi.ca",
            phone: "+16692216251",
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
            filename: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });
    });

    it("renders", function () {
        const rendered = render(<LetterSignature letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".letter-signature__content")).to.not.eql(null);
        expect(rendered.container.querySelector(".signature.letter-signature__signature")?.getAttribute("src")).to.eql(`${__LETTER_ASSET_URL__}/signature.svg`);
    });
});
