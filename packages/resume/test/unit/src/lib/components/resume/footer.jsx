import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeFooter from "../../../../../../src/lib/components/resume/footer";

describe("ResumeFooter", function () {
    it("renders", function () {
        const rendered = shallow(<ResumeFooter resume={{}}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".hide-on-print");
        expect(rendered).to.have.descendants(".hide-on-screen");
    });
});
