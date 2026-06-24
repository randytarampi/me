import {expect} from "chai";
import {render, screen} from "@testing-library/react";
import React from "react";
import WebLink from "../../../../../../src/lib/components/link/web";

describe("WebLink", function () {
    it("renders a branded web link", function () {
        render(<WebLink href="https://example.com" text="Example"/>);

        const link = screen.getByRole("link", {name: "Example"});

        expect(link.getAttribute("href")).to.contain("https://example.com");
        expect(link.classList.contains("link--web")).to.eql(true);
    });
});
