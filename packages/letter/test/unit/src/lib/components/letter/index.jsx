import {LoadingSpinner, PrintableHeader} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import sinon from "sinon";
import LetterComponent from "../../../../../../src/lib/components/letter";
import LetterEntity from "../../../../../../src/lib/letter";

describe("LetterComponent", function () {
    let stubPersonJs;
    let stubSenderJs;
    let stubRecipientJs;
    let stubLetterContentComponent;
    let stubLetter;
    let stubFetchLetter;

    beforeEach(function () {
        const testComponent = () => <span className="rawr">foo</span>;

        stubPersonJs = {
            name: null,
            givenName: "Woof",
            familyName: "Woof",
            worksFor: null,
            jobTitle: "Woof",
            picture: null,
            email: "woof@randytarampi.ca",
            phone: "+16692216251",
            url: "woof.woof/woof",
            description: "Woof woof woof",
            location: {
                address: "woof",
                postalCode: "meow",
                city: "grr",
                countryCode: "CA",
                region: "BC"
            }
        };
        stubSenderJs = Object.assign({}, stubPersonJs);
        stubRecipientJs = Object.assign({}, stubPersonJs, {givenName: "Meow", email: "meow@randytarampi.ca"});

        stubLetterContentComponent = testComponent;
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            filename: null,
            content: [],
            renderOptions: {
                format: "bar"
            }
        });

        stubFetchLetter = sinon.stub();
    });


    describe("componentDidMount", function () {
        it("calls `fetchLetter` if `variant`", function () {
            const stubVariant = "woof";
            const rendered = shallow(<LetterComponent
                variant={stubVariant}
                fetchLetter={stubFetchLetter}
                match={{}}
                letter={stubLetter}
            />);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.className("printable");
            expect(rendered).to.have.className("letter");
            expect(rendered).to.have.descendants(".letter-content");
            expect(stubFetchLetter.calledOnce).to.be.ok;
            sinon.assert.calledWith(stubFetchLetter, stubVariant);
        });

        it("doesn't call `fetchLetter` if there's no `variant` defined", function () {
            const rendered = shallow(<LetterComponent
                fetchLetter={stubFetchLetter}
                match={{}}
                letter={stubLetter}
            />);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.className("printable");
            expect(rendered).to.have.className("letter");
            expect(rendered).to.have.descendants(".letter-content");
            expect(stubFetchLetter.notCalled).to.be.ok;
        });
    });

    it("renders", function () {
        const rendered = shallow(<LetterComponent
            fetchLetter={stubFetchLetter}
            isLoading={false}
            match={{}}
            letter={stubLetter}
        />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("letter");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".letter-content");
        expect(rendered).to.not.contain(<LoadingSpinner/>);
        expect(rendered).to.contain(<PrintableHeader printable={stubLetter}/>);
    });

    it("renders (custom content component)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            filename: null,
            content: [
                {
                    component: stubLetterContentComponent
                }
            ],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterComponent
            fetchLetter={stubFetchLetter}
            isLoading={false}
            match={{}}
            letter={stubLetter}
        />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("letter");
        expect(rendered).to.have.descendants(".letter-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubLetter}/>);
        stubLetter.content.map(contentConfiguration => {
            const ContentComponent = contentConfiguration.component
                ? contentConfiguration.component
                : require(`../../../../../../src/lib/components/letter/content/${contentConfiguration.contentKey}`).default;
            expect(rendered).to.have.contain(<ContentComponent
                letter={stubLetter}
                contentConfiguration={contentConfiguration}
            />);
        });
    });

    it("renders (plain content block)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            filename: null,
            content: [
                {
                    contentKey: "intro"
                },
            ],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterComponent
            fetchLetter={stubFetchLetter}
            isLoading={false}
            match={{}}
            letter={stubLetter}
        />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("letter");
        expect(rendered).to.have.descendants(".letter-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubLetter}/>);
        stubLetter.content.map(contentConfiguration => {
            const ContentComponent = contentConfiguration.component
                ? contentConfiguration.component
                : require(`../../../../../../src/lib/components/letter/content/${contentConfiguration.contentKey}`).default;
            expect(rendered).to.have.contain(<ContentComponent
                letter={stubLetter}
                contentConfiguration={contentConfiguration}
            />);
        });
    });

    it("renders (customized content block)", function () {
        stubLetter = LetterEntity.fromJS({
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            filename: null,
            content: [
                {
                    contentKey: "date",
                    sectionId: "woof",
                    contentProps: {
                        meow: "grr"
                    }
                },
            ],
            renderOptions: {
                format: "bar"
            }
        });

        const rendered = shallow(<LetterComponent
            fetchLetter={stubFetchLetter}
            isLoading={false}
            match={{}}
            letter={stubLetter}
        />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("letter");
        expect(rendered).to.have.descendants(".letter-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubLetter}/>);
        stubLetter.content.map(contentConfiguration => {
            const ContentComponent = contentConfiguration.component
                ? contentConfiguration.component
                : require(`../../../../../../src/lib/components/letter/content/${contentConfiguration.contentKey}`).default;
            expect(rendered).to.have.contain(<ContentComponent
                letter={stubLetter}
                contentConfiguration={contentConfiguration}
            />);
        });
    });

    it("renders (`isLoading`)", function () {
        const rendered = shallow(<LetterComponent
            fetchLetter={stubFetchLetter}
            isLoading={true}
            match={{}}
            letter={stubLetter}
        />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("letter");
        expect(rendered).to.not.have.descendants(".letter-content");
        expect(rendered).to.contain(<LoadingSpinner/>);
        expect(rendered).to.not.contain(<PrintableHeader printable={stubLetter}/>);
    });
});
