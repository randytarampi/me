import {render} from "@testing-library/react";
import {expect} from "chai";
import React from "react";
import App from "../../../../src/public/views/serverApp.jsx";
import Resume from "../../../../src/lib/resume.js";
import resumeJson from "../../../../src/resumes/resume.json";

describe("serverApp", function () {
    it("renders", function () {
        const rendered = render(<App printable={Resume.fromResume(resumeJson)}/>);

        expect(rendered.container.querySelector(".printable.resume")).to.not.eql(null);
    });
});
