import {expect} from "chai";
import Profile from "../../../../src/lib/profile";

describe("Profile", function () {
    describe("constructor", function () {
        it("returns a Profile", function () {
            const stubProfile = {
                id: -1,
                username: "ʕ•ᴥ•ʔ",
                name: "ʕ•ᴥ•ʔ",
                url: "woof://woof.woof/woof/woof/woof",
                image: "meow://meow.meow/meow/meow/meow",
                network: "woof"
            };
            const profile = new Profile(stubProfile);

            expect(profile).to.be.instanceOf(Profile);
            expect(profile.id).to.eql(stubProfile.id);
            expect(profile.network).to.eql(stubProfile.network);
            expect(profile.username).to.eql(stubProfile.username);
            expect(profile.name).to.eql(stubProfile.name);
            expect(profile.image).to.eql(stubProfile.image);
            expect(profile.url).to.eql(stubProfile.url);
        });
    });

    describe("fromJS", function () {
        it("returns a Profile", function () {
            const stubProfile = {
                username: "ʕ•ᴥ•ʔ",
                name: "ʕ•ᴥ•ʔ",
                url: "woof://woof.woof/woof/woof/woof",
                image: "meow://meow.meow/meow/meow/meow",
                network: "woof"
            };
            const profile = Profile.fromJS(stubProfile);

            expect(profile).to.be.instanceOf(Profile);
            expect(profile.network).to.eql(stubProfile.network);
            expect(profile.username).to.eql(stubProfile.username);
            expect(profile.name).to.eql(stubProfile.name);
            expect(profile.image).to.eql(stubProfile.image);
            expect(profile.url).to.eql(stubProfile.url);
        });
    });

    describe("fromJSON", function () {
        it("returns a Profile", function () {
            const stubProfile = {
                username: "ʕ•ᴥ•ʔ",
                name: "ʕ•ᴥ•ʔ",
                url: "woof://woof.woof/woof/woof/woof",
                image: "meow://meow.meow/meow/meow/meow",
                network: "woof"
            };
            const profile = Profile.fromJSON(stubProfile);

            expect(profile).to.be.instanceOf(Profile);
            expect(profile.network).to.eql(stubProfile.network);
            expect(profile.username).to.eql(stubProfile.username);
            expect(profile.name).to.eql(stubProfile.name);
            expect(profile.image).to.eql(stubProfile.image);
            expect(profile.url).to.eql(stubProfile.url);
        });
    });

    describe("toSchema", function () {
        it("returns expected Schema.org JSON", function () {
            const stubProfile = {
                username: "ʕ•ᴥ•ʔ",
                name: "ʕ•ᴥ•ʔ",
                url: "woof://woof.woof/woof/woof/woof",
                image: "meow://meow.meow/meow/meow/meow",
                network: "woof"
            };
            const profile = Profile.fromJSON(stubProfile);

            expect(profile).to.be.instanceOf(Profile);

            const schemaJson = profile.toSchema();
            const {username, ...js} = profile.toJS(); // eslint-disable-line no-unused-vars

            expect(schemaJson).to.eql(js);
        });

        it("returns some empty Schema.org JSON", function () {
            const profile = Profile.fromJSON();

            expect(profile).to.be.instanceOf(Profile);

            const schemaJson = profile.toSchema();
            const {username, ...js} = profile.toJS(); // eslint-disable-line no-unused-vars

            expect(schemaJson).to.eql(js);
        });
    });
});
