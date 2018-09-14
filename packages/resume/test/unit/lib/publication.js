import {expect} from "chai";
import {DateTime} from "luxon";
import Publication from "../../../lib/publication";

describe("Publication", function () {
    let stubPublicationJs;

    beforeEach(function () {
        stubPublicationJs = {
            name: "Woof",
            publisher: "Meow",
            releaseDate: "2018-09-14",
            summary: "Grr",
            url: "rawr://rawr.rawr/rawr"
        };
    });

    describe("constructor", function () {
        it("returns a Publication", function () {
            const publication = new Publication({
                ...stubPublicationJs,
                releaseDate: DateTime.fromISO(stubPublicationJs.releaseDate)
            });

            expect(publication).to.be.ok;
            expect(publication).to.be.instanceOf(Publication);
            expect(publication.name).to.eql(stubPublicationJs.name);
            expect(publication.publisher).to.eql(stubPublicationJs.publisher);
            expect(publication.releaseDate).to.be.instanceOf(DateTime);
            expect(publication.releaseDate).to.eql(DateTime.fromISO(stubPublicationJs.releaseDate));
            expect(publication.summary).to.eql(stubPublicationJs.summary);
            expect(publication.url).to.eql(stubPublicationJs.url);
        });

        it("returns an empty Publication", function () {
            const publication = new Publication();

            expect(publication).to.be.ok;
            expect(publication).to.be.instanceOf(Publication);
            expect(publication.releaseDate).to.eql(null);
        });
    });

    describe(".fromJS", function () {
        it("returns a Publication", function () {
            const publication = Publication.fromJS({
                ...stubPublicationJs,
                releaseDate: DateTime.fromISO(stubPublicationJs.releaseDate).toJSDate()
            });

            expect(publication).to.be.ok;
            expect(publication).to.be.instanceOf(Publication);
            expect(publication.name).to.eql(stubPublicationJs.name);
            expect(publication.publisher).to.eql(stubPublicationJs.publisher);
            expect(publication.releaseDate).to.be.instanceOf(DateTime);
            expect(publication.releaseDate).to.eql(DateTime.fromISO(stubPublicationJs.releaseDate));
            expect(publication.summary).to.eql(stubPublicationJs.summary);
            expect(publication.url).to.eql(stubPublicationJs.url);
        });

        it("returns an empty Publication", function () {
            const publication = Publication.fromJS();

            expect(publication).to.be.ok;
            expect(publication).to.be.instanceOf(Publication);
            expect(publication.releaseDate).to.eql(null);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Publication", function () {
            const publication = Publication.fromJSON({
                ...stubPublicationJs
            });

            expect(publication).to.be.ok;
            expect(publication).to.be.instanceOf(Publication);
            expect(publication.name).to.eql(stubPublicationJs.name);
            expect(publication.publisher).to.eql(stubPublicationJs.publisher);
            expect(publication.releaseDate).to.be.instanceOf(DateTime);
            expect(publication.releaseDate).to.eql(DateTime.fromISO(stubPublicationJs.releaseDate));
            expect(publication.summary).to.eql(stubPublicationJs.summary);
            expect(publication.url).to.eql(stubPublicationJs.url);
        });

        it("returns an empty Publication", function () {
            const publication = Publication.fromJSON();

            expect(publication).to.be.ok;
            expect(publication).to.be.instanceOf(Publication);
            expect(publication.releaseDate).to.eql(null);
        });
    });

    describe(".fromResume", function () {
        it("returns a Publication", function () {
            const publication = Publication.fromResume({
                ...stubPublicationJs
            });

            expect(publication).to.be.ok;
            expect(publication).to.be.instanceOf(Publication);
            expect(publication.name).to.eql(stubPublicationJs.name);
            expect(publication.publisher).to.eql(stubPublicationJs.publisher);
            expect(publication.releaseDate).to.be.instanceOf(DateTime);
            expect(publication.releaseDate).to.eql(DateTime.fromISO(stubPublicationJs.releaseDate));
            expect(publication.summary).to.eql(stubPublicationJs.summary);
            expect(publication.url).to.eql(stubPublicationJs.url);
        });

        it("returns an empty Publication", function () {
            const publication = Publication.fromResume();

            expect(publication).to.be.ok;
            expect(publication).to.be.instanceOf(Publication);
            expect(publication.releaseDate).to.eql(null);
        });
    });
});
