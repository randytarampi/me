import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeFooter from "../../../../../../src/lib/components/resume/footer";

describe("ResumeFooter", function () {
    it("renders", function () {
        const rendered = render(<ResumeFooter resume={{}}/>);

        expect(rendered.container.querySelector(".hide-on-print")).to.not.eql(null);
    });
});
