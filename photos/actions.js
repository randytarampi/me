require("dotenv").config();

const _ = require("lodash");

const actions = {};

const PHOTO_SOURCES = [
	require("./500px/photoSource"),
	require("./flickr/photoSource"),
	require("./unsplash/photoSource")
];
const INITIALIZED_PHOTO_SOURCES = Promise.all(
	_.chain(PHOTO_SOURCES)
		.map((photoSourceConstructor) => {
			return new photoSourceConstructor();
		})
		.reject((photoSource) => {
			return !process.env[`${photoSource.type.toUpperCase()}_API_KEY`] &&
				!process.env[`${photoSource.type.toUpperCase()}_API_SECRET`];
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
					return photoSource.getUserPhotos(req.photoSearchParams);
				})
			);
		})
		.then(_.flatten)
		.then((flattenedPhotos) => {
			return _.sortBy(flattenedPhotos, [
				(photo) => {
					return photo.dateTaken.valueOf() * -1;
				},
				(photo) => {
					return photo.datePublished.valueOf() * -1;
				}
			]);
		})
		.then((sortedPhotos) => {
			res.send(sortedPhotos);
		})
		.catch(next);
};

module.exports = actions;
