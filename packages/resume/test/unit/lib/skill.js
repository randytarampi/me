import {expect} from "chai";
import {List} from "immutable";
import Skill from "../../../lib/skill";

describe("Skill", function () {
    let stubSkillJs;

    beforeEach(function () {
        stubSkillJs = {
            name: "Woof",
            level: "Meow",
            keywords: [
                "Grr",
                "Rawr"
            ]
        };
    });

    describe("constructor", function () {
        it("returns a Skill", function () {
            const skill = new Skill({
                ...stubSkillJs,
                keywords: List(stubSkillJs.keywords)
            });

            expect(skill).to.be.ok;
            expect(skill).to.be.instanceOf(Skill);
            expect(skill.name).to.eql(stubSkillJs.name);
            expect(skill.level).to.eql(stubSkillJs.level);
            expect(skill.keywords).to.be.instanceOf(List);
            expect(skill.keywords).to.eql(List(stubSkillJs.keywords));
        });

        it("returns an empty Skill", function () {
            const skill = new Skill();

            expect(skill).to.be.ok;
            expect(skill).to.be.instanceOf(Skill);
            expect(skill.keywords).to.eql(List());
        });
    });

    describe(".fromJS", function () {
        it("returns a Skill", function () {
            const skill = Skill.fromJS({
                ...stubSkillJs
            });

            expect(skill).to.be.ok;
            expect(skill).to.be.instanceOf(Skill);
            expect(skill.name).to.eql(stubSkillJs.name);
            expect(skill.level).to.eql(stubSkillJs.level);
            expect(skill.keywords).to.be.instanceOf(List);
            expect(skill.keywords).to.eql(List(stubSkillJs.keywords));
        });

        it("returns an empty Skill", function () {
            const skill = Skill.fromJS();

            expect(skill).to.be.ok;
            expect(skill).to.be.instanceOf(Skill);
            expect(skill.keywords).to.eql(null);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Skill", function () {
            const skill = Skill.fromJSON({
                ...stubSkillJs
            });

            expect(skill).to.be.ok;
            expect(skill).to.be.instanceOf(Skill);
            expect(skill.name).to.eql(stubSkillJs.name);
            expect(skill.level).to.eql(stubSkillJs.level);
            expect(skill.keywords).to.be.instanceOf(List);
            expect(skill.keywords).to.eql(List(stubSkillJs.keywords));
        });

        it("returns an empty Skill", function () {
            const skill = Skill.fromJSON();

            expect(skill).to.be.ok;
            expect(skill).to.be.instanceOf(Skill);
            expect(skill.keywords).to.eql(null);
        });
    });

    describe(".fromResume", function () {
        it("returns a Skill", function () {
            const skill = Skill.fromResume({
                ...stubSkillJs
            });

            expect(skill).to.be.ok;
            expect(skill).to.be.instanceOf(Skill);
            expect(skill.name).to.eql(stubSkillJs.name);
            expect(skill.level).to.eql(stubSkillJs.level);
            expect(skill.keywords).to.be.instanceOf(List);
            expect(skill.keywords).to.eql(List(stubSkillJs.keywords));
        });

        it("returns an empty Skill", function () {
            const skill = Skill.fromResume();

            expect(skill).to.be.ok;
            expect(skill).to.be.instanceOf(Skill);
            expect(skill.keywords).to.eql(null);
        });
    });
});
