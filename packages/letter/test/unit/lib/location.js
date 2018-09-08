import {expect} from "chai";
import Location from "../../../lib/location";

describe("Location", function () {
    describe("constructor", function () {
        it("returns a Location", function () {
            const stubLocation = {
                address: "woof",
                postalCode: "meow",
                city: "grr",
                countryCode: "CA",
                region: "BC"
            };
            const location = new Location(stubLocation);

            expect(location).to.be.ok;
            expect(location).to.be.instanceOf(Location);
            expect(location.address).to.eql(stubLocation.address);
            expect(location.postalCode).to.eql(stubLocation.postalCode);
            expect(location.city).to.eql(stubLocation.city);
            expect(location.countryCode).to.eql(stubLocation.countryCode);
            expect(location.region).to.eql(stubLocation.region);
        });
    });

    describe(".fromJS", function () {
        it("returns a Location", function () {
            const stubLocation = {
                address: "woof",
                postalCode: "meow",
                city: "grr",
                countryCode: "CA",
                region: "BC"
            };
            const location = Location.fromJS(stubLocation);

            expect(location).to.be.ok;
            expect(location).to.be.instanceOf(Location);
            expect(location.address).to.eql(stubLocation.address);
            expect(location.postalCode).to.eql(stubLocation.postalCode);
            expect(location.city).to.eql(stubLocation.city);
            expect(location.countryCode).to.eql(stubLocation.countryCode);
            expect(location.region).to.eql(stubLocation.region);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Location", function () {
            const stubLocation = {
                address: "woof",
                postalCode: "meow",
                city: "grr",
                countryCode: "CA",
                region: "BC"
            };
            const location = Location.fromJSON(stubLocation);

            expect(location).to.be.ok;
            expect(location).to.be.instanceOf(Location);
            expect(location.address).to.eql(stubLocation.address);
            expect(location.postalCode).to.eql(stubLocation.postalCode);
            expect(location.city).to.eql(stubLocation.city);
            expect(location.countryCode).to.eql(stubLocation.countryCode);
            expect(location.region).to.eql(stubLocation.region);
        });
    });
});
