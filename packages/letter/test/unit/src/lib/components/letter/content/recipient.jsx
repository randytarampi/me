import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import LetterRecipient from "../../../../../../../src/lib/components/letter/content/recipient";
import LetterEntity from "../../../../../../../src/lib/letter";
import LetterSection from "../../../../../../../src/lib/letterSection";

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
            givenName: "Woof",
            familyName: "Woof",
            worksFor: "Woofs",
            jobTitle: "Woof",
            image: null,
            email: "woof@randytarampi.ca",
            telephone: "+16692216251",
            url: "woof.woof/woof",
            description: "Woof woof woof",
            address: {
                streetAddress: "woof",
                postalCode: "meow",
                addressLocality: "grr",
                addressCountry: "CA",
                addressRegion: "BC"
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

    it("renders (null if no recipient)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: null,
            id: "foo",
            filename: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.getElement()).to.eql(null);
    });

    it("renders (default content)", function () {
        const rendered = shallow(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

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
            recipient: Object.assign({}, stubPersonJs, {
                givenName: null,
                familyName: null,
                address: {
                    streetAddress: "woof",
                    postalCode: "meow",
                    addressLocality: "grr",
                    postOfficeBoxNumber: "rawr",
                    addressCountry: "CA",
                    addressRegion: "BC"
                }
            }),
            id: "foo",
            filename: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.not.have.descendants(".printable-recipient__name");
        expect(rendered).to.have.descendants(".printable-recipient__title");
        expect(rendered).to.have.descendants(".printable-recipient__company");
        expect(rendered).to.have.descendants(".printable-recipient__street-address");
        expect(rendered).to.have.descendants(".printable-recipient__post-office-box-number");
        expect(rendered).to.have.descendants(".printable-recipient__city-region");
        expect(rendered).to.have.descendants(".printable-recipient__postal-code");
    });

    it("renders (no title)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: Object.assign({}, stubPersonJs, {jobTitle: null}),
            id: "foo",
            filename: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

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
            filename: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

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
            recipient: Object.assign({}, stubPersonJs, {address: null}),
            id: "foo",
            filename: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.have.descendants(".printable-recipient__name");
        expect(rendered).to.have.descendants(".printable-recipient__title");
        expect(rendered).to.have.descendants(".printable-recipient__company");
        expect(rendered).to.not.have.descendants(".printable-recipient__street-address");
        expect(rendered).to.not.have.descendants(".printable-recipient__city-region");
        expect(rendered).to.not.have.descendants(".printable-recipient__postal-code");
    });
});
