import {expect} from "chai";
import {Map} from "immutable";
import {render} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import LetterRecipient from "../../../../../../../src/lib/components/letter/content/recipient.jsx";
import LetterEntity from "../../../../../../../src/lib/letter.js";
import LetterSection from "../../../../../../../src/lib/letterSection.js";

describe("LetterRecipient", function () {
    let stubContentConfiguration;
    let stubPersonJs;
    let stubSenderJs;
    let stubRecipientJs;
    let stubLetter;
    let stubStore;

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

        stubStore = configureStore([])(Map({emoji: Map()}));
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

        const rendered = render(<Provider store={stubStore}><LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/></Provider>);

        expect(rendered.container.firstChild).to.eql(null);
    });

    it("renders (default content)", function () {
        const rendered = render(<Provider store={stubStore}><LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/></Provider>);

        expect(rendered.container.querySelector(".printable-recipient__name")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__title")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__company")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__street-address")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__city-region")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__postal-code")).to.not.eql(null);
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

        const rendered = render(<Provider store={stubStore}><LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/></Provider>);

        expect(rendered.container.querySelector(".printable-recipient__name")).to.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__title")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__company")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__street-address")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__post-office-box-number")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__city-region")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__postal-code")).to.not.eql(null);
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

        const rendered = render(<Provider store={stubStore}><LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/></Provider>);

        expect(rendered.container.querySelector(".printable-recipient__name")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__title")).to.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__company")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__street-address")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__city-region")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__postal-code")).to.not.eql(null);
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

        const rendered = render(<Provider store={stubStore}><LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/></Provider>);

        expect(rendered.container.querySelector(".printable-recipient__name")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__title")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__company")).to.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__street-address")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__city-region")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__postal-code")).to.not.eql(null);
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

        const rendered = render(<LetterRecipient letter={stubLetter}
                                                  contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".printable-recipient__name")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__title")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__company")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__street-address")).to.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__city-region")).to.eql(null);
        expect(rendered.container.querySelector(".printable-recipient__postal-code")).to.eql(null);
    });
});
