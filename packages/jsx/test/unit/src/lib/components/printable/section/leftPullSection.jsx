import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import LeftPullSection from "../../../../../../../src/lib/components/printable/section/leftPullSection";

describe("LeftPullSection", function () {
    it("renders", function () {
        const stubSideContent = "Meow";
        const stubProps = {
            printableType: "woof",
            type: "grr",
            className: "meow",
            sideContent: stubSideContent
        };
        const stubChildren = <span className="Woof">Woof woof woof</span>;
        const rendered = shallow(<LeftPullSection {...stubProps}>{stubChildren}</LeftPullSection>);

        expect(rendered).to.have.prop("className", "printable-section--pull printable-section--pull-left meow");
        expect(rendered).to.have.descendants(".printable-section__content");
        expect(rendered).to.have.descendants(".printable-section__content + .printable-section__footer");
        expect(rendered).to.have.descendants(".printable-section__footer");
        expect(rendered).to.not.have.descendants(".printable-section__footer > .printable-section__label");
        expect(rendered).to.not.have.descendants(".printable-section__footer .printable-section__description");
        expect(rendered).to.contain(stubChildren);
        expect(rendered).to.contain(stubSideContent);
    });
});
