import {expect} from "chai";
import fetch from "isomorphic-fetch";
import sinon from "sinon";
import client, {__getFetchFunction, __setFetchFunction} from "../../../blog/me.service.client";

describe("me.service.client", function () {
    beforeEach(function () {
        __setFetchFunction(sinon.stub().callsFake(() => Promise.resolve({
            json: () => ["woof"]
        })));
    });

    afterEach(function () {
        __setFetchFunction(fetch);
    });

    it("delegates to fetch", function () {
        const stubUrl = "woof://woof/woof";
        const stubPage = 1;

        return client(stubUrl, stubPage)
            .then(posts => {
                expect(posts).to.be.ok;
                expect(posts).to.be.instanceof(Array);
                expect(posts).to.eql(["woof"]);

                expect(__getFetchFunction().calledOnce).to.eql(true);
                expect(__getFetchFunction().calledWith(`${stubUrl}?page=${stubPage}`)).to.eql(true);
            });
    });

    it("handles unexpected successful responses", function () {
        __setFetchFunction(sinon.stub().callsFake(() => Promise.resolve({
            json: () => "woof"
        })));

        const stubUrl = "woof://woof/woof";
        const stubPage = 1;
        return client(stubUrl, stubPage)
            .then(posts => {
                expect(posts).to.be.ok;
                expect(posts).to.be.instanceof(Array);
                expect(posts).to.eql([]);

                expect(__getFetchFunction().calledOnce).to.eql(true);
            });
    });

    it("handles fetch errors", function () {
        __setFetchFunction(sinon.stub().callsFake(() => Promise.reject(new Error("Woof"))));

        const stubUrl = "woof://woof/woof";
        const stubPage = 1;
        return client(stubUrl, stubPage)
            .then(posts => {
                expect(posts).to.be.ok;
                expect(posts).to.be.instanceof(Array);
                expect(posts).to.eql([]);

                expect(__getFetchFunction().calledOnce).to.eql(true);
            });
    });
});
