import {expect} from "chai";
import {formatNumber} from "libphonenumber-js";
import Place from "../../../../src/lib/place";
import PostalAddress from "../../../../src/lib/postalAddress";

describe("Place", function () {
    let stubPlaceJson;
    let stubPlaceResumeJson;

    beforeEach(function () {
        stubPlaceResumeJson = {
            name: "Woof Woof Woof",
            picture: "Woof",
            email: "woof@randytarampi.ca",
            phone: "+16692216251",
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

        stubPlaceJson = {
            additionalName: "Woof Woof Woof",
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
            email: stubPlaceResumeJson.email,
            telephone: stubPlaceResumeJson.phone,
            faxNumber: stubPlaceResumeJson.phone,
            url: stubPlaceResumeJson.website,
            description: stubPlaceResumeJson.summary,
            image: stubPlaceResumeJson.picture,
            address: {
                streetAddress: stubPlaceResumeJson.location.address,
                postalCode: stubPlaceResumeJson.location.postalCode,
                addressLocality: stubPlaceResumeJson.location.city,
                addressCountry: stubPlaceResumeJson.location.countryCode,
                addressRegion: stubPlaceResumeJson.location.region
            }
        };
    });

    describe("constructor", function () {
        it("returns a Place", function () {
            const place = new Place({
                ...stubPlaceJson,
                address: PostalAddress.fromJS(stubPlaceJson.address)
            });

            expect(place).to.be.instanceOf(Place);
            expect(place.location).to.be.instanceOf(PostalAddress);
            expect(place.email).to.eql(stubPlaceJson.email);
            expect(place.phone).to.eql(formatNumber(stubPlaceJson.telephone, "International"));
            expect(place.fax).to.eql(formatNumber(stubPlaceJson.faxNumber, "International"));
            expect(place.website).to.eql(stubPlaceJson.url);
            expect(place.picture).to.eql(stubPlaceJson.image);
            expect(place.name).to.eql(stubPlaceJson.additionalName);
        });

        it("returns an empty Place", function () {
            const place = new Place();

            expect(place).to.be.instanceOf(Place);
        });
    });

    describe(".fromJS", function () {
        it("returns a Place", function () {
            const place = Place.fromJS(stubPlaceJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.location).to.be.instanceOf(PostalAddress);
            expect(place.email).to.eql(stubPlaceJson.email);
            expect(place.phone).to.eql(formatNumber(stubPlaceJson.telephone, "International"));
            expect(place.fax).to.eql(formatNumber(stubPlaceJson.faxNumber, "International"));
            expect(place.website).to.eql(stubPlaceJson.url);
            expect(place.picture).to.eql(stubPlaceJson.image);
            expect(place.name).to.eql(stubPlaceJson.additionalName);
        });

        it("returns an empty Place", function () {
            const place = Place.fromJS();

            expect(place).to.be.instanceOf(Place);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Place", function () {
            const place = Place.fromJSON(stubPlaceJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.location).to.be.instanceOf(PostalAddress);
            expect(place.email).to.eql(stubPlaceJson.email);
            expect(place.phone).to.eql(formatNumber(stubPlaceJson.telephone, "International"));
            expect(place.fax).to.eql(formatNumber(stubPlaceJson.faxNumber, "International"));
            expect(place.website).to.eql(stubPlaceJson.url);
            expect(place.picture).to.eql(stubPlaceJson.image);
            expect(place.name).to.eql(stubPlaceJson.additionalName);
        });

        it("returns an empty Place", function () {
            const place = Place.fromJSON();

            expect(place).to.be.instanceOf(Place);
        });
    });

    describe(".fromResume", function () {
        it("returns a Place", function () {
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.location).to.be.instanceOf(PostalAddress);
            expect(place.email).to.eql(stubPlaceJson.email);
            expect(place.phone).to.eql(formatNumber(stubPlaceResumeJson.phone, "International"));
            expect(place.fax).to.eql(null);
            expect(place.website).to.eql(stubPlaceResumeJson.website);
            expect(place.picture).to.eql(stubPlaceResumeJson.picture);
            expect(place.name).to.eql(stubPlaceResumeJson.name);
        });

        it("returns an empty Place", function () {
            const place = Place.fromResume();

            expect(place).to.be.instanceOf(Place);
        });
    });

    describe("#toResume", function () {
        it("returns expected Resume JSON", function () {
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);

            const resumeJson = place.toResume();

            expect(resumeJson).to.eql({
                ...stubPlaceResumeJson,
                phone: formatNumber(stubPlaceResumeJson.phone, "International"),
                name: place.name
            });
        });

        it("returns some empty Resume JSON", function () {
            const place = Place.fromResume();

            expect(place).to.be.instanceOf(Place);

            const resumeJson = place.toResume();

            expect(resumeJson).to.eql({
                email: null,
                location: null,
                name: null,
                phone: null,
                picture: null,
                summary: null,
                website: null
            });
        });
    });

    describe("#toSchema", function () {
        it("returns expected Schema.org JSON", function () {
            const place = Place.fromJSON(stubPlaceJson);

            expect(place).to.be.instanceOf(Place);

            const schemaJson = place.toSchema();

            expect(schemaJson).to.eql({
                additionalName: "Woof Woof Woof",
                address: {
                    addressCountry: "CA",
                    addressLocality: "grr",
                    addressRegion: "BC",
                    postOfficeBoxNumber: null,
                    postalCode: "meow",
                    streetAddress: "woof"
                },
                description: "Woof woof woof",
                email: "woof@randytarampi.ca",
                faxNumber: "+16692216251",
                image: "Woof",
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
                sameAs: [
                    "woof://woof.woof/woof"
                ],
                telephone: "+16692216251",
                url: "woof.woof/woof"
            });
        });

        it("returns some empty Schema.org JSON", function () {
            const place = Place.fromJSON();

            expect(place).to.be.instanceOf(Place);

            const schemaJson = place.toSchema();

            expect(schemaJson).to.eql({
                additionalName: null,
                address: null,
                description: null,
                email: null,
                faxNumber: null,
                image: null,
                knowsAbout: null,
                knowsLanguage: null,
                logo: null,
                name: null,
                sameAs: null,
                telephone: null,
                url: null
            });
        });
    });

    describe("#name", function () {
        it("returns `name` instead of `additionalName`", function () {
            stubPlaceResumeJson.name = "Meow Meow";
            stubPlaceResumeJson.additionalName = "Meow Meow Meow";
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.name).to.eql(stubPlaceResumeJson.name);
        });

        it("returns `additionalName` if no `name`", function () {
            stubPlaceJson.name = null;
            stubPlaceJson.additionalName = "Meow Meow Meow";
            const place = Place.fromJSON(stubPlaceJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.name).to.eql(stubPlaceJson.additionalName);
        });

        it("returns `null` if there are no names", function () {
            delete stubPlaceResumeJson.name;
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.name).to.eql(null);
        });
    });

    describe("#address", function () {
        it("returns `location.address`", function () {
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.address).to.eql(stubPlaceResumeJson.location.address);
        });

        it("returns `null` if no `location", function () {
            delete stubPlaceResumeJson.location;
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.address).to.eql(null);
        });
    });

    describe("#city", function () {
        it("returns `location.city`", function () {
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.city).to.eql(stubPlaceResumeJson.location.city);
        });

        it("returns `null` if no `location", function () {
            delete stubPlaceResumeJson.location;
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.city).to.eql(null);
        });
    });

    describe("#region", function () {
        it("returns `location.region`", function () {
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.region).to.eql(stubPlaceResumeJson.location.region);
        });

        it("returns `null` if no `location", function () {
            delete stubPlaceResumeJson.location;
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.region).to.eql(null);
        });
    });

    describe("#postalCode", function () {
        it("returns `location.postalCode`", function () {
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.postalCode).to.eql(stubPlaceResumeJson.location.postalCode);
        });

        it("returns `null` if no `location", function () {
            delete stubPlaceResumeJson.location;
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.postalCode).to.eql(null);
        });
    });

    describe("#countryCode", function () {
        it("returns `location.countryCode`", function () {
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.countryCode).to.eql(stubPlaceResumeJson.location.countryCode);
        });

        it("returns `null` if no `location", function () {
            delete stubPlaceResumeJson.location;
            const place = Place.fromResume(stubPlaceResumeJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.countryCode).to.eql(null);
        });
    });

    describe("#phone", function () {
        it("returns `telephone`", function () {
            const place = Place.fromJSON(stubPlaceJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.telephone).to.eql(formatNumber(stubPlaceJson.telephone, "International"));
            expect(place.phone).to.eql(place.telephone);
        });

        it("returns `null` if no `telephone`", function () {
            delete stubPlaceJson.telephone;
            const place = Place.fromJSON(stubPlaceJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.telephone).to.eql(null);
            expect(place.phone).to.eql(place.telephone);
        });
    });

    describe("#fax", function () {
        it("returns `faxNumber`", function () {
            const place = Place.fromJSON(stubPlaceJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.faxNumber).to.eql(formatNumber(stubPlaceJson.faxNumber, "International"));
            expect(place.fax).to.eql(place.faxNumber);
        });

        it("returns `null` if no `faxNumber`", function () {
            delete stubPlaceJson.faxNumber;
            const place = Place.fromJSON(stubPlaceJson);

            expect(place).to.be.instanceOf(Place);
            expect(place.faxNumber).to.eql(null);
            expect(place.fax).to.eql(place.faxNumber);
        });
    });
});
