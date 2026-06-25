import React from "react";
import {CodeClimateShield} from "./codeClimate.jsx";
import {UptimeRobotShield} from "./uptimeRobot.jsx";
import {WebsiteUpDownShield} from "./websiteUpDown.jsx";

export * from "./codeClimate.jsx";
export * from "./npmVersion.jsx";
export * from "./uptimeRobot.jsx";
export * from "./websiteUpDown.jsx";

export const Shields = ({children}) => <div className="shields">
    {children}
    <WebsiteUpDownShield/>
    <UptimeRobotShield/>
    <CodeClimateShield/>
</div>;

export default Shields;
