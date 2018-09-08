import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import LetterRecipient from "../../../../../../public/components/letter/content/recipient";
import LetterEntity from "../../../../../../lib/letter";
import LetterSection from "../../../../../../lib/letterSection";

describe("LetterRecipient", function () {
    let stubContentConfiguration;
    let stubPersonJs;
    let stubSenderJs;
    let stubRecipientJs;
    let stubLetter;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "recipient"
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

    it("renders (null if no recipient)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: null,
            id: "foo",
            fileName: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered.getElement()).to.eql(null);
    });

    it("renders (default content)", function () {
        const rendered = shallow(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".printable-recipient__name");
        expect(rendered).to.have.descendants(".printable-recipient__title");
        expect(rendered).to.have.descendants(".printable-recipient__company");
        expect(rendered).to.have.descendants(".printable-recipient__street-address");
        expect(rendered).to.have.descendants(".printable-recipient__city-region");
        expect(rendered).to.have.descendants(".printable-recipient__postal-code");
    });

    it("renders (no name)", function () {
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

        const rendered = shallow(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.not.have.descendants(".printable-recipient__name");
        expect(rendered).to.have.descendants(".printable-recipient__title");
        expect(rendered).to.have.descendants(".printable-recipient__company");
        expect(rendered).to.have.descendants(".printable-recipient__street-address");
        expect(rendered).to.have.descendants(".printable-recipient__city-region");
        expect(rendered).to.have.descendants(".printable-recipient__postal-code");
    });

    it("renders (no title)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: Object.assign({}, stubPersonJs, {jobTitle: null}),
            id: "foo",
            fileName: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".printable-recipient__name");
        expect(rendered).to.not.have.descendants(".printable-recipient__title");
        expect(rendered).to.have.descendants(".printable-recipient__company");
        expect(rendered).to.have.descendants(".printable-recipient__street-address");
        expect(rendered).to.have.descendants(".printable-recipient__city-region");
        expect(rendered).to.have.descendants(".printable-recipient__postal-code");
    });

    it("renders (no company)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: Object.assign({}, stubPersonJs, {worksFor: null}),
            id: "foo",
            fileName: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".printable-recipient__name");
        expect(rendered).to.have.descendants(".printable-recipient__title");
        expect(rendered).to.not.have.descendants(".printable-recipient__company");
        expect(rendered).to.have.descendants(".printable-recipient__street-address");
        expect(rendered).to.have.descendants(".printable-recipient__city-region");
        expect(rendered).to.have.descendants(".printable-recipient__postal-code");
    });

    it("renders (no location)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: Object.assign({}, stubPersonJs, {location: null}),
            id: "foo",
            fileName: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".printable-recipient__name");
        expect(rendered).to.have.descendants(".printable-recipient__title");
        expect(rendered).to.have.descendants(".printable-recipient__company");
        expect(rendered).to.not.have.descendants(".printable-recipient__street-address");
        expect(rendered).to.not.have.descendants(".printable-recipient__city-region");
        expect(rendered).to.not.have.descendants(".printable-recipient__postal-code");
    });
});
