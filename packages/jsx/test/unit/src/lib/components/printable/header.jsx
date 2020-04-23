import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import {Container} from "react-materialize";
import Header from "../../../../../../src/lib/components/printable/header";

describe("Header", function () {
    let stubPrintable;

    beforeEach(function () {
        stubPrintable = {
            basics: {
                name: "Randy Tarampi",
                label: "Going places | building software",
                picture: "https://secure.gravatar.com/avatar/2efab7e328dae90b9ff272f9ee4974b8?s=512",
                email: "jobs@randytarampi.ca",
                phone: "+1 (604) 374-7128",
                website: "https://www.randytarampi.ca",
                summary: "Just another code monkey looking to broaden his skillset and horizons, preferably outside of North America. Prefers fitness balls over fancy chairs and better known in person than on paper or screen",
                location: {
                    address: "4663 Todd Street",
                    postalCode: "V5R 3P7",
                    city: "Vancouver",
                    countryCode: "CA",
                    region: "BC"
                }
            }
        };
    });

    it("renders", function () {
        const stubProps = {
            printable: stubPrintable
        };
        const rendered = shallow(<Header {...stubProps} />);

        expect(rendered).to.have.id("header");
        expect(rendered).to.have.className("printable-header");
        expect(rendered).to.have.descendants(Container);
        expect(rendered).to.have.descendants(".printable-header__picture");
        expect(rendered).to.have.descendants(".printable-header__name");
        expect(rendered).to.have.descendants(".printable-header__label");
        expect(rendered).to.have.descendants(".printable-header__contact");
        expect(rendered).to.have.descendants(".printable-header__email");
        expect(rendered).to.have.descendants(".printable-header__tel");
        expect(rendered).to.have.descendants(".printable-header__web");
        expect(rendered).to.have.descendants(".printable-header__location");
    });

    it("renders (without a photo)", function () {
        stubPrintable.basics.picture = null;

        const stubProps = {
            printable: stubPrintable
        };
        const rendered = shallow(<Header {...stubProps} />);

        expect(rendered).to.have.id("header");
        expect(rendered).to.have.className("printable-header");
        expect(rendered).to.have.descendants(Container);
        expect(rendered).to.not.have.descendants(".printable-header__picture");
        expect(rendered).to.have.descendants(".printable-header__name");
        expect(rendered).to.have.descendants(".printable-header__label");
        expect(rendered).to.have.descendants(".printable-header__contact");
        expect(rendered).to.have.descendants(".printable-header__email");
        expect(rendered).to.have.descendants(".printable-header__tel");
        expect(rendered).to.have.descendants(".printable-header__web");
        expect(rendered).to.have.descendants(".printable-header__location");
    });

    it("renders (without a location and website)", function () {
        stubPrintable.basics.location = null;
        stubPrintable.basics.website = null;

        const stubProps = {
            printable: stubPrintable
        };
        const rendered = shallow(<Header {...stubProps} />);

        expect(rendered).to.have.id("header");
        expect(rendered).to.have.className("printable-header");
        expect(rendered).to.have.descendants(Container);
        expect(rendered).to.have.descendants(".printable-header__picture");
        expect(rendered).to.have.descendants(".printable-header__name");
        expect(rendered).to.have.descendants(".printable-header__label");
        expect(rendered).to.have.descendants(".printable-header__contact");
        expect(rendered).to.have.descendants(".printable-header__email");
        expect(rendered).to.have.descendants(".printable-header__tel");
        expect(rendered).to.not.have.descendants(".printable-header__web");
        expect(rendered).to.not.have.descendants(".printable-header__location");
    });

    it("renders (without a location)", function () {
        stubPrintable.basics.location = null;

        const stubProps = {
            printable: stubPrintable
        };
        const rendered = shallow(<Header {...stubProps} />);

        expect(rendered).to.have.id("header");
        expect(rendered).to.have.className("printable-header");
        expect(rendered).to.have.descendants(Container);
        expect(rendered).to.have.descendants(".printable-header__picture");
        expect(rendered).to.have.descendants(".printable-header__name");
        expect(rendered).to.have.descendants(".printable-header__label");
        expect(rendered).to.have.descendants(".printable-header__contact");
        expect(rendered).to.have.descendants(".printable-header__email");
        expect(rendered).to.have.descendants(".printable-header__tel");
        expect(rendered).to.have.descendants(".printable-header__web");
        expect(rendered).to.not.have.descendants(".printable-header__location");
    });

    it("renders (without a website)", function () {
        stubPrintable.basics.website = null;

        const stubProps = {
            printable: stubPrintable
        };
        const rendered = shallow(<Header {...stubProps} />);

        expect(rendered).to.have.id("header");
        expect(rendered).to.have.className("printable-header");
        expect(rendered).to.have.descendants(Container);
        expect(rendered).to.have.descendants(".printable-header__picture");
        expect(rendered).to.have.descendants(".printable-header__name");
        expect(rendered).to.have.descendants(".printable-header__label");
        expect(rendered).to.have.descendants(".printable-header__contact");
        expect(rendered).to.have.descendants(".printable-header__email");
        expect(rendered).to.have.descendants(".printable-header__tel");
        expect(rendered).to.not.have.descendants(".printable-header__web");
        expect(rendered).to.have.descendants(".printable-header__location");
    });
});
