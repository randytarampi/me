const _ = require("lodash");

class SearchParams {
	constructor(params) {
		Object.assign(this, params);
	}

	to500px() {
		return _.extend({
			rpp: this.perPage,
			sort: "taken_at",
			image_size: "2048, 1600, 1080, 21, 31, 20, 30"
		}, this);
	}

	toFlickr() {
		return _.extend({
			per_page: this.perPage,
			extras: "url_o, url_k, url_h, url_c, url_z, url_m, url_n, date_upload, date_taken, owner_name, path_alias, description"
		}, this);
	}

	toUnsplash() {
		return _.extend({
			perPage: this.perPage
		}, this);
	}

	toInstagram() {
		return _.extend({
			count: this.perPage
		}, this);
	}

	get perPage() {
		return this.__perPage || 100;
	}

	set perPage(rpp) {
		this.__perPage = rpp;
	}
}

module.exports = SearchParams;
