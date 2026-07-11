import {render} from "@testing-library/react";
import {expect} from "chai";
import React from "react";
import App from "../../../../src/public/views/hotApp.jsx";

describe("hotApp", function () {
    it("renders", function () {
        const rendered = render(<App/>);

        expect(rendered.container.querySelector(".printable.resume")).to.not.eql(null);
    });
});
