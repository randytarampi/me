import React from "react";
import {CodeClimateShield} from "./codeClimate";
import {UptimeRobotShield} from "./uptimeRobot";
import {WebsiteUpDownShield} from "./websiteUpDown";

export * from "./codeClimate";
export * from "./npmVersion";
export * from "./uptimeRobot";
export * from "./websiteUpDown";

export const Shields = ({children}) => <div className="shields">
    {children}
    <WebsiteUpDownShield/>
    <UptimeRobotShield/>
    <CodeClimateShield/>
</div>;

export default Shields;
