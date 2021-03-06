import React from "react";
import {CampaignLink} from "../campaign";

export const TravisShield = () => <CampaignLink
    className="shield"
    href="https://travis-ci.com/randytarampi/me"
    aria-label="Travis build"
    name="Travis">
    <img
        className="shield__image"
        src="https://img.shields.io/travis/com/randytarampi/me.svg?style=flat-square"
    />
</CampaignLink>;

export default TravisShield;
