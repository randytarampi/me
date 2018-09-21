import * as api from "@randy.tarampi/jsx/src/lib/data/api";
import {shallow} from "@randy.tarampi/jsx/test";
import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import * as fetchLetter from "../../../../lib/actions/fetchLetter";
import {ConnectedLetter} from "../../../../lib/containers/letter";
import selectors from "../../../../lib/data/selectors";

describe("ConnectedLetter", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubLetter;
    let stubIsLoadingUrl;
    let stubIsLoadingUrlSelector;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);

        stubLetter = {woof: true};
        sinon.stub(selectors, "getLetterVariant").returns(stubLetter);
        sinon.stub(fetchLetter, "fetchLetterCreator").returns({type: "MEOW"});
        stubIsLoadingUrl = false;
        stubIsLoadingUrlSelector = sinon.stub().returns(stubIsLoadingUrl);
        sinon.stub(api, "createIsLoadingUrlSelector").returns(stubIsLoadingUrlSelector);
    });

    afterEach(function () {
        selectors.getLetterVariant.restore();
        fetchLetter.fetchLetterCreator.restore();
        api.createIsLoadingUrlSelector.restore();
    });

    it("receives default props", function () {
        const stubProps = {
            match: {
                params: {
                    grr: "rawr"
                }
            }
        };

        const rendered = shallow(stubStore)(<ConnectedLetter {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("letter", stubLetter);
        expect(rendered).to.have.prop("isLoading", stubIsLoadingUrl);
        expect(rendered).to.have.prop("variant", "default");
        expect(rendered).to.have.prop("fetchLetter");

        expect(fetchLetter.fetchLetterCreator.notCalled).to.eql(true);
    });

    it("dispatches `fetchLetterCreator` properly", function () {
        const stubProps = {
            match: {
                params: {
                    grr: "rawr"
                }
            }
        };

        const rendered = shallow(stubStore)(<ConnectedLetter {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("letter", stubLetter);
        expect(rendered).to.have.prop("isLoading", stubIsLoadingUrl);
        expect(rendered).to.have.prop("variant", "default");
        expect(rendered).to.have.prop("fetchLetter");

        expect(fetchLetter.fetchLetterCreator.notCalled).to.eql(true);

        const mappedFetchLetter = rendered.prop("fetchLetter");

        mappedFetchLetter(rendered.prop("variant"));

        expect(fetchLetter.fetchLetterCreator.calledOnce).to.eql(true);
        sinon.assert.calledWith(fetchLetter.fetchLetterCreator, rendered.prop("variant"));
    });
});
