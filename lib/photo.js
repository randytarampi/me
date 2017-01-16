const Creator = require("./creator");
const SizedPhoto = require("./sizedPhoto");
const Post = require("./post");
const Moment = require("moment");
const _ = require("lodash");

class Photo extends Post {
	constructor(id, type, source, dateCreated, datePublished, width, height, sizedPhotos, sourceUrl, title, body, creator) {
		super(
			id,
			type || Photo.name,
			source,
			dateCreated,
			datePublished,
			title,
			body,
			sourceUrl,
			creator
		);

		this.width = width;
		this.height = height;
		this.sizedPhotos = [];

		_.each(sizedPhotos, (sizedPhoto) => {
			this.sizedPhoto = sizedPhoto;
		});
	}

	static fromJSON(json) {
		return new Photo(
			json.id,
			json.type,
			json.source,
			json.dateCreated && Moment.utc(json.dateCreated),
			json.datePublished && Moment.utc(json.datePublished),
			json.width,
			json.height,
			json.sizedPhotos.map(SizedPhoto.fromJSON),
			json.sourceUrl,
			json.title,
			json.body,
			json.creator && Creator.fromJSON(json.creator)
		);
	}

	getSizedPhoto(width) {
		const sortedSizedPhotos = _.sortBy(this.sizedPhotos, ["width"]);
		const widthAppropriatePhotos = _.reject(sortedSizedPhotos, (sizedPhoto) => {
			return sizedPhoto.width < width;
		});
		return _.first(widthAppropriatePhotos) || _.last(sortedSizedPhotos);
	}

	//FIXME-RT: This seems quite odd. Can't quite remember why it wasn't `set sizedPhotos` instead...
	set sizedPhoto(sizedPhoto) {
		if (sizedPhoto) {
			if (!sizedPhoto.height) {
				//FIXME-RT: Surely there's a better way to accomplish this...
				sizedPhoto.height = scaleHeightToWidth(sizedPhoto.width, this.width, this.height);
			}
			this.sizedPhotos.push(sizedPhoto);
		}
	}
}

module.exports = Photo;

function scaleHeightToWidth(limitedWidth, originalWidth, originalHeight) {
	return ~~((originalHeight / originalWidth) * limitedWidth);
}
