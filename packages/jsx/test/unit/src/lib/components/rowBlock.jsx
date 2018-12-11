import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import {Row} from "react-materialize";
import RowBlock from "../../../../../src/lib/components/rowBlock";

describe("RowBlock", function () {
    it("renders", function () {
        const stubProps = {
            name: "woof",
            className: "meow",
            grr: "rawr"
        };
        const rendered = shallow(<RowBlock {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <Row
                {...stubProps}
                className="block block--woof meow"
                id={stubProps.name}
            />
        );
    });
});
