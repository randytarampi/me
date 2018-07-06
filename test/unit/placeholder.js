const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const expect = require("chai").expect;

describe("placeholder", () => {
    it("can run tests", () => {
        expect(true).to.eql(true);
    });
});
