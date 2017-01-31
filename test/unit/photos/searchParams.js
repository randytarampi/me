"use strict";

const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const expect = require("chai").expect;
const SearchParams = require("../../../photos/searchParams");

describe("SearchParams", () => {
	describe("constructor", () => {
		it("should build a `SearchParams` instance", () => {
			const searchParams = new SearchParams();

			expect(searchParams).to.be.ok;
			expect(searchParams.page).to.eql(1);
			expect(searchParams.perPage).to.eql(100);
		});
	});

	describe(".perPage", () => {
		it("should default to 100", () => {
			const searchParams = new SearchParams();

			expect(searchParams.perPage).to.eql(100);
		});

		it("should be mutable", () => {
			const searchParams = new SearchParams();

			expect(searchParams.perPage).to.eql(100);

			searchParams.perPage++;
			expect(searchParams.perPage).to.eql(101);
			expect(searchParams.__perPage).to.eql(101);

			searchParams.perPage--;
			expect(searchParams.perPage).to.eql(100);
			expect(searchParams.__perPage).to.eql(100);

			searchParams.perPage = -1;
			expect(searchParams.perPage).to.eql(-1);
			expect(searchParams.__perPage).to.eql(-1);
		});

		it("checks for a finite value", () => {
			const searchParams = new SearchParams();

			expect(searchParams.perPage).to.eql(100);

			searchParams.perPage = -Infinity;
			expect(searchParams.perPage).to.eql(100);
			expect(searchParams.__perPage).to.eql(-Infinity);
		});
	});

	describe(".page", () => {
		it("should default to 1", () => {
			const searchParams = new SearchParams();

			expect(searchParams.page).to.eql(1);
		});

		it("should be mutable", () => {
			const searchParams = new SearchParams();

			expect(searchParams.page).to.eql(1);

			searchParams.page++;
			expect(searchParams.page).to.eql(2);
			expect(searchParams.__page).to.eql(2);

			searchParams.page--;
			expect(searchParams.page).to.eql(1);
			expect(searchParams.__page).to.eql(1);

			searchParams.page = -1;
			expect(searchParams.page).to.eql(-1);
			expect(searchParams.__page).to.eql(-1);
		});

		it("checks for a finite value", () => {
			const searchParams = new SearchParams();

			expect(searchParams.page).to.eql(1);

			searchParams.page = -Infinity;
			expect(searchParams.page).to.eql(1);
			expect(searchParams.__page).to.eql(-Infinity);
		});
	});

	describe(".F00px", () => {
		it("should properly format properties for query", () => {
			const searchParams = new SearchParams();

			expect(searchParams.F00px).to.eql({
				rpp: searchParams.perPage,
				sort: "taken_at",
				image_size: "2048, 1600, 1080, 21, 31, 20, 30"
			});
		});
	});

	describe(".Flickr", () => {
		it("should properly format properties for query", () => {
			const searchParams = new SearchParams();

			expect(searchParams.Flickr).to.eql({
				per_page: searchParams.perPage,
				extras: "url_o, url_k, url_h, url_c, url_z, url_m, url_n, date_upload, date_taken, owner_name, path_alias, description"
			});
		});
	});

	describe(".Unsplash", () => {
		it("should properly format properties for query", () => {
			const searchParams = new SearchParams();

			expect(searchParams.Unsplash).to.eql({
				perPage: searchParams.perPage
			});
		});
	});

	describe(".Instagram", () => {
		it("should properly format properties for query", () => {
			const searchParams = new SearchParams();

			expect(searchParams.Instagram).to.eql({
				count: searchParams.perPage
			});
		});
	});

	describe(".Tumblr", () => {
		it("should properly format properties for query", () => {
			const searchParams = new SearchParams();

			expect(searchParams.Tumblr).to.eql({
				type: "photo",
				limit: searchParams.perPage,
				offset: searchParams.perPage * (searchParams.page - 1)
			});
		});
	});
});
