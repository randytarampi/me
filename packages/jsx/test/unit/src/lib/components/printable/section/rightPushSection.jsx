import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import RightPushSection from "../../../../../../../src/lib/components/printable/section/rightPushSection";

describe("RightPushSection", function () {
    it("renders", function () {
        const stubSideContent = "Meow";
        const stubProps = {
            printableType: "woof",
            type: "grr",
            className: "meow",
            sideContent: stubSideContent
        };
        const stubChildren = <span className="Woof">Woof woof woof</span>;
        const rendered = shallow(<RightPushSection {...stubProps}>{stubChildren}</RightPushSection>);

        expect(rendered).to.have.prop("className", "printable-section--push printable-section--push-right meow");
        expect(rendered).to.have.descendants(".printable-section__header");
        expect(rendered).to.not.have.descendants(".printable-section__header > .printable-section__label");
        expect(rendered).to.not.have.descendants(".printable-section__header .printable-section__description");
        expect(rendered).to.have.descendants(".printable-section__content");
        expect(rendered).to.have.descendants(".printable-section__header + .printable-section__content");
        expect(rendered).to.contain(stubChildren);
        expect(rendered).to.contain(stubSideContent);
    });
});
