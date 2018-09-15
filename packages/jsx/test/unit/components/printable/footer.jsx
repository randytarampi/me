import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import {Container} from "react-materialize";
import Footer from "../../../../lib/components/printable/footer";

describe("Footer", function () {
    it("renders", function () {
        const stubChildren = <span className="Woof">Woof woof woof</span>;
        const rendered = shallow(<Footer>{stubChildren}</Footer>);

        expect(rendered).to.be.ok;
        expect(rendered).to.containMatchingElement(
            <footer id="footer" className="printable-footer">
                <Container>
                    {stubChildren}
                </Container>
            </footer>
        );
    });
});
