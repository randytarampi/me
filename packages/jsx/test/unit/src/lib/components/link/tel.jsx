const {expect} = require("chai");
const {render, screen} = require("@testing-library/react");
const React = require("react");
const TelLink = require("../../../../../../src/lib/components/link/tel.jsx").default || require("../../../../../../src/lib/components/link/tel.jsx");

describe("TelLink", function () {
    it("renders a tel link", function () {
        render(<TelLink tel="+16045551212"/>);

        const link = screen.getByRole("link", {name: "+16045551212"});

        expect(link.getAttribute("href")).to.eql("tel:+16045551212");
        expect(link.classList.contains("link--tel")).to.eql(true);
    });
});
