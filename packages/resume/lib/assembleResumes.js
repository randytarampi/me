import fs from "fs";
import path from "path";
import {assembleResume} from "./assembleResume";

export const assembleResumes = (resumesDirectory = `${__dirname}/../resumes`) => {
    return new Promise((resolve, reject) => {
        fs.readdir(resumesDirectory, (error, files) => {
            if (error) {
                return reject(error);
            }
            resolve(files.map(file => path.join(resumesDirectory, file)));
        });
    })
        .then(resumes => Promise.all(resumes.map(assembleResume)));
};

export default assembleResumes;
