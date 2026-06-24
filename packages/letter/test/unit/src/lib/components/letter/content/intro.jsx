import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import {Provider} from "react-redux";
import {render} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";
import LetterIntro from "../../../../../../../src/lib/components/letter/content/intro";
import LetterSection from "../../../../../../../src/lib/letterSection";

describe("LetterIntro", function () {
    let stubContentConfiguration;
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "intro"
        });
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map({emoji: Map()});
        stubStore = mockStore(stubInitialState);
    });

    it("renders (default content)", function () {
        const rendered = render(<Provider store={stubStore}><LetterIntro contentConfiguration={stubContentConfiguration}/></Provider>);

        expect(rendered.container.querySelectorAll(".letter-intro__content").length).to.eql(2);
        expect(rendered.container.querySelectorAll(".letter-intro__content")[0]?.textContent).to.match(/I hope this letter finds you well./);
        expect(rendered.container.querySelectorAll(".letter-intro__content")[1]?.textContent).to.match(/Give this a shot and keep reading/);
    });

    it("renders (custom content)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                intro: <span className="Woof">Woof woof woof</span>
            }
        });

        const rendered = render(<Provider store={stubStore}><LetterIntro contentConfiguration={stubContentConfiguration}/></Provider>);

        expect(rendered.container.querySelectorAll(".letter-intro__content").length).to.eql(2);
        expect(rendered.container.querySelector(".letter-intro__content")?.textContent).to.contain("Woof woof woof");
        expect(rendered.container.querySelectorAll(".letter-intro__content")[1]?.textContent).to.match(/Give this a shot and keep reading/);
    });
});
