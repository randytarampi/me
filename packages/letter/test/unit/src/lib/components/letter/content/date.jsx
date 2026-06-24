import {expect} from "chai";
import {render} from "@testing-library/react";
import {DateTime} from "luxon";
import React from "react";
import sinon from "sinon";
import LetterDate from "../../../../../../../src/lib/components/letter/content/date";
import LetterSection from "../../../../../../../src/lib/letterSection";

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
        const rendered = render(<LetterDate contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".letter-date__date-string")?.textContent).to.eql(
            stubContentConfiguration.contentProps.date.toLocaleString(DateTime.DATE_FULL)
        );
    });

    it("renders (custom date)", function () {
        const rendered = render(<LetterDate contentConfiguration={stubContentConfiguration}/>);

        expect(rendered.container.querySelector(".letter-date__date-string")?.textContent).to.eql(
            DateTime.fromJSDate(now).toLocaleString(DateTime.DATE_FULL)
        );
    });
});
