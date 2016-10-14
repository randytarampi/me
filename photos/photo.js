const Creator = require("./creator");
const SizedPhoto = require("./sizedPhoto");
const Moment = require("moment");
const _ = require("lodash");

class Photo {
	constructor(id, source, dateCreated, datePublished, width, height, sizedPhotos, sourceUrl, title, body, creator) {
		let that = this;

		this.id = id;
		this.source = source;
		this.dateCreated = dateCreated && Moment.utc(dateCreated) || datePublished && Moment.utc(datePublished);
		this.datePublished = datePublished && Moment.utc(datePublished) || this.dateCreated && this.dateCreated.clone();
		this.width = width;
		this.height = height;
		this.sizedPhotos = [];
		this.sourceUrl = sourceUrl;
		this.title = title;
		this.body = body;
		this.creator = creator;

		_.each(sizedPhotos, (sizedPhoto) => {
			that.sizedPhoto = sizedPhoto;
		});
	}

	static fromJSON(json) {
		return new Photo(
			json.id,
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

	set sizedPhoto(sizedPhoto) {
		if (!sizedPhoto.height) {
			sizedPhoto.height = scaleHeightToWidth(sizedPhoto.width, this.width, this.height);
		}
		this.sizedPhotos.push(sizedPhoto);
	}
}

module.exports = Photo;

function scaleHeightToWidth(limitedWidth, originalWidth, originalHeight) {
	return ~~((originalHeight / originalWidth) * limitedWidth);
}
