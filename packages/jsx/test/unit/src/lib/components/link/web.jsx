const {expect} = require("chai");
const {render, screen} = require("@testing-library/react");
const React = require("react");
const WebLink = require("../../../../../../src/lib/components/link/web.jsx").default || require("../../../../../../src/lib/components/link/web.jsx");

describe("WebLink", function () {
    it("renders a branded web link", function () {
        render(<WebLink href="https://example.com" text="Example"/>);

        const link = screen.getByRole("link", {name: "Example"});

        expect(link.getAttribute("href")).to.contain("https://example.com");
        expect(link.classList.contains("link--web")).to.eql(true);
    });
});
