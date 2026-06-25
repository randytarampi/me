import {
    ErrorENOACCESSContentComponent,
    ErrorESERVERContentComponent,
    LoadingSpinner,
    mapErrorCodeToErrorContentComponent as defaultMapErrorCodeToErrorContent
} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {render} from "@testing-library/react";
import {Map} from "immutable";
import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import sinon from "sinon";
import {thunk} from "redux-thunk";
import {mapResumeErrorCodeToErrorContentComponent, ResumeComponent} from "../../../../../../src/lib/components/resume/index.jsx";
import Resume from "../../../../../../src/lib/resume.js";
import testResumeJson from "../../../../../../src/resumes/some-awesome-company.json";

describe("ResumeComponent", function () {
    let stubResume;
    let stubFetchResume;
    let stubStore;

    beforeEach(function () {
        stubResume = Resume.fromResume(testResumeJson);
        stubFetchResume = sinon.stub();
        stubStore = configureStore([thunk])(Map({
            api: Map(),
            emoji: Map(),
            error: Map(),
            resume: Map(),
            ui: Map()
        }));
    });

    it("maps resume error codes", function () {
        expect(mapResumeErrorCodeToErrorContentComponent("EFETCH")).to.eql(ErrorESERVERContentComponent);
        expect(mapResumeErrorCodeToErrorContentComponent("ESERVER")).to.eql(ErrorESERVERContentComponent);
        expect(mapResumeErrorCodeToErrorContentComponent("ENORESUME")).to.eql(ErrorENOACCESSContentComponent);
        expect(mapResumeErrorCodeToErrorContentComponent()).to.eql(defaultMapErrorCodeToErrorContent());
    });

    it("renders a loading spinner when loading", function () {
        const rendered = render(<Provider store={stubStore}><ResumeComponent
            fetchResume={stubFetchResume}
            isLoading={true}
            match={{}}
            resume={stubResume}
        /></Provider>);

        expect(rendered.container.querySelector(".loading-spinner")).to.not.eql(null);
    });

    it("renders resume content", function () {
        const rendered = render(<Provider store={stubStore}><ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        /></Provider>);

        expect(rendered.container.querySelector(".printable.resume")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-content")).to.not.eql(null);
        expect(rendered.container.textContent).to.contain(stubResume.basics.name);
    });

    it("calls fetchResume for a variant", function () {
        render(<Provider store={stubStore}><ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
            variant="woof"
        /></Provider>);

        expect(stubFetchResume.calledOnce).to.eql(true);
        sinon.assert.calledWith(stubFetchResume, "woof");
    });
});
