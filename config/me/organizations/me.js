const defer = require("config/defer").deferConfig;
const profiles = require("../profiles");

module.exports = {
    email: "jobs@randytarampi.ca",
    telephone: "+16043747128",
    image: "https://secure.gravatar.com/avatar/2efab7e328dae90b9ff272f9ee4974b8?s=512",
    logo: defer(function () {
        return this.me.resume.basics.image;
    }),
    name: defer(function () {
        return `${this.me.resume.basics.givenName} ${this.me.resume.basics.familyName}`;
    }),
    url: "https://www.randytarampi.ca",
    description: "Just another code monkey looking to broaden his skillset and horizons, preferably outside of North America. Prefers fitness balls over fancy chairs and better known in person than on paper or screen",
    address: {
        countryCode: defer(function () {
            return this.me.resume.basics.address.addressCountry;
        }),
        addressCountry: "CA",
        addressLocality: "Vancouver",
        addressRegion: "BC",
        postalCode: "V5R 3P7",
        streetAddress: "4663 Todd Street"
    },
    sameAs: ["https://www.randytarampi.ca/resume"].concat(profiles.map(profile => profile.url)),
    knowsLanguage: [
        {alternateName: "en", name: "English"},
        {alternateName: "fr", name: "French"},
        {alternateName: "it", name: "Italian"}
    ]
};
