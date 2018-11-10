import {expect} from "chai";
import {formatNumber} from "libphonenumber-js";
import Organization from "../../../../src/lib/organization";
import PostalAddress from "../../../../src/lib/postalAddress";

describe("Organization", function () {
    let stubOrganizationJson;
    let stubOrganizationResumeJson;

    beforeEach(function () {
        stubOrganizationResumeJson = {
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

        stubOrganizationJson = {
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
            email: stubOrganizationResumeJson.email,
            telephone: stubOrganizationResumeJson.phone,
            faxNumber: stubOrganizationResumeJson.phone,
            url: stubOrganizationResumeJson.website,
            description: stubOrganizationResumeJson.summary,
            image: stubOrganizationResumeJson.picture,
            address: {
                streetAddress: stubOrganizationResumeJson.location.address,
                postalCode: stubOrganizationResumeJson.location.postalCode,
                addressLocality: stubOrganizationResumeJson.location.city,
                addressCountry: stubOrganizationResumeJson.location.countryCode,
                addressRegion: stubOrganizationResumeJson.location.region
            }
        };
    });

    describe("constructor", function () {
        it("returns a Organization", function () {
            const organization = new Organization({
                ...stubOrganizationJson,
                address: PostalAddress.fromJS(stubOrganizationJson.address)
            });

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.location).to.be.instanceOf(PostalAddress);
            expect(organization.email).to.eql(stubOrganizationJson.email);
            expect(organization.phone).to.eql(formatNumber(stubOrganizationJson.telephone, "International"));
            expect(organization.fax).to.eql(formatNumber(stubOrganizationJson.faxNumber, "International"));
            expect(organization.website).to.eql(stubOrganizationJson.url);
            expect(organization.picture).to.eql(stubOrganizationJson.image);
            expect(organization.name).to.eql(stubOrganizationJson.additionalName);
        });

        it("returns an empty Organization", function () {
            const organization = new Organization();

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
        });
    });

    describe(".fromJS", function () {
        it("returns a Organization", function () {
            const organization = Organization.fromJS(stubOrganizationJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.location).to.be.instanceOf(PostalAddress);
            expect(organization.email).to.eql(stubOrganizationJson.email);
            expect(organization.phone).to.eql(formatNumber(stubOrganizationJson.telephone, "International"));
            expect(organization.fax).to.eql(formatNumber(stubOrganizationJson.faxNumber, "International"));
            expect(organization.website).to.eql(stubOrganizationJson.url);
            expect(organization.picture).to.eql(stubOrganizationJson.image);
            expect(organization.name).to.eql(stubOrganizationJson.additionalName);
        });

        it("returns an empty Organization", function () {
            const organization = Organization.fromJS();

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Organization", function () {
            const organization = Organization.fromJSON(stubOrganizationJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.location).to.be.instanceOf(PostalAddress);
            expect(organization.email).to.eql(stubOrganizationJson.email);
            expect(organization.phone).to.eql(formatNumber(stubOrganizationJson.telephone, "International"));
            expect(organization.fax).to.eql(formatNumber(stubOrganizationJson.faxNumber, "International"));
            expect(organization.website).to.eql(stubOrganizationJson.url);
            expect(organization.picture).to.eql(stubOrganizationJson.image);
            expect(organization.name).to.eql(stubOrganizationJson.additionalName);
        });

        it("returns an empty Organization", function () {
            const organization = Organization.fromJSON();

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
        });
    });

    describe(".fromResume", function () {
        it("returns a Organization", function () {
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.location).to.be.instanceOf(PostalAddress);
            expect(organization.email).to.eql(stubOrganizationJson.email);
            expect(organization.phone).to.eql(formatNumber(stubOrganizationResumeJson.phone, "International"));
            expect(organization.fax).to.eql(null);
            expect(organization.website).to.eql(stubOrganizationResumeJson.website);
            expect(organization.picture).to.eql(stubOrganizationResumeJson.picture);
            expect(organization.name).to.eql(stubOrganizationResumeJson.name);
        });

        it("returns an empty Organization", function () {
            const organization = Organization.fromResume();

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
        });
    });

    describe("#toResume", function () {
        it("returns expected Resume JSON", function () {
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);

            const resumeJson = organization.toResume();

            expect(resumeJson).to.eql({
                ...stubOrganizationResumeJson,
                phone: formatNumber(stubOrganizationResumeJson.phone, "International"),
                name: organization.name
            });
        });

        it("returns some empty Resume JSON", function () {
            const organization = Organization.fromResume();

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);

            const resumeJson = organization.toResume();

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
            const organization = Organization.fromJSON(stubOrganizationJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);

            const schemaJson = organization.toSchema();

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
                brand: null,
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
            const organization = Organization.fromJSON();

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);

            const schemaJson = organization.toSchema();

            expect(schemaJson).to.eql({
                additionalName: null,
                address: null,
                brand: null,
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
            stubOrganizationResumeJson.name = "Meow Meow";
            stubOrganizationResumeJson.additionalName = "Meow Meow Meow";
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.name).to.eql(stubOrganizationResumeJson.name);
        });

        it("returns `additionalName` if no `name`", function () {
            stubOrganizationJson.name = null;
            stubOrganizationJson.additionalName = "Meow Meow Meow";
            const organization = Organization.fromJSON(stubOrganizationJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.name).to.eql(stubOrganizationJson.additionalName);
        });

        it("returns `null` if there are no names", function () {
            delete stubOrganizationResumeJson.name;
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.name).to.eql(null);
        });
    });

    describe("#address", function () {
        it("returns `location.address`", function () {
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.address).to.eql(stubOrganizationResumeJson.location.address);
        });

        it("returns `null` if no `location", function () {
            delete stubOrganizationResumeJson.location;
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.address).to.eql(null);
        });
    });

    describe("#city", function () {
        it("returns `location.city`", function () {
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.city).to.eql(stubOrganizationResumeJson.location.city);
        });

        it("returns `null` if no `location", function () {
            delete stubOrganizationResumeJson.location;
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.city).to.eql(null);
        });
    });

    describe("#region", function () {
        it("returns `location.region`", function () {
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.region).to.eql(stubOrganizationResumeJson.location.region);
        });

        it("returns `null` if no `location", function () {
            delete stubOrganizationResumeJson.location;
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.region).to.eql(null);
        });
    });

    describe("#postalCode", function () {
        it("returns `location.postalCode`", function () {
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.postalCode).to.eql(stubOrganizationResumeJson.location.postalCode);
        });

        it("returns `null` if no `location", function () {
            delete stubOrganizationResumeJson.location;
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.postalCode).to.eql(null);
        });
    });

    describe("#countryCode", function () {
        it("returns `location.countryCode`", function () {
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.countryCode).to.eql(stubOrganizationResumeJson.location.countryCode);
        });

        it("returns `null` if no `location", function () {
            delete stubOrganizationResumeJson.location;
            const organization = Organization.fromResume(stubOrganizationResumeJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.countryCode).to.eql(null);
        });
    });

    describe("#phone", function () {
        it("returns `telephone`", function () {
            const organization = Organization.fromJSON(stubOrganizationJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.telephone).to.eql(formatNumber(stubOrganizationJson.telephone, "International"));
            expect(organization.phone).to.eql(organization.telephone);
        });

        it("returns `null` if no `telephone`", function () {
            delete stubOrganizationJson.telephone;
            const organization = Organization.fromJSON(stubOrganizationJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.telephone).to.eql(null);
            expect(organization.phone).to.eql(organization.telephone);
        });
    });

    describe("#fax", function () {
        it("returns `faxNumber`", function () {
            const organization = Organization.fromJSON(stubOrganizationJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.faxNumber).to.eql(formatNumber(stubOrganizationJson.faxNumber, "International"));
            expect(organization.fax).to.eql(organization.faxNumber);
        });

        it("returns `null` if no `faxNumber`", function () {
            delete stubOrganizationJson.faxNumber;
            const organization = Organization.fromJSON(stubOrganizationJson);

            expect(organization).to.be.ok;
            expect(organization).to.be.instanceOf(Organization);
            expect(organization.faxNumber).to.eql(null);
            expect(organization.fax).to.eql(organization.faxNumber);
        });
    });
});
