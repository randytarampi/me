import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import BrandedLink, * as brandedLinks from "../../../../../../src/lib/components/link/branded";
import CampaignLink from "../../../../../../src/lib/components/link/campaign";

describe("BrandedLink", function () {
    it("renders (href with branding)", function () {
        const stubProps = {
            serviceUrl: "woof",
            username: "meow",
            serviceType: "grr"
        };
        const rendered = shallow(<BrandedLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <CampaignLink
                href={`${stubProps.serviceUrl}/${stubProps.username}`}
                text={stubProps.username}
                className={`link--branded link--${stubProps.serviceType}`}
            />
        );
    });

    it("renders (href without branding)", function () {
        const stubProps = {
            serviceUrl: "woof",
            username: "meow",
            serviceType: "grr",
            useBranding: false
        };
        const rendered = shallow(<BrandedLink {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <CampaignLink
                href={`${stubProps.serviceUrl}/${stubProps.username}`}
                text={stubProps.username}
                className={`link--branded link--${stubProps.serviceType} link--no-branding`}
            />
        );
    });

    Object.keys(brandedLinks)
        .filter(key => !["default", "BrandedLink", "brandedLinkMap", "getBrandedLinkForNetwork"].includes(key))
        .forEach(key => {
        describe(key, function () {
            it("renders", function () {
                const stubProps = {
                    username: "meow"
                };
                const specificBrandedLink = brandedLinks[key];
                const rendered = shallow(specificBrandedLink(stubProps));

                expect(rendered).to.be.ok;
                expect(rendered).to.have.length(1);

                const campaignLink = rendered;
                expect(campaignLink).to.be.ok;
                expect(campaignLink).to.have.length(1);
                expect(campaignLink).to.have.prop("text", stubProps.username);
                expect(campaignLink).to.have.prop("href");
                expect(campaignLink.prop("href")).to.contain(stubProps.username);
            });
        });
    });
});
