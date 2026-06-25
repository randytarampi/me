const {expect} = require("chai");
const {render, screen} = require("@testing-library/react");
const React = require("react");
const SmsLink = require("../../../../../../src/lib/components/link/sms.jsx").default || require("../../../../../../src/lib/components/link/sms.jsx");

describe("SmsLink", function () {
    it("renders an sms link", function () {
        render(<SmsLink tel="+16045551212" body="Ping me"/>);

        const link = screen.getByRole("link", {name: "+16045551212"});

        expect(link.getAttribute("href")).to.eql("sms:+16045551212;?&body=Ping%20me");
        expect(link.classList.contains("link--sms")).to.eql(true);
    });
});
