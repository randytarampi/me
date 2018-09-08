import {expect} from "chai";
import {Map} from "immutable";
import proxyquire from "proxyquire";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import sinon from "sinon";
import selectors from "../../../lib/data/selectors";
import {shallow} from "../../../lib/util/test";

describe("Error", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;
    let stubLocation;
    let stubHasError;
    let stubError;
    let stubErrorCode;
    let stubErrorMessage;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map();
        stubStore = mockStore(stubInitialState);

        stubLocation = "woof";
        stubHasError = "grr";
        stubError = "meow";
        stubErrorCode = "rawr";
        stubErrorMessage = "boof";

        sinon.stub(selectors, "getLocation").returns(stubLocation);
        sinon.stub(selectors, "hasError").returns(stubHasError);
        sinon.stub(selectors, "getError").returns(stubError);
        sinon.stub(selectors, "getErrorCode").returns(stubErrorCode);
        sinon.stub(selectors, "getErrorMessage").returns(stubErrorMessage);
    });

    afterEach(function () {
        selectors.getLocation.restore();
        selectors.hasError.restore();
        selectors.getError.restore();
        selectors.getErrorCode.restore();
        selectors.getErrorMessage.restore();
    });

    it("receives default props", function () {
        const clearErrorStub = sinon.stub().returns(() => Promise.resolve());
        const routerPushStub = sinon.stub().returns({type: "WOOF"});
        const proxyquiredError = proxyquire("../../../lib/containers/error", {
            "../actions/clearError": {
                "default": clearErrorStub
            },
            "react-router-redux": {
                "push": routerPushStub
            }
        });
        const Error = proxyquiredError.default;

        const rendered = shallow(stubStore)(<Error/>);
        let renderCount = 1;
        const expectedProps = {redirectionLocation: "/", redirectionTimeout: 10};

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(expectedProps);

        expect(selectors.getLocation.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getLocation, stubInitialState);
        expect(selectors.hasError.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.hasError, stubInitialState);
        expect(selectors.getError.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getError, stubInitialState);
        expect(selectors.getErrorCode.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getErrorCode, stubInitialState);
        expect(selectors.getErrorMessage.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getErrorMessage, stubInitialState);
        expect(rendered).to.have.prop("location", stubLocation);
        expect(rendered).to.have.prop("hasError", stubHasError);
        expect(rendered).to.have.prop("error", stubError);
        expect(rendered).to.have.prop("errorCode", stubErrorCode);
        expect(rendered).to.have.prop("errorMessage", stubErrorMessage);

        expect(clearErrorStub.notCalled).to.eql(true);
        expect(routerPushStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("timedRedirect");
    });

    it("propagates props", function () {
        const stubProps = {redirectionLocation: "/woof", redirectionTimeout: 1};
        const clearErrorStub = sinon.stub().returns(() => Promise.resolve());
        const routerPushStub = sinon.stub().returns({type: "WOOF"});
        const proxyquiredError = proxyquire("../../../lib/containers/error", {
            "../actions/clearError": {
                "default": clearErrorStub
            },
            "react-router-redux": {
                "push": routerPushStub
            }
        });
        const Error = proxyquiredError.default;

        const rendered = shallow(stubStore)(<Error {...stubProps} />);
        let renderCount = 1;

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);

        expect(selectors.getLocation.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getLocation, stubInitialState);
        expect(selectors.hasError.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.hasError, stubInitialState);
        expect(selectors.getError.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getError, stubInitialState);
        expect(selectors.getErrorCode.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getErrorCode, stubInitialState);
        expect(selectors.getErrorMessage.callCount).to.eql(renderCount);
        sinon.assert.calledWith(selectors.getErrorMessage, stubInitialState);
        expect(rendered).to.have.prop("location", stubLocation);
        expect(rendered).to.have.prop("hasError", stubHasError);
        expect(rendered).to.have.prop("error", stubError);
        expect(rendered).to.have.prop("errorCode", stubErrorCode);
        expect(rendered).to.have.prop("errorMessage", stubErrorMessage);

        expect(clearErrorStub.notCalled).to.eql(true);
        expect(routerPushStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("timedRedirect");
    });

    it("calls `timedRedirect` with the correct `redirectionLocation`", function () {
        const stubProps = {redirectionLocation: "/woof", redirectionTimeout: 1};
        const clearErrorStub = sinon.stub().returns(() => Promise.resolve());
        const routerPushStub = sinon.stub().returns({type: "WOOF"});
        const proxyquiredError = proxyquire("../../../lib/containers/error", {
            "../actions/clearError": {
                "default": clearErrorStub
            },
            "react-router-redux": {
                "push": routerPushStub
            }
        });
        const Error = proxyquiredError.default;

        const rendered = shallow(stubStore)(<Error {...stubProps} />);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.props(stubProps);

        expect(clearErrorStub.notCalled).to.eql(true);
        expect(routerPushStub.notCalled).to.eql(true);
        expect(rendered).to.have.prop("timedRedirect");

        const mappedTimedRedirect = rendered.prop("timedRedirect");

        return mappedTimedRedirect()
            .then(() => {
                expect(clearErrorStub.calledOnce).to.eql(true);
                expect(routerPushStub.calledOnce).to.eql(true);
                sinon.assert.calledWith(routerPushStub, stubProps.redirectionLocation);
            });
    });
});
