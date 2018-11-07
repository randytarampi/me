import React from "react";
import {CampaignLink} from "../campaign";

export const UptimeRobotShield = () => <CampaignLink
    className="shield"
    href="https://uptime.randytarampi.ca"
    aria-label="Uptime status"
    name="Uptime">
    <img
        className="shield__image"
        src="https://img.shields.io/uptimerobot/ratio/m780949566-9b1b7cc0bdd3be425a9e6ac8.svg?style=flat-square"
    />
</CampaignLink>;

export default UptimeRobotShield;
