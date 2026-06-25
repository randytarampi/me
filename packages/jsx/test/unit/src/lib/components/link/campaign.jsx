const {expect} = require("chai");
const {render, screen} = require("@testing-library/react");
const React = require("react");
const configureStore = require("redux-mock-store");
const {Provider} = require("react-redux");
const CampaignLink = require("../../../../../../src/lib/components/link/campaign.jsx").default || require("../../../../../../src/lib/components/link/campaign.jsx");

describe("CampaignLink", function () {
    it("renders same-origin links as internal links", function () {
        const store = configureStore([])({});

        render(
            <Provider store={store}>
                <CampaignLink href={`${window.location.origin}/campaign/path`} text="Campaign"/>
            </Provider>
        );

        const link = screen.getByRole("link", {name: "Campaign"});

        expect(link.getAttribute("href")).to.eql("/campaign/path");
        expect(link.classList.contains("link--campaign")).to.eql(true);
    });
});
