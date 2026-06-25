const {expect} = require("chai");
const {render} = require("@testing-library/react");
const React = require("react");
const RawHtmlSection = require("../../../../../../../src/lib/components/printable/section/rawHtmlSection.jsx").default || require("../../../../../../../src/lib/components/printable/section/rawHtmlSection.jsx");

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
        const rendered = render(<RawHtmlSection {...stubProps}>{stubChildren}</RawHtmlSection>);

        expect(rendered.container.firstElementChild?.classList.contains("printable-section__raw-html")).to.eql(true);
        expect(rendered.container.firstElementChild?.classList.contains("meow")).to.eql(true);
        expect(rendered.container.querySelector(".printable-section__header")).to.eql(null);
        expect(rendered.container.querySelector(".printable-section__header > .printable-section__label")).to.eql(null);
        expect(rendered.container.querySelector(".printable-section__header .printable-section__description")).to.eql(null);
        expect(rendered.container.querySelector(".printable-section__content")).to.not.eql(null);
        expect(rendered.container.innerHTML).to.not.contain("Woof woof woof");
        expect(rendered.container.textContent).to.not.contain(stubSideContent);
    });
});
