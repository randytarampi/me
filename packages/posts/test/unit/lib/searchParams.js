import {util} from "@randy.tarampi/js";
import {expect} from "chai";
import SearchParams from "../../../lib/searchParams";

describe("SearchParams", function () {
    describe("constructor", function () {
        it("should build a `SearchParams` instance", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams).to.be.ok;
            expect(searchParams.page).to.eql(1);
            expect(searchParams.perPage).to.eql(100);
        });
    });

    describe(".perPage", function () {
        it("should default to 100", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.perPage).to.eql(100);
        });
    });

    describe(".page", function () {
        it("should default to 1", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.page).to.eql(1);
        });
    });

    describe(".Flickr", function () {
        it("should properly format properties for query", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.Flickr).to.eql({
                page: searchParams.page,
                per_page: searchParams.perPage,
                extras: "url_o, url_k, url_h, url_c, url_z, url_m, url_n, date_upload, date_taken, owner_name, path_alias, description"
            });
        });
    });

    describe(".Unsplash", function () {
        it("should properly format properties for query", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.Unsplash).to.eql({
                page: searchParams.page,
                perPage: searchParams.perPage,
                orderBy: undefined,
                width: undefined,
                height: undefined,
                crop: undefined
            });
        });
    });

    describe(".Instagram", function () {
        it("should properly format properties for query", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.Instagram).to.eql({
                page: searchParams.page,
                count: searchParams.perPage
            });
        });
    });

    describe(".Tumblr", function () {
        it("should properly format properties for word posts", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.Tumblr).to.eql({
                id: this.id,
                type: "text",
                page: searchParams.page,
                limit: searchParams.perPage,
                offset: searchParams.perPage * (searchParams.page - 1)
            });
        });

        it("should properly format properties for photo posts", function () {
            const searchParams = SearchParams.fromJS({type: "Photo"});

            expect(searchParams.Tumblr).to.eql({
                id: this.id,
                type: "photo",
                page: searchParams.page,
                limit: searchParams.perPage,
                offset: searchParams.perPage * (searchParams.page - 1)
            });
        });
    });

    describe(".Dynamoose", function () {
        it("should properly format properties for uid", function () {
            const searchParams = SearchParams.fromJS({uid: "woof"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    uid: {eq: "woof"}
                },
                _options: {limit: 100, descending: true}
            });
        });

        it("should properly format properties for type", function () {
            const searchParams = SearchParams.fromJS({type: "woof"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    type: {eq: "woof"}
                },
                _options: {limit: 100, descending: true}
            });
        });

        it("should properly format properties for source", function () {
            const searchParams = SearchParams.fromJS({source: "meow"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    source: {eq: "meow"},
                },
                _options: {limit: 100, descending: true}
            });
        });

        it("should properly format properties for type & source", function () {
            const searchParams = SearchParams.fromJS({source: "meow", type: "woof"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {type: {eq: "woof"}},
                    range: {source: {eq: "meow"}},
                },
                _options: {indexName: "type-source-index", limit: 100, descending: true}
            });
        });

        it("should properly format properties for type & orderBy", function () {
            const searchParams = SearchParams.fromJS({
                orderBy: "meow",
                orderOperator: "lt",
                orderComparator: 0,
                type: "woof"
            });

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {type: {eq: "woof"}},
                    range: {meow: {lt: 0}}
                },
                _options: {indexName: "type-meow-index", limit: 100, descending: true}
            });
        });

        it("should properly format properties for source & id", function () {
            const searchParams = SearchParams.fromJS({source: "meow", id: "woof"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    uid: {eq: `meow${util.compositeKeySeparator}woof`}
                },
                _options: {limit: 100, descending: true}
            });
        });

        it("should properly format properties for source & orderBy", function () {
            const searchParams = SearchParams.fromJS({
                orderBy: "meow",
                orderOperator: "gt",
                orderComparator: "5",
                source: "woof"
            });

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {source: {eq: "woof"}},
                    range: {meow: {gt: 5}}
                },
                _options: {indexName: "source-meow-index", limit: 100, descending: true}
            });
        });

        it("should properly format properties for source & orderBy", function () {
            const searchParams = SearchParams.fromJS({
                orderBy: "meow",
                orderOperator: "gt",
                orderComparator: "grr",
                orderComparatorType: "String",
                source: "woof",
                perPage: 20
            });

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {source: {eq: "woof"}},
                    range: {meow: {gt: "grr"}}
                },
                _options: {
                    indexName: "source-meow-index",
                    limit: 20,
                    descending: true
                }
            });
        });
    });

    describe(".S3", function () {
        it("should properly format properties for query (list)", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.S3).to.eql({
                Bucket: process.env.S3_BUCKET_NAME,
                Marker: "0",
                MaxKeys: 100
            });
        });

        it("should properly format properties for query (object)", function () {
            const searchParams = SearchParams.fromJS({id: "woof"});

            expect(searchParams.S3).to.eql({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: "woof"
            });
        });
    });
});
