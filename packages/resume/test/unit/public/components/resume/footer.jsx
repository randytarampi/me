import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import ResumeFooter from "../../../../../public/components/resume/footer";

describe("ResumeFooter", function () {
    it("renders", function () {
        const rendered = shallow(<ResumeFooter resume={{}}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".hide-on-print");
        expect(rendered).to.have.descendants(".hide-on-screen");
    });
});
