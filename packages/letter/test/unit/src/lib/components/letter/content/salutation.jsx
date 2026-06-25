import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import LetterSalutation from "../../../../../../../src/lib/components/letter/content/salutation.jsx";
import LetterEntity from "../../../../../../../src/lib/letter.js";
import LetterSection from "../../../../../../../src/lib/letterSection.js";

describe("LetterSalutation", function () {
    let stubContentConfiguration;
    let stubPersonJs;
    let stubSenderJs;
    let stubSalutationJs;
    let stubLetter;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "salutation"
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
        stubSalutationJs = Object.assign({}, stubPersonJs, {givenName: "Meow", email: "meow@randytarampi.ca"});

        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubSalutationJs,
            id: "foo",
            filename: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });
    });

    it("renders (default content)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: Object.assign({}, stubPersonJs, {givenName: null, familyName: null}),
            id: "foo",
            filename: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = render(<LetterSalutation letter={stubLetter}
                                                   contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".letter-salutation__content")?.textContent).to.eql("To whom it may concern,");
    });

    it("renders (with name)", function () {
        const rendered = render(<LetterSalutation letter={stubLetter}
                                                   contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".letter-salutation__content")?.textContent).to.eql(`Hello ${stubLetter.recipient.firstName},`);
    });

    it("renders (with custom greeting)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                greeting: "Woof"
            }
        });

        const rendered = render(<LetterSalutation letter={stubLetter}
                                                   contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".letter-salutation__content")?.textContent).to.eql(`Woof ${stubLetter.recipient.firstName},`);
    });
});
