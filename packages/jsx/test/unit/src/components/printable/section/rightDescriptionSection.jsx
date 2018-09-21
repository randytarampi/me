import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import RightDescriptionSection from "../../../../../../src/lib/components/printable/section/rightDescriptionSection";

describe("RightDescriptionSection", function () {
    it("renders", function () {
        const stubLabel = "Meow";
        const stubDescription = "Grr";
        const stubProps = {
            printableType: "woof",
            type: "grr",
            className: "meow",
            label: stubLabel,
            description: stubDescription
        };
        const stubChildren = <span className="Woof">Woof woof woof</span>;
        const rendered = shallow(<RightDescriptionSection {...stubProps}>{stubChildren}</RightDescriptionSection>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.prop("className", "printable-section--description printable-section--description-right meow");
        expect(rendered).to.have.descendants(".printable-section__content");
        expect(rendered).to.have.descendants(".printable-section__content + .printable-section__header");
        expect(rendered).to.have.descendants(".printable-section__header");
        expect(rendered).to.have.descendants(".printable-section__header > .printable-section__label");
        expect(rendered).to.have.descendants(".printable-section__header .printable-section__description");
        expect(rendered).to.contain(stubChildren);
        expect(rendered).to.contain(stubLabel);
        expect(rendered).to.contain(stubDescription);
    });

    it("renders (no `description` or `label`)", function () {
        const stubLabel = null;
        const stubDescription = null;
        const stubProps = {
            printableType: "woof",
            type: "grr",
            className: "meow",
            label: stubLabel,
            description: stubDescription
        };
        const stubChildren = <span className="Woof">Woof woof woof</span>;
        const rendered = shallow(<RightDescriptionSection {...stubProps}>{stubChildren}</RightDescriptionSection>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".printable-section__header");
        expect(rendered).to.not.have.descendants(".printable-section__header > .printable-section__label");
        expect(rendered).to.not.have.descendants(".printable-section__header .printable-section__description");
        expect(rendered).to.have.descendants(".printable-section__content");
        expect(rendered).to.contain(stubChildren);
    });

    it("renders (`descriptionNode` and `labelNode`)", function () {
        const stubLabelNode = <span className="Meow">Meow meow meow</span>;
        const stubDescriptionNode = <span className="Grr">Grr grr grr</span>;
        const stubProps = {
            printableType: "woof",
            type: "grr",
            className: "meow",
            labelNode: stubLabelNode,
            descriptionNode: stubDescriptionNode
        };
        const stubChildren = <span className="Woof">Woof woof woof</span>;
        const rendered = shallow(<RightDescriptionSection {...stubProps}>{stubChildren}</RightDescriptionSection>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".printable-section__header");
        expect(rendered).to.not.have.descendants(".printable-section__header > .printable-section__label");
        expect(rendered).to.have.descendants(".printable-section__header .printable-section__description");
        expect(rendered).to.have.descendants(".printable-section__content");
        expect(rendered).to.contain(stubChildren);
        expect(rendered).to.contain(stubLabelNode);
        expect(rendered).to.contain(stubDescriptionNode);
    });
});
