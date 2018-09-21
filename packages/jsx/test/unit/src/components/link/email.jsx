import {expect} from "chai";
import {shallow} from "enzyme";
import queryString from "query-string";
import React from "react";
import EmailLink from "../../../../../src/lib/components/link/email";
import Link from "../../../../../src/lib/components/link/link";

describe("EmailLink", function () {
    it("renders (email with branding)", function () {
        const stubProps = {
            email: "woof@randytarampi.ca",
            body: "Woof woof woof",
            subject: "Meow meow meow"
        };
        const rendered = shallow(<EmailLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                className="link--email"
                target="_self"
                email={stubProps.email}
                body={stubProps.body}
                subject={stubProps.subject}
                href={`mailto:${stubProps.email}?${queryString.stringify({
                    body: stubProps.body,
                    subject: stubProps.subject
                })}`}
                text={stubProps.email}
            />
        );
    });

    it("renders (email without branding)", function () {
        const stubProps = {
            email: "woof@randytarampi.ca",
            body: "Woof woof woof",
            subject: "Meow meow meow",
            text: "WOOF",
            useBranding: false
        };
        const rendered = shallow(<EmailLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                className="link--email link--no-branding"
                target="_self"
                body={stubProps.body}
                subject={stubProps.subject}
                href={`mailto:${stubProps.email}?${queryString.stringify({
                    body: stubProps.body,
                    subject: stubProps.subject
                })}`}
                text={stubProps.text}
            />
        );
    });
});
