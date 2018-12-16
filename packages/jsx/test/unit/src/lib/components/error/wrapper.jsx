import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import {ErrorComponent, ErrorWrapperComponent} from "../../../../../../src/lib/components/error";

describe("ErrorWrapperComponent", function () {
    it("renders (has errorContentComponent)", function () {
        const stubProps = {
            errorContentComponent: "woof"
        };
        const stubChildren = <span>Woof</span>;
        const rendered = shallow(<ErrorWrapperComponent {...stubProps}>
            {stubChildren}
        </ErrorWrapperComponent>);

        expect(rendered).to.containMatchingElement(
            <ErrorComponent {...stubProps}/>
        );
        expect(rendered).to.not.containMatchingElement(stubChildren);
    });

    it("renders (has known errorCode)", function () {
        const stubProps = {
            errorContentComponent: null,
            errorCode: 404
        };
        const stubChildren = <span>Woof</span>;
        const rendered = shallow(<ErrorWrapperComponent {...stubProps}>
            {stubChildren}
        </ErrorWrapperComponent>);

        expect(rendered).to.containMatchingElement(
            <ErrorComponent {...stubProps}/>
        );
        expect(rendered).to.not.containMatchingElement(stubChildren);
    });

    it("renders (has custom mapErrorCodeToErrorContentComponent)", function () {
        const stubProps = {
            errorContentComponent: null,
            errorCode: 404,
            mapErrorCodeToErrorContentComponent: () => "woof"
        };
        const stubChildren = <span>Woof</span>;
        const rendered = shallow(<ErrorWrapperComponent {...stubProps}>
            {stubChildren}
        </ErrorWrapperComponent>);

        expect(rendered).to.containMatchingElement(
            <ErrorComponent {...stubProps}/>
        );
        expect(rendered).to.not.containMatchingElement(stubChildren);
    });

    it("renders (children)", function () {
        const stubProps = {
            errorContentComponent: null
        };
        const stubChildren = <span>Woof</span>;
        const rendered = shallow(<ErrorWrapperComponent {...stubProps}>
            {stubChildren}
        </ErrorWrapperComponent>);

        expect(rendered).to.not.containMatchingElement(
            <ErrorComponent {...stubProps}/>
        );
        expect(rendered).to.containMatchingElement(stubChildren);
    });
});
