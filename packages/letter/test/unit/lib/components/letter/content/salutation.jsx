import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import LetterSalutation from "../../../../../../lib/components/letter/content/salutation";
import LetterEntity from "../../../../../../lib/letter";
import LetterSection from "../../../../../../lib/letterSection";

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
        stubSalutationJs = Object.assign({}, stubPersonJs, {firstName: "Meow", email: "meow@randytarampi.ca"});

        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubSalutationJs,
            id: "foo",
            fileName: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });
    });

    it("renders (default content)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: Object.assign({}, stubPersonJs, {firstName: null, lastName: null}),
            id: "foo",
            fileName: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterSalutation letter={stubLetter}
                                                   contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-salutation__content");
        expect(rendered).to.contain(<h3 className="letter-salutation__content">{"To whom it may concern,"}</h3>);
    });

    it("renders (with name)", function () {
        const rendered = shallow(<LetterSalutation letter={stubLetter}
                                                   contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-salutation__content");
        expect(rendered).to.contain(<h3
            className="letter-salutation__content">{`Hello ${stubLetter.recipient.name},`}</h3>);
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

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-salutation__content");
        expect(rendered).to.contain(<h3
            className="letter-salutation__content">{`Woof ${stubLetter.recipient.name},`}</h3>);
    });
});
