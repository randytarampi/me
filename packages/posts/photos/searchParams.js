import _ from "lodash";

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

	get Flickr() {
		return _.extend({
			per_page: this.perPage,
			extras: "url_o, url_k, url_h, url_c, url_z, url_m, url_n, date_upload, date_taken, owner_name, path_alias, description"
		}, this);
	}

	get Unsplash() {
		return _.extend({
			perPage: this.perPage
		}, this);
	}

	get Instagram() {
		return _.extend({
			count: this.perPage
		}, this);
	}

	get Tumblr() {
		return _.extend({
			type: "photo",
			limit: this.perPage,
			offset: this.perPage * (this.page - 1)
		}, this);
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

export default SearchParams;
