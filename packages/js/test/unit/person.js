import {expect} from "chai";
import Person from "../../lib/person";
import PostalAddress from "../../lib/postalAddress";

describe("Person", function () {
    let stubPersonJson;
    let stubPersonResumeJson;

    beforeEach(function () {
        stubPersonResumeJson = {
            name: null,
            firstName: "Woof",
            lastName: "Woof",
            label: "Woof",
            picture: "Woof",
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
            },
            profiles: [
                {network: "woof", username: "woof", url: null},
                {network: "meow", username: null, url: "meow://meow.meow"}
            ]
        };

        stubPersonJson = Object.assign({}, stubPersonResumeJson, {
            jobTitle: stubPersonResumeJson.label,
            telephone: stubPersonResumeJson.phone,
            url: stubPersonResumeJson.website,
            description: stubPersonResumeJson.summary,
            image: stubPersonResumeJson.picture,
            address: {
                streetAddress: stubPersonResumeJson.location.address,
                postalCode: stubPersonResumeJson.location.postalCode,
                addressLocality: stubPersonResumeJson.location.city,
                addressCountry: stubPersonResumeJson.location.countryCode,
                addressRegion: stubPersonResumeJson.location.region
            },
            profiles: [
                {network: "woof", username: "woof", url: null},
                {network: "meow", username: null, url: "meow://meow.meow"}
            ]
        });
    });

    describe("constructor", function () {
        it("returns a Person", function () {
            const person = new Person({
                ...stubPersonJson,
                address: PostalAddress.fromJS(stubPersonJson.address)
            });

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.location).to.be.instanceOf(PostalAddress);
            expect(person.email).to.eql(stubPersonJson.email);
            expect(person.phone).to.eql(stubPersonJson.telephone);
            expect(person.website).to.eql(stubPersonJson.url);
            expect(person.picture).to.eql(stubPersonJson.image);
            expect(person.summary).to.eql(stubPersonJson.description);
        });
    });

    describe(".fromJS", function () {
        it("returns a Person", function () {
            const person = Person.fromJS(stubPersonJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.location).to.be.instanceOf(PostalAddress);
            expect(person.email).to.eql(stubPersonJson.email);
            expect(person.phone).to.eql(stubPersonJson.telephone);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Person", function () {
            const person = Person.fromJSON(stubPersonJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.location).to.be.instanceOf(PostalAddress);
            expect(person.email).to.eql(stubPersonJson.email);
            expect(person.phone).to.eql(stubPersonJson.telephone);
        });
    });

    describe(".fromResume", function () {
        it("returns a Person", function () {
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.location).to.be.instanceOf(PostalAddress);
            expect(person.email).to.eql(stubPersonJson.email);
            expect(person.phone).to.eql(stubPersonJson.telephone);
        });
    });

    describe("#toResume", function () {
        it("returns a Person", function () {
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.toResume()).to.eql({
                ...stubPersonResumeJson,
                name: person.name
            });
        });
    });

    describe("#name", function () {
        it("returns a `${firstName} ${lastName}`", function () {
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.name).to.eql(`${stubPersonResumeJson.firstName} ${stubPersonResumeJson.lastName}`);
        });

        it("returns `name` instead of `${firstName} ${lastName}`", function () {
            stubPersonResumeJson.name = "Meow Meow";
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.name).to.eql(stubPersonResumeJson.name);
        });

        it("returns `null` if there are no names ", function () {
            delete stubPersonResumeJson.firstName;
            delete stubPersonResumeJson.lastName;
            delete stubPersonResumeJson.name;
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.name).to.eql(null);
        });
    });

    describe("#address", function () {
        it("returns address", function () {
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.address).to.eql(stubPersonResumeJson.location.address);
        });

        it("returns `null` if no `location", function () {
            delete stubPersonResumeJson.location;
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.address).to.eql(null);
        });
    });

    describe("#city", function () {
        it("returns city", function () {
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.city).to.eql(stubPersonResumeJson.location.city);
        });

        it("returns `null` if no `location", function () {
            delete stubPersonResumeJson.location;
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.city).to.eql(null);
        });
    });

    describe("#region", function () {
        it("returns region", function () {
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.region).to.eql(stubPersonResumeJson.location.region);
        });

        it("returns `null` if no `location", function () {
            delete stubPersonResumeJson.location;
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.region).to.eql(null);
        });
    });

    describe("#postalCode", function () {
        it("returns postalCode", function () {
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.postalCode).to.eql(stubPersonResumeJson.location.postalCode);
        });

        it("returns `null` if no `location", function () {
            delete stubPersonResumeJson.location;
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.postalCode).to.eql(null);
        });
    });

    describe("#countryCode", function () {
        it("returns countryCode", function () {
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.countryCode).to.eql(stubPersonResumeJson.location.countryCode);
        });

        it("returns `null` if no `location", function () {
            delete stubPersonResumeJson.location;
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.countryCode).to.eql(null);
        });
    });
});
