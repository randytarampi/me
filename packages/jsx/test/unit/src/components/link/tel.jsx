import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import Link from "../../../../../src/lib/components/link/link";
import TelLink from "../../../../../src/lib/components/link/tel";

describe("TelLink", function () {
    it("renders (tel with branding)", function () {
        const stubProps = {
            tel: "+16043747128",
            body: "Woof woof woof",
            text: "WOOF"
        };
        const rendered = shallow(<TelLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                className="link--tel"
                tel={stubProps.tel}
                body={stubProps.body}
                href={`tel:${stubProps.tel}`}
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
        const rendered = shallow(<TelLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                className="link--tel link--no-branding"
                tel={stubProps.tel}
                body={stubProps.body}
                href={`tel:${stubProps.tel}`}
                text={stubProps.text}
            />
        );
    });
});
