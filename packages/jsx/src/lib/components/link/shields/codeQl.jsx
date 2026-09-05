import React from "react";
import {CampaignLink} from "../campaign.jsx";

export const CodeQlShield = () => <CampaignLink
    className="shield"
    href="https://github.com/randytarampi/me/security/code-scanning"
    aria-label="CodeQL score"
    name="CodeQL">
    <img
        className="shield__image"
        src="https://img.shields.io/github/actions/workflow/status/randytarampi/me/codeql.yml?branch=main&style=flat-square&label=CodeQL"
    />
</CampaignLink>;

export default CodeQlShield;
