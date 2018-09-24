import {Letter} from "@randy.tarampi/letter";
import {Resume} from "@randy.tarampi/resume";
import testResumeJson from "@randy.tarampi/resume/src/resumes/test";
import {expect} from "chai";
import {List, Map} from "immutable";
import JobApplication from "../../../../src/lib/jobApplication";

describe("JobApplication", function () {
    let stubPersonJs;
    let stubSenderJs;
    let stubRecipientJs;
    let stubLetterJs;
    let stubLetterSectionJs;
    let stubResumeJs;
    let stubJobApplicationJs;

    beforeEach(function () {
        stubPersonJs = {
            name: null,
            givenName: "Woof",
            familyName: "Woof",
            worksFor: null,
            jobTitle: "Woof",
            picture: null,
            email: "woof@randytarampi.ca",
            telephone: "+1234567890",
            url: "woof.woof/woof",
            description: "Woof woof woof",
            address: {
                streetAddress: "woof",
                postalCode: "meow",
                addressLocality: "grr",
                addressCountry: "CA",
                addressRegion: "BC"
            }
        };
        stubSenderJs = Object.assign({}, stubPersonJs);
        stubRecipientJs = Object.assign({}, stubPersonJs, {givenName: "Meow", email: "meow@randytarampi.ca"});

        stubLetterSectionJs = {
            contentKey: "woof",
            sectionId: "meow",
            contentProps: {
                grr: "rawr"
            },
            component: null
        };
        stubLetterJs = {
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            filename: null,
            content: [
                stubLetterSectionJs
            ],
            renderOptions: {
                format: "bar"
            },
            renderExpectations: {
                pages: "baz"
            }
        };

        stubResumeJs = Object.assign({
            renderOptions: {
                format: "bar"
            },
            renderExpectations: {
                pages: "baz"
            }
        }, testResumeJson);

        stubJobApplicationJs = {
            resume: stubResumeJs,
            letter: stubLetterJs,
            renderOptions: stubResumeJs.renderOptions,
            renderExpectations: stubResumeJs.renderExpectations,
            tags: [
                "woof"
            ],
            meta: {
                jobPosting: {},
                occupation: {}
            }
        };
    });

    describe("constructor", function () {
        it("returns a JobApplication", function () {
            const jobApplication = new JobApplication({
                ...stubJobApplicationJs,
                resume: Resume.fromJS({
                    ...stubJobApplicationJs.resume,
                    filename: "woof",
                    id: null
                }),
                letter: Letter.fromJS({
                    ...stubJobApplicationJs.letter,
                    filename: null,
                    id: "meow"
                }),
                renderOptions: Map(stubJobApplicationJs.renderOptions),
                renderExpectations: Map(stubJobApplicationJs.renderExpectations),
                tags: List(stubJobApplicationJs.tags),
                meta: Map(stubJobApplicationJs.meta)
            });

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.resume).to.be.instanceOf(Resume);
            expect(jobApplication.resume.basics.name).to.not.eql(stubResumeJs.basics.name);
            expect(jobApplication.get("resume").basics.name).to.eql(stubResumeJs.basics.name);
            expect(jobApplication.resume.basics.name).to.eql(`${stubSenderJs.givenName} ${stubSenderJs.familyName}`);
            expect(jobApplication.letter).to.be.instanceOf(Letter);
            expect(jobApplication.letter.sender.name).to.eql(`${stubSenderJs.givenName} ${stubSenderJs.familyName}`);
            expect(jobApplication.renderOptions).to.be.instanceOf(Map);
            expect(jobApplication.renderOptions.get("format")).to.eql(stubLetterJs.renderOptions.format);
            expect(jobApplication.renderExpectations).to.be.instanceOf(Map);
            expect(jobApplication.renderExpectations.get("pages")).to.eql(stubLetterJs.renderExpectations.pages);
            expect(jobApplication.tags).to.be.instanceOf(List);
            expect(jobApplication.tags.get(0)).to.eql(stubJobApplicationJs.tags[0]);
            expect(jobApplication.meta).to.be.instanceOf(Map);
            expect(jobApplication.meta.get("jobPosting")).to.eql(stubJobApplicationJs.meta.jobPosting);
        });

        it("returns an empty JobApplication", function () {
            const letter = new JobApplication();

            expect(letter).to.be.ok;
            expect(letter).to.be.instanceOf(JobApplication);
        });
    });

    describe(".fromJS", function () {
        it("returns a JobApplication", function () {
            const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.resume).to.be.instanceOf(Resume);
            expect(jobApplication.resume.basics.name).to.not.eql(stubResumeJs.basics.name);
            expect(jobApplication.get("resume").basics.name).to.eql(stubResumeJs.basics.name);
            expect(jobApplication.resume.basics.name).to.eql(`${stubSenderJs.givenName} ${stubSenderJs.familyName}`);
            expect(jobApplication.letter).to.be.instanceOf(Letter);
            expect(jobApplication.letter.sender.name).to.eql(`${stubSenderJs.givenName} ${stubSenderJs.familyName}`);
            expect(jobApplication.renderOptions).to.be.instanceOf(Map);
            expect(jobApplication.renderOptions.get("format")).to.eql(stubLetterJs.renderOptions.format);
            expect(jobApplication.renderExpectations).to.be.instanceOf(Map);
            expect(jobApplication.renderExpectations.get("pages")).to.eql(stubLetterJs.renderExpectations.pages);
            expect(jobApplication.tags).to.be.instanceOf(List);
            expect(jobApplication.tags.get(0)).to.eql(stubJobApplicationJs.tags[0]);
            expect(jobApplication.meta).to.be.instanceOf(Map);
            expect(jobApplication.meta.get("jobPosting")).to.eql(stubJobApplicationJs.meta.jobPosting);
        });

        it("returns an empty JobApplication", function () {
            const letter = JobApplication.fromJS();

            expect(letter).to.be.ok;
            expect(letter).to.be.instanceOf(JobApplication);
        });
    });

    describe(".fromJSON", function () {
        it("returns a JobApplication", function () {
            const jobApplication = JobApplication.fromJSON(stubJobApplicationJs);

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.resume).to.be.instanceOf(Resume);
            expect(jobApplication.resume.basics.name).to.not.eql(stubResumeJs.basics.name);
            expect(jobApplication.get("resume").basics.name).to.eql(stubResumeJs.basics.name);
            expect(jobApplication.resume.basics.name).to.eql(`${stubSenderJs.givenName} ${stubSenderJs.familyName}`);
            expect(jobApplication.letter).to.be.instanceOf(Letter);
            expect(jobApplication.letter.sender.name).to.eql(`${stubSenderJs.givenName} ${stubSenderJs.familyName}`);
            expect(jobApplication.renderOptions).to.be.instanceOf(Map);
            expect(jobApplication.renderOptions.get("format")).to.eql(stubLetterJs.renderOptions.format);
            expect(jobApplication.renderExpectations).to.be.instanceOf(Map);
            expect(jobApplication.renderExpectations.get("pages")).to.eql(stubLetterJs.renderExpectations.pages);
            expect(jobApplication.tags).to.be.instanceOf(List);
            expect(jobApplication.tags.get(0)).to.eql(stubJobApplicationJs.tags[0]);
            expect(jobApplication.meta).to.be.instanceOf(Map);
            expect(jobApplication.meta.get("jobPosting")).to.eql(stubJobApplicationJs.meta.jobPosting);
        });

        it("returns an empty JobApplication", function () {
            const letter = JobApplication.fromJSON();

            expect(letter).to.be.ok;
            expect(letter).to.be.instanceOf(JobApplication);
        });

        describe("buildCampaignParameters", function () {
            it("augments `renderOptions` with default UTM parameters", function () {
                const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

                expect(jobApplication).to.be.ok;
                expect(jobApplication).to.be.instanceOf(JobApplication);
                expect(jobApplication.pdfRenderOptions).to.eql({
                    ...stubJobApplicationJs.renderOptions,
                    content: "0.39.6,a4,bar",
                    name: "",
                    term: "woof"
                });
            });

            it("augments `renderOptions` with passed UTM parameters", function () {
                stubJobApplicationJs.renderOptions = {
                    format: null,
                    name: "meow",
                    term: "grr",
                    content: null
                };
                stubJobApplicationJs.id = "ugh";
                stubJobApplicationJs.tags = [
                    "argh"
                ];

                const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

                expect(jobApplication).to.be.ok;
                expect(jobApplication).to.be.instanceOf(JobApplication);
                expect(jobApplication.pdfRenderOptions).to.eql({
                    ...stubJobApplicationJs.renderOptions,
                    content: "0.39.6",
                    name: "meow,ugh",
                    term: "argh+grr"
                });
            });
        });
    });

    describe("#basics", function () {
        it("returns the `letter.sender`", function () {
            const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.basics).to.eql(jobApplication.letter.sender);
        });
    });

    describe("#sender", function () {
        it("returns the `letter.sender`", function () {
            const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.sender).to.eql(jobApplication.letter.sender);
        });
    });

    describe("#recipient", function () {
        it("returns the `letter.recipient`", function () {
            const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.recipient).to.eql(jobApplication.letter.recipient);
        });
    });

    describe("#pdfRenderOptions", function () {
        it("returns `renderOptions` as JS Object", function () {
            const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.letter).to.be.instanceOf(Letter);
            expect(jobApplication.resume).to.be.instanceOf(Resume);
            expect(jobApplication.pdfRenderOptions).to.eql({
                ...stubJobApplicationJs.renderOptions,
                content: "0.39.6,a4,bar",
                name: "",
                term: "woof"
            });
            expect(jobApplication.letter.pdfRenderOptions).to.eql(jobApplication.pdfRenderOptions);
            expect(jobApplication.resume.pdfRenderOptions).to.eql(jobApplication.pdfRenderOptions);
        });

        it("returns `letter.renderOptions` if no `renderOptions`", function () {
            delete stubJobApplicationJs.renderOptions;

            const jobApplication = new JobApplication({
                ...stubJobApplicationJs,
                resume: Resume.fromJS(stubJobApplicationJs.resume),
                letter: Letter.fromJS(stubJobApplicationJs.letter),
                renderOptions: null,
                renderExpectations: Map(stubJobApplicationJs.renderExpectations),
                tags: List(stubJobApplicationJs.tags),
                meta: Map(stubJobApplicationJs.meta)
            });

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.letter).to.be.instanceOf(Letter);
            expect(jobApplication.resume).to.be.instanceOf(Resume);
            expect(jobApplication.pdfRenderOptions).to.eql(stubJobApplicationJs.letter.renderOptions);
            expect(jobApplication.letter.pdfRenderOptions).to.eql(stubJobApplicationJs.letter.renderOptions);
            expect(jobApplication.resume.pdfRenderOptions).to.eql(stubJobApplicationJs.letter.renderOptions);
        });

        it("returns `null` if no `letter.renderOptions`", function () {
            delete stubJobApplicationJs.renderOptions;
            delete stubJobApplicationJs.letter.renderOptions;

            const jobApplication = new JobApplication({
                ...stubJobApplicationJs,
                resume: Resume.fromJS(stubJobApplicationJs.resume),
                letter: Letter.fromJS(stubJobApplicationJs.letter),
                renderOptions: null,
                renderExpectations: Map(stubJobApplicationJs.renderExpectations),
                tags: List(stubJobApplicationJs.tags),
                meta: Map(stubJobApplicationJs.meta)
            });

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.letter).to.be.instanceOf(Letter);
            expect(jobApplication.resume).to.be.instanceOf(Resume);
            expect(jobApplication.pdfRenderOptions).to.eql(null);
            expect(jobApplication.letter.pdfRenderOptions).to.eql(null);
            expect(jobApplication.resume.pdfRenderOptions).to.eql(stubJobApplicationJs.resume.renderOptions); // NOTE-RT: This is intentional –` how else does a document override what's being ordered by the job application?
        });
    });

    describe("#pdfRenderExpectations", function () {
        it("returns `renderExpectations` as JS Object", function () {
            const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.letter).to.be.instanceOf(Letter);
            expect(jobApplication.resume).to.be.instanceOf(Resume);
            expect(jobApplication.pdfRenderExpectations).to.eql(stubLetterJs.renderExpectations);
            expect(jobApplication.letter.pdfRenderExpectations).to.eql(stubJobApplicationJs.renderExpectations);
            expect(jobApplication.resume.pdfRenderExpectations).to.eql(stubJobApplicationJs.renderExpectations);
        });

        it("returns `letter.pdfRenderExpectations` if no `renderExpectations`", function () {
            delete stubJobApplicationJs.renderExpectations;

            const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.letter).to.be.instanceOf(Letter);
            expect(jobApplication.resume).to.be.instanceOf(Resume);
            expect(jobApplication.pdfRenderExpectations).to.eql(stubLetterJs.renderExpectations);
            expect(jobApplication.letter.pdfRenderExpectations).to.eql(stubLetterJs.renderExpectations);
            expect(jobApplication.resume.pdfRenderExpectations).to.eql(stubLetterJs.renderExpectations);
        });

        it("returns `null` if no `letter.renderExpectations`", function () {
            delete stubJobApplicationJs.renderExpectations;
            delete stubJobApplicationJs.letter.renderExpectations;

            const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.letter).to.be.instanceOf(Letter);
            expect(jobApplication.resume).to.be.instanceOf(Resume);
            expect(jobApplication.pdfRenderExpectations).to.eql(null);
            expect(jobApplication.letter.pdfRenderExpectations).to.eql(null);
            expect(jobApplication.resume.pdfRenderExpectations).to.eql(null);
        });
    });

    describe("#pageSize", function () {
        it("returns `renderOptions.format`", function () {
            const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.letter).to.be.instanceOf(Letter);
            expect(jobApplication.resume).to.be.instanceOf(Resume);
            expect(jobApplication.pageSize).to.eql(stubJobApplicationJs.renderOptions.format);
            expect(jobApplication.letter.pageSize).to.eql(stubJobApplicationJs.renderOptions.format);
            expect(jobApplication.resume.pageSize).to.eql(stubJobApplicationJs.renderOptions.format);
        });

        it("returns `letter.pageSize` if no `renderOptions`", function () {
            delete stubJobApplicationJs.renderOptions.format;

            const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.letter).to.be.instanceOf(Letter);
            expect(jobApplication.resume).to.be.instanceOf(Resume);
            expect(jobApplication.pageSize).to.eql(jobApplication.pageSize);
            expect(jobApplication.letter.pageSize).to.eql(jobApplication.pageSize);
            expect(jobApplication.resume.pageSize).to.eql(null); // NOTE-RT: This is intentional –` how else does a document override what's being ordered by the job application?
        });

        it("returns `null` if no `letter.renderOptions`", function () {
            delete stubJobApplicationJs.renderOptions.format;
            delete stubJobApplicationJs.letter.renderOptions;

            const jobApplication = JobApplication.fromJS(stubJobApplicationJs);

            expect(jobApplication).to.be.ok;
            expect(jobApplication).to.be.instanceOf(JobApplication);
            expect(jobApplication.letter).to.be.instanceOf(Letter);
            expect(jobApplication.resume).to.be.instanceOf(Resume);
            expect(jobApplication.pageSize).to.eql(null);
            expect(jobApplication.letter.pageSize).to.eql(null);
            expect(jobApplication.resume.pageSize).to.eql(null);
        });
    });
});
