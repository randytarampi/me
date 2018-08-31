import {Photo} from "@randy.tarampi/js";
import fs from "fs";
import _ from "lodash";
import {DateTime} from "luxon";
import lwip from "lwip";
import path from "path";
import url from "url";
import CachedDataSource from "../../lib/cachedDataSource";

class LocalSource extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super("Local",
            dataClient || fs,
            cacheClient
        );
    }

    static get isEnabled() {
        return !!LocalSource.source;
    }

    static get source() {
        return process.env["LOCAL_DIRECTORY"];
    }

    get isEnabled() {
        return LocalSource.isEnabled;
    }

    get source() {
        return LocalSource.source;
    }

    static supportedExtensions() {
        return [".jpg", ".png", ".gif", ".jpeg"];
    }

    static fileIsSupported(fileName) {
        return LocalSource.supportedExtensions().find(extension => {
            return path.extname(fileName).toLowerCase() === extension;
        });
    }

    postsGetter(searchParams) {
        return new Promise((resolve, reject) => {
            fs.readdir(process.env.LOCAL_DIRECTORY, (error, fileNames) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(fileNames.filter(LocalSource.fileIsSupported));
            });
        })
            .then(fileNames => {
                return Promise.all(fileNames.map((fileName) => {
                    const filePath = path.join(process.env.LOCAL_DIRECTORY, fileName);

                    return new Promise((resolve, reject) => {
                        fs.lstat(filePath, (error, lstat) => {
                            if (error) {
                                reject(error);
                                return;
                            }

                            resolve({
                                lstat: lstat,
                                fileName: fileName,
                                filePath: filePath
                            });
                        });
                    });
                }));
            })
            .then(files => {
                return Promise.all(
                    _.sortBy(files, file => {
                            return -1 * DateTime.fromISO(file.lstat.ctime).valueOf();
                        })
                        .slice(
                            (searchParams.page - 1) * searchParams.perPage,
                            searchParams.page * searchParams.perPage
                        )
                        .map(file => this._loadFile(file))
                );
            });
    }

    async allPostsGetter(searchParams) {
        const posts = await this.postsGetter(
            searchParams
                .set("all", true)
        );

        return posts;
    }

    postGetter(photoId) {
        return new Promise((resolve, reject) => {
            fs.lstat(photoId, (error, lstat) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve({
                    lstat: lstat,
                    fileName: path.basename(photoId),
                    filePath: photoId
                });
            });
        })
            .then(file => this._loadFile(file));
    }

    jsonToPost(filePath, fileName, lstat, width, height) {
        const fileUrl = url.format(filePath.replace(this.source, ""));

        return Photo.fromJSON({
            id: filePath,
            source: this.type,
            dateCreated: lstat.ctime,
            width,
            height,
            sizedPhotos: [
                {url: fileUrl, width, height}
            ],
            sourceUrl: fileUrl,
            title: fileName,
            creator: {
                sourceUrl: fileUrl
            }
        });
    }

    _loadFile(file) {
        return new Promise((resolve, reject) => {
            lwip.open(file.filePath, (error, image) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(this.jsonToPost(file.filePath, file.fileName, file.lstat, image.width(), image.height()));
            });
        });
    }
}

export default LocalSource;
