import {expect} from "chai";
import {formatNumber} from "libphonenumber-js";
import Person from "../../lib/person";
import PostalAddress from "../../lib/postalAddress";

describe("Person", function () {
    let stubPersonJson;
    let stubPersonResumeJson;

    beforeEach(function () {
        stubPersonResumeJson = {
            name: "Woof Woof Woof",
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

        stubPersonJson = {
            additionalName: "Woof Woof Woof",
            dateOfBirth: "1991-11-14",
            birthPlace: {
                name: "Simpson residence",
                address: {
                    streetAddress: "742 Evergreen Terrace",
                    addressLocality: "Springfield",
                    addressCountry: "USA"
                }
            },
            brand: {
                name: "Woof Woof Woof",
                email: stubPersonResumeJson.email,
                telephone: stubPersonResumeJson.phone,
                faxNumber: stubPersonResumeJson.phone,
                url: stubPersonResumeJson.website,
                description: stubPersonResumeJson.summary,
                image: stubPersonResumeJson.picture,
                address: {
                    streetAddress: stubPersonResumeJson.location.address,
                    postalCode: stubPersonResumeJson.location.postalCode,
                    addressLocality: stubPersonResumeJson.location.city,
                    addressCountry: stubPersonResumeJson.location.countryCode,
                    addressRegion: stubPersonResumeJson.location.region
                }
            },
            knowsAbout: [
                "Woofs",
                "Meows",
                "Grrs",
                "Rawrs"
            ],
            knowsLanguage: [
                "Javascript"
            ],
            sameAs: [
                "woof://woof.woof/woof"
            ],
            jobTitle: stubPersonResumeJson.label,
            worksFor: {
                name: "Woof"
            },
            alumniOf: {
                name: "Meow"
            },
            email: stubPersonResumeJson.email,
            telephone: stubPersonResumeJson.phone,
            faxNumber: stubPersonResumeJson.phone,
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
        };
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
            expect(person.phone).to.eql(formatNumber(stubPersonJson.telephone, "International"));
            expect(person.fax).to.eql(formatNumber(stubPersonJson.faxNumber, "International"));
            expect(person.website).to.eql(stubPersonJson.url);
            expect(person.picture).to.eql(stubPersonJson.image);
            expect(person.summary).to.eql(stubPersonJson.description);
            expect(person.label).to.eql(stubPersonJson.jobTitle);
            expect(person.name).to.eql(stubPersonJson.additionalName);
        });

        it("returns an empty Person", function () {
            const person = new Person();

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
        });
    });

    describe(".fromJS", function () {
        it("returns a Person", function () {
            const person = Person.fromJS(stubPersonJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.location).to.be.instanceOf(PostalAddress);
            expect(person.email).to.eql(stubPersonJson.email);
            expect(person.phone).to.eql(formatNumber(stubPersonJson.telephone, "International"));
            expect(person.fax).to.eql(formatNumber(stubPersonJson.faxNumber, "International"));
            expect(person.website).to.eql(stubPersonJson.url);
            expect(person.picture).to.eql(stubPersonJson.image);
            expect(person.summary).to.eql(stubPersonJson.description);
            expect(person.label).to.eql(stubPersonJson.jobTitle);
            expect(person.name).to.eql(stubPersonJson.additionalName);
        });

        it("returns an empty Person", function () {
            const person = Person.fromJS();

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Person", function () {
            const person = Person.fromJSON(stubPersonJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.location).to.be.instanceOf(PostalAddress);
            expect(person.email).to.eql(stubPersonJson.email);
            expect(person.phone).to.eql(formatNumber(stubPersonJson.telephone, "International"));
            expect(person.fax).to.eql(formatNumber(stubPersonJson.faxNumber, "International"));
            expect(person.website).to.eql(stubPersonJson.url);
            expect(person.picture).to.eql(stubPersonJson.image);
            expect(person.summary).to.eql(stubPersonJson.description);
            expect(person.label).to.eql(stubPersonJson.jobTitle);
            expect(person.name).to.eql(stubPersonJson.additionalName);
        });

        it("returns an empty Person", function () {
            const person = Person.fromJSON();

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
        });
    });

    describe(".fromResume", function () {
        it("returns a Person", function () {
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.location).to.be.instanceOf(PostalAddress);
            expect(person.email).to.eql(stubPersonJson.email);
            expect(person.phone).to.eql(formatNumber(stubPersonResumeJson.phone, "International"));
            expect(person.fax).to.eql(null);
            expect(person.website).to.eql(stubPersonResumeJson.website);
            expect(person.picture).to.eql(stubPersonResumeJson.picture);
            expect(person.summary).to.eql(stubPersonResumeJson.summary);
            expect(person.label).to.eql(stubPersonResumeJson.label);
            expect(person.name).to.eql(stubPersonResumeJson.name);
        });

        it("returns an empty Person", function () {
            const person = Person.fromResume();

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
        });
    });

    describe("#toResume", function () {
        it("returns expected Resume JSON", function () {
            const person = Person.fromResume(stubPersonResumeJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);

            const resumeJson = person.toResume();

            expect(resumeJson).to.eql({
                ...stubPersonResumeJson,
                phone: formatNumber(stubPersonResumeJson.phone, "International"),
                name: person.name
            });
        });

        it("returns some empty Resume JSON", function () {
            const person = Person.fromResume();

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);

            const resumeJson = person.toResume();

            expect(resumeJson).to.eql({
                email: null,
                firstName: null,
                label: null,
                lastName: null,
                location: null,
                name: null,
                phone: null,
                picture: null,
                profiles: null,
                summary: null,
                website: null
            });
        });
    });

    describe("#toSchema", function () {
        it("returns expected Schema.org JSON", function () {
            const person = Person.fromJSON(stubPersonJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);

            const schemaJson = person.toSchema();

            expect(schemaJson).to.eql({
                additionalName: "Woof Woof Woof",
                address: {
                    addressCountry: "CA",
                    addressLocality: "grr",
                    addressRegion: "BC",
                    countryCode: null,
                    postOfficeBoxNumber: null,
                    postalCode: "meow",
                    streetAddress: "woof"
                },
                alumniOf: {
                    additionalName: null,
                    address: null,
                    description: null,
                    brand: null,
                    email: null,
                    faxNumber: null,
                    image: null,
                    knowsAbout: null,
                    knowsLanguage: null,
                    logo: null,
                    name: "Meow",
                    sameAs: null,
                    telephone: null,
                    url: null
                },
                birthPlace: {
                    additionalName: null,
                    address: {
                        addressCountry: "USA",
                        addressLocality: "Springfield",
                        addressRegion: null,
                        countryCode: null,
                        postOfficeBoxNumber: null,
                        postalCode: null,
                        streetAddress: "742 Evergreen Terrace"
                    },
                    description: null,
                    email: null,
                    faxNumber: null,
                    image: null,
                    knowsAbout: null,
                    knowsLanguage: null,
                    logo: null,
                    name: "Simpson residence",
                    sameAs: null,
                    telephone: null,
                    url: null
                },
                brand: {
                    additionalName: null,
                    brand: null,
                    address: {
                        addressCountry: "CA",
                        addressLocality: "grr",
                        addressRegion: "BC",
                        countryCode: null,
                        postOfficeBoxNumber: null,
                        postalCode: "meow",
                        streetAddress: "woof"
                    },
                    description: "Woof woof woof",
                    email: "woof@randytarampi.ca",
                    faxNumber: "+1234567890",
                    image: "Woof",
                    knowsAbout: null,
                    knowsLanguage: null,
                    logo: null,
                    name: "Woof Woof Woof",
                    sameAs: null,
                    telephone: "+1234567890",
                    url: "woof.woof/woof"
                },
                dateOfBirth: "1991-11-14",
                description: "Woof woof woof",
                email: "woof@randytarampi.ca",
                familyName: null,
                faxNumber: "+1234567890",
                gender: null,
                givenName: null,
                height: null,
                honorificPrefix: null,
                honorificSuffix: null,
                image: "Woof",
                jobTitle: "Woof",
                knowsAbout: [
                    "Woofs",
                    "Meows",
                    "Grrs",
                    "Rawrs"
                ],
                knowsLanguage: [
                    "Javascript"
                ],
                logo: null,
                name: null,
                nationality: null,
                profiles: [
                    {
                        id: null,
                        image: null,
                        name: null,
                        network: "woof",
                        url: null,
                        username: "woof"
                    },
                    {
                        id: null,
                        image: null,
                        name: null,
                        network: "meow",
                        url: "meow://meow.meow",
                        username: null
                    }
                ],
                sameAs: [
                    "woof://woof.woof/woof"
                ],
                telephone: "+1234567890",
                url: "woof.woof/woof",
                weight: null,
                worksFor: {
                    additionalName: null,
                    brand: null,
                    address: null,
                    description: null,
                    email: null,
                    faxNumber: null,
                    image: null,
                    knowsAbout: null,
                    knowsLanguage: null,
                    logo: null,
                    name: "Woof",
                    sameAs: null,
                    telephone: null,
                    url: null
                }
            });
        });

        it("returns some empty Schema.org JSON", function () {
            const person = Person.fromJSON();

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);

            const schemaJson = person.toSchema();

            expect(schemaJson).to.eql({
                additionalName: null,
                address: null,
                alumniOf: null,
                birthPlace: null,
                brand: null,
                dateOfBirth: null,
                description: null,
                email: null,
                familyName: null,
                faxNumber: null,
                gender: null,
                givenName: null,
                height: null,
                honorificPrefix: null,
                honorificSuffix: null,
                image: null,
                jobTitle: null,
                knowsAbout: null,
                knowsLanguage: null,
                logo: null,
                name: null,
                nationality: null,
                profiles: null,
                sameAs: null,
                telephone: null,
                url: null,
                weight: null,
                worksFor: null
            });
        });
    });

    describe("#name", function () {
        it("returns a `${firstName} ${lastName}`", function () {
            delete stubPersonResumeJson.name;
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

        it("returns `additionalName` instead of `${firstName} ${lastName}`", function () {
            stubPersonJson.additionalName = "Meow Meow";
            const person = Person.fromJSON(stubPersonJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.name).to.eql(stubPersonJson.additionalName);
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
        it("returns `location.address`", function () {
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
        it("returns `location.city`", function () {
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
        it("returns `location.region`", function () {
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
        it("returns `location.postalCode`", function () {
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
        it("returns `location.countryCode`", function () {
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

    describe("#phone", function () {
        it("returns `telephone`", function () {
            const person = Person.fromJSON(stubPersonJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.telephone).to.eql(formatNumber(stubPersonJson.telephone, "International"));
            expect(person.phone).to.eql(person.telephone);
        });

        it("returns `null` if no `telephone`", function () {
            delete stubPersonJson.telephone;
            const person = Person.fromJSON(stubPersonJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.telephone).to.eql(null);
            expect(person.phone).to.eql(person.telephone);
        });
    });

    describe("#fax", function () {
        it("returns `faxNumber`", function () {
            const person = Person.fromJSON(stubPersonJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.faxNumber).to.eql(formatNumber(stubPersonJson.faxNumber, "International"));
            expect(person.fax).to.eql(person.faxNumber);
        });

        it("returns `null` if no `faxNumber`", function () {
            delete stubPersonJson.faxNumber;
            const person = Person.fromJSON(stubPersonJson);

            expect(person).to.be.ok;
            expect(person).to.be.instanceOf(Person);
            expect(person.faxNumber).to.eql(null);
            expect(person.fax).to.eql(person.faxNumber);
        });
    });
});
