import {expect} from "chai";
import Profile from "../../../lib/profile";

describe("Profile", function () {
    describe("constructor", function () {
        it("returns a Profile", function () {
            const stubProfile = {
                network: "woof",
                username: "meow",
                url: "woof.woof/meow"
            };
            const profile = new Profile(stubProfile);

            expect(profile).to.be.ok;
            expect(profile).to.be.instanceOf(Profile);
            expect(profile.network).to.eql(stubProfile.network);
            expect(profile.username).to.eql(stubProfile.username);
            expect(profile.url).to.eql(stubProfile.url);
        });
    });

    describe(".fromJS", function () {
        it("returns a Profile", function () {
            const stubProfile = {
                network: "woof",
                username: "meow",
                url: "woof.woof/meow"
            };
            const profile = Profile.fromJS(stubProfile);

            expect(profile).to.be.ok;
            expect(profile).to.be.instanceOf(Profile);
            expect(profile.network).to.eql(stubProfile.network);
            expect(profile.username).to.eql(stubProfile.username);
            expect(profile.url).to.eql(stubProfile.url);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Profile", function () {
            const stubProfile = {
                network: "woof",
                username: "meow",
                url: "woof.woof/meow"
            };
            const profile = Profile.fromJSON(stubProfile);

            expect(profile).to.be.ok;
            expect(profile).to.be.instanceOf(Profile);
            expect(profile.network).to.eql(stubProfile.network);
            expect(profile.username).to.eql(stubProfile.username);
            expect(profile.url).to.eql(stubProfile.url);
        });
    });
});
