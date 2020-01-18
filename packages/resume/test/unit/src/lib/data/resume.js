import {expect} from "chai";
import {Map} from "immutable";
import {createAction} from "redux-actions";
import {fetchingResumeSuccess} from "../../../../../src/lib/actions/fetchResume";
import reducer, {getResume, getResumes} from "../../../../../src/lib/data/resume";

describe("resume", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = Map({
            resumes: Map()
        });
    });

    it("reduces the current state for some other action", function () {
        const stubResume = {woof: "meow"};
        const stubPayload = {
            resume: stubResume
        };
        const otherAction = createAction("OTHER_ACTION");

        const updatedState = reducer(stubInitialState, otherAction(stubPayload));
        const resume = getResume(updatedState);
        expect(resume).to.not.be.ok;
        expect(resume).to.eql(null);
    });

    describe("FETCHING_RESUME_SUCCESS", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubResume = {woof: "meow"};
            const stubPayload = {
                resume: stubResume
            };

            const updatedState = reducer(stubInitialState, fetchingResumeSuccess(stubPayload));
            const resume = getResume(updatedState);
            expect(resume).to.eql(stubResume);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubResume = {woof: "meow"};
            const stubPayload = {
                resume: stubResume
            };
            const stubLoadedResume = {rawr: "roar"};

            stubInitialState = Map({
                resumes: Map({grr: stubLoadedResume})
            });
            const updatedState = reducer(stubInitialState, fetchingResumeSuccess(stubPayload));
            const resumes = getResumes(updatedState);
            expect(resumes.toList().toArray()).to.eql([
                stubLoadedResume,
                stubResume
            ]);
        });

        it("reduces the correct state (does nothing if no resume to add)", function () {
            const stubPayload = {};
            const stubLoadedResume = {rawr: "roar"};

            stubInitialState = Map({
                resumes: Map({grr: stubLoadedResume})
            });
            const updatedState = reducer(stubInitialState, fetchingResumeSuccess(stubPayload));
            const resume = getResume(updatedState);
            expect(resume).to.eql({rawr: "roar"});
        });
    });
});
