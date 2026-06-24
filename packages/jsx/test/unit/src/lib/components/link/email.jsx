import {expect} from "chai";
import {render, screen} from "@testing-library/react";
import React from "react";
import EmailLink from "../../../../../../src/lib/components/link/email";

describe("EmailLink", function () {
    it("renders a mailto link with body and subject", function () {
        render(<EmailLink email="me@example.com" body="Hello there" subject="Greetings"/>);

        const link = screen.getByRole("link", {name: "me@example.com"});

        expect(link.getAttribute("href")).to.contain("mailto:me@example.com");
        expect(link.getAttribute("href")).to.contain("body=Hello%20there");
        expect(link.getAttribute("href")).to.contain("subject=Greetings");
        expect(link.classList.contains("link--email")).to.eql(true);
    });
});
