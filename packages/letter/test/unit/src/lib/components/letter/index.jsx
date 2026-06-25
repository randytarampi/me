import {
    ErrorENOACCESSContentComponent,
    ErrorESERVERContentComponent,
    LoadingSpinner,
    mapErrorCodeToErrorContentComponent as defaultMapErrorCodeToErrorContent,
    PrintableHeader
} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {render} from "@testing-library/react";
import {Map} from "immutable";
import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import sinon from "sinon";
import {thunk} from "redux-thunk";
import {LetterComponent, mapLetterErrorCodeToErrorContentComponent} from "../../../../../../src/lib/components/letter/index.jsx";
import LetterEntity from "../../../../../../src/lib/letter.js";

describe("LetterComponent", function () {
    let stubPersonJs;
    let stubSenderJs;
    let stubRecipientJs;
    let stubLetterContentComponent;
    let stubLetter;
    let stubFetchLetter;
    let mockStore;
    let stubStore;

    beforeEach(function () {
        const testComponent = () => <span className="rawr">foo</span>;

        stubPersonJs = {
            name: null,
            givenName: "Woof",
            familyName: "Woof",
            worksFor: null,
            jobTitle: "Woof",
            picture: null,
            email: "__VG_EMAIL_ba2fd61a0fac__",
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
        stubRecipientJs = Object.assign({}, stubPersonJs, {givenName: "Meow", email: "__VG_EMAIL_6189bc5d9ab3__"});

        stubLetterContentComponent = testComponent;
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

        stubFetchLetter = sinon.stub();
        mockStore = configureStore([thunk]);
        stubStore = mockStore(Map({api: Map(), emoji: Map(), error: Map(), letter: Map(), ui: Map()}));
    });

    it("maps letter error codes", function () {
        expect(mapLetterErrorCodeToErrorContentComponent("EFETCH")).to.eql(ErrorESERVERContentComponent);
        expect(mapLetterErrorCodeToErrorContentComponent("ESERVER")).to.eql(ErrorESERVERContentComponent);
        expect(mapLetterErrorCodeToErrorContentComponent("ENOLETTER")).to.eql(ErrorENOACCESSContentComponent);
        expect(mapLetterErrorCodeToErrorContentComponent()).to.eql(defaultMapErrorCodeToErrorContent());
    });

    it("renders and fetches the requested variant", function () {
        const rendered = render(<Provider store={stubStore}><LetterComponent
            variant="woof"
            fetchLetter={stubFetchLetter}
            match={{}}
            letter={stubLetter}
        /></Provider>);

        expect(rendered.container.querySelector(".printable.letter")).to.not.eql(null);
        expect(rendered.container.querySelector(".letter-content")).to.not.eql(null);
        expect(stubFetchLetter.calledOnce).to.eql(true);
        sinon.assert.calledWith(stubFetchLetter, "woof");
    });

    it("renders a loading spinner when loading", function () {
        const rendered = render(<Provider store={stubStore}><LetterComponent
            fetchLetter={stubFetchLetter}
            isLoading={true}
            match={{}}
            letter={stubLetter}
        /></Provider>);

        expect(rendered.container.querySelector(".loading-spinner")).to.not.eql(null);
        expect(rendered.container.querySelector(".letter-content")).to.eql(null);
    });

    it("renders letter content", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            filename: null,
            content: [{component: stubLetterContentComponent}],
            renderOptions: {format: "bar"}
        });

        const rendered = render(<Provider store={stubStore}><LetterComponent
            fetchLetter={stubFetchLetter}
            isLoading={false}
            match={{}}
            letter={stubLetter}
        /></Provider>);

        expect(rendered.container.querySelector(".letter-content")).to.not.eql(null);
        expect(rendered.container.querySelector(".rawr")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header")).to.not.eql(null);
    });

    it("renders plain content blocks", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            filename: null,
            content: [{contentKey: "intro"}],
            renderOptions: {format: "bar"}
        });

        const rendered = render(<Provider store={stubStore}><LetterComponent
            fetchLetter={stubFetchLetter}
            isLoading={false}
            match={{}}
            letter={stubLetter}
        /></Provider>);

        expect(rendered.container.querySelector(".letter-content")).to.not.eql(null);
        expect(rendered.container.textContent).to.contain("Give this a shot and keep reading");
    });
});
