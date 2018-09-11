import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import Footer from "../../../../../lib/components/letter/footer";
import LetterEntity from "../../../../../lib/letter";

describe("Footer", function () {
    let stubPersonJs;
    let stubSenderJs;
    let stubRecipientJs;
    let stubLetter;

    beforeEach(function () {
        stubPersonJs = {
            name: null,
            firstName: "Woof",
            lastName: "Woof",
            worksFor: null,
            jobTitle: null,
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
        const rendered = shallow(<Footer letter={stubLetter}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".hide-on-print");
        expect(rendered).to.have.descendants(".hide-on-screen");
    });
});
