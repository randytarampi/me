import {compositeKeySeparator} from "@randy.tarampi/js";
import {expect} from "chai";
import AuthInfoSearchParams from "../../../../src/lib/authInfoSearchParams";

describe("AuthInfoSearchParams", function () {
    describe("Dynamoose", function () {
        it("should properly format properties for uid", function () {
            const searchParams = new AuthInfoSearchParams({uid: `meow${compositeKeySeparator}woof`});

            expect(searchParams.Dynamoose).to.eql({
                _filter: {},
                _query: {
                    hash: {source: {eq: "meow"}},
                    range: {id: {eq: "woof"}}
                },
                _options: {descending: true, all: false}
            });
        });

        it("should properly format properties for source", function () {
            const searchParams = new AuthInfoSearchParams({source: "meow"});

            expect(searchParams.Dynamoose).to.eql({
                _filter: {
                    source: "meow"
                },
                _query: {
                    hash: {source: {eq: "meow"}}
                },
                _options: {descending: true, all: false}
            });
        });

        it("should properly format properties for source & id", function () {
            const searchParams = new AuthInfoSearchParams({source: "meow", id: "woof"});

            expect(searchParams.Dynamoose).to.eql({
                _filter: {id: searchParams.id, source: searchParams.source},
                _query: {
                    hash: {source: {eq: searchParams.source}},
                    range: {id: {eq: searchParams.id}}
                },
                _options: {descending: true, all: false}
            });
        });

        it("`orderBy` ascending", function () {
            const searchParams = new AuthInfoSearchParams({type: "meow", orderBy: "ascending"});

            expect(searchParams.Dynamoose).to.eql({
                _filter: {
                    type: "meow"
                },
                _options: {descending: false, all: false}
            });
        });

        it("defaults to `filter`", function () {
            const searchParams = new AuthInfoSearchParams({type: "meow"});

            expect(searchParams.Dynamoose).to.eql({
                _filter: {
                    type: "meow"
                },
                _options: {descending: true, all: false}
            });
        });
    });

    describe("OAuth", function () {
        it("should properly format properties", function () {
            const searchParams = new AuthInfoSearchParams({
                code: "woof",
                clientId: "meow",
                clientSecret: "grr",
                grantType: "rawr",
                redirectUri: "arf",
                state: "yip"
            });

            expect(searchParams.OAuth).to.eql({
                code: searchParams.code,
                client_id: searchParams.clientId,
                client_secret: searchParams.clientSecret,
                grant_type: searchParams.grantType,
                redirect_uri: searchParams.redirectUri,
                state: searchParams.state
            });
        });
    });
});
