import * as api from "@randy.tarampi/jsx/src/lib/data/api";
import {shallow} from "@randy.tarampi/jsx/test";
import {expect} from "chai";
import {Map} from "immutable";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import * as fetchResume from "../../../../../src/lib/actions/fetchResume";
import {ConnectedResume} from "../../../../../src/lib/containers/resume";
import Resume from "../../../../../src/lib/resume";
import selectors from "../../../../../src/lib/data/selectors";

describe("ConnectedResume", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubResume;
    let stubIsLoadingUrl;
    let stubIsLoadingUrlSelector;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);

        stubResume = Resume.fromJSON({woof: true});
        sinon.stub(selectors, "getResumeVariant").returns(stubResume);
        sinon.stub(fetchResume, "fetchResumeCreator").returns({type: "MEOW"});
        stubIsLoadingUrl = false;
        stubIsLoadingUrlSelector = sinon.stub().returns(stubIsLoadingUrl);
        sinon.stub(api, "createIsLoadingUrlSelector").returns(stubIsLoadingUrlSelector);
    });

    afterEach(function () {
        selectors.getResumeVariant.restore();
        fetchResume.fetchResumeCreator.restore();
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

        const rendered = shallow(stubStore)(<ConnectedResume {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("resume", stubResume);
        expect(rendered).to.have.prop("isLoading", stubIsLoadingUrl);
        expect(rendered).to.have.prop("variant", "resume");
        expect(rendered).to.have.prop("fetchResume");

        expect(fetchResume.fetchResumeCreator.notCalled).to.eql(true);
    });

    it("receives a Resume", function () {
        stubResume = Resume.fromJSON({id: "meh"});

        const stubProps = {
            match: {
                params: {
                    variant: "rawr"
                }
            },
            resume: stubResume
        };

        const rendered = shallow(stubStore)(<ConnectedResume {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("resume", stubResume);
        expect(rendered).to.have.prop("isLoading", stubIsLoadingUrl);
        expect(rendered).to.have.prop("variant", "rawr");
        expect(rendered).to.have.prop("fetchResume");

        expect(fetchResume.fetchResumeCreator.notCalled).to.eql(true);
    });

    it("receives a Resume and pulls its `customContent`", function () {
        stubResume = Resume.fromJSON({id: "meh", customContent: "foo"});

        const stubProps = {
            match: {
                params: {
                    variant: "rawr"
                }
            },
            resume: stubResume
        };

        const rendered = shallow(stubStore)(<ConnectedResume {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("resume", stubResume);
        expect(rendered).to.have.prop("isLoading", stubIsLoadingUrl);
        expect(rendered).to.have.prop("variant", "rawr");
        expect(rendered).to.have.prop("fetchResume");

        expect(fetchResume.fetchResumeCreator.notCalled).to.eql(true);
    });

    it("dispatches `fetchResumeCreator` properly", function () {
        const stubProps = {
            match: {
                params: {
                    grr: "rawr"
                }
            }
        };

        const rendered = shallow(stubStore)(<ConnectedResume {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.have.prop("resume", stubResume);
        expect(rendered).to.have.prop("isLoading", stubIsLoadingUrl);
        expect(rendered).to.have.prop("variant", "resume");
        expect(rendered).to.have.prop("fetchResume");

        expect(fetchResume.fetchResumeCreator.notCalled).to.eql(true);

        const mappedFetchResume = rendered.prop("fetchResume");

        mappedFetchResume(rendered.prop("variant"));

        expect(fetchResume.fetchResumeCreator.calledOnce).to.eql(true);
        sinon.assert.calledWith(fetchResume.fetchResumeCreator, rendered.prop("variant"));
    });
});
