import {expect} from "chai";
import {render, screen} from "@testing-library/react";
import React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import CampaignLink from "../../../../../../src/lib/components/link/campaign";

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
