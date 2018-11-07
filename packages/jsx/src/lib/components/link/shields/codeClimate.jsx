import React from "react";
import {CampaignLink} from "../campaign";

export const CodeClimateShield = () => <CampaignLink
    className="shield"
    href="https://codeclimate.com/github/randytarampi/me/maintainability"
    aria-label="Code Climate score"
    name="Code Climate">
    <img
        className="shield__image"
        src="https://img.shields.io/codeclimate/maintainability-percentage/randytarampi/me.svg?style=flat-square"
    />
</CampaignLink>;

export default CodeClimateShield;
