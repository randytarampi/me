import {expect} from "chai";
import {render, screen} from "@testing-library/react";
import React from "react";
import TelLink from "../../../../../../src/lib/components/link/tel";

describe("TelLink", function () {
    it("renders a tel link", function () {
        render(<TelLink tel="+16045551212"/>);

        const link = screen.getByRole("link", {name: "+16045551212"});

        expect(link.getAttribute("href")).to.eql("tel:+16045551212");
        expect(link.classList.contains("link--tel")).to.eql(true);
    });
});
