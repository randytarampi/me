import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import Error from "../../../../src/lib/components/error";
import ErrorWrapper from "../../../../src/lib/components/errorWrapper";

describe("ErrorWrapper", function () {
    it("renders (Error)", function () {
        const stubProps = {
            hasError: true
        };
        const stubChildren = <span>Woof</span>;
        const rendered = shallow(<ErrorWrapper {...stubProps}>
            {stubChildren}
        </ErrorWrapper>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Error {...stubProps}/>
        );
        expect(rendered).to.not.containMatchingElement(stubChildren);
    });

    it("renders (children)", function () {
        const stubProps = {
            hasError: false
        };
        const stubChildren = <span>Woof</span>;
        const rendered = shallow(<ErrorWrapper {...stubProps}>
            {stubChildren}
        </ErrorWrapper>);

        expect(rendered).to.be.ok;
        expect(rendered).to.not.containMatchingElement(
            <Error {...stubProps}/>
        );
        expect(rendered).to.containMatchingElement(stubChildren);
    });
});
