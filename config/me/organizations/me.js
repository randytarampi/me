const defer = require("config/defer").deferConfig;
const profiles = require("../profiles");

module.exports = {
    email: "jobs@randytarampi.ca",
    telephone: "+4917656927128",
    image: "https://secure.gravatar.com/avatar/2efab7e328dae90b9ff272f9ee4974b8?s=512",
    logo: defer(function () {
        return this.me.resume.basics.image;
    }),
    name: defer(function () {
        return `${this.me.resume.basics.givenName} ${this.me.resume.basics.familyName}`;
    }),
    url: "https://www.randytarampi.ca/blog",
    description: "If you think I'm being a little silly here it's because I take my actual work pretty seriously. If you're the type to hammer out whiteboard problems with a beer in hand or refine project requirements splayed out on the couch playing with dogs, get in touch – I'm sure we'll get along just fine",
    address: {
        countryCode: defer(function () {
            return this.me.resume.basics.address.addressCountry;
        }),
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
