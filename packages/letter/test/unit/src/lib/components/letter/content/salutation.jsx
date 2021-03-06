import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import LetterSalutation from "../../../../../../../src/lib/components/letter/content/salutation";
import LetterEntity from "../../../../../../../src/lib/letter";
import LetterSection from "../../../../../../../src/lib/letterSection";

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

        const rendered = shallow(<LetterSalutation letter={stubLetter}
                                                   contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.have.descendants(".letter-salutation__content");
        expect(rendered).to.contain(<h3 className="letter-salutation__content">{"To whom it may concern,"}</h3>);
    });

    it("renders (with name)", function () {
        const rendered = shallow(<LetterSalutation letter={stubLetter}
                                                   contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.have.descendants(".letter-salutation__content");
        expect(rendered).to.contain(<h3
            className="letter-salutation__content">{`Hello ${stubLetter.recipient.firstName},`}</h3>);
    });

    it("renders (with custom greeting)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                greeting: "Woof"
            }
        });

        const rendered = shallow(<LetterSalutation letter={stubLetter}
                                                   contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.have.descendants(".letter-salutation__content");
        expect(rendered).to.contain(<h3
            className="letter-salutation__content">{`Woof ${stubLetter.recipient.firstName},`}</h3>);
    });
});
