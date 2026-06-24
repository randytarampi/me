import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import App from "../../../../src/public/views/hotApp";

describe("hotApp", function () {
    it("renders", function () {
        const rendered = render(<App/>);

        expect(rendered.container.firstChild).to.not.eql(null);
    });
});
