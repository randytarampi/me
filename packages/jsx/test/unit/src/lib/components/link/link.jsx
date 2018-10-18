import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import sinon from "sinon";
import Link from "../../../../../../src/lib/components/link/link";

describe("Link", function () {
    it("renders (href & text)", function () {
        const stubProps = {
            href: "/woof",
            name: "woof",
            text: "WOOF"
        };
        const rendered = shallow(<Link {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.containMatchingElement(
            <a
                target="__blank"
                rel="noopener noreferrer"
                data-metrics-event-name="anchor"
                data-metrics-type="href"
                data-metrics-name={stubProps.name}
                data-metrics-label={stubProps.text}
                data-metrics-value={stubProps.href}
                className="link"
            >
                {stubProps.text}
            </a>
        );
    });

    it("renders (children & text)", function () {
        const stubChildren = "WOOF";
        const stubProps = {
            href: "/woof",
            name: "woof"
        };
        const rendered = shallow(<Link {...stubProps}>{stubChildren}</Link>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.containMatchingElement(
            <a
                target="__blank"
                rel="noopener noreferrer"
                data-metrics-event-name="anchor"
                data-metrics-type="href"
                data-metrics-name={stubProps.name}
                data-metrics-label={stubChildren}
                data-metrics-value={stubProps.href}
                className="link"
            >
                {stubChildren}
            </a>
        );
    });

    it("renders (children & onClick)", function () {
        const stubChildren = "WOOF";
        const stubProps = {
            onClick: sinon.stub(),
            name: "woof"
        };
        const rendered = shallow(<Link {...stubProps}>{stubChildren}</Link>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.containMatchingElement(
            <a
                target="__blank"
                rel="noopener noreferrer"
                data-metrics-event-name="anchor"
                data-metrics-type="onClick"
                data-metrics-name={stubProps.name}
                data-metrics-label={stubChildren}
                data-metrics-value={undefined}
                className="link"
            >
                {stubChildren}
            </a>
        );
    });

    it("renders (children & no name)", function () {
        const stubChildren = "WOOF";
        const stubProps = {
            onClick: sinon.stub()
        };
        const rendered = shallow(<Link {...stubProps}>{stubChildren}</Link>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.containMatchingElement(
            <a
                target="__blank"
                rel="noopener noreferrer"
                data-metrics-event-name="anchor"
                data-metrics-type="onClick"
                data-metrics-name={stubChildren}
                data-metrics-label={stubChildren}
                data-metrics-value={undefined}
                className="link"
            >
                {stubChildren}
            </a>
        );
    });

    it("renders (children & no name & aria-label)", function () {
        const stubChildren = "WOOF";
        const stubProps = {
            onClick: sinon.stub(),
            "aria-label": "close"
        };
        const rendered = shallow(<Link {...stubProps}>{stubChildren}</Link>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);
        expect(rendered).to.containMatchingElement(
            <a
                target="__blank"
                rel="noopener noreferrer"
                data-metrics-event-name="anchor"
                data-metrics-type="onClick"
                data-metrics-name={stubProps["aria-label"]}
                data-metrics-label={stubProps["aria-label"]}
                data-metrics-value={undefined}
                className="link"
                aria-label={stubProps["aria-label"]}
            >
                {stubChildren}
            </a>
        );
    });

    it("renders (className)", function () {
        const stubChildren = "WOOF";
        const stubProps = {
            onClick: sinon.stub(),
            "aria-label": "close",
            className: "woof meow grr"
        };
        const rendered = shallow(<Link {...stubProps}>{stubChildren}</Link>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props({
            ...stubProps,
            className: "link " + stubProps.className
        });
        expect(rendered).to.containMatchingElement(
            <a
                target="__blank"
                rel="noopener noreferrer"
                data-metrics-event-name="anchor"
                data-metrics-type="onClick"
                data-metrics-name={stubProps["aria-label"]}
                data-metrics-label={stubProps["aria-label"]}
                data-metrics-value={undefined}
                className="link woof meow grr"
                aria-label={stubProps["aria-label"]}
            >
                {stubChildren}
            </a>
        );
    });
});
