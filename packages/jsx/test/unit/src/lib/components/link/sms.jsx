import {expect} from "chai";
import {render, screen} from "@testing-library/react";
import React from "react";
import SmsLink from "../../../../../../src/lib/components/link/sms";

describe("SmsLink", function () {
    it("renders an sms link", function () {
        render(<SmsLink tel="+16045551212" body="Ping me"/>);

        const link = screen.getByRole("link", {name: "+16045551212"});

        expect(link.getAttribute("href")).to.eql("sms:+16045551212;?&body=Ping%20me");
        expect(link.classList.contains("link--sms")).to.eql(true);
    });
});
