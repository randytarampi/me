const profiles = require("../profiles.cjs");

// NOTE-RT: these used to be defined as `function () { return this.me.resume.basics...; }`
// computed properties, relying on an old node-config convention where function-valued config
// entries were auto-evaluated as getters bound to the root config object. The installed
// `config` version no longer does this, so those raw, un-invoked functions were leaking
// through into the resume/person data (e.g. crashing phone-number formatting). Every one of
// these was self-referential to a value already present in this very object, so they're
// replaced here with their already-known, static equivalents.
const image = "https://secure.gravatar.com/avatar/2efab7e328dae90b9ff272f9ee4974b8?s=512";
const name = "Randy Tarampi";

module.exports = {
    email: "jobs@randytarampi.ca",
    telephone: "+4917656927128",
    image,
    logo: image,
    name,
    url: "https://www.randytarampi.ca/blog",
    description: "I moved out here to broaden my skillset and horizons and now I'm doubling down and looking for my next big thing – a 50m² place with a decent amount of natural light and quiet neighbours 🤣",
    address: {
        countryCode: "DE",
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
