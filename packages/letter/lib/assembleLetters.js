import fs from "fs";
import assembleLetter from "./assembleLetter";

export const assembleLetters = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(`${__dirname}/../letters`, (error, files) => {
            if (error) {
                return reject(error);
            }
            resolve(files);
        });
    })
        .then(letters => Promise.all(letters.map(assembleLetter)));
};

export default assembleLetters;
