import {expect} from "chai";
import {shallow} from "enzyme";
import queryString from "query-string";
import React from "react";
import CampaignLink from "../../../../../src/lib/components/link/campaign";
import Link from "../../../../../src/lib/components/link/link";

describe("CampaignLink", function () {
    it("renders (href with branding)", function () {
        const stubProps = {
            href: "/woof",
            text: "WOOF",
            source: "woof",
            medium: "meow",
            name: "grr",
            term: "rawr",
            content: "content"
        };
        const rendered = shallow(<CampaignLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                className="link--campaign"
                href={`${stubProps.href}?${queryString.stringify({
                    utm_source: stubProps.source,
                    utm_medium: stubProps.medium,
                    utm_name: stubProps.name,
                    utm_term: stubProps.term,
                    utm_content: stubProps.content
                })}`}
                text={stubProps.text}
            />
        );
    });

    it("renders (href without branding)", function () {
        const stubProps = {
            href: "/woof",
            source: "woof",
            medium: "meow",
            name: "grr",
            term: "rawr",
            content: "content",
            useBranding: false
        };
        const rendered = shallow(<CampaignLink {...stubProps}/>);
        const href = `${stubProps.href}?${queryString.stringify({
            utm_source: stubProps.source,
            utm_medium: stubProps.medium,
            utm_name: stubProps.name,
            utm_term: stubProps.term,
            utm_content: stubProps.content
        })}`;

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                className="link--campaign link--no-branding"
                href={href}
                text={stubProps.href}
            />
        );
    });

    it("renders (href with query string)", function () {
        const stubProps = {
            href: "/woof?woof=meow",
            source: "woof",
            medium: "meow",
            name: "grr",
            term: "rawr",
            content: "content",
            useBranding: false
        };
        const rendered = shallow(<CampaignLink {...stubProps}/>);
        const href = `/woof?${queryString.stringify({
            ...queryString.parseUrl(stubProps.href).query,
            utm_source: stubProps.source,
            utm_medium: stubProps.medium,
            utm_name: stubProps.name,
            utm_term: stubProps.term,
            utm_content: stubProps.content
        })}`;

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                className="link--campaign link--no-branding"
                href={href}
                text={stubProps.href}
            />
        );
    });
});
