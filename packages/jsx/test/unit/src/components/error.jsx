import {expect} from "chai";
import {shallow} from "enzyme";
import {Map} from "immutable";
import React from "react";
import sinon from "sinon";
import Error from "../../../../src/lib/components/error";

describe("Error", function () {
    it("renders (default)", function (done) {
        const stubProps = {
            errorMessage: "ugh",
            location: Map({
                pathname: "grr"
            }),
            redirectionLocation: "boof",
            redirectionTimeout: 0.1,
            timedRedirect: sinon.stub()
        };
        const rendered = shallow(<Error {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("error");
        expect(rendered).to.have.descendants("#error-doubt-bear");
        expect(rendered).to.have.descendants(".error__message--header");
        expect(rendered).to.have.descendants(".error__message");

        setTimeout(() => {
            try {
                expect(stubProps.timedRedirect.calledOnce).to.eql(true);
                done();
            } catch (error) {
                done(error);
            }
        }, stubProps.redirectionTimeout * 1250);
    });

    it("renders (404)", function (done) {
        const stubProps = {
            errorCode: 404,
            errorMessage: "ugh",
            location: Map({
                pathname: "grr"
            }),
            redirectionLocation: "boof",
            redirectionTimeout: 0.1,
            timedRedirect: sinon.stub()
        };
        const rendered = shallow(<Error {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("error");
        expect(rendered).to.have.descendants("#error-doubt-bear");
        expect(rendered).to.have.descendants(".error__message--header");
        expect(rendered).to.have.descendants(".error__message");

        setTimeout(() => {
            try {
                expect(stubProps.timedRedirect.calledOnce).to.eql(true);
                done();
            } catch (error) {
                done(error);
            }
        }, stubProps.redirectionTimeout * 1250);
    });

    it("renders (ENOTFOUND)", function (done) {
        const stubProps = {
            errorCode: "ENOTFOUND",
            errorMessage: "ugh",
            location: Map({
                pathname: "grr"
            }),
            redirectionLocation: "boof",
            redirectionTimeout: 0.1,
            timedRedirect: sinon.stub()
        };
        const rendered = shallow(<Error {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("error");
        expect(rendered).to.have.descendants("#error-doubt-bear");
        expect(rendered).to.have.descendants(".error__message--header");
        expect(rendered).to.have.descendants(".error__message");

        setTimeout(() => {
            try {
                expect(stubProps.timedRedirect.calledOnce).to.eql(true);
                done();
            } catch (error) {
                done(error);
            }
        }, stubProps.redirectionTimeout * 1250);
    });

    it("renders (500)", function (done) {
        const stubProps = {
            errorCode: 500,
            errorMessage: "ugh",
            location: Map({
                pathname: "grr"
            }),
            redirectionLocation: "boof",
            redirectionTimeout: 0.1,
            timedRedirect: sinon.stub()
        };
        const rendered = shallow(<Error {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("error");
        expect(rendered).to.have.descendants("#error-dead-bear");
        expect(rendered).to.have.descendants(".error__message--header");
        expect(rendered).to.have.descendants(".error__message");

        setTimeout(() => {
            try {
                expect(stubProps.timedRedirect.notCalled).to.eql(true);
                done();
            } catch (error) {
                done(error);
            }
        }, stubProps.redirectionTimeout * 1250);
    });

    it("renders (EFETCH)", function (done) {
        const stubProps = {
            errorCode: "EFETCH",
            errorMessage: "ugh",
            location: Map({
                pathname: "grr"
            }),
            redirectionLocation: "boof",
            redirectionTimeout: 0.1,
            timedRedirect: sinon.stub()
        };
        const rendered = shallow(<Error {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("error");
        expect(rendered).to.have.descendants("#error-dead-bear");
        expect(rendered).to.have.descendants(".error__message--header");
        expect(rendered).to.have.descendants(".error__message");

        setTimeout(() => {
            try {
                expect(stubProps.timedRedirect.notCalled).to.eql(true);
                done();
            } catch (error) {
                done(error);
            }
        }, stubProps.redirectionTimeout * 1250);
    });

    it("renders (ENOPOSTS)", function (done) {
        const stubProps = {
            errorCode: "ENOPOSTS",
            errorMessage: "ugh",
            location: Map({
                pathname: "grr"
            }),
            redirectionLocation: "boof",
            redirectionTimeout: 0.1,
            timedRedirect: sinon.stub()
        };
        const rendered = shallow(<Error {...stubProps}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("error");
        expect(rendered).to.have.descendants("#error-shrug-bear");
        expect(rendered).to.have.descendants(".error__message--header");
        expect(rendered).to.have.descendants(".error__message");

        setTimeout(() => {
            try {
                expect(stubProps.timedRedirect.notCalled).to.eql(true);
                done();
            } catch (error) {
                done(error);
            }
        }, stubProps.redirectionTimeout * 1250);
    });
});
