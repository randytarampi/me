import {expect} from "chai";
import {render} from "@testing-library/react";
import {Map} from "immutable";
import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import sinon from "sinon";
import {thunk} from "redux-thunk";
import ConnectedResume from "../../../../../src/lib/containers/resume.jsx";
import Resume from "../../../../../src/lib/resume.js";
import testResumeJson from "../../../../../src/resumes/some-awesome-company.json";

describe("ConnectedResume", function () {
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

    it("renders the resume and fetches the requested variant", function () {
        const rendered = render(<Provider store={stubStore}><ConnectedResume
            fetchResume={stubFetchResume}
            match={{params: {variant: "woof"}}}
            resume={stubResume}
        /></Provider>);

        expect(rendered.container.querySelector(".printable.resume")).to.not.eql(null);
    });
});
