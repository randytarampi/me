import {compositeKeySeparator, GEOHASH_ADDITIONAL_PRECISION_CHARACTER} from "@randy.tarampi/js";
import {expect} from "chai";
import padRight from "pad-right";
import SearchParams from "../../../../src/lib/searchParams";

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
                extras: "url_o, url_k, url_h, url_c, url_z, url_m, url_n, date_upload, date_taken, owner_name, path_alias, description, tags, machine_tags, geo"
            });
        });
    });

    describe(".Unsplash", function () {
        it("should properly format properties for query", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.Unsplash).to.eql({
                page: searchParams.page,
                per_page: searchParams.perPage,
                order_by: "latest",
                width: undefined,
                height: undefined,
                crop: undefined
            });
        });

        it("supports `orderBy: \"descending\"`", function () {
            const searchParams = SearchParams.fromJS({orderBy: "descending"});

            expect(searchParams.Unsplash).to.eql({
                page: searchParams.page,
                per_page: searchParams.perPage,
                order_by: "latest",
                width: undefined,
                height: undefined,
                crop: undefined
            });
        });

        it("supports `orderBy: \"ascending\"`", function () {
            const searchParams = SearchParams.fromJS({orderBy: "ascending"});

            expect(searchParams.Unsplash).to.eql({
                page: searchParams.page,
                per_page: searchParams.perPage,
                order_by: "oldest",
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
            const searchParams = SearchParams.fromJS({type: "Post"});

            expect(searchParams.Tumblr).to.eql({
                id: this.id,
                type: "text",
                page: searchParams.page,
                limit: 20,
                offset: 20 * (searchParams.page - 1)
            });
        });

        it("should properly format properties for photo posts", function () {
            const searchParams = SearchParams.fromJS({type: "Photo"});

            expect(searchParams.Tumblr).to.eql({
                id: this.id,
                type: "photo",
                page: searchParams.page,
                limit: 20,
                offset: 20 * (searchParams.page - 1)
            });
        });
    });

    describe(".Dynamoose", function () {
        it("should properly format properties for uid", function () {
            const searchParams = SearchParams.fromJS({uid: "woof"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {uid: {eq: "woof"}}
                },
                _options: {limit: 100, descending: true, all: false, indexName: "uid-index"}
            });
        });

        it("supports `orderBy: \"descending\"`", function () {
            const searchParams = SearchParams.fromJS({uid: "woof", orderBy: "descending"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {uid: {eq: "woof"}}
                },
                _options: {limit: 100, descending: true, all: false, indexName: "uid-index"}
            });
        });

        it("supports `orderBy: \"ascending\"`", function () {
            const searchParams = SearchParams.fromJS({uid: "woof", orderBy: "ascending"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {uid: {eq: "woof"}}
                },
                _options: {limit: 100, descending: false, all: false, indexName: "uid-index"}
            });
        });

        it("supports `orderBy: \"geohash\"`", function () {
            const searchParams = SearchParams.fromJS({
                source: "tumblr",
                orderBy: "geohash",
                orderOperator: "begins_with",
                orderComparator: "woof",
                orderComparatorType: "String"
            });

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {source: {eq: searchParams.source}},
                    range: {[searchParams.orderBy]: {[searchParams.orderOperator]: searchParams.orderComparator}}
                },
                _options: {indexName: `source-${searchParams.orderBy}-index`, limit: 100, descending: true, all: false}
            });
        });

        it("should properly format properties for tags", function () {
            const searchParams = SearchParams.fromJS({
                tags: "woof"
            });

            expect(searchParams.Dynamoose).to.eql({
                _filter: {
                    tags: {contains: ["woof"]}
                },
                _options: {limit: 100, descending: true, all: false}
            });
        });

        it("should properly format properties for tags & type", function () {
            const searchParams = SearchParams.fromJS({
                tags: "woof,Meow",
                type: "Post"
            });

            expect(searchParams.Dynamoose).to.eql({
                _filter: {
                    tags: {contains: ["woof", "meow"]},
                    type: "Post"
                },
                _options: {limit: 100, descending: true, all: false}
            });
        });

        it("should properly format properties for tags & source", function () {
            const searchParams = SearchParams.fromJS({
                tags: "woof",
                source: "tumblr"
            });

            expect(searchParams.Dynamoose).to.eql({
                _filter: {
                    tags: {contains: ["woof"]},
                    source: "tumblr"
                },
                _options: {limit: 100, descending: true, all: false}
            });
        });

        it("should properly format properties for tags & orderBy", function () {
            const searchParams = SearchParams.fromJS({
                tags: "woof",
                orderBy: "meow",
                orderOperator: "gt",
                orderComparator: "5"
            });

            expect(searchParams.Dynamoose).to.eql({
                _filter: {
                    tags: {contains: ["woof"]},
                    [searchParams.orderBy]: {[searchParams.orderOperator]: Number(searchParams.orderComparator)}
                },
                _options: {limit: 100, descending: true, all: false}
            });
        });

        it("should properly format properties for type", function () {
            const searchParams = SearchParams.fromJS({type: "woof"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    type: {eq: "woof"}
                },
                _options: {limit: 100, descending: true, all: false}
            });
        });

        it("should properly format properties for source", function () {
            const searchParams = SearchParams.fromJS({source: "meow"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {source: {eq: "meow"}}
                },
                _options: {limit: 100, descending: true, all: false}
            });
        });

        it("should properly format properties for type & source", function () {
            const searchParams = SearchParams.fromJS({source: "meow", type: "woof"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {source: {eq: "meow"}},
                    range: {type: {eq: "woof"}}
                },
                _options: {limit: 100, descending: true, all: false, indexName: "source-type-index"}
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
                _options: {indexName: "type-meow-index", limit: 100, descending: true, all: false}
            });
        });

        it("should properly format properties for type & geohash", function () {
            const searchParams = SearchParams.fromJS({
                type: "post",
                geohash: "woof"
            });

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {type: {eq: "post"}},
                    range: {geohash: {begins_with: "woof"}}
                },
                _options: {
                    indexName: "type-geohash-index",
                    limit: 100,
                    descending: true,
                    all: false
                }
            });
        });

        it("should properly format properties for source & id", function () {
            const searchParams = SearchParams.fromJS({source: "meow", id: "woof"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {uid: {eq: `meow${compositeKeySeparator}woof`}}
                },
                _options: {limit: 100, descending: true, all: false, indexName: "uid-index"}
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
                _options: {indexName: "source-meow-index", limit: 100, descending: true, all: false}
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
                    descending: true,
                    all: false
                }
            });
        });

        it("should properly format properties for source & geohash", function () {
            const searchParams = SearchParams.fromJS({
                source: "tumblr",
                geohash: "woof"
            });

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {source: {eq: "tumblr"}},
                    range: {geohash: {begins_with: "woof"}}
                },
                _options: {
                    indexName: "source-geohash-index",
                    limit: 100,
                    descending: true,
                    all: false
                }
            });
        });

        it("should properly format properties for source & lat/long", function () {
            const searchParams = SearchParams.fromJS({
                source: "tumblr",
                lat: 49.2845,
                long: -123.1116
            });

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {source: {eq: "tumblr"}},
                    range: {geohash: {begins_with: "c2b2qebz5b9w"}}
                },
                _options: {
                    indexName: "source-geohash-index",
                    limit: 100,
                    descending: true,
                    all: false
                }
            });
        });

        it("should properly format properties for source & lat/long", function () {
            const searchParams = SearchParams.fromJS({
                source: "tumblr",
                lat: 49.2845,
                long: -123.1116
            });

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {source: {eq: "tumblr"}},
                    range: {geohash: {begins_with: "c2b2qebz5b9w"}}
                },
                _options: {
                    indexName: "source-geohash-index",
                    limit: 100,
                    descending: true,
                    all: false
                }
            });
        });

        it("should properly format properties for a geo query with a given precision (reduced)", function () {
            const searchParams = SearchParams.fromJS({
                source: "tumblr",
                lat: 49.2845,
                long: -123.1116,
                geohashPrecision: 8
            });

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {source: {eq: "tumblr"}},
                    range: {geohash: {begins_with: "c2b2qebz5b9w".slice(0, searchParams.geohashPrecision)}}
                },
                _options: {
                    indexName: "source-geohash-index",
                    limit: 100,
                    descending: true,
                    all: false
                }
            });
        });

        it("should properly format properties for a geo query with a given precision (increased)", function () {
            const searchParams = SearchParams.fromJS({
                source: "tumblr",
                geohash: "c2b2qebz5b9w".slice(0, 8),
                geohashPrecision: 12
            });

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {source: {eq: "tumblr"}},
                    range: {geohash: {begins_with: padRight("c2b2qebz5b9w".slice(0, 8), searchParams.geohashPrecision, GEOHASH_ADDITIONAL_PRECISION_CHARACTER)}}
                },
                _options: {
                    indexName: "source-geohash-index",
                    limit: 100,
                    descending: true,
                    all: false
                }
            });
        });
    });

    describe(".S3", function () {
        it("should properly format properties for query (list)", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.S3).to.eql({
                Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                MaxKeys: 100
            });
        });

        it("should properly format properties for query (object)", function () {
            const searchParams = SearchParams.fromJS({id: "woof"});

            expect(searchParams.S3).to.eql({
                Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                Key: "woof"
            });
        });
    });
});
