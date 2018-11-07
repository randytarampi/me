import React from "react";
import {CodeClimateShield} from "./codeClimate";
import {CoverallsShield} from "./coveralls";
import {TravisShield} from "./travis";
import {UptimeRobotShield} from "./uptimeRobot";
import {WebsiteUpDownShield} from "./websiteUpDown";

export * from "./codeClimate";
export * from "./coveralls";
export * from "./travis";
export * from "./uptimeRobot";
export * from "./websiteUpDown";

export const Shields = () => <div className="shields">
    <WebsiteUpDownShield/>
    <UptimeRobotShield/>
    <TravisShield/>
    <CoverallsShield/>
    <CodeClimateShield/>
</div>;

export default Shields;
