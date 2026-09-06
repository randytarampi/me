import {expect} from "chai";
import sinon from "sinon";
import dynamoose from "dynamoose";
import {Post} from "@randy.tarampi/js";
import {applyScanQueryOptions, buildQueryWithFilter, DynamooseModel, recordToDynamoObject} from "../../../../src/db/dynamooseModel.js";
import PostSchema from "../../../../src/db/schema/post.js";

describe("util", function () {
    describe("Post schema raw", function () {
        const model = dynamoose.model("post-schema-raw-test", PostSchema, {create: false, update: false});

        it("conforms an object `raw` on read", async function () {
            const raw = {id: "x", nested: {value: 1}};
            const result = await model.Item.objectFromSchema({id: "x", source: "s", raw}, model.Model, {type: "fromDynamo"});

            expect(result.raw).to.be.an("object");
            expect(result.raw).to.eql(raw);
        });

        it("conforms a legacy string `raw` on read", async function () {
            const raw = "legacy raw payload";
            const result = await model.Item.objectFromSchema({id: "x", source: "s", raw}, model.Model, {type: "fromDynamo"});

            expect(result.raw).to.eql(raw);
        });
    });

    describe("recordToDynamoObject", function () {
        // NOTE-RT: `raw` is declared as `dynamoose.type.ANY`, so dynamoose never type-checks or
        // converts its nested content. Some sources (S3 YAML posts, in particular) parse straight
        // into native `Date` instances nested inside `raw`, which the AWS SDK's marshaller used to
        // reject with "Unsupported type passed: <Date>. Pass options.convertClassInstanceToMap=true...".
        it("sanitizes a native Date nested inside `raw` into a JSON-safe ISO string", function () {
            const stubDate = new Date("2019-01-14T23:17:45.000Z");
            const stubPost = Post.fromJS({
                id: "2019-01-14.yaml",
                source: "s3",
                raw: {id: "2019-01-14.yaml", dateCreated: stubDate, nested: {publishedAt: stubDate}}
            });

            const dynamoObject = recordToDynamoObject(stubPost);

            expect(dynamoObject.raw.dateCreated).to.eql(stubDate.toISOString());
            expect(dynamoObject.raw.nested.publishedAt).to.eql(stubDate.toISOString());
        });

        it("leaves a `raw` with no Date instances untouched", function () {
            const stubPost = Post.fromJS({
                id: "48223752322",
                source: "flickr",
                raw: {id: "48223752322", title: "Zoomin'"}
            });

            const dynamoObject = recordToDynamoObject(stubPost);

            expect(dynamoObject.raw).to.eql({id: "48223752322", title: "Zoomin'"});
        });

        it("omits `raw` entirely when it's not set, rather than sanitizing null/undefined", function () {
            const stubPost = Post.fromJS({id: "48223752322", source: "flickr"});

            const dynamoObject = recordToDynamoObject(stubPost);

            expect(dynamoObject.raw).to.eql(undefined);
        });

        it("derives public feed keys from visible posts and falls back to dateCreated", function () {
            const stubPost = Post.fromJS({
                id: "post",
                type: "Post",
                source: "s3",
                dateCreated: new Date("2024-01-02T03:04:05.006Z"),
                raw: {id: "post"}
            });

            expect(recordToDynamoObject(stubPost)).to.include({
                publicFeedPartition: "VISIBLE#Post#s3",
                publicFeedSort: "1704164645006#s3--@me/sep!-post"
            });

            const invalidPublicationDatePost = stubPost.set("datePublished", new Date("invalid"));
            expect(recordToDynamoObject(invalidPublicationDatePost).publicFeedSort).to.eql("1704164645006#s3--@me/sep!-post");
        });

        it("omits public feed keys for missing, invalid, or nonvisible properties", function () {
            const invalidPosts = [
                Post.fromJS({id: "missing-source", type: "Post"}),
                Post.fromJS({id: "invalid-date", type: "Post", source: "s3", dateCreated: new Date("invalid")}),
                Post.fromJS({id: "hidden", type: "Post", source: "s3", status: "HIDDEN", dateCreated: new Date()})
            ];

            invalidPosts.forEach(post => {
                const dynamoObject = recordToDynamoObject(post);
                expect(dynamoObject).not.to.have.any.keys("publicFeedPartition", "publicFeedSort");
            });
        });

        it("sorts chronology lexicographically and uses UID as the tie breaker", function () {
            const older = Post.fromJS({id: "z", type: "Post", source: "s3", dateCreated: new Date("2024-01-01T00:00:00.000Z")});
            const newer = Post.fromJS({id: "a", type: "Post", source: "s3", dateCreated: new Date("2024-01-02T00:00:00.000Z")});
            const tied = Post.fromJS({id: "a", type: "Post", source: "s3", dateCreated: new Date("2024-01-01T00:00:00.000Z")});

            const keys = [older, newer, tied].map(post => recordToDynamoObject(post).publicFeedSort);
            expect(keys.slice().sort()).to.eql([keys[2], keys[0], keys[1]]);
        });
    });

    describe("buildQueryWithFilter", function () {
        it("handles a simple query", function () {
            const stubQueryMethod = sinon.stub();
            const stubQueryMethodAnd = sinon.stub().returns(stubQueryMethod);
            const stubQueryMethodFilter = sinon.stub().returns(stubQueryMethod);
            const stubQueryMethodEq = sinon.stub().returns(stubQueryMethod);
            stubQueryMethod.and = stubQueryMethodAnd;
            stubQueryMethod.filter = stubQueryMethodFilter;
            stubQueryMethod.eq = stubQueryMethodEq;
            stubQueryMethod.returns(stubQueryMethod);

            const stubQuery = {"woof": "meow"};
            const stubOptions = {"grr": true};
            const stubQueryOptionsFilter = {
                _query: stubQuery,
                _options: stubOptions
            };

            const query = buildQueryWithFilter(stubQueryOptionsFilter, stubQueryMethod);

            expect(query).to.eql(stubQueryMethod);
            sinon.assert.calledWith(stubQueryMethod, stubQuery, stubOptions);
            sinon.assert.notCalled(stubQueryMethodAnd);
            sinon.assert.notCalled(stubQueryMethodFilter);
            sinon.assert.notCalled(stubQueryMethodEq);
        });

        it("simplifies an overlapping filter and query (shorthand hash)", function () {
            const stubQueryMethod = sinon.stub();
            const stubQueryMethodAnd = sinon.stub().returns(stubQueryMethod);
            const stubQueryMethodFilter = sinon.stub().returns(stubQueryMethod);
            const stubQueryMethodEq = sinon.stub().returns(stubQueryMethod);
            stubQueryMethod.and = stubQueryMethodAnd;
            stubQueryMethod.filter = stubQueryMethodFilter;
            stubQueryMethod.eq = stubQueryMethodEq;
            stubQueryMethod.returns(stubQueryMethod);

            const stubQuery = {"woof": "meow"};
            const stubOptions = {"grr": true};
            const stubFilter = stubQuery;
            const stubQueryOptionsFilter = {
                _query: stubQuery,
                _options: stubOptions,
                _filter: stubFilter
            };

            const query = buildQueryWithFilter(stubQueryOptionsFilter, stubQueryMethod);

            expect(query).to.eql(stubQueryMethod);
            sinon.assert.calledWith(stubQueryMethod, stubQuery, stubOptions);
            sinon.assert.notCalled(stubQueryMethodAnd);
            sinon.assert.notCalled(stubQueryMethodFilter);
            sinon.assert.notCalled(stubQueryMethodEq);
        });

        it("simplifies an overlapping filter and query (shorthand hash & range)", function () {
            const stubQueryMethod = sinon.stub();
            const stubQueryMethodAnd = sinon.stub().returns(stubQueryMethod);
            const stubQueryMethodFilter = sinon.stub().returns(stubQueryMethod);
            const stubQueryMethodEq = sinon.stub().returns(stubQueryMethod);
            stubQueryMethod.and = stubQueryMethodAnd;
            stubQueryMethod.filter = stubQueryMethodFilter;
            stubQueryMethod.eq = stubQueryMethodEq;
            stubQueryMethod.returns(stubQueryMethod);

            const stubQuery = {hash: {"woof": "meow"}, range: {"rawr": {"le": 0}}};
            const stubOptions = {"grr": true};
            const stubFilter = Object.assign({}, stubQuery.hash, stubQuery.range);
            const stubQueryOptionsFilter = {
                _query: stubQuery,
                _options: stubOptions,
                _filter: stubFilter
            };

            const query = buildQueryWithFilter(stubQueryOptionsFilter, stubQueryMethod);

            expect(query).to.eql(stubQueryMethod);
            sinon.assert.calledWith(stubQueryMethod, {...stubQuery.hash, ...stubQuery.range}, stubOptions);
            sinon.assert.notCalled(stubQueryMethodAnd);
            sinon.assert.notCalled(stubQueryMethodFilter);
            sinon.assert.notCalled(stubQueryMethodEq);
        });

        it("filters (primitive value)", function () {
            const stubQueryMethod = sinon.stub();
            const stubQueryMethodAnd = sinon.stub().returns(stubQueryMethod);
            const stubQueryMethodFilter = sinon.stub().returns(stubQueryMethod);
            const stubQueryMethodEq = sinon.stub().returns(stubQueryMethod);
            stubQueryMethod.and = stubQueryMethodAnd;
            stubQueryMethod.filter = stubQueryMethodFilter;
            stubQueryMethod.eq = stubQueryMethodEq;
            stubQueryMethod.returns(stubQueryMethod);

            const stubQuery = {hash: {"woof": "meow"}, range: {"rawr": {"le": 0}}};
            const stubOptions = {"grr": true};
            const stubFilter = {"argh": 1};
            const stubQueryOptionsFilter = {
                _query: stubQuery,
                _options: stubOptions,
                _filter: stubFilter
            };

            const query = buildQueryWithFilter(stubQueryOptionsFilter, stubQueryMethod);

            expect(query).to.eql(stubQueryMethod);
            sinon.assert.calledWith(stubQueryMethod, {...stubQuery.hash, ...stubQuery.range}, stubOptions);
            sinon.assert.calledOnce(stubQueryMethodAnd);
            sinon.assert.calledWith(stubQueryMethodFilter, Object.keys(stubFilter)[0]);
            sinon.assert.calledWith(stubQueryMethodEq, Object.values(stubFilter)[0]);
        });

        it("filters (object value)", function () {
            const stubQueryMethod = sinon.stub();
            const stubQueryMethodAnd = sinon.stub().returns(stubQueryMethod);
            const stubQueryMethodFilter = sinon.stub().returns(stubQueryMethod);
            const stubQueryMethodEq = sinon.stub().returns(stubQueryMethod);
            stubQueryMethod.and = stubQueryMethodAnd;
            stubQueryMethod.filter = stubQueryMethodFilter;
            stubQueryMethod.eq = stubQueryMethodEq;
            stubQueryMethod.returns(stubQueryMethod);

            const stubQuery = {hash: {"woof": "meow"}, range: {"rawr": {"le": 0}}};
            const stubOptions = {"grr": true};
            const stubFilter = {"argh": {ugh: "blah"}};
            const stubQueryOptionsFilter = {
                _query: stubQuery,
                _options: stubOptions,
                _filter: stubFilter
            };

            const stubFilterOperator = Object.keys(Object.values(stubFilter)[0])[0];
            const stubQueryMethodFilterOperator = sinon.stub().returns(stubQueryMethod);
            stubQueryMethod[stubFilterOperator] = stubQueryMethodFilterOperator;

            const query = buildQueryWithFilter(stubQueryOptionsFilter, stubQueryMethod);

            expect(query).to.eql(stubQueryMethod);
            sinon.assert.calledWith(stubQueryMethod, {...stubQuery.hash, ...stubQuery.range}, stubOptions);
            sinon.assert.calledOnce(stubQueryMethodAnd);
            sinon.assert.calledWith(stubQueryMethodFilter, Object.keys(stubFilter)[0]);
            sinon.assert.notCalled(stubQueryMethodEq);
            sinon.assert.calledWith(stubQueryMethodFilterOperator, Object.values(Object.values(stubFilter)[0])[0]);
        });

        it("filters (primitive and object value)", function () {
            const stubQueryMethod = sinon.stub();
            const stubQueryMethodAnd = sinon.stub().returns(stubQueryMethod);
            const stubQueryMethodFilter = sinon.stub().returns(stubQueryMethod);
            const stubQueryMethodEq = sinon.stub().returns(stubQueryMethod);
            stubQueryMethod.and = stubQueryMethodAnd;
            stubQueryMethod.filter = stubQueryMethodFilter;
            stubQueryMethod.eq = stubQueryMethodEq;
            stubQueryMethod.returns(stubQueryMethod);

            const stubQuery = {hash: {"woof": "meow"}, range: {"rawr": {"le": 0}}};
            const stubOptions = {"grr": true};
            const stubFilter = {"argh": {ugh: "blah"}, "foo": 1};
            const stubQueryOptionsFilter = {
                _query: stubQuery,
                _options: stubOptions,
                _filter: stubFilter
            };

            const stubFilterOperator = Object.keys(Object.values(stubFilter)[0])[0];
            const stubQueryMethodFilterOperator = sinon.stub().returns(stubQueryMethod);
            stubQueryMethod[stubFilterOperator] = stubQueryMethodFilterOperator;

            const query = buildQueryWithFilter(stubQueryOptionsFilter, stubQueryMethod);

            expect(query).to.eql(stubQueryMethod);
            sinon.assert.calledWith(stubQueryMethod, {...stubQuery.hash, ...stubQuery.range}, stubOptions);
            sinon.assert.calledTwice(stubQueryMethodAnd);
            sinon.assert.calledWith(stubQueryMethodFilter, Object.keys(stubFilter)[0]);
            sinon.assert.calledWith(stubQueryMethodFilter, Object.keys(stubFilter)[1]);
            sinon.assert.calledWith(stubQueryMethodEq, stubFilter.foo);
            sinon.assert.calledWith(stubQueryMethodFilterOperator, Object.values(Object.values(stubFilter)[0])[0]);
        });
    });

    describe("applyScanQueryOptions", function () {
        it("sorts query results in the requested direction", function () {
            const query = {
                sort: sinon.stub().returnsThis(),
                using: sinon.stub().returnsThis(),
                startAt: sinon.stub().returnsThis()
            };

            applyScanQueryOptions(query, {descending: false, indexName: "type-datePublished-index"});

            sinon.assert.calledWith(query.sort, "ascending");
            sinon.assert.calledWith(query.using, "type-datePublished-index");
        });

        it("does not sort scans", function () {
            const scan = {using: sinon.stub().returnsThis(), startAt: sinon.stub().returnsThis()};

            expect(applyScanQueryOptions(scan, {descending: true})).to.eql(scan);
        });
    });

    describe("DynamooseModel#getRecords", function () {
        it("continues raw pages until transformed records fill the requested limit", async function () {
            const firstPage = [
                {uid: "invalid", valid: false},
                {uid: "first", valid: true}
            ];
            firstPage.lastKey = {uid: "first"};
            const secondPage = [
                {uid: "first", valid: true},
                {uid: "second", valid: true}
            ];
            const retriever = {
                and: sinon.stub().returnsThis(),
                filter: sinon.stub().returnsThis(),
                eq: sinon.stub().returnsThis(),
                sort: sinon.stub().returnsThis(),
                startAt: sinon.stub().returnsThis(),
                limit: sinon.stub().returnsThis(),
                exec: sinon.stub().onFirstCall().resolves(firstPage).onSecondCall().resolves(secondPage)
            };
            const model = Object.create(DynamooseModel.prototype);
            model.dynamooseModel = {query: sinon.stub().returns(retriever)};

            const records = await model.getRecords({
                _query: {type: {eq: "Photo"}},
                _options: {
                    descending: true,
                    limit: 2,
                    recordValidator: record => record.valid ? record : null
                }
            });

            expect(records.map(record => record.uid)).to.eql(["first", "second"]);
            expect(retriever.exec.calledTwice).to.eql(true);
        });
    });
});
