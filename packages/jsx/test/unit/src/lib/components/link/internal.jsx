import {expect} from "chai";
import {fireEvent, render, screen} from "@testing-library/react";
import {Map} from "immutable";
import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import sinon from "sinon";
import {thunk} from "redux-thunk";
import {
    BlogAppLink,
    CodeAppLink,
    InternalLink as InternalLinkComponent,
    PhotosAppLink,
    ResumeAppLink,
    WordsAppLink
} from "../../../../../../src/lib/components/link/internal";

describe("InternalLink", function () {
    let mockStore;
    let store;

    beforeEach(function () {
        mockStore = configureStore([thunk]);
        store = mockStore(Map());
    });

    it("dispatches navigation when clicked", function () {
        const onClick = sinon.stub();

        render(<Provider store={store}><InternalLinkComponent href="/foo" serviceName="Foo" onClick={onClick}/></Provider>);

        const link = screen.getByRole("link", {name: "Foo"});

        fireEvent.click(link);

        expect(store.getActions().length).to.eql(1);
        expect(onClick.calledOnce).to.eql(true);
        expect(link.getAttribute("href")).to.eql("/foo");
        expect(link.classList.contains("link--internal")).to.eql(true);
        expect(link.getAttribute("target")).to.eql("_self");
    });

    [
        [BlogAppLink, "Blog", "link--blog"],
        [CodeAppLink, "Code", "link--code"],
        [PhotosAppLink, "Photos", "link--photos"],
        [ResumeAppLink, "Resume", "link--resume"],
        [WordsAppLink, "Words", "link--words"]
    ].forEach(([Component, name, className]) => {
        it(`renders ${name} app link`, function () {
            render(<Provider store={store}><Component/></Provider>);

            const link = screen.getByRole("link", {name});

            expect(link.classList.contains(className)).to.eql(true);
            expect(link.getAttribute("target")).to.eql("_self");
        });
    });
});
