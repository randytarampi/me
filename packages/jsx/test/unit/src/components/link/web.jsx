import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import Link from "../../../../../src/lib/components/link/link";
import WebLink from "../../../../../src/lib/components/link/web";

describe("WebLink", function () {
    it("renders (href with branding)", function () {
        const stubProps = {
            href: "/woof",
            text: "WOOF"
        };
        const rendered = shallow(<WebLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                className="link--web"
                href={stubProps.href}
                text={stubProps.text}
            />
        );
    });

    it("renders (href without branding)", function () {
        const stubProps = {
            href: "/woof",
            text: "WOOF",
            useBranding: false
        };
        const rendered = shallow(<WebLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                className="link--web link--no-branding"
                tel={stubProps.tel}
                href={stubProps.href}
                text={stubProps.text}
            />
        );
    });
});
