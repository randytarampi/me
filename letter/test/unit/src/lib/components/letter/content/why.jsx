import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import LetterWhy from "../../../../../../../src/lib/components/letter/content/why.jsx";
import LetterEntity from "../../../../../../../src/lib/letter.js";
import LetterSection from "../../../../../../../src/lib/letterSection.js";

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

    it("renders (default content)", function () {
        const rendered = render(<LetterWhy letter={stubLetter} contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".letter-why__content")?.textContent).to.match(/I spent the last few years developing on smaller teams/);
    });

    it("renders (custom content)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                why: <span className="Woof">Woof woof woof</span>
            }
        });

        const rendered = render(<LetterWhy letter={stubLetter} contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".letter-why__content")?.textContent).to.contain("Woof woof woof");
    });
});
