import {Buffer} from "buffer";
import busboy from "busboy";

export const parseFilesFromMultipartEvent = ({body, headers, isBase64Encoded}) => new Promise((resolve, reject) => {
    const busboyInstance = busboy({headers: {"content-type": headers["Content-Type"], ...headers}, defParamCharset: "utf8"});
    const parsed = {};

    busboyInstance.on("field", (fieldname, value) => {
        parsed[fieldname] = value;
    });
    busboyInstance.on("file", (fieldname, fileStream, info) => {
        const {filename, encoding, mimeType} = info;
        const fieldForFile = parsed[fieldname] || {};
        parsed[fieldname] = fieldForFile;

        const fieldForFileAndFileName = fieldForFile[filename] || {
            filename,
            data: Buffer.alloc(0),
            encoding,
            contentType: mimeType
        };
        fieldForFile[filename] = fieldForFileAndFileName;

        fileStream.on("data", data => {
            fieldForFileAndFileName.data = Buffer.concat([fieldForFileAndFileName.data, Buffer.from(data)]);
        });
        fileStream.on("end", () => {
            fieldForFileAndFileName.encoding = encoding;
            fieldForFileAndFileName.contentType = mimeType;
        });
    });

    busboyInstance.on("error", reject);
    busboyInstance.on("close", () => resolve(parsed));

    busboyInstance.write(body, isBase64Encoded ? "base64" : "binary");
    busboyInstance.end();
});

export default parseFilesFromMultipartEvent;
