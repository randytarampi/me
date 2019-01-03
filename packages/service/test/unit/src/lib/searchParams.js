import {compositeKeySeparator, Gallery, MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION, Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import SearchParams from "../../../../src/lib/searchParams";

describe("SearchParams", function () {
    describe("constructor", function () {
        it("should build a `SearchParams` instance", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.page).to.eql(1);
            expect(searchParams.perPage).to.eql(100);
        });
    });

    describe("perPage", function () {
        it("should default to 100", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.perPage).to.eql(100);
        });
    });

    describe("page", function () {
        it("should default to 1", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.page).to.eql(1);
        });
    });

    describe("orderComparator", function () {
        it("works for `this.orderComparatorType === String`", function () {
            const searchParams = SearchParams.fromJS({
                orderComparator: 1,
                orderComparatorType: "String"
            });

            expect(searchParams.orderComparator).to.eql("1");
        });

        it("works for `this.orderComparatorType === Number`", function () {
            const searchParams = SearchParams.fromJS({
                orderComparator: 1,
                orderComparatorType: "Number"
            });

            expect(searchParams.orderComparator).to.eql(1);
        });

        it("defaults to `this.orderComparatorType === Number`", function () {
            const searchParams = SearchParams.fromJS({
                orderComparator: 1
            });

            expect(searchParams.orderComparator).to.eql(1);
        });
    });

    describe("geoRadius", function () {
        it("returns `this.get(\"geoRadius\")`", function () {
            const searchParams = SearchParams.fromJS({
                geoRadius: 1
            });

            expect(searchParams.geoRadius).to.eql(1);
        });

        it("returns half the haversine distance between the points of a bounding box", function () {
            const searchParams = SearchParams.fromJS({
                north: 0,
                east: 1,
                south: 0,
                west: 0
            });

            expect(searchParams.geoRadius).to.be.within(55500, 55600);
        });

        it("is undefined otherwise", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.geoRadius).to.eql(undefined);
        });
    });

    describe("geohash", function () {
        it("returns `this.get(\"geohash\")`", function () {
            const searchParams = SearchParams.fromJS({
                geohash: "woof"
            });

            expect(searchParams.geohash).to.eql("woof");
        });

        it("infers from `this.lat` and `this.long`", function () {
            const searchParams = SearchParams.fromJS({
                lat: 49.2845,
                long: -123.1116
            });

            expect(searchParams.geohash).to.eql("c2b2qebz5b9");
        });

        it("is undefined if no `geohash` or `geohashPrecision`", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.geohash).to.eql(undefined);
        });
    });

    describe("geohashPrecision", function () {
        it("returns `this.get(\"geohashPrecision\")`", function () {
            const searchParams = SearchParams.fromJS({
                geohashPrecision: 1
            });

            expect(searchParams.geohashPrecision).to.eql(1);
        });

        it("defers to `this.get(\"geohash\").length`", function () {
            const searchParams = SearchParams.fromJS({
                geohash: "woof"
            });

            expect(searchParams.geohashPrecision).to.eql(searchParams.geohash.length);
        });

        it("is undefined if no `geohash` or `geohashPrecision`", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.geohashPrecision).to.eql(undefined);
        });
    });

    describe("geohashQueries", function () {
        it("defers to getGeohashesForBoundingBox if we have `north`, `east`, `south` and `west`", function () {
            const searchParams = SearchParams.fromJS({
                north: 1,
                east: 1,
                south: -1,
                west: -1
            });

            expect(searchParams.geohashQueries).to.be.an("array");
            expect(searchParams.geohashQueries).to.contain.members([
                "s00",
                "kpb",
                "ebp",
                "7zz",
                "s01",
                "kpc",
                "ebn",
                "7zy",
                "s02",
                "kp8",
                "ebr",
                "7zx"
            ]);
        });

        it("defers to getGeohashesForRadiusAroundPoint if we have `geoRadius`, `lat` and `long`", function () {
            const searchParams = SearchParams.fromJS({
                geoRadius: MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION[0] + 1,
                lat: 0,
                long: 0
            });

            expect(searchParams.geohashQueries).to.be.an("array");
            expect(searchParams.geohashQueries).to.contain.members([
                "s",
                "k",
                "e",
                "7",
                "u",
                "h",
                "g",
                "5"
            ]);
        });

        it("defers to getGeohashesForRadiusAroundGeohash if we have `geoRadius` and `geohash`", function () {
            const searchParams = SearchParams.fromJS({
                geoRadius: MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION[0] + 1,
                geohash: "s"
            });

            expect(searchParams.geohashQueries).to.be.an("array");
            expect(searchParams.geohashQueries).to.contain.members([
                "s",
                "t",
                "e",
                "u",
                "k",
                "v",
                "m",
                "g",
                "7"
            ]);
        });

        it("returns undefined otherwise", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.geohashQueries).to.eql(undefined);
        });
    });

    describe("Flickr", function () {
        it("should properly format properties for query", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.Flickr).to.eql({
                page: searchParams.page,
                per_page: searchParams.perPage,
                extras: "url_o, url_k, url_h, url_c, url_z, url_m, url_n, date_upload, date_taken, owner_name, path_alias, description, tags, machine_tags, geo"
            });
        });
    });

    describe("Unsplash", function () {
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

    describe("Instagram", function () {
        it("should properly format properties for query", function () {
            const searchParams = SearchParams.fromJS();

            expect(searchParams.Instagram).to.eql({
                page: searchParams.page,
                count: searchParams.perPage
            });
        });

        it("should properly format properties for query containing `beforeId`", function () {
            const searchParams = SearchParams.fromJS({beforeId: "woof"});

            expect(searchParams.Instagram).to.eql({
                page: searchParams.page,
                count: searchParams.perPage,
                max_id: "woof"
            });
        });

        it("should properly format properties for query containing `afterId`", function () {
            const searchParams = SearchParams.fromJS({afterId: "woof"});

            expect(searchParams.Instagram).to.eql({
                page: searchParams.page,
                count: searchParams.perPage,
                min_id: "woof"
            });
        });
    });

    describe("Tumblr", function () {
        it("should properly format properties for word posts", function () {
            const searchParams = SearchParams.fromJS({type: Post.type});

            expect(searchParams.Tumblr).to.eql({
                id: this.id,
                type: "text",
                page: searchParams.page,
                limit: 20,
                offset: 20 * (searchParams.page - 1)
            });
        });

        it("should properly format properties for photo posts", function () {
            const searchParams = SearchParams.fromJS({type: Photo.type});

            expect(searchParams.Tumblr).to.eql({
                id: this.id,
                type: "photo",
                page: searchParams.page,
                limit: 20,
                offset: 20 * (searchParams.page - 1)
            });
        });

        it("should properly format properties for gallery posts", function () {
            const searchParams = SearchParams.fromJS({type: Gallery.type});

            expect(searchParams.Tumblr).to.eql({
                id: this.id,
                type: "photo",
                page: searchParams.page,
                limit: 20,
                offset: 20 * (searchParams.page - 1)
            });
        });

        it("takes a good guess at the `type` for unknown post types", function () {
            const searchParams = SearchParams.fromJS({type: "WOOF"});

            expect(searchParams.Tumblr).to.eql({
                id: this.id,
                type: searchParams.type.toLowerCase(),
                page: searchParams.page,
                limit: 20,
                offset: 20 * (searchParams.page - 1)
            });
        });
    });

    describe("Dynamoose", function () {
        it("should properly format properties for uid", function () {
            const searchParams = SearchParams.fromJS({uid: "woof"});

            expect(searchParams.Dynamoose).to.eql({
                _query: {
                    hash: {uid: {eq: "woof"}}
                },
                _options: {limit: 100, descending: true, all: false, indexName: "uid-index"}
            });
        });

        describe("perPage", function () {
            it("sets `limit` if `perPage` is finite", function () {
                const searchParams = SearchParams.fromJS({uid: "woof", perPage: 101});

                expect(searchParams.Dynamoose).to.eql({
                    _query: {
                        hash: {uid: {eq: "woof"}}
                    },
                    _options: {limit: searchParams.perPage, descending: true, all: false, indexName: "uid-index"}
                });
            });

            it("sets `all` if `perPage` isn't finite", function () {
                const searchParams = SearchParams.fromJS({uid: "woof", perPage: Infinity});

                expect(searchParams.Dynamoose).to.eql({
                    _query: {
                        hash: {uid: {eq: "woof"}}
                    },
                    _options: {descending: true, all: true, indexName: "uid-index"}
                });
            });
        });

        describe("orderBy", function () {
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
                    _options: {
                        indexName: `source-${searchParams.orderBy}-index`,
                        limit: 100,
                        descending: true,
                        all: false
                    }
                });
            });
        });

        describe("tags", function () {
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
                    type: Post.type
                });

                expect(searchParams.Dynamoose).to.eql({
                    _filter: {
                        tags: {contains: ["woof", "meow"]},
                        type: Post.type
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
        });

        describe("type", function () {
            it("should properly format properties for type", function () {
                const searchParams = SearchParams.fromJS({type: "woof"});

                expect(searchParams.Dynamoose).to.eql({
                    _query: {
                        type: {eq: "woof"}
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
                    type: Post.type,
                    geohash: "woof"
                });

                expect(searchParams.Dynamoose).to.eql({
                    _query: {
                        hash: {type: {eq: Post.type}},
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

            it("should properly format properties for type & geohashQueries", function () {
                const searchParams = SearchParams.fromJS({
                    type: Post.type,
                    geoRadius: MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION[0] + 1,
                    lat: 0,
                    long: 0
                });

                expect(searchParams.Dynamoose).to.eql(
                    [
                        "s",
                        "k",
                        "e",
                        "7",
                        "u",
                        "h",
                        "g",
                        "5"
                    ].map(geohashQuery => {
                        return {
                            _query: {
                                hash: {type: {eq: Post.type}},
                                range: {geohash: {begins_with: geohashQuery}}
                            },
                            _options: {limit: 100, descending: true, all: false, indexName: "type-geohash-index"}
                        };
                    })
                );
            });

            it("should properly format properties for type & orderBy with orderComparatorType and geohash", function () {
                const searchParams = SearchParams.fromJS({
                    type: Post.type,
                    orderBy: "meow",
                    orderOperator: "gt",
                    orderComparator: "grr",
                    orderComparatorType: "String",
                    geohash: "woof"
                });

                expect(searchParams.Dynamoose).to.eql({
                    _filter: {
                        type: Post.type,
                        geohash: {begins_with: searchParams.geohash},
                        [searchParams.orderBy]: {
                            [searchParams.orderOperator]: searchParams.orderComparator
                        }
                    },
                    _options: {limit: 100, descending: true, all: false, indexName: "type-geohash-index"}
                });
            });

            it("should properly format properties for type & orderBy with orderComparatorType and geohashQueries", function () {
                const searchParams = SearchParams.fromJS({
                    type: Post.type,
                    orderBy: "meow",
                    orderOperator: "gt",
                    orderComparator: "grr",
                    orderComparatorType: "String",
                    geoRadius: MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION[0] + 1,
                    lat: 0,
                    long: 0
                });

                expect(searchParams.Dynamoose).to.eql(
                    [
                        "s",
                        "k",
                        "e",
                        "7",
                        "u",
                        "h",
                        "g",
                        "5"
                    ].map(geohashQuery => {
                        return {
                            _filter: {
                                type: Post.type,
                                geohash: {begins_with: geohashQuery},
                                [searchParams.orderBy]: {
                                    [searchParams.orderOperator]: searchParams.orderComparator
                                }
                            },
                            _options: {limit: 100, descending: true, all: false, indexName: "type-geohash-index"}
                        };
                    })
                );
            });
        });

        describe("source", function () {
            it("should properly format properties for source", function () {
                const searchParams = SearchParams.fromJS({source: "meow"});

                expect(searchParams.Dynamoose).to.eql({
                    _query: {
                        hash: {source: {eq: "meow"}}
                    },
                    _options: {limit: 100, descending: true, all: false}
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

            it("should properly format properties for source & orderBy with orderComparatorType", function () {
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

            it("should properly format properties for a source & geohash with a given precision (reduced)", function () {
                const expectedGeohash = "c2b2qebz5b9";
                const searchParams = SearchParams.fromJS({
                    source: "tumblr",
                    lat: 49.2845,
                    long: -123.1116,
                    geohashPrecision: 8
                });
                const dynamooseSearchQueries = searchParams.Dynamoose;

                expect(dynamooseSearchQueries).to.eql({
                    _query: {
                        hash: {source: {eq: "tumblr"}},
                        range: {geohash: {begins_with: expectedGeohash.slice(0, searchParams.geohashPrecision)}}
                    },
                    _options: {
                        indexName: "source-geohash-index",
                        limit: 100,
                        descending: true,
                        all: false
                    }
                });
            });

            it("should properly format properties for source & geohashQueries", function () {
                const searchParams = SearchParams.fromJS({
                    source: "tumblr",
                    geoRadius: MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION[0] + 1,
                    lat: 0,
                    long: 0
                });

                expect(searchParams.Dynamoose).to.eql(
                    [
                        "s",
                        "k",
                        "e",
                        "7",
                        "u",
                        "h",
                        "g",
                        "5"
                    ].map(geohashQuery => {
                        return {
                            _query: {
                                hash: {source: {eq: "tumblr"}},
                                range: {geohash: {begins_with: geohashQuery}}
                            },
                            _options: {
                                limit: 100,
                                descending: true,
                                all: false,
                                indexName: "source-geohash-index"
                            }
                        };
                    })
                );
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
                        range: {geohash: {begins_with: "c2b2qebz5b9"}}
                    },
                    _options: {
                        indexName: "source-geohash-index",
                        limit: 100,
                        descending: true,
                        all: false
                    }
                });
            });

            it("should properly format properties for type & orderBy with orderComparatorType and geohash", function () {
                const searchParams = SearchParams.fromJS({
                    source: "tumblr",
                    orderBy: "meow",
                    orderOperator: "gt",
                    orderComparator: "grr",
                    orderComparatorType: "String",
                    geohash: "woof"
                });

                expect(searchParams.Dynamoose).to.eql({
                    _filter: {
                        source: "tumblr",
                        geohash: {begins_with: searchParams.geohash},
                        [searchParams.orderBy]: {
                            [searchParams.orderOperator]: searchParams.orderComparator
                        }
                    },
                    _options: {
                        indexName: "source-geohash-index",
                        limit: 100,
                        descending: true,
                        all: false
                    }
                });
            });

            it("should properly format properties for type & orderBy with orderComparatorType and geohashQueries", function () {
                const searchParams = SearchParams.fromJS({
                    source: "tumblr",
                    orderBy: "meow",
                    orderOperator: "gt",
                    orderComparator: "grr",
                    orderComparatorType: "String",
                    geoRadius: MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION[0] + 1,
                    lat: 0,
                    long: 0
                });

                expect(searchParams.Dynamoose).to.eql(
                    [
                        "s",
                        "k",
                        "e",
                        "7",
                        "u",
                        "h",
                        "g",
                        "5"
                    ].map(geohashQuery => {
                        return {
                            _filter: {
                                source: "tumblr",
                                geohash: {begins_with: geohashQuery},
                                [searchParams.orderBy]: {
                                    [searchParams.orderOperator]: searchParams.orderComparator
                                }
                            },
                            _options: {
                                indexName: "source-geohash-index",
                                limit: 100,
                                descending: true,
                                all: false
                            }
                        };
                    })
                );
            });
        });
    });

    describe("S3", function () {
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

        it("should properly format properties for query containing `beforeId`", function () {
            const searchParams = SearchParams.fromJS({beforeId: "woof"});

            expect(searchParams.S3).to.eql({
                Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                MaxKeys: 100,
                StartAfter: "woof"
            });
        });
    });
});
