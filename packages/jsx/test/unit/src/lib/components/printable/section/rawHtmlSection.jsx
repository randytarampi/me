import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import RawHtmlSection from "../../../../../../../src/lib/components/printable/section/rawHtmlSection";

describe("RawHtmlSection", function () {
    it("renders", function () {
        const stubSideContent = "Meow";
        const stubProps = {
            printableType: "woof",
            type: "grr",
            className: "meow",
            sideContent: stubSideContent
        };
        const stubChildren = <span className="Woof">Woof woof woof</span>;
        const rendered = shallow(<RawHtmlSection {...stubProps}>{stubChildren}</RawHtmlSection>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.prop("className", "printable-section__raw-html meow");
        expect(rendered).to.not.have.descendants(".printable-section__header");
        expect(rendered).to.not.have.descendants(".printable-section__header > .printable-section__label");
        expect(rendered).to.not.have.descendants(".printable-section__header .printable-section__description");
        expect(rendered).to.have.descendants(".printable-section__content");
        expect(rendered).to.not.contain(stubChildren);
        expect(rendered).to.not.contain(stubSideContent);
    });
});
