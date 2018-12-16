import {expect} from "chai";
import {shallow} from "enzyme";
import {Map} from "immutable";
import React from "react";
import sinon from "sinon";
import {
    ErrorComponent,
    ErrorENOACCESSContentComponent,
    ErrorENOCONTENTContentComponent,
    ErrorENOTFOUNDContentComponent,
    ErrorESERVERContentComponent
} from "../../../../../../src/lib";

describe("ErrorComponent", function () {
    it("renders (null if no errorContentComponent)", function (done) {
        const stubProps = {
            errorMessage: "ugh",
            location: Map({
                pathname: "grr"
            }),
            redirectionLocation: "boof",
            redirectionTimeout: 0.1,
            timedRedirect: sinon.stub(),
            clearErrorTimeoutHandler: sinon.stub()
        };
        const rendered = shallow(<ErrorComponent {...stubProps}/>);

        expect(rendered).to.not.have.className("error");

        setTimeout(() => {
            try {
                expect(stubProps.timedRedirect.notCalled).to.eql(true);
                done();
            } catch (error) {
                done(error);
            }
        }, stubProps.redirectionTimeout * 1250);
    });

    it("renders (has errorContentComponent)", function (done) {
        const stubProps = {
            errorCode: "EWOOF",
            errorMessage: "ugh",
            location: Map({
                pathname: "grr"
            }),
            redirectionLocation: "boof",
            redirectionTimeout: 0.1,
            timedRedirect: sinon.stub(),
            clearErrorTimeoutHandler: sinon.stub(),
            errorContentComponent: ErrorENOCONTENTContentComponent
        };
        const {errorContentComponent, ...expectedProps} = stubProps; // eslint-disable-line no-unused-vars
        const rendered = shallow(<ErrorComponent {...stubProps}/>);

        expect(rendered).to.have.className("error");
        expect(rendered).to.contain(<ErrorENOCONTENTContentComponent {...expectedProps}/>);

        setTimeout(() => {
            try {
                expect(stubProps.timedRedirect.notCalled).to.eql(true);
                done();
            } catch (error) {
                done(error);
            }
        }, stubProps.redirectionTimeout * 1250);
    });

    it("renders (has custom mapErrorCodeToErrorContentComponent)", function (done) {
        const stubProps = {
            errorCode: "EWOOF",
            errorMessage: "ugh",
            location: Map({
                pathname: "grr"
            }),
            redirectionLocation: "boof",
            redirectionTimeout: 0.1,
            timedRedirect: sinon.stub(),
            clearErrorTimeoutHandler: sinon.stub(),
            mapErrorCodeToErrorContentComponent: () => ErrorENOCONTENTContentComponent
        };
        const {mapErrorCodeToErrorContentComponent, ...expectedProps} = stubProps; // eslint-disable-line no-unused-vars
        const rendered = shallow(<ErrorComponent {...stubProps}/>);

        expect(rendered).to.have.className("error");
        expect(rendered).to.contain(<ErrorENOCONTENTContentComponent {...expectedProps}/>);

        setTimeout(() => {
            try {
                expect(stubProps.timedRedirect.notCalled).to.eql(true);
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
            timedRedirect: sinon.stub(),
            clearErrorTimeoutHandler: sinon.stub()
        };
        const rendered = shallow(<ErrorComponent {...stubProps}/>);

        expect(rendered).to.have.className("error");
        expect(rendered).to.contain(<ErrorENOTFOUNDContentComponent {...stubProps}/>);

        setTimeout(() => {
            try {
                expect(stubProps.timedRedirect.calledOnce).to.eql(true);
                done();
            } catch (error) {
                done(error);
            }
        }, stubProps.redirectionTimeout * 1250);
    });

    it("renders (403)", function (done) {
        const stubProps = {
            errorCode: 403,
            errorMessage: "ugh",
            location: Map({
                pathname: "grr"
            }),
            redirectionLocation: "boof",
            redirectionTimeout: 0.1,
            timedRedirect: sinon.stub(),
            clearErrorTimeoutHandler: sinon.stub()
        };
        const rendered = shallow(<ErrorComponent {...stubProps}/>);

        expect(rendered).to.have.className("error");
        expect(rendered).to.contain(<ErrorENOACCESSContentComponent {...stubProps}/>);

        setTimeout(() => {
            try {
                expect(stubProps.timedRedirect.notCalled).to.eql(true);
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
            timedRedirect: sinon.stub(),
            clearErrorTimeoutHandler: sinon.stub()
        };
        const rendered = shallow(<ErrorComponent {...stubProps}/>);

        expect(rendered).to.have.className("error");
        expect(rendered).to.contain(<ErrorESERVERContentComponent {...stubProps}/>);

        setTimeout(() => {
            try {
                expect(stubProps.timedRedirect.notCalled).to.eql(true);
                done();
            } catch (error) {
                done(error);
            }
        }, stubProps.redirectionTimeout * 1250);
    });

    it("calls `clearErrorTimeoutHandler` on `componentDidUnmount`", function () {
        const stubProps = {
            errorCode: 500,
            errorMessage: "ugh",
            location: Map({
                pathname: "grr"
            }),
            redirectionLocation: "boof",
            redirectionTimeout: 0.1,
            timedRedirect: sinon.stub(),
            clearErrorTimeoutHandler: sinon.stub()
        };
        const rendered = shallow(<ErrorComponent {...stubProps}/>);

        expect(rendered).to.have.className("error");

        rendered.unmount();
        expect(stubProps.clearErrorTimeoutHandler.calledOnce).to.eql(true);
    });
});
