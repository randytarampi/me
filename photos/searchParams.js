const _ = require("lodash");

class SearchParams {
	constructor(params) {
		Object.assign(this, params);
	}

	get F00px() {
		return _.extend({
			rpp: this.perPage,
			sort: "taken_at",
			image_size: "2048, 1600, 1080, 21, 31, 20, 30"
		}, this);
	}

	/**
	 * @deprecated
	 * @returns {*}
	 */
	to500px() {
		return this.F00px;
	}

	get Flickr() {
		return _.extend({
			per_page: this.perPage,
			extras: "url_o, url_k, url_h, url_c, url_z, url_m, url_n, date_upload, date_taken, owner_name, path_alias, description"
		}, this);
	}

	/**
	 * @deprecated
	 * @returns {*}
	 */
	toFlickr() {
		return this.Flickr;
	}

	get Unsplash() {
		return _.extend({
			perPage: this.perPage
		}, this);
	}

	/**
	 * @deprecated
	 * @returns {*}
	 */
	toUnsplash() {
		return this.Unsplash;
	}

	get Instagram() {
		return _.extend({
			count: this.perPage
		}, this);
	}

	/**
	 * @deprecated
	 * @returns {*}
	 */
	toInstagram() {
		return this.Instagram;
	}

	get Tumblr() {
		return _.extend({
			type: "photo",
			limit: this.perPage,
			offset: this.perPage * (this.page - 1)
		}, this);
	}

	/**
	 * @deprecated
	 * @returns {*}
	 */
	toTumblr() {
		return this.Tumblr;
	}

	get perPage() {
		return _.isFinite(this.__perPage) ? this.__perPage : 100;
	}

	set perPage(rpp) {
		this.__perPage = rpp;
	}

	get page() {
		return _.isFinite(this.__page) ? this.__page : 1;
	}

	set page(page) {
		this.__page = page;
	}
}

module.exports = SearchParams;
