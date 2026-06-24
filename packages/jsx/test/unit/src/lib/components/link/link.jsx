import {expect} from "chai";
import {render, screen} from "@testing-library/react";
import React from "react";
import Link from "../../../../../../src/lib/components/link/link";

describe("Link", function () {
    it("renders an anchor with metrics attributes", function () {
        render(<Link href="/hello" className="extra">Hello</Link>);

        const link = screen.getByRole("link", {name: "Hello"});

        expect(link.getAttribute("href")).to.eql("/hello");
        expect(link.getAttribute("target")).to.eql("__blank");
        expect(link.getAttribute("rel")).to.eql("noopener noreferrer");
        expect(link.getAttribute("data-metrics-type")).to.eql("href");
        expect(link.getAttribute("data-metrics-name")).to.eql("Hello");
        expect(link.getAttribute("data-metrics-label")).to.eql("Hello");
        expect(link.classList.contains("link")).to.eql(true);
        expect(link.classList.contains("extra")).to.eql(true);
    });
});
