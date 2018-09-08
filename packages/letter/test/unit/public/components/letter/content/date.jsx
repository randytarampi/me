import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import LetterDate from "../../../../../../public/components/letter/content/date";
import {DateTime} from "luxon";
import sinon from "sinon";
import LetterSection from "../../../../../../lib/letterSection";

describe("LetterDate", function () {
    let clock;
    let now;
    let stubContentConfiguration;

    beforeEach(function () {
        stubContentConfiguration = LetterSection.fromJS({
            type: "date"
        });
        now = new Date();
        clock = sinon.useFakeTimers(now);
    });

    afterEach(function () {
        clock.restore();
    });

    it("renders (default date)", function () {
        stubContentConfiguration = LetterSection.fromJS({
            ...stubContentConfiguration.toJS(),
            contentProps: {
                date: DateTime.fromISO("1991-11-14")
            }
        });
        const rendered = shallow(<LetterDate contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-date__date-string");
        expect(rendered).to.contain(<p className="letter-date__date-string">
            {
                stubContentConfiguration.contentProps.date.toLocaleString(DateTime.DATE_FULL)
            }
        </p>);
    });

    it("renders (custom date)", function () {
        const rendered = shallow(<LetterDate contentConfiguration={stubContentConfiguration}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".letter-date__date-string");
        expect(rendered).to.contain(<p className="letter-date__date-string">
            {
                DateTime.fromJSDate(now).toLocaleString(DateTime.DATE_FULL)
            }
        </p>);
    });
});
