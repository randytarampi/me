import {Buffer} from "buffer";
import Busboy from "busboy";

export const parseFilesFromMultipartEvent = ({body, headers, isBase64Encoded}) => new Promise((resolve, reject) => {
    const busboy = new Busboy({headers: {"content-type": headers["Content-Type"], ...headers}});
    const parsed = {};

    busboy.on("field", (fieldname, value) => {
        parsed[fieldname] = value;
    });
    busboy.on("file", (fieldname, fileStream, filename, encoding, mimetype) => {
        const fieldForFile = parsed[fieldname] || {};
        parsed[fieldname] = fieldForFile;

        const fieldForFileAndFileName = fieldForFile[filename] || {
            filename,
            data: Buffer.alloc(0),
            encoding,
            contentType: mimetype
        };
        fieldForFile[filename] = fieldForFileAndFileName;

        fileStream.on("data", data => {
            fieldForFileAndFileName.data = Buffer.concat([fieldForFileAndFileName.data, Buffer.from(data)]);
        });
        fileStream.on("end", () => {
            fieldForFileAndFileName.encoding = encoding;
            fieldForFileAndFileName.contentType = mimetype;
        });
    });

    busboy.on("error", reject);
    busboy.on("finish", () => resolve(parsed));

    busboy.write(body, isBase64Encoded ? "base64" : "binary");
    busboy.end();
});

export default parseFilesFromMultipartEvent;
