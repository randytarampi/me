const me = require("../../organizations/me.cjs");
const sfu = require("../../organizations/sfu.cjs");
const svh = require("../../organizations/svh.cjs");

module.exports = {
    ...me,
    givenName: "Randy",
    familyName: "Tarampi",
    // NOTE-RT: was a `function () { return this.me.resume.basics...; }` computed property; the
    // installed `config` version no longer auto-evaluates function-valued config entries as
    // getters, so this is replaced with its already-known, static equivalent (see organizations/me.js).
    name: "Randy Tarampi",
    honorificPrefix: "Mr.",
    jobTitle: "Lookin' for a home, not a job",
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
