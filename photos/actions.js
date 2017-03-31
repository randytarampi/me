require("dotenv").config();

const _ = require("lodash");

const actions = {};

const PHOTO_SOURCES = [
	require("./500px/photoSource"),
	require("./flickr/photoSource"),
	require("./unsplash/photoSource"),
	require("./instagram/photoSource"),
	require("./tumblr/photoSource"),
	require("./local/photoSource")
];
const INITIALIZED_PHOTO_SOURCES = Promise.all(
	_.chain(PHOTO_SOURCES)
		.map((photoSourceConstructor) => {
			return new photoSourceConstructor();
		})
		.reject((photoSource) => {
			return !photoSource.isEnabled;
		})
		.map((photoSource) => {
			return photoSource.initializing;
		})
		.value()
);

actions.searchPhotos = (req, res, next) => {
	return INITIALIZED_PHOTO_SOURCES
		.then((photoSources) => {
			return Promise.all(
				photoSources.map((photoSource) => {
					return photoSource.getUserPhotos(req.photoSearchParams)
						.catch((error) => {
							console.error(error); // eslint-disable-line no-console
							return [];
						});
				})
			);
		})
		.then(_.flatten)
		.then((flattenedPhotos) => {
			return _.sortBy(flattenedPhotos, [
				(photo) => {
					return photo.dateCreated ? photo.dateCreated.valueOf() * -1 : photo.datePublished ? photo.datePublished.valueOf() * -1 : 0;
				}
			]);
		})
		.then((sortedPhotos) => {
			res.send(sortedPhotos);
		})
		.catch(next);
};

module.exports = actions;
