import {expect} from "chai";
import PostalAddress from "../../../../src/lib/postalAddress";

describe("PostalAddress", function () {
    describe("constructor", function () {
        it("returns a PostalAddress", function () {
            const stubLocation = {
                streetAddress: "woof",
                postalCode: "meow",
                addressLocality: "grr",
                addressCountry: "CA",
                addressRegion: "BC"
            };
            const location = new PostalAddress(stubLocation);

            expect(location).to.be.instanceOf(PostalAddress);
            expect(location.address).to.eql(stubLocation.streetAddress);
            expect(location.postalCode).to.eql(stubLocation.postalCode);
            expect(location.city).to.eql(stubLocation.addressLocality);
            expect(location.countryCode).to.eql(stubLocation.addressCountry);
            expect(location.region).to.eql(stubLocation.addressRegion);
        });
    });

    describe(".fromJS", function () {
        it("returns a PostalAddress", function () {
            const stubLocation = {
                streetAddress: "woof",
                postalCode: "meow",
                addressLocality: "grr",
                addressCountry: "CA",
                addressRegion: "BC"
            };
            const location = PostalAddress.fromJS(stubLocation);

            expect(location).to.be.instanceOf(PostalAddress);
            expect(location.address).to.eql(stubLocation.streetAddress);
            expect(location.postalCode).to.eql(stubLocation.postalCode);
            expect(location.city).to.eql(stubLocation.addressLocality);
            expect(location.countryCode).to.eql(stubLocation.addressCountry);
            expect(location.region).to.eql(stubLocation.addressRegion);
        });
    });

    describe(".fromJSON", function () {
        it("returns a PostalAddress", function () {
            const stubLocation = {
                streetAddress: "woof",
                postalCode: "meow",
                addressLocality: "grr",
                addressCountry: "CA",
                addressRegion: "BC"
            };
            const location = PostalAddress.fromJSON(stubLocation);

            expect(location).to.be.instanceOf(PostalAddress);
            expect(location.address).to.eql(stubLocation.streetAddress);
            expect(location.postalCode).to.eql(stubLocation.postalCode);
            expect(location.city).to.eql(stubLocation.addressLocality);
            expect(location.countryCode).to.eql(stubLocation.addressCountry);
            expect(location.region).to.eql(stubLocation.addressRegion);
        });
    });

    describe(".fromResume", function () {
        it("returns a PostalAddress", function () {
            const stubLocation = {
                address: "woof",
                postalCode: "meow",
                city: "grr",
                countryCode: "CA",
                region: "BC"
            };
            const location = PostalAddress.fromResume(stubLocation);

            expect(location).to.be.instanceOf(PostalAddress);
            expect(location.address).to.eql(stubLocation.address);
            expect(location.postalCode).to.eql(stubLocation.postalCode);
            expect(location.city).to.eql(stubLocation.city);
            expect(location.countryCode).to.eql(stubLocation.countryCode);
            expect(location.region).to.eql(stubLocation.region);
        });
    });
});
