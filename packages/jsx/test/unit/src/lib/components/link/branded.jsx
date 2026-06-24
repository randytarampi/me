import {expect} from "chai";
import {render, screen} from "@testing-library/react";
import React from "react";
import BrandedLink, {
    GitHubLink,
    LinkedInLink,
    TwitterLink,
    brandedLinkMap,
    getBrandedLinkForNetwork
} from "../../../../../../src/lib/components/link/branded";

describe("BrandedLink", function () {
    it("maps networks to branded link components", function () {
        expect(getBrandedLinkForNetwork("github")).to.eql(GitHubLink);
        expect(getBrandedLinkForNetwork("TWITTER")).to.eql(TwitterLink);
        expect(getBrandedLinkForNetwork("linkedin")).to.eql(LinkedInLink);
        expect(brandedLinkMap.github).to.eql(GitHubLink);
    });

    it("renders a branded link", function () {
        render(<BrandedLink serviceName="GitHub" serviceType="github" serviceUrl="https://www.github.com" username="octocat"/>);

        const link = screen.getByRole("link", {name: "octocat"});

        expect(link.getAttribute("href")).to.contain("https://www.github.com/octocat");
        expect(link.classList.contains("link--branded")).to.eql(true);
        expect(link.classList.contains("link--github")).to.eql(true);
    });
});
