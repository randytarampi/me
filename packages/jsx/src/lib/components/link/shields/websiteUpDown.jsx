import React from "react";
import {CampaignLink} from "../campaign";

export const WebsiteUpDownShield = () => <CampaignLink
    className="shield"
    href="https://www.randytarampi.ca"
    aria-label="Is www.randytarampi.ca up?"
    name="Up status">
    <img
        className="shield__image"
        src="https://img.shields.io/website-up-down-green-red/https/www.randytarampi.ca.svg?label=www.randytarampi.ca&style=flat-square"
    />
</CampaignLink>;

export default WebsiteUpDownShield;
