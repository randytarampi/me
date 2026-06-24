import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";
import Footer from "../../../../../../src/lib/components/letter/footer";
import LetterEntity from "../../../../../../src/lib/letter";

describe("Footer", function () {
    let stubPersonJs;
    let stubSenderJs;
    let stubRecipientJs;
    let stubLetter;
    let mockStore;
    let stubStore;

    beforeEach(function () {
        stubPersonJs = {
            name: null,
            givenName: "Woof",
            familyName: "Woof",
            worksFor: null,
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

        mockStore = configureStore([thunk]);
        stubStore = mockStore({});
    });

    it("renders", function () {
        const rendered = render(<Provider store={stubStore}><Footer contentConfiguration={stubLetter.footer} letter={stubLetter}/></Provider>);

        expect(rendered.container.querySelector(".hide-on-print")).to.not.eql(null);
        expect(rendered.container.querySelector(".hide-on-screen")).to.not.eql(null);
    });
});
