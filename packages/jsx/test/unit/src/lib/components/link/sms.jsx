import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import Link from "../../../../../../src/lib/components/link/link";
import SmsLink from "../../../../../../src/lib/components/link/sms";

describe("SmsLink", function () {
    it("renders (tel with branding)", function () {
        const stubProps = {
            tel: "+16043747128",
            body: "Woof woof woof",
            text: "WOOF"
        };
        const rendered = shallow(<SmsLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                className="link--sms"
                tel={stubProps.tel}
                body={stubProps.body}
                href={`sms:${stubProps.tel};?&body=${encodeURIComponent(stubProps.body)}`}
                text={stubProps.text}
            />
        );
    });

    it("renders (tel without branding)", function () {
        const stubProps = {
            tel: "+16043747128",
            body: "Woof woof woof",
            text: "WOOF",
            useBranding: false
        };
        const rendered = shallow(<SmsLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                className="link--sms link--no-branding"
                tel={stubProps.tel}
                body={stubProps.body}
                href={`sms:${stubProps.tel};?&body=${encodeURIComponent(stubProps.body)}`}
                text={stubProps.text}
            />
        );
    });
});
