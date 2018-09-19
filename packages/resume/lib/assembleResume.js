import path from "path";
import buildResume from "./buildResume";

export const assembleResume = filePath => {
    const requiredFile = require(filePath);
    const resumeJson = requiredFile.default || requiredFile;

    return buildResume(resumeJson, path.basename(filePath, path.extname(filePath)));
};

export default assembleResume;
