const defer = require("config/defer").deferConfig;
const me = require("../../organizations/me");
const sfu = require("../../organizations/sfu");
const svh = require("../../organizations/svh");

module.exports = {
    ...me,
    givenName: "Randy",
    familyName: "Tarampi",
    name: defer(function () {
        return `${this.me.resume.basics.givenName} ${this.me.resume.basics.familyName}`;
    }),
    honorificPrefix: "Mr.",
    jobTitle: "Going places | building software",
    gender: "Male",
    nationality: "Canadian",
    height: "175cm",
    weight: "67kg",
    birthDate: "1991-11-14",
    birthPlace: svh,
    brand: me,
    worksFor: me,
    alumniOf: sfu
};
