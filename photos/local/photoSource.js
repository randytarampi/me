require("dotenv").config();

const PhotoSource = require("../photoSource");
const Photo = require("me.common.js/lib/photo");
const Creator = require("me.common.js/lib/creator");
const SizedPhoto = require("me.common.js/lib/sizedPhoto");
const SearchParams = require("../searchParams");
const Moment = require("moment");
const _ = require("lodash");
const lwip = require("lwip");
const url = require("url");
const path = require("path");
const fs = require("fs");

class LocalSource extends PhotoSource {
	constructor() {
		super("Local");
	}

	getUserPhotos(params) {
		params = params instanceof SearchParams ? params : new SearchParams(params);

		return new Promise((resolve, reject) => {
			fs.readdir(process.env.LOCAL_DIRECTORY, (error, fileNames) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(
					_.filter(fileNames, LocalSource.fileIsSupported)
				);
			});
		})
			.then((fileNames) => {
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
			.then((files) => {
				const page = isNaN(params.page) ? 1 : params.page;
				return Promise.all(_.sortBy(files,
					(file) => {
						return -1 * file.lstat.ctime;
					})
					.slice((page - 1) * params.perPage, page * params.perPage)
					.map((file) => {
						return new Promise((resolve, reject) => {
							lwip.open(file.filePath, (error, image) => {
								if (error) {
									reject(error);
									return;
								}

								resolve(this.jsonToPhoto(file.filePath, file.fileName, file.lstat, image.width(), image.height()));
							});
						});
					}));
			});
	}

	getPhoto(photoId) {
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
			.then((file) => {
				return new Promise((resolve, reject) => {
					lwip.open(file.filePath, (error, image) => {
						if (error) {
							reject(error);
							return;
						}

						resolve(this.jsonToPhoto(file.filePath, file.fileName, file.lstat, image.width(), image.height()));
					});
				});
			});
	}

	jsonToPhoto(filePath, fileName, lstat, width, height) {
		const fileUrl = url.format(filePath.replace(this.source, ""));

		return new Photo(
			filePath,
			null,
			this.type,
			Moment(lstat.ctime),
			null,
			width,
			height,
			[
				new SizedPhoto(fileUrl, width, height)
			],
			fileUrl,
			fileName,
			null,
			new Creator(
				null,
				null,
				null,
				fileUrl
			)
		);
	}

	get isEnabled() {
		return LocalSource.isEnabled;
	}

	static get isEnabled() {
		return !!LocalSource.source;
	}

	get source() {
		return LocalSource.source;
	}

	static get source() {
		return process.env["LOCAL_DIRECTORY"];
	}


	static supportedExtensions() {
		return [".jpg", ".png", ".gif", ".jpeg"];
	}

	static fileIsSupported(fileName) {
		return _.find(LocalSource.supportedExtensions(), (extension) => {
			return path.extname(fileName).toLowerCase() === extension;
		});
	}
}

module.exports = LocalSource;
