const profiles = require("../profiles");

module.exports = {
    email: "jobs@randytarampi.ca",
    telephone: "+4917656927128",
    image: "https://secure.gravatar.com/avatar/2efab7e328dae90b9ff272f9ee4974b8?s=512",
    logo: function () {
        return this.me.resume.basics.image;
    },
    name: function () {
        return `${this.me.resume.basics.givenName} ${this.me.resume.basics.familyName}`;
    },
    url: "https://www.randytarampi.ca/blog",
    description: "I moved out here to broaden my skillset and horizons and now I'm doubling down and looking for my next big thing – a 50m² place with a decent amount of natural light and quiet neighbours 🤣",
    address: {
        countryCode: function () {
            return this.me.resume.basics.address.addressCountry;
        },
        addressCountry: "DE",
        addressLocality: "Berlin",
        addressRegion: "",
        postalCode: "10785",
        streetAddress: "Körnerstraße 24"
    },
    sameAs: ["https://www.randytarampi.ca/resume"].concat(Object.values(profiles).map(profile => profile.url).filter(value => !!value)),
    knowsLanguage: [
        {alternateName: "en", name: "English"},
        {alternateName: "fr", name: "French"},
        {alternateName: "it", name: "Italian"}
    ]
};
