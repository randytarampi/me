import React from "react";
import {CampaignLink} from "../campaign";

export const CoverallsShield = () => <CampaignLink
    className="shield"
    href="https://coveralls.io/github/randytarampi/me"
    aria-label="Coveralls score"
    name="Coveralls">
    <img
        className="shield__image"
        src="https://img.shields.io/coveralls/github/randytarampi/me.svg?style=flat-square"
    />
</CampaignLink>;

export default CoverallsShield;
