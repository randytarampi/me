import React from "react";
import {CodeQlShield} from "./codeQl.jsx";
import {UptimeRobotShield} from "./uptimeRobot.jsx";
import {WebsiteUpDownShield} from "./websiteUpDown.jsx";

export * from "./codeQl.jsx";
export * from "./npmVersion.jsx";
export * from "./uptimeRobot.jsx";
export * from "./websiteUpDown.jsx";

export const Shields = ({children}) => <div className="shields">
    {children}
    <WebsiteUpDownShield/>
    <UptimeRobotShield/>
    <CodeQlShield/>
</div>;

export default Shields;
