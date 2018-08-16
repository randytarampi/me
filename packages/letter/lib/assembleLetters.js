import fs from "fs";
import path from "path";
import assembleLetter from "./assembleLetter";

export const assembleLetters = (lettersDirectory = `${__dirname}/../letters`) => {
    return new Promise((resolve, reject) => {
        fs.readdir(lettersDirectory, (error, files) => {
            if (error) {
                return reject(error);
            }
            resolve(files.map(file => path.join(lettersDirectory, file)));
        });
    })
        .then(letters => Promise.all(letters.map(assembleLetter)));
};

export default assembleLetters;
