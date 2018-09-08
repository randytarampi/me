import {expect} from "chai";
import Location from "../../../lib/location";
import Person from "../../../lib/person";

describe("Person", function () {
    let stubPersonJs;

    beforeEach(function () {
        stubPersonJs = {
            name: null,
            firstName: "Woof",
            lastName: "Woof",
            worksFor: null,
            jobTitle: null,
            label: "Woof",
            picture: null,
            email: "woof@randytarampi.ca",
            phone: "+1234567890",
            website: "woof.woof/woof",
            summary: "Woof woof woof",
            location: {
                address: "woof",
                postalCode: "meow",
                city: "grr",
                countryCode: "CA",
                region: "BC"
            }
        };
    });

    describe("constructor", function () {
        it("returns a Person", function () {
            const person = new Person({
                ...stubPersonJs,
                location: Location.fromJS(stubPersonJs.location)
            });

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.location).to.be.instanceOf(Location);
            expect(person.email).to.eql(stubPersonJs.email);
            expect(person.phone).to.eql(stubPersonJs.phone);
        });
    });

    describe(".fromJS", function () {
        it("returns a Person", function () {
            const person = Person.fromJS(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.location).to.be.instanceOf(Location);
            expect(person.email).to.eql(stubPersonJs.email);
            expect(person.phone).to.eql(stubPersonJs.phone);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Person", function () {
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.location).to.be.instanceOf(Location);
            expect(person.email).to.eql(stubPersonJs.email);
            expect(person.phone).to.eql(stubPersonJs.phone);
        });
    });

    describe("#name", function () {
        it("returns a `${firstName} ${lastName}`", function () {
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.name).to.eql(`${stubPersonJs.firstName} ${stubPersonJs.lastName}`);
        });

        it("returns `name` instead of `${firstName} ${lastName}`", function () {
            stubPersonJs.name = "Meow Meow";
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.name).to.eql(stubPersonJs.name);
        });

        it("returns `null` if there are no names ", function () {
            delete stubPersonJs.firstName;
            delete stubPersonJs.lastName;
            delete stubPersonJs.name;
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.name).to.eql(null);
        });
    });

    describe("#address", function () {
        it("returns address", function () {
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.address).to.eql(stubPersonJs.location.address);
        });

        it("returns `null` if no `location", function () {
            delete stubPersonJs.location;
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.address).to.eql(null);
        });
    });

    describe("#city", function () {
        it("returns city", function () {
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.city).to.eql(stubPersonJs.location.city);
        });

        it("returns `null` if no `location", function () {
            delete stubPersonJs.location;
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.city).to.eql(null);
        });
    });

    describe("#region", function () {
        it("returns region", function () {
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.region).to.eql(stubPersonJs.location.region);
        });

        it("returns `null` if no `location", function () {
            delete stubPersonJs.location;
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.region).to.eql(null);
        });
    });

    describe("#postalCode", function () {
        it("returns postalCode", function () {
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.postalCode).to.eql(stubPersonJs.location.postalCode);
        });

        it("returns `null` if no `location", function () {
            delete stubPersonJs.location;
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.postalCode).to.eql(null);
        });
    });

    describe("#countryCode", function () {
        it("returns countryCode", function () {
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.countryCode).to.eql(stubPersonJs.location.countryCode);
        });

        it("returns `null` if no `location", function () {
            delete stubPersonJs.location;
            const person = Person.fromJSON(stubPersonJs);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.countryCode).to.eql(null);
        });
    });
});
