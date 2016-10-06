const Creator = require("./creator");
const SizedPhoto = require("./sizedPhoto");
const Moment = require("moment");
const _ = require("lodash");

class Photo {
	constructor(id, photoSource, dateTaken, datePublished, width, height, sizedPhotos, sourceUrl, name, description, creator) {
		let that = this;

		this.id = id;
		this.photoSource = photoSource;
		this.dateTaken = dateTaken && Moment.utc(dateTaken) || datePublished && Moment.utc(datePublished);
		this.datePublished = datePublished && Moment.utc(datePublished) || this.dateTaken && this.dateTaken.clone();
		this.width = width;
		this.height = height;
		this.sizedPhotos = [];
		this.sourceUrl = sourceUrl;
		this.name = name;
		this.description = description;
		this.creator = creator;

		_.each(sizedPhotos, (sizedPhoto) => {
			that.sizedPhoto = sizedPhoto;
		});
	}

	static fromJSON(json) {
		return new Photo(
			json.id,
			json.photoSource,
			json.dateTaken && Moment.utc(json.dateTaken),
			json.datePublished && Moment.utc(json.datePublished),
			json.width,
			json.height,
			json.sizedPhotos.map(SizedPhoto.fromJSON),
			json.sourceUrl,
			json.name,
			json.description,
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
