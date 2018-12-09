import {expect} from "chai";
import {mount} from "enzyme";
import queryString from "query-string";
import React from "react";
import config from "config";
import CampaignLink from "../../../../../../src/lib/components/link/campaign";
import Link from "../../../../../../src/lib/components/link/link";
import CampaignContext from "../../../../../../src/lib/contexts/campaign";

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
        const rendered = mount(<CampaignLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Link
                className="link--campaign"
                href={`${stubProps.href}?${queryString.stringify({
                    utm_source: stubProps.source,
                    utm_medium: stubProps.medium,
                    utm_campaign: stubProps.name,
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
        const rendered = mount(<CampaignLink {...stubProps}/>);
        const href = `${stubProps.href}?${queryString.stringify({
            utm_source: stubProps.source,
            utm_medium: stubProps.medium,
            utm_campaign: stubProps.name,
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
        const rendered = mount(<CampaignLink {...stubProps}/>);
        const href = `/woof?${queryString.stringify({
            ...queryString.parseUrl(stubProps.href).query,
            utm_source: stubProps.source,
            utm_medium: stubProps.medium,
            utm_campaign: stubProps.name,
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

    it("renders (no CampaignContext)", function () {
        const stubProps = {
            href: "/woof?woof=meow",
            useBranding: false
        };
        const rendered = mount(
            <CampaignContext.Provider value={null}>
                <CampaignLink {...stubProps}/>
            </CampaignContext.Provider>
        );
        const href = `/woof?${queryString.stringify({
            ...queryString.parseUrl(stubProps.href).query,
            utm_source: config.get("me.campaign.source"),
            utm_medium: config.get("me.campaign.medium"),
            utm_campaign: config.get("me.campaign.name"),
            utm_term: config.get("me.campaign.term"),
            utm_content: config.get("me.campaign.content")
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

    it("renders (with CampaignContext)", function () {
        const stubProps = {
            href: "/woof?woof=meow",
            useBranding: false
        };
        const stubContext = {
            source: "woof",
            medium: "meow",
            name: "grr",
            term: "rawr",
            content: "content"
        };
        const rendered = mount(
            <CampaignContext.Provider value={stubContext}>
                <CampaignLink {...stubProps}/>
            </CampaignContext.Provider>
        );
        const href = `/woof?${queryString.stringify({
            ...queryString.parseUrl(stubProps.href).query,
            utm_source: stubContext.source,
            utm_medium: stubContext.medium,
            utm_campaign: stubContext.name,
            utm_term: stubContext.term,
            utm_content: stubContext.content
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
