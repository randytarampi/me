import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import LoadingSpinner from "../../../../../src/lib/components/loadingSpinner";

describe("LoadingSpinner", function () {
    it("renders", function () {
        const rendered = shallow(<LoadingSpinner/>);

        expect(rendered).to.have.className("loading-spinner");
        expect(rendered).to.have.descendants(".preloader-wrapper.big.active");
        expect(rendered).to.have.descendants(".spinner-layer.spinner-blue");
        expect(rendered).to.have.descendants(".spinner-layer.spinner-green");
        expect(rendered).to.have.descendants(".spinner-layer.spinner-red");
        expect(rendered).to.have.descendants(".spinner-layer.spinner-yellow");
    });
});
