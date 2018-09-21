import fs from "fs";
import path from "path";
import {assemblePrintable} from "./assemblePrintable";

export const assemblePrintables = printableBuilder => {
    const printableAssembler = assemblePrintable(printableBuilder);

    return printablesDirectory => {
        return new Promise((resolve, reject) => {
            fs.readdir(printablesDirectory, (error, files) => {
                if (error) {
                    return reject(error);
                }
                resolve(files.map(file => path.join(printablesDirectory, file)));
            });
        })
            .then(printables => Promise.all(printables.map(printableAssembler)));
    };
};

export default assemblePrintables;
