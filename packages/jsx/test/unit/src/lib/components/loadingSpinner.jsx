const {expect} = require("chai");
const {render} = require("@testing-library/react");
const React = require("react");
const LoadingSpinner = require("../../../../../src/lib/components/loadingSpinner.jsx").default || require("../../../../../src/lib/components/loadingSpinner.jsx");

describe("LoadingSpinner", function () {
    it("renders", function () {
        const rendered = render(<LoadingSpinner/>);

        expect(rendered.container.firstElementChild?.classList.contains("loading-spinner")).to.eql(true);
        expect(rendered.container.querySelector(".preloader-wrapper.big.active")).to.not.eql(null);
        expect(rendered.container.querySelector(".spinner-layer.spinner-blue")).to.not.eql(null);
        expect(rendered.container.querySelector(".spinner-layer.spinner-green")).to.not.eql(null);
        expect(rendered.container.querySelector(".spinner-layer.spinner-red")).to.not.eql(null);
        expect(rendered.container.querySelector(".spinner-layer.spinner-yellow")).to.not.eql(null);
    });
});
