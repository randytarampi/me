const {expect} = require("chai");
const {render} = require("@testing-library/react");
const React = require("react");
const Header = require("../../../../../../src/lib/components/printable/header.jsx").default || require("../../../../../../src/lib/components/printable/header.jsx");

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
        const rendered = render(<Header {...stubProps} />);

        expect(rendered.container.firstElementChild?.id).to.eql("header");
        expect(rendered.container.firstElementChild?.classList.contains("printable-header")).to.eql(true);
        expect(rendered.container.querySelector(".container")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__picture")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__name")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__label")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__contact")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__email")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__tel")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__web")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__location")).to.not.eql(null);
    });

    it("renders (without a photo)", function () {
        stubPrintable.basics.picture = null;

        const stubProps = {
            printable: stubPrintable
        };
        const rendered = render(<Header {...stubProps} />);

        expect(rendered.container.firstElementChild?.id).to.eql("header");
        expect(rendered.container.firstElementChild?.classList.contains("printable-header")).to.eql(true);
        expect(rendered.container.querySelector(".container")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__picture")).to.eql(null);
        expect(rendered.container.querySelector(".printable-header__name")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__label")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__contact")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__email")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__tel")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__web")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__location")).to.not.eql(null);
    });

    it("renders (without a location and website)", function () {
        stubPrintable.basics.location = null;
        stubPrintable.basics.website = null;

        const stubProps = {
            printable: stubPrintable
        };
        const rendered = render(<Header {...stubProps} />);

        expect(rendered.container.firstElementChild?.id).to.eql("header");
        expect(rendered.container.firstElementChild?.classList.contains("printable-header")).to.eql(true);
        expect(rendered.container.querySelector(".container")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__picture")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__name")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__label")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__contact")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__email")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__tel")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__web")).to.eql(null);
        expect(rendered.container.querySelector(".printable-header__location")).to.eql(null);
    });

    it("renders (without a location)", function () {
        stubPrintable.basics.location = null;

        const stubProps = {
            printable: stubPrintable
        };
        const rendered = render(<Header {...stubProps} />);

        expect(rendered.container.firstElementChild?.id).to.eql("header");
        expect(rendered.container.firstElementChild?.classList.contains("printable-header")).to.eql(true);
        expect(rendered.container.querySelector(".container")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__picture")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__name")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__label")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__contact")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__email")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__tel")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__web")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__location")).to.eql(null);
    });

    it("renders (without a website)", function () {
        stubPrintable.basics.website = null;

        const stubProps = {
            printable: stubPrintable
        };
        const rendered = render(<Header {...stubProps} />);

        expect(rendered.container.firstElementChild?.id).to.eql("header");
        expect(rendered.container.firstElementChild?.classList.contains("printable-header")).to.eql(true);
        expect(rendered.container.querySelector(".container")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__picture")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__name")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__label")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__contact")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__email")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__tel")).to.not.eql(null);
        expect(rendered.container.querySelector(".printable-header__web")).to.eql(null);
        expect(rendered.container.querySelector(".printable-header__location")).to.not.eql(null);
    });
});
