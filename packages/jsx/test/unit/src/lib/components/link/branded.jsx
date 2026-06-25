const {expect} = require("chai");
const {render, screen} = require("@testing-library/react");
const React = require("react");
const BrandedLink = require("../../../../../../src/lib/components/link/branded/index.jsx").default || require("../../../../../../src/lib/components/link/branded/index.jsx");
const {
    GitHubLink,
    LinkedInLink,
    TwitterLink,
    brandedLinkMap,
    getBrandedLinkForNetwork
} = require("../../../../../../src/lib/components/link/branded/index.jsx");

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
