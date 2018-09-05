import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import SectionWrapper from "../../../../../lib/components/printable/section/sectionWrapper";

describe("SectionWrapper", function () {
    it("renders", function () {
        const stubProps = {
            printableType: "woof",
            type: "grr",
            hideOnPrint: true,
            showOnLetter: true,
            showOnA4: true,
            showOnLegal: true,
            hideOnScreen: true,
            verticallyAlignContent: true,
            className: "meow"
        };
        const stubChildren = <span className="Woof">Woof woof woof</span>;
        const rendered = shallow(<SectionWrapper {...stubProps}>{stubChildren}</SectionWrapper>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.type);
        expect(rendered).to.have.className(stubProps.className);
        expect(rendered).to.have.className("printable-section");
        expect(rendered).to.have.className(`printable-${stubProps.type}`);
        expect(rendered).to.have.className(`${stubProps.printableType}-${stubProps.type}`);
        expect(rendered).to.have.className("hide-on-screen");
        expect(rendered).to.have.className("show-on-a4");
        expect(rendered).to.have.className("show-on-letter");
        expect(rendered).to.have.className("show-on-legal");
        expect(rendered).to.not.have.className("hide-on-print");
        expect(rendered).to.have.descendants(".valign-wrapper");
        expect(rendered).to.contain(stubChildren);
    });

    it("renders (hidden on print)", function () {
        const stubProps = {
            printableType: "woof",
            type: "grr",
            hideOnPrint: true,
            verticallyAlignContent: true,
            className: "meow"
        };
        const stubChildren = <span className="Woof">Woof woof woof</span>;
        const rendered = shallow(<SectionWrapper {...stubProps}>{stubChildren}</SectionWrapper>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.type);
        expect(rendered).to.have.className(stubProps.className);
        expect(rendered).to.have.className("printable-section");
        expect(rendered).to.have.className(`printable-${stubProps.type}`);
        expect(rendered).to.have.className(`${stubProps.printableType}-${stubProps.type}`);
        expect(rendered).to.not.have.className("hide-on-screen");
        expect(rendered).to.not.have.className("show-on-a4");
        expect(rendered).to.not.have.className("show-on-letter");
        expect(rendered).to.not.have.className("show-on-legal");
        expect(rendered).to.have.className("hide-on-print");
        expect(rendered).to.have.descendants(".valign-wrapper");
        expect(rendered).to.contain(stubChildren);
    });

    it("renders (hidden on screen)", function () {
        const stubProps = {
            printableType: "woof",
            type: "grr",
            hideOnScreen: true,
            verticallyAlignContent: true,
            className: "meow"
        };
        const stubChildren = <span className="Woof">Woof woof woof</span>;
        const rendered = shallow(<SectionWrapper {...stubProps}>{stubChildren}</SectionWrapper>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.type);
        expect(rendered).to.have.className(stubProps.className);
        expect(rendered).to.have.className("printable-section");
        expect(rendered).to.have.className(`printable-${stubProps.type}`);
        expect(rendered).to.have.className(`${stubProps.printableType}-${stubProps.type}`);
        expect(rendered).to.have.className("hide-on-screen");
        expect(rendered).to.not.have.className("hide-on-print");
        expect(rendered).to.have.descendants(".valign-wrapper");
        expect(rendered).to.contain(stubChildren);
    });

    it("renders (not vertically aligned)", function () {
        const stubProps = {
            printableType: "woof",
            type: "grr",
            hideOnScreen: true,
            verticallyAlignContent: false,
            className: "meow"
        };
        const stubChildren = <span className="Woof">Woof woof woof</span>;
        const rendered = shallow(<SectionWrapper {...stubProps}>{stubChildren}</SectionWrapper>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.id(stubProps.type);
        expect(rendered).to.have.className(stubProps.className);
        expect(rendered).to.have.className("printable-section");
        expect(rendered).to.have.className(`printable-${stubProps.type}`);
        expect(rendered).to.have.className(`${stubProps.printableType}-${stubProps.type}`);
        expect(rendered).to.have.className("hide-on-screen");
        expect(rendered).to.not.have.className("hide-on-print");
        expect(rendered).to.not.have.descendants(".valign-wrapper");
        expect(rendered).to.contain(stubChildren);
    });
});
