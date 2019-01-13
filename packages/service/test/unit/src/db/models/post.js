import {expect} from "chai";
import sinon from "sinon";
import {buildQueryWithFilter} from "../../../../../src/db/models/post";

describe("Post", function () {
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
            sinon.assert.calledWith(stubQueryMethod, stubQuery, stubOptions);
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
            sinon.assert.calledWith(stubQueryMethod, stubQuery, stubOptions);
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
            sinon.assert.calledWith(stubQueryMethod, stubQuery, stubOptions);
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
            sinon.assert.calledWith(stubQueryMethod, stubQuery, stubOptions);
            sinon.assert.calledTwice(stubQueryMethodAnd);
            sinon.assert.calledWith(stubQueryMethodFilter, Object.keys(stubFilter)[0]);
            sinon.assert.calledWith(stubQueryMethodFilter, Object.keys(stubFilter)[1]);
            sinon.assert.calledWith(stubQueryMethodEq, stubFilter.foo);
            sinon.assert.calledWith(stubQueryMethodFilterOperator, Object.values(Object.values(stubFilter)[0])[0]);
        });
    });
});
